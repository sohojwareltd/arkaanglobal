import React from 'react';
import { Link } from '@inertiajs/react';
import { MapPin, Users } from 'lucide-react';

import { projectStatusLabel, resolveProjectStatus, type ProjectStatus } from '@/lib/project-utils';

interface ProjectCardFullProps {
    href: string;
    title: string;
    category: string;
    image: string;
    year?: string;
    location?: string;
    workers?: string;
    featured?: boolean;
    label?: string;
    status?: ProjectStatus;
    endDate?: string | null;
    language: 'en' | 'ar';
}

export default function ProjectCardFull({
    href,
    title,
    category,
    image,
    year,
    location,
    workers,
    featured = false,
    label,
    status,
    endDate,
    language,
}: ProjectCardFullProps): JSX.Element {
    const projectStatus = status ?? resolveProjectStatus(endDate);

    return (
        <Link href={href} className="project-card-full" data-cursor-hover>
            <div className="project-card-full__img-wrap">
                <img src={image} alt={title} className="project-card-full__img" loading="lazy" />
                <div className="project-card-full__overlay" />
            </div>

            {year && year !== '—' && (
                <div className="project-card-full__badge">{year}</div>
            )}

            <div
                className={`project-status-badge project-status-badge--${projectStatus} project-card-full__status-badge`}
            >
                {projectStatusLabel(projectStatus, language)}
            </div>

            {featured && (
                <div className="project-card-full__featured-badge">
                    {language === 'en' ? 'Featured' : 'مميز'}
                </div>
            )}

            <div className="project-card-full__arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
            </div>

            <div className="project-card-full__content">
                {label && (
                    <div className="project-card-full__label-badge">{label}</div>
                )}
                <div className="project-card-full__category">{category}</div>
                <div className="project-card-full__title">{title}</div>

                {(location || workers) && (
                    <div className="project-card-full__meta">
                        {location && (
                            <div className="project-card-full__meta-item">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{location}</span>
                            </div>
                        )}
                        {workers && (
                            <div className="project-card-full__meta-item">
                                <Users className="h-3.5 w-3.5" />
                                <span>
                                    {workers} {language === 'en' ? 'Workers' : 'عامل'}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
}
