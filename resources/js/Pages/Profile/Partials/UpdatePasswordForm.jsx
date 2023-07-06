import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef } from 'react';
import useRoute from '@/Hooks/useRoute';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function UpdatePasswordForm() {
  const { t } = useLaravelReactI18n();
  const route = useRoute();
  const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);

  function updatePassword() {
    form.put(route('user-password.update'), {
      errorBag: 'updatePassword',
      preserveScroll: true,
      onSuccess: () => form.reset(),
      onError: () => {
        if (form.errors.password) {
          form.reset('password', 'password_confirmation');
          passwordRef.current?.focus();
        }

        if (form.errors.current_password) {
          form.reset('current_password');
          currentPasswordRef.current?.focus();
        }
      },
    });
  }
  {
    t('profile.update_pass_desc');
  }
  return (
    <FormSection
      onSubmit={updatePassword}
      title={t('profile.update_pass')}
      description={t('profile.update_pass_desc')}
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
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="current_password">
          {t('profile.current_password')}
        </InputLabel>
        <TextInput
          id="current_password"
          type="password"
          className="mt-1 block w-full"
          ref={currentPasswordRef}
          value={form.data.current_password}
          onChange={e =>
            form.setData('current_password', e.currentTarget.value)
          }
          autoComplete="current-password"
        />
        <InputError
          message={form.errors.current_password ? t('profile.wrong_pass') : ''}
          className="mt-2"
        />
      </div>

      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="password">{t('profile.new_pass')}</InputLabel>
        <TextInput
          id="password"
          type="password"
          className="mt-1 block w-full"
          value={form.data.password}
          onChange={e => form.setData('password', e.currentTarget.value)}
          autoComplete="new-password"
          ref={passwordRef}
        />
        <InputError
          message={form.errors.password ? t('profile.wrong_pass') : ''}
          className="mt-2"
        />
      </div>

      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="password_confirmation">
          {t('profile.confirm_pass')}
        </InputLabel>
        <TextInput
          id="password_confirmation"
          type="password"
          className="mt-1 block w-full"
          value={form.data.password_confirmation}
          onChange={e =>
            form.setData('password_confirmation', e.currentTarget.value)
          }
          autoComplete="new-password"
        />
        <InputError
          message={form.errors.password_confirmation}
          className="mt-2"
        />
      </div>
    </FormSection>
  );
}
