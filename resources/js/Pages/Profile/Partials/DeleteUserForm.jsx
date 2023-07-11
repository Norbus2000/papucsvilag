import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import ActionSection from '@/Components/ActionSection';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function DeleteUserForm() {
  const route = useRoute();
  const { t } = useLaravelReactI18n();
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const form = useForm({
    password: '',
  });
  const passwordRef = useRef();

  function confirmUserDeletion() {
    setConfirmingUserDeletion(true);

    setTimeout(() => passwordRef.current?.focus(), 250);
  }

  function deleteUser() {
    form.delete(route('current-user.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordRef.current?.focus(),
      onFinish: () => form.reset(),
    });
  }

  function closeModal() {
    setConfirmingUserDeletion(false);
    form.reset();
  }

  return (
    <ActionSection
      title={t('profile.delete_acc')}
      description={t('profile.delete_desc')}
    >
      <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
        {t('profile.profile_delete_warning')}
      </div>

      <div className="mt-5">
        <DangerButton onClick={confirmUserDeletion}>
          {t('profile.delete_acc')}
        </DangerButton>
      </div>

      {/* <!-- Delete Account Confirmation Modal --> */}
      <DialogModal isOpen={confirmingUserDeletion} onClose={closeModal}>
        <DialogModal.Content title={t('profile.delete_acc')}>
          <div>{t('profile.modal_delete_desc')}</div>
          <div>{t('profile.modal_ask_pass')}</div>
          <div className="mt-4">
            <TextInput
              type="password"
              className="mt-1 block w-3/4"
              placeholder={t('profile.password')}
              value={form.data.password}
              onChange={e => form.setData('password', e.currentTarget.value)}
            />

            <InputError
              message={form.errors.password ? t('profile.wrong_pass') : ''}
              className="mt-2"
            />
          </div>
        </DialogModal.Content>
        <DialogModal.Footer>
          <SecondaryButton onClick={closeModal}>
            {t('profile.cancel')}
          </SecondaryButton>

          <DangerButton
            onClick={deleteUser}
            className={classNames('ml-2', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            {t('profile.delete_acc')}
          </DangerButton>
        </DialogModal.Footer>
      </DialogModal>
    </ActionSection>
  );
}
