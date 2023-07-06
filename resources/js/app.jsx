import './bootstrap';
import '../css/app.css';

import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { RouteContext } from '@/Hooks/useRoute';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LaravelReactI18nProvider } from 'laravel-react-i18n';

const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  progress: {
    color: '#4B5563',
  },
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx'),
    ),
  setup({ el, App, props }) {
    return hydrateRoot(
      el,
      <RouteContext.Provider value={window.route}>
        <LaravelReactI18nProvider
          locale={'hu'}
          fallbackLocale={'hu'}
          files={import.meta.glob('/lang/**/*.json')}
        >
          <App {...props} />
        </LaravelReactI18nProvider>
      </RouteContext.Provider>,
    );
  },
});
