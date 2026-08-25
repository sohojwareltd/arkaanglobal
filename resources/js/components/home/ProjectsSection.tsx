import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceItem {
    id: number;
    slug: string;
    title_en: string;
    title_ar: string;
    description_en?: string;
    description_ar?: string;
}

interface ProjectsSectionProps {
    services?: ServiceItem[];
}

// Representative, on-theme imagery per service slug — matches the profile's
// own construction/MEP/manpower/cleaning photography.
const IMAGE_BY_SLUG: Record<string, string> = {
    construction: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1400',
    mep: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400',
    manpower: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1400',
    cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1400',
};
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400';

export default function ProjectsSection({ services = [] }: ProjectsSectionProps): JSX.Element {
    const { t, direction, language } = useLanguage();

    return (
        <section className="section-padding">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="eyebrow">
                            {t('projects.title')}
                        </span>
                        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                            {t('projects.subtitle')}
                        </h2>
                    </div>
                    <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        asChild
                    >
                        <Link href="/projects" className="flex items-center gap-2">
                            {t('projects.viewAll')}
                            <ArrowRight
                                className={`h-4 w-4 ${direction === 'rtl' ? 'rotate-180' : ''}`}
                            />
                        </Link>
                    </Button>
                </div>

                {/* Capability Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {services.map((service) => (
                        <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            className="group relative aspect-[4/5] overflow-hidden rounded-sm"
                        >
                            <img
                                src={IMAGE_BY_SLUG[service.slug] ?? FALLBACK_IMAGE}
                                alt={language === 'en' ? service.title_en : service.title_ar}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />

                            <div className="absolute inset-x-0 bottom-0 p-6">
                                <h3 className="mb-2 text-lg font-bold text-primary-foreground">
                                    {language === 'en' ? service.title_en : service.title_ar}
                                </h3>
                                <p className="line-clamp-2 text-sm text-primary-foreground/80">
                                    {language === 'en' ? service.description_en : service.description_ar}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
