import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Building2, Zap, Users, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/page-hero';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import WhenVisible from '@/components/ui/when-visible';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ServiceItem {
    id: number;
    text_en: string;
    text_ar: string;
}

interface Service {
    id: number;
    slug: string;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    icon?: string;
    image?: string;
    items?: ServiceItem[];
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

interface ServicesProps {
    hero?: HeroData | null;
    services?: Service[];
    manpowerCategories?: ManpowerCategoryItem[];
    cleaningScopes?: CleaningScope[];
    manpowerCategoriesTitle?: HseContentItem | null;
    cleaningMatrixTitle?: HseContentItem | null;
    manpowerFormLink?: HseContentItem | null;
}

function getImageUrl(img: string | undefined | null): string {
    if (!img || typeof img !== 'string') return '';
    return img.startsWith('http') || img.startsWith('/') ? img : `/storage/${img}`;
}

export default function Services({
    hero,
    services = [],
    manpowerCategories: rawManpower = [],
    cleaningScopes: rawCleaning = [],
    manpowerCategoriesTitle,
    cleaningMatrixTitle,
    manpowerFormLink,
}: ServicesProps) {
    const { t, language, direction } = useLanguage();
    const { toast } = useToast();
    const { flash } = usePage().props as { flash?: { success?: boolean } };
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const manpowerCategories = rawManpower.length > 0
        ? rawManpower.map((c) => ({
            category: language === 'en' ? c.category_en : c.category_ar,
            shortTerm: c.short_term ? '✓' : '',
            longTerm: c.long_term ? '✓' : '',
            projectBased: c.project_based ? '✓' : '',
        }))
        : [
            { category: language === 'en' ? 'Project Managers' : 'مديرو المشاريع', shortTerm: '✓', longTerm: '✓', projectBased: '✓' },
            { category: language === 'en' ? 'Engineers' : 'المهندسون', shortTerm: '✓', longTerm: '✓', projectBased: '✓' },
            { category: language === 'en' ? 'Supervisors' : 'المشرفون', shortTerm: '✓', longTerm: '✓', projectBased: '✓' },
            { category: language === 'en' ? 'Skilled Workers' : 'العمال المهرة', shortTerm: '✓', longTerm: '✓', projectBased: '✓' },
            { category: language === 'en' ? 'Semi-skilled Workers' : 'العمال شبه المهرة', shortTerm: '✓', longTerm: '✓', projectBased: '✓' },
            { category: language === 'en' ? 'Male Cleaners' : 'عمال النظافة (ذكور)', shortTerm: '✓', longTerm: '✓', projectBased: '✓' },
            { category: language === 'en' ? 'Female Cleaners' : 'عمال النظافة (إناث)', shortTerm: '✓', longTerm: '✓', projectBased: '✓' },
        ];

    const cleaningMatrix = rawCleaning.length > 0
        ? rawCleaning.map((s) => ({
            category: language === 'en' ? s.category_en : s.category_ar,
            services: (s.items ?? []).map((i) => (language === 'en' ? i.text_en : i.text_ar)),
        }))
        : [
            { category: language === 'en' ? 'Office Cleaning' : 'تنظيف المكاتب', services: language === 'en' ? ['Daily office cleaning', 'Carpet and upholstery cleaning', 'Window cleaning', 'Restroom maintenance', 'Waste management', 'Floor care and polishing'] : ['تنظيف المكاتب اليومي', 'تنظيف السجاد والأثاث', 'تنظيف النوافذ', 'صيانة دورات المياه', 'إدارة النفايات', 'العناية بالأرضيات وتلميعها'] },
            { category: language === 'en' ? 'Industrial Cleaning' : 'التنظيف الصناعي', services: language === 'en' ? ['Factory floor cleaning', 'Equipment cleaning', 'Hazardous waste handling', 'High-pressure washing', 'Tank and vessel cleaning', 'Industrial degreasing'] : ['تنظيف أرضيات المصانع', 'تنظيف المعدات', 'معالجة النفايات الخطرة', 'الغسيل بالضغط العالي', 'تنظيف الخزانات والأوعية', 'إزالة الشحوم الصناعية'] },
            { category: language === 'en' ? 'Post-Construction Cleaning' : 'التنظيف بعد البناء', services: language === 'en' ? ['Construction debris removal', 'Final cleaning and polishing', 'Window and glass cleaning', 'Floor deep cleaning', 'Sanitization', 'Waste disposal'] : ['إزالة مخلفات البناء', 'التنظيف النهائي والتلميع', 'تنظيف النوافذ والزجاج', 'التنظيف العميق للأرضيات', 'التعقيم', 'التخلص من النفايات'] },
        ];

    useEffect(() => {
        if (flash?.success) {
            toast({
                title: language === 'en' ? 'Request Submitted' : 'تم إرسال الطلب',
                description: language === 'en' ? 'We will contact you soon.' : 'سنتواصل معك قريبًا.',
            });
        }
    }, [flash?.success, language, toast]);

    const toggleRow = (index: number) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedRows(newExpanded);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        setIsSubmitting(true);

        router.post('/quote-request', {
            company: formData.get('company') as string,
            contact_person: formData.get('contact') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            service_type: formData.get('serviceType') as string || null,
            preferred_start_date: formData.get('startDate') as string || null,
            requirement_details: formData.get('requirement') as string || null,
        }, {
            preserveScroll: true,
            onFinish: () => setIsSubmitting(false),
            onSuccess: () => form.reset(),
        });
    };

    const pageTitle = hero?.meta_title_en || hero?.meta_title_ar
        ? (language === 'en' ? hero.meta_title_en : hero.meta_title_ar) ?? 'Services - Arkaan Global Contracting'
        : 'Services - Arkaan Global Contracting | Construction, MEP, Manpower & Cleaning';
    const metaDesc = hero?.meta_description_en || hero?.meta_description_ar
        ? (language === 'en' ? hero.meta_description_en : hero.meta_description_ar) ?? ''
        : 'Comprehensive services: General Construction & Civil Works, MEP Services, Manpower Solutions, and Dedicated Cleaning Services across Saudi Arabia.';
    const metaKeywords = hero?.meta_keywords ?? 'construction services, MEP services, manpower solutions, cleaning services, civil works, HVAC, electrical, plumbing';

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
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Construction, MEP, Manpower, Cleaning Services",
                        "provider": {
                            "@type": "Organization",
                            "name": "Arkaan Global Contracting"
                        },
                        "areaServed": {
                            "@type": "Country",
                            "name": "Saudi Arabia"
                        },
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Construction Services",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "General Construction & Civil Works"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "MEP Services"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Manpower Solutions"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Dedicated Cleaning Services"
                                    }
                                }
                            ]
                        }
                    })}
                </script>
            </Head>
            <Layout>
            <PageHero
                hero={hero}
                fallbackTitle={t('services.page.title')}
                fallbackSubtitle={t('services.page.subtitle')}
                language={language}
            />

            <div className="section-padding">
                <div className="container-custom space-y-20">
                    {/* General Construction & Civil Works */}
                    <WhenVisible id="construction" className="scroll-mt-24">
                        <section>
                            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                                <div>
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient">
                                            <Building2 className="h-8 w-8 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-foreground">
                                                {services.find((s) => s.slug === 'construction')
                                                    ? (language === 'en'
                                                        ? services.find((s) => s.slug === 'construction')!.title_en
                                                        : services.find((s) => s.slug === 'construction')!.title_ar)
                                                    : t('services.construction.title')}
                                            </h2>
                                            <p className="text-muted-foreground">
                                                {services.find((s) => s.slug === 'construction')
                                                    ? (language === 'en'
                                                        ? services.find((s) => s.slug === 'construction')!.description_en
                                                        : services.find((s) => s.slug === 'construction')!.description_ar)
                                                    : t('services.construction.description')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card-elevated p-8">
                                        <ul className="space-y-3">
                                            {(
                                                (() => {
                                                    const svc = services.find((s) => s.slug === 'construction');
                                                    if (svc?.items?.length) {
                                                        return svc.items.map((it) =>
                                                            language === 'en' ? it.text_en : it.text_ar
                                                        );
                                                    }
                                                    return language === 'en'
                                                        ? ['Building construction and renovation', 'Infrastructure development', 'Road and bridge construction', 'Site preparation and earthworks', 'Concrete works', 'Steel structure installation', 'Finishing works']
                                                        : ['بناء وتجديد المباني', 'تطوير البنية التحتية', 'بناء الطرق والجسور', 'إعداد الموقع والأعمال الترابية', 'أعمال الخرسانة', 'تركيب الهياكل الفولاذية', 'أعمال التشطيب'];
                                                })()
                                            ).map((item, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                                                    <span className="text-muted-foreground">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src={getImageUrl(services.find((s) => s.slug === 'construction')?.image) || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070'}
                                        alt="Construction work"
                                        className="w-full h-[400px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                                </div>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* MEP Services */}
                    <WhenVisible id="mep" className="scroll-mt-24">
                        <section>
                            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
                                    <img
                                        src={getImageUrl(services.find((s) => s.slug === 'mep')?.image) || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069'}
                                        alt="MEP services"
                                        className="w-full h-[400px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                                </div>
                                <div className="order-1 lg:order-2">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient">
                                            <Zap className="h-8 w-8 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-foreground">
                                                {services.find((s) => s.slug === 'mep')
                                                    ? (language === 'en'
                                                        ? services.find((s) => s.slug === 'mep')!.title_en
                                                        : services.find((s) => s.slug === 'mep')!.title_ar)
                                                    : t('services.mep.title')}
                                            </h2>
                                            <p className="text-muted-foreground">
                                                {services.find((s) => s.slug === 'mep')
                                                    ? (language === 'en'
                                                        ? services.find((s) => s.slug === 'mep')!.description_en
                                                        : services.find((s) => s.slug === 'mep')!.description_ar)
                                                    : t('services.mep.description')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card-elevated p-8">
                                        <ul className="space-y-3">
                                            {(
                                                (() => {
                                                    const svc = services.find((s) => s.slug === 'mep');
                                                    if (svc?.items?.length) {
                                                        return svc.items.map((it) =>
                                                            language === 'en' ? it.text_en : it.text_ar
                                                        );
                                                    }
                                                    return language === 'en'
                                                        ? ['Electrical installation and maintenance', 'HVAC systems installation', 'Plumbing and water systems', 'Fire safety systems', 'Low voltage systems', 'Building automation', 'MEP maintenance and repair']
                                                        : ['تركيب وصيانة الكهرباء', 'تركيب أنظمة التكييف والتهوية', 'السباكة وأنظمة المياه', 'أنظمة السلامة من الحرائق', 'أنظمة الجهد المنخفض', 'أتمتة المباني', 'صيانة وإصلاح الميكانيكا والكهرباء'];
                                                })()
                                            ).map((item, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                                                    <span className="text-muted-foreground">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Manpower Solutions */}
                    <WhenVisible id="manpower" className="scroll-mt-24">
                        <section>
                            <div className="mb-8 text-center">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient mb-4 mx-auto">
                                    <Users className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                                    {services.find((s) => s.slug === 'manpower')
                                        ? (language === 'en'
                                            ? services.find((s) => s.slug === 'manpower')!.title_en
                                            : services.find((s) => s.slug === 'manpower')!.title_ar)
                                        : t('services.manpower.title')}
                                </h2>
                                <p className="mt-2 text-muted-foreground">
                                    {services.find((s) => s.slug === 'manpower')
                                        ? (language === 'en'
                                            ? services.find((s) => s.slug === 'manpower')!.description_en
                                            : services.find((s) => s.slug === 'manpower')!.description_ar)
                                        : t('services.manpower.description')}
                                </p>
                            </div>

                            <div className="mb-8 grid gap-4 sm:grid-cols-3">
                                <div className="relative rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src={getImageUrl(services.find((s) => s.slug === 'manpower')?.image) || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800'}
                                        alt="Workforce"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                                </div>
                                <div className="relative rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800"
                                        alt="Construction team"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                                </div>
                                <div className="relative rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800"
                                        alt="Skilled workers"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                                </div>
                            </div>

                            <div className="card-elevated overflow-hidden p-8">
                                <div className="mb-6">
                                    <h3 className="mb-4 text-xl font-semibold text-foreground">
                                        {manpowerCategoriesTitle
                                            ? (language === 'en' ? manpowerCategoriesTitle.content_en : manpowerCategoriesTitle.content_ar) || (language === 'en' ? 'Manpower Categories & Deployment Options' : 'فئات القوى العاملة وخيارات النشر')
                                            : language === 'en' ? 'Manpower Categories & Deployment Options' : 'فئات القوى العاملة وخيارات النشر'}
                                    </h3>
                                </div>

                                {/* Desktop Table */}
                                <div className="hidden overflow-x-auto lg:block">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-border bg-muted/50">
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                                                    {language === 'en' ? 'Category' : 'الفئة'}
                                                </th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                                                    {language === 'en' ? 'Short-term' : 'قصير الأجل'}
                                                </th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                                                    {language === 'en' ? 'Long-term' : 'طويل الأجل'}
                                                </th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                                                    {language === 'en' ? 'Project-based' : 'قائم على المشروع'}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {manpowerCategories.map((row, i) => (
                                                <tr key={i} className="border-b border-border">
                                                    <td className="px-4 py-3 text-sm text-foreground">{row.category}</td>
                                                    <td className="px-4 py-3 text-center text-primary">{row.shortTerm}</td>
                                                    <td className="px-4 py-3 text-center text-primary">{row.longTerm}</td>
                                                    <td className="px-4 py-3 text-center text-primary">{row.projectBased}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Accordion */}
                                <div className="lg:hidden space-y-2">
                                    {manpowerCategories.map((row, i) => (
                                        <div key={i} className="border border-border rounded-lg overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() => toggleRow(i)}
                                                className="w-full px-4 py-3 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
                                            >
                                                <span className="font-medium text-foreground">{row.category}</span>
                                                <span className="text-primary">
                                                    {expandedRows.has(i) ? '−' : '+'}
                                                </span>
                                            </button>
                                            {expandedRows.has(i) && (
                                                <div className="px-4 py-3 space-y-2 bg-card">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            {language === 'en' ? 'Short-term' : 'قصير الأجل'}
                                                        </span>
                                                        <span className="text-primary">{row.shortTerm}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            {language === 'en' ? 'Long-term' : 'طويل الأجل'}
                                                        </span>
                                                        <span className="text-primary">{row.longTerm}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            {language === 'en' ? 'Project-based' : 'قائم على المشروع'}
                                                        </span>
                                                        <span className="text-primary">{row.projectBased}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-6 border-t border-border">
                                    <a
                                        href={manpowerFormLink?.link || '/manpower-request-form.pdf'}
                                        download
                                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                                    >
                                        <Download className="h-4 w-4" />
                                        <span>{language === 'en' ? 'Download Manpower Request Form' : 'تحميل نموذج طلب القوى العاملة'}</span>
                                    </a>
                                </div>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Dedicated Cleaning Services */}
                    <WhenVisible id="cleaning" className="scroll-mt-24">
                        <section>
                            <div className="mb-8 text-center">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient mb-4 mx-auto">
                                    <Sparkles className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                                    {services.find((s) => s.slug === 'cleaning')
                                        ? (language === 'en'
                                            ? services.find((s) => s.slug === 'cleaning')!.title_en
                                            : services.find((s) => s.slug === 'cleaning')!.title_ar)
                                        : t('services.cleaning.title')}
                                </h2>
                                <p className="mt-2 text-muted-foreground">
                                    {services.find((s) => s.slug === 'cleaning')
                                        ? (language === 'en'
                                            ? services.find((s) => s.slug === 'cleaning')!.description_en
                                            : services.find((s) => s.slug === 'cleaning')!.description_ar)
                                        : t('services.cleaning.description')}
                                </p>
                            </div>

                            <div className="mb-8 grid gap-4 sm:grid-cols-2">
                                <div className="relative rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src={getImageUrl(services.find((s) => s.slug === 'cleaning')?.image) || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800'}
                                        alt="Office cleaning"
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent flex items-end p-4">
                                        <span className="text-white font-semibold text-lg">
                                            {language === 'en' ? 'Professional Cleaning' : 'تنظيف احترافي'}
                                        </span>
                                    </div>
                                </div>
                                <div className="relative rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=800"
                                        alt="Industrial cleaning"
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent flex items-end p-4">
                                        <span className="text-white font-semibold text-lg">
                                            {language === 'en' ? 'Industrial Solutions' : 'حلول صناعية'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-elevated overflow-hidden p-8">
                                <h3 className="mb-6 text-xl font-semibold text-foreground">
                                    {cleaningMatrixTitle
                                        ? (language === 'en' ? cleaningMatrixTitle.content_en : cleaningMatrixTitle.content_ar) || (language === 'en' ? 'Cleaning Services Scope Matrix' : 'مصفوفة نطاق خدمات التنظيف')
                                        : language === 'en' ? 'Cleaning Services Scope Matrix' : 'مصفوفة نطاق خدمات التنظيف'}
                                </h3>

                                {/* Desktop Table */}
                                <div className="hidden overflow-x-auto lg:block">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-border bg-muted/50">
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                                                    {language === 'en' ? 'Service Category' : 'فئة الخدمة'}
                                                </th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                                                    {language === 'en' ? 'Services' : 'الخدمات'}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cleaningMatrix.map((row, i) => (
                                                <tr key={i} className="border-b border-border">
                                                    <td className="px-4 py-3 text-sm font-medium text-foreground align-top">
                                                        {row.category}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <ul className="space-y-1">
                                                            {row.services.map((service, j) => (
                                                                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                                    <span className="text-primary mt-1">•</span>
                                                                    <span>{service}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Accordion */}
                                <div className="lg:hidden space-y-2">
                                    {cleaningMatrix.map((row, i) => (
                                        <div key={i} className="border border-border rounded-lg overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() => toggleRow(i + 100)}
                                                className="w-full px-4 py-3 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
                                            >
                                                <span className="font-medium text-foreground">{row.category}</span>
                                                <span className="text-primary">
                                                    {expandedRows.has(i + 100) ? '−' : '+'}
                                                </span>
                                            </button>
                                            {expandedRows.has(i + 100) && (
                                                <div className="px-4 py-3 space-y-2 bg-card">
                                                    <ul className="space-y-2">
                                                        {row.services.map((service, j) => (
                                                            <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                                <span className="text-primary mt-1">•</span>
                                                                <span>{service}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Request Form */}
                    <WhenVisible className="scroll-mt-24">
                        <section className="card-elevated p-8">
                            <h2 className="mb-6 text-2xl font-bold text-foreground">
                                {language === 'en' ? 'Request Manpower / Quote' : 'طلب القوى العاملة / عرض سعر'}
                            </h2>
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="company">
                                            {language === 'en' ? 'Company Name' : 'اسم الشركة'}
                                        </Label>
                                        <Input id="company" name="company" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact">
                                            {language === 'en' ? 'Contact Person' : 'الشخص المسؤول'}
                                        </Label>
                                        <Input id="contact" name="contact" required />
                                    </div>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                                        </Label>
                                        <Input id="email" name="email" type="email" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">
                                            {language === 'en' ? 'Phone' : 'الهاتف'}
                                        </Label>
                                        <Input id="phone" name="phone" type="tel" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="serviceType">
                                        {language === 'en' ? 'Service Type' : 'نوع الخدمة'}
                                    </Label>
                                    <Select name="serviceType" required>
                                        <SelectTrigger id="serviceType">
                                            <SelectValue placeholder={language === 'en' ? 'Select service...' : 'اختر الخدمة...'} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {services.length > 0
                                                ? services.map((s) => (
                                                      <SelectItem key={s.id} value={s.slug}>
                                                          {language === 'en' ? s.title_en : s.title_ar}
                                                      </SelectItem>
                                                  ))
                                                : [
                                                      <SelectItem key="construction" value="construction">{t('services.construction.title')}</SelectItem>,
                                                      <SelectItem key="mep" value="mep">{t('services.mep.title')}</SelectItem>,
                                                      <SelectItem key="manpower" value="manpower">{t('services.manpower.title')}</SelectItem>,
                                                      <SelectItem key="cleaning" value="cleaning">{t('services.cleaning.title')}</SelectItem>,
                                                  ]}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="startDate">
                                        {language === 'en' ? 'Preferred Start Date' : 'تاريخ البدء المفضل'}
                                    </Label>
                                    <Input id="startDate" name="startDate" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="requirement">
                                        {language === 'en' ? 'Requirement Details' : 'تفاصيل المتطلبات'}
                                    </Label>
                                    <Textarea id="requirement" name="requirement" rows={4} />
                                </div>
                                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                                    {isSubmitting
                                        ? language === 'en'
                                            ? 'Submitting...'
                                            : 'جاري الإرسال...'
                                        : language === 'en'
                                            ? 'Submit Request'
                                            : 'إرسال الطلب'}
                                </Button>
                            </form>
                        </section>
                    </WhenVisible>
                </div>
            </div>
        </Layout>
        </>
    );
}
