import React, { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ProjectItem {
    id: number;
    title_en: string;
    title_ar: string;
    category: string;
    image?: string;
    created_at?: string;
}

interface ServiceItem {
    id: number;
    slug: string;
    title_en: string;
    title_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
}

interface HomeProjectsSectionProps {
    projects?: ProjectItem[];
    services?: ServiceItem[];
}

interface DisplayCard {
    id: string | number;
    title_en: string;
    title_ar: string;
    category: string;
    categoryLabel: string;
    image?: string;
    href: string;
    year: string;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400';

const IMAGE_BY_SLUG: Record<string, string> = {
    construction: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1400',
    mep: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400',
    manpower: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1400',
    cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1400',
};

const CATEGORY_BY_SLUG: Record<string, { id: string; label_en: string; label_ar: string }> = {
    construction: { id: 'commercial', label_en: 'Commercial', label_ar: 'تجاري' },
    mep: { id: 'industrial', label_en: 'Industrial', label_ar: 'صناعي' },
    manpower: { id: 'industrial', label_en: 'Industrial', label_ar: 'صناعي' },
    cleaning: { id: 'commercial', label_en: 'Commercial', label_ar: 'تجاري' },
};

function resolveImage(image?: string, slug?: string): string {
    if (image) {
        if (image.startsWith('http')) {
            return image;
        }

        return image.startsWith('/') ? image : `/storage/${image}`;
    }

    if (slug && IMAGE_BY_SLUG[slug]) {
        return IMAGE_BY_SLUG[slug];
    }

    return FALLBACK_IMAGE;
}

function formatCategoryLabel(category: string, language: 'en' | 'ar'): string {
    const labels: Record<string, { en: string; ar: string }> = {
        commercial: { en: 'Commercial', ar: 'تجاري' },
        residential: { en: 'Residential', ar: 'سكني' },
        industrial: { en: 'Industrial', ar: 'صناعي' },
        infrastructure: { en: 'Infrastructure', ar: 'بنية تحتية' },
        construction: { en: 'Construction', ar: 'بناء' },
    };

    const key = category.toLowerCase();

    return language === 'en' ? labels[key]?.en ?? category : labels[key]?.ar ?? category;
}

function resolveYear(createdAt?: string): string {
    if (createdAt) {
        const year = new Date(createdAt).getFullYear();

        if (! Number.isNaN(year)) {
            return String(year);
        }
    }

    return String(new Date().getFullYear());
}

function buildCardsFromServices(services: ServiceItem[]): DisplayCard[] {
    return services.map((service) => {
        const categoryMeta = CATEGORY_BY_SLUG[service.slug] ?? {
            id: service.slug,
            label_en: service.slug,
            label_ar: service.slug,
        };

        return {
            id: `service-${service.id}`,
            title_en: service.title_en,
            title_ar: service.title_ar,
            category: categoryMeta.id,
            categoryLabel: categoryMeta.label_en,
            image: resolveImage(service.image, service.slug),
            href: `/services/${service.slug}`,
            year: resolveYear(),
        };
    });
}

function buildCardsFromProjects(projects: ProjectItem[]): DisplayCard[] {
    return projects.map((project) => ({
        id: project.id,
        title_en: project.title_en,
        title_ar: project.title_ar,
        category: project.category.toLowerCase(),
        categoryLabel: project.category,
        image: resolveImage(project.image),
        href: `/projects/${project.id}`,
        year: resolveYear(project.created_at),
    }));
}

export default function HomeProjectsSection({
    projects = [],
    services = [],
}: HomeProjectsSectionProps): JSX.Element | null {
    const { language, direction } = useLanguage();
    const [activeFilter, setActiveFilter] = useState('all');

    const cards = useMemo(() => {
        if (projects.length > 0) {
            return buildCardsFromProjects(projects);
        }

        return buildCardsFromServices(services);
    }, [projects, services]);

    const categories = useMemo(() => {
        const cats = [...new Set(cards.map((card) => card.category.toLowerCase()))];

        return ['all', ...cats];
    }, [cards]);

    const filtered = useMemo(() => {
        if (activeFilter === 'all') {
            return cards.slice(0, 6);
        }

        return cards.filter((card) => card.category.toLowerCase() === activeFilter).slice(0, 6);
    }, [cards, activeFilter]);

    if (cards.length === 0) {
        return null;
    }

    const usingCapabilities = projects.length === 0;

    return (
        <section className="projects">
            <div className="projects__inner">
                <div className="projects__header">
                    <div>
                        <span className="section-tag">
                            {language === 'en' ? 'Our Work' : 'أعمالنا'}
                        </span>
                        <h2 className="section-title">
                            {language === 'en' ? (
                                <>
                                    Our <em>Projects</em>
                                </>
                            ) : (
                                <>
                                    مشاريع<em>نا</em>
                                </>
                            )}
                        </h2>
                        <p className="section-subtitle">
                            {usingCapabilities
                                ? language === 'en'
                                    ? 'Explore our core service capabilities across construction, MEP, manpower, and cleaning.'
                                    : 'استكشف قدراتنا الأساسية في البناء والأعمال الكهروميكانيكية والقوى العاملة والتنظيف.'
                                : language === 'en'
                                  ? 'Explore our portfolio of completed projects across all sectors.'
                                  : 'استكشف محفظة مشاريعنا المكتملة في جميع القطاعات.'}
                        </p>
                    </div>
                </div>

                {categories.length > 2 && (
                    <div className="filter-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActiveFilter(cat)}
                                className={cn('filter-tab', activeFilter === cat && 'active')}
                                data-cursor-hover
                            >
                                {cat === 'all'
                                    ? language === 'en'
                                        ? 'All Projects'
                                        : 'جميع المشاريع'
                                    : formatCategoryLabel(cat, language)}
                            </button>
                        ))}
                    </div>
                )}

                <div className="projects__bento">
                    {filtered.map((card) => (
                        <Link
                            key={card.id}
                            href={card.href}
                            className="project-card"
                            data-cursor-hover
                        >
                            <img
                                src={card.image}
                                alt={language === 'en' ? card.title_en : card.title_ar}
                                className="project-card__img"
                                loading="lazy"
                            />
                            <div className="project-card__overlay" />
                            <div className="project-card__badge">{card.year}</div>
                            <div className="project-card__content">
                                <div className="project-card__category">
                                    {formatCategoryLabel(card.category, language)}
                                </div>
                                <div className="project-card__title">
                                    {language === 'en' ? card.title_en : card.title_ar}
                                </div>
                                <div className="project-card__link">
                                    {language === 'en' ? 'Explore Project' : 'استكشف المشروع'}
                                    <ArrowRight
                                        className={`h-3 w-3 ${direction === 'rtl' ? 'rotate-180' : ''}`}
                                    />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="projects__cta">
                    <Link href={usingCapabilities ? '/services' : '/projects'} className="btn-gold-outline" data-cursor-hover>
                        {usingCapabilities
                            ? language === 'en'
                                ? 'View All Services'
                                : 'عرض جميع الخدمات'
                            : language === 'en'
                              ? 'View All Projects'
                              : 'عرض جميع المشاريع'}
                        <ArrowRight className={`h-4 w-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
