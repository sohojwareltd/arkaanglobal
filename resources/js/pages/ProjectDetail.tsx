import React, { useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Clock, MapPin } from 'lucide-react';

import Layout from '@/components/layout/Layout';
import ProjectImageSlider from '@/components/projects/ProjectImageSlider';
import { useLanguage } from '@/contexts/LanguageContext';

interface GalleryItem {
    id: number;
    type: 'image' | 'video';
    file?: string | string[];
    video_url?: string;
}

interface Project {
    id: number;
    title_en: string;
    title_ar: string;
    location_en: string;
    location_ar: string;
    workers?: string;
    category: string;
    year?: string;
    area_en?: string;
    area_ar?: string;
    duration_en?: string;
    duration_ar?: string;
    value_en?: string;
    value_ar?: string;
    description_en?: string;
    description_ar?: string;
    highlights_en?: string[];
    highlights_ar?: string[];
    image?: string;
    client?: { id: number; name: string; abbr: string };
    gallery_items?: GalleryItem[];
    galleryItems?: GalleryItem[];
}

interface RelatedProject {
    id: number;
    title_en: string;
    title_ar: string;
    location_en: string;
    location_ar: string;
    category: string;
    year?: string;
    duration_en?: string;
    duration_ar?: string;
    image?: string;
}

interface ProjectDetailProps {
    project?: Project | null;
    relatedProjects?: RelatedProject[];
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070';

function resolveMediaUrl(path?: string | null): string | null {
    if (!path) {
        return null;
    }

    if (path.startsWith('http') || path.startsWith('/')) {
        return path;
    }

    return `/storage/${path}`;
}

function formatCategoryLabel(category: string, language: 'en' | 'ar'): string {
    const labels: Record<string, { en: string; ar: string }> = {
        commercial: { en: 'Commercial', ar: 'تجاري' },
        residential: { en: 'Residential', ar: 'سكني' },
        industrial: { en: 'Industrial', ar: 'صناعي' },
        infrastructure: { en: 'Infrastructure', ar: 'بنية تحتية' },
    };

    const key = category.toLowerCase();

    return language === 'en' ? labels[key]?.en ?? category : labels[key]?.ar ?? category;
}

function buildGalleryImages(project: Project): string[] {
    const images: string[] = [];

    const cover = resolveMediaUrl(project.image);
    if (cover) {
        images.push(cover);
    }

    const rawGallery = project.galleryItems ?? project.gallery_items ?? [];
    for (const item of rawGallery) {
        if (item.type !== 'image') {
            continue;
        }

        const file = Array.isArray(item.file) ? item.file[0] : item.file;
        const url = resolveMediaUrl(file ?? undefined);

        if (url && !images.includes(url)) {
            images.push(url);
        }
    }

    return images.length > 0 ? images : [FALLBACK_IMAGE];
}

interface DetailRow {
    key: string;
    value: string;
}

function RelatedProjectCard({
    project,
    language,
}: {
    project: RelatedProject;
    language: 'en' | 'ar';
}): JSX.Element {
    const title = language === 'en' ? project.title_en : project.title_ar;
    const location = language === 'en' ? project.location_en : project.location_ar;
    const duration = language === 'en' ? project.duration_en : project.duration_ar;
    const image = resolveMediaUrl(project.image) ?? FALLBACK_IMAGE;

    return (
        <Link href={`/projects/${project.id}`} className="related-card" data-cursor-hover>
            <div className="related-card__img-wrap">
                <img src={image} alt={title} className="related-card__img" loading="lazy" />
                <div className="related-card__overlay" />
            </div>

            {project.year && (
                <div className="related-card__badge">{project.year}</div>
            )}

            <div className="related-card__arrow" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5 text-white" />
            </div>

            <div className="related-card__content">
                <div className="related-card__category">
                    {formatCategoryLabel(project.category, language)}
                </div>
                <div className="related-card__title">{title}</div>
                <div className="related-card__meta">
                    <span>
                        <MapPin className="h-3 w-3" />
                        {location}
                    </span>
                    {duration && (
                        <span>
                            <Clock className="h-3 w-3" />
                            {duration}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default function ProjectDetail({ project, relatedProjects = [] }: ProjectDetailProps) {
    const { language } = useLanguage();

    const title = project ? (language === 'en' ? project.title_en : project.title_ar) : '';
    const location = project ? (language === 'en' ? project.location_en : project.location_ar) : '';
    const description = project ? (language === 'en' ? project.description_en : project.description_ar) : '';
    const area = project ? (language === 'en' ? project.area_en : project.area_ar) : '';
    const duration = project ? (language === 'en' ? project.duration_en : project.duration_ar) : '';
    const value = project ? (language === 'en' ? project.value_en : project.value_ar) : '';
    const categoryLabel = project ? formatCategoryLabel(project.category, language) : '';
    const galleryImages = project ? buildGalleryImages(project) : [];

    const highlights = useMemo(() => {
        if (!project) {
            return [];
        }

        const stored = language === 'en' ? project.highlights_en : project.highlights_ar;

        if (stored && stored.length > 0) {
            return stored;
        }

        const fallback: string[] = [];

        if (project.client?.name) {
            fallback.push(project.client.name);
        }

        if (location) {
            fallback.push(location);
        }

        if (duration) {
            fallback.push(
                language === 'en' ? `${duration} Completion` : `مدة ${duration}`,
            );
        }

        return fallback;
    }, [language, project, location, duration]);

    const detailRows: DetailRow[] = useMemo(() => {
        if (!project) {
            return [];
        }

        const rows: DetailRow[] = [];

        if (project.client?.name) {
            rows.push({
                key: language === 'en' ? 'Client' : 'العميل',
                value: project.client.name,
            });
        }

        if (project.year) {
            rows.push({
                key: language === 'en' ? 'Year' : 'السنة',
                value: project.year,
            });
        }

        if (area) {
            rows.push({
                key: language === 'en' ? 'Area' : 'المساحة',
                value: area,
            });
        }

        if (duration) {
            rows.push({
                key: language === 'en' ? 'Duration' : 'المدة',
                value: duration,
            });
        }

        if (value) {
            rows.push({
                key: language === 'en' ? 'Project Value' : 'قيمة المشروع',
                value: value,
            });
        }

        if (project.workers) {
            rows.push({
                key: language === 'en' ? 'Workforce' : 'القوى العاملة',
                value: project.workers,
            });
        }

        return rows.filter((row) => row.value && row.value !== '—' && row.value !== 'N/A');
    }, [language, project, area, duration, value]);

    const metaStats = useMemo(() => {
        if (!project) {
            return [];
        }

        const stats: { value: string; label: string }[] = [];

        if (location) {
            stats.push({
                value: location,
                label: language === 'en' ? 'Location' : 'الموقع',
            });
        }

        if (project.year) {
            stats.push({
                value: project.year,
                label: language === 'en' ? 'Year' : 'السنة',
            });
        }

        if (area) {
            stats.push({
                value: area,
                label: language === 'en' ? 'Area / Size' : 'المساحة / الحجم',
            });
        }

        if (duration) {
            stats.push({
                value: duration,
                label: language === 'en' ? 'Duration' : 'المدة',
            });
        }

        return stats;
    }, [language, location, area, duration, project]);

    if (!project) {
        return (
            <Layout>
                <div className="projects-grid">
                    <div className="projects-grid__inner projects-grid__empty">
                        <h2 className="projects-grid__empty-title">
                            {language === 'en' ? 'Project not found' : 'المشروع غير موجود'}
                        </h2>
                        <Link href="/projects" className="btn-gold-outline mt-6" data-cursor-hover>
                            {language === 'en' ? 'Back to Projects' : 'العودة إلى المشاريع'}
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    const pageTitle = `${title} - Arkaan Construction Company`;

    return (
        <>
            <Head title={pageTitle}>
                <meta name="description" content={description ?? title} />
            </Head>

            <Layout>
                <header className="project-detail-header">
                    <ProjectImageSlider images={galleryImages} title={title} />

                    <div className="project-detail-header__inner">
                        <div className="project-detail-meta">
                            <div className="project-detail-meta__category">
                                <span className="project-detail-meta__dot" />
                                {categoryLabel}
                            </div>

                            <h1 className="project-detail-meta__title">{title}</h1>

                            {metaStats.length > 0 && (
                                <div className="project-detail-meta__stats">
                                    {metaStats.map((stat) => (
                                        <div key={stat.label} className="project-detail-meta__stat">
                                            <div className="project-detail-meta__stat-value">{stat.value}</div>
                                            <div className="project-detail-meta__stat-label">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <section className="project-info">
                    <div className="project-info__inner">
                        <div>
                            <h2 className="project-info__description-title">
                                {language === 'en' ? (
                                    <>
                                        About This <em>Project</em>
                                    </>
                                ) : (
                                    <>
                                        عن هذا <em>المشروع</em>
                                    </>
                                )}
                            </h2>

                            {description && (
                                <p className="project-info__description">{description}</p>
                            )}

                            {highlights.length > 0 && (
                                <>
                                    <div className="project-info__highlights-title">
                                        {language === 'en' ? 'Project Highlights' : 'أبرز نقاط المشروع'}
                                    </div>
                                    <div className="project-info__highlights">
                                        {highlights.map((highlight) => (
                                            <div key={highlight} className="project-info__highlight">
                                                <span className="project-info__highlight-dot" />
                                                {highlight}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="project-info__card">
                            <div className="project-info__card-title">
                                {language === 'en' ? 'Project Details' : 'تفاصيل المشروع'}
                            </div>

                            {detailRows.map((row) => (
                                <div key={row.key} className="project-info__detail-row">
                                    <span className="project-info__detail-key">{row.key}</span>
                                    <span className="project-info__detail-val">{row.value}</span>
                                </div>
                            ))}

                            <div className="project-info__cta">
                                <Link href="/hse-contact" className="btn-gold" data-cursor-hover>
                                    {language === 'en' ? 'Start Similar Project' : 'ابدأ مشروعاً مشابهاً'}
                                </Link>
                                <Link href="/projects" className="btn-gold-outline" data-cursor-hover>
                                    {language === 'en' ? 'View All Projects' : 'عرض جميع المشاريع'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {relatedProjects.length > 0 && (
                    <section className="related">
                        <div className="related__inner">
                            <div className="related__header">
                                <h2 className="related__title">
                                    {language === 'en' ? (
                                        <>
                                            Related <em>Projects</em>
                                        </>
                                    ) : (
                                        <>
                                            مشاريع <em>ذات صلة</em>
                                        </>
                                    )}
                                </h2>
                                <Link href="/projects" className="btn-gold-outline" data-cursor-hover>
                                    {language === 'en' ? 'View All' : 'عرض الكل'}
                                </Link>
                            </div>

                            <div className="related__grid">
                                {relatedProjects.map((related) => (
                                    <RelatedProjectCard
                                        key={related.id}
                                        project={related}
                                        language={language}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </Layout>
        </>
    );
}
