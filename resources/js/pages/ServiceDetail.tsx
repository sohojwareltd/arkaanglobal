import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    HardHat, Wrench, Users, Sparkles, CheckCircle2, ChevronRight, ArrowRight,
    Download, ClipboardCheck, HammerIcon, PackageCheck, Zap, Droplets, Wind, Gauge,
    LucideIcon,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import CTASection from '@/components/home/CTASection';
import WhenVisible from '@/components/ui/when-visible';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ServiceItemType {
    id: number;
    text_en: string;
    text_ar: string;
}

interface ServiceType {
    id: number;
    slug: string;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    icon?: string;
    image?: string;
    items?: ServiceItemType[];
}

interface ManpowerCategoryItem {
    id: number;
    category_en: string;
    category_ar: string;
    short_term: boolean;
    long_term: boolean;
    project_based: boolean;
}

interface CleaningScopeItemType {
    id: number;
    text_en: string;
    text_ar: string;
}

interface CleaningScope {
    id: number;
    category_en: string;
    category_ar: string;
    items?: CleaningScopeItemType[];
}

interface HseContentItem {
    id: number;
    key: string;
    content_en?: string;
    content_ar?: string;
    link?: string;
}

interface ServiceDetailProps {
    service: ServiceType;
    allServices?: ServiceType[];
    manpowerCategories?: ManpowerCategoryItem[];
    cleaningScopes?: CleaningScope[];
    manpowerCategoriesTitle?: HseContentItem | null;
    cleaningMatrixTitle?: HseContentItem | null;
    manpowerFormLink?: HseContentItem | null;
}

const ICON_MAP: Record<string, LucideIcon> = {
    'hard-hat': HardHat,
    wrench: Wrench,
    users: Users,
    sparkles: Sparkles,
};

// Real, on-theme photography/video per service — consistent with the rest of the site.
const HERO_IMAGE: Record<string, string> = {
    construction: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2069',
    mep: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069',
    manpower: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2069',
    cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2069',
};
const HERO_VIDEO: Record<string, string> = {
    construction: 'https://assets.mixkit.co/videos/31450/31450-720.mp4',
    mep: 'https://assets.mixkit.co/videos/24085/24085-720.mp4',
    manpower: 'https://assets.mixkit.co/videos/46753/46753-720.mp4',
    cleaning: '',
};
const OVERVIEW_IMAGE: Record<string, string> = {
    construction: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200',
    mep: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200',
    manpower: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200',
    cleaning: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=1200',
};

const MEP_DISCIPLINES: { icon: LucideIcon; label_en: string; label_ar: string }[] = [
    { icon: Zap, label_en: 'Electrical', label_ar: 'كهرباء' },
    { icon: Droplets, label_en: 'Plumbing', label_ar: 'سباكة' },
    { icon: Wind, label_en: 'HVAC', label_ar: 'تكييف وتهوية' },
    { icon: Gauge, label_en: 'Testing & Commissioning', label_ar: 'الفحص والتشغيل' },
];

const CONSTRUCTION_PROCESS: { icon: LucideIcon; label_en: string; label_ar: string }[] = [
    { icon: ClipboardCheck, label_en: 'Plan & Prepare', label_ar: 'التخطيط والتجهيز' },
    { icon: HammerIcon, label_en: 'Build', label_ar: 'التنفيذ' },
    { icon: Sparkles, label_en: 'Finish', label_ar: 'التشطيب' },
    { icon: PackageCheck, label_en: 'Handover', label_ar: 'التسليم' },
];

function getImageUrl(img: string | undefined | null): string {
    if (!img || typeof img !== 'string') return '';
    return img.startsWith('http') || img.startsWith('/') ? img : `/storage/${img}`;
}

export default function ServiceDetail({
    service,
    allServices = [],
    manpowerCategories = [],
    cleaningScopes = [],
    manpowerCategoriesTitle,
    cleaningMatrixTitle,
    manpowerFormLink,
}: ServiceDetailProps) {
    const { t, language } = useLanguage();
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
    const toggleRow = (i: number) => {
        const next = new Set(expandedRows);
        next.has(i) ? next.delete(i) : next.add(i);
        setExpandedRows(next);
    };

    const Icon = ICON_MAP[service.icon || ''] || HardHat;
    const title = language === 'en' ? service.title_en : service.title_ar;
    const description = language === 'en' ? service.description_en : service.description_ar;
    const items = service.items ?? [];
    const heroImage = getImageUrl(service.image) || HERO_IMAGE[service.slug] || HERO_IMAGE.construction;
    const heroVideo = HERO_VIDEO[service.slug];
    const overviewImage = OVERVIEW_IMAGE[service.slug] || HERO_IMAGE.construction;
    const relatedServices = allServices.filter((s) => s.slug !== service.slug);

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    const documentTitle = `${title} - Arkaan Construction Company`;

    return (
        <>
            <Head title={documentTitle}>
                <meta name="description" content={description} />
                <meta property="og:title" content={documentTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={currentUrl} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        name: title,
                        description,
                        provider: { '@type': 'Organization', name: 'Arkaan Construction Company', url: siteUrl },
                        areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
                    })}
                </script>
            </Head>
            <Layout>
                {/* Hero */}
                <section className="relative flex min-h-[60vh] items-end overflow-hidden border-b-4 border-accent lg:min-h-[70vh]">
                    <div
                        className="animate-kenburns absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${heroImage}')` }}
                    />
                    {heroVideo && (
                        <video
                            className="hero-bg-video absolute inset-0 h-full w-full object-cover"
                            src={heroVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-hidden="true"
                        />
                    )}
                    <div className="hero-overlay absolute inset-0" />
                    <div className="container-custom relative z-10 pb-12 pt-32 lg:pb-16">
                        {/* Breadcrumb */}
                        <nav className="mb-6 flex items-center gap-2 text-sm text-primary-foreground/70">
                            <Link href="/" className="hover:text-primary-foreground">{language === 'en' ? 'Home' : 'الرئيسية'}</Link>
                            <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
                            <Link href="/services" className="hover:text-primary-foreground">{t('services.page.title')}</Link>
                            <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
                            <span className="text-primary-foreground">{title}</span>
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm hero-gradient border-b-2 border-accent">
                                <Icon className="h-8 w-8 text-primary-foreground" />
                            </div>
                            <h1 className="max-w-3xl text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
                                {title}
                            </h1>
                        </div>
                        <p className="mt-4 max-w-2xl text-lg text-primary-foreground/85">{description}</p>
                    </div>
                </section>

                <div className="section-padding">
                    <div className="container-custom space-y-16">
                        {/* Overview + What's Included */}
                        <WhenVisible>
                            <section className="grid gap-10 lg:grid-cols-5 lg:gap-12">
                                <div className="lg:col-span-2">
                                    <div className="relative overflow-hidden rounded-sm border-b-2 border-accent shadow-xl">
                                        <img src={overviewImage} alt={title} className="h-64 w-full object-cover lg:h-full" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                                    </div>
                                </div>
                                <div className="lg:col-span-3">
                                    <span className="eyebrow">{language === 'en' ? "What's Included" : 'ما يشمله'}</span>
                                    <h2 className="mb-6 mt-2 text-3xl font-bold text-foreground">
                                        {language === 'en' ? 'Scope of Service' : 'نطاق الخدمة'}
                                    </h2>
                                    {items.length > 0 ? (
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {items.map((item) => (
                                                <div key={item.id} className="card-elevated flex items-start gap-3 p-4">
                                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                                                    <span className="text-sm text-foreground">
                                                        {language === 'en' ? item.text_en : item.text_ar}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground">{description}</p>
                                    )}
                                </div>
                            </section>
                        </WhenVisible>

                        {/* MEP disciplines strip */}
                        {service.slug === 'mep' && (
                            <WhenVisible>
                                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {MEP_DISCIPLINES.map((d) => (
                                        <div key={d.label_en} className="card-elevated flex flex-col items-center gap-3 p-6 text-center">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm hero-gradient border-b-2 border-accent">
                                                <d.icon className="h-7 w-7 text-primary-foreground" />
                                            </div>
                                            <span className="font-semibold text-foreground">
                                                {language === 'en' ? d.label_en : d.label_ar}
                                            </span>
                                        </div>
                                    ))}
                                </section>
                            </WhenVisible>
                        )}

                        {/* Construction process strip */}
                        {service.slug === 'construction' && (
                            <WhenVisible>
                                <section>
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                        {CONSTRUCTION_PROCESS.map((step, i) => (
                                            <div key={step.label_en} className="card-elevated relative p-6 text-center">
                                                <span className="eyebrow mb-3 block text-muted-foreground">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                                <div className="mx-auto mb-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-sm hero-gradient border-b-2 border-accent">
                                                    <step.icon className="h-7 w-7 text-primary-foreground" />
                                                </div>
                                                <span className="font-semibold text-foreground">
                                                    {language === 'en' ? step.label_en : step.label_ar}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </WhenVisible>
                        )}

                        {/* Manpower deployment table */}
                        {service.slug === 'manpower' && manpowerCategories.length > 0 && (
                            <WhenVisible>
                                <section className="card-elevated overflow-hidden p-8">
                                    <h3 className="mb-6 text-xl font-semibold text-foreground">
                                        {manpowerCategoriesTitle
                                            ? (language === 'en' ? manpowerCategoriesTitle.content_en : manpowerCategoriesTitle.content_ar) || (language === 'en' ? 'Manpower Categories & Deployment Options' : 'فئات القوى العاملة وخيارات النشر')
                                            : language === 'en' ? 'Manpower Categories & Deployment Options' : 'فئات القوى العاملة وخيارات النشر'}
                                    </h3>

                                    <div className="hidden overflow-x-auto lg:block">
                                        <table className="w-full border-separate border-spacing-0">
                                            <thead>
                                                <tr className="bg-primary">
                                                    <th className="px-5 py-3.5 text-left text-sm font-semibold text-primary-foreground">
                                                        {language === 'en' ? 'Category' : 'الفئة'}
                                                    </th>
                                                    <th className="px-4 py-3.5 text-center text-sm font-semibold text-primary-foreground">
                                                        {language === 'en' ? 'Short-term' : 'قصير الأجل'}
                                                    </th>
                                                    <th className="px-4 py-3.5 text-center text-sm font-semibold text-primary-foreground">
                                                        {language === 'en' ? 'Long-term' : 'طويل الأجل'}
                                                    </th>
                                                    <th className="px-4 py-3.5 text-center text-sm font-semibold text-primary-foreground">
                                                        {language === 'en' ? 'Project-based' : 'قائم على المشروع'}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {manpowerCategories.map((row, i) => (
                                                    <tr key={row.id} className={cn('transition-colors hover:bg-accent/10', i % 2 === 1 && 'bg-muted/40')}>
                                                        <td className="border-b border-border px-5 py-3 text-sm font-medium text-foreground">
                                                            {language === 'en' ? row.category_en : row.category_ar}
                                                        </td>
                                                        <td className="border-b border-border px-4 py-3 text-center">
                                                            {row.short_term ? <CheckCircle2 className="mx-auto h-5 w-5 text-primary" /> : <span className="text-muted-foreground/30">—</span>}
                                                        </td>
                                                        <td className="border-b border-border px-4 py-3 text-center">
                                                            {row.long_term ? <CheckCircle2 className="mx-auto h-5 w-5 text-primary" /> : <span className="text-muted-foreground/30">—</span>}
                                                        </td>
                                                        <td className="border-b border-border px-4 py-3 text-center">
                                                            {row.project_based ? <CheckCircle2 className="mx-auto h-5 w-5 text-primary" /> : <span className="text-muted-foreground/30">—</span>}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="lg:hidden space-y-2">
                                        {manpowerCategories.map((row, i) => (
                                            <div key={row.id} className="border border-border rounded-sm overflow-hidden">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleRow(i)}
                                                    className="w-full px-4 py-3 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
                                                >
                                                    <span className="font-medium text-foreground">{language === 'en' ? row.category_en : row.category_ar}</span>
                                                    <span className="text-primary">{expandedRows.has(i) ? '−' : '+'}</span>
                                                </button>
                                                {expandedRows.has(i) && (
                                                    <div className="px-4 py-3 space-y-2 bg-card">
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground">{language === 'en' ? 'Short-term' : 'قصير الأجل'}</span>
                                                            {row.short_term ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <span className="text-muted-foreground/30">—</span>}
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground">{language === 'en' ? 'Long-term' : 'طويل الأجل'}</span>
                                                            {row.long_term ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <span className="text-muted-foreground/30">—</span>}
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground">{language === 'en' ? 'Project-based' : 'قائم على المشروع'}</span>
                                                            {row.project_based ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <span className="text-muted-foreground/30">—</span>}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-border">
                                        <a
                                            href={manpowerFormLink?.link || '/hse-contact'}
                                            download={Boolean(manpowerFormLink?.link)}
                                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                                        >
                                            <Download className="h-4 w-4" />
                                            <span>{language === 'en' ? 'Download Manpower Request Form' : 'تحميل نموذج طلب القوى العاملة'}</span>
                                        </a>
                                    </div>
                                </section>
                            </WhenVisible>
                        )}

                        {/* Cleaning scope matrix */}
                        {service.slug === 'cleaning' && cleaningScopes.length > 0 && (
                            <WhenVisible>
                                <section className="card-elevated overflow-hidden p-8">
                                    <h3 className="mb-6 text-xl font-semibold text-foreground">
                                        {cleaningMatrixTitle
                                            ? (language === 'en' ? cleaningMatrixTitle.content_en : cleaningMatrixTitle.content_ar) || (language === 'en' ? 'Cleaning Services Scope Matrix' : 'مصفوفة نطاق خدمات التنظيف')
                                            : language === 'en' ? 'Cleaning Services Scope Matrix' : 'مصفوفة نطاق خدمات التنظيف'}
                                    </h3>
                                    <div className="grid gap-6 md:grid-cols-3">
                                        {cleaningScopes.map((scope) => (
                                            <div key={scope.id} className="border-t-2 border-accent bg-muted/30 p-5">
                                                <h4 className="mb-3 font-semibold text-foreground">
                                                    {language === 'en' ? scope.category_en : scope.category_ar}
                                                </h4>
                                                <ul className="space-y-2">
                                                    {(scope.items ?? []).map((it) => (
                                                        <li key={it.id} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                            <span>{language === 'en' ? it.text_en : it.text_ar}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </WhenVisible>
                        )}

                        {/* CTA */}
                        <WhenVisible>
                            <CTASection />
                        </WhenVisible>

                        {/* Related services */}
                        {relatedServices.length > 0 && (
                            <WhenVisible>
                                <section>
                                    <h2 className="mb-6 text-2xl font-bold text-foreground">
                                        {language === 'en' ? 'Other Services' : 'خدمات أخرى'}
                                    </h2>
                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {relatedServices.map((s) => {
                                            const RelIcon = ICON_MAP[s.icon || ''] || HardHat;
                                            return (
                                                <Link key={s.id} href={`/services/${s.slug}`} className="card-elevated group p-6">
                                                    <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-sm hero-gradient border-b-2 border-accent transition-transform group-hover:scale-110">
                                                        <RelIcon className="h-6 w-6 text-primary-foreground" />
                                                    </div>
                                                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                                                        {language === 'en' ? s.title_en : s.title_ar}
                                                    </h3>
                                                    <span className="inline-flex items-center text-sm font-medium text-primary">
                                                        {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                                                        <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </section>
                            </WhenVisible>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    );
}
