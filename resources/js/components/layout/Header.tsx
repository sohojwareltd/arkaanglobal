import React, { useState } from 'react';
import { Globe, Menu, X, Plus, Building2 } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/lib/utils';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { language, setLanguage, t, direction } = useLanguage();
    const { url } = usePage();
    const scrollY = useScroll();

    // Expanded when at top or hovered
    const isExpanded = scrollY < 50 || isHovered;

    const navItems = [
        { path: '/', label: t('nav.home') },
        { path: '/about', label: t('nav.about') },
        { path: '/services', label: t('nav.services') },
        { path: '/projects', label: t('nav.projects') },
        { path: '/clients', label: t('nav.clients') },
        { path: '/careers', label: t('nav.careers') },
        { path: '/contact', label: t('nav.contact') },
    ];

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    const isActive = (path: string) => url === path;

    return (
        <>
            {/* Full width header for mobile */}
            <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-primary backdrop-blur-md lg:hidden">
                <div className="container-custom">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <img 
                                src="/logo.png" 
                                alt={language === 'en' ? 'Arkaan Global' : 'أركان جلوبال'}
                                className="h-10 w-auto"
                            />
                            <span className="text-lg font-bold text-primary-foreground">
                                {language === 'en' ? 'Arkaan Global' : 'أركان جلوبال'}
                            </span>
                        </Link>

                        {/* Mobile actions */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleLanguage}
                                type="button"
                            >
                                <Globe className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMenuOpen((open) => !open)}
                                type="button"
                            >
                                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Floating Island Navbar for Desktop */}
            <div className="hidden lg:block">
                <div className="fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none">
                    <div
                        className={cn(
                            'pointer-events-auto bg-primary backdrop-blur-md border border-border shadow-lg flex items-center gap-3 px-4 py-3',
                            'transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]',
                            isExpanded
                                ? 'rounded-full max-w-[90vw] min-w-fit'
                                : 'rounded-full max-w-fit',
                        )}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            transitionProperty: 'max-width, border-radius, padding, box-shadow',
                        }}
                    >
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                            <img 
                                src="/logo.png" 
                                alt={language === 'en' ? 'Arkaan Global' : 'أركان جلوبال'}
                                className={cn(
                                    'h-10 w-auto transition-all duration-700',
                                    isExpanded ? 'scale-100' : 'scale-95'
                                )}
                            />
                            <span className={cn(
                                'text-base font-bold text-primary-foreground whitespace-nowrap transition-all duration-500',
                                isExpanded 
                                    ? 'opacity-100 max-w-xs' 
                                    : 'opacity-0 max-w-0 overflow-hidden'
                            )}>
                                {language === 'en' ? 'Arkaan Global' : 'أركان جلوبال'}
                            </span>
                        </Link>

                        {/* Divider */}
                        <div className={cn(
                            'h-8 w-px bg-primary-foreground/20 transition-all duration-500',
                            isExpanded ? 'opacity-100 mx-2' : 'opacity-0 w-0 mx-0'
                        )} />

                        {/* Navigation - Expanded */}
                        {isExpanded ? (
                            <nav className={cn(
                                'flex items-center gap-1 transition-all duration-500 flex-shrink-0',
                                isExpanded ? 'opacity-100' : 'opacity-0'
                            )}>
                                {navItems.map((item, index) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={cn(
                                            'px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap flex-shrink-0',
                                            isActive(item.path)
                                                ? 'bg-primary-foreground/20 text-primary-foreground'
                                                : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground',
                                        )}
                                        style={{
                                            transitionDelay: `${index * 30}ms`
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        ) : (
                            /* Compact Icons */
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300"
                                    aria-label="Expand Menu"
                                >
                                    <Plus className="h-5 w-5" />
                                </button>
                            </div>
                        )}

                        {/* Divider */}
                        <div className={cn(
                            'h-8 w-px bg-primary-foreground/20 transition-all duration-500',
                            isExpanded ? 'opacity-100 mx-2' : 'opacity-0 w-0 mx-0'
                        )} />

                        {/* Right Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {isExpanded ? (
                                <>
                                    {/* Language Toggle */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={toggleLanguage}
                                        className={cn(
                                            'rounded-full transition-all duration-500 text-primary-foreground hover:bg-primary-foreground/10',
                                            isExpanded ? 'opacity-100' : 'opacity-0'
                                        )}
                                        type="button"
                                        style={{ transitionDelay: '200ms' }}
                                    >
                                        <Globe className="h-4 w-4 mr-1" />
                                        <span className="text-xs">
                                            {language === 'en' ? 'AR' : 'EN'}
                                        </span>
                                    </Button>

                                    {/* CTA Button */}
                                    <Button
                                        className={cn(
                                            'bg-primary-foreground text-primary border-0 rounded-full text-sm px-5 transition-all duration-500 whitespace-nowrap flex-shrink-0 hover:bg-primary-foreground/90',
                                            isExpanded ? 'opacity-100' : 'opacity-0'
                                        )}
                                        asChild
                                        style={{ transitionDelay: '250ms' }}
                                    >
                                        <Link href="/contact">{t('hero.cta.primary')}</Link>
                                    </Button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={toggleLanguage}
                                    className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-all duration-300 text-primary-foreground"
                                    aria-label="Language"
                                >
                                    <Globe className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div
                    className={cn(
                        'fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden',
                        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
                    )}
                    onClick={() => setIsMenuOpen(false)}
                >
                    <nav
                        className={cn(
                            'fixed top-0 h-full w-64 bg-primary shadow-lg transition-transform duration-300 flex flex-col',
                            direction === 'ltr' ? 'left-0' : 'right-0',
                            isMenuOpen
                                ? direction === 'ltr'
                                    ? 'translate-x-0'
                                    : 'translate-x-0'
                                : direction === 'ltr'
                                    ? '-translate-x-full'
                                    : 'translate-x-full',
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-primary-foreground/20 p-4">
                            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                                <img 
                                    src="/logo.png" 
                                    alt={language === 'en' ? 'Arkaan Global' : 'أركان جلوبال'}
                                    className="h-10 w-auto"
                                />
                                <span className="text-lg font-bold text-primary-foreground">
                                    {language === 'en' ? 'Arkaan Global' : 'أركان جلوبال'}
                                </span>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMenuOpen(false)}
                                type="button"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="flex flex-col gap-1 p-4 overflow-y-auto">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={cn(
                                        'px-4 py-3 text-sm font-medium transition-colors rounded-lg',
                                        isActive(item.path)
                                            ? 'bg-primary-foreground/20 text-primary-foreground'
                                            : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground',
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Button
                                className="bg-primary-foreground text-primary mt-4 border-0 hover:bg-primary-foreground/90"
                                asChild
                            >
                                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                                    {t('hero.cta.primary')}
                                </Link>
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}

