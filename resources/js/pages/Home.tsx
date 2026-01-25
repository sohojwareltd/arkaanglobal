import React, { useState } from 'react';
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

export default function Home() {
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const whatsappNumber = '+966501234567';
    const whatsappMessage = language === 'en' 
        ? 'Hello, I would like to inquire about your services.'
        : 'مرحباً، أود الاستفسار عن خدماتكم.';

    return (
        <Layout>
            <HeroSection />
            <WhenVisible>
                <ServicesSection />
            </WhenVisible>

            {/* About Section */}
            <WhenVisible>
                <section className="section-padding bg-muted/30">
                    <div className="container-custom">
                        <div className="mx-auto max-w-4xl">
                            {/* Company Overview */}
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                                    {language === 'en' ? 'About Arkaan Global' : 'عن أركان جلوبال'}
                                </h2>
                                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                    {language === 'en'
                                        ? 'Arkaan Global Contracting is a leading provider of construction, MEP, manpower, and cleaning services in Saudi Arabia. With a commitment to excellence and safety, we serve government, semi-government, industrial, and private sector clients across the Kingdom.'
                                        : 'أركان جلوبال للمقاولات هي مزود رائد لخدمات البناء والميكانيكا والكهرباء والعمالة والتنظيف في المملكة العربية السعودية. مع التزام بالتميز والسلامة، نخدم عملاء القطاعات الحكومية وشبه الحكومية والصناعية والخاصة في جميع أنحاء المملكة.'}
                                </p>
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
                                        {t('about.vision.text')}
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
                                        {t('about.mission.text')}
                                    </p>
                                </div>
                            </div>
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
                                                        {language === 'en' 
                                                            ? 'Jubail, Eastern Province, Saudi Arabia'
                                                            : 'الجبيل، المنطقة الشرقية، المملكة العربية السعودية'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <Phone className="h-5 w-5 shrink-0 text-primary mt-1" />
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {language === 'en' ? 'Phone' : 'الهاتف'}
                                                    </p>
                                                    <a href="tel:+966501234567" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                                        +966 50 123 4567
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <Mail className="h-5 w-5 shrink-0 text-primary mt-1" />
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                                                    </p>
                                                    <a href="mailto:info@arkaanglobal.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                                        info@arkaanglobal.com
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
                                                        {language === 'en' 
                                                            ? 'Sun - Thu: 8:00 AM - 5:00 PM'
                                                            : 'الأحد - الخميس: 8:00 صباحًا - 5:00 مساءً'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* WhatsApp Button */}
                                        <div className="mt-6 pt-6 border-t border-border">
                                            <a
                                                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-white hover:bg-[#20BA5A] transition-colors"
                                            >
                                                <MessageCircle className="h-5 w-5" />
                                                <span>{language === 'en' ? 'Chat on WhatsApp' : 'التواصل عبر واتساب'}</span>
                                            </a>
                                        </div>
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
                        </div>
                    </div>
                </section>
            </WhenVisible>
        </Layout>
    );
}
