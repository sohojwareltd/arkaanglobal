import React from 'react';

interface SectionHeaderProps {
    tag: string;
    title: React.ReactNode;
    subtitle?: string;
    centered?: boolean;
}

export default function SectionHeader({
    tag,
    title,
    subtitle,
    centered = true,
}: SectionHeaderProps): JSX.Element {
    return (
        <div className={`section-title${centered ? ' section-title--center' : ''}`}>
            <div className="section-tag">
                <span className="section-tag__line" />
                <span className="section-tag__text">{tag}</span>
            </div>
            <h2 className="section-title__heading">{title}</h2>
            {subtitle && <p className="section-title__sub">{subtitle}</p>}
        </div>
    );
}
