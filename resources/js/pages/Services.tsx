import React from 'react';
import { HardHat, Users, FileSignature, Wrench, CheckCircle2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import WhenVisible from '@/components/ui/when-visible';

export default function Services() {
    const { t, language } = useLanguage();

    const services = [
        {
            id: 'skilled',
            icon: HardHat,
            title: t('services.skilled.title'),
            description: t('services.skilled.description'),
            workers:
                language === 'en'
                    ? [
                          'Civil Engineers',
                          'Electrical Engineers',
                          'Mechanical Engineers',
                          'Site Supervisors',
                          'Safety Officers',
                          'Crane Operators',
                          'Welders',
                          'Electricians',
                      ]
                    : [
                          'مهندسون مدنيون',
                          'مهندسون كهربائيون',
                          'مهندسون ميكانيكيون',
                          'مشرفو مواقع',
                          'مسؤولو سلامة',
                          'مشغلو رافعات',
                          'لحّامون',
                          'كهربائيون',
                      ],
            industries:
                language === 'en' ? ['Construction', 'Infrastructure', 'Oil & Gas', 'Industrial'] : ['البناء', 'البنية التحتية', 'النفط والغاز', 'الصناعي'],
        },
        {
            id: 'unskilled',
            icon: Users,
            title: t('services.unskilled.title'),
            description: t('services.unskilled.description'),
            workers:
                language === 'en'
                    ? ['General Laborers', 'Construction Helpers', 'Warehouse Workers', 'Cleaners', 'Material Handlers', 'Site Assistants']
                    : ['عمال عامون', 'مساعدو بناء', 'عمال مستودعات', 'عمال نظافة', 'ناقلو مواد', 'مساعدو مواقع'],
            industries:
                language === 'en' ? ['Construction Sites', 'Warehouses', 'Logistics', 'Maintenance'] : ['مواقع البناء', 'المستودعات', 'الخدمات اللوجستية', 'الصيانة'],
        },
        {
            id: 'contracting',
            icon: FileSignature,
            title: t('services.contracting.title'),
            description: t('services.contracting.description'),
            workers:
                language === 'en'
                    ? ['Complete Project Teams', 'Dedicated Workforce', 'Project Managers', 'Quality Controllers']
                    : ['فرق مشاريع كاملة', 'قوى عاملة مخصصة', 'مديرو مشاريع', 'مراقبو جودة'],
            industries:
                language === 'en' ? ['Large-scale Construction', 'Government Projects', 'Commercial Development'] : ['البناء واسع النطاق', 'المشاريع الحكومية', 'التطوير التجاري'],
        },
        {
            id: 'subcontracting',
            icon: Wrench,
            title: t('services.subcontracting.title'),
            description: t('services.subcontracting.description'),
            workers:
                language === 'en'
                    ? ['Specialized Trade Teams', 'MEP Workers', 'Finishing Crews', 'Structural Teams']
                    : ['فرق حرف متخصصة', 'عمال ميكانيكا وكهرباء وسباكة', 'أطقم التشطيب', 'فرق إنشائية'],
            industries:
                language === 'en' ? ['MEP Works', 'Finishing', 'Structural', 'Specialized Trades'] : ['أعمال MEP', 'التشطيب', 'الإنشائي', 'الحرف المتخصصة'],
        },
    ];

    return (
        <Layout>
            {/* Hero */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                <div className="absolute inset-0 hero-gradient opacity-10" />
                <div className="container-custom relative">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                            {t('services.page.title')}
                        </h1>
                        <p className="text-xl text-muted-foreground">{t('services.page.subtitle')}</p>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="space-y-16">
                        {services.map((service, index) => (
                            <WhenVisible
                                key={service.id}
                                id={service.id}
                                className="scroll-mt-24"
                                options={{ threshold: 0.1 }}
                            >
                                <div
                                    className={`grid items-start gap-8 lg:grid-cols-2 lg:gap-12 ${
                                        index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                    }`}
                                >
                                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient">
                                            <service.icon className="h-8 w-8 text-primary-foreground" />
                                        </div>
                                        <h2 className="mb-4 text-3xl font-bold text-foreground">{service.title}</h2>
                                        <p className="mb-6 text-lg text-muted-foreground">{service.description}</p>

                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="mb-2 font-semibold text-foreground">
                                                    {language === 'en' ? 'Types of Workers:' : 'أنواع العمال:'}
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {service.workers.map((worker, i) => (
                                                        <span key={i} className="rounded-full bg-muted px-3 py-1 text-sm text-foreground">
                                                            {worker}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="mb-2 font-semibold text-foreground">
                                                    {language === 'en' ? 'Industries Served:' : 'الصناعات المخدومة:'}
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {service.industries.map((industry, i) => (
                                                        <span key={i} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                                                            {industry}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`card-elevated p-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                        <h4 className="mb-4 font-semibold text-foreground">
                                            {language === 'en' ? 'Benefits:' : 'المزايا:'}
                                        </h4>
                                        <ul className="space-y-3">
                                            {(
                                                language === 'en'
                                                    ? [
                                                          'Rapid deployment within 48-72 hours',
                                                          'Pre-screened and verified workers',
                                                          'Full compliance with labor regulations',
                                                          'Dedicated account management',
                                                          'Flexible scaling options',
                                                      ]
                                                    : [
                                                          'النشر السريع خلال 48-72 ساعة',
                                                          'عمال مفحوصون ومعتمدون',
                                                          'الامتثال الكامل لأنظمة العمل',
                                                          'إدارة حساب مخصصة',
                                                          'خيارات مرنة للتوسع',
                                                      ]
                                            ).map((benefit, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                                                    <span className="text-muted-foreground">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                {index < services.length - 1 && <div className="mt-16 border-b border-border" />}
                            </WhenVisible>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
