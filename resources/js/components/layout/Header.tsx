import React, { useState } from 'react';
import { Globe, Menu, X, Mail } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/lib/utils';

interface NavigationItem {
    path: string;
    label_en: string;
    label_ar: string;
}

interface ContactInfoMap {
    [key: string]: { value_en: string; value_ar: string };
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage, t, direction, languages } = useLanguage();
    const { url, props } = usePage();
    const scrollY = useScroll();
    const { contactInfo = {} } = props as { contactInfo?: ContactInfoMap };

    const isScrolled = scrollY > 8;

    const rawNav = props.navigation;
    const navigation = Array.isArray(rawNav) ? rawNav : [];
    const navItems = (navigation as NavigationItem[]).map((item) => ({
        path: item.path,
        label: language === 'en' ? item.label_en : item.label_ar,
    }));

    const getContactValue = (key: string, fallback: string): string => {
        const item = contactInfo?.[key];
        if (!item) return fallback;
        return (language === 'en' ? item.value_en : item.value_ar) || fallback;
    };
    const email = getContactValue('email', 'info@arkaanconstruction.com');
    const cities = getContactValue('cities', language === 'en' ? 'Jubail | Dammam | Riyadh' : 'الجبيل | الدمام | الرياض');

    const toggleLanguage = () => {
        const currentIndex = languages.findIndex((lang) => lang.code === language);
        const nextIndex = (currentIndex + 1) % languages.length;
        setLanguage(languages[nextIndex].code);
    };

    const switchToLanguage = (code: string) => {
        setLanguage(code);
    };

    const isActive = (path: string) => url === path;

    return (
        <>
            <header
                className={cn(
                    'sticky top-0 z-50 w-full transition-shadow duration-300',
                    isScrolled ? 'shadow-lg' : 'shadow-none',
                )}
            >
                {/* Utility strip — contact details, always-visible on desktop */}
                <div className="hidden bg-secondary text-primary-foreground/80 lg:block">
                    <div className="container-custom flex items-center justify-between py-2 text-xs">
                        <div className="flex items-center gap-6">
                            <a href={`mailto:${email}`} className="flex items-center gap-2 transition-colors hover:text-accent">
                                <Mail className="h-3.5 w-3.5" />
                                <span>{email}</span>
                            </a>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="font-medium tracking-wide">{cities}</span>
                            <div className="relative group">
                                <button type="button" className="flex items-center gap-1.5 transition-colors hover:text-accent" onClick={toggleLanguage}>
                                    <Globe className="h-3.5 w-3.5" />
                                    <span>{languages.find((l) => l.code === language)?.code.toUpperCase() || 'EN'}</span>
                                </button>
                                <div className="absolute right-0 top-full z-50 min-w-[130px] bg-secondary opacity-0 shadow-lg invisible transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => switchToLanguage(lang.code)}
                                            className={`flex w-full items-center gap-2 px-4 py-2 text-left text-xs text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10 ${
                                                language === lang.code ? 'bg-primary-foreground/10' : ''
                                            }`}
                                        >
                                            {lang.flag && <span>{lang.flag}</span>}
                                            <span>{lang.native_name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main bar — solid, full-width, square-edged */}
                <div className="border-b-2 border-accent bg-primary">
                    <div className="container-custom flex h-16 items-center justify-between gap-4 lg:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex shrink-0 items-center gap-3">
                            <img src="/logo.png" alt={language === 'en' ? 'Arkaan Construction Company' : 'شركة أركان للمقاولات'} className="h-10 w-auto lg:h-12" />
                            <span className="hidden text-lg font-bold leading-tight text-primary-foreground sm:block">
                                {language === 'en' ? 'Arkaan Construction' : 'أركان للمقاولات'}
                            </span>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden items-center gap-1 lg:flex">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={cn(
                                        'border-b-2 px-3 py-2 text-sm font-medium transition-colors',
                                        isActive(item.path)
                                            ? 'border-accent text-primary-foreground'
                                            : 'border-transparent text-primary-foreground/75 hover:border-accent/50 hover:text-primary-foreground',
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Right actions */}
                        <div className="flex shrink-0 items-center gap-2">
                            <Button className="hidden bg-accent text-accent-foreground hover:bg-accent/90 rounded-none lg:inline-flex" asChild>
                                <Link href="/hse-contact">{t('hero.cta.primary')}</Link>
                            </Button>

                            {/* Mobile language toggle */}
                            <button
                                type="button"
                                onClick={toggleLanguage}
                                className="flex h-10 w-10 items-center justify-center text-primary-foreground/90 hover:text-accent lg:hidden"
                                aria-label="Language"
                            >
                                <Globe className="h-5 w-5" />
                            </button>

                            {/* Mobile menu trigger */}
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen((open) => !open)}
                                className="flex h-10 w-10 items-center justify-center text-primary-foreground/90 hover:text-accent lg:hidden"
                                aria-label="Menu"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <nav
                        className={cn(
                            'fixed top-0 h-full w-72 bg-primary shadow-2xl flex flex-col',
                            direction === 'ltr' ? 'left-0' : 'right-0',
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b-2 border-accent p-4">
                            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                                <img src="/logo.png" alt={language === 'en' ? 'Arkaan Construction Company' : 'شركة أركان للمقاولات'} className="h-9 w-auto" />
                                <span className="text-base font-bold text-primary-foreground">
                                    {language === 'en' ? 'Arkaan Construction' : 'أركان للمقاولات'}
                                </span>
                            </Link>
                            <button type="button" onClick={() => setIsMenuOpen(false)} className="text-primary-foreground/80 hover:text-accent" aria-label="Close">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-1 p-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={cn(
                                        'border-l-4 px-4 py-3 text-sm font-medium transition-colors',
                                        isActive(item.path)
                                            ? 'border-accent bg-primary-foreground/10 text-primary-foreground'
                                            : 'border-transparent text-primary-foreground/75 hover:border-accent/50 hover:bg-primary-foreground/5 hover:text-primary-foreground',
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 rounded-none" asChild>
                                <Link href="/hse-contact" onClick={() => setIsMenuOpen(false)}>
                                    {t('hero.cta.primary')}
                                </Link>
                            </Button>
                        </div>
                        <div className="mt-auto space-y-3 border-t border-primary-foreground/15 p-4 text-sm text-primary-foreground/80">
                            <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-accent">
                                <Mail className="h-4 w-4" />
                                <span>{email}</span>
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
