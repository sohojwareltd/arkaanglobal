import React from 'react';
import { Link } from '@inertiajs/react';
import { MapPin, Users, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProjectsSection(): JSX.Element {
    const { t, direction, language } = useLanguage();

    const projects = [
        {
            image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070',
            title: language === 'en' ? 'NEOM Infrastructure' : 'البنية التحتية نيوم',
            location: language === 'en' ? 'Tabuk Region' : 'منطقة تبوك',
            workers: '2,500+',
            category: language === 'en' ? 'Infrastructure' : 'البنية التحتية',
        },
        {
            image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=2070',
            title: language === 'en' ? 'Riyadh Metro' : 'مترو الرياض',
            location: language === 'en' ? 'Riyadh' : 'الرياض',
            workers: '1,800+',
            category: language === 'en' ? 'Transportation' : 'النقل',
        },
        {
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070',
            title:
                language === 'en'
                    ? 'King Abdullah Financial District'
                    : 'مركز الملك عبدالله المالي',
            location: language === 'en' ? 'Riyadh' : 'الرياض',
            workers: '3,200+',
            category: language === 'en' ? 'Commercial' : 'تجاري',
        },
    ];

    return (
        <section className="section-padding">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                            {t('projects.title')}
                        </span>
                        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                            {t('projects.subtitle')}
                        </h2>
                    </div>
                    <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        asChild
                    >
                        <Link href="/projects" className="flex items-center gap-2">
                            {t('projects.viewAll')}
                            <ArrowRight
                                className={`h-4 w-4 ${direction === 'rtl' ? 'rotate-180' : ''}`}
                            />
                        </Link>
                    </Button>
                </div>

                {/* Projects Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Link
                            key={project.title}
                            href="/projects"
                            className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                            {/* Category Badge */}
                            <div className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
                                {project.category}
                            </div>

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-6">
                                <h3 className="mb-2 text-xl font-bold text-primary-foreground">
                                    {project.title}
                                </h3>
                                <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/80">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{project.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        <span>
                                            {project.workers}{' '}
                                            {language === 'en' ? 'Workers' : 'عامل'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

