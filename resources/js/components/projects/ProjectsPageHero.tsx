import React from 'react';

interface HeroData {
    title_en?: string;
    title_ar?: string;
    subtitle_en?: string;
    subtitle_ar?: string;
    background_image?: string;
}

interface ProjectsPageHeroProps {
    hero?: HeroData | null;
    activeCategory?: string;
    language: 'en' | 'ar';
    projectCount?: number;
}

const HERO_IMAGE_BY_CATEGORY: Record<string, string> = {
    all: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
    commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
    residential: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
    industrial: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070',
    construction: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2070',
    infrastructure: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070',
};

function resolveHeroImage(category: string, heroImage?: string): string {
    if (heroImage) {
        if (heroImage.startsWith('http')) {
            return heroImage;
        }

        return heroImage.startsWith('/') ? heroImage : `/storage/${heroImage}`;
    }

    return HERO_IMAGE_BY_CATEGORY[category] ?? HERO_IMAGE_BY_CATEGORY.all;
}

export default function ProjectsPageHero({
    hero,
    activeCategory = 'all',
    language,
    projectCount = 0,
}: ProjectsPageHeroProps): JSX.Element {
    const isAr = language === 'ar';
    const subtitle = hero
        ? isAr
            ? hero.subtitle_ar
            : hero.subtitle_en
        : isAr
          ? 'سنوات من التميز في تنفيذ المشاريع التجارية والسكنية والصناعية.'
          : 'Years of excellence delivering commercial, residential, and industrial projects across the Kingdom.';

    const heroImage = resolveHeroImage(activeCategory, hero?.background_image);
    const heading = isAr ? 'مشاريعنا' : 'Our Projects';

    return (
        <section className="projects-hero">
            <div className="projects-hero__slide" key={activeCategory}>
                <img src={heroImage} alt="" className="projects-hero__slide-img" />
            </div>
            <div className="projects-hero__overlay" />

            <div className="projects-hero__content">
                <div className="projects-hero__tag">
                    <span className="projects-hero__tag-line" />
                    <span className="projects-hero__tag-text">
                        {isAr ? 'محفظتنا' : 'Our Portfolio'}
                    </span>
                </div>

                <h1 className="projects-hero__heading">{heading}</h1>

                {subtitle && <p className="projects-hero__sub">{subtitle}</p>}

                {projectCount > 0 && (
                    <div className="projects-hero__stats">
                        <div>
                            <div className="projects-hero__stat-number">{projectCount}+</div>
                            <div className="projects-hero__stat-label">
                                {isAr ? 'مشروع' : 'Projects'}
                            </div>
                        </div>
                        <div className="projects-hero__stat-divider" aria-hidden="true" />
                        <div>
                            <div className="projects-hero__stat-number">KSA</div>
                            <div className="projects-hero__stat-label">
                                {isAr ? 'في جميع أنحاء المملكة' : 'Kingdom-wide'}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
