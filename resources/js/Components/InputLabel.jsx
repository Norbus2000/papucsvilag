import React, { PropsWithChildren } from 'react';

export default function InputLabel({ value, htmlFor, children }) {
  return (
    <label
      className="block font-medium text-sm text-gray-700 dark:text-gray-300"
      htmlFor={htmlFor}
    >
      {value || children}
    </label>
  );
}
