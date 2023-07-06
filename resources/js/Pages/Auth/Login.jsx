import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';

export default function Login({ status }) {
  const { t } = useLaravelReactI18n();
  const route = useRoute();
  const form = useForm({
    email: '',
    password: '',
    remember: '',
  });

  const onSubmit = e => {
    e.preventDefault();
    form.post(route('login'), {
      onFinish: () => form.reset('password'),
    });
  };

  return (
    <AppLayout title={t('login.login')}>
      <AuthenticationCard>
        {status && (
          <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
            {status}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <InputLabel htmlFor="email">{t('login.email')}</InputLabel>
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={e => form.setData('email', e.currentTarget.value)}
            required
            autoFocus
            autoComplete="email"
          />
          <div>
            <InputError className="mt-2" message={form.errors.email} />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="password">{t('login.password')}</InputLabel>
            <TextInput
              id="password"
              type="password"
              className="mt-1 block w-full"
              value={form.data.password}
              onChange={e => form.setData('password', e.currentTarget.value)}
              required
              autoComplete="current-password"
            />
            <InputError
              className="mt-2"
              message={form.errors.password ? t('login.wrong_pass') : ''}
            />
          </div>
          <div className="mt-4">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                checked={form.data.remember === 'on'}
                onChange={e =>
                  form.setData('remember', e.currentTarget.checked ? 'on' : '')
                }
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {t('login.remember_me')}
              </span>
            </label>
          </div>
          <div className="flex items-center justify-between max-md:flex-col ">
            <Link
              href={route('password.request')}
              className="max-md:p-3 justify-start underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              {t('login.forgot_password')}
            </Link>

            <div className="flex items-center justify-end max-md:flex-col">
              <Link
                href={route('register')}
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                {t('login.register')}
              </Link>
              <div className="max-md:pt-3">
                <PrimaryButton
                  className={classNames('ml-4', {
                    'opacity-25': form.processing,
                  })}
                  disabled={form.processing}
                >
                  {t('login.login')}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </form>
      </AuthenticationCard>
    </AppLayout>
  );
}
