import React from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function HomeContent() {
  const { t } = useLaravelReactI18n();
  return <div>{t('home.home')}</div>;
}
