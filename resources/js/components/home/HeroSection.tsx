import React from 'react';
import { Link } from '@inertiajs/react';

import { useLanguage } from '@/contexts/LanguageContext';

interface HeroData {
    subtitle_en?: string;
    subtitle_ar?: string;
    description_en?: string;
    description_ar?: string;
    cta_primary_text_en?: string;
    cta_primary_text_ar?: string;
    cta_primary_link?: string;
    background_image?: string;
}

interface HeroSectionProps {
    hero?: HeroData | null;
}

const DEFAULT_BG = "url('https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2070')";
const HERO_VIDEO_URL = 'https://assets.mixkit.co/videos/31450/31450-720.mp4';

function resolveBackgroundImage(image?: string): string {
    if (!image) {
        return DEFAULT_BG;
    }
    if (image.startsWith('http')) {
        return `url('${image}')`;
    }
    if (image.startsWith('/')) {
        return `url('${image}')`;
    }

    return `url('/storage/${image}')`;
}

export default function HeroSection({ hero }: HeroSectionProps): JSX.Element {
    const { t, language } = useLanguage();
    const isAr = language === 'ar';

    const tagline = hero ? (isAr ? hero.subtitle_ar : hero.subtitle_en) : t('hero.tagline');
    const description = hero ? (isAr ? hero.description_ar : hero.description_en) : t('hero.description');
    const ctaPrimary = hero ? (isAr ? hero.cta_primary_text_ar : hero.cta_primary_text_en) : t('hero.cta.primary');
    const ctaPrimaryLink = hero?.cta_primary_link ?? '/projects';
    const bgImage = resolveBackgroundImage(hero?.background_image);

    return (
        <section className="hero">
            <div className="hero__slider">
                <div
                    className="hero__slide active animate-kenburns"
                    style={{ backgroundImage: bgImage }}
                />
                <video
                    className="hero-bg-video hero__video"
                    src={HERO_VIDEO_URL}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                />
            </div>

            <div className="hero__grid-pattern" />
            <div className="hero__diagonal" aria-hidden="true" />

            <div className="hero__content">
                <div className="hero__overlay" aria-hidden="true" />

                <div className="hero__tag">
                    <span className="hero__tag-line" />
                    <span className="hero__tag-text">
                        {tagline || (language === 'en' ? 'Established in Saudi Arabia' : 'تأسست في المملكة العربية السعودية')}
                    </span>
                </div>

                <p className="hero__sub">{description || t('hero.description')}</p>

                <div className="hero__btns">
                    <Link href={ctaPrimaryLink} className="btn-gold" data-cursor-hover>
                        {ctaPrimary || (language === 'en' ? 'View Our Projects' : 'عرض مشاريعنا')}
                    </Link>
                </div>
            </div>

            <div className="hero__scroll" aria-hidden="true">
                <span className="hero__scroll-text">{language === 'en' ? 'Scroll' : 'مرر'}</span>
                <div className="hero__scroll-line" />
            </div>
        </section>
    );
}
