import NavLink from '@/Components/NavLink';
import useRoute from '@/Hooks/useRoute';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import React from 'react';

export default function NavLinks({ matches }) {
  const route = useRoute();
  const { t } = useLaravelReactI18n();
  if (matches) {
    return (
      <div className="p-5 flex row">
        <div className="pr-10">
          <NavLink href={route('home')} active={route().current('home')}>
            {t('home.home')}
          </NavLink>
        </div>
        <div>
          <NavLink
            href={route('products')}
            active={route().current('products')}
          >
            {t('products.products')}
          </NavLink>
        </div>
      </div>
    );
  }
}
