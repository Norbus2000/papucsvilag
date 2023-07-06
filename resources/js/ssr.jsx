import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { RouteContext } from '@/Hooks/useRoute';
import route from 'ziggy-js';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LaravelReactI18nProvider } from 'laravel-react-i18n';

const appName = 'Laravel';

createServer(page =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: title => `${title} - ${appName}`,
    resolve: name =>
      resolvePageComponent(
        `./Pages/${name}.jsx`,
        import.meta.glob('./Pages/**/*.jsx'),
      ),
    setup: ({ App, props }) => {
      const ssrRoute = (name, params, absolute, config) => {
        return route(name, params, absolute, {
          ...page.props.ziggy,
          location: new URL(page.propss.ziggy.url),
          ...config,
        });
      };
      return (
        <RouteContext.Provider value={ssrRoute}>
          <LaravelReactI18nProvider
            locale={'hu'}
            fallbackLocale={'hu'}
            files={import.meta.glob('/lang/**/.json', { eager: true })}
          >
            <App {...props} />
          </LaravelReactI18nProvider>
        </RouteContext.Provider>
      );
    },
  }),
);
