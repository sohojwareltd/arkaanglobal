import { ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import { LanguageProvider } from '@/contexts/LanguageContext';

interface AppWrapperProps {
    children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
    // This component is inside Inertia context, so usePage will work
    return (
        <LanguageProvider>
            {children}
        </LanguageProvider>
    );
}
