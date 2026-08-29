import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { usePage, router } from '@inertiajs/react';

interface Language {
    code: string;
    name: string;
    native_name: string;
    direction: 'ltr' | 'rtl';
    flag?: string;
    is_default: boolean;
}

type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
    language: string;
    direction: Direction;
    languages: Language[];
    setLanguage: (code: string) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.services': 'Services',
        'nav.hseContact': 'HSE',

        // Hero
        'hero.title': 'Your Trusted Partner in Construction and Workforce Solutions',
        'hero.subtitle': 'Arkaan Construction Company',
        'hero.description':
            'Delivering reliable civil construction, MEP, manpower supply, and dedicated cleaning services to clients across the Kingdom of Saudi Arabia.',
        'hero.cta.primary': 'Get a Quote',
        'hero.cta.secondary': 'Download Company Profile',
        'hero.tagline': 'Your Trusted Partner in Construction and Workforce Solutions',

        // Stats
        'stats.years': 'Years Experience',
        'stats.workers': 'Workers Deployed',
        'stats.projects': 'Projects Completed',
        'stats.clients': 'Satisfied Clients',

        // About Section
        'about.title': "Building Saudi Arabia's Future",
        'about.subtitle': 'Together',
        'about.description':
            'ARKAAN CONSTRUCTION COMPANY is a leading construction and manpower solutions provider delivering high-quality engineering, construction, and workforce services across the Kingdom of Saudi Arabia.',
        'about.cta': 'Learn More About Us',

        // Services
        'services.title': 'Our Services',
        'services.subtitle': 'Civil Construction, MEP, Manpower & Cleaning',
        'services.summary.manpower': 'Manpower Supply',
        'services.summary.construction': 'Civil & Construction',
        'services.summary.cleaning': 'Dedicated Cleaning Services',
        'services.construction.title': 'Civil & Construction',
        'services.construction.description': 'Complete general construction and civil engineering services, from planning to handover.',
        'services.mep.title': 'MEP (Mechanical, Electrical & Plumbing)',
        'services.mep.description': 'Electrical, plumbing, HVAC, and testing & commissioning solutions.',
        'services.manpower.title': 'Manpower Supply',
        'services.manpower.description': 'Skilled, semi-skilled, and general workforce deployment.',
        'services.cleaning.title': 'Dedicated Cleaning Services',
        'services.cleaning.description': 'Professional cleaning for offices, industrial sites, and post-construction handover.',

        // Projects
        'projects.title': 'Our Projects',
        'projects.subtitle': 'Excellence Across Saudi Arabia',
        'projects.viewAll': 'View All Projects',

        // Clients
        'clients.title': 'Trusted By Industry Leaders',
        'clients.subtitle': 'Building Long-term Partnerships',

        // CTA Section
        'cta.title': 'Ready to Start Your Project?',
        'cta.description':
            'Get in touch with our team to discuss your construction or manpower requirements. We provide customized solutions for projects of any size.',
        'cta.button': 'Contact Us Today',

        // Footer
        'footer.description': 'Your trusted partner for civil construction, MEP, manpower supply, and dedicated cleaning services across the Kingdom of Saudi Arabia.',
        'footer.quickLinks': 'Quick Links',
        'footer.services': 'Services',
        'footer.contact': 'Contact Us',
        'footer.rights': 'All rights reserved.',
        'footer.address': 'AL Jubail, Kingdom of Saudi Arabia',
        'footer.cr.label': 'CR No.',
        'footer.cr.number': 'To be added from PDF',
        'footer.vat.label': 'VAT No.',
        'footer.vat.number': 'To be added from PDF',
        'footer.downloadProfile': 'Download Company Profile',

        // About Page
        'about.page.title': 'About Arkaan Construction Company',
        'about.page.subtitle': 'A leading construction and manpower solutions provider across the Kingdom of Saudi Arabia.',
        'about.mission.title': 'Our Mission',
        'about.mission.text':
            'To deliver high-quality, reliable construction and manpower solutions through technical excellence, operational efficiency, and unwavering integrity — completing every project safely, on time, and within budget.',
        'about.vision.title': 'Our Vision',
        'about.vision.text':
            "To be a recognized leader and preferred partner in Saudi Arabia's construction and manpower sectors, aligned with Saudi Vision 2030, known for excellence, reliability, and value.",
        'about.values.title': 'Our Core Values',
        'about.values.safety': 'Safety',
        'about.values.safety.desc': 'Safety is our highest priority, backed by a strong Health, Safety, and Environmental (HSE) culture.',
        'about.values.integrity': 'Integrity',
        'about.values.integrity.desc': 'Honest, transparent, and ethical business practices in everything we do.',
        'about.values.quality': 'Quality',
        'about.values.quality.desc': 'Superior workmanship that consistently meets or exceeds client expectations.',
        'about.values.reliability': 'Reliability',
        'about.values.reliability.desc': 'Dependable services and timely project execution with consistency.',
        'about.values.compliance': 'Compliance',
        'about.values.compliance.desc': 'Full adherence to Saudi laws, regulations, and client specifications.',

        // About Leaders
        'about.leaders.title': 'Leadership',
        'about.leaders.subtitle': 'Experienced leadership guiding Arkaan Construction Company forward.',

        // Services Page
        'services.page.title': 'Our Services',
        'services.page.subtitle': 'Civil Construction, MEP, Manpower Supply & Dedicated Cleaning',

        // Capabilities (Projects) Page
        'projects.page.title': 'Deployment Capability & Compliance',
        'projects.page.subtitle': 'How we mobilize, manage, and ensure compliant workforce delivery',
        'projects.filter.all': 'All',
        'projects.filter.allProjects': 'All Projects',
        'projects.filter.construction': 'Construction',
        'projects.filter.infrastructure': 'Infrastructure',
        'projects.filter.commercial': 'Commercial',
        'projects.filter.residential': 'Residential',
        'projects.filter.industrial': 'Industrial',

        // Clients Page
        'clients.page.title': 'Our Clients & Industry Footprint',
        'clients.page.subtitle': 'Serving government, semi-government, industrial, and private sector clients',

        // Careers Page
        'careers.title': 'Join Our Team',
        'careers.subtitle': 'Build Your Career With Us',
        'careers.skilled.title': 'For Skilled Workers',
        'careers.skilled.description':
            'Engineers, technicians, operators, and supervisors - we offer competitive packages and growth opportunities.',
        'careers.unskilled.title': 'For General Workers',
        'careers.unskilled.description':
            'Join our workforce team with stable employment, safety training, and fair compensation.',
        'careers.form.title': 'Apply Now',
        'careers.form.name': 'Full Name',
        'careers.form.phone': 'Phone Number',
        'careers.form.email': 'Email Address',
        'careers.form.nationality': 'Nationality',
        'careers.form.skill': 'Skill Category',
        'careers.form.cv': 'Upload CV',
        'careers.form.submit': 'Submit Application',
        'careers.form.success': 'Application submitted successfully!',

        // Contact Page
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Get In Touch With Our Team',
        'contact.form.name': 'Your Name',
        'contact.form.company': 'Company Name',
        'contact.form.email': 'Email Address',
        'contact.form.phone': 'Phone Number',
        'contact.form.message': 'Your Message',
        'contact.form.submit': 'Send Message',
        'contact.form.success': 'Message sent successfully!',
        'contact.info.title': 'Contact Information',
        'contact.info.address': 'Office Address',
        'contact.info.phone': 'Phone',
        'contact.info.email': 'Email',
        'contact.info.hours': 'Business Hours',
        'contact.info.hours.value': 'Sun - Thu: 8:00 AM - 5:00 PM',
    },
    ar: {
        // Navigation
        'nav.home': 'الرئيسية',
        'nav.about': 'من نحن',
        'nav.services': 'خدماتنا',
        'nav.hseContact': 'السلامة والاتصال',

        // Hero
        'hero.title': 'شريككم الموثوق في حلول البناء والقوى العاملة',
        'hero.subtitle': 'شركة أركان للمقاولات',
        'hero.description':
            'نقدّم خدمات موثوقة في البناء المدني والأعمال الكهروميكانيكية وتوريد القوى العاملة والتنظيف المخصص لعملائنا في جميع أنحاء المملكة العربية السعودية.',
        'hero.cta.primary': 'احصل على عرض سعر',
        'hero.cta.secondary': 'تحميل الملف التعريفي',
        'hero.tagline': 'شريككم الموثوق في حلول البناء والقوى العاملة',

        // Stats
        'stats.years': 'سنوات الخبرة',
        'stats.workers': 'عامل تم توظيفهم',
        'stats.projects': 'مشروع مكتمل',
        'stats.clients': 'عميل راضٍ',

        // About Section
        'about.title': 'نبني مستقبل المملكة العربية السعودية',
        'about.subtitle': 'معًا',
        'about.description':
            'شركة أركان للمقاولات هي مزود رائد لحلول البناء والقوى العاملة، تقدّم خدمات هندسية وإنشائية وقوى عاملة عالية الجودة في جميع أنحاء المملكة العربية السعودية.',
        'about.cta': 'اعرف المزيد عنا',

        // Services
        'services.title': 'خدماتنا',
        'services.subtitle': 'البناء المدني والأعمال الكهروميكانيكية والقوى العاملة والتنظيف',
        'services.summary.manpower': 'توريد القوى العاملة',
        'services.summary.construction': 'الأعمال المدنية والبناء',
        'services.summary.cleaning': 'خدمات التنظيف المخصصة',
        'services.construction.title': 'الأعمال المدنية والبناء',
        'services.construction.description': 'خدمات بناء عام وهندسة مدنية متكاملة، من التخطيط وحتى التسليم.',
        'services.mep.title': 'الأعمال الكهروميكانيكية (ميكانيكا وكهرباء وسباكة)',
        'services.mep.description': 'حلول كهربائية وسباكة وتكييف وفحص وتشغيل.',
        'services.manpower.title': 'توريد القوى العاملة',
        'services.manpower.description': 'نشر قوى عاملة ماهرة وشبه ماهرة وعامة.',
        'services.cleaning.title': 'خدمات التنظيف المخصصة',
        'services.cleaning.description': 'تنظيف احترافي للمكاتب والمواقع الصناعية وتسليم ما بعد البناء.',

        // Projects
        'projects.title': 'مشاريعنا',
        'projects.subtitle': 'التميز في جميع أنحاء المملكة العربية السعودية',
        'projects.viewAll': 'عرض جميع المشاريع',

        // Clients
        'clients.title': 'موثوق من قبل رواد الصناعة',
        'clients.subtitle': 'بناء شراكات طويلة الأمد',

        // CTA Section
        'cta.title': 'هل أنت مستعد لبدء مشروعك؟',
        'cta.description':
            'تواصل مع فريقنا لمناقشة متطلبات مشروعك الإنشائي أو احتياجاتك من القوى العاملة. نقدم حلولاً مخصصة للمشاريع من أي حجم.',
        'cta.button': 'تواصل معنا اليوم',

        // Footer
        'footer.description': 'شريككم الموثوق لخدمات البناء المدني والأعمال الكهروميكانيكية وتوريد القوى العاملة والتنظيف المخصص في المملكة العربية السعودية.',
        'footer.quickLinks': 'روابط سريعة',
        'footer.services': 'الخدمات',
        'footer.contact': 'اتصل بنا',
        'footer.rights': 'جميع الحقوق محفوظة.',
        'footer.address': 'الجبيل، المملكة العربية السعودية',
        'footer.cr.label': 'رقم السجل التجاري',
        'footer.cr.number': 'سيتم إضافته من ملف PDF',
        'footer.vat.label': 'رقم ضريبة القيمة المضافة',
        'footer.vat.number': 'سيتم إضافته من ملف PDF',
        'footer.downloadProfile': 'تحميل الملف التعريفي للشركة',

        // About Page
        'about.page.title': 'عن شركة أركان للمقاولات',
        'about.page.subtitle': 'مزود رائد لحلول البناء والقوى العاملة في جميع أنحاء المملكة العربية السعودية.',
        'about.mission.title': 'مهمتنا',
        'about.mission.text':
            'تقديم حلول بناء وقوى عاملة موثوقة وعالية الجودة من خلال التميز الفني والكفاءة التشغيلية والنزاهة الثابتة — لإتمام كل مشروع بأمان وفي الوقت المحدد وضمن الميزانية.',
        'about.vision.title': 'رؤيتنا',
        'about.vision.text':
            'أن نكون رائدين معترفاً بنا وشريكاً مفضلاً في قطاعي البناء والقوى العاملة في المملكة العربية السعودية، منسجمين مع رؤية السعودية 2030، ومعروفين بالتميز والموثوقية والقيمة.',
        'about.values.title': 'قيمنا الأساسية',
        'about.values.safety': 'السلامة',
        'about.values.safety.desc': 'السلامة هي أولويتنا القصوى، بدعم من ثقافة قوية للصحة والسلامة والبيئة.',
        'about.values.integrity': 'النزاهة',
        'about.values.integrity.desc': 'ممارسات تجارية صادقة وشفافة وأخلاقية في كل ما نقوم به.',
        'about.values.quality': 'الجودة',
        'about.values.quality.desc': 'حرفية متميزة تلبي أو تتجاوز توقعات العملاء باستمرار.',
        'about.values.reliability': 'الموثوقية',
        'about.values.reliability.desc': 'خدمات موثوقة وتنفيذ للمشاريع في وقتها بثبات.',
        'about.values.compliance': 'الامتثال',
        'about.values.compliance.desc': 'الالتزام الكامل بأنظمة المملكة ومواصفات العملاء.',

        // About Leaders
        'about.leaders.title': 'القيادة',
        'about.leaders.subtitle': 'قيادة ذات خبرة تقود شركة أركان للمقاولات نحو المستقبل.',

        // Services Page
        'services.page.title': 'خدماتنا',
        'services.page.subtitle': 'البناء المدني والأعمال الكهروميكانيكية وتوريد القوى العاملة والتنظيف المخصص',

        // Capabilities (Projects) Page
        'projects.page.title': 'قدرة النشر والامتثال',
        'projects.page.subtitle': 'كيف نعبئ وندير القوى العاملة ونضمن الامتثال في تسليمها',
        'projects.filter.all': 'الكل',
        'projects.filter.allProjects': 'جميع المشاريع',
        'projects.filter.construction': 'البناء',
        'projects.filter.infrastructure': 'البنية التحتية',
        'projects.filter.commercial': 'تجاري',
        'projects.filter.residential': 'سكني',
        'projects.filter.industrial': 'صناعي',

        // Clients Page
        'clients.page.title': 'عملاؤنا وحضورنا في الصناعة',
        'clients.page.subtitle': 'نخدم عملاء القطاعات الحكومية وشبه الحكومية والصناعية والخاصة',

        // Careers Page
        'careers.title': 'انضم إلى فريقنا',
        'careers.subtitle': 'ابنِ مستقبلك المهني معنا',
        'careers.skilled.title': 'للعمال المهرة',
        'careers.skilled.description':
            'المهندسون والفنيون والمشغلون والمشرفون - نقدم حزم تنافسية وفرص نمو.',
        'careers.unskilled.title': 'للعمال العامين',
        'careers.unskilled.description':
            'انضم إلى فريق القوى العاملة لدينا مع توظيف مستقر وتدريب على السلامة وتعويض عادل.',
        'careers.form.title': 'قدم الآن',
        'careers.form.name': 'الاسم الكامل',
        'careers.form.phone': 'رقم الهاتف',
        'careers.form.email': 'البريد الإلكتروني',
        'careers.form.nationality': 'الجنسية',
        'careers.form.skill': 'فئة المهارة',
        'careers.form.cv': 'تحميل السيرة الذاتية',
        'careers.form.submit': 'إرسال الطلب',
        'careers.form.success': 'تم إرسال الطلب بنجاح!',

        // Contact Page
        'contact.title': 'اتصل بنا',
        'contact.subtitle': 'تواصل مع فريقنا',
        'contact.form.name': 'اسمك',
        'contact.form.company': 'اسم الشركة',
        'contact.form.email': 'البريد الإلكتروني',
        'contact.form.phone': 'رقم الهاتف',
        'contact.form.message': 'رسالتك',
        'contact.form.submit': 'إرسال الرسالة',
        'contact.form.success': 'تم إرسال الرسالة بنجاح!',
        'contact.info.title': 'معلومات الاتصال',
        'contact.info.address': 'عنوان المكتب',
        'contact.info.phone': 'الهاتف',
        'contact.info.email': 'البريد الإلكتروني',
        'contact.info.hours': 'ساعات العمل',
        'contact.info.hours.value': 'الأحد - الخميس: 8:00 صباحًا - 5:00 مساءً',
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const { props } = usePage();
    const rawLanguages = props.languages;
    const availableLanguages = Array.isArray(rawLanguages) ? rawLanguages : [];
    const defaultLang = (props.defaultLanguage as { code: string; direction: Direction }) || { code: 'en', direction: 'ltr' };
    const currentLocale = (props.locale as string) || defaultLang.code;

    const [language, setLanguageState] = useState<string>(currentLocale);
    
    // Find current language details
    const currentLanguage = availableLanguages.find(lang => lang.code === language) || availableLanguages.find(lang => lang.is_default) || availableLanguages[0] || { code: 'en', direction: 'ltr' as Direction };
    const direction: Direction = currentLanguage?.direction || 'ltr';

    // Update language when locale changes from backend
    useEffect(() => {
        if (currentLocale && currentLocale !== language) {
            setLanguageState(currentLocale);
        }
    }, [currentLocale]);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = direction;
    }, [language, direction]);

    const setLanguage = (code: string): void => {
        setLanguageState(code);
        // Switch language via backend to persist in session
        router.get(`/language/${code}`, {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['locale', 'languages', 'defaultLanguage'],
        });
    };

    const t = (key: string): string => {
        // Fallback to hardcoded translations for now
        const lang = language as 'en' | 'ar';
        if (translations[lang] && translations[lang][key]) {
            return translations[lang][key];
        }
        // Try English as fallback
        if (translations.en && translations.en[key]) {
            return translations.en[key];
        }
        return key;
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                direction,
                languages: availableLanguages.length > 0 ? availableLanguages : [
                    { code: 'en', name: 'English', native_name: 'English', direction: 'ltr' as Direction, is_default: true },
                    { code: 'ar', name: 'Arabic', native_name: 'العربية', direction: 'rtl' as Direction, is_default: false },
                ],
                setLanguage,
                t,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage(): LanguageContextType {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }

    return context;
}

