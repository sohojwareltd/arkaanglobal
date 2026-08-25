import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { renderToString } from 'react-dom/server';

const appName = import.meta.env.VITE_APP_NAME || 'Arkaan Construction Company';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        // Keep in sync with resources/js/app.tsx — pages already compose
        // their own full title, this must not append the app name again.
        title: (title) => title || appName,
        resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
        setup: ({ App, props }) => <App {...props} />,
    }),
);
