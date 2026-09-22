import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';

import FileUploadTile from '@/components/careers/FileUploadTile';
import LanguageLevelSlider from '@/components/careers/LanguageLevelSlider';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import {
    EMPLOYMENT_PREFERENCES,
    MOBILITY_REGIONS,
    TECHNICAL_SKILL_OPTIONS,
    employmentLabel,
    formatJobDeadline,
    type JobPosting,
} from '@/lib/careers-utils';

interface CareerApplyProps {
    job: JobPosting;
}

function FormSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}): JSX.Element {
    return (
        <div className="intl-app-card">
            <div className="intl-app-card__title">{title}</div>
            <div className="intl-app-card__body">{children}</div>
        </div>
    );
}

export default function CareerApply({ job }: CareerApplyProps): JSX.Element {
    const { language, direction } = useLanguage();
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [formKey, setFormKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mobility, setMobility] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [declaration, setDeclaration] = useState(false);

    const { flash } = usePage().props as {
        flash?: { success?: boolean; application_number?: string };
    };

    const defaultPosition = job.title_en;
    const jobTitle = language === 'en' ? job.title_en : job.title_ar;
    const jobLocation = language === 'en' ? job.location_en : job.location_ar;

    useEffect(() => {
        if (flash?.success) {
            toast({
                title: 'Application Submitted',
                description: flash.application_number
                    ? `Your application number is ${flash.application_number}.`
                    : 'We have received your application.',
            });
        }
    }, [flash?.success, flash?.application_number, toast]);

    useEffect(() => {
        return () => {
            if (photoPreview) {
                URL.revokeObjectURL(photoPreview);
            }
        };
    }, [photoPreview]);

    const toggleInList = (value: string, list: string[], setter: (next: string[]) => void): void => {
        if (list.includes(value)) {
            setter(list.filter((item) => item !== value));

            return;
        }

        setter([...list, value]);
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];

        if (photoPreview) {
            URL.revokeObjectURL(photoPreview);
        }

        if (!file) {
            setPhotoPreview(null);

            return;
        }

        setPhotoPreview(URL.createObjectURL(file));
    };

    const clearForm = (): void => {
        formRef.current?.reset();
        setMobility([]);
        setSkills([]);
        setDeclaration(false);

        if (photoPreview) {
            URL.revokeObjectURL(photoPreview);
        }

        setPhotoPreview(null);
        setFormKey((key) => key + 1);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!declaration) {
            toast({
                title: 'Declaration required',
                description: 'Please accept the applicant declaration before submitting.',
                variant: 'destructive',
            });

            return;
        }

        const formData = new FormData(event.currentTarget);
        formData.set('job_posting_id', String(job.id));
        formData.set('declaration', '1');

        mobility.forEach((region) => formData.append('mobility[]', region));
        skills.forEach((skill) => formData.append('skills[]', skill));

        setIsSubmitting(true);

        router.post('/job-applications', formData, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setIsSubmitting(false),
            onSuccess: () => {
                clearForm();
            },
        });
    };

    const pageTitle = useMemo(
        () => `International Job Application — ${defaultPosition}`,
        [defaultPosition],
    );

    return (
        <>
            <Head title={pageTitle} />

            <Layout>
                <section className="intl-app-hero intl-app-hero--minimal">
                    <div className="intl-app-hero__inner intl-app-hero__inner--minimal">
                        <Link
                            href={`/careers/${job.id}`}
                            className="career-detail__back"
                            data-cursor-hover
                        >
                            <ArrowLeft
                                className={`h-4 w-4 ${direction === 'rtl' ? 'rotate-180' : ''}`}
                            />
                            Back to Job Details
                        </Link>

                        <div className="intl-app-hero__job">
                            <span className="intl-app-hero__type">
                                {employmentLabel(job.employment_type, language)}
                            </span>
                            <h1 className="intl-app-hero__job-title">{jobTitle}</h1>
                            <ul className="intl-app-hero__meta">
                                {jobLocation && (
                                    <li>
                                        <MapPin className="h-4 w-4" aria-hidden />
                                        {jobLocation}
                                    </li>
                                )}
                                {job.application_deadline && (
                                    <li>
                                        <Calendar className="h-4 w-4" aria-hidden />
                                        {language === 'en' ? 'Apply by ' : 'آخر موعد '}
                                        {formatJobDeadline(job.application_deadline, language)}
                                    </li>
                                )}
                                <li>International job application</li>
                            </ul>
                            <p className="intl-app-hero__hint">Required fields are marked *</p>
                        </div>
                    </div>
                </section>

                <div className="intl-app-container">
                    {flash?.success && flash.application_number && (
                        <div className="intl-app-success" role="status">
                            <strong>Application submitted successfully.</strong>
                            <p>
                                Your application number is{' '}
                                <span className="intl-app-success__number">{flash.application_number}</span>.
                                Please save this reference for future correspondence.
                            </p>
                        </div>
                    )}

                    <form
                        key={formKey}
                        ref={formRef}
                        className="intl-app-form"
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

                        <FormSection title="1. Personal Information">
                            <div className="intl-app-grid">
                                <div>
                                    <Label htmlFor="full_name">
                                        Full Name <span className="intl-app-required">*</span>
                                    </Label>
                                    <Input id="full_name" name="full_name" required maxLength={255} />
                                </div>
                                <div>
                                    <Label htmlFor="dob">
                                        Date of Birth <span className="intl-app-required">*</span>
                                    </Label>
                                    <Input id="dob" name="dob" type="date" required />
                                </div>
                                <div>
                                    <Label htmlFor="nationality">
                                        Nationality <span className="intl-app-required">*</span>
                                    </Label>
                                    <Input id="nationality" name="nationality" required maxLength={255} />
                                </div>
                                <div>
                                    <Label htmlFor="gender">
                                        Gender <span className="intl-app-required">*</span>
                                    </Label>
                                    <select id="gender" name="gender" className="intl-app-select" required defaultValue="">
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="mobile">
                                        Mobile / WhatsApp <span className="intl-app-required">*</span>
                                    </Label>
                                    <Input id="mobile" name="mobile" type="tel" required maxLength={50} />
                                </div>
                                <div>
                                    <Label htmlFor="email">
                                        Email Address <span className="intl-app-required">*</span>
                                    </Label>
                                    <Input id="email" name="email" type="email" required maxLength={255} />
                                </div>
                                <div>
                                    <Label htmlFor="country">Current Country</Label>
                                    <Input id="country" name="country" maxLength={255} />
                                </div>
                                <div>
                                    <Label htmlFor="city">Current City</Label>
                                    <Input id="city" name="city" maxLength={255} />
                                </div>
                                <div className="intl-app-full">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" name="address" maxLength={1000} />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="2. Position & Job Preferences">
                            <div className="intl-app-grid">
                                <div>
                                    <Label htmlFor="position">
                                        Position / Trade Applied For <span className="intl-app-required">*</span>
                                    </Label>
                                    <Input
                                        id="position"
                                        name="position"
                                        defaultValue={defaultPosition}
                                        required
                                        maxLength={255}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="experience">
                                        Years of Relevant Experience <span className="intl-app-required">*</span>
                                    </Label>
                                    <Input
                                        id="experience"
                                        name="experience"
                                        type="number"
                                        min={0}
                                        max={80}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="salary">Expected Basic Salary (SAR)</Label>
                                    <Input id="salary" name="salary" type="number" min={0} step="0.01" />
                                </div>
                                <div>
                                    <Label htmlFor="availability">Availability / Notice Period</Label>
                                    <Input
                                        id="availability"
                                        name="availability"
                                        placeholder="e.g. Immediately / 30 days"
                                        maxLength={255}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="location">Preferred Work Location</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        placeholder="Saudi Arabia / GCC / Worldwide"
                                        maxLength={255}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="employment">Employment Preference</Label>
                                    <select
                                        id="employment"
                                        name="employment"
                                        className="intl-app-select"
                                        defaultValue="Any"
                                    >
                                        {EMPLOYMENT_PREFERENCES.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="3. Passport & Mobility">
                            <div className="intl-app-grid">
                                <div>
                                    <Label htmlFor="passport">Passport Number</Label>
                                    <Input id="passport" name="passport" maxLength={100} />
                                </div>
                                <div>
                                    <Label htmlFor="passport_expiry">Passport Expiry Date</Label>
                                    <Input id="passport_expiry" name="passport_expiry" type="date" />
                                </div>
                                <div>
                                    <Label htmlFor="visa_status">Current Visa / Residency Status</Label>
                                    <Input
                                        id="visa_status"
                                        name="visa_status"
                                        placeholder="e.g. Iqama, Visit Visa, Outside KSA"
                                        maxLength={255}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="join_date">Available to Join</Label>
                                    <Input id="join_date" name="join_date" type="date" />
                                </div>
                            </div>
                            <div className="intl-app-checks">
                                {MOBILITY_REGIONS.map((region) => (
                                    <label key={region} className="intl-app-check">
                                        <input
                                            type="checkbox"
                                            checked={mobility.includes(region)}
                                            onChange={() => toggleInList(region, mobility, setMobility)}
                                        />
                                        {region}
                                    </label>
                                ))}
                            </div>
                        </FormSection>

                        <FormSection title="4. Education & Qualifications">
                            <div className="intl-app-grid">
                                <div>
                                    <Label htmlFor="qualification">Highest Qualification</Label>
                                    <Input id="qualification" name="qualification" maxLength={255} />
                                </div>
                                <div>
                                    <Label htmlFor="major">Field / Major</Label>
                                    <Input id="major" name="major" maxLength={255} />
                                </div>
                                <div>
                                    <Label htmlFor="institution">Institution</Label>
                                    <Input id="institution" name="institution" maxLength={255} />
                                </div>
                                <div>
                                    <Label htmlFor="year">Year Completed</Label>
                                    <Input id="year" name="year" type="number" min={1950} max={new Date().getFullYear() + 1} />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="5. Employment & Project Experience">
                            <div className="intl-app-stack">
                                <div>
                                    <Label htmlFor="employer">Most Recent Employer / Company</Label>
                                    <Input id="employer" name="employer" maxLength={255} />
                                </div>
                                <div className="intl-app-grid">
                                    <div>
                                        <Label htmlFor="employer_country">Country</Label>
                                        <Input id="employer_country" name="employer_country" maxLength={255} />
                                    </div>
                                    <div>
                                        <Label htmlFor="employer_position">Position / Trade</Label>
                                        <Input id="employer_position" name="employer_position" maxLength={255} />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="employment_history">Employment History</Label>
                                    <textarea
                                        id="employment_history"
                                        name="employment_history"
                                        className="intl-app-textarea"
                                        rows={5}
                                        placeholder="Company, project/client, position, country, dates and key responsibilities..."
                                    />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="6. Technical Skills & Certifications">
                            <div className="intl-app-checks intl-app-checks--skills">
                                {TECHNICAL_SKILL_OPTIONS.map((skill) => (
                                    <label key={skill} className="intl-app-check">
                                        <input
                                            type="checkbox"
                                            checked={skills.includes(skill)}
                                            onChange={() => toggleInList(skill, skills, setSkills)}
                                        />
                                        {skill === 'HVAC' ? 'HVAC / Refrigeration' : skill === 'Finishing' ? 'Finishing / Tiles / Masonry' : skill === 'QA/QC' ? 'QA/QC / Inspection' : skill === 'HSE' ? 'HSE / Safety' : skill === 'Document Control' ? 'Document Control / Admin' : skill}
                                    </label>
                                ))}
                            </div>
                            <div className="intl-app-stack intl-app-stack--spaced">
                                <div>
                                    <Label htmlFor="other_skills">Other Skills / Equipment / Software</Label>
                                    <textarea id="other_skills" name="other_skills" className="intl-app-textarea" rows={3} />
                                </div>
                                <div>
                                    <Label htmlFor="certifications">Professional / Safety Certifications</Label>
                                    <textarea
                                        id="certifications"
                                        name="certifications"
                                        className="intl-app-textarea"
                                        rows={3}
                                        placeholder="e.g. Aramco approval, NEBOSH, IOSH, OSHA, trade certificate, driving license..."
                                    />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="7. Language Proficiency">
                            <div className="intl-app-lang-stack">
                                {(
                                    [
                                        ['english', 'English'],
                                        ['arabic', 'Arabic'],
                                        ['hindi', 'Hindi / Urdu'],
                                        ['bengali', 'Bengali'],
                                    ] as const
                                ).map(([name, label]) => (
                                    <LanguageLevelSlider
                                        key={`${name}-${formKey}`}
                                        name={name}
                                        label={label}
                                        resetKey={formKey}
                                    />
                                ))}
                                <div className="intl-app-grid intl-app-grid--other-lang">
                                    <div className="intl-app-field">
                                        <Label htmlFor="other_language">Other Language</Label>
                                        <Input id="other_language" name="other_language" maxLength={100} />
                                    </div>
                                    <LanguageLevelSlider
                                        key={`other_language_level-${formKey}`}
                                        name="other_language_level"
                                        label="Other Language Level"
                                        resetKey={formKey}
                                    />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="8. Upload Your Documents">
                            <div className="intl-app-upload-stack">
                                <div className="intl-app-field intl-app-field--photo">
                                    {photoPreview && (
                                        <img
                                            src={photoPreview}
                                            alt="Photo preview"
                                            className="intl-app-photo__preview"
                                        />
                                    )}
                                    <FileUploadTile
                                        key={`photo-${formKey}`}
                                        id="photo"
                                        name="photo"
                                        label="Passport-Size Photo (JPG/PNG)"
                                        accept="image/jpeg,image/png,image/jpg"
                                        emptyTitle="Upload passport-size photo"
                                        formatHint="JPG or PNG — max 5 MB"
                                        help="Optional"
                                        resetKey={formKey}
                                        onChange={handlePhotoChange}
                                    />
                                </div>
                                <FileUploadTile
                                    key={`cv-${formKey}`}
                                    id="cv"
                                    name="cv"
                                    label={
                                        <>
                                            CV / Resume <span className="intl-app-required">*</span>
                                        </>
                                    }
                                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    required
                                    emptyTitle="Upload CV / resume"
                                    formatHint="PDF, DOC, or DOCX — max 5 MB"
                                    resetKey={formKey}
                                />
                                <FileUploadTile
                                    key={`cert-${formKey}`}
                                    id="cert_files"
                                    name="cert_files[]"
                                    label="Certificates & Supporting Documents"
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,application/pdf,image/jpeg,image/png"
                                    multiple
                                    emptyTitle="Upload certificates or supporting files"
                                    formatHint="Up to 5 files — max 5 MB each"
                                    help="Optional"
                                    resetKey={formKey}
                                />
                            </div>
                        </FormSection>

                        <FormSection title="9. Applicant Declaration">
                            <div className="intl-app-notice">
                                I confirm that the information provided is true and accurate to the best of my
                                knowledge. I understand that submission of this application does not guarantee
                                employment and that selection is subject to document verification, client/project
                                requirements, interviews, trade tests, medical fitness and applicable laws.
                            </div>
                            <label className="intl-app-check intl-app-check--declaration">
                                <input
                                    type="checkbox"
                                    name="declaration"
                                    checked={declaration}
                                    onChange={(event) => setDeclaration(event.target.checked)}
                                    value="1"
                                />
                                I agree to the applicant declaration. <span className="intl-app-required">*</span>
                            </label>
                        </FormSection>

                        <div className="intl-app-card">
                            <div className="intl-app-card__body">
                                <div className="intl-app-actions">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="intl-app-btn-secondary"
                                        onClick={clearForm}
                                        disabled={isSubmitting}
                                    >
                                        Clear Form
                                    </Button>
                                    <Button type="submit" className="btn-gold" disabled={isSubmitting} data-cursor-hover>
                                        {isSubmitting ? 'Submitting...' : 'Submit Job Application'}
                                    </Button>
                                </div>
                                <p className="intl-app-help intl-app-help--right">
                                    Application No. will be generated automatically after submission.
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    );
}
