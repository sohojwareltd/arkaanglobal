import React from 'react';

import { useInView, type UseInViewOptions } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export interface WhenVisibleProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    animationClassName?: string;
    hiddenClassName?: string;
    inViewClassName?: string;
    options?: UseInViewOptions;
}

export default function WhenVisible({
    children,
    className,
    animationClassName = 'animate-fade-in-up',
    hiddenClassName = 'opacity-0 translate-y-4',
    inViewClassName = 'opacity-100 translate-y-0',
    options,
    ...props
}: WhenVisibleProps): JSX.Element {
    const { ref, inView } = useInView<HTMLDivElement>(options);

    return (
        <div
            ref={ref}
            className={cn(
                'transform-gpu transition-all duration-700 ease-out will-change-transform',
                inView ? inViewClassName : hiddenClassName,
                inView ? animationClassName : '',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

