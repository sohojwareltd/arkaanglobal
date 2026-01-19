import { Link } from '@inertiajs/react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    const { language } = useLanguage();

    return (
        <Layout>
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
                    <p className="mb-4 text-xl text-muted-foreground">
                        {language === 'en' ? 'Oops! Page not found' : 'عذرًا! الصفحة غير موجودة'}
                    </p>
                    <Button asChild className="hero-gradient border-0 text-primary-foreground">
                        <Link href="/">{language === 'en' ? 'Return to Home' : 'العودة إلى الرئيسية'}</Link>
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
