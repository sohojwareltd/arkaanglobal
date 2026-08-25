import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { HardHat, Wrench, Users, Sparkles, ArrowRight, LucideIcon } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/page-hero';
import CTASection from '@/components/home/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import WhenVisible from '@/components/ui/when-visible';

// Mixkit — free, no attribution required.
const SERVICES_HERO_VIDEO = 'https://assets.mixkit.co/videos/4010/4010-720.mp4'; // aerial view, buildings under construction
const WORKFORCE_VIDEO = 'https://assets.mixkit.co/videos/46753/46753-720.mp4'; // construction workers with uniforms and security helmets

const ICON_MAP: Record<string, LucideIcon> = {
    'hard-hat': HardHat,
    wrench: Wrench,
    users: Users,
    sparkles: Sparkles,
};

const IMAGE_BY_SLUG: Record<string, string> = {
    construction: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1400',
    mep: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400',
    manpower: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1400',
    cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1400',
};
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400';

function getImageUrl(img: string | undefined | null): string {
    if (!img || typeof img !== 'string') return '';
    return img.startsWith('http') || img.startsWith('/') ? img : `/storage/${img}`;
}

interface ServiceItem {
    id: number;
    slug: string;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    icon?: string;
    image?: string;
    items?: { id: number }[];
}

interface HeroData {
    title_en?: string;
    title_ar?: string;
    subtitle_en?: string;
    subtitle_ar?: string;
    background_image?: string;
    meta_title_en?: string;
    meta_title_ar?: string;
    meta_description_en?: string;
    meta_description_ar?: string;
    meta_keywords?: string;
}

interface ServicesProps {
    hero?: HeroData | null;
    services?: ServiceItem[];
}

export default function Services({ hero, services = [] }: ServicesProps) {
    const { t, language } = useLanguage();

    const pageTitle = hero?.meta_title_en || hero?.meta_title_ar
        ? (language === 'en' ? hero.meta_title_en : hero.meta_title_ar) ?? 'Services - Arkaan Construction Company'
        : 'Services - Arkaan Construction Company | Civil Construction, MEP, Manpower & Cleaning';
    const metaDesc = hero?.meta_description_en || hero?.meta_description_ar
        ? (language === 'en' ? hero.meta_description_en : hero.meta_description_ar) ?? ''
        : 'Civil & Construction, MEP, Manpower Supply, and Dedicated Cleaning Services delivered across the Kingdom of Saudi Arabia.';
    const metaKeywords = hero?.meta_keywords ?? 'civil construction, MEP services, manpower supply, dedicated cleaning services, civil works, HVAC, electrical, plumbing';

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDesc} />
                <meta name="keywords" content={metaKeywords} />

                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={metaDesc} />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="website" />

                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={metaDesc} />

                <link rel="canonical" href={currentUrl} />

                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        serviceType: 'Civil Construction, MEP, Manpower Supply, Dedicated Cleaning',
                        provider: { '@type': 'Organization', name: 'Arkaan Construction Company' },
                        areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
                        hasOfferCatalog: {
                            '@type': 'OfferCatalog',
                            name: 'Construction Services',
                            itemListElement: services.map((s) => ({
                                '@type': 'Offer',
                                itemOffered: { '@type': 'Service', name: s.title_en },
                            })),
                        },
                    })}
                </script>
            </Head>
            <Layout>
                <PageHero
                    hero={hero}
                    fallbackTitle={t('services.page.title')}
                    fallbackSubtitle={t('services.page.subtitle')}
                    language={language}
                    videoUrl={SERVICES_HERO_VIDEO}
                />

                {/* Capabilities in motion — workforce video banner */}
                <WhenVisible>
                    <section className="relative flex h-[340px] items-center justify-center overflow-hidden border-b-4 border-accent lg:h-[420px]">
                        <video
                            src={WORKFORCE_VIDEO}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-hidden="true"
                            className="hero-bg-video absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="hero-overlay absolute inset-0" />
                        <div className="container-custom relative z-10 text-center">
                            <span className="eyebrow text-primary-foreground">
                                {language === 'en' ? 'Capabilities' : 'الإمكانيات'}
                            </span>
                            <h2 className="mt-2 text-3xl font-bold text-primary-foreground sm:text-4xl">
                                {language === 'en' ? 'One Partner, Every Discipline' : 'شريك واحد، لكل التخصصات'}
                            </h2>
                            <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/85">
                                {language === 'en'
                                    ? 'From civil works to workforce mobilization — explore how we deliver each service below.'
                                    : 'من الأعمال المدنية إلى تعبئة القوى العاملة — تعرف على كيفية تنفيذنا لكل خدمة أدناه.'}
                            </p>
                        </div>
                    </section>
                </WhenVisible>

                {/* Service tiles */}
                <div className="section-padding">
                    <div className="container-custom">
                        <div className="mx-auto mb-12 max-w-2xl text-center">
                            <span className="eyebrow">{t('services.title')}</span>
                            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                                {t('services.subtitle')}
                            </h2>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2">
                            {services.map((service, index) => {
                                const Icon = ICON_MAP[service.icon || ''] || HardHat;
                                const image = getImageUrl(service.image) || IMAGE_BY_SLUG[service.slug] || FALLBACK_IMAGE;
                                const itemCount = service.items?.length ?? 0;
                                return (
                                    <WhenVisible
                                        key={service.id}
                                        options={{ threshold: 0.1 }}
                                        style={{ transitionDelay: `${index * 80}ms` }}
                                    >
                                        <Link
                                            href={`/services/${service.slug}`}
                                            className="card-elevated group flex flex-col overflow-hidden lg:flex-row"
                                        >
                                            <div className="relative h-56 overflow-hidden lg:h-auto lg:w-2/5">
                                                <img
                                                    src={image}
                                                    alt={language === 'en' ? service.title_en : service.title_ar}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent lg:bg-gradient-to-r" />
                                            </div>
                                            <div className="flex flex-1 flex-col p-6 lg:p-8">
                                                <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-sm hero-gradient border-b-2 border-accent">
                                                    <Icon className="h-7 w-7 text-primary-foreground" />
                                                </div>
                                                <h3 className="mb-2 text-xl font-bold text-foreground">
                                                    {language === 'en' ? service.title_en : service.title_ar}
                                                </h3>
                                                <p className="mb-4 flex-1 text-sm text-muted-foreground">
                                                    {language === 'en' ? service.description_en : service.description_ar}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    {itemCount > 0 && (
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                            {itemCount} {language === 'en' ? 'capabilities' : 'قدرات'}
                                                        </span>
                                                    )}
                                                    <span className="inline-flex items-center text-sm font-semibold text-primary">
                                                        {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                                                        <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </WhenVisible>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <WhenVisible>
                    <CTASection />
                </WhenVisible>
            </Layout>
        </>
    );
}
