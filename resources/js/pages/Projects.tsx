import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';

import Layout from '@/components/layout/Layout';
import ProjectCardFull from '@/components/projects/ProjectCardFull';
import ProjectsFilterBar, { SearchResult } from '@/components/projects/ProjectsFilterBar';
import ProjectsPageHero from '@/components/projects/ProjectsPageHero';
import { useLanguage } from '@/contexts/LanguageContext';

interface Project {
    id: number;
    title_en: string;
    title_ar: string;
    location_en: string;
    location_ar: string;
    workers?: string;
    category: string;
    year?: string;
    start_date?: string;
    end_date?: string | null;
    label_en?: string;
    label_ar?: string;
    duration_en?: string;
    duration_ar?: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
    created_at?: string;
    client?: { id: number; name: string; abbr: string };
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

interface HeroData {
    title_en?: string;
    title_ar?: string;
    subtitle_en?: string;
    subtitle_ar?: string;
    background_image?: string;
}

interface ProjectsProps {
    hero?: HeroData | null;
    projects?: Project[];
    services?: ServiceItem[];
}

interface DisplayProject {
    id: string | number;
    title_en: string;
    title_ar: string;
    category: string;
    location_en: string;
    location_ar: string;
    workers?: string;
    image: string;
    href: string;
    year: string;
    duration_en?: string;
    duration_ar?: string;
    label_en?: string;
    label_ar?: string;
    end_date?: string | null;
    clientName?: string;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400';
const INITIAL_VISIBLE = 6;
const LOAD_MORE_STEP = 6;

const IMAGE_BY_SLUG: Record<string, string> = {
    construction: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1400',
    mep: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400',
    manpower: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1400',
    cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1400',
};

const CATEGORY_BY_SLUG: Record<string, string> = {
    construction: 'commercial',
    mep: 'industrial',
    manpower: 'industrial',
    cleaning: 'commercial',
};

const FILTER_DEFINITIONS = [
    { id: 'all', labelKey: 'projects.filter.allProjects' },
    { id: 'commercial', labelKey: 'projects.filter.commercial' },
    { id: 'residential', labelKey: 'projects.filter.residential' },
    { id: 'industrial', labelKey: 'projects.filter.industrial' },
    { id: 'infrastructure', labelKey: 'projects.filter.infrastructure' },
] as const;

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

function resolveYear(year?: string, createdAt?: string): string {
    if (year) {
        return year;
    }

    if (createdAt) {
        const parsedYear = new Date(createdAt).getFullYear();

        if (! Number.isNaN(parsedYear)) {
            return String(parsedYear);
        }
    }

    return String(new Date().getFullYear());
}

function normalizeCategory(category?: string | null): string {
    return (category ?? 'commercial').toLowerCase();
}

function formatCategoryLabel(category: string, language: 'en' | 'ar', t: (key: string) => string): string {
    const key = category.toLowerCase();
    const map: Record<string, string> = {
        commercial: t('projects.filter.commercial'),
        residential: t('projects.filter.residential'),
        industrial: t('projects.filter.industrial'),
        construction: t('projects.filter.construction'),
        infrastructure: t('projects.filter.infrastructure'),
    };

    return map[key] ?? category;
}

function readCategoryFromUrl(): string {
    if (typeof window === 'undefined') {
        return 'all';
    }

    return new URLSearchParams(window.location.search).get('category') ?? 'all';
}

function updateCategoryInUrl(category: string): void {
    const url = category === 'all' ? '/projects' : `/projects?category=${encodeURIComponent(category)}`;
    window.history.replaceState({}, '', url);
}

function buildFromProjects(projects: Project[]): DisplayProject[] {
    return projects.map((project) => ({
        id: project.id,
        title_en: project.title_en,
        title_ar: project.title_ar,
        category: normalizeCategory(project.category),
        location_en: project.location_en,
        location_ar: project.location_ar,
        workers: project.workers,
        image: resolveImage(project.image),
        href: `/projects/${project.id}`,
        year: resolveYear(project.year, project.created_at),
        duration_en: project.duration_en,
        duration_ar: project.duration_ar,
        label_en: project.label_en,
        label_ar: project.label_ar,
        end_date: project.end_date,
        clientName: project.client?.name,
    }));
}

function buildFromServices(services: ServiceItem[]): DisplayProject[] {
    return services.map((service) => ({
        id: `service-${service.id}`,
        title_en: service.title_en,
        title_ar: service.title_ar,
        category: CATEGORY_BY_SLUG[service.slug] ?? 'commercial',
        location_en: 'Kingdom of Saudi Arabia',
        location_ar: 'المملكة العربية السعودية',
        image: resolveImage(service.image, service.slug),
        href: `/services/${service.slug}`,
        year: resolveYear(),
    }));
}

export default function Projects({ hero, projects = [], services = [] }: ProjectsProps) {
    const { t, language } = useLanguage();
    const [activeFilter, setActiveFilter] = useState(() => readCategoryFromUrl());
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

    const usingCapabilities = projects.length === 0;
    const allItems = useMemo(
        () => (usingCapabilities ? buildFromServices(services) : buildFromProjects(projects)),
        [usingCapabilities, services, projects],
    );

    useEffect(() => {
        setActiveFilter(readCategoryFromUrl());
    }, []);

    const filters = useMemo(() => {
        const categoriesWithItems = new Set(allItems.map((item) => item.category.toLowerCase()));
        const available = FILTER_DEFINITIONS.filter(
            (filter) => filter.id === 'all' || categoriesWithItems.has(filter.id),
        );

        return available.map((filter) => ({
            id: filter.id,
            label: t(filter.labelKey),
        }));
    }, [allItems, t]);

    const filteredItems = useMemo(() => {
        let items = allItems;

        if (activeFilter !== 'all') {
            items = items.filter((item) => item.category.toLowerCase() === activeFilter);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();

            items = items.filter((item) => {
                const title = language === 'en' ? item.title_en : item.title_ar;
                const location = language === 'en' ? item.location_en : item.location_ar;

                return (
                    title.toLowerCase().includes(query) ||
                    location.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query) ||
                    (item.clientName?.toLowerCase().includes(query) ?? false)
                );
            });
        }

        return items;
    }, [allItems, activeFilter, searchQuery, language]);

    const visibleItems = filteredItems.slice(0, visibleCount);
    const hasMore = visibleCount < filteredItems.length;

    const searchResults: SearchResult[] = useMemo(() => {
        if (!searchQuery.trim()) {
            return [];
        }

        const query = searchQuery.toLowerCase();

        return allItems
            .filter((item) => {
                const title = language === 'en' ? item.title_en : item.title_ar;

                return title.toLowerCase().includes(query);
            })
            .slice(0, 6)
            .map((item) => ({
                id: item.id,
                title: language === 'en' ? item.title_en : item.title_ar,
                category: formatCategoryLabel(item.category, language, t),
                image: item.image,
                href: item.href,
            }));
    }, [allItems, searchQuery, language, t]);

    const handleFilterChange = useCallback((category: string) => {
        setActiveFilter(category);
        setVisibleCount(INITIAL_VISIBLE);
        updateCategoryInUrl(category);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query);
        setVisibleCount(INITIAL_VISIBLE);
    }, []);

    const pageTitle =
        language === 'en'
            ? 'Our Projects - Arkaan Construction Company'
            : 'مشاريعنا - Arkaan Construction Company';
    const pageDescription =
        language === 'en'
            ? 'Explore Arkaan Construction Company projects across commercial, residential, and industrial sectors in Saudi Arabia.'
            : 'استكشف مشاريع شركة أركان للإنشاءات في القطاعات التجارية والسكنية والصناعية في المملكة العربية السعودية.';
    const canonicalUrl =
        typeof window !== 'undefined'
            ? window.location.href
            : 'https://arkaanconstruction.com/projects';

    return (
        <>
            <Head title={pageTitle}>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={canonicalUrl} />
            </Head>

            <Layout>
                <ProjectsPageHero
                    hero={hero}
                    activeCategory={activeFilter}
                    language={language}
                    projectCount={allItems.length}
                />

                <ProjectsFilterBar
                    filters={filters}
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchResults={searchResults}
                    resultCount={filteredItems.length}
                    language={language}
                />

                <section className="projects-grid">
                    <div className="projects-grid__inner">
                        {filteredItems.length === 0 ? (
                            <div className="projects-grid__layout">
                                <div className="projects-grid__empty">
                                    <div className="projects-grid__empty-icon">
                                        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path d="M9 22V12h6v10" />
                                        </svg>
                                    </div>
                                    <h2 className="projects-grid__empty-title">
                                        {language === 'en' ? 'No projects found' : 'لم يتم العثور على مشاريع'}
                                    </h2>
                                    <p className="projects-grid__empty-text">
                                        {searchQuery
                                            ? language === 'en'
                                                ? `No results match "${searchQuery}". Try a different search term.`
                                                : `لا توجد نتائج لـ "${searchQuery}". جرّب مصطلح بحث مختلف.`
                                            : language === 'en'
                                              ? 'Try selecting a different category or check back soon.'
                                              : 'جرّب اختيار فئة مختلفة أو عد لاحقاً.'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="projects-grid__layout">
                                    {visibleItems.map((item, index) => (
                                        <ProjectCardFull
                                            key={item.id}
                                            href={item.href}
                                            title={language === 'en' ? item.title_en : item.title_ar}
                                            category={formatCategoryLabel(item.category, language, t)}
                                            image={item.image}
                                            year={item.year}
                                            location={language === 'en' ? item.location_en : item.location_ar}
                                            workers={item.workers}
                                            label={language === 'en' ? item.label_en : item.label_ar}
                                            endDate={item.end_date}
                                            featured={index === 0 && activeFilter === 'all' && !searchQuery}
                                            language={language}
                                        />
                                    ))}
                                </div>

                                {hasMore && (
                                    <div className="projects-grid__load-more">
                                        <button
                                            type="button"
                                            className="btn-gold-outline"
                                            onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
                                            data-cursor-hover
                                        >
                                            {language === 'en' ? 'Load More Projects' : 'تحميل المزيد من المشاريع'}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {usingCapabilities && filteredItems.length > 0 && (
                            <p className="projects-grid__note">
                                {language === 'en'
                                    ? 'Showing service capabilities until project case studies are added.'
                                    : 'يتم عرض قدرات الخدمات حتى تتم إضافة دراسات حالة المشاريع.'}
                                {' '}
                                <Link href="/hse-contact" className="projects-grid__note-link" data-cursor-hover>
                                    {language === 'en' ? 'Discuss your project' : 'ناقش مشروعك'}
                                </Link>
                            </p>
                        )}
                    </div>
                </section>
            </Layout>
        </>
    );
}
