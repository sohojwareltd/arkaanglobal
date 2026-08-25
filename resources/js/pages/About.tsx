import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Target, Eye, Shield, Heart, Star, Clock, FileCheck, Award, X, Maximize2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/page-hero';
import { useLanguage } from '@/contexts/LanguageContext';
import WhenVisible from '@/components/ui/when-visible';
import { cn } from '@/lib/utils';

// Builders working at a construction site — Mixkit (free, no attribution required).
const ABOUT_HERO_VIDEO = 'https://assets.mixkit.co/videos/31473/31473-720.mp4';
// Pointing to blueprints — fits the "planning / how we work" section below.
const BLUEPRINT_VIDEO = 'https://assets.mixkit.co/videos/1439/1439-720.mp4';

interface HeroData {
    title_en?: string;
    title_ar?: string;
    subtitle_en?: string;
    subtitle_ar?: string;
    background_image?: string;
}

interface AboutProps {
    hero?: HeroData | null;
}

export default function About({ hero }: AboutProps) {
    const { t, language } = useLanguage();
    const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);

    // Placeholder certificate images - replace with actual certificate scans
    const certificates = [
        {
            title: language === 'en' ? 'Commercial Registration' : 'السجل التجاري',
            image: '/certificates/cr.jpg',
            description: language === 'en' ? 'Commercial Registration Certificate' : 'شهادة السجل التجاري',
        },
        {
            title: language === 'en' ? 'VAT Certificate' : 'شهادة ضريبة القيمة المضافة',
            image: '/certificates/vat.jpg',
            description: language === 'en' ? 'Value Added Tax Registration' : 'شهادة تسجيل ضريبة القيمة المضافة',
        },
        {
            title: language === 'en' ? 'ISO Certification' : 'شهادة الأيزو',
            image: '/certificates/iso.jpg',
            description: language === 'en' ? 'ISO Quality Management System' : 'نظام إدارة الجودة الأيزو',
        },
        {
            title: language === 'en' ? 'Safety Certificate' : 'شهادة السلامة',
            image: '/certificates/safety.jpg',
            description: language === 'en' ? 'Occupational Safety & Health Certificate' : 'شهادة السلامة والصحة المهنية',
        },
    ];

    const coreValues = [
        {
            icon: Heart,
            title: language === 'en' ? 'Integrity' : 'النزاهة',
            description: language === 'en'
                ? 'Honest, transparent, and ethical practices, building long-term relationships based on trust and accountability.'
                : 'ممارسات صادقة وشفافة وأخلاقية، تبني علاقات طويلة الأمد قائمة على الثقة والمساءلة.',
        },
        {
            icon: Star,
            title: language === 'en' ? 'Quality' : 'الجودة',
            description: language === 'en'
                ? 'Superior workmanship and services that consistently meet or exceed client expectations.'
                : 'حرفية وخدمات متميزة تلبي أو تتجاوز توقعات العملاء باستمرار.',
        },
        {
            icon: Shield,
            title: language === 'en' ? 'Safety' : 'السلامة',
            description: language === 'en'
                ? 'Our highest priority — a strong Health, Safety, and Environmental (HSE) culture across every site.'
                : 'أولويتنا القصوى — ثقافة قوية للصحة والسلامة والبيئة في كل موقع.',
        },
        {
            icon: Clock,
            title: language === 'en' ? 'Reliability' : 'الموثوقية',
            description: language === 'en'
                ? 'Dependable services, skilled resources, and timely project execution with consistency.'
                : 'خدمات موثوقة وموارد ماهرة وتنفيذ للمشاريع في وقتها بثبات.',
        },
        {
            icon: Award,
            title: language === 'en' ? 'Professionalism' : 'الاحترافية',
            description: language === 'en'
                ? 'The highest standards of competence, discipline, and respect across management and supervision.'
                : 'أعلى معايير الكفاءة والانضباط والاحترام في الإدارة والإشراف.',
        },
        {
            icon: FileCheck,
            title: language === 'en' ? 'Compliance' : 'الامتثال',
            description: language === 'en'
                ? 'Strict adherence to Saudi laws, client specifications, and contractual obligations.'
                : 'الالتزام الصارم بأنظمة المملكة ومواصفات العملاء والالتزامات التعاقدية.',
        },
    ];

    const ceoMessage = language === 'en'
        ? "At ARKAAN, we are driven by a commitment to excellence, integrity, and innovation. Every successful project is built on trust, collaboration, and a clear understanding of our clients' objectives — and we remain committed to the highest standards of Health, Safety, Quality, and Environmental (HSQE) practice as we grow."
        : 'في أركان، ينبع التزامنا من السعي للتميز والنزاهة والابتكار. يُبنى كل مشروع ناجح على الثقة والتعاون وفهم واضح لأهداف عملائنا — ونظل ملتزمين بأعلى معايير الصحة والسلامة والجودة والبيئة مع استمرار نمونا.';

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <>
            <Head>
                <title>About Us - Arkaan Construction Company | Your Trusted Construction Partner</title>
                <meta name="description" content="Learn about Arkaan Construction Company - a leading civil construction, MEP, and manpower solutions provider across the Kingdom of Saudi Arabia." />
                <meta name="keywords" content="about Arkaan Construction Company, construction company Saudi Arabia, vision mission, core values" />

                <meta property="og:title" content="About Us - Arkaan Construction Company" />
                <meta property="og:description" content="A leading civil construction, MEP, and manpower solutions provider across the Kingdom of Saudi Arabia." />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="website" />

                <meta name="twitter:title" content="About Us - Arkaan Construction Company" />
                <meta name="twitter:description" content="A leading civil construction, MEP, and manpower solutions provider across the Kingdom of Saudi Arabia." />
                
                <link rel="canonical" href={currentUrl} />
            </Head>
            <Layout>
            <PageHero
                hero={hero}
                fallbackTitle={t('about.page.title')}
                fallbackSubtitle={t('about.page.subtitle')}
                language={language}
                videoUrl={ABOUT_HERO_VIDEO}
            />

            <div className="section-padding">
                <div className="container-custom space-y-20">
                    {/* Company Overview */}
                    <WhenVisible className="scroll-mt-28 lg:scroll-mt-40">
                        <section>
                            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                                <div>
                                    <h2 className="mb-6 text-3xl font-bold text-foreground">
                                        {language === 'en' ? 'Company Overview' : 'نظرة عامة على الشركة'}
                                    </h2>
                                    <div className="space-y-4">
                                        <p className="text-lg leading-relaxed text-muted-foreground">
                                            {language === 'en'
                                                ? 'ARKAAN CONSTRUCTION COMPANY is a leading construction and manpower solutions provider delivering high-quality engineering, construction, and workforce services across the Kingdom of Saudi Arabia, serving the oil & gas, petrochemical, power, infrastructure, manufacturing, and commercial sectors.'
                                                : 'شركة أركان للمقاولات هي مزود رائد لحلول البناء والقوى العاملة، تقدّم خدمات هندسية وإنشائية وقوى عاملة عالية الجودة في جميع أنحاء المملكة العربية السعودية، وتخدم قطاعات النفط والغاز والبتروكيماويات والطاقة والبنية التحتية والتصنيع والقطاع التجاري.'}
                                        </p>
                                        <p className="text-lg leading-relaxed text-muted-foreground">
                                            {language === 'en'
                                                ? 'Our construction capabilities span civil, structural, architectural, mechanical, and industrial works, while our manpower division supplies qualified engineers, technicians, supervisors, and administrative professionals — giving clients a single, dependable partner for both construction execution and workforce support.'
                                                : 'تشمل قدراتنا الإنشائية الأعمال المدنية والإنشائية والمعمارية والميكانيكية والصناعية، بينما يوفر قسم القوى العاملة لدينا مهندسين وفنيين ومشرفين وموظفين إداريين مؤهلين — ليحصل عملاؤنا على شريك واحد موثوق لتنفيذ الإنشاءات ودعم القوى العاملة معاً.'}
                                        </p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="grid grid-cols-2 gap-4">
                                        <video
                                            src={BLUEPRINT_VIDEO}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            aria-hidden="true"
                                            className="hero-bg-video rounded-sm h-48 w-full object-cover shadow-lg border-b-2 border-accent"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800"
                                            alt={language === 'en' ? 'MEP ductwork installation' : 'تركيب أعمال التكييف'}
                                            className="rounded-sm h-48 w-full object-cover shadow-lg mt-8 transition-transform duration-500 hover:scale-105"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800"
                                            alt={language === 'en' ? 'Team on site' : 'الفريق في الموقع'}
                                            className="rounded-sm h-48 w-full object-cover shadow-lg -mt-8 transition-transform duration-500 hover:scale-105"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=800"
                                            alt={language === 'en' ? 'Skilled workforce' : 'قوى عاملة ماهرة'}
                                            className="rounded-sm h-48 w-full object-cover shadow-lg transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Message from the CEO */}
                    <WhenVisible className="scroll-mt-28 lg:scroll-mt-40">
                        <section>
                            <div className="hero-gradient relative overflow-hidden rounded-sm border-b-4 border-accent px-6 py-12 sm:px-12 lg:py-16">
                                <div className="relative mx-auto max-w-3xl text-center">
                                    <span className="text-6xl font-serif text-primary-foreground/30" aria-hidden="true">&ldquo;</span>
                                    <p className="-mt-6 text-xl leading-relaxed text-primary-foreground/95 sm:text-2xl">
                                        {ceoMessage}
                                    </p>
                                    <p className="mt-6 eyebrow-foreground/70">
                                        {language === 'en'
                                            ? '— Chief Executive Officer, Arkaan Construction Company'
                                            : '— الرئيس التنفيذي، شركة أركان للمقاولات'}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Vision & Mission */}
                    <WhenVisible className="scroll-mt-28 lg:scroll-mt-40">
                        <section>
                            <div className="grid gap-8 lg:grid-cols-2">
                                {/* Vision */}
                                <div className="relative overflow-hidden border-t-4 border-accent bg-primary p-8 lg:p-10">
                                    <Eye className="absolute -right-6 -top-6 h-40 w-40 text-primary-foreground/5" aria-hidden="true" />
                                    <div className="relative">
                                        <span className="eyebrow text-accent">01 — {language === 'en' ? 'Vision' : 'الرؤية'}</span>
                                        <div className="my-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-primary-foreground/10 border-b-2 border-accent">
                                            <Eye className="h-7 w-7 text-accent" />
                                        </div>
                                        <h3 className="mb-4 text-2xl font-bold text-primary-foreground">
                                            {t('about.vision.title')}
                                        </h3>
                                        <p className="text-lg leading-relaxed text-primary-foreground/80">
                                            {t('about.vision.text')}
                                        </p>
                                    </div>
                                </div>

                                {/* Mission */}
                                <div className="relative overflow-hidden border-t-4 border-accent bg-card p-8 lg:p-10">
                                    <Target className="absolute -right-6 -top-6 h-40 w-40 text-primary/5" aria-hidden="true" />
                                    <div className="relative">
                                        <span className="eyebrow">02 — {language === 'en' ? 'Mission' : 'الرسالة'}</span>
                                        <div className="my-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-sm hero-gradient border-b-2 border-accent">
                                            <Target className="h-7 w-7 text-primary-foreground" />
                                        </div>
                                        <h3 className="mb-4 text-2xl font-bold text-foreground">
                                            {t('about.mission.title')}
                                        </h3>
                                        <p className="text-lg leading-relaxed text-muted-foreground">
                                            {t('about.mission.text')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Core Values */}
                    <WhenVisible className="scroll-mt-28 lg:scroll-mt-40">
                        <section>
                            <h2 className="mb-4 text-3xl font-bold text-foreground text-center">{t('about.values.title')}</h2>
                            <p className="mb-8 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
                                {language === 'en' 
                                    ? 'The principles that guide everything we do'
                                    : 'المبادئ التي توجه كل ما نقوم به'}
                            </p>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {coreValues.map((value, i) => (
                                    <div key={i} className="card-elevated p-6">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                            <value.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold text-foreground">{value.title}</h3>
                                        <p className="text-sm text-muted-foreground">{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Registration & Certificates */}
                    <WhenVisible className="scroll-mt-28 lg:scroll-mt-40">
                        <section>
                            <h2 className="mb-8 text-3xl font-bold text-foreground">
                                {language === 'en' ? 'Registration & Certificates' : 'التسجيل والشهادات'}
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {certificates.map((cert, i) => (
                                    <div
                                        key={i}
                                        className="card-elevated group cursor-pointer overflow-hidden"
                                        onClick={() => setSelectedCertificate(i)}
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                            <img
                                                src={cert.image}
                                                alt={cert.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                onError={(e) => {
                                                    // Fallback if image doesn't exist
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    target.parentElement!.innerHTML = `
                                                        <div class="flex h-full items-center justify-center">
                                                            <div class="text-center p-4">
                                                                <Award class="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                                                                <p class="text-sm text-muted-foreground">${cert.title}</p>
                                                            </div>
                                                        </div>
                                                    `;
                                                }}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                                <Maximize2 className="h-8 w-8 text-white" />
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-foreground">{cert.title}</h3>
                                            <p className="text-sm text-muted-foreground">{cert.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </WhenVisible>
                </div>
            </div>

            {/* Certificate Lightbox Modal */}
            {selectedCertificate !== null && certificates[selectedCertificate] && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setSelectedCertificate(null)}
                >
                    <div
                        className="relative max-w-4xl max-h-[90vh] overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedCertificate(null)}
                            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground hover:bg-white transition-colors"
                            aria-label={language === 'en' ? 'Close' : 'إغلاق'}
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <img
                            src={certificates[selectedCertificate].image}
                            alt={certificates[selectedCertificate].title}
                            className="max-h-[90vh] w-full rounded-lg object-contain"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = `
                                    <div class="bg-card rounded-lg p-8 text-center">
                                        <Award class="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                                        <h3 class="text-xl font-semibold mb-2">${certificates[selectedCertificate].title}</h3>
                                        <p class="text-muted-foreground">${certificates[selectedCertificate].description}</p>
                                    </div>
                                `;
                            }}
                        />
                        <div className="mt-4 rounded-lg bg-card p-4 text-center">
                            <h3 className="text-lg font-semibold text-foreground">
                                {certificates[selectedCertificate].title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {certificates[selectedCertificate].description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
        </>
    );
}
