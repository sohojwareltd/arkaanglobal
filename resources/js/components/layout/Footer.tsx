import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@inertiajs/react';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer(): JSX.Element {
    const { t, language } = useLanguage();

    const quickLinks = [
        { path: '/', label: t('nav.home') },
        { path: '/about', label: t('nav.about') },
        { path: '/services', label: t('nav.services') },
        { path: '/projects', label: t('nav.projects') },
    ];

    const services = [
        { path: '/services#skilled', label: t('services.skilled.title') },
        { path: '/services#unskilled', label: t('services.unskilled.title') },
        { path: '/services#contracting', label: t('services.contracting.title') },
        { path: '/services#subcontracting', label: t('services.subcontracting.title') },
    ];

    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container-custom section-padding">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
                    {/* Company Info */}
                    <div>
                        <div className="mb-4">
                            <img 
                                src="/logo-main.png" 
                                alt={language === 'en' ? 'Arkaan Global Contracting' : 'أركان جلوبال للمقاولات'}
                                className="h-16 w-auto"
                            />
                        </div>
                        <p className="mb-6 text-sm text-primary-foreground/80">
                            {t('footer.description')}
                        </p>
                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-primary-foreground/80" />
                                <span>{t('footer.address')}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-primary-foreground/80" />
                                <span dir="ltr">+966 11 123 4567</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-primary-foreground/80" />
                                <span>info@arkaanglobal.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        href={link.path}
                                        className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold">{t('footer.services')}</h4>
                        <ul className="space-y-2">
                            {services.map((service) => (
                                <li key={service.path}>
                                    <Link
                                        href={service.path}
                                        className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                                    >
                                        {service.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold">{t('footer.contact')}</h4>
                        <ul className="space-y-2 text-sm text-primary-foreground/80">
                            <li>{t('contact.info.hours.value')}</li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="transition-colors hover:text-primary-foreground"
                                >
                                    {t('nav.careers')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="transition-colors hover:text-primary-foreground"
                                >
                                    {t('nav.contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-primary-foreground/20 pt-8">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                        <p className="text-sm text-primary-foreground/60">
                            © {new Date().getFullYear()} Arkaan Global Contracting. {t('footer.rights')}
                        </p>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/privacy"
                                className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

