import React, { useEffect, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash2, Upload } from 'lucide-react';

import Layout from '@/components/layout/Layout';
import SectionHeader from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import {
    ATTACHMENT_LABEL_OPTIONS,
    attachmentLabelText,
    type JobPosting,
} from '@/lib/careers-utils';

interface CareerApplyProps {
    job: JobPosting;
}

interface ExtraDocument {
    id: number;
    label: string;
    file: File | null;
}

let documentIdCounter = 0;

function createDocumentRow(): ExtraDocument {
    documentIdCounter += 1;

    return {
        id: documentIdCounter,
        label: 'passport',
        file: null,
    };
}

export default function CareerApply({ job }: CareerApplyProps): JSX.Element {
    const { t, language, direction } = useLanguage();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [extraDocuments, setExtraDocuments] = useState<ExtraDocument[]>([]);
    const { flash } = usePage().props as { flash?: { success?: boolean } };

    const title = language === 'en' ? job.title_en : job.title_ar;

    useEffect(() => {
        if (flash?.success) {
            toast({
                title: language === 'en' ? 'Application Submitted' : 'تم إرسال الطلب',
                description: t('careers.form.success'),
            });
        }
    }, [flash?.success, language, t, toast]);

    const addDocumentRow = (): void => {
        if (extraDocuments.length >= 5) {
            return;
        }

        setExtraDocuments((rows) => [...rows, createDocumentRow()]);
    };

    const removeDocumentRow = (id: number): void => {
        setExtraDocuments((rows) => rows.filter((row) => row.id !== id));
    };

    const updateDocumentLabel = (id: number, label: string): void => {
        setExtraDocuments((rows) =>
            rows.map((row) => (row.id === id ? { ...row, label } : row)),
        );
    };

    const updateDocumentFile = (id: number, file: File | null): void => {
        setExtraDocuments((rows) =>
            rows.map((row) => (row.id === id ? { ...row, file } : row)),
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        formData.set('job_posting_id', String(job.id));

        extraDocuments.forEach((document, index) => {
            if (document.file) {
                formData.append(`attachments[${index}]`, document.file);
                formData.append(
                    `attachment_labels[${index}]`,
                    attachmentLabelText(document.label, language),
                );
            }
        });

        setIsSubmitting(true);

        router.post('/job-applications', formData, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setIsSubmitting(false),
            onSuccess: () => {
                event.currentTarget.reset();
                setExtraDocuments([]);
            },
        });
    };

    const pageTitle =
        language === 'en'
            ? `Apply — ${title} - Arkaan Construction Company`
            : `التقديم — ${title} - شركة أركان للمقاولات`;

    return (
        <>
            <Head title={pageTitle} />

            <Layout>
                <section className="careers-form-section">
                    <div className="careers-form-section__inner">
                        <Link
                            href={`/careers/${job.id}`}
                            className="career-detail__back"
                            data-cursor-hover
                        >
                            <ArrowLeft
                                className={`h-4 w-4 ${direction === 'rtl' ? 'rotate-180' : ''}`}
                            />
                            {language === 'en' ? 'Back to Job Details' : 'العودة إلى تفاصيل الوظيفة'}
                        </Link>

                        <SectionHeader
                            tag={language === 'en' ? 'Apply Now' : 'قدّم الآن'}
                            title={
                                language === 'en' ? (
                                    <>
                                        Apply for <em>{title}</em>
                                    </>
                                ) : (
                                    <>
                                        التقديم على <em>{title}</em>
                                    </>
                                )
                            }
                            subtitle={
                                language === 'en'
                                    ? 'Submit your CV and any supporting documents. PDF, DOC, DOCX, JPG, and PNG files up to 5 MB each are accepted.'
                                    : 'قدّم سيرتك الذاتية وأي مستندات داعمة. يُقبل PDF و DOC و DOCX و JPG و PNG بحد أقصى 5 ميجابايت لكل ملف.'
                            }
                            centered={false}
                        />

                        <form
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

                            <input type="hidden" name="job_posting_id" value={job.id} />

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
                                        ? 'Required — PDF, DOC, or DOCX (max 5 MB)'
                                        : 'مطلوب — PDF أو DOC أو DOCX (بحد أقصى 5 ميجابايت)'}
                                </p>
                            </div>

                            <div className="careers-form__attachments">
                                <div className="careers-form__attachments-header">
                                    <div>
                                        <h3 className="careers-form__attachments-title">
                                            {language === 'en'
                                                ? 'Additional Documents'
                                                : 'مستندات إضافية'}
                                        </h3>
                                        <p className="careers-form__hint">
                                            {language === 'en'
                                                ? 'Optional — passport copy, certificates, licenses, etc. (up to 5 files)'
                                                : 'اختياري — نسخة جواز السفر، الشهادات، الرخص، إلخ (حتى 5 ملفات)'}
                                        </p>
                                    </div>
                                    {extraDocuments.length < 5 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="btn-gold-outline"
                                            onClick={addDocumentRow}
                                            data-cursor-hover
                                        >
                                            <Plus className="h-4 w-4" />
                                            {language === 'en' ? 'Add Document' : 'إضافة مستند'}
                                        </Button>
                                    )}
                                </div>

                                {extraDocuments.length > 0 && (
                                    <div className="careers-form__attachment-list">
                                        {extraDocuments.map((document) => (
                                            <div
                                                key={document.id}
                                                className="careers-form__attachment-row"
                                            >
                                                <div className="careers-form__field">
                                                    <Label
                                                        htmlFor={`attachment-label-${document.id}`}
                                                    >
                                                        {language === 'en'
                                                            ? 'Document Type'
                                                            : 'نوع المستند'}
                                                    </Label>
                                                    <select
                                                        id={`attachment-label-${document.id}`}
                                                        className="careers-form__select"
                                                        value={document.label}
                                                        onChange={(event) =>
                                                            updateDocumentLabel(
                                                                document.id,
                                                                event.target.value,
                                                            )
                                                        }
                                                    >
                                                        {ATTACHMENT_LABEL_OPTIONS.map((option) => (
                                                            <option
                                                                key={option.value}
                                                                value={option.value}
                                                            >
                                                                {language === 'en'
                                                                    ? option.en
                                                                    : option.ar}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="careers-form__field careers-form__attachment-file">
                                                    <Label
                                                        htmlFor={`attachment-file-${document.id}`}
                                                    >
                                                        {language === 'en' ? 'File' : 'الملف'}
                                                    </Label>
                                                    <div className="careers-form__file">
                                                        <Upload className="h-5 w-5 text-primary" />
                                                        <Input
                                                            id={`attachment-file-${document.id}`}
                                                            type="file"
                                                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,application/pdf,image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                            onChange={(event) =>
                                                                updateDocumentFile(
                                                                    document.id,
                                                                    event.target.files?.[0] ?? null,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="careers-form__attachment-remove"
                                                    onClick={() => removeDocumentRow(document.id)}
                                                    aria-label={
                                                        language === 'en'
                                                            ? 'Remove document'
                                                            : 'إزالة المستند'
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
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
            </Layout>
        </>
    );
}
