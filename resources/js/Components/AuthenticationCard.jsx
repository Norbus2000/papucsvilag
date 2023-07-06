import React from 'react';

export default function AuthenticationCard({ children }) {
  return (
    <div className="flex flex-col items-center  bg-gray-100 dark:bg-gray-900">
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
