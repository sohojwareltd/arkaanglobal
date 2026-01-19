import React from 'react';
import { Quote } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import WhenVisible from '@/components/ui/when-visible';

export default function Clients() {
    const { t, language } = useLanguage();

    const clients = [
        { name: 'Saudi Binladin Group', abbr: 'SBG', sector: language === 'en' ? 'Construction' : 'البناء' },
        { name: 'Al Rajhi Construction', abbr: 'ARC', sector: language === 'en' ? 'Development' : 'التطوير' },
        { name: 'Nesma & Partners', abbr: 'N&P', sector: language === 'en' ? 'Infrastructure' : 'البنية التحتية' },
        { name: 'El Seif Engineering', abbr: 'ESE', sector: language === 'en' ? 'Engineering' : 'الهندسة' },
        { name: 'Saudi Oger', abbr: 'SOG', sector: language === 'en' ? 'Construction' : 'البناء' },
        { name: 'Al Bawani Company', abbr: 'ABC', sector: language === 'en' ? 'Commercial' : 'التجاري' },
        { name: 'Almabani General', abbr: 'AGC', sector: language === 'en' ? 'General Contracting' : 'المقاولات العامة' },
        { name: 'Al Arrab Contracting', abbr: 'AAC', sector: language === 'en' ? 'Industrial' : 'الصناعي' },
        { name: 'First Saudi', abbr: 'FSC', sector: language === 'en' ? 'Development' : 'التطوير' },
        { name: 'Mohammed Al-Mojil', abbr: 'MMG', sector: language === 'en' ? 'Infrastructure' : 'البنية التحتية' },
        { name: 'Bin Omairah', abbr: 'BOG', sector: language === 'en' ? 'Construction' : 'البناء' },
        { name: 'Al Khodari', abbr: 'AKC', sector: language === 'en' ? 'Industrial' : 'الصناعي' },
    ];

    const testimonials = [
        {
            quote: language === 'en'
                ? 'Arkaan Global Contracting has been instrumental in delivering our projects on time. Their workforce is reliable, skilled, and safety-conscious.'
                : 'كانت شركة أركان جلوبال للمقاولات أساسية في تسليم مشاريعنا في الوقت المحدد. قوتهم العاملة موثوقة وماهرة وواعية بالسلامة.',
            author: language === 'en' ? 'Mohammed Al-Rashid' : 'محمد الراشد',
            position: language === 'en' ? 'Project Director' : 'مدير المشروع',
            company: 'Saudi Binladin Group',
        },
        {
            quote: language === 'en'
                ? "We've worked with many manpower suppliers, but Arkaan Global Contracting stands out for their professionalism and commitment to quality."
                : 'عملنا مع العديد من موردي القوى العاملة، لكن أركان جلوبال للمقاولات تتميز باحترافيتها والتزامها بالجودة.',
            author: language === 'en' ? 'Ahmed Al-Harbi' : 'أحمد الحربي',
            position: language === 'en' ? 'Operations Manager' : 'مدير العمليات',
            company: 'Nesma & Partners',
        },
        {
            quote: language === 'en'
                ? 'Their ability to scale rapidly and provide qualified workers has been crucial for our large-scale projects.'
                : 'كانت قدرتهم على التوسع السريع وتوفير العمال المؤهلين حاسمة لمشاريعنا الكبيرة.',
            author: language === 'en' ? 'Khalid Al-Saud' : 'خالد السعود',
            position: language === 'en' ? 'Procurement Head' : 'رئيس المشتريات',
            company: 'El Seif Engineering',
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
                            {t('clients.page.title')}
                        </h1>
                        <p className="text-xl text-muted-foreground">{t('clients.page.subtitle')}</p>
                    </div>
                </div>
            </section>

            {/* Clients Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {clients.map((client, index) => (
                            <WhenVisible
                                key={index}
                                className="card-elevated p-6 text-center"
                                options={{ threshold: 0.1 }}
                                style={{ transitionDelay: `${index * 40}ms` }}
                            >
                                <div className="mb-2 text-3xl font-bold text-primary">{client.abbr}</div>
                                <div className="mb-1 text-sm font-medium text-foreground">{client.name}</div>
                                <div className="text-xs text-muted-foreground">{client.sector}</div>
                            </WhenVisible>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding bg-muted/30">
                <div className="container-custom">
                    <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
                        {language === 'en' ? 'What Our Clients Say' : 'ماذا يقول عملاؤنا'}
                    </h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((testimonial, index) => (
                            <WhenVisible
                                key={index}
                                className="card-elevated p-6"
                                options={{ threshold: 0.15 }}
                                style={{ transitionDelay: `${index * 80}ms` }}
                            >
                                <Quote className="mb-4 h-10 w-10 text-primary/30" />
                                <p className="mb-6 italic text-muted-foreground">"{testimonial.quote}"</p>
                                <div className="border-t border-border pt-4">
                                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                                    <p className="text-sm text-primary">{testimonial.company}</p>
                                </div>
                            </WhenVisible>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
