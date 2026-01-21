import React, { useState } from 'react';
import { MapPin, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import WhenVisible from '@/components/ui/when-visible';
import { cn } from '@/lib/utils';

export default function Projects() {
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

    const projects = [
        {
            image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070',
            title: language === 'en' ? 'NEOM Infrastructure Development' : 'تطوير البنية التحتية نيوم',
            location: language === 'en' ? 'Tabuk Region' : 'منطقة تبوك',
            workers: '2,500+',
            category: 'infrastructure',
            description:
                language === 'en'
                    ? 'Comprehensive workforce supply for mega infrastructure project'
                    : 'توريد شامل للقوى العاملة لمشروع البنية التحتية الضخم',
        },
        {
            image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=2070',
            title: language === 'en' ? 'Riyadh Metro Lines' : 'خطوط مترو الرياض',
            location: language === 'en' ? 'Riyadh' : 'الرياض',
            workers: '1,800+',
            category: 'infrastructure',
            description: language === 'en' ? 'Skilled technicians and laborers for metro construction' : 'فنيون وعمال مهرة لبناء المترو',
        },
        {
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070',
            title: language === 'en' ? 'King Abdullah Financial District' : 'مركز الملك عبدالله المالي',
            location: language === 'en' ? 'Riyadh' : 'الرياض',
            workers: '3,200+',
            category: 'commercial',
            description: language === 'en' ? 'Full workforce solutions for commercial complex' : 'حلول كاملة للقوى العاملة للمجمع التجاري',
        },
        {
            image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2070',
            title: language === 'en' ? 'Jubail Industrial City Expansion' : 'توسعة مدينة الجبيل الصناعية',
            location: language === 'en' ? 'Jubail' : 'الجبيل',
            workers: '1,500+',
            category: 'industrial',
            description: language === 'en' ? 'Industrial construction workforce deployment' : 'نشر القوى العاملة للبناء الصناعي',
        },
        {
            image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2070',
            title: language === 'en' ? 'Jeddah Tower' : 'برج جدة',
            location: language === 'en' ? 'Jeddah' : 'جدة',
            workers: '2,800+',
            category: 'construction',
            description: language === 'en' ? 'High-rise construction workforce management' : 'إدارة القوى العاملة لبناء الأبراج الشاهقة',
        },
        {
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070',
            title: language === 'en' ? 'Red Sea Project' : 'مشروع البحر الأحمر',
            location: language === 'en' ? 'Red Sea Coast' : 'ساحل البحر الأحمر',
            workers: '4,000+',
            category: 'construction',
            description:
                language === 'en' ? 'Massive workforce supply for tourism megaproject' : 'توريد ضخم للقوى العاملة لمشروع السياحة الضخم',
        },
    ];

    const filteredProjects = activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

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
            {/* Hero */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                <div className="absolute inset-0 hero-gradient opacity-10" />
                <div className="container-custom relative">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                            {t('projects.page.title')}
                        </h1>
                        <p className="text-xl text-muted-foreground">{t('projects.page.subtitle')}</p>
                    </div>
                </div>
            </section>

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
                                key={index}
                                className="card-elevated overflow-hidden group"
                                options={{ threshold: 0.1 }}
                                style={{ transitionDelay: `${index * 40}ms` }}
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
                                </div>
                                <div className="p-6">
                                    <h3 className="mb-2 text-xl font-bold text-foreground">{project.title}</h3>
                                    <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4 text-primary" />
                                            <span>{project.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4 text-primary" />
                                            <span>
                                                {project.workers} {language === 'en' ? 'Workers' : 'عامل'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </WhenVisible>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
