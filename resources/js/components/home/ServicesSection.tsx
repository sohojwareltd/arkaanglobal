import React from 'react';
import { FileSignature, HardHat, Users, Wrench, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServicesSection(): JSX.Element {
    const { t, direction } = useLanguage();

    const services = [
        {
            icon: HardHat,
            title: t('services.skilled.title'),
            description: t('services.skilled.description'),
            link: '/services#skilled',
        },
        {
            icon: Users,
            title: t('services.unskilled.title'),
            description: t('services.unskilled.description'),
            link: '/services#unskilled',
        },
        {
            icon: FileSignature,
            title: t('services.contracting.title'),
            description: t('services.contracting.description'),
            link: '/services#contracting',
        },
        {
            icon: Wrench,
            title: t('services.subcontracting.title'),
            description: t('services.subcontracting.description'),
            link: '/services#subcontracting',
        },
    ];

    return (
        <section className="section-padding bg-muted/30">
            <div className="container-custom">
                {/* Header */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                        {t('services.title')}
                    </span>
                    <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                        {t('services.subtitle')}
                    </h2>
                </div>

                {/* Services Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service) => (
                        <Link
                            key={service.link}
                            href={service.link}
                            className="card-elevated group p-6"
                        >
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl hero-gradient transition-transform group-hover:scale-110">
                                <service.icon className="h-7 w-7 text-primary-foreground" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-foreground">
                                {service.title}
                            </h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                {service.description}
                            </p>
                            <div className="flex items-center text-sm font-medium text-primary">
                                <span>
                                    {direction === 'ltr' ? 'Learn More' : 'اعرف المزيد'}
                                </span>
                                <ArrowRight
                                    className={`ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 ${
                                        direction === 'rtl' ? 'rotate-180' : ''
                                    }`}
                                />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        asChild
                    >
                        <Link href="/services">
                            {direction === 'ltr'
                                ? 'View All Services'
                                : 'عرض جميع الخدمات'}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

