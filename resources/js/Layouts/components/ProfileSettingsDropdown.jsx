import Dropdown from '@/Components/Dropdown';
import DropdownLink from '@/Components/DropdownLink';
import useRoute from '@/Hooks/useRoute';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import React from 'react';
import { router } from '@inertiajs/core';
import { usePage } from '@inertiajs/inertia-react';

export default function ProfileSettingsDropdown({ auth }) {
  const { t } = useLaravelReactI18n();
  const route = useRoute();
  function logout(e) {
    e.preventDefault();
    router.post(route('logout'));
  }

  return (
    <div className="flex items-center p-5">
      <Dropdown
        align="right"
        width="48"
        renderTrigger={() => (
          <span className="inline-flex rounded-md">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
            >
              {auth.user?.name}
              <svg
                className="ml-2 -mr-0.5 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </span>
        )}
      >
        {/* <!-- Account Management --> */}
        <div className="block px-4 py-2 text-xs text-gray-400">
          {t('navbar.manage_account')}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600"></div>
        <DropdownLink href={route('profile.show')}>
          {t('navbar.profile')}
        </DropdownLink>

        {/* <!-- Authentication --> */}
        <form onSubmit={logout}>
          <DropdownLink as="button">{t('navbar.log_out')}</DropdownLink>
        </form>
      </Dropdown>
    </div>
  );
}
