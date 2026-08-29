import { Home, User, Layers, LayoutGrid, MessageCircle } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const navItems = [
    { path: '/', icon: Home, labelEn: 'Home', labelAr: 'الرئيسية' },
    { path: '/about', icon: User, labelEn: 'About Us', labelAr: 'من نحن' },
    { path: '/services', icon: Layers, labelEn: 'Services', labelAr: 'الخدمات' },
    { path: '/projects', icon: LayoutGrid, labelEn: 'Projects', labelAr: 'المشاريع' },
    { path: '/hse-contact', icon: MessageCircle, labelEn: 'Contact', labelAr: 'تواصل' },
];

export default function BottomNav(): JSX.Element {
    const { url } = usePage();
    const { language } = useLanguage();

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
                            <span className="bottom-nav__label">
                                {language === 'en' ? item.labelEn : item.labelAr}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
