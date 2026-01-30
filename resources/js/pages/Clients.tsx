import React from 'react';
import { Quote } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/page-hero';
import { useLanguage } from '@/contexts/LanguageContext';
import WhenVisible from '@/components/ui/when-visible';

interface Client {
    id: number;
    name: string;
    abbr: string;
    sector_en: string;
    sector_ar: string;
    logo?: string;
}

interface Testimonial {
    id: number;
    quote_en: string;
    quote_ar: string;
    author_en: string;
    author_ar: string;
    position_en: string;
    position_ar: string;
    company?: string;
    client?: { name: string };
}

interface HeroData {
    title_en?: string;
    title_ar?: string;
    subtitle_en?: string;
    subtitle_ar?: string;
    background_image?: string;
}

interface ClientsProps {
    hero?: HeroData | null;
    clients?: Client[];
    testimonials?: Testimonial[];
}

export default function Clients({
    hero,
    clients = [],
    testimonials = [],
}: ClientsProps) {
    const { t, language } = useLanguage();

    const displayClients =
        clients.length > 0
            ? clients.map((c) => ({
                  name: c.name,
                  abbr: c.abbr,
                  sector: language === 'en' ? c.sector_en : c.sector_ar,
              }))
            : [
                  { name: 'Saudi Binladin Group', abbr: 'SBG', sector: language === 'en' ? 'Construction' : 'البناء' },
                  { name: 'Al Rajhi Construction', abbr: 'ARC', sector: language === 'en' ? 'Development' : 'التطوير' },
                  { name: 'Nesma & Partners', abbr: 'N&P', sector: language === 'en' ? 'Infrastructure' : 'البنية التحتية' },
              ];

    const displayTestimonials =
        testimonials.length > 0
            ? testimonials.map((testimonial) => ({
                  quote: language === 'en' ? testimonial.quote_en : testimonial.quote_ar,
                  author: language === 'en' ? testimonial.author_en : testimonial.author_ar,
                  position: language === 'en' ? testimonial.position_en : testimonial.position_ar,
                  company: testimonial.company ?? testimonial.client?.name ?? '',
              }))
            : [
                  { quote: language === 'en' ? 'Arkaan Global Contracting has been instrumental in delivering our projects on time.' : 'كانت شركة أركان جلوبال للمقاولات أساسية في تسليم مشاريعنا في الوقت المحدد.', author: language === 'en' ? 'Mohammed Al-Rashid' : 'محمد الراشد', position: language === 'en' ? 'Project Director' : 'مدير المشروع', company: 'Saudi Binladin Group' },
                  { quote: language === 'en' ? "We've worked with many manpower suppliers, but Arkaan Global Contracting stands out." : 'عملنا مع العديد من موردي القوى العاملة، لكن أركان جلوبال للمقاولات تتميز باحترافيتها.', author: language === 'en' ? 'Ahmed Al-Harbi' : 'أحمد الحربي', position: language === 'en' ? 'Operations Manager' : 'مدير العمليات', company: 'Nesma & Partners' },
              ];

    return (
        <Layout>
            <PageHero
                hero={hero}
                fallbackTitle={t('clients.page.title')}
                fallbackSubtitle={t('clients.page.subtitle')}
                language={language}
            />

            {/* Clients Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {displayClients.map((client, index) => (
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
                        {displayTestimonials.map((testimonial, index) => (
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
