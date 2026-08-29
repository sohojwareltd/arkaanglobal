import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import SectionHeader from '@/components/ui/section-header';
import SectionReveal from '@/components/ui/section-reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface CertificateItem {
    id: number;
    title_en: string;
    title_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
}

interface CertificationsSectionProps {
    certificates?: CertificateItem[];
}

function resolveImageUrl(image?: string): string | null {
    if (!image) {
        return null;
    }
    if (image.startsWith('http')) {
        return image;
    }

    return image.startsWith('/') ? image : `/storage/${image}`;
}

export default function CertificationsSection({ certificates = [] }: CertificationsSectionProps): JSX.Element | null {
    const { language } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);

    if (certificates.length === 0) {
        return null;
    }

    const goPrev = (): void => setActiveIndex((i) => (i === 0 ? certificates.length - 1 : i - 1));
    const goNext = (): void => setActiveIndex((i) => (i === certificates.length - 1 ? 0 : i + 1));

    return (
        <section className="testimonials">
            <div className="testimonials__inner">
                <SectionReveal>
                    <SectionHeader
                        tag={language === 'en' ? 'Certifications' : 'الشهادات'}
                        title={
                            language === 'en' ? (
                                <>Our <em>Certifications</em></>
                            ) : (
                                <>شهادات<em>نا</em></>
                            )
                        }
                        subtitle={
                            language === 'en'
                                ? 'We operate under the highest international benchmarks, certified to ISO standards for quality, safety, and environment.'
                                : 'نعمل وفق أعلى المعايير الدولية، معتمدون على معايير ISO للجودة والسلامة والبيئة.'
                        }
                    />
                </SectionReveal>

                <SectionReveal delay={200}>
                    <div className="testimonials__slider">
                        <div
                            className="testimonials__track"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {certificates.map((cert) => {
                                const certTitle = language === 'en' ? cert.title_en : cert.title_ar;
                                const certDesc = language === 'en' ? cert.description_en : cert.description_ar;
                                const certImage = resolveImageUrl(cert.image);

                                return (
                                    <div key={cert.id} className="testimonial-card">
                                        <div className="testimonial-card__left">
                                            <div className="testimonial-card__stars">
                                                {language === 'en' ? 'Official Certification' : 'شهادة رسمية'}
                                            </div>
                                            <h3 className="testimonial-card__name testimonial-card__name--lg">
                                                {certTitle}
                                            </h3>
                                            <p className="testimonial-card__text testimonial-card__text--plain">
                                                {certDesc}
                                            </p>
                                            {certImage && (
                                                <div className="testimonial-card__actions">
                                                    <a
                                                        href={certImage}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-primary"
                                                        data-cursor-hover
                                                    >
                                                        {language === 'en' ? 'View Official PDF' : 'عرض الشهادة'}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                        <div className="testimonial-card__image-wrap">
                                            <div className="testimonial-card__image-overlay" />
                                            {certImage ? (
                                                <a
                                                    href={certImage}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    data-cursor-hover
                                                >
                                                    <img
                                                        src={certImage}
                                                        alt={certTitle}
                                                        className="testimonial-card__image"
                                                    />
                                                </a>
                                            ) : (
                                                <div className="testimonial-card__image-placeholder">
                                                    {certTitle}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {certificates.length > 1 && (
                        <div className="testimonials__controls">
                            <button
                                type="button"
                                className="testimonials__btn"
                                onClick={goPrev}
                                aria-label="Previous"
                                data-cursor-hover
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <div className="testimonials__dots">
                                {certificates.map((cert, index) => (
                                    <button
                                        key={cert.id}
                                        type="button"
                                        className={cn('testimonials__dot', index === activeIndex && 'active')}
                                        onClick={() => setActiveIndex(index)}
                                        aria-label={`Slide ${index + 1}`}
                                        data-cursor-hover
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                className="testimonials__btn"
                                onClick={goNext}
                                aria-label="Next"
                                data-cursor-hover
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </SectionReveal>
            </div>
        </section>
    );
}
