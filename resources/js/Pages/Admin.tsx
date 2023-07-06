import AppLayout from '@/Layouts/AppLayout';
import React from 'react';

export default function Admin() {
  return (
    <AppLayout title="admin">
      <h2 className="text-xl font-semibold leading-tight text-gray-800">
        Admin Dashboard
      </h2>

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              You're logged in as Admin!
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
