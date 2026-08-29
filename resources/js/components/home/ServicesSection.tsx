import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

import SectionHeader from '@/components/ui/section-header';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceItemData {
    id: number;
    slug: string;
    title_en: string;
    title_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
    items?: { text_en: string; text_ar: string }[];
}

const FALLBACK_TAGS_BY_SLUG: Record<string, { text_en: string; text_ar: string }[]> = {
    construction: [
        { text_en: 'General Construction', text_ar: 'البناء العام' },
        { text_en: 'Civil Works', text_ar: 'الأعمال المدنية' },
        { text_en: 'Finishing Works', text_ar: 'أعمال التشطيبات' },
        { text_en: 'Maintenance', text_ar: 'الصيانة' },
    ],
    mep: [
        { text_en: 'Electrical', text_ar: 'الكهرباء' },
        { text_en: 'Plumbing', text_ar: 'السباكة' },
        { text_en: 'HVAC', text_ar: 'التكييف' },
        { text_en: 'Commissioning', text_ar: 'التشغيل' },
    ],
    manpower: [
        { text_en: 'Skilled Labor', text_ar: 'عمالة ماهرة' },
        { text_en: 'Semi-Skilled', text_ar: 'عمالة شبه ماهرة' },
        { text_en: 'Site Support', text_ar: 'دعم الموقع' },
        { text_en: 'Contract Supply', text_ar: 'توريد بالعقد' },
    ],
    cleaning: [
        { text_en: 'Office Cleaning', text_ar: 'تنظيف المكاتب' },
        { text_en: 'Industrial', text_ar: 'صناعي' },
        { text_en: 'Post-Construction', text_ar: 'ما بعد البناء' },
        { text_en: 'Periodic', text_ar: 'دوري' },
    ],
};

function formatTagLabel(text: string): string {
    const shortened = text.split(' — ')[0]?.split(' - ')[0]?.trim() ?? text;

    return shortened.length > 36 ? `${shortened.slice(0, 33)}…` : shortened;
}

interface ServicesSectionProps {
    services?: ServiceItemData[];
}

const IMAGE_BY_SLUG: Record<string, string> = {
    construction: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1400',
    mep: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400',
    manpower: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1400',
    cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1400',
};

const CATEGORY_BY_SLUG: Record<string, string> = {
    construction: 'Civil Engineering',
    mep: 'MEP Works',
    manpower: 'Workforce Supply',
    cleaning: 'Facility Services',
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400';

function resolveServiceImage(service: ServiceItemData): string {
    if (service.image) {
        if (service.image.startsWith('http')) {
            return service.image;
        }

        return service.image.startsWith('/') ? service.image : `/storage/${service.image}`;
    }

    return IMAGE_BY_SLUG[service.slug] ?? FALLBACK_IMAGE;
}

export default function ServicesSection({ services = [] }: ServicesSectionProps): JSX.Element {
    const { t, direction, language } = useLanguage();

    return (
        <section className="services-tabbed">
            <div className="services-tabbed__inner">
                <div className="services-tabbed__top">
                    <SectionHeader
                        tag={language === 'en' ? 'What We Offer' : 'ما نقدمه'}
                        title={
                            language === 'en' ? (
                                <>Our <em>Services</em></>
                            ) : (
                                <>خدمات<em>نا</em></>
                            )
                        }
                        subtitle={t('services.subtitle')}
                    />
                </div>

                <div className="services-tabbed__stack">
                    {services.map((service, index) => {
                        const title = language === 'en' ? service.title_en : service.title_ar;
                        const description = language === 'en' ? service.description_en : service.description_ar;
                        const tags = (service.items?.length
                            ? service.items
                            : FALLBACK_TAGS_BY_SLUG[service.slug] ?? []
                        ).slice(0, 4);
                        const category =
                            CATEGORY_BY_SLUG[service.slug] ??
                            service.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

                        return (
                            <div key={service.id} className="service-row">
                                <div className="service-row__img-wrap">
                                    <img
                                        src={resolveServiceImage(service)}
                                        alt={title}
                                        className="service-row__img"
                                        loading="lazy"
                                    />
                                    <div className="service-row__img-overlay" />
                                </div>
                                <div className="service-row__content">
                                    <div className="service-row__number">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <div className="service-row__category">{category}</div>
                                    <h3 className="service-row__title">{title}</h3>
                                    <p className="service-row__text">{description}</p>
                                    {tags.length > 0 && (
                                        <div className="service-row__tags">
                                            {tags.map((tag) => {
                                                const label =
                                                    language === 'en'
                                                        ? formatTagLabel(tag.text_en)
                                                        : formatTagLabel(tag.text_ar);

                                                return (
                                                    <span key={tag.text_en} className="service-row__tag">
                                                        {label}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    )}
                                    <Link
                                        href={`/services/${service.slug}`}
                                        className="service-row__link"
                                        data-cursor-hover
                                    >
                                        {direction === 'ltr' ? 'View Solutions' : 'عرض الحلول'}
                                        <ArrowRight
                                            className={`h-4 w-4 ${direction === 'rtl' ? 'rotate-180' : ''}`}
                                        />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
