import React from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ProductContent() {
  const { t } = useLaravelReactI18n();
  return <div>{t('products.products')}</div>;
}
