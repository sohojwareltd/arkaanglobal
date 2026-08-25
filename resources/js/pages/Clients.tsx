import React from 'react';
import { Head } from '@inertiajs/react';
import { Building2, Landmark, Briefcase, Factory, LucideIcon } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/page-hero';
import { useLanguage } from '@/contexts/LanguageContext';
import WhenVisible from '@/components/ui/when-visible';

const iconMap: Record<string, LucideIcon> = {
    building: Building2,
    landmark: Landmark,
    briefcase: Briefcase,
    factory: Factory,
};

// On-theme imagery per sector — matches the profile's own client-footprint photography.
const IMAGE_BY_ICON: Record<string, string> = {
    building: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=1200',
    landmark: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?q=80&w=1200',
    briefcase: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200',
    factory: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1200',
};

interface ClientCategoryItem {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    icon?: string;
}

interface HeroData {
    title_en?: string;
    title_ar?: string;
    subtitle_en?: string;
    subtitle_ar?: string;
    background_image?: string;
}

interface ClientsProps {
    hero?: HeroData | null;
    clientCategories?: ClientCategoryItem[];
}

const DEFAULT_CATEGORIES: ClientCategoryItem[] = [
    { id: 1, name_en: 'Government', name_ar: 'حكومي', icon: 'building', description_en: 'Ministries, municipalities, authorities, and public institutions.', description_ar: 'الوزارات والبلديات والهيئات والمؤسسات الحكومية.' },
    { id: 2, name_en: 'Semi-Government', name_ar: 'شبه حكومي', icon: 'landmark', description_en: 'Semi-government entities, public corporations, and development authorities.', description_ar: 'الجهات شبه الحكومية والمؤسسات العامة وهيئات التطوير.' },
    { id: 3, name_en: 'Private', name_ar: 'خاص', icon: 'briefcase', description_en: 'Private developers, EPC contractors, consultants, and corporate organizations.', description_ar: 'المطورون ومقاولو EPC والاستشاريون والمؤسسات الخاصة.' },
    { id: 4, name_en: 'Industrial', name_ar: 'صناعي', icon: 'factory', description_en: 'Oil & gas, petrochemical, manufacturing, logistics, and commercial facilities.', description_ar: 'النفط والغاز والبتروكيماويات والتصنيع والخدمات اللوجستية والمنشآت التجارية.' },
];

export default function Clients({ hero, clientCategories = [] }: ClientsProps) {
    const { t, language } = useLanguage();

    const categories = clientCategories.length > 0 ? clientCategories : DEFAULT_CATEGORIES;
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <>
            <Head>
                <title>Our Clients & Industry Footprint - Arkaan Construction Company</title>
                <meta
                    name="description"
                    content="Arkaan Construction Company serves government, semi-government, industrial, and private sector clients across the Kingdom of Saudi Arabia."
                />
                <meta property="og:title" content="Our Clients & Industry Footprint - Arkaan Construction Company" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={currentUrl} />
            </Head>
            <Layout>
                <PageHero
                    hero={hero}
                    fallbackTitle={t('clients.page.title')}
                    fallbackSubtitle={t('clients.page.subtitle')}
                    language={language}
                />

                {/* Intro */}
                <section className="section-padding pb-0">
                    <div className="container-custom">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                                {language === 'en' ? 'Our Core Clients & Markets Served' : 'أهم عملائنا والأسواق التي نخدمها'}
                            </h2>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {language === 'en'
                                    ? 'ARKAAN CONSTRUCTION COMPANY proudly serves a diverse portfolio of clients across the public and private sectors, delivering reliable construction, manpower, MEP, and support services tailored to the unique requirements of each industry.'
                                    : 'تخدم شركة أركان للمقاولات بفخر مجموعة متنوعة من العملاء في القطاعين العام والخاص، وتقدم خدمات إنشائية وقوى عاملة وكهروميكانيكية وخدمات دعم موثوقة مصممة خصيصاً لتلبية احتياجات كل قطاع.'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sector Categories */}
                <section className="section-padding">
                    <div className="container-custom">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {categories.map((category, index) => {
                                const Icon = iconMap[category.icon || ''] || Building2;
                                const image = IMAGE_BY_ICON[category.icon || ''] || IMAGE_BY_ICON.building;
                                return (
                                    <WhenVisible
                                        key={category.id}
                                        className="card-elevated overflow-hidden"
                                        options={{ threshold: 0.1 }}
                                        style={{ transitionDelay: `${index * 60}ms` }}
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={image}
                                                alt={language === 'en' ? category.name_en : category.name_ar}
                                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent" />
                                            <div className="absolute left-4 top-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-sm hero-gradient border-b-2 border-accent">
                                                <Icon className="h-6 w-6 text-primary-foreground" />
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="mb-2 text-lg font-bold text-foreground">
                                                {language === 'en' ? category.name_en : category.name_ar}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {language === 'en' ? category.description_en : category.description_ar}
                                            </p>
                                        </div>
                                    </WhenVisible>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
