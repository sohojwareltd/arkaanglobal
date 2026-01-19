import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CTASection(): JSX.Element {
    const { t, direction } = useLanguage();

    return (
        <section className="section-padding">
            <div className="container-custom">
                <div className="relative overflow-hidden rounded-3xl">
                    {/* Background */}
                    <div className="hero-gradient absolute inset-0" />
                    <div className="absolute inset-0 opacity-20">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative px-6 py-16 sm:px-12 lg:px-20 lg:py-20">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
                                {t('cta.title')}
                            </h2>
                            <p className="mb-8 mx-auto max-w-2xl text-lg text-primary-foreground/80">
                                {t('cta.description')}
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Button
                                    size="lg"
                                    className="gold-gradient px-8 py-6 text-lg font-semibold text-accent-foreground transition-opacity hover:opacity-90"
                                    asChild
                                >
                                    <Link href="/contact" className="flex items-center gap-2">
                                        {t('cta.button')}
                                        <ArrowRight
                                            className={`h-5 w-5 ${
                                                direction === 'rtl' ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-primary-foreground/30 bg-transparent px-8 py-6 text-lg text-primary-foreground hover:bg-primary-foreground/10"
                                    asChild
                                >
                                    <a href="tel:+966111234567" className="flex items-center gap-2">
                                        <Phone className="h-5 w-5" />
                                        <span dir="ltr">+966 11 123 4567</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

