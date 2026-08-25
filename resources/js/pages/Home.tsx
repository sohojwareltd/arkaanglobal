import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Target, Eye, MapPin } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import StatsSection from '@/components/home/StatsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ClientsSection from '@/components/home/ClientsSection';
import CTASection from '@/components/home/CTASection';
import WhenVisible from '@/components/ui/when-visible';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface StatItem {
    id: number;
    value: string;
    label_en: string;
    label_ar: string;
}

interface AboutContentItem {
    id: number;
    key: string;
    content_en?: string;
    content_ar?: string;
}

interface ClientCategoryItem {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    icon?: string;
}

interface ServiceItem {
    id: number;
    slug: string;
    title_en: string;
    title_ar: string;
    description_en?: string;
    description_ar?: string;
}

interface HomeProps {
    hero?: {
        title_en?: string;
        title_ar?: string;
        subtitle_en?: string;
        subtitle_ar?: string;
        description_en?: string;
        description_ar?: string;
        cta_primary_text_en?: string;
        cta_primary_text_ar?: string;
        cta_primary_link?: string;
        cta_secondary_text_en?: string;
        cta_secondary_text_ar?: string;
        cta_secondary_link?: string;
        background_image?: string;
    } | null;
    services?: ServiceItem[];
    stats?: StatItem[];
    aboutOverview?: AboutContentItem | null;
    vision?: AboutContentItem | null;
    mission?: AboutContentItem | null;
    clientCategories?: ClientCategoryItem[];
}

interface ContactInfoMap {
    [key: string]: { value_en: string; value_ar: string };
}

export default function Home({ hero, services = [], stats = [], aboutOverview, vision, mission, clientCategories = [] }: HomeProps) {
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { contactInfo = {}, settings = {} } = usePage().props as {
        contactInfo?: ContactInfoMap;
        settings?: Record<string, string | null>;
    };
    const getContactValue = (key: string): string => {
        const item = contactInfo?.[key];
        if (!item) return '';
        return language === 'en' ? item.value_en : item.value_ar;
    };

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const addressText =
        getContactValue('address') ||
        (language === 'en' ? 'AL Jubail, Kingdom of Saudi Arabia' : 'الجبيل، المملكة العربية السعودية');
    const mapEmbedUrl = (settings['map_embed_url'] as string | undefined) ?? '';
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressText)}`;

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        setIsSubmitting(true);

        router.post(
            '/quote-request',
            {
                company: (formData.get('company') as string) || 'Website contact form',
                contact_person: (formData.get('name') as string) || '',
                email: (formData.get('email') as string) || '',
                phone: (formData.get('phone') as string) || '',
                service_type: null,
                preferred_start_date: null,
                requirement_details: (formData.get('message') as string) || null,
            },
            {
                preserveScroll: true,
                onFinish: () => setIsSubmitting(false),
                onSuccess: () => {
                    form.reset();
                    toast({
                        title: language === 'en' ? 'Message Sent' : 'تم إرسال الرسالة',
                        description:
                            language === 'en'
                                ? 'We will get back to you shortly.'
                                : 'سنتواصل معك قريبًا.',
                    });
                },
            },
        );
    };

    return (
        <>
            <Head>
                <title>Arkaan Construction Company | Civil Construction, MEP, Manpower & Cleaning</title>
                <meta name="description" content="Arkaan Construction Company — trusted partner for civil construction, MEP, manpower supply, and dedicated cleaning services across the Kingdom of Saudi Arabia." />
                <meta name="keywords" content="civil construction, MEP services, manpower supply, dedicated cleaning services, Saudi Arabia, Jubail, Dammam, Riyadh" />

                <meta property="og:title" content="Arkaan Construction Company | Civil Construction, MEP, Manpower & Cleaning" />
                <meta property="og:description" content="Trusted partner for civil construction, MEP, manpower supply, and dedicated cleaning services across the Kingdom of Saudi Arabia." />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="website" />

                <meta name="twitter:title" content="Arkaan Construction Company" />
                <meta name="twitter:description" content="Trusted partner for civil construction, MEP, manpower supply, and dedicated cleaning services across the Kingdom of Saudi Arabia." />

                <link rel="canonical" href={currentUrl} />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Arkaan Construction Company",
                        "url": siteUrl,
                        "logo": `${siteUrl}/logo-main.png`,
                        "description": "Civil construction, MEP, manpower supply, and dedicated cleaning services across the Kingdom of Saudi Arabia",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Al Jubail",
                            "addressCountry": "SA"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "email": "info@arkaanconstruction.com",
                            "contactType": "Customer Service",
                            "availableLanguage": ["English", "Arabic"]
                        },
                        "sameAs": []
                    })}
                </script>
            </Head>
            <Layout>
                <HeroSection hero={hero} />
            <WhenVisible>
                <ServicesSection services={services} />
            </WhenVisible>

            {/* Stats Section */}
            <WhenVisible>
                <StatsSection stats={stats} />
            </WhenVisible>

            {/* About Section */}
            <WhenVisible>
                <section className="section-padding bg-muted/30">
                    <div className="container-custom">
                        <div className="mx-auto max-w-6xl">
                            {/* Company Overview with Image */}
                            <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                                <div className="order-2 lg:order-1">
                                    <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                                        {language === 'en' ? 'About Arkaan Construction Company' : 'عن شركة أركان للمقاولات'}
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {aboutOverview
                                            ? (language === 'en' ? aboutOverview.content_en : aboutOverview.content_ar) || ''
                                            : language === 'en'
                                                ? 'ARKAAN CONSTRUCTION COMPANY is a leading construction and manpower solutions provider delivering high-quality engineering, construction, and workforce services across the Kingdom of Saudi Arabia, serving the oil & gas, petrochemical, power, infrastructure, manufacturing, and commercial sectors.'
                                                : 'شركة أركان للمقاولات هي مزود رائد لحلول البناء والقوى العاملة، تقدّم خدمات هندسية وإنشائية وقوى عاملة عالية الجودة في جميع أنحاء المملكة العربية السعودية، وتخدم قطاعات النفط والغاز والبتروكيماويات والطاقة والبنية التحتية والتصنيع والقطاع التجاري.'}
                                    </p>
                                </div>
                                <div className="order-1 lg:order-2">
                                    <div className="group relative rounded-sm overflow-hidden shadow-2xl">
                                        <img
                                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070"
                                            alt={language === 'en' ? 'Arkaan construction team on site' : 'فريق أركان في الموقع'}
                                            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                                    </div>
                                </div>
                            </div>

                            {/* Vision & Mission */}
                            <div className="grid gap-8 lg:grid-cols-2">
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
                                            {vision ? (language === 'en' ? vision.content_en : vision.content_ar) || '' : t('about.vision.text')}
                                        </p>
                                    </div>
                                </div>

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
                                            {mission ? (language === 'en' ? mission.content_en : mission.content_ar) || '' : t('about.mission.text')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </WhenVisible>

            {/* Capabilities Section */}
            <WhenVisible>
                <ProjectsSection services={services} />
            </WhenVisible>

            {/* Trusted By / Client Sectors Section */}
            <WhenVisible>
                <ClientsSection clientCategories={clientCategories} />
            </WhenVisible>

            {/* CTA Banner */}
            <WhenVisible>
                <CTASection />
            </WhenVisible>

            {/* Contact Section */}
            <WhenVisible>
                <section className="section-padding">
                    <div className="container-custom">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                                    {language === 'en' ? 'Get In Touch' : 'تواصل معنا'}
                                </h2>
                                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                    {language === 'en'
                                        ? 'Have a question or need a quote? Contact us today and our team will be happy to assist you.'
                                        : 'لديك سؤال أو تحتاج إلى عرض سعر؟ تواصل معنا اليوم وسيكون فريقنا سعيدًا لمساعدتك.'}
                                </p>
                            </div>

                            <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start">
                                {/* Contact Form */}
                                <div className="w-full lg:w-1/2">
                                    <div className="card-elevated p-8 h-full">
                                        <h3 className="mb-6 text-xl font-semibold text-foreground">
                                            {language === 'en' ? 'Send Us a Message' : 'أرسل لنا رسالة'}
                                        </h3>
                                        <form onSubmit={handleFormSubmit} className="space-y-6">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">{t('contact.form.name')}</Label>
                                                    <Input id="name" name="name" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="company">{t('contact.form.company')}</Label>
                                                    <Input id="company" name="company" />
                                                </div>
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">{t('contact.form.email')}</Label>
                                                    <Input id="email" name="email" type="email" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                                                    <Input id="phone" name="phone" type="tel" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="message">{t('contact.form.message')}</Label>
                                                <Textarea id="message" name="message" rows={4} required />
                                            </div>
                                            <Button type="submit" disabled={isSubmitting} className="w-full">
                                                {isSubmitting
                                                    ? language === 'en'
                                                        ? 'Sending...'
                                                        : 'جاري الإرسال...'
                                                    : t('contact.form.submit')}
                                            </Button>
                                        </form>
                                    </div>
                                </div>

                                {/* Map */}
                                {mapEmbedUrl && (
                                    <div className="w-full lg:w-1/2">
                                        <div className="card-elevated overflow-hidden h-full flex flex-col">
                                            <div className="aspect-video w-full">
                                                <iframe
                                                    src={mapEmbedUrl}
                                                    className="h-full w-full border-0"
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    allowFullScreen
                                                />
                                            </div>
                                            <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                                                <p className="text-sm text-muted-foreground">
                                                    {language === 'en' ? 'Our location on the map' : 'موقعنا على الخريطة'}
                                                </p>
                                                <a
                                                    href={directionsUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Button size="sm" variant="outline" className="inline-flex items-center gap-2">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{language === 'en' ? 'Get Directions' : 'الحصول على الاتجاهات'}</span>
                                                    </Button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </WhenVisible>
        </Layout>
        </>
    );
}
