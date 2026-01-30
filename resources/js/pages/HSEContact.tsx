import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Shield, Award, MapPin, Phone, Mail, Clock, CheckCircle2, Building2, Download, MessageCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/page-hero';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import WhenVisible from '@/components/ui/when-visible';
import { useToast } from '@/hooks/use-toast';

interface ClientCategory {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
}

interface WhyChooseUsItem {
    id: number;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
}

interface HseContentItem {
    id: number;
    key: string;
    content_en?: string;
    content_ar?: string;
    link?: string;
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

interface ContactInfoMap {
    [key: string]: { value_en: string; value_ar: string };
}

interface HSEContactProps {
    hero?: HeroData | null;
    hseCommitments?: HseContentItem[];
    hsePolicyLink?: HseContentItem | null;
    clientCategories?: ClientCategory[];
    whyChooseUs?: WhyChooseUsItem[];
}

export default function HSEContact({
    hero,
    hseCommitments = [],
    hsePolicyLink,
    clientCategories = [],
    whyChooseUs = [],
}: HSEContactProps) {
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { contactInfo = {} } = usePage().props as { contactInfo?: ContactInfoMap };

    const getContactValue = (key: string): string => {
        const item = contactInfo?.[key];
        if (!item) return '';
        return language === 'en' ? item.value_en : item.value_ar;
    };

    const phoneVal = getContactValue('phone') || '0572914027';
    const whatsappVal = getContactValue('whatsapp') || phoneVal;
    const whatsappNumber = (whatsappVal || phoneVal).replace(/\D/g, '');

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast({
            title: language === 'en' ? 'Message Sent' : 'تم إرسال الرسالة',
            description: language === 'en' ? 'We will get back to you shortly.' : 'سنتواصل معك قريبًا.',
        });

        setIsSubmitting(false);
        (e.target as HTMLFormElement).reset();
    };

    const whatsappMessage = language === 'en' 
        ? 'Hello, I would like to inquire about your services.'
        : 'مرحباً، أود الاستفسار عن خدماتكم.';

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const pageTitle = hero ? (language === 'en' ? hero.meta_title_en : hero.meta_title_ar) || undefined : undefined;
    const metaDescription = hero ? (language === 'en' ? hero.meta_description_en : hero.meta_description_ar) || undefined : undefined;
    const metaKeywords = hero?.meta_keywords || undefined;

    return (
        <>
            <Head>
                <title>{pageTitle || 'HSE, Clients & Contact - Arkaan Global Contracting | Get In Touch'}</title>
                <meta name="description" content={metaDescription || 'Contact Arkaan Global Contracting for construction, MEP, manpower, and cleaning services. Learn about our HSE commitment, clients, and why choose us.'} />
                <meta name="keywords" content={metaKeywords || 'contact Arkaan Global, HSE policy, safety commitment, construction contact, Saudi Arabia construction company'} />
                
                <meta property="og:title" content={pageTitle || 'HSE, Clients & Contact - Arkaan Global Contracting'} />
                <meta property="og:description" content={metaDescription || 'Contact us for construction, MEP, manpower, and cleaning services. Learn about our HSE commitment and clients.'} />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="website" />
                
                <meta name="twitter:title" content={pageTitle || 'HSE, Clients & Contact - Arkaan Global Contracting'} />
                <meta name="twitter:description" content={metaDescription || 'Contact us for construction, MEP, manpower, and cleaning services in Saudi Arabia.'} />
                
                <link rel="canonical" href={currentUrl} />
                
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        "mainEntity": {
                            "@type": "Organization",
                            "name": "Arkaan Global Contracting",
                            "url": siteUrl,
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "contactType": "Customer Service",
                                "availableLanguage": ["English", "Arabic"]
                            }
                        }
                    })}
                </script>
            </Head>
            <Layout>
            <PageHero
                hero={hero}
                fallbackTitle={language === 'en' ? 'HSE & Contact' : 'السلامة والاتصال'}
                fallbackSubtitle={language === 'en' ? 'Health, Safety, Quality Commitment & Get In Touch' : 'الالتزام بالصحة والسلامة والجودة والتواصل معنا'}
                language={language}
            />

            <div className="section-padding">
                <div className="container-custom space-y-20">
                    {/* HSE & Quality Commitment */}
                    <WhenVisible id="hse" className="scroll-mt-24">
                        <section>
                            <div className="mb-12 text-center">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient mb-4 mx-auto">
                                    <Shield className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                                    {language === 'en' ? 'HSE & Quality Commitment' : 'الالتزام بالصحة والسلامة والجودة'}
                                </h2>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-3 mb-8">
                                <div className="relative rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800"
                                        alt="Safety equipment"
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                                </div>
                                <div className="relative rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800"
                                        alt="Quality control"
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                                </div>
                                <div className="relative rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800"
                                        alt="Team training"
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                                </div>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                                <div className="card-elevated p-8">
                                    <h3 className="mb-4 text-xl font-semibold text-foreground">
                                        {language === 'en' ? 'Our Commitment' : 'التزامنا'}
                                    </h3>
                                    {hseCommitments.length > 0 ? (
                                        <div
                                            className="prose prose-muted-foreground max-w-none [&_ul]:space-y-3 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:text-muted-foreground"
                                            dangerouslySetInnerHTML={{
                                                __html: language === 'en'
                                                    ? (hseCommitments[0]?.content_en || '')
                                                    : (hseCommitments[0]?.content_ar || ''),
                                            }}
                                        />
                                    ) : (
                                        <ul className="space-y-3">
                                            {(language === 'en'
                                                ? [
                                                      'Comprehensive safety induction for all workers',
                                                      'Mandatory Personal Protective Equipment (PPE)',
                                                      'Regular safety training and workshops',
                                                      'Safe handling and storage of chemicals',
                                                      'Emergency response procedures',
                                                      'Quality assurance and control measures',
                                                  ]
                                                : [
                                                      'التدريب الشامل على السلامة لجميع العمال',
                                                      'معدات الحماية الشخصية (PPE) الإلزامية',
                                                      'التدريب المنتظم على السلامة وورش العمل',
                                                      'التعامل الآمن مع المواد الكيميائية وتخزينها',
                                                      'إجراءات الاستجابة للطوارئ',
                                                      'تدابير ضمان الجودة والتحكم',
                                                  ]
                                            ).map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                                                    <span className="text-muted-foreground">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="card-elevated p-8">
                                    <h3 className="mb-4 text-xl font-semibold text-foreground">
                                        {language === 'en' ? 'HSE Policy' : 'سياسة الصحة والسلامة والبيئة'}
                                    </h3>
                                    <p className="mb-4 text-muted-foreground">
                                        {language === 'en'
                                            ? 'Download our comprehensive HSE policy document to learn more about our commitment to safety and quality.'
                                            : 'قم بتنزيل وثيقة سياسة الصحة والسلامة والبيئة الشاملة لمعرفة المزيد عن التزامنا بالسلامة والجودة.'}
                                    </p>
                                    <a
                                        href={hsePolicyLink?.link || '/hse-policy.pdf'}
                                        download
                                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                                    >
                                        <Download className="h-4 w-4" />
                                        <span>{language === 'en' ? 'Download HSE Policy PDF' : 'تحميل سياسة الصحة والسلامة والبيئة'}</span>
                                    </a>
                                </div>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Clients & Markets Served */}
                    <WhenVisible id="clients" className="scroll-mt-24">
                        <section>
                            <div className="mb-12 text-center">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient mb-4 mx-auto">
                                    <Building2 className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                                    {language === 'en' ? 'Clients & Markets Served' : 'العملاء والأسواق المخدومة'}
                                </h2>
                                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                                    {language === 'en' 
                                        ? 'Trusted by leading organizations across multiple sectors in Saudi Arabia'
                                        : 'موثوق به من قبل المنظمات الرائدة عبر قطاعات متعددة في المملكة العربية السعودية'}
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {(clientCategories.length > 0
                                    ? clientCategories.map((c) => ({
                                          title: language === 'en' ? c.name_en : c.name_ar,
                                          description: (language === 'en' ? c.description_en : c.description_ar) || '',
                                      }))
                                    : [
                                          { title: language === 'en' ? 'Government' : 'حكومي', description: language === 'en' ? 'Public sector projects and infrastructure' : 'مشاريع القطاع العام والبنية التحتية' },
                                          { title: language === 'en' ? 'Semi-Government' : 'شبه حكومي', description: language === 'en' ? 'Quasi-governmental organizations' : 'المنظمات شبه الحكومية' },
                                          { title: language === 'en' ? 'Industrial' : 'صناعي', description: language === 'en' ? 'Manufacturing and industrial facilities' : 'مرافق التصنيع والصناعة' },
                                          { title: language === 'en' ? 'Private' : 'خاص', description: language === 'en' ? 'Commercial and private developments' : 'التطويرات التجارية والخاصة' },
                                      ]
                                ).map((client, i) => (
                                    <div key={i} className="card-elevated p-6 text-center">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                                            <Building2 className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold text-foreground">{client.title}</h3>
                                        {client.description && (
                                            <p className="text-sm text-muted-foreground">{client.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Why Choose Us */}
                    <WhenVisible id="why-choose" className="scroll-mt-24">
                        <section>
                            <div className="mb-12 text-center">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient mb-4 mx-auto">
                                    <Award className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                                    {language === 'en' ? 'Why Choose Us' : 'لماذا تختارنا'}
                                </h2>
                                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                                    {language === 'en' 
                                        ? 'Your success is our commitment. Here\'s what sets us apart'
                                        : 'نجاحك هو التزامنا. إليك ما يميزنا'}
                                </p>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-3">
                                {(whyChooseUs.length > 0
                                    ? whyChooseUs.map((w) => ({
                                          title: language === 'en' ? w.title_en : w.title_ar,
                                          description: language === 'en' ? w.description_en : w.description_ar,
                                      }))
                                    : [
                                          { title: language === 'en' ? 'Reliability' : 'الموثوقية', description: language === 'en' ? 'Consistent delivery on all commitments with proven track record.' : 'التسليم المستمر لجميع الالتزامات مع سجل حافل مثبت.' },
                                          { title: language === 'en' ? 'Safety' : 'السلامة', description: language === 'en' ? 'Zero compromise on worker safety and compliance with all regulations.' : 'لا تنازل عن سلامة العمال والامتثال لجميع اللوائح.' },
                                          { title: language === 'en' ? 'Compliance' : 'الامتثال', description: language === 'en' ? 'Full adherence to Saudi labor laws and industry standards.' : 'الالتزام الكامل بقوانين العمل السعودية ومعايير الصناعة.' },
                                      ]
                                ).map((item, i) => (
                                    <div key={i} className="card-elevated p-6">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                            <CheckCircle2 className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Contact Section */}
                    <WhenVisible id="contact" className="scroll-mt-24">
                        <section>
                            <div className="mb-8 flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient">
                                    <Phone className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-foreground">
                                        {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
                                    </h2>
                                </div>
                            </div>

                            <div className="grid gap-12 lg:grid-cols-2">
                                {/* Contact Information */}
                                <div className="space-y-6">
                                    <div className="card-elevated p-8">
                                        <h3 className="mb-6 text-xl font-semibold text-foreground">
                                            {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <MapPin className="h-5 w-5 shrink-0 text-primary mt-1" />
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {language === 'en' ? 'Address' : 'العنوان'}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {getContactValue('address') || (language === 'en' ? 'Jubail, Eastern Province, Saudi Arabia' : 'الجبيل، المنطقة الشرقية، المملكة العربية السعودية')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <Phone className="h-5 w-5 shrink-0 text-primary mt-1" />
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {language === 'en' ? 'Phone' : 'الهاتف'}
                                                    </p>
                                                    <a href={`tel:${phoneVal.replace(/\D/g, '')}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                                        {phoneVal}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <Mail className="h-5 w-5 shrink-0 text-primary mt-1" />
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                                                    </p>
                                                    <a href={`mailto:${getContactValue('email') || 'info@arkaanglobal.com'}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                                        {getContactValue('email') || 'info@arkaanglobal.com'}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <Clock className="h-5 w-5 shrink-0 text-primary mt-1" />
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {language === 'en' ? 'Business Hours' : 'ساعات العمل'}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {getContactValue('hours') || (language === 'en' ? 'Sun - Thu: 8:00 AM - 5:00 PM' : 'الأحد - الخميس: 8:00 صباحًا - 5:00 مساءً')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* WhatsApp Button */}
                                        <div className="mt-6 pt-6 border-t border-border">
                                            <a
                                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-white hover:bg-[#20BA5A] transition-colors"
                                            >
                                                <MessageCircle className="h-5 w-5" />
                                                <span>{language === 'en' ? 'Chat on WhatsApp' : 'التواصل عبر واتساب'}</span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Google Map */}
                                    <div className="card-elevated overflow-hidden">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.1234567890123!2d49.654321!3d27.012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDAwJzQ0LjQiTiA0OcKwMzknMTUuNiJF!5e0!3m2!1sen!2ssa!4v1234567890123!5m2!1sen!2ssa"
                                            width="100%"
                                            height="300"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="w-full"
                                            title={language === 'en' ? 'Office Location' : 'موقع المكتب'}
                                        />
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div className="card-elevated p-8">
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
                                            <Label htmlFor="requirement">
                                                {language === 'en' ? 'Requirement' : 'المتطلب'}
                                            </Label>
                                            <Textarea id="requirement" name="requirement" rows={3} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="startDate">
                                                {language === 'en' ? 'Preferred Start Date' : 'تاريخ البدء المفضل'}
                                            </Label>
                                            <Input id="startDate" name="startDate" type="date" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">{t('contact.form.message')}</Label>
                                            <Textarea id="message" name="message" rows={4} />
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
                        </section>
                    </WhenVisible>
                </div>
            </div>

            {/* Floating WhatsApp Button */}
            <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg hover:bg-[#20BA5A] transition-all hover:scale-110"
                aria-label={language === 'en' ? 'Chat on WhatsApp' : 'التواصل عبر واتساب'}
            >
                <MessageCircle className="h-7 w-7 text-white" />
            </a>
        </Layout>
        </>
    );
}
