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
        { path: '/hse-contact', label: t('nav.hseContact') },
    ];

    const services = [
        { path: '/services#construction', label: t('services.construction.title') },
        { path: '/services#mep', label: t('services.mep.title') },
        { path: '/services#manpower', label: t('services.manpower.title') },
        { path: '/services#cleaning', label: t('services.cleaning.title') },
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
                                <span dir="ltr">0572914027</span>
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
                                    href="/hse-contact"
                                    className="transition-colors hover:text-primary-foreground"
                                >
                                    {t('nav.hseContact')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Registration Info Strip */}
                <div className="mt-12 border-t border-primary-foreground/20 pt-6">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/70">
                        <div>
                            <span className="font-semibold">{t('footer.cr.label')}: </span>
                            <span>{t('footer.cr.number')}</span>
                        </div>
                        <div>
                            <span className="font-semibold">{t('footer.vat.label')}: </span>
                            <span>{t('footer.vat.number')}</span>
                        </div>
                        <div>
                            <a
                                href="/company-profile.pdf"
                                download
                                className="flex items-center gap-2 transition-colors hover:text-primary-foreground"
                            >
                                <span>{t('footer.downloadProfile')}</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 border-t border-primary-foreground/20 pt-8">
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

