import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import AppLayout from '@/Layouts/AppLayout';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ForgotPassword({ status }) {
  const { t } = useLaravelReactI18n();
  const route = useRoute();
  const form = useForm({
    email: '',
  });

  function onSubmit(e) {
    e.preventDefault();
    form.post(route('password.email'));
  }

  return (
    <AppLayout title={t('forgot_pass.forgot_pass')}>
      <AuthenticationCard>
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {t('forgot_pass.forgot_pass_desc')}
        </div>

        {status && (
          <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
            {status}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div>
            <InputLabel htmlFor="email">{t('forgot_pass.email')}</InputLabel>
            <TextInput
              id="email"
              type="email"
              className="mt-1 block w-full"
              value={form.data.email}
              onChange={e => form.setData('email', e.currentTarget.value)}
              required
              autoFocus
            />
            <InputError className="mt-2" message={form.errors.email} />
          </div>

          <div className="flex items-center justify-end mt-4">
            <PrimaryButton
              className={classNames({ 'opacity-25': form.processing })}
              disabled={form.processing}
            >
              {t('forgot_pass.send')}
            </PrimaryButton>
          </div>
        </form>
      </AuthenticationCard>
    </AppLayout>
  );
}
