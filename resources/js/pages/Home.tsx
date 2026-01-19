import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ClientsSection from '@/components/home/ClientsSection';
import CTASection from '@/components/home/CTASection';
import WhenVisible from '@/components/ui/when-visible';

export default function Home() {
    return (
        <Layout>
            <HeroSection />
      <WhenVisible>
        <StatsSection />
      </WhenVisible>
      <WhenVisible>
        <AboutSection />
      </WhenVisible>
      <WhenVisible>
        <ServicesSection />
      </WhenVisible>
      <WhenVisible>
        <ProjectsSection />
      </WhenVisible>
      <WhenVisible>
        <ClientsSection />
      </WhenVisible>
      <WhenVisible>
        <CTASection />
      </WhenVisible>
        </Layout>
    );
}
