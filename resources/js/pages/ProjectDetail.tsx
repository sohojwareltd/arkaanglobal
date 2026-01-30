import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { MapPin, Users, Building2, ArrowLeft, Play } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import WhenVisible from '@/components/ui/when-visible';
import { cn } from '@/lib/utils';

interface GalleryItem {
    id: number;
    type: 'image' | 'video';
    file?: string | string[];
    video_url?: string;
    caption_en?: string;
    caption_ar?: string;
}

interface Project {
    id: number;
    title_en: string;
    title_ar: string;
    location_en: string;
    location_ar: string;
    workers?: string;
    category: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
    client?: { id: number; name: string; abbr: string };
    gallery_items?: GalleryItem[];
    galleryItems?: GalleryItem[];
}

interface ProjectDetailProps {
    project?: Project | null;
}

function getMediaUrl(item: GalleryItem): string | null {
    if (!item) return null;
    if (item.type === 'video' && item.video_url) {
        return item.video_url;
    }
    const file = Array.isArray(item.file) ? item.file[0] : item.file;
    if (file && typeof file === 'string') {
        return file.startsWith('http') || file.startsWith('/')
            ? file
            : `/storage/${file}`;
    }
    return null;
}

function getEmbedUrl(url: string): string | null {
    if (!url) return null;
    try {
        const parsed = new URL(url);
        if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be')) {
            const vid = parsed.searchParams.get('v') || parsed.pathname.split('/').pop();
            return vid ? `https://www.youtube.com/embed/${vid}` : null;
        }
        if (parsed.hostname.includes('vimeo.com')) {
            const vid = parsed.pathname.split('/').pop();
            return vid ? `https://player.vimeo.com/video/${vid}` : null;
        }
    } catch {
        return null;
    }
    return null;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    const { t, language } = useLanguage();
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    if (!project) {
        return (
            <Layout>
                <div className="section-padding container-custom">
                    <p className="text-muted-foreground">{language === 'en' ? 'Project not found.' : 'المشروع غير موجود.'}</p>
                    <Link href="/projects" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline">
                        {language === 'en' ? 'Back to Projects' : 'العودة إلى المشاريع'}
                    </Link>
                </div>
            </Layout>
        );
    }

    const title = language === 'en' ? project.title_en : project.title_ar;
    const location = language === 'en' ? project.location_en : project.location_ar;
    const description = language === 'en' ? project.description_en : project.description_ar;
    const imageVal = project.image;
    const mainImage =
        typeof imageVal === 'string' && imageVal
            ? imageVal.startsWith('http') || imageVal.startsWith('/')
                ? imageVal
                : `/storage/${imageVal}`
            : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070';

    const rawGallery = project.galleryItems ?? project.gallery_items ?? [];
    const galleryItems = Array.isArray(rawGallery) ? rawGallery : [];

    const filters = [
        { id: 'all', label: t('projects.filter.all') },
        { id: 'construction', label: t('projects.filter.construction') },
        { id: 'infrastructure', label: t('projects.filter.infrastructure') },
        { id: 'commercial', label: t('projects.filter.commercial') },
        { id: 'industrial', label: t('projects.filter.industrial') },
    ];
    const categoryLabel = filters.find((f) => f.id === project.category)?.label ?? project.category;

    const pageTitle = title ?? 'Project';
    const metaDescription = description ?? title ?? '';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
            </Head>
            <Layout>
                <div className="section-padding">
                    <div className="container-custom">
                        <Link
                            href="/projects"
                            className="mb-8 inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            {language === 'en' ? 'Back to Projects' : 'العودة إلى المشاريع'}
                        </Link>

                        <div className="grid gap-12 lg:grid-cols-3">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video">
                                    <img
                                        src={mainImage}
                                        alt={title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium capitalize text-primary-foreground">
                                        {categoryLabel}
                                    </div>
                                </div>

                                {galleryItems.length > 0 && (
                                    <WhenVisible className="scroll-mt-24">
                                        <section>
                                            <h2 className="mb-6 text-2xl font-bold text-foreground">
                                                {language === 'en' ? 'Gallery' : 'المعرض'}
                                            </h2>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                {galleryItems.map((item, index) => {
                                                    const url = getMediaUrl(item);
                                                    const caption =
                                                        language === 'en' ? item.caption_en : item.caption_ar;

                                                    if (!url) return null;

                                                    if (item.type === 'video') {
                                                        const embedUrl = getEmbedUrl(url);
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                className="rounded-xl overflow-hidden shadow-lg bg-muted"
                                                            >
                                                                {embedUrl ? (
                                                                    <div className="aspect-video relative">
                                                                        <iframe
                                                                            src={embedUrl}
                                                                            title={caption ?? 'Video'}
                                                                            className="absolute inset-0 w-full h-full"
                                                                            allowFullScreen
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className="aspect-video relative flex items-center justify-center bg-muted">
                                                                        <a
                                                                            href={url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center gap-2 text-primary hover:underline"
                                                                        >
                                                                            <Play className="h-12 w-12" />
                                                                            {language === 'en'
                                                                                ? 'Watch Video'
                                                                                : 'شاهد الفيديو'}
                                                                        </a>
                                                                    </div>
                                                                )}
                                                                {caption && (
                                                                    <p className="p-3 text-sm text-muted-foreground">
                                                                        {caption}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <div
                                                            key={item.id}
                                                            className="rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                                                            onClick={() => setLightboxIndex(index)}
                                                        >
                                                            <img
                                                                src={url}
                                                                alt={caption ?? ''}
                                                                className="w-full aspect-video object-cover transition-transform group-hover:scale-105"
                                                            />
                                                            {caption && (
                                                                <p className="p-3 text-sm text-muted-foreground">
                                                                    {caption}
                                                                </p>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </section>
                                    </WhenVisible>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="card-elevated p-6 sticky top-24">
                                    <h1 className="mb-4 text-2xl font-bold text-foreground">{title}</h1>
                                    {description && (
                                        <p className="mb-6 text-muted-foreground">{description}</p>
                                    )}

                                    <div className="space-y-4">
                                        {project.client && (
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                    <Building2 className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {language === 'en' ? 'Client' : 'العميل'}
                                                    </p>
                                                    <p className="font-medium text-foreground">
                                                        {project.client.name}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-5 w-5 text-primary shrink-0" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    {language === 'en' ? 'Location' : 'الموقع'}
                                                </p>
                                                <p className="font-medium text-foreground">{location}</p>
                                            </div>
                                        </div>
                                        {project.workers && (
                                            <div className="flex items-center gap-3">
                                                <Users className="h-5 w-5 text-primary shrink-0" />
                                                <div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {language === 'en' ? 'Workers' : 'العمال'}
                                                    </p>
                                                    <p className="font-medium text-foreground">
                                                        {project.workers}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {lightboxIndex !== null && (
                    <div
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setLightboxIndex(null)}
                    >
                        <button
                            type="button"
                            className="absolute top-4 right-4 text-white text-2xl"
                            onClick={() => setLightboxIndex(null)}
                        >
                            ×
                        </button>
                        {galleryItems[lightboxIndex]?.type === 'image' && (
                            <img
                                src={getMediaUrl(galleryItems[lightboxIndex]) ?? ''}
                                alt=""
                                className="max-w-full max-h-full object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                        )}
                    </div>
                )}
            </Layout>
        </>
    );
}
