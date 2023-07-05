import React from 'react';
import { useMediaQuery } from '@mui/material';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import useTypedPage from '@/Hooks/useTypedPage';
import useRoute from '@/Hooks/useRoute';
import { Link, usePage } from '@inertiajs/react';
import ProfileSettingsDropdown from './ProfileSettingsDropdown';

interface Props {
  matches: any;
}

export default function LoginRegister({ matches }: Props) {
  const { t } = useLaravelReactI18n();
  const page = useTypedPage();
  const route = useRoute();
  const { canRegister } = usePage().props as any;
  if (matches) {
    return (
      <div className="flex justify-end">
        {!page.props.auth.user ? (
          <div className="flex items-center p-5">
            <div>
              <Link
                href={route('login')}
                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                {t('navbar.login')}
              </Link>

              {canRegister && (
                <Link
                  href={route('register')}
                  className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                  {t('navbar.register')}
                </Link>
              )}
            </div>
          </div>
        ) : (
          <ProfileSettingsDropdown />
        )}
      </div>
    );
  }
}
