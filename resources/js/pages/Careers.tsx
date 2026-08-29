import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Briefcase, Calendar, MapPin } from 'lucide-react';

import Layout from '@/components/layout/Layout';
import WhenVisible from '@/components/ui/when-visible';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    employmentLabel,
    formatJobDeadline,
    jobExcerpt,
    type JobPosting,
} from '@/lib/careers-utils';

interface CareersProps {
    jobs?: JobPosting[];
}

export default function Careers({ jobs = [] }: CareersProps): JSX.Element {
    const { t, language, direction } = useLanguage();

    const pageTitle = `${t('careers.title')} - Arkaan Construction Company`;

    return (
        <>
            <Head title={pageTitle}>
                <meta
                    name="description"
                    content="Explore career opportunities at Arkaan Construction Company and apply for open positions in Saudi Arabia."
                />
            </Head>

            <Layout>
                <section className="careers-page-header">
                    <div className="careers-page-header__inner">
                        <p className="careers-page-header__tag">
                            {language === 'en' ? 'Careers' : 'الوظائف'}
                        </p>
                        <h1 className="careers-page-header__title">
                            {language === 'en' ? (
                                <>
                                    Join Our <em>Team</em>
                                </>
                            ) : (
                                <>
                                    انضم إلى <em>فريقنا</em>
                                </>
                            )}
                        </h1>
                        <p className="careers-page-header__sub">
                            {language === 'en'
                                ? 'We are always looking for talented professionals and skilled workers to grow with us across the Kingdom.'
                                : 'نبحث دائمًا عن المحترفين والعمال المهرة للانضمام إلينا في جميع أنحاء المملكة.'}
                        </p>
                    </div>
                </section>

                <section className="careers-intro">
                    <div className="careers-intro__inner">
                        <div className="careers-intro__cards">
                            <article className="careers-intro__card">
                                <h3>{t('careers.skilled.title')}</h3>
                                <p>{t('careers.skilled.description')}</p>
                            </article>
                            <article className="careers-intro__card">
                                <h3>{t('careers.unskilled.title')}</h3>
                                <p>{t('careers.unskilled.description')}</p>
                            </article>
                        </div>
                    </div>
                </section>

                <WhenVisible>
                    <section className="careers-jobs">
                        <div className="careers-jobs__inner">
                            <h2 className="careers-jobs__title">
                                {language === 'en' ? 'Open Positions' : 'الوظائف المتاحة'}
                            </h2>

                            {jobs.length === 0 ? (
                                <div className="careers-jobs__empty">
                                    <Briefcase className="h-10 w-10 text-primary/60" />
                                    <p>
                                        {language === 'en'
                                            ? 'There are no open positions at the moment. Please check back soon.'
                                            : 'لا توجد وظائف متاحة حاليًا. يرجى المراجعة لاحقًا.'}
                                    </p>
                                </div>
                            ) : (
                                <div className="careers-jobs__list">
                                    {jobs.map((job) => {
                                        const title =
                                            language === 'en' ? job.title_en : job.title_ar;
                                        const description =
                                            language === 'en'
                                                ? job.description_en
                                                : job.description_ar;
                                        const location =
                                            language === 'en' ? job.location_en : job.location_ar;
                                        const excerpt = jobExcerpt(description);

                                        return (
                                            <article key={job.id} className="careers-job-card">
                                                <div className="careers-job-card__header">
                                                    <div>
                                                        <span className="careers-job-card__type">
                                                            {employmentLabel(
                                                                job.employment_type,
                                                                language,
                                                            )}
                                                        </span>
                                                        <h3 className="careers-job-card__title">
                                                            {title}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {(location || job.application_deadline) && (
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
                                                                {language === 'en'
                                                                    ? 'Deadline: '
                                                                    : 'آخر موعد: '}
                                                                {formatJobDeadline(
                                                                    job.application_deadline,
                                                                    language,
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {excerpt && (
                                                    <p className="careers-job-card__excerpt">
                                                        {excerpt}
                                                    </p>
                                                )}

                                                <div className="careers-job-card__actions">
                                                    <Link
                                                        href={`/careers/${job.id}`}
                                                        className="btn-gold-outline"
                                                        data-cursor-hover
                                                    >
                                                        {language === 'en'
                                                            ? 'View Details'
                                                            : 'عرض التفاصيل'}
                                                    </Link>
                                                    <Link
                                                        href={`/careers/${job.id}/apply`}
                                                        className="btn-gold"
                                                        data-cursor-hover
                                                    >
                                                        {language === 'en' ? 'Apply Now' : 'قدّم الآن'}
                                                        <ArrowRight
                                                            className={`h-4 w-4 ${
                                                                direction === 'rtl'
                                                                    ? 'rotate-180'
                                                                    : ''
                                                            }`}
                                                        />
                                                    </Link>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </section>
                </WhenVisible>
            </Layout>
        </>
    );
}
