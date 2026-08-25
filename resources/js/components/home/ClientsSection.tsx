import React from 'react';
import { Link } from '@inertiajs/react';
import { Building2, Landmark, Briefcase, Factory, LucideIcon } from 'lucide-react';

import { useLanguage } from '@/contexts/LanguageContext';

const iconMap: Record<string, LucideIcon> = {
    building: Building2,
    landmark: Landmark,
    briefcase: Briefcase,
    factory: Factory,
};

interface ClientCategoryItem {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    icon?: string;
}

interface ClientsSectionProps {
    clientCategories?: ClientCategoryItem[];
}

export default function ClientsSection({ clientCategories: categories = [] }: ClientsSectionProps): JSX.Element {
    const { t, language } = useLanguage();

    return (
        <section className="section-padding bg-muted/30">
            <div className="container-custom">
                {/* Header */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="eyebrow">
                        {t('clients.title')}
                    </span>
                    <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                        {t('clients.subtitle')}
                    </h2>
                </div>

                {/* Sector Categories */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => {
                        const Icon = iconMap[category.icon || ''] || Building2;
                        return (
                            <Link
                                key={category.id}
                                href="/clients"
                                className="card-elevated flex flex-col items-center gap-3 p-6 text-center hover:border-primary/50"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm hero-gradient border-b-2 border-accent">
                                    <Icon className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div className="text-sm font-semibold text-foreground">
                                    {language === 'en' ? category.name_en : category.name_ar}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Trust Text */}
                <p className="mt-8 text-center text-muted-foreground">
                    {language === 'en'
                        ? 'Serving government, semi-government, industrial, and private sector clients across the Kingdom of Saudi Arabia'
                        : 'نخدم عملاء القطاعات الحكومية وشبه الحكومية والصناعية والخاصة في جميع أنحاء المملكة العربية السعودية'}
                </p>
            </div>
        </section>
    );
}
