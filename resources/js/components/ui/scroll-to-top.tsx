import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop(): JSX.Element {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = (): void => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <button
            type="button"
            className={`scroll-top${visible ? ' visible' : ''}`}
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <ChevronUp className="h-[18px] w-[18px] text-white" strokeWidth={2.5} />
        </button>
    );
}
