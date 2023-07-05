import { Head, usePage } from '@inertiajs/react';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import LoginRegister from './components/LoginRegister';
import Hamburger from './components/Hamburger';
import ResponsiveNavMenu from './components/ResponsiveNavMenu';
import NavLink from '@/Components/NavLink';
import LangChanger from './components/LangChanger';

interface Props {
  title: string;
}

export default function AppLayout({
  title,
  children,
}: PropsWithChildren<Props>) {
  const { canRegister } = usePage().props as any;
  const page = useTypedPage();
  const route = useRoute();
  const { t } = useLaravelReactI18n();

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div>
      <Head title={title} />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <div className="flex h-16 justify-between">
            <div className="p-5">
              <NavLink href={route('home')} active={route().current('home')}>
                {t('home.home')}
              </NavLink>
            </div>
            <LangChanger />
            <LoginRegister />
            {/* <!-- Logo --> */}
            {/*                 <div className="flex-shrink-0 flex items-center">
                <Link href={route('dashboard')}>
                  <ApplicationMark className="block h-9 w-auto" />
                </Link>
              </div> */}

            <Hamburger
              showingNavigationDropdown={showingNavigationDropdown}
              setShowingNavigationDropdown={setShowingNavigationDropdown}
            />
          </div>

          <ResponsiveNavMenu
            showingNavigationDropdown={showingNavigationDropdown}
          />
        </nav>

        {/* <!-- Page Content --> */}
        <main>{children}</main>
      </div>
    </div>
  );
}
