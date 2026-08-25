import React, { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    MapPin, Users, Building2, ChevronRight, ArrowRight,
    Clock, Zap, RefreshCw, ShieldCheck, TrendingUp, CheckCircle2, LucideIcon,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/page-hero';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import WhenVisible from '@/components/ui/when-visible';
import { cn } from '@/lib/utils';

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
    gallery_items?: unknown[];
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
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400';

// Real content from the ARKAAN company profile ("Deployment Capability", p.21) —
// distinct from the service catalog on /services, this page covers *how* we
// mobilize and manage workforce, not *what* services we offer.
const DEPLOYMENT_CAPABILITIES: { icon: LucideIcon; title_en: string; title_ar: string; desc_en: string; desc_ar: string }[] = [
    {
        icon: Clock,
        title_en: 'Short-Term & Long-Term Deployment',
        title_ar: 'نشر قصير وطويل الأجل',
        desc_en: 'Provision of qualified personnel for temporary assignments, long-term contracts, maintenance activities, and ongoing operational support.',
        desc_ar: 'توفير كوادر مؤهلة للمهام المؤقتة والعقود طويلة الأجل وأنشطة الصيانة والدعم التشغيلي المستمر.',
    },
    {
        icon: Zap,
        title_en: 'Project-Based Mobilization',
        title_ar: 'التعبئة القائمة على المشاريع',
        desc_en: 'Rapid mobilization of skilled, semi-skilled, and professional manpower for construction projects, industrial shutdowns, plant turnarounds, and peak workload requirements.',
        desc_ar: 'تعبئة سريعة للقوى العاملة الماهرة وشبه الماهرة والمهنية لمشاريع البناء وعمليات إيقاف المصانع ومتطلبات ذروة العمل.',
    },
    {
        icon: RefreshCw,
        title_en: 'Replacement & Attendance Management',
        title_ar: 'إدارة الاستبدال والحضور',
        desc_en: 'Efficient workforce management including employee replacement, attendance monitoring, leave coordination, and continuous manpower availability.',
        desc_ar: 'إدارة فعالة للقوى العاملة تشمل استبدال الموظفين ومراقبة الحضور وتنسيق الإجازات وضمان التوفر المستمر للعمالة.',
    },
    {
        icon: ShieldCheck,
        title_en: 'Compliance & Workforce Administration',
        title_ar: 'الامتثال وإدارة شؤون القوى العاملة',
        desc_en: 'Full compliance with Saudi labor laws, MHRSD regulations, and GOSI requirements — every deployed employee holds valid documentation, certifications, and medical fitness.',
        desc_ar: 'امتثال كامل لأنظمة العمل السعودية ولوائح وزارة الموارد البشرية ومتطلبات التأمينات الاجتماعية — يحمل كل موظف موثقاً وشهادات ولياقة طبية سارية.',
    },
    {
        icon: TrendingUp,
        title_en: 'Scalable Workforce Solutions',
        title_ar: 'حلول قوى عاملة قابلة للتوسع',
        desc_en: 'Flexible manpower deployment tailored to project size, duration, and operational requirements, enabling clients to scale efficiently.',
        desc_ar: 'نشر مرن للقوى العاملة مصمم وفق حجم المشروع ومدته ومتطلباته التشغيلية، بما يتيح للعملاء التوسع بكفاءة.',
    },
];

// Real content from the profile's "Manpower Compliance" page (p.22).
const COMPLIANCE_STANDARDS: { en: string; ar: string }[] = [
    { en: 'Full compliance with the Kingdom of Saudi Arabia Labor Law and MHRSD regulations', ar: 'الامتثال الكامل لنظام العمل في المملكة العربية السعودية ولوائح وزارة الموارد البشرية' },
    { en: 'Adherence to client-specific HSE policies, site regulations, and project requirements', ar: 'الالتزام بسياسات السلامة الخاصة بالعملاء ولوائح الموقع ومتطلبات المشروع' },
    { en: 'Compliance with Saudi Aramco, Royal Commission for Jubail & Yanbu (RCJY), and other industrial standards', ar: 'الامتثال لمعايير أرامكو السعودية والهيئة الملكية للجبيل وينبع والمعايير الصناعية الأخرى' },
    { en: 'Verification of employee qualifications, trade certifications, and competency before deployment', ar: 'التحقق من مؤهلات الموظفين وشهاداتهم المهنية وكفاءتهم قبل النشر' },
    { en: 'Mandatory medical fitness, safety induction, and job-specific training for all personnel', ar: 'اللياقة الطبية الإلزامية والتوجيه على السلامة والتدريب الخاص بالوظيفة لجميع الموظفين' },
    { en: 'Valid work permits, residency documentation (Iqama), and statutory compliance', ar: 'تصاريح عمل سارية ووثائق إقامة نظامية والامتثال القانوني' },
    { en: 'Continuous supervision, attendance monitoring, and workforce performance management', ar: 'الإشراف المستمر ومراقبة الحضور وإدارة أداء القوى العاملة' },
    { en: 'Commitment to ethical employment practices, worker welfare, and a safe working environment', ar: 'الالتزام بممارسات التوظيف الأخلاقية ورعاية العمال وبيئة عمل آمنة' },
];

export default function Projects({ hero, projects = [] }: ProjectsProps) {
    const { t, language } = useLanguage();
    const [activeFilter, setActiveFilter] = useState('all');
    const [isFiltering, setIsFiltering] = useState(false);

    const allFilters = [
        { id: 'construction', label: t('projects.filter.construction') },
        { id: 'infrastructure', label: t('projects.filter.infrastructure') },
        { id: 'commercial', label: t('projects.filter.commercial') },
        { id: 'industrial', label: t('projects.filter.industrial') },
    ];

    // Only offer a filter for categories that actually have at least one
    // active project — an empty filter button would just lead to a blank grid.
    const filters = useMemo(() => {
        const categoriesWithProjects = new Set(projects.map((p) => p.category));
        const availableFilters = allFilters.filter((f) => categoriesWithProjects.has(f.id));

        return availableFilters.length > 1
            ? [{ id: 'all', label: t('projects.filter.all') }, ...availableFilters]
            : availableFilters;
    }, [projects, t]);

    const displayProjects = projects.map((p) => ({
        ...p,
        title: language === 'en' ? p.title_en : p.title_ar,
        location: language === 'en' ? p.location_en : p.location_ar,
        description: language === 'en' ? p.description_en : p.description_ar,
        image: p.image
            ? p.image.startsWith('http')
                ? p.image
                : p.image.startsWith('/')
                    ? p.image
                    : `/storage/${p.image}`
            : FALLBACK_IMAGE,
        client: p.client,
        gallery_items: p.gallery_items,
    }));

    const filteredProjects = activeFilter === 'all' ? displayProjects : displayProjects.filter((p) => p.category === activeFilter);

    const handleFilterChange = (id: string) => {
        if (id === activeFilter) {
            return;
        }

        setIsFiltering(true);

        setTimeout(() => {
            setActiveFilter(id);
            setIsFiltering(false);
        }, 180);
    };

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <>
            <Head>
                <title>Deployment Capability & Compliance - Arkaan Construction Company</title>
                <meta
                    name="description"
                    content="How Arkaan Construction Company mobilizes, manages, and ensures compliant workforce deployment across the Kingdom of Saudi Arabia."
                />
                <meta property="og:title" content="Deployment Capability & Compliance - Arkaan Construction Company" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={currentUrl} />
            </Head>
            <Layout>
                <PageHero
                    hero={hero}
                    fallbackTitle={t('projects.page.title')}
                    fallbackSubtitle={t('projects.page.subtitle')}
                    language={language}
                />

                {displayProjects.length > 0 && (
                    <>
                        {/* Filters */}
                        {filters.length > 1 && (
                            <section className="top-16 z-40 border-b border-border bg-background py-8 lg:top-20">
                                <div className="container-custom">
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {filters.map((filter) => (
                                            <Button
                                                key={filter.id}
                                                variant={activeFilter === filter.id ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => handleFilterChange(filter.id)}
                                                className={cn(activeFilter === filter.id && 'hero-gradient border-0')}
                                            >
                                                {filter.label}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Projects Grid */}
                        <section className="section-padding pb-0">
                            <div className="container-custom">
                                <div
                                    className={cn(
                                        'grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500',
                                        isFiltering ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0',
                                    )}
                                >
                                    {filteredProjects.map((project, index) => (
                                        <WhenVisible
                                            key={project.id ?? index}
                                            options={{ threshold: 0.1 }}
                                            style={{ transitionDelay: `${index * 40}ms` }}
                                        >
                                            <Link
                                                href={`/projects/${project.id}`}
                                                className="card-elevated overflow-hidden group block hover:shadow-xl transition-shadow"
                                            >
                                                <div className="relative aspect-video overflow-hidden">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium capitalize text-primary-foreground">
                                                        {filters.find((f) => f.id === project.category)?.label}
                                                    </div>
                                                    <div className="absolute right-4 bottom-4 flex items-center gap-1 text-primary-foreground text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {language === 'en' ? 'View' : 'عرض'}
                                                        <ChevronRight className="h-4 w-4" />
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="mb-2 text-xl font-bold text-foreground">{project.title}</h3>
                                                    {project.client && (
                                                        <div className="mb-2 flex items-center gap-2 text-sm text-primary">
                                                            <Building2 className="h-4 w-4 shrink-0" />
                                                            <span>{project.client.name}</span>
                                                        </div>
                                                    )}
                                                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="h-4 w-4 text-primary" />
                                                            <span>{project.location}</span>
                                                        </div>
                                                        {project.workers && (
                                                            <div className="flex items-center gap-1">
                                                                <Users className="h-4 w-4 text-primary" />
                                                                <span>
                                                                    {project.workers} {language === 'en' ? 'Workers' : 'عامل'}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        </WhenVisible>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {/* Deployment Capability */}
                <div className="section-padding">
                    <div className="container-custom space-y-16">
                        <WhenVisible>
                            <section>
                                <div className="mx-auto mb-12 max-w-2xl text-center">
                                    <span className="eyebrow">{language === 'en' ? 'How We Mobilize' : 'كيف نعبئ القوى العاملة'}</span>
                                    <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                                        {language === 'en' ? 'Deployment Capability' : 'قدرة النشر والتعبئة'}
                                    </h2>
                                    <p className="mt-4 text-lg text-muted-foreground">
                                        {language === 'en'
                                            ? 'A structured mobilization process that ensures qualified personnel are deployed promptly while maintaining full compliance with Saudi labor regulations and client requirements.'
                                            : 'عملية تعبئة منظمة تضمن نشر الكوادر المؤهلة بسرعة، مع الحفاظ على الامتثال الكامل لأنظمة العمل السعودية ومتطلبات العملاء.'}
                                    </p>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {DEPLOYMENT_CAPABILITIES.map((cap, index) => (
                                        <WhenVisible
                                            key={cap.title_en}
                                            className="card-elevated p-6"
                                            options={{ threshold: 0.1 }}
                                            style={{ transitionDelay: `${index * 60}ms` }}
                                        >
                                            <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-sm hero-gradient border-b-2 border-accent">
                                                <cap.icon className="h-7 w-7 text-primary-foreground" />
                                            </div>
                                            <h3 className="mb-2 text-lg font-semibold text-foreground">
                                                {language === 'en' ? cap.title_en : cap.title_ar}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {language === 'en' ? cap.desc_en : cap.desc_ar}
                                            </p>
                                        </WhenVisible>
                                    ))}
                                </div>
                            </section>
                        </WhenVisible>

                        {/* Manpower Compliance */}
                        <WhenVisible>
                            <section className="relative overflow-hidden border-t-4 border-accent bg-primary p-8 lg:p-12">
                                <ShieldCheck className="absolute -right-10 -top-10 h-56 w-56 text-primary-foreground/5" aria-hidden="true" />
                                <div className="relative">
                                    <span className="eyebrow text-accent">{language === 'en' ? 'Manpower Compliance' : 'امتثال القوى العاملة'}</span>
                                    <h2 className="mt-2 mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl">
                                        {language === 'en' ? 'Fully Compliant, Every Deployment' : 'امتثال كامل مع كل عملية نشر'}
                                    </h2>
                                    <p className="mb-8 max-w-3xl text-primary-foreground/80">
                                        {language === 'en'
                                            ? 'We are committed to supplying qualified and compliant manpower that meets the highest standards of professionalism, safety, and regulatory compliance.'
                                            : 'نحن ملتزمون بتوفير قوى عاملة مؤهلة وممتثلة تلبي أعلى معايير الاحترافية والسلامة والامتثال التنظيمي.'}
                                    </p>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {COMPLIANCE_STANDARDS.map((item) => (
                                            <div key={item.en} className="flex items-start gap-3">
                                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                                                <span className="text-sm text-primary-foreground/90">
                                                    {language === 'en' ? item.en : item.ar}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </WhenVisible>

                        {/* CTA */}
                        <WhenVisible>
                            <section className="text-center">
                                <h2 className="mb-4 text-2xl font-bold text-foreground">
                                    {language === 'en' ? 'Need Workforce Mobilized Quickly?' : 'هل تحتاج إلى تعبئة القوى العاملة بسرعة؟'}
                                </h2>
                                <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
                                    {language === 'en'
                                        ? 'Tell us your requirements and our team will confirm deployment timelines and compliance details.'
                                        : 'أخبرنا بمتطلباتك وسيؤكد فريقنا الجداول الزمنية للتعبئة وتفاصيل الامتثال.'}
                                </p>
                                <Button size="lg" className="gold-gradient text-accent-foreground" asChild>
                                    <Link href="/hse-contact">
                                        {language === 'en' ? 'Discuss Your Requirements' : 'ناقش متطلباتك معنا'}
                                        <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                                    </Link>
                                </Button>
                            </section>
                        </WhenVisible>
                    </div>
                </div>
            </Layout>
        </>
    );
}
