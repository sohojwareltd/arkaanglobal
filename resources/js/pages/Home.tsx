import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Target, Eye, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
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

interface ClientItem {
    id: number;
    name: string;
    abbr: string;
    logo?: string;
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
    clients?: ClientItem[];
}

interface ContactInfoMap {
    [key: string]: { value_en: string; value_ar: string };
}

export default function Home({ hero, services = [], stats = [], aboutOverview, vision, mission, clients = [] }: HomeProps) {
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { contactInfo = {}, settings = {} } = usePage().props as {
        contactInfo?: ContactInfoMap;
        settings?: Record<string, string | null>;
    };
    const phoneVal = contactInfo?.phone ? (language === 'en' ? contactInfo.phone.value_en : contactInfo.phone.value_ar) : '0572914027';
    const whatsappVal = contactInfo?.whatsapp ? (language === 'en' ? contactInfo.whatsapp.value_en : contactInfo.whatsapp.value_ar) : '0572914027';
    const whatsappNumber = (whatsappVal || phoneVal).replace(/\D/g, '');
    const whatsappMessage = language === 'en'
        ? 'Hello, I would like to inquire about your services.'
        : 'مرحباً، أود الاستفسار عن خدماتكم.';

    const getContactValue = (key: string): string => {
        const item = contactInfo?.[key];
        if (!item) return '';
        return language === 'en' ? item.value_en : item.value_ar;
    };

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const addressText =
        getContactValue('address') ||
        (language === 'en' ? 'Jubail, Eastern Province, Saudi Arabia' : 'الجبيل، المنطقة الشرقية، المملكة العربية السعودية');
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
                <title>Home - Arkaan Global Contracting | Construction, MEP, Manpower & Cleaning Services</title>
                <meta name="description" content="Arkaan Global Contracting - Leading provider of construction, MEP, manpower, and cleaning services in Saudi Arabia. Strength in People, Precision in Work." />
                <meta name="keywords" content="construction services, MEP services, manpower solutions, cleaning services, Saudi Arabia, contracting company" />
                
                <meta property="og:title" content="Home - Arkaan Global Contracting | Construction, MEP, Manpower & Cleaning Services" />
                <meta property="og:description" content="Leading provider of construction, MEP, manpower, and cleaning services in Saudi Arabia. Strength in People, Precision in Work." />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="website" />
                
                <meta name="twitter:title" content="Home - Arkaan Global Contracting" />
                <meta name="twitter:description" content="Leading provider of construction, MEP, manpower, and cleaning services in Saudi Arabia." />
                
                <link rel="canonical" href={currentUrl} />
                
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Arkaan Global Contracting",
                        "url": siteUrl,
                        "logo": `${siteUrl}/logo-main.png`,
                        "description": "Leading provider of construction, MEP, manpower, and cleaning services in Saudi Arabia",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Jubail",
                            "addressCountry": "SA"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
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
                <section className="section-padding bg-primary text-primary-foreground">
                    <div className="container-custom">
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.length > 0 ? (
                                stats.map((stat) => (
                                    <div key={stat.id} className="text-center">
                                        <div className="mb-2 text-4xl font-bold sm:text-5xl">{stat.value}</div>
                                        <div className="text-primary-foreground/80">
                                            {language === 'en' ? stat.label_en : stat.label_ar}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold sm:text-5xl">15+</div>
                                        <div className="text-primary-foreground/80">{language === 'en' ? 'Years Experience' : 'سنوات الخبرة'}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold sm:text-5xl">500+</div>
                                        <div className="text-primary-foreground/80">{language === 'en' ? 'Projects Completed' : 'مشروع مكتمل'}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold sm:text-5xl">10,000+</div>
                                        <div className="text-primary-foreground/80">{language === 'en' ? 'Workers Deployed' : 'عامل تم توظيفهم'}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold sm:text-5xl">100+</div>
                                        <div className="text-primary-foreground/80">{language === 'en' ? 'Satisfied Clients' : 'عميل راضٍ'}</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>
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
                                        {language === 'en' ? 'About Arkaan Global' : 'عن أركان جلوبال'}
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {aboutOverview
                                            ? (language === 'en' ? aboutOverview.content_en : aboutOverview.content_ar) || ''
                                            : language === 'en'
                                                ? 'Arkaan Global Contracting is a leading provider of construction, MEP, manpower, and cleaning services in Saudi Arabia. With a commitment to excellence and safety, we serve government, semi-government, industrial, and private sector clients across the Kingdom.'
                                                : 'أركان جلوبال للمقاولات هي مزود رائد لخدمات البناء والميكانيكا والكهرباء والعمالة والتنظيف في المملكة العربية السعودية. مع التزام بالتميز والسلامة، نخدم عملاء القطاعات الحكومية وشبه الحكومية والصناعية والخاصة في جميع أنحاء المملكة.'}
                                    </p>
                                </div>
                                <div className="order-1 lg:order-2">
                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                        <img
                                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070"
                                            alt="Construction team"
                                            className="w-full h-[400px] object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                                    </div>
                                </div>
                            </div>

                            {/* Vision & Mission */}
                            <div className="grid gap-8 lg:grid-cols-2">
                                <div className="card-elevated p-8">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient">
                                        <Eye className="h-8 w-8 text-primary-foreground" />
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold text-foreground">
                                        {t('about.vision.title')}
                                    </h3>
                                    <p className="text-lg leading-relaxed text-muted-foreground">
                                        {vision ? (language === 'en' ? vision.content_en : vision.content_ar) || '' : t('about.vision.text')}
                                    </p>
                                </div>

                                <div className="card-elevated p-8">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient">
                                        <Target className="h-8 w-8 text-primary-foreground" />
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
                </section>
            </WhenVisible>

            {/* Trusted By Section */}
            <WhenVisible>
                <section className="section-padding bg-muted/30">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                                {language === 'en' ? 'Trusted By Leading Organizations' : 'موثوق به من قبل المنظمات الرائدة'}
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                {language === 'en'
                                    ? 'Serving government, semi-government, industrial, and private sector clients across Saudi Arabia'
                                    : 'خدمة عملاء القطاعات الحكومية وشبه الحكومية والصناعية والخاصة في جميع أنحاء المملكة العربية السعودية'}
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {clients.length > 0 ? (
                                clients.map((client) => (
                                    <Link
                                        key={client.id}
                                        href="/clients"
                                        className="card-elevated p-8 flex items-center justify-center h-32 bg-white hover:shadow-lg transition-shadow"
                                    >
                                        {client.logo ? (
                                            <img
                                                src={client.logo.startsWith('http') || client.logo.startsWith('/') ? client.logo : `/storage/${client.logo}`}
                                                alt={language === 'en' ? client.name : client.name}
                                                className="max-h-16 max-w-full object-contain"
                                            />
                                        ) : (
                                            <span className="text-center text-muted-foreground font-semibold">
                                                {client.abbr || client.name}
                                            </span>
                                        )}
                                    </Link>
                                ))
                            ) : (
                                [1, 2, 3, 4].map((i) => (
                                    <div key={i} className="card-elevated p-8 flex items-center justify-center h-32 bg-white">
                                        <span className="text-center text-muted-foreground font-semibold">
                                            {language === 'en' ? `Client ${i}` : `عميل ${i}`}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
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
