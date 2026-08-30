import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import HomeProjectsSection from '@/components/home/HomeProjectsSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import ClientsSection from '@/components/home/ClientsSection';
import SectionReveal from '@/components/ui/section-reveal';

interface ServiceItem {
    id: number;
    slug: string;
    title_en: string;
    title_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
    items?: { text_en: string; text_ar: string }[];
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
    projects?: ProjectItem[];
    whyChooseUs?: WhyChooseUsItem[];
    clients?: ClientItem[];
    clientCategories?: ClientCategoryItem[];
}

export default function Home({
    hero,
    services = [],
    projects = [],
    whyChooseUs = [],
    clients = [],
    clientCategories = [],
}: HomeProps) {
    const { logos = {} } = usePage().props as { logos?: { main?: string } };
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const organizationLogo = logos.main ?? `${siteUrl}/logo-main.png`;

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
                        logo: organizationLogo.startsWith('http')
                            ? organizationLogo
                            : `${siteUrl}${organizationLogo}`,
                    })}
                </script>
            </Head>
            <Layout>
                <HeroSection hero={hero} />

                <SectionReveal>
                    <ServicesSection services={services} />
                </SectionReveal>

                <SectionReveal delay={100}>
                    <HomeProjectsSection projects={projects} services={services} />
                </SectionReveal>

                <SectionReveal delay={100}>
                    <WhyChooseUsSection items={whyChooseUs} />
                </SectionReveal>

                <SectionReveal delay={100}>
                    <ClientsSection clients={clients} clientCategories={clientCategories} />
                </SectionReveal>
            </Layout>
        </>
    );
}
