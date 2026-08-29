import React, { useEffect, useRef, useState } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';

interface StatItemProps {
    value: number;
    prefix: string;
    suffix: string;
    label: string;
    delay: number;
}

function StatItem({ value, prefix, suffix, label, delay }: StatItemProps): JSX.Element {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) {
            return;
        }

        const timeout = setTimeout(() => {
            const duration = 1500;
            const steps = Math.min(60, Math.max(value, 1));
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isVisible, value, delay]);

    return (
        <div ref={ref} className="stat-item">
            <div className="stat-item__number">
                {prefix}
                {count.toLocaleString()}
                <span className="stat-item__suffix">{suffix}</span>
            </div>
            <div className="stat-item__label">{label}</div>
        </div>
    );
}

interface StatData {
    id: number;
    value: string;
    label_en: string;
    label_ar: string;
}

interface StatsSectionProps {
    stats?: StatData[];
}

function parseStatValue(raw: string): { value: number; prefix: string; suffix: string } {
    const match = raw.match(/^([^\d]*)([\d,]+)(.*)$/);
    if (!match) {
        return { value: 0, prefix: '', suffix: raw };
    }
    const [, prefix, digits, suffix] = match;

    return { value: parseInt(digits.replace(/,/g, ''), 10) || 0, prefix, suffix };
}

const STATS_BG =
    'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2070';

export default function StatsSection({ stats: propStats = [] }: StatsSectionProps): JSX.Element {
    const { t, language } = useLanguage();

    const stats =
        propStats.length > 0
            ? propStats.map((stat) => ({
                  ...parseStatValue(stat.value),
                  label: language === 'en' ? stat.label_en : stat.label_ar,
              }))
            : [
                  { value: 4, prefix: '', suffix: '+', label: t('stats.years') },
                  { value: 3, prefix: '', suffix: '+', label: t('stats.workers') },
              ];

    return (
        <section
            className="stats"
            style={{
                backgroundImage: `url('${STATS_BG}')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <div className="stats__overlay" />
            <div className="stats__inner">
                {stats.map((stat, index) => (
                    <StatItem
                        key={stat.label}
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        label={stat.label}
                        delay={index * 100}
                    />
                ))}
            </div>
        </section>
    );
}
