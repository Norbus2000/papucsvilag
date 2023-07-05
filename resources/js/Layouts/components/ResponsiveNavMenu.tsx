import React from 'react';
import classNames from 'classnames';
import useTypedPage from '@/Hooks/useTypedPage';
import useRoute from '@/Hooks/useRoute';
import { Link, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { router } from '@inertiajs/core';
import { US } from 'country-flag-icons/react/3x2';
import { HU } from 'country-flag-icons/react/3x2';

interface Props {
  showingNavigationDropdown: any;
}

export default function ResponsiveNavMenu({
  showingNavigationDropdown,
}: Props) {
  const page = useTypedPage();
  const route = useRoute();
  const { t } = useLaravelReactI18n();
  const { canRegister } = usePage().props as any;
  const { currentLocale, setLocale } = useLaravelReactI18n();
  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }

  return (
    <div
      className={classNames('sm:hidden', {
        block: showingNavigationDropdown,
        hidden: !showingNavigationDropdown,
      })}
    >
      {!page.props.auth.user ? (
        <div className="pt-4 pb-1">
          <div className="flex flex-col items-center">
            <Link
              href={route('login')}
              className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
            >
              {t('navbar.login')}
            </Link>

            {canRegister && (
              <Link
                href={route('register')}
                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                {t('navbar.register')}
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center px-4">
            <div>
              <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                {page.props.auth.user?.name}
              </div>
              <div className="font-medium text-sm text-gray-500">
                {page.props.auth.user?.email}
              </div>
            </div>
          </div>

          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
              href={route('home')}
              active={route().current('home')}
            >
              {t('home.home')}
            </ResponsiveNavLink>
          </div>
          <div className="pt-2 pb-1 border-t border-b border-gray-200 dark:border-gray-600">
            <div className="justify-center">
              <div className="flex flex-col">
                <div
                  onClick={() => setLocale('hu')}
                  className="flex items-center"
                >
                  <div className=" flex row w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 transition duration-150 ease-in-out">
                    <div className="pr-5">{t('navbar.hu')}</div>
                    <HU title="Hungarian" className="w-6" />
                  </div>
                </div>

                <div
                  onClick={() => setLocale('en')}
                  className="flex items-center"
                >
                  <div className=" flex row p-1 w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 transition duration-150 ease-in-out">
                    <div className="pr-5">{t('navbar.en')}</div>
                    <US title="United States" className="w-6 " />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 space-y-1">
            {/* <!-- Authentication --> */}
            <form method="POST" onSubmit={logout}>
              <ResponsiveNavLink as="button">
                {t('navbar.log_out')}
              </ResponsiveNavLink>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
