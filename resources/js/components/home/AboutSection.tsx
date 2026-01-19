import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection(): JSX.Element {
    const { t, direction, language } = useLanguage();

    const highlights =
        language === 'en'
            ? [
                  'Licensed and compliant with Saudi labor laws',
                  'Extensive database of pre-vetted workers',
                  'Rapid deployment within 48-72 hours',
                  'Dedicated account management',
              ]
            : [
                  'مرخصة ومتوافقة مع قوانين العمل السعودية',
                  'قاعدة بيانات واسعة من العمال المعتمدين',
                  'النشر السريع خلال 48-72 ساعة',
                  'إدارة حساب مخصصة',
              ];

    return (
        <section className="section-padding">
            <div className="container-custom">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Image */}
                    <div className={direction === 'rtl' ? 'relative lg:order-2' : 'relative'}>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070"
                                alt="Construction workers at a project site"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
                        </div>
                        {/* Floating Card */}
                        <div className="card-elevated absolute -bottom-6 left-12 -right-6 bg-card p-6">
                            <div className="flex items-center gap-4">
                                <div className="hero-gradient flex h-16 w-16 items-center justify-center rounded-xl">
                                    <span className="text-2xl font-bold text-primary-foreground">15+</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{t('stats.years')}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {language === 'en' ? 'Serving the Kingdom' : 'في خدمة المملكة'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className={direction === 'rtl' ? 'lg:order-1' : ''}>
                        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                            {language === 'en' ? 'About Us' : 'من نحن'}
                        </span>
                        <h2 className="mt-2 mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                            {t('about.title')}{' '}
                            <span className="text-primary">{t('about.subtitle')}</span>
                        </h2>
                        <p className="mb-8 text-lg text-muted-foreground">
                            {t('about.description')}
                        </p>

                        {/* Highlights */}
                        <ul className="mb-8 space-y-3">
                            {highlights.map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                                    <span className="text-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            size="lg"
                            className="hero-gradient border-0 text-primary-foreground"
                            asChild
                        >
                            <Link href="/about" className="flex items-center gap-2">
                                {t('about.cta')}
                                <ArrowRight
                                    className={`h-5 w-5 ${direction === 'rtl' ? 'rotate-180' : ''}`}
                                />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

