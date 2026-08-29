import React, { useState } from 'react';
import { Building2, Factory, HardHat, Users, Wrench, LucideIcon } from 'lucide-react';

import SectionHeader from '@/components/ui/section-header';
import { useLanguage } from '@/contexts/LanguageContext';

interface WhyChooseUsItem {
    id: number;
    title_en: string;
    title_ar: string;
    description_en?: string;
    description_ar?: string;
    icon?: string;
}

interface WhyChooseUsSectionProps {
    items?: WhyChooseUsItem[];
}

const iconMap: Record<string, LucideIcon> = {
    building: Building2,
    factory: Factory,
    'hard-hat': HardHat,
    users: Users,
    wrench: Wrench,
};

const PANEL_IMAGES = [
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1400',
    'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1400',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400',
];

export default function WhyChooseUsSection({ items = [] }: WhyChooseUsSectionProps): JSX.Element | null {
    const { language } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);

    if (items.length === 0) {
        return null;
    }

    const defaultQuote =
        language === 'en'
            ? 'As a dedicated group, we deliver end-to-end solutions — from design and construction to fabrication and erection. Our integrated approach ensures quality, efficiency, and cost savings, giving you a clear competitive edge.'
            : 'بصفتنا مجموعة متخصصة، نقدم حلولاً متكاملة — من التصميم والبناء إلى التصنيع والتركيب. يضمن نهجنا المتكامل الجودة والكفاءة وتوفير التكاليف، مما يمنحكم ميزة تنافسية واضحة.';

    return (
        <section className="whyus">
            <div className="whyus__inner">
                <div className="whyus__header">
                    <SectionHeader
                        tag={language === 'en' ? 'All Under One Roof' : 'كل شيء تحت سقف واحد'}
                        title={language === 'en' ? 'Why Choose Us' : 'لماذا تختارنا'}
                    />
                    <div className="whyus__advantage-banner">
                        <span className="whyus__advantage-tag">
                            {language === 'en' ? 'Unified Group Advantage' : 'ميزة المجموعة الموحدة'}
                        </span>
                        <p className="whyus__advantage-quote">&ldquo;{defaultQuote}&rdquo;</p>
                    </div>
                </div>

                <div className="whyus-accordion">
                    {items.map((item, index) => {
                        const Icon = iconMap[item.icon || ''] || Building2;
                        const title = language === 'en' ? item.title_en : item.title_ar;
                        const description = language === 'en' ? item.description_en : item.description_ar;
                        const isActive = activeIndex === index;
                        const image = PANEL_IMAGES[index % PANEL_IMAGES.length];

                        return (
                            <div
                                key={item.id}
                                className={`whyus-accordion__panel${isActive ? ' active' : ''}`}
                                style={{ backgroundImage: `url('${image}')` }}
                                onMouseEnter={() => setActiveIndex(index)}
                                onFocus={() => setActiveIndex(index)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setActiveIndex(index);
                                    }
                                }}
                                data-cursor-hover
                            >
                                <div className="whyus-accordion__overlay" />
                                <span className="whyus-accordion__vertical-title">{title}</span>
                                <div className="whyus-accordion__icon">
                                    <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                                </div>
                                <div className="whyus-accordion__content">
                                    <h3 className="whyus-accordion__title">{title}</h3>
                                    <p className="whyus-accordion__text">{description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
