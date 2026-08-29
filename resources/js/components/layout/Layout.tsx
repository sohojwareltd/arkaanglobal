import type React from 'react';

import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import CustomCursor from '@/components/ui/custom-cursor';
import ScrollToTop from '@/components/ui/scroll-to-top';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <>
            <CustomCursor />
            <div className="flex min-h-screen flex-col page-offset page-offset-mobile">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <BottomNav />
                <ScrollToTop />
            </div>
        </>
    );
}
