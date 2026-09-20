export interface JobPosting {
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

export const EMPLOYMENT_LABELS: Record<string, { en: string; ar: string }> = {
    'full-time': { en: 'Full Time', ar: 'دوام كامل' },
    'part-time': { en: 'Part Time', ar: 'دوام جزئي' },
    contract: { en: 'Contract', ar: 'عقد' },
    temporary: { en: 'Temporary', ar: 'مؤقت' },
};

export const ATTACHMENT_LABEL_OPTIONS: { value: string; en: string; ar: string }[] = [
    { value: 'passport', en: 'Passport Copy', ar: 'نسخة جواز السفر' },
    { value: 'certificate', en: 'Certificate', ar: 'شهادة' },
    { value: 'license', en: 'Professional License', ar: 'رخصة مهنية' },
    { value: 'experience', en: 'Experience Letter', ar: 'خطاب خبرة' },
    { value: 'other', en: 'Other Document', ar: 'مستند آخر' },
];

export function employmentLabel(type: string, language: 'en' | 'ar'): string {
    return EMPLOYMENT_LABELS[type]?.[language === 'en' ? 'en' : 'ar'] ?? type;
}

export function formatJobDeadline(date: string, language: 'en' | 'ar'): string {
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

export function jobExcerpt(html: string | undefined, maxLength = 180): string {
    if (!html) {
        return '';
    }

    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength).trim()}…`;
}

export function attachmentLabelText(value: string, language: 'en' | 'ar'): string {
    const match = ATTACHMENT_LABEL_OPTIONS.find((option) => option.value === value);

    if (match) {
        return language === 'en' ? match.en : match.ar;
    }

    return value;
}

export const MOBILITY_REGIONS = [
    'Saudi Arabia',
    'GCC',
    'Middle East',
    'Asia',
    'Europe',
    'Worldwide',
] as const;

export const TECHNICAL_SKILL_OPTIONS = [
    'Civil / Structural',
    'Electrical / MEP',
    'Mechanical / Piping',
    'Welding / Fabrication',
    'Scaffolding / Rigging',
    'Heavy Equipment',
    'HVAC',
    'Finishing',
    'QA/QC',
    'HSE',
    'Document Control',
    'Other',
] as const;

export const LANGUAGE_LEVELS = ['Basic', 'Intermediate', 'Good', 'Fluent', 'Native'] as const;

export const EMPLOYMENT_PREFERENCES = [
    'Any',
    'Permanent',
    'Contract',
    'Project Based',
    'Temporary',
] as const;
