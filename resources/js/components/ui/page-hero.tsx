import React from 'react';

interface HeroData {
    title_en?: string;
    title_ar?: string;
    subtitle_en?: string;
    subtitle_ar?: string;
    background_image?: string;
}

interface PageHeroProps {
    hero?: HeroData | null;
    fallbackTitle: string;
    fallbackSubtitle?: string;
    language?: 'en' | 'ar';
}

const DEFAULT_BG =
    "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070')";

export default function PageHero({
    hero,
    fallbackTitle,
    fallbackSubtitle = '',
    language = 'en',
}: PageHeroProps): JSX.Element {
    const isAr = language === 'ar';

    const title = hero
        ? (isAr ? hero.title_ar : hero.title_en)
        : fallbackTitle;
    const subtitle = hero
        ? (isAr ? hero.subtitle_ar : hero.subtitle_en)
        : fallbackSubtitle;
    const bgImage = hero?.background_image
        ? `url('${
              hero.background_image.startsWith('http')
                  ? hero.background_image
                  : hero.background_image.startsWith('/')
                    ? hero.background_image
                    : `/storage/${hero.background_image}`
          }')`
        : DEFAULT_BG;

    return (
        <section className="relative overflow-hidden py-20 lg:py-32">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: bgImage }}
            />
            <div className="hero-overlay absolute inset-0" />
            <div className="container-custom relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="mb-4 text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-xl text-primary-foreground/90">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
