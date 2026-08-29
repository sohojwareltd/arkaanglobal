import React, { useEffect, useRef, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Briefcase, Calendar, MapPin, Upload } from 'lucide-react';

import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/page-hero';
import SectionHeader from '@/components/ui/section-header';
import WhenVisible from '@/components/ui/when-visible';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface JobPosting {
    id: number;
    title_en: string;
    title_ar: string;
    description_en?: string;
    description_ar?: string;
    location_en?: string;
    location_ar?: string;
    employment_type: string;
    application_deadline?: string | null;
}

interface HeroData {
    title_en?: string;
    title_ar?: string;
    subtitle_en?: string;
    subtitle_ar?: string;
    background_image?: string;
    meta_title_en?: string;
    meta_title_ar?: string;
    meta_description_en?: string;
    meta_description_ar?: string;
}

interface CareersProps {
    hero?: HeroData | null;
    jobs?: JobPosting[];
}

const EMPLOYMENT_LABELS: Record<string, { en: string; ar: string }> = {
    'full-time': { en: 'Full Time', ar: 'دوام كامل' },
    'part-time': { en: 'Part Time', ar: 'دوام جزئي' },
    contract: { en: 'Contract', ar: 'عقد' },
    temporary: { en: 'Temporary', ar: 'مؤقت' },
};

function formatDeadline(date: string, language: 'en' | 'ar'): string {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return date;
    }

    return parsed.toLocaleDateString(language === 'en' ? 'en-GB' : 'ar-SA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export default function Careers({ hero, jobs = [] }: CareersProps): JSX.Element {
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const formSectionRef = useRef<HTMLElement>(null);
    const [selectedJobId, setSelectedJobId] = useState<number | ''>(jobs[0]?.id ?? '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { flash } = usePage().props as { flash?: { success?: boolean } };

    useEffect(() => {
        if (flash?.success) {
            toast({
                title: language === 'en' ? 'Application Submitted' : 'تم إرسال الطلب',
                description: t('careers.form.success'),
            });
        }
    }, [flash?.success, language, t, toast]);

    const pageTitle =
        (language === 'en' ? hero?.meta_title_en : hero?.meta_title_ar) ??
        `${t('careers.title')} - Arkaan Construction Company`;

    const handleApplyClick = (jobId: number): void => {
        setSelectedJobId(jobId);
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!selectedJobId) {
            toast({
                title: language === 'en' ? 'Select a position' : 'اختر الوظيفة',
                description:
                    language === 'en'
                        ? 'Please choose a job opening before applying.'
                        : 'يرجى اختيار الوظيفة قبل التقديم.',
                variant: 'destructive',
            });

            return;
        }

        const formData = new FormData(event.currentTarget);
        formData.set('job_posting_id', String(selectedJobId));

        setIsSubmitting(true);

        router.post('/job-applications', formData, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setIsSubmitting(false),
            onSuccess: () => {
                event.currentTarget.reset();
                setSelectedJobId(jobs[0]?.id ?? '');
            },
        });
    };

    return (
        <>
            <Head title={pageTitle}>
                <meta
                    name="description"
                    content={
                        (language === 'en'
                            ? hero?.meta_description_en
                            : hero?.meta_description_ar) ??
                        'Explore career opportunities at Arkaan Construction Company and apply for open positions in Saudi Arabia.'
                    }
                />
            </Head>

            <Layout>
                <PageHero
                    hero={hero}
                    fallbackTitle={t('careers.title')}
                    fallbackSubtitle={t('careers.subtitle')}
                    language={language}
                />

                <section className="careers-intro">
                    <div className="careers-intro__inner">
                        <SectionHeader
                            tag={language === 'en' ? 'Careers' : 'الوظائف'}
                            title={
                                language === 'en' ? (
                                    <>
                                        Join Our <em>Team</em>
                                    </>
                                ) : (
                                    <>
                                        انضم إلى <em>فريقنا</em>
                                    </>
                                )
                            }
                            subtitle={
                                language === 'en'
                                    ? 'We are always looking for talented professionals and skilled workers to grow with us across the Kingdom.'
                                    : 'نبحث دائمًا عن المحترفين والعمال المهرة للانضمام إلينا في جميع أنحاء المملكة.'
                            }
                            centered={false}
                        />

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
                                        const employmentLabel =
                                            EMPLOYMENT_LABELS[job.employment_type]?.[
                                                language === 'en' ? 'en' : 'ar'
                                            ] ?? job.employment_type;

                                        return (
                                            <article
                                                key={job.id}
                                                className={`careers-job-card${
                                                    selectedJobId === job.id
                                                        ? ' careers-job-card--selected'
                                                        : ''
                                                }`}
                                            >
                                                <div className="careers-job-card__header">
                                                    <div>
                                                        <span className="careers-job-card__type">
                                                            {employmentLabel}
                                                        </span>
                                                        <h3 className="careers-job-card__title">
                                                            {title}
                                                        </h3>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="btn-gold-outline"
                                                        onClick={() => handleApplyClick(job.id)}
                                                        data-cursor-hover
                                                    >
                                                        {language === 'en' ? 'Apply' : 'تقديم'}
                                                    </Button>
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
                                                                {formatDeadline(
                                                                    job.application_deadline,
                                                                    language,
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {description && (
                                                    <div
                                                        className="careers-job-card__description"
                                                        dangerouslySetInnerHTML={{
                                                            __html: description,
                                                        }}
                                                    />
                                                )}
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </section>
                </WhenVisible>

                {jobs.length > 0 && (
                    <WhenVisible>
                        <section className="careers-form-section" ref={formSectionRef}>
                            <div className="careers-form-section__inner">
                                <SectionHeader
                                    tag={language === 'en' ? 'Apply Now' : 'قدّم الآن'}
                                    title={
                                        language === 'en' ? (
                                            <>
                                                Submit Your <em>Application</em>
                                            </>
                                        ) : (
                                            <>
                                                أرسل <em>طلبك</em>
                                            </>
                                        )
                                    }
                                    subtitle={
                                        language === 'en'
                                            ? 'Upload your CV and we will review your application. Only PDF, DOC, and DOCX files up to 5 MB are accepted.'
                                            : 'ارفع سيرتك الذاتية وسنراجع طلبك. يُقبل فقط ملفات PDF و DOC و DOCX حتى 5 ميجابايت.'
                                    }
                                    centered={false}
                                />

                                <form
                                    ref={formRef}
                                    className="careers-form"
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
                                    noValidate
                                >
                                    <input
                                        type="text"
                                        name="website"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        className="careers-form__honeypot"
                                        aria-hidden="true"
                                    />

                                    <div className="careers-form__field">
                                        <Label htmlFor="job_posting_id">
                                            {language === 'en' ? 'Position' : 'الوظيفة'}
                                        </Label>
                                        <select
                                            id="job_posting_id"
                                            name="job_posting_id"
                                            className="careers-form__select"
                                            value={selectedJobId}
                                            onChange={(event) =>
                                                setSelectedJobId(
                                                    event.target.value
                                                        ? Number(event.target.value)
                                                        : '',
                                                )
                                            }
                                            required
                                        >
                                            <option value="">
                                                {language === 'en'
                                                    ? 'Select a position'
                                                    : 'اختر الوظيفة'}
                                            </option>
                                            {jobs.map((job) => (
                                                <option key={job.id} value={job.id}>
                                                    {language === 'en'
                                                        ? job.title_en
                                                        : job.title_ar}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="careers-form__grid">
                                        <div className="careers-form__field">
                                            <Label htmlFor="name">{t('careers.form.name')}</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                maxLength={255}
                                                autoComplete="name"
                                            />
                                        </div>

                                        <div className="careers-form__field">
                                            <Label htmlFor="email">{t('careers.form.email')}</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                maxLength={255}
                                                autoComplete="email"
                                            />
                                        </div>
                                    </div>

                                    <div className="careers-form__field">
                                        <Label htmlFor="cv">{t('careers.form.cv')}</Label>
                                        <div className="careers-form__file">
                                            <Upload className="h-5 w-5 text-primary" />
                                            <Input
                                                id="cv"
                                                name="cv"
                                                type="file"
                                                required
                                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                            />
                                        </div>
                                        <p className="careers-form__hint">
                                            {language === 'en'
                                                ? 'PDF, DOC, or DOCX — maximum 5 MB'
                                                : 'PDF أو DOC أو DOCX — بحد أقصى 5 ميجابايت'}
                                        </p>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="btn-gold"
                                        disabled={isSubmitting}
                                        data-cursor-hover
                                    >
                                        {isSubmitting
                                            ? language === 'en'
                                                ? 'Submitting...'
                                                : 'جاري الإرسال...'
                                            : t('careers.form.submit')}
                                    </Button>
                                </form>
                            </div>
                        </section>
                    </WhenVisible>
                )}
            </Layout>
        </>
    );
}
