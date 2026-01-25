import React, { useState } from 'react';
import { Target, Eye, Shield, Heart, Star, Clock, FileCheck, Award, X, Maximize2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import WhenVisible from '@/components/ui/when-visible';
import { cn } from '@/lib/utils';

export default function About() {
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
                ? 'Honest and transparent business practices in all our dealings.'
                : 'ممارسات تجارية صادقة وشفافة في جميع تعاملاتنا.',
        },
        {
            icon: Star,
            title: language === 'en' ? 'Quality' : 'الجودة',
            description: language === 'en'
                ? 'Providing highly skilled and trained workers for all project needs.'
                : 'توفير عمال مهرة ومدربين لجميع احتياجات المشروع.',
        },
        {
            icon: Shield,
            title: language === 'en' ? 'Safety' : 'السلامة',
            description: language === 'en'
                ? 'Zero compromise on worker safety and compliance with all regulations.'
                : 'لا تنازل عن سلامة العمال والامتثال لجميع اللوائح.',
        },
        {
            icon: Clock,
            title: language === 'en' ? 'Reliability' : 'الموثوقية',
            description: language === 'en'
                ? 'Consistent delivery on all commitments with proven track record.'
                : 'التسليم المستمر لجميع الالتزامات مع سجل حافل مثبت.',
        },
        {
            icon: Award,
            title: language === 'en' ? 'Professionalism' : 'المهنية',
            description: language === 'en'
                ? 'Maintaining the highest standards of professional conduct and service.'
                : 'الحفاظ على أعلى معايير السلوك المهني والخدمة.',
        },
        {
            icon: FileCheck,
            title: language === 'en' ? 'Compliance' : 'الامتثال',
            description: language === 'en'
                ? 'Full adherence to Saudi labor laws and industry standards.'
                : 'الالتزام الكامل بقوانين العمل السعودية ومعايير الصناعة.',
        },
    ];

    return (
        <Layout>
            {/* Hero */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')",
                    }}
                />
                <div className="hero-overlay absolute inset-0" />
                
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                        }}
                    />
                </div>

                <div className="container-custom relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-4 text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl">
                            {t('about.page.title')}
                        </h1>
                        <p className="text-xl text-primary-foreground/90">{t('about.page.subtitle')}</p>
                    </div>
                </div>
            </section>

            <div className="section-padding">
                <div className="container-custom space-y-20">
                    {/* Company Overview */}
                    <WhenVisible className="scroll-mt-24">
                        <section>
                            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                                <div>
                                    <h2 className="mb-6 text-3xl font-bold text-foreground">
                                        {language === 'en' ? 'Company Overview' : 'نظرة عامة على الشركة'}
                                    </h2>
                                    <div className="space-y-4">
                                        <p className="text-lg leading-relaxed text-muted-foreground">
                                            {language === 'en'
                                                ? 'Arkaan Global Contracting is a leading provider of construction, MEP, manpower, and cleaning services in Saudi Arabia. With a commitment to excellence and safety, we serve government, semi-government, industrial, and private sector clients across the Kingdom.'
                                                : 'أركان جلوبال للمقاولات هي مزود رائد لخدمات البناء والميكانيكا والكهرباء والعمالة والتنظيف في المملكة العربية السعودية. مع التزام بالتميز والسلامة، نخدم عملاء القطاعات الحكومية وشبه الحكومية والصناعية والخاصة في جميع أنحاء المملكة.'}
                                        </p>
                                        <p className="text-lg leading-relaxed text-muted-foreground">
                                            {language === 'en'
                                                ? 'Our comprehensive service portfolio, combined with our experienced team and commitment to quality, makes us the preferred partner for major construction projects and ongoing maintenance needs throughout Saudi Arabia.'
                                                : 'محفظة خدماتنا الشاملة، جنباً إلى جنب مع فريقنا ذو الخبرة والتزامنا بالجودة، يجعلنا الشريك المفضل للمشاريع الإنشائية الكبرى واحتياجات الصيانة المستمرة في جميع أنحاء المملكة العربية السعودية.'}
                                        </p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="grid grid-cols-2 gap-4">
                                        <img
                                            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800"
                                            alt="Construction site"
                                            className="rounded-xl h-48 w-full object-cover shadow-lg"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800"
                                            alt="Safety equipment"
                                            className="rounded-xl h-48 w-full object-cover shadow-lg mt-8"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800"
                                            alt="Team work"
                                            className="rounded-xl h-48 w-full object-cover shadow-lg -mt-8"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800"
                                            alt="Modern building"
                                            className="rounded-xl h-48 w-full object-cover shadow-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Vision & Mission */}
                    <WhenVisible className="scroll-mt-24">
                        <section>
                            <div className="grid gap-8 lg:grid-cols-2">
                                {/* Vision */}
                                <div className="card-elevated p-8">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient">
                                        <Eye className="h-8 w-8 text-primary-foreground" />
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold text-foreground">
                                        {t('about.vision.title')}
                                    </h3>
                                    <p className="text-lg leading-relaxed text-muted-foreground">
                                        {t('about.vision.text')}
                                    </p>
                                </div>

                                {/* Mission */}
                                <div className="card-elevated p-8">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient">
                                        <Target className="h-8 w-8 text-primary-foreground" />
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold text-foreground">
                                        {t('about.mission.title')}
                                    </h3>
                                    <p className="text-lg leading-relaxed text-muted-foreground">
                                        {t('about.mission.text')}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Core Values */}
                    <WhenVisible className="scroll-mt-24">
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
                    <WhenVisible className="scroll-mt-24">
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
    );
}
