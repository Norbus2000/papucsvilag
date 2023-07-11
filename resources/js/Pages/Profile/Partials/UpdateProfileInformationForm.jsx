import { router } from '@inertiajs/core';
import { Link, useForm, usePage } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function UpdateProfileInformationForm({ user }) {
  const form = useForm({
    _method: 'PUT',
    name: user.name,
    email: user.email,
    photo: null,
  });
  const route = useRoute();
  const [photoPreview, setPhotoPreview] = useState(null);
  const photoRef = useRef();
  const page = usePage();
  const [verificationLinkSent, setVerificationLinkSent] = useState(false);
  const { t } = useLaravelReactI18n();

  function updateProfileInformation() {
    form.post(route('user-profile-information.update'), {
      errorBag: 'updateProfileInformation',
      preserveScroll: true,
      onSuccess: () => clearPhotoFileInput(),
    });
  }

  return (
    <FormSection
      onSubmit={updateProfileInformation}
      title={t('profile.profile_inf')}
      description={t('profile.update_profile_desc')}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            {t('profile.saved')}
          </ActionMessage>

          <PrimaryButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            {t('profile.save')}
          </PrimaryButton>
        </>
      )}
    >
      {/*  <!-- Profile Photo -->
      Kepfeltoltes képfeltöltés
      {page.props.jetstream.managesProfilePhotos ? (
        <div className="col-span-6 sm:col-span-4">
           <!-- Profile Photo File Input --> 
          <input
            type="file"
            className="hidden"
            ref={photoRef}
            onChange={updatePhotoPreview}
          />

          <InputLabel htmlFor="photo" value="Photo" />

          {photoPreview ? (
            // <!-- New Profile Photo Preview -->
            <div className="mt-2">
              <span
                className="block rounded-full w-20 h-20"
                style={{
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundImage: `url('${photoPreview}')`,
                }}
              ></span>
            </div>
          ) : (
            // <!-- Current Profile Photo -->
            <div className="mt-2">
              <img
                src={user.profile_photo_url}
                alt={user.name}
                className="rounded-full h-20 w-20 object-cover"
              />
            </div>
          )}

          <SecondaryButton
            className="mt-2 mr-2"
            type="button"
            onClick={selectNewPhoto}
          >
            Select A New Photo
          </SecondaryButton>

          {user.profile_photo_path ? (
            <SecondaryButton
              type="button"
              className="mt-2"
              onClick={deletePhoto}
            >
              Remove Photo
            </SecondaryButton>
          ) : null}

          <InputError message={form.errors.photo} className="mt-2" />
        </div>
      ) : null} */}

      {/* <!-- Name --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="name" value={t('profile.name')} />
        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          autoComplete="name"
        />
        <InputError
          message={form.errors.name ? t('profile.worng_name') : ''}
          className="mt-2"
        />
      </div>

      {/* <!-- Email --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="email" value={t('profile.email')} />
        <TextInput
          id="email"
          type="email"
          className="mt-1 block w-full"
          value={form.data.email}
          onChange={e => form.setData('email', e.currentTarget.value)}
        />
        <InputError
          message={form.errors.email ? t('profile.wrong_email') : ''}
          className="mt-2"
        />
        {/*  Email megerosites */}
        {page.props.jetstream.hasEmailVerification &&
          user.email_verified_at === null && (
            <div>
              <p className="text-sm mt-2 dark:text-white">
                {t('profile.email_not_verified')}
                <Link
                  href={route('verification.send')}
                  method="post"
                  as="button"
                  className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                  onClick={e => {
                    e.preventDefault();
                    setVerificationLinkSent(true);
                  }}
                >
                  {t('profile.resend_email_verification')}
                </Link>
              </p>
              {verificationLinkSent && (
                <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                  {t('profile.email_verification_sent')}
                </div>
              )}
            </div>
          )}
      </div>
    </FormSection>
  );
}
