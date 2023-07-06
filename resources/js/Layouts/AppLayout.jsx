import { Head, Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import LoginRegister from './components/LoginRegister';
import Hamburger from './components/Hamburger';
import ResponsiveNavMenu from './components/ResponsiveNavMenu';
import LangChanger from './components/LangChanger';
import ApplicationMark from '@/Components/ApplicationMark';
import NavLinks from './components/NavLinks';
import { useMediaQuery } from '@mui/material';
import Footer from '@/Footer/Footer';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';

export default function AppLayout({ title, children }) {
  const matches = useMediaQuery('(min-width:639px)');
  const { auth } = usePage().props;
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  return (
    <div>
      <Head title={title} />
      <div className="min-h-screen min-w-screen bg-gray-100 dark:bg-gray-900">
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <div className="flex h-16 justify-between">
            <div>
              <AuthenticationCardLogo />
            </div>
            <NavLinks matches={matches} />
            <div className="flex row">
              <LangChanger matches={matches} />
              <LoginRegister auth={auth} matches={matches} />
            </div>
            <Hamburger
              showingNavigationDropdown={showingNavigationDropdown}
              setShowingNavigationDropdown={setShowingNavigationDropdown}
            />
          </div>

          <ResponsiveNavMenu
            setShowingNavigationDropdown={setShowingNavigationDropdown}
            showingNavigationDropdown={showingNavigationDropdown}
          />
        </nav>
        {/* nav height 64    footer height 64 */}
        <main
          style={{
            minHeight: 'calc(100vh - 130px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
