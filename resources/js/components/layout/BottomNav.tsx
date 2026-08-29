import { Briefcase, Home, Layers, LayoutGrid, MessageCircle, User, type LucideIcon } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface NavigationItem {
    path: string;
    label_en: string;
    label_ar: string;
}

const ICON_BY_PATH: Record<string, LucideIcon> = {
    '/': Home,
    '/about': User,
    '/services': Layers,
    '/projects': LayoutGrid,
    '/careers': Briefcase,
    '/hse-contact': MessageCircle,
};

const MOBILE_NAV_PATHS = ['/', '/services', '/projects', '/careers', '/hse-contact'];

export default function BottomNav(): JSX.Element {
    const { url, props } = usePage();
    const { language } = useLanguage();

    const rawNav = props.navigation;
    const navigation = Array.isArray(rawNav) ? (rawNav as NavigationItem[]) : [];

    const navItems = navigation
        .filter((item) => MOBILE_NAV_PATHS.includes(item.path))
        .map((item) => ({
            path: item.path,
            icon: ICON_BY_PATH[item.path] ?? MessageCircle,
            label: language === 'en' ? item.label_en : item.label_ar,
        }));

    const isActive = (path: string): boolean => {
        if (path === '/') {
            return url === '/';
        }

        return url.startsWith(path);
    };

    return (
        <nav className="bottom-nav lg:hidden" aria-label="Mobile navigation">
            <div className="bottom-nav__inner">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={cn('bottom-nav__item', active && 'active')}
                        >
                            <span className="bottom-nav__icon-wrap">
                                <Icon className="bottom-nav__icon" strokeWidth={active ? 2.5 : 2} />
                            </span>
                            <span className="bottom-nav__label">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
