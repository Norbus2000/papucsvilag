import { Head, Link, usePage } from '@inertiajs/react';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import LoginRegister from './components/LoginRegister';
import Hamburger from './components/Hamburger';
import ResponsiveNavMenu from './components/ResponsiveNavMenu';
import LangChanger from './components/LangChanger';
import ApplicationMark from '@/Components/ApplicationMark';
import NavLinks from './components/NavLinks';
import { useMediaQuery } from '@mui/material';

interface Props {
  title: string;
}

export default function AppLayout({
  title,
  children,
}: PropsWithChildren<Props>) {
  const page = useTypedPage();
  const route = useRoute();
  const { t } = useLaravelReactI18n();
  const matches = useMediaQuery('(min-width:639px)');

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  return (
    <div>
      <Head title={title} />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <div className="flex h-16 justify-between">
            <div className="flex-shrink-0 flex items-center p-5">
              <Link href={route('home')}>
                <ApplicationMark className="block h-9 w-auto" />
              </Link>
            </div>
            <NavLinks matches={matches} />
            <LangChanger matches={matches} />
            <LoginRegister matches={matches} />
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
