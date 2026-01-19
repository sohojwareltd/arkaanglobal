import React from 'react';
import { Shield, Heart, Star, Clock, FileCheck } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import WhenVisible from '@/components/ui/when-visible';

export default function About() {
    const { t, language } = useLanguage();

    const values = [
        { icon: Shield, title: t('about.values.safety'), desc: t('about.values.safety.desc') },
        { icon: Heart, title: t('about.values.integrity'), desc: t('about.values.integrity.desc') },
        { icon: Star, title: t('about.values.quality'), desc: t('about.values.quality.desc') },
        { icon: Clock, title: t('about.values.reliability'), desc: t('about.values.reliability.desc') },
        { icon: FileCheck, title: t('about.values.compliance'), desc: t('about.values.compliance.desc') },
    ];

    return (
        <Layout>
            {/* Hero */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                <div className="absolute inset-0 hero-gradient opacity-10" />
                <div className="container-custom relative">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                            {t('about.page.title')}
                        </h1>
                        <p className="text-xl text-muted-foreground">{t('about.page.subtitle')}</p>
                    </div>
                </div>
            </section>

            {/* Company Overview */}
            <WhenVisible>
                <section className="section-padding">
                    <div className="container-custom">
                        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                            <div>
                                <img
                                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"
                                    alt="Construction team"
                                    className="aspect-[4/3] w-full rounded-2xl object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="mb-6 text-3xl font-bold text-foreground">
                                    {language === 'en' ? 'Who We Are' : 'من نحن'}
                                </h2>
                                <p className="mb-4 text-muted-foreground">
                                    {language === 'en'
                                        ? "Established in 2009, we have grown to become one of Saudi Arabia's leading manpower supply companies, specializing in the construction sector. Our deep understanding of the industry, combined with our commitment to quality and compliance, has made us the partner of choice for major contractors and developers."
                                        : 'تأسست في عام 2009، ونمت لتصبح واحدة من الشركات الرائدة في توريد القوى العاملة في المملكة العربية السعودية، متخصصة في قطاع البناء. إن فهمنا العميق للصناعة، جنبًا إلى جنب مع التزامنا بالجودة والامتثال، جعلنا الشريك المفضل لكبار المقاولين والمطورين.'}
                                </p>
                                <p className="text-muted-foreground">
                                    {language === 'en'
                                        ? 'We provide comprehensive workforce solutions, from skilled engineers and technicians to general laborers, ensuring our clients have access to the talent they need to complete their projects successfully.'
                                        : 'نحن نقدم حلول شاملة للقوى العاملة، من المهندسين والفنيين المهرة إلى العمال العامين، مما يضمن لعملائنا الوصول إلى المواهب التي يحتاجونها لإكمال مشاريعهم بنجاح.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </WhenVisible>

            {/* Mission & Vision */}
            <WhenVisible>
                <section className="section-padding bg-muted/30">
                    <div className="container-custom">
                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="card-elevated p-8">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl hero-gradient">
                                    <Star className="h-7 w-7 text-primary-foreground" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-foreground">{t('about.mission.title')}</h3>
                                <p className="text-muted-foreground">{t('about.mission.text')}</p>
                            </div>
                            <div className="card-elevated p-8">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl gold-gradient">
                                    <Shield className="h-7 w-7 text-accent-foreground" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-foreground">{t('about.vision.title')}</h3>
                                <p className="text-muted-foreground">{t('about.vision.text')}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </WhenVisible>

            {/* Core Values */}
            <section className="section-padding">
                <div className="container-custom">
                    <WhenVisible className="mx-auto mb-12 max-w-2xl text-center">
                        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{t('about.values.title')}</h2>
                    </WhenVisible>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                        {values.map((value, index) => (
                            <WhenVisible
                                key={index}
                                className="card-elevated p-6 text-center"
                                options={{ rootMargin: '0px 0px -10% 0px', threshold: 0.1 }}
                                style={{ transitionDelay: `${index * 60}ms` }}
                            >
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl hero-gradient">
                                    <value.icon className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <h3 className="mb-2 font-semibold text-foreground">{value.title}</h3>
                                <p className="text-sm text-muted-foreground">{value.desc}</p>
                            </WhenVisible>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
