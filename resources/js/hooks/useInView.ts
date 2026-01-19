import { useEffect, useRef, useState } from 'react';

export interface UseInViewOptions {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | number[];
    once?: boolean;
}

export function useInView<T extends Element>(options: UseInViewOptions = {}): {
    ref: React.RefObject<T | null>;
    inView: boolean;
} {
    const { root = null, rootMargin = '0px 0px -10% 0px', threshold = 0.15, once = true } = options;
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        // If already visible and we only animate once, no need to observe.
        if (inView && once) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (once) {
                        observer.disconnect();
                    }
                } else if (!once) {
                    setInView(false);
                }
            },
            { root: root ?? null, rootMargin, threshold },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [root, rootMargin, threshold, once, inView]);

    return { ref, inView };
}

