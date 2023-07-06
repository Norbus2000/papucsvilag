import Dropdown from '@/Components/Dropdown';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import React from 'react';
import { US } from 'country-flag-icons/react/3x2';
import { HU } from 'country-flag-icons/react/3x2';
import DropdownLink from '@/Components/DropdownLink';

export default function LangChanger({ matches }) {
  const { t } = useLaravelReactI18n();
  const { currentLocale, setLocale } = useLaravelReactI18n();
  if (matches) {
    return (
      <div className="flex items-center p-5">
        <Dropdown
          align="right"
          width="32"
          renderTrigger={() => (
            <span className="inline-flex rounded-md">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
              >
                {currentLocale() === 'hu' ? (
                  <HU title="United States" className="w-5" />
                ) : (
                  <US title="United States" className="w-5" />
                )}

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
          <div className="block px-4 py-2 text-xs text-gray-400">
            {t('navbar.select_lang')}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-600"></div>
          <div className="flex flex-col">
            <DropdownLink>
              <div
                onClick={() => setLocale('hu')}
                className="flex items-center justify-between"
              >
                <HU title="Hungarian" className="w-6" />
                <div className="p-1">{t('navbar.hu')}</div>
              </div>
            </DropdownLink>
            <DropdownLink>
              <div
                onClick={() => setLocale('en')}
                className="flex items-center justify-between "
              >
                <US title="United States" className="w-6" />
                <div className="p-1 ">{t('navbar.en')}</div>
              </div>
            </DropdownLink>
          </div>
        </Dropdown>
      </div>
    );
  }
}
