export type ProjectStatus = 'ongoing' | 'finished';

export function resolveProjectStatus(endDate?: string | null): ProjectStatus {
    return endDate ? 'finished' : 'ongoing';
}

export function projectStatusLabel(status: ProjectStatus, language: 'en' | 'ar'): string {
    if (status === 'finished') {
        return language === 'en' ? 'Finished' : 'مكتمل';
    }

    return language === 'en' ? 'Ongoing' : 'جاري';
}

export function formatProjectDate(date: string, language: 'en' | 'ar'): string {
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
