import React, { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

import SectionHeader from '@/components/ui/section-header';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ProjectItem {
    id: number;
    title_en: string;
    title_ar: string;
    category: string;
    image?: string;
}

interface HomeProjectsSectionProps {
    projects?: ProjectItem[];
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400';

function resolveProjectImage(image?: string): string {
    if (!image) {
        return FALLBACK_IMAGE;
    }
    if (image.startsWith('http')) {
        return image;
    }

    return image.startsWith('/') ? image : `/storage/${image}`;
}

export default function HomeProjectsSection({ projects = [] }: HomeProjectsSectionProps): JSX.Element | null {
    const { language, direction } = useLanguage();
    const [activeFilter, setActiveFilter] = useState('all');

    const categories = useMemo(() => {
        const cats = [...new Set(projects.map((p) => p.category.toLowerCase()))];

        return ['all', ...cats];
    }, [projects]);

    const filtered = useMemo(() => {
        if (activeFilter === 'all') {
            return projects.slice(0, 6);
        }

        return projects.filter((p) => p.category.toLowerCase() === activeFilter).slice(0, 6);
    }, [projects, activeFilter]);

    if (projects.length === 0) {
        return null;
    }

    return (
        <section className="projects">
            <div className="projects__inner">
                <SectionHeader
                    tag={language === 'en' ? 'Our Work' : 'أعمالنا'}
                    title={
                        language === 'en' ? (
                            <>Our <em>Projects</em></>
                        ) : (
                            <>مشاريع<em>نا</em></>
                        )
                    }
                    subtitle={
                        language === 'en'
                            ? 'Explore our portfolio of completed projects across all sectors.'
                            : 'استكشف محفظة مشاريعنا المكتملة في جميع القطاعات.'
                    }
                />

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
                                : cat}
                        </button>
                    ))}
                </div>

                <div className="projects__bento">
                    {filtered.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className="project-card"
                            data-cursor-hover
                        >
                            <img
                                src={resolveProjectImage(project.image)}
                                alt={language === 'en' ? project.title_en : project.title_ar}
                                className="project-card__img"
                                loading="lazy"
                            />
                            <div className="project-card__overlay" />
                            <div className="project-card__badge">{project.category}</div>
                            <div className="project-card__content">
                                <div className="project-card__category">{project.category}</div>
                                <div className="project-card__title">
                                    {language === 'en' ? project.title_en : project.title_ar}
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
                    <Link href="/projects" className="btn-gold-outline" data-cursor-hover>
                        {language === 'en' ? 'View All Projects' : 'عرض جميع المشاريع'}
                        <ArrowRight className={`h-4 w-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
