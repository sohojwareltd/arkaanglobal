import React from 'react';

import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface SectionRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    variant?: 'fadeUp' | 'fadeIn';
}

export default function SectionReveal({
    children,
    className,
    delay = 0,
    variant = 'fadeUp',
}: SectionRevealProps): JSX.Element {
    const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08, rootMargin: '-40px' });

    return (
        <div
            ref={ref}
            className={cn(
                'section-wrapper',
                variant === 'fadeUp' && 'section-wrapper--fadeUp',
                variant === 'fadeIn' && 'section-wrapper--fadeIn',
                inView && 'visible',
                className,
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
