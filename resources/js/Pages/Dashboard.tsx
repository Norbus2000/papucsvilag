import React from 'react';

import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';

export default function Dashboard() {
  const page = useTypedPage();

  return (
    <div>
      <AppLayout title="Dashboard">
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
              home
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
