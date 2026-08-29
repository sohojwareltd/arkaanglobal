import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import HomeProjectsSection from '@/components/home/HomeProjectsSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import StatsSection from '@/components/home/StatsSection';
import CertificationsSection from '@/components/home/CertificationsSection';
import ClientsSection from '@/components/home/ClientsSection';
import SectionReveal from '@/components/ui/section-reveal';

interface StatItem {
    id: number;
    value: string;
    label_en: string;
    label_ar: string;
}

interface ServiceItem {
    id: number;
    slug: string;
    title_en: string;
    title_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
    items?: { title_en: string; title_ar: string }[];
}

interface ProjectItem {
    id: number;
    title_en: string;
    title_ar: string;
    category: string;
    image?: string;
}

interface WhyChooseUsItem {
    id: number;
    title_en: string;
    title_ar: string;
    description_en?: string;
    description_ar?: string;
    icon?: string;
}

interface CertificateItem {
    id: number;
    title_en: string;
    title_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
}

interface ClientItem {
    id: number;
    name: string;
    abbr?: string;
    logo?: string;
}

interface ClientCategoryItem {
    id: number;
    name_en: string;
    name_ar: string;
}

interface HeroData {
    subtitle_en?: string;
    subtitle_ar?: string;
    description_en?: string;
    description_ar?: string;
    cta_primary_text_en?: string;
    cta_primary_text_ar?: string;
    cta_primary_link?: string;
    background_image?: string;
}

interface HomeProps {
    hero?: HeroData | null;
    services?: ServiceItem[];
    stats?: StatItem[];
    projects?: ProjectItem[];
    whyChooseUs?: WhyChooseUsItem[];
    certificates?: CertificateItem[];
    clients?: ClientItem[];
    clientCategories?: ClientCategoryItem[];
}

export default function Home({
    hero,
    services = [],
    stats = [],
    projects = [],
    whyChooseUs = [],
    certificates = [],
    clients = [],
    clientCategories = [],
}: HomeProps) {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <>
            <Head>
                <title>Arkaan Construction Company | Civil Construction, MEP, Manpower & Cleaning</title>
                <meta
                    name="description"
                    content="Arkaan Construction Company — trusted partner for civil construction, MEP, manpower supply, and dedicated cleaning services across the Kingdom of Saudi Arabia."
                />
                <link rel="canonical" href={currentUrl} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Organization',
                        name: 'Arkaan Construction Company',
                        url: siteUrl,
                        logo: `${siteUrl}/logo-main.png`,
                    })}
                </script>
            </Head>
            <Layout>
                <HeroSection hero={hero} />

                <SectionReveal>
                    <ServicesSection services={services} />
                </SectionReveal>

                <SectionReveal delay={100}>
                    <HomeProjectsSection projects={projects} />
                </SectionReveal>

                <SectionReveal delay={100}>
                    <WhyChooseUsSection items={whyChooseUs} />
                </SectionReveal>

                <SectionReveal>
                    <StatsSection stats={stats} />
                </SectionReveal>

                <SectionReveal delay={100}>
                    <CertificationsSection certificates={certificates} />
                </SectionReveal>

                <SectionReveal delay={100}>
                    <ClientsSection clients={clients} clientCategories={clientCategories} />
                </SectionReveal>
            </Layout>
        </>
    );
}
