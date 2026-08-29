import React from 'react';

import SectionHeader from '@/components/ui/section-header';
import SectionReveal from '@/components/ui/section-reveal';
import { useLanguage } from '@/contexts/LanguageContext';

interface ClientItem {
    id: number;
    name: string;
    abbr?: string;
    logo?: string;
}

interface ClientsSectionProps {
    clients?: ClientItem[];
    clientCategories?: { id: number; name_en: string; name_ar: string }[];
}

function resolveLogoUrl(logo?: string): string | null {
    if (!logo) {
        return null;
    }
    if (logo.startsWith('http')) {
        return logo;
    }

    return logo.startsWith('/') ? logo : `/storage/${logo}`;
}

function ClientCard({ label, logo }: { label: string; logo: string | null }): JSX.Element {
    return (
        <div className="client-logo-card">
            {logo ? (
                <img src={logo} alt={label} className="client-logo-card__img" loading="lazy" />
            ) : (
                <span className="client-logo-card__text">{label}</span>
            )}
        </div>
    );
}

export default function ClientsSection({ clients = [], clientCategories = [] }: ClientsSectionProps): JSX.Element {
    const { t, language } = useLanguage();

    const displayItems =
        clients.length > 0
            ? clients.map((c) => ({ id: c.id, label: c.name, logo: resolveLogoUrl(c.logo) }))
            : clientCategories.map((c) => ({
                  id: c.id,
                  label: language === 'en' ? c.name_en : c.name_ar,
                  logo: null as string | null,
              }));

    const row1 = [...displayItems, ...displayItems];
    const row2 = [...displayItems.slice().reverse(), ...displayItems.slice().reverse()];

    return (
        <section className="clients-section">
            <div className="clients-section__inner">
                <SectionReveal>
                    <SectionHeader
                        tag={t('clients.title')}
                        title={
                            language === 'en' ? (
                                <>Our <em>Clients</em></>
                            ) : (
                                <>عملاؤ<em>نا</em></>
                            )
                        }
                        subtitle={
                            language === 'en'
                                ? 'Trusted by leading organizations across public and private sectors.'
                                : 'موثوق به من قبل المؤسسات الرائدة في القطاعين العام والخاص.'
                        }
                    />
                </SectionReveal>

                {displayItems.length > 0 && (
                    <div className="clients__viewport">
                        <div className="clients__edge-fade clients__edge-fade--left" />
                        <div className="clients__edge-fade clients__edge-fade--right" />

                        <div className="clients__row">
                            <div className="clients__track clients__track--left">
                                {row1.map((item, index) => (
                                    <ClientCard key={`l-${item.id}-${index}`} label={item.label} logo={item.logo} />
                                ))}
                            </div>
                        </div>

                        <div className="clients__row">
                            <div className="clients__track clients__track--right">
                                {row2.map((item, index) => (
                                    <ClientCard key={`r-${item.id}-${index}`} label={item.label} logo={item.logo} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
