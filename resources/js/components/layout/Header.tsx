import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export default function Header(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const { url } = usePage();

    const navItems = [
        { path: '/', label: t('nav.home') },
        { path: '/about', label: t('nav.about') },
        { path: '/services', label: t('nav.services') },
        { path: '/projects', label: t('nav.projects') },
        { path: '/clients', label: t('nav.clients') },
        { path: '/careers', label: t('nav.careers') },
        { path: '/contact', label: t('nav.contact') },
    ];

    const toggleLanguage = (): void => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    const isActive = (path: string): boolean => url === path;

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
            <div className="container-custom">
                <div className="flex h-16 items-center justify-between lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="hero-gradient flex h-10 w-10 items-center justify-center rounded-lg">
                            <span className="text-xl font-bold text-primary-foreground">A</span>
                        </div>
                        <span className="hidden text-lg font-bold text-foreground sm:block">
                            {language === 'en' ? 'Arkaan Global Contracting' : 'أركان جلوبال للمقاولات'}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-1 lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={cn(
                                    'px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                                    isActive(item.path)
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* Language Toggle */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleLanguage}
                            className="flex items-center gap-2"
                            type="button"
                        >
                            <Globe className="h-4 w-4" />
                            <span className="hidden sm:inline">
                                {language === 'en' ? 'العربية' : 'English'}
                            </span>
                        </Button>

                        {/* CTA Button */}
                        <Button
                            className="hero-gradient hidden border-0 text-primary-foreground sm:flex"
                            asChild
                        >
                            <Link href="/contact">{t('hero.cta.primary')}</Link>
                        </Button>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsMenuOpen((open) => !open)}
                            type="button"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="animate-fade-in border-t border-border py-4 lg:hidden">
                        <div className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={cn(
                                        'px-4 py-3 text-sm font-medium transition-colors rounded-lg',
                                        isActive(item.path)
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Button
                                className="hero-gradient mt-4 border-0 text-primary-foreground"
                                asChild
                            >
                                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                                    {t('hero.cta.primary')}
                                </Link>
                            </Button>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}

