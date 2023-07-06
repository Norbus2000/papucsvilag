import React from 'react';

import AppLayout from '@/Layouts/AppLayout';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import HomeContent from '@/pageContent/home/HomeContent';
import { usePage } from '@inertiajs/react';

export default function Home() {
  const { t } = useLaravelReactI18n();
  const page = usePage();
  console.log(page);

  return (
    <AppLayout title={t('home.home')}>
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <HomeContent />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
