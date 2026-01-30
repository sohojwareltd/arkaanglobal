import '../css/app.css';

import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './contexts/LanguageContext';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/toaster';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Analytics tracking functions
const trackPageView = (url: string, title: string) => {
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', (window as any).GA_MEASUREMENT_ID, {
            page_path: url,
            page_title: title,
        });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'PageView');
    }
};

const pages = import.meta.glob('./pages/**/*.tsx');

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(`./pages/${name}.tsx`, pages).then((module) => {
            const PageComponent = module.default;
            return (props: object) => (
                <LanguageProvider>
                    <PageComponent {...props} />
                </LanguageProvider>
            );
        }),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <TooltipProvider>
                <App {...props} />
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// Track page views on Inertia navigation
if (typeof window !== 'undefined') {
    router.on('navigate', () => {
        // Small delay to ensure page title is updated
        setTimeout(() => {
            trackPageView(window.location.pathname + window.location.search, document.title);
        }, 100);
    });
}
