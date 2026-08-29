import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function canUseCustomCursor(): boolean {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export default function CustomCursor(): JSX.Element | null {
    const [mounted, setMounted] = useState(false);
    const [hovered, setHovered] = useState(false);
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: -100, y: -100 });
    const ring = useRef({ x: -100, y: -100 });
    const clickingRef = useRef(false);
    const raf = useRef<number>(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!mounted || !canUseCustomCursor()) {
            return;
        }

        document.body.classList.add('custom-cursor-active');

        const dot = dotRef.current;
        const ringEl = ringRef.current;
        if (!dot || !ringEl) {
            return;
        }

        const applyDotTransform = (): void => {
            const scale = clickingRef.current ? 0.7 : 1;
            dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        };

        const tick = (): void => {
            ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
            ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

            const ringScale = clickingRef.current ? 0.85 : 1;
            ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
            raf.current = requestAnimationFrame(tick);
        };

        const onMouseMove = (e: MouseEvent): void => {
            mouse.current = { x: e.clientX, y: e.clientY };
            applyDotTransform();
        };

        const onMouseOver = (e: MouseEvent): void => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [data-cursor-hover]')) {
                setHovered(true);
            }
        };

        const onMouseOut = (e: MouseEvent): void => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [data-cursor-hover]')) {
                setHovered(false);
            }
        };

        const onMouseDown = (): void => {
            clickingRef.current = true;
            applyDotTransform();
        };

        const onMouseUp = (): void => {
            clickingRef.current = false;
            applyDotTransform();
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });
        window.addEventListener('mouseout', onMouseOut, { passive: true });
        window.addEventListener('mousedown', onMouseDown, { passive: true });
        window.addEventListener('mouseup', onMouseUp, { passive: true });
        raf.current = requestAnimationFrame(tick);

        return () => {
            document.body.classList.remove('custom-cursor-active');
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mouseout', onMouseOut);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            cancelAnimationFrame(raf.current);
        };
    }, [mounted]);

    if (!mounted || !canUseCustomCursor()) {
        return null;
    }

    return createPortal(
        <>
            <div
                ref={dotRef}
                className={`cursor-dot${hovered ? ' hovered' : ''}`}
                aria-hidden="true"
            />
            <div
                ref={ringRef}
                className={`cursor-ring${hovered ? ' hovered' : ''}`}
                aria-hidden="true"
            />
        </>,
        document.body,
    );
}
