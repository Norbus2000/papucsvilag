import NavLink from '@/Components/NavLink';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import React from 'react';

interface Props {
  matches: any;
}

export default function NavLinks({ matches }: Props) {
  const page = useTypedPage();
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
