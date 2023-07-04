import { router } from '@inertiajs/core';
import { Link, Head, usePage } from '@inertiajs/react';
import classNames from 'classnames';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import ApplicationMark from '@/Components/ApplicationMark';
import Banner from '@/Components/Banner';
import Dropdown from '@/Components/Dropdown';
import DropdownLink from '@/Components/DropdownLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Team } from '@/types';
import NavLink from '@/Components/NavLink';

interface Props {
  title: string;
}

export default function AppLayout({
  title,
  children,
}: PropsWithChildren<Props>) {
  const { canLogin } = usePage().props;
  const { canRegister } = usePage().props;
  const page = useTypedPage();
  const route = useRoute();
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }

  return (
    <div>
      <Head title={title} />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          {/* <!-- Primary Navigation Menu --> */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end h-16">
              {canLogin ? (
                <div className="flex items-center">
                  {!page.props.auth.user && (
                    <>
                      <Link
                        href={route('login')}
                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                      >
                        Log in
                      </Link>

                      {canRegister ? (
                        <Link
                          href={route('register')}
                          className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                          Register
                        </Link>
                      ) : null}
                    </>
                  )}
                </div>
              ) : null}

              <div className="flex">
                {/* <!-- Logo --> */}
                {/*                 <div className="flex-shrink-0 flex items-center">
                  <Link href={route('dashboard')}>
                    <ApplicationMark className="block h-9 w-auto" />
                  </Link>
                </div> */}

                {/* <!-- Navigation Links --> */}
                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                  <NavLink
                    href={route('home')}
                    active={route().current('home')}
                  >
                    home
                  </NavLink>
                </div>
              </div>

              <div className="hidden sm:flex sm:items-center sm:ml-6">
                {/* <!-- Settings Dropdown --> */}
                {page.props.auth.user != null && (
                  <div className="ml-3 relative">
                    <Dropdown
                      align="right"
                      width="48"
                      renderTrigger={() => (
                        <span className="inline-flex rounded-md">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                          >
                            {page.props.auth.user?.name}

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
                        Manage Account
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-600"></div>
                      <DropdownLink href={route('profile.show')}>
                        Profile
                      </DropdownLink>

                      {/* <!-- Authentication --> */}
                      <form onSubmit={logout}>
                        <DropdownLink as="button">Log Out</DropdownLink>
                      </form>
                    </Dropdown>
                  </div>
                )}
              </div>

              {/* <!-- Hamburger --> */}
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  onClick={() =>
                    setShowingNavigationDropdown(!showingNavigationDropdown)
                  }
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={classNames({
                        hidden: showingNavigationDropdown,
                        'inline-flex': !showingNavigationDropdown,
                      })}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                    <path
                      className={classNames({
                        hidden: !showingNavigationDropdown,
                        'inline-flex': showingNavigationDropdown,
                      })}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Responsive Navigation Menu --> */}
          <div
            className={classNames('sm:hidden', {
              block: showingNavigationDropdown,
              hidden: !showingNavigationDropdown,
            })}
          >
            {/*             <div className="pt-2 pb-3 space-y-1">
              <ResponsiveNavLink
                href={route('dashboard')}
                active={route().current('dashboard')}
              >
                Dashboard
              </ResponsiveNavLink>
            </div> */}

            {/* <!-- Responsive Settings Options --> */}
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

              <div className="mt-3 space-y-1">
                <ResponsiveNavLink
                  href={route('profile.show')}
                  active={route().current('profile.show')}
                >
                  Profile
                </ResponsiveNavLink>

                {/* <!-- Authentication --> */}
                <form method="POST" onSubmit={logout}>
                  <ResponsiveNavLink as="button">Log Out</ResponsiveNavLink>
                </form>
              </div>
            </div>
          </div>
        </nav>

        {/* <!-- Page Content --> */}
        <main>{children}</main>
      </div>
    </div>
  );
}
