import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Calendar, MapPin } from 'lucide-react';

import Layout from '@/components/layout/Layout';
import WhenVisible from '@/components/ui/when-visible';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    employmentLabel,
    formatJobDeadline,
    type JobPosting,
} from '@/lib/careers-utils';

interface CareerJobDetailProps {
    job: JobPosting;
}

export default function CareerJobDetail({ job }: CareerJobDetailProps): JSX.Element {
    const { language, direction } = useLanguage();

    const title = language === 'en' ? job.title_en : job.title_ar;
    const description = language === 'en' ? job.description_en : job.description_ar;
    const location = language === 'en' ? job.location_en : job.location_ar;

    const pageTitle = `${title} - Careers - Arkaan Construction Company`;

    return (
        <>
            <Head title={pageTitle} />

            <Layout>
                <section className="career-detail">
                    <div className="career-detail__inner">
                        <Link
                            href="/careers"
                            className="career-detail__back"
                            data-cursor-hover
                        >
                            <ArrowLeft
                                className={`h-4 w-4 ${direction === 'rtl' ? 'rotate-180' : ''}`}
                            />
                            {language === 'en' ? 'Back to Careers' : 'العودة إلى الوظائف'}
                        </Link>

                        <div className="career-detail__header">
                            <span className="careers-job-card__type">
                                {employmentLabel(job.employment_type, language)}
                            </span>
                            <h1 className="career-detail__title">{title}</h1>

                            <div className="careers-job-card__meta">
                                {location && (
                                    <span>
                                        <MapPin className="h-4 w-4" />
                                        {location}
                                    </span>
                                )}
                                {job.application_deadline && (
                                    <span>
                                        <Calendar className="h-4 w-4" />
                                        {language === 'en' ? 'Apply by: ' : 'آخر موعد: '}
                                        {formatJobDeadline(job.application_deadline, language)}
                                    </span>
                                )}
                            </div>
                        </div>

                        <WhenVisible>
                            {description && (
                                <div
                                    className="career-detail__description careers-job-card__description"
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                            )}

                            <div className="career-detail__cta">
                                <Link
                                    href={`/careers/${job.id}/apply`}
                                    className="btn-gold"
                                    data-cursor-hover
                                >
                                    {language === 'en' ? 'Apply for this Position' : 'قدّم لهذه الوظيفة'}
                                    <ArrowRight
                                        className={`h-4 w-4 ${direction === 'rtl' ? 'rotate-180' : ''}`}
                                    />
                                </Link>
                            </div>
                        </WhenVisible>
                    </div>
                </section>
            </Layout>
        </>
    );
}
