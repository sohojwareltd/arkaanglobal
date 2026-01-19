import React, { useEffect, useRef, useState } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';

interface StatItemProps {
    value: number;
    suffix: string;
    label: string;
    delay: number;
}

function StatItem({ value, suffix, label, delay }: StatItemProps): JSX.Element {
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
            const duration = 2000;
            const steps = 60;
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
        <div ref={ref} className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary sm:text-5xl lg:text-6xl">
                {count.toLocaleString()}
                {suffix}
            </div>
            <p className="font-medium text-muted-foreground">{label}</p>
        </div>
    );
}

export default function StatsSection(): JSX.Element {
    const { t } = useLanguage();

    const stats = [
        { value: 15, suffix: '+', label: t('stats.years') },
        { value: 10_000, suffix: '+', label: t('stats.workers') },
        { value: 500, suffix: '+', label: t('stats.projects') },
        { value: 150, suffix: '+', label: t('stats.clients') },
    ];

    return (
        <section className="section-padding bg-muted/50">
            <div className="container-custom">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={stat.label}
                            value={stat.value}
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

