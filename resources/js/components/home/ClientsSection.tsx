import React from 'react';

import { useLanguage } from '@/contexts/LanguageContext';

export default function ClientsSection(): JSX.Element {
    const { t, language } = useLanguage();

    const clients = [
        { name: 'Saudi Binladin Group', abbr: 'SBG' },
        { name: 'Al Rajhi Construction', abbr: 'ARC' },
        { name: 'Nesma & Partners', abbr: 'N&P' },
        { name: 'El Seif Engineering', abbr: 'ESE' },
        { name: 'Saudi Oger', abbr: 'SOG' },
        { name: 'Al Bawani Company', abbr: 'ABC' },
    ];

    return (
        <section className="section-padding bg-muted/30">
            <div className="container-custom">
                {/* Header */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                        {t('clients.title')}
                    </span>
                    <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                        {t('clients.subtitle')}
                    </h2>
                </div>

                {/* Clients Grid */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {clients.map((client) => (
                        <div
                            key={client.abbr}
                            className="flex min-h-[100px] items-center justify-center rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
                        >
                            <div className="text-center">
                                <div className="mb-1 text-2xl font-bold text-primary">
                                    {client.abbr}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {client.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Text */}
                <p className="mt-8 text-center text-muted-foreground">
                    {language === 'en'
                        ? 'Trusted by major construction companies and developers across Saudi Arabia'
                        : 'موثوق من قبل شركات البناء والمطورين الكبار في جميع أنحاء المملكة العربية السعودية'}
                </p>
            </div>
        </section>
    );
}

