import React, { useState } from 'react';
import { Shield, Users, Award, MapPin, Phone, Mail, Clock, CheckCircle2, Building2, Download, MessageCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import WhenVisible from '@/components/ui/when-visible';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function HSEContact() {
    const { t, language, direction } = useLanguage();
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

    const whatsappNumber = '+966501234567'; // Update with actual Jubail number
    const whatsappMessage = language === 'en' 
        ? 'Hello, I would like to inquire about your services.'
        : 'مرحباً، أود الاستفسار عن خدماتكم.';

    return (
        <Layout>
            {/* Hero */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=3431&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
                            {language === 'en' ? 'HSE & Contact' : 'السلامة والاتصال'}
                        </h1>
                        <p className="text-xl text-primary-foreground/90">
                            {language === 'en' 
                                ? 'Health, Safety, Quality Commitment & Get In Touch' 
                                : 'الالتزام بالصحة والسلامة والجودة والتواصل معنا'}
                        </p>
                    </div>
                </div>
            </section>

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
                                    <ul className="space-y-3">
                                        {(
                                            language === 'en'
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
                                        href="/hse-policy.pdf"
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
                                {(
                                    language === 'en'
                                        ? [
                                              { title: 'Government', description: 'Public sector projects and infrastructure' },
                                              { title: 'Semi-Government', description: 'Quasi-governmental organizations' },
                                              { title: 'Industrial', description: 'Manufacturing and industrial facilities' },
                                              { title: 'Private', description: 'Commercial and private developments' },
                                          ]
                                        : [
                                              { title: 'حكومي', description: 'مشاريع القطاع العام والبنية التحتية' },
                                              { title: 'شبه حكومي', description: 'المنظمات شبه الحكومية' },
                                              { title: 'صناعي', description: 'مرافق التصنيع والصناعة' },
                                              { title: 'خاص', description: 'التطويرات التجارية والخاصة' },
                                          ]
                                ).map((client, i) => (
                                    <div key={i} className="card-elevated p-6 text-center">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                                            <Building2 className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold text-foreground">{client.title}</h3>
                                        <p className="text-sm text-muted-foreground">{client.description}</p>
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
                                {(
                                    language === 'en'
                                        ? [
                                              {
                                                  title: 'Reliability',
                                                  description: 'Consistent delivery on all commitments with proven track record.',
                                              },
                                              {
                                                  title: 'Safety',
                                                  description: 'Zero compromise on worker safety and compliance with all regulations.',
                                              },
                                              {
                                                  title: 'Compliance',
                                                  description: 'Full adherence to Saudi labor laws and industry standards.',
                                              },
                                              {
                                                  title: 'Transparency',
                                                  description: 'Clear communication and honest business practices throughout.',
                                              },
                                              {
                                                  title: 'Quality',
                                                  description: 'Highly skilled and trained workers for all project needs.',
                                              },
                                              {
                                                  title: 'Experience',
                                                  description: 'Years of expertise serving major projects across Saudi Arabia.',
                                              },
                                          ]
                                        : [
                                              {
                                                  title: 'الموثوقية',
                                                  description: 'التسليم المستمر لجميع الالتزامات مع سجل حافل مثبت.',
                                              },
                                              {
                                                  title: 'السلامة',
                                                  description: 'لا تنازل عن سلامة العمال والامتثال لجميع اللوائح.',
                                              },
                                              {
                                                  title: 'الامتثال',
                                                  description: 'الالتزام الكامل بقوانين العمل السعودية ومعايير الصناعة.',
                                              },
                                              {
                                                  title: 'الشفافية',
                                                  description: 'التواصل الواضح والممارسات التجارية الصادقة في جميع أنحاء.',
                                              },
                                              {
                                                  title: 'الجودة',
                                                  description: 'عمال مهرة ومدربون لجميع احتياجات المشروع.',
                                              },
                                              {
                                                  title: 'الخبرة',
                                                  description: 'سنوات من الخبرة في خدمة المشاريع الكبرى في جميع أنحاء المملكة العربية السعودية.',
                                              },
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
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg hover:bg-[#20BA5A] transition-all hover:scale-110"
                aria-label={language === 'en' ? 'Chat on WhatsApp' : 'التواصل عبر واتساب'}
            >
                <MessageCircle className="h-7 w-7 text-white" />
            </a>
        </Layout>
    );
}
