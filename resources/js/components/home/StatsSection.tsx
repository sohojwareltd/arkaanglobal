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
            { threshold: 0.1 },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

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
        <div ref={ref} className="border-l-2 border-accent/40 px-6 text-center first:border-l-0">
            <div className="mb-2 text-4xl font-bold text-accent sm:text-5xl lg:text-6xl">
                {prefix}
                {count.toLocaleString()}
                {suffix}
            </div>
            <p className="font-medium text-primary-foreground/80">{label}</p>
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

/** Splits a display value like "6+", "100%", or "4" into an animatable
 * number plus its non-numeric prefix/suffix, so real (non-fabricated)
 * stat strings from the DB can still count up smoothly. */
function parseStatValue(raw: string): { value: number; prefix: string; suffix: string } {
    const match = raw.match(/^([^\d]*)([\d,]+)(.*)$/);
    if (!match) {
        return { value: 0, prefix: '', suffix: raw };
    }
    const [, prefix, digits, suffix] = match;
    return { value: parseInt(digits.replace(/,/g, ''), 10) || 0, prefix, suffix };
}

export default function StatsSection({ stats: propStats = [] }: StatsSectionProps): JSX.Element {
    const { t, language } = useLanguage();

    const stats = propStats.length > 0
        ? propStats.map((stat) => ({
            ...parseStatValue(stat.value),
            label: language === 'en' ? stat.label_en : stat.label_ar,
        }))
        : [
            { value: 4, prefix: '', suffix: '', label: t('stats.years') },
            { value: 3, prefix: '', suffix: '', label: t('stats.workers') },
        ];

    return (
        <section className="section-padding relative overflow-hidden bg-primary">
            <div className="animate-kenburns absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1600')" }}
                />
            </div>
            <div className="container-custom relative">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
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
            </div>
        </section>
    );
}
