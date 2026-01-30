import React from 'react';
import { ArrowRight, Building2, Users, Download } from 'lucide-react';
import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroData {
    title_en?: string;
    title_ar?: string;
    subtitle_en?: string;
    subtitle_ar?: string;
    description_en?: string;
    description_ar?: string;
    cta_primary_text_en?: string;
    cta_primary_text_ar?: string;
    cta_primary_link?: string;
    cta_secondary_text_en?: string;
    cta_secondary_text_ar?: string;
    cta_secondary_link?: string;
    background_image?: string;
}

interface HeroSectionProps {
    hero?: HeroData | null;
}

const DEFAULT_BG = "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070')";

export default function HeroSection({ hero }: HeroSectionProps): JSX.Element {
    const { t, direction, language } = useLanguage();
    const isAr = language === 'ar';

    const title = hero ? (isAr ? hero.title_ar : hero.title_en) : t('hero.title');
    const subtitle = hero ? (isAr ? hero.subtitle_ar : hero.subtitle_en) : t('hero.tagline');
    const description = hero ? (isAr ? hero.description_ar : hero.description_en) : t('hero.description');
    const ctaPrimary = hero ? (isAr ? hero.cta_primary_text_ar : hero.cta_primary_text_en) : t('hero.cta.primary');
    const ctaSecondary = hero ? (isAr ? hero.cta_secondary_text_ar : hero.cta_secondary_text_en) : t('hero.cta.secondary');
    const ctaPrimaryLink = hero?.cta_primary_link ?? '/hse-contact';
    const ctaSecondaryLink = hero?.cta_secondary_link ?? '/company-profile.pdf';
    const bgImage = hero?.background_image
        ? `url('${hero.background_image.startsWith('http') ? hero.background_image : hero.background_image.startsWith('/') ? hero.background_image : `/storage/${hero.background_image}`}')`
        : DEFAULT_BG;

    return (
        <section className="relative flex min-h-[90vh] items-center overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: bgImage }}
            />
            <div className="hero-overlay absolute inset-0" />

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                />
            </div>

            {/* Content */}
            <div className="container-custom relative z-10">
                <div className="max-w-3xl">
                    

                    {/* Title */}
                    <h1 className="mb-4 text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl animate-fade-in-up">
                        {title}
                    </h1>

                    {/* Tagline */}
                    <p className="mb-6 text-xl font-semibold text-primary-foreground/90 sm:text-2xl animate-fade-in-up animation-delay-50">
                        {subtitle}
                    </p>

                    {/* Description */}
                    <p className="mb-8 max-w-2xl text-lg text-primary-foreground/80 sm:text-xl animate-fade-in-up animation-delay-100">
                        {description}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up animation-delay-200">
                        <Button
                            size="lg"
                            className="gold-gradient px-8 py-6 text-lg font-semibold text-accent-foreground transition-opacity hover:opacity-90"
                            asChild
                        >
                            <Link href={ctaPrimaryLink} className="flex items-center gap-2">
                                {ctaPrimary}
                                <ArrowRight
                                    className={`h-5 w-5 ${direction === 'rtl' ? 'rotate-180' : ''}`}
                                />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-transparent px-8 py-6 text-lg text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
                            asChild
                        >
                            <a href={ctaSecondaryLink} download className="flex items-center gap-2">
                                <Download className="h-5 w-5" />
                                {ctaSecondary}
                            </a>
                        </Button>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-12 border-t border-primary-foreground/20 pt-8 animate-fade-in-up animation-delay-300">
                        <div className="flex flex-wrap gap-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/30">
                                    <Users className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-primary-foreground">
                                        10,000+
                                    </p>
                                    <p className="text-sm text-primary-foreground/70">
                                        {t('stats.workers')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/30">
                                    <Building2 className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-primary-foreground">
                                        500+
                                    </p>
                                    <p className="text-sm text-primary-foreground/70">
                                        {t('stats.projects')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

