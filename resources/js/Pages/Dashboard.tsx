import React from 'react';

import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function Dashboard() {
  const page = useTypedPage();
  const { t } = useLaravelReactI18n();

  return (
    <div>
      <AppLayout title={t('home.home')}>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
              {t('home.home')}
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
