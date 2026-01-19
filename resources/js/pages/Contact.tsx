import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast({
            title: t('contact.form.success'),
            description: language === 'en' ? 'We will get back to you shortly.' : 'سنتواصل معك قريبًا.',
        });

        setIsSubmitting(false);
        (e.target as HTMLFormElement).reset();
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: t('contact.info.address'),
            value:
                language === 'en'
                    ? 'King Fahd Road, Al Olaya District\nRiyadh, Saudi Arabia 12211'
                    : 'طريق الملك فهد، حي العليا\nالرياض، المملكة العربية السعودية 12211',
        },
        {
            icon: Phone,
            title: t('contact.info.phone'),
            value: '+966 11 123 4567',
            link: 'tel:+966111234567',
        },
        {
            icon: Mail,
            title: t('contact.info.email'),
            value: 'info@arkaanglobal.com',
            link: 'mailto:info@arkaanglobal.com',
        },
        {
            icon: Clock,
            title: t('contact.info.hours'),
            value: t('contact.info.hours.value'),
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
                            {t('contact.title')}
                        </h1>
                        <p className="text-xl text-muted-foreground">{t('contact.subtitle')}</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Contact Form */}
                        <div className="card-elevated p-8">
                            <h2 className="mb-6 text-2xl font-bold text-foreground">
                                {language === 'en' ? 'Send Us a Message' : 'أرسل لنا رسالة'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
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
                                    <Textarea id="message" name="message" rows={5} required />
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full hero-gradient border-0 text-primary-foreground"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (language === 'en' ? 'Sending...' : 'جاري الإرسال...') : t('contact.form.submit')}
                                </Button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 className="mb-6 text-2xl font-bold text-foreground">{t('contact.info.title')}</h2>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl hero-gradient">
                                            <info.icon className="h-6 w-6 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="mb-1 font-semibold text-foreground">{info.title}</h3>
                                            {info.link ? (
                                                <a
                                                    href={info.link}
                                                    className="text-muted-foreground transition-colors hover:text-primary"
                                                    dir={info.title === t('contact.info.phone') ? 'ltr' : undefined}
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="whitespace-pre-line text-muted-foreground">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map */}
                            <div className="mt-8 overflow-hidden rounded-xl border border-border">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.4747989747!2d46.6823!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnNTYuMyJF!5e0!3m2!1sen!2ssa!4v1234567890"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Office Location"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
