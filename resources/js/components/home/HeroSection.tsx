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

const DEFAULT_BG = "url('https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2070')";
// Construction site & cranes time-lapse — Mixkit (free, no attribution required).
const HERO_VIDEO_URL = 'https://assets.mixkit.co/videos/31450/31450-720.mp4';

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
        <section className="relative flex min-h-[80vh] items-center overflow-hidden py-20 sm:min-h-[90vh] sm:py-0">
            {/* Background image (poster / fallback, also the base Ken Burns layer) */}
            <div
                className="animate-kenburns absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: bgImage }}
            />
            {/* Background video — muted, looping, autoplaying; hidden automatically
                under prefers-reduced-motion via the .hero-bg-video rule in app.css */}
            <video
                className="hero-bg-video absolute inset-0 h-full w-full object-cover"
                src={HERO_VIDEO_URL}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
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
                    <h1 className="mb-3 text-[2rem] leading-[1.15] font-bold text-primary-foreground sm:mb-4 sm:text-5xl sm:leading-tight lg:text-6xl animate-fade-in-up">
                        {title}
                    </h1>

                    {/* Tagline */}
                    <p className="mb-3 text-lg font-semibold text-primary-foreground/90 sm:mb-6 sm:text-2xl animate-fade-in-up animation-delay-50">
                        {subtitle}
                    </p>

                    {/* Description */}
                    <p className="mb-6 max-w-2xl text-base text-primary-foreground/80 sm:mb-8 sm:text-xl animate-fade-in-up animation-delay-100">
                        {description}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 animate-fade-in-up animation-delay-200">
                        <Button
                            size="lg"
                            className="gold-gradient px-6 py-5 text-base font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:px-8 sm:py-6 sm:text-lg"
                            asChild
                        >
                            <Link href={ctaPrimaryLink} className="flex items-center justify-center gap-2">
                                {ctaPrimary}
                                <ArrowRight
                                    className={`h-5 w-5 ${direction === 'rtl' ? 'rotate-180' : ''}`}
                                />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-transparent px-6 py-5 text-base text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 sm:px-8 sm:py-6 sm:text-lg"
                            asChild
                        >
                            <a href={ctaSecondaryLink} download className="flex items-center justify-center gap-2">
                                <Download className="h-5 w-5" />
                                {ctaSecondary}
                            </a>
                        </Button>
                    </div>

                    {/* Quick Highlights — real facts from the company profile, not invented figures */}
                    <div className="mt-8 border-t border-primary-foreground/20 pt-6 sm:mt-12 sm:pt-8 animate-fade-in-up animation-delay-300">
                        <div className="flex flex-wrap gap-5 sm:gap-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary-foreground/15 border-b-2 border-accent sm:h-12 sm:w-12">
                                    <Users className="h-5 w-5 text-primary-foreground sm:h-6 sm:w-6" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-primary-foreground sm:text-2xl">
                                        4
                                    </p>
                                    <p className="text-xs text-primary-foreground/70 sm:text-sm">
                                        {language === 'en' ? 'Core Service Lines' : 'خطوط خدمة رئيسية'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary-foreground/15 border-b-2 border-accent sm:h-12 sm:w-12">
                                    <Building2 className="h-5 w-5 text-primary-foreground sm:h-6 sm:w-6" />
                                </div>
                                <div>
                                    <p className="text-base font-bold text-primary-foreground sm:text-2xl">
                                        {language === 'en' ? 'Jubail · Dammam · Riyadh' : 'الجبيل · الدمام · الرياض'}
                                    </p>
                                    <p className="text-xs text-primary-foreground/70 sm:text-sm">
                                        {language === 'en' ? 'Cities Served' : 'مدن الحضور'}
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

