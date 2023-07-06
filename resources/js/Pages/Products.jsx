import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import ProductContent from '@/pageContent/productContent/ProductsContent';

export default function Products() {
  const { t } = useLaravelReactI18n();

  return (
    <AppLayout title={t('products.products')}>
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <ProductContent />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
