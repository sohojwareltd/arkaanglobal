import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

import { useLanguage } from '@/contexts/LanguageContext';
import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/lib/utils';

interface NavigationItem {
    path: string;
    label_en: string;
    label_ar: string;
}

export default function Header(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage, t, direction, languages } = useLanguage();
    const { url, props } = usePage();
    const scrollY = useScroll();

    const isScrolled = scrollY > 20;

    const rawNav = props.navigation;
    const navigation = Array.isArray(rawNav) ? rawNav : [];
    const navItems = (navigation as NavigationItem[]).map((item) => ({
        path: item.path,
        label: language === 'en' ? item.label_en : item.label_ar,
    }));

    const toggleLanguage = (): void => {
        const currentIndex = languages.findIndex((lang) => lang.code === language);
        const nextIndex = (currentIndex + 1) % languages.length;
        setLanguage(languages[nextIndex].code);
    };

    const isActive = (path: string): boolean => {
        if (path === '/') {
            return url === '/';
        }

        return url.startsWith(path);
    };

    return (
        <>
            <header className={cn('navbar', isScrolled && 'scrolled')}>
                <div className="navbar__inner">
                    <Link href="/" className="navbar__logo">
                        <img
                            src="/logo.png"
                            alt={language === 'en' ? 'Arkaan Construction Company' : 'شركة أركان للمقاولات'}
                            className="navbar__logo-img"
                        />
                        <div className="navbar__logo-text hidden sm:flex">
                            <span className="navbar__logo-text-en">
                                {language === 'en' ? 'Arkaan Construction' : 'أركان للمقاولات'}
                            </span>
                        </div>
                    </Link>

                    <nav className="navbar__links">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={cn('navbar__link', isActive(item.path) && 'active')}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="navbar__cta-group flex items-center gap-3">
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            className="hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary lg:flex"
                            aria-label="Switch language"
                        >
                            <Globe className="h-3.5 w-3.5" />
                            <span>{languages.find((l) => l.code === language)?.code.toUpperCase() || 'EN'}</span>
                        </button>
                        <Link href="/hse-contact" className="navbar__cta hidden lg:inline-flex">
                            {t('hero.cta.primary')}
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            className="flex h-10 w-10 items-center justify-center text-foreground/80"
                            aria-label="Switch language"
                        >
                            <Globe className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen((open) => !open)}
                            className={cn('navbar__hamburger', isMenuOpen && 'open')}
                            aria-label="Menu"
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-[999] bg-black/50 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <nav
                        className={cn(
                            'fixed top-0 flex h-full w-72 flex-col bg-white shadow-2xl',
                            direction === 'ltr' ? 'right-0' : 'left-0',
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-border p-5">
                            <Link href="/" onClick={() => setIsMenuOpen(false)}>
                                <img src="/logo.png" alt="Arkaan" className="h-10 w-auto" />
                            </Link>
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(false)}
                                className={cn('navbar__hamburger open')}
                                aria-label="Close menu"
                            >
                                <span />
                                <span />
                                <span />
                            </button>
                        </div>
                        <div className="flex flex-col gap-1 p-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={cn(
                                        'border-l-4 px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors',
                                        isActive(item.path)
                                            ? 'border-primary bg-muted text-primary'
                                            : 'border-transparent text-foreground/75 hover:border-primary/50 hover:bg-muted/50',
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href="/hse-contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="btn-mbr mt-4 text-center"
                            >
                                {t('hero.cta.primary')}
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
