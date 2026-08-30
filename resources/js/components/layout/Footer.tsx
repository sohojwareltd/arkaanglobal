import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

import { useLanguage } from '@/contexts/LanguageContext';

interface ContactInfoMap {
    [key: string]: { value_en: string; value_ar: string };
}

export default function Footer(): JSX.Element {
    const { t, language } = useLanguage();
    const { contactInfo = {}, logos = {} } = usePage().props as {
        contactInfo?: ContactInfoMap;
        logos?: { default?: string; main?: string };
    };
    const logoMainSrc = logos.main ?? '/logo-main.png';

    const getContactValue = (key: string): string => {
        const item = contactInfo?.[key];
        if (!item) {
            return '';
        }

        return language === 'en' ? item.value_en : item.value_ar;
    };

    const addressVal = getContactValue('address') || t('footer.address');
    const emailVal = getContactValue('email') || 'info@arkaanconstruction.com';

    const quickLinks = [
        { path: '/', label: t('nav.home') },
        { path: '/about', label: t('nav.about') },
        { path: '/services', label: t('nav.services') },
        { path: '/projects', label: language === 'en' ? 'Projects' : 'المشاريع' },
        { path: '/careers', label: language === 'en' ? 'Careers' : 'الوظائف' },
        { path: '/hse-contact', label: t('nav.hseContact') },
    ];

    const services = [
        { path: '/services/construction', label: t('services.construction.title') },
        { path: '/services/mep', label: t('services.mep.title') },
        { path: '/services/manpower', label: t('services.manpower.title') },
        { path: '/services/cleaning', label: t('services.cleaning.title') },
    ];

    return (
        <footer className="site-footer">
            <div className="container-custom pb-8">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-12">
                    <div className="lg:col-span-1">
                        <Link href="/" className="mb-5 inline-flex items-center gap-3">
                            <img
                                src={logoMainSrc}
                                alt={language === 'en' ? 'Arkaan Construction Company' : 'شركة أركان للمقاولات'}
                                className="h-12 w-auto"
                            />
                        </Link>
                        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{t('footer.description')}</p>
                    </div>

                    <div>
                        <h4 className="footer__col-title">{t('footer.quickLinks')}</h4>
                        <ul className="flex flex-col gap-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link href={link.path} className="footer__link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer__col-title">{t('footer.services')}</h4>
                        <ul className="flex flex-col gap-3">
                            {services.map((service) => (
                                <li key={service.path}>
                                    <Link href={service.path} className="footer__link">
                                        {service.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer__col-title">{t('footer.contact')}</h4>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                <span className="text-sm leading-relaxed text-muted-foreground">{addressVal}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 shrink-0 text-primary" />
                                <a href={`mailto:${emailVal}`} className="footer__link">
                                    {emailVal}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Arkaan Construction Company. {t('footer.rights')}
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-primary">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-xs text-muted-foreground transition-colors hover:text-primary">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
