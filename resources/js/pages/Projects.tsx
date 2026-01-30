import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { MapPin, Users, Building2, ChevronRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/page-hero';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import WhenVisible from '@/components/ui/when-visible';
import { cn } from '@/lib/utils';

interface Project {
    id: number;
    title_en: string;
    title_ar: string;
    location_en: string;
    location_ar: string;
    workers?: string;
    category: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
    client?: { id: number; name: string; abbr: string };
    gallery_items?: unknown[];
}

interface HeroData {
    title_en?: string;
    title_ar?: string;
    subtitle_en?: string;
    subtitle_ar?: string;
    background_image?: string;
}

interface ProjectsProps {
    hero?: HeroData | null;
    projects?: Project[];
}

const DEFAULT_PROJECTS: Project[] = [
    { id: 1, title_en: 'NEOM Infrastructure Development', title_ar: 'تطوير البنية التحتية نيوم', location_en: 'Tabuk Region', location_ar: 'منطقة تبوك', workers: '2,500+', category: 'infrastructure', description_en: 'Comprehensive workforce supply for mega infrastructure project', description_ar: 'توريد شامل للقوى العاملة لمشروع البنية التحتية الضخم', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070' },
    { id: 2, title_en: 'Riyadh Metro Lines', title_ar: 'خطوط مترو الرياض', location_en: 'Riyadh', location_ar: 'الرياض', workers: '1,800+', category: 'infrastructure', description_en: 'Skilled technicians and laborers for metro construction', description_ar: 'فنيون وعمال مهرة لبناء المترو', image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=2070' },
];

export default function Projects({ hero, projects = [] }: ProjectsProps) {
    const { t, language } = useLanguage();
    const [activeFilter, setActiveFilter] = useState('all');
    const [isFiltering, setIsFiltering] = useState(false);

    const filters = [
        { id: 'all', label: t('projects.filter.all') },
        { id: 'construction', label: t('projects.filter.construction') },
        { id: 'infrastructure', label: t('projects.filter.infrastructure') },
        { id: 'commercial', label: t('projects.filter.commercial') },
        { id: 'industrial', label: t('projects.filter.industrial') },
    ];

    const displayProjects =
        projects.length > 0
            ? projects.map((p) => ({
                  ...p,
                  title: language === 'en' ? p.title_en : p.title_ar,
                  location: language === 'en' ? p.location_en : p.location_ar,
                  description: language === 'en' ? p.description_en : p.description_ar,
                  image: p.image
                      ? p.image.startsWith('http')
                          ? p.image
                          : p.image.startsWith('/')
                            ? p.image
                            : `/storage/${p.image}`
                      : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070',
                  client: p.client,
                  gallery_items: p.gallery_items,
              }))
            : DEFAULT_PROJECTS.map((p) => ({
                  ...p,
                  title: language === 'en' ? p.title_en : p.title_ar,
                  location: language === 'en' ? p.location_en : p.location_ar,
                  description: language === 'en' ? p.description_en : p.description_ar,
                  image: p.image ?? 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070',
              }));

    const filteredProjects = activeFilter === 'all' ? displayProjects : displayProjects.filter((p) => p.category === activeFilter);

    const handleFilterChange = (id: string) => {
        if (id === activeFilter) {
            return;
        }

        setIsFiltering(true);

        setTimeout(() => {
            setActiveFilter(id);
            setIsFiltering(false);
        }, 180);
    };

    return (
        <Layout>
            <PageHero
                hero={hero}
                fallbackTitle={t('projects.page.title')}
                fallbackSubtitle={t('projects.page.subtitle')}
                language={language}
            />

            {/* Filters */}
            <section className=" top-16 z-40 border-b border-border bg-background py-8 lg:top-20">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center gap-2">
                        {filters.map((filter) => (
                            <Button
                                key={filter.id}
                                variant={activeFilter === filter.id ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleFilterChange(filter.id)}
                                className={cn(activeFilter === filter.id && 'hero-gradient border-0')}
                            >
                                {filter.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <div
                        className={cn(
                            'grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500',
                            isFiltering ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0',
                        )}
                    >
                        {filteredProjects.map((project, index) => (
                            <WhenVisible
                                key={project.id ?? index}
                                options={{ threshold: 0.1 }}
                                style={{ transitionDelay: `${index * 40}ms` }}
                            >
                                <Link
                                    href={`/projects/${project.id}`}
                                    className="card-elevated overflow-hidden group block hover:shadow-xl transition-shadow"
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium capitalize text-primary-foreground">
                                            {filters.find((f) => f.id === project.category)?.label}
                                        </div>
                                        <div className="absolute right-4 bottom-4 flex items-center gap-1 text-primary-foreground text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            {language === 'en' ? 'View' : 'عرض'}
                                            <ChevronRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="mb-2 text-xl font-bold text-foreground">{project.title}</h3>
                                        {project.client && (
                                            <div className="mb-2 flex items-center gap-2 text-sm text-primary">
                                                <Building2 className="h-4 w-4 shrink-0" />
                                                <span>{project.client.name}</span>
                                            </div>
                                        )}
                                        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4 text-primary" />
                                                <span>{project.location}</span>
                                            </div>
                                            {project.workers && (
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4 text-primary" />
                                                    <span>
                                                        {project.workers} {language === 'en' ? 'Workers' : 'عامل'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </WhenVisible>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
