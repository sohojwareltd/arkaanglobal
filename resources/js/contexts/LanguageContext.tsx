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
        'nav.hseContact': 'HSE & Contact',

        // Hero
        'hero.title': 'Strength in People, Precision in Work',
        'hero.subtitle': 'Arkaan Global Contracting',
        'hero.description':
            'Your trusted partner for construction, MEP, manpower, and cleaning services across Saudi Arabia.',
        'hero.cta.primary': 'Get Quote',
        'hero.cta.secondary': 'Download Profile',
        'hero.tagline': 'Strength in People, Precision in Work',

        // Stats
        'stats.years': 'Years Experience',
        'stats.workers': 'Workers Deployed',
        'stats.projects': 'Projects Completed',
        'stats.clients': 'Satisfied Clients',

        // About Section
        'about.title': "Building Saudi Arabia's Future",
        'about.subtitle': 'Together',
        'about.description':
            'We are a leading manpower supply company specializing in the construction sector, providing comprehensive workforce solutions to major contractors and developers across the Kingdom.',
        'about.cta': 'Learn More About Us',

        // Services
        'services.title': 'Our Services',
        'services.subtitle': 'Comprehensive Solutions',
        'services.summary.manpower': 'Manpower Solutions',
        'services.summary.construction': 'Construction & MEP',
        'services.summary.cleaning': 'Post-construction Cleaning',
        'services.construction.title': 'General Construction & Civil Works',
        'services.construction.description': 'Complete construction and civil engineering services.',
        'services.mep.title': 'MEP Services',
        'services.mep.description': 'Mechanical, Electrical, and Plumbing solutions.',
        'services.manpower.title': 'Manpower Solutions',
        'services.manpower.description': 'Comprehensive workforce deployment services.',
        'services.cleaning.title': 'Dedicated Cleaning Services',
        'services.cleaning.description': 'Professional cleaning and maintenance solutions.',

        // Projects
        'projects.title': 'Our Projects',
        'projects.subtitle': 'Excellence Across Saudi Arabia',
        'projects.viewAll': 'View All Projects',

        // Clients
        'clients.title': 'Trusted By Industry Leaders',
        'clients.subtitle': 'Building Long-term Partnerships',

        // CTA Section
        'cta.title': 'Ready to Scale Your Workforce?',
        'cta.description':
            'Get in touch with our team to discuss your manpower requirements. We provide customized solutions for projects of any size.',
        'cta.button': 'Contact Us Today',

        // Footer
        'footer.description': 'Your trusted partner for construction manpower solutions in Saudi Arabia.',
        'footer.quickLinks': 'Quick Links',
        'footer.services': 'Services',
        'footer.contact': 'Contact Us',
        'footer.rights': 'All rights reserved.',
        'footer.address': 'Jubail, Saudi Arabia',
        'footer.cr.label': 'CR No.',
        'footer.cr.number': 'To be added from PDF',
        'footer.vat.label': 'VAT No.',
        'footer.vat.number': 'To be added from PDF',
        'footer.downloadProfile': 'Download Company Profile',

        // About Page
        'about.page.title': 'About Our Company',
        'about.page.subtitle': 'Your trusted partner for construction, MEP, manpower, and cleaning services across Saudi Arabia.',
        'about.mission.title': 'Our Mission',
        'about.mission.text':
            'To provide reliable, skilled, and compliant workforce solutions that empower construction companies to deliver their projects on time and within budget.',
        'about.vision.title': 'Our Vision',
        'about.vision.text':
            "To be the most trusted manpower partner in Saudi Arabia's construction industry, known for quality, safety, and reliability.",
        'about.values.title': 'Our Core Values',
        'about.values.safety': 'Safety First',
        'about.values.safety.desc': 'Zero compromise on worker safety and compliance.',
        'about.values.integrity': 'Integrity',
        'about.values.integrity.desc': 'Honest and transparent business practices.',
        'about.values.quality': 'Quality',
        'about.values.quality.desc': 'Providing highly skilled and trained workers.',
        'about.values.reliability': 'Reliability',
        'about.values.reliability.desc': 'Consistent delivery on all commitments.',
        'about.values.compliance': 'Compliance',
        'about.values.compliance.desc': 'Full adherence to Saudi labor laws.',

        // About Leaders
        'about.leaders.title': 'Our Leaders',
        'about.leaders.subtitle': 'Experienced leadership guiding Arkaan Global Contracting forward.',

        // Services Page
        'services.page.title': 'Our Services',
        'services.page.subtitle': 'Comprehensive Workforce Solutions',

        // Projects Page
        'projects.page.title': 'Our Projects',
        'projects.page.subtitle': 'Delivering Excellence Across the Kingdom',
        'projects.filter.all': 'All',
        'projects.filter.construction': 'Construction',
        'projects.filter.infrastructure': 'Infrastructure',
        'projects.filter.commercial': 'Commercial',
        'projects.filter.industrial': 'Industrial',

        // Clients Page
        'clients.page.title': 'Our Clients',
        'clients.page.subtitle': 'Trusted Partnerships Across Industries',

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
        'hero.title': 'القوة في الناس، الدقة في العمل',
        'hero.subtitle': 'أركان جلوبال للمقاولات',
        'hero.description':
            'شريككم الموثوق لخدمات البناء والميكانيكا والكهرباء والعمالة والتنظيف في جميع أنحاء المملكة العربية السعودية.',
        'hero.cta.primary': 'احصل على عرض سعر',
        'hero.cta.secondary': 'تحميل الملف التعريفي',
        'hero.tagline': 'القوة في الناس، الدقة في العمل',

        // Stats
        'stats.years': 'سنوات الخبرة',
        'stats.workers': 'عامل تم توظيفهم',
        'stats.projects': 'مشروع مكتمل',
        'stats.clients': 'عميل راضٍ',

        // About Section
        'about.title': 'نبني مستقبل المملكة العربية السعودية',
        'about.subtitle': 'معًا',
        'about.description':
            'نحن شركة رائدة في توريد القوى العاملة متخصصة في قطاع البناء، نقدم حلول شاملة للقوى العاملة لكبار المقاولين والمطورين في جميع أنحاء المملكة.',
        'about.cta': 'اعرف المزيد عنا',

        // Services
        'services.title': 'خدماتنا',
        'services.subtitle': 'حلول شاملة',
        'services.summary.manpower': 'حلول القوى العاملة',
        'services.summary.construction': 'البناء والميكانيكا والكهرباء',
        'services.summary.cleaning': 'التنظيف بعد البناء',
        'services.construction.title': 'البناء العام والأعمال المدنية',
        'services.construction.description': 'خدمات البناء والهندسة المدنية الكاملة.',
        'services.mep.title': 'خدمات الميكانيكا والكهرباء',
        'services.mep.description': 'حلول الميكانيكا والكهرباء والسباكة.',
        'services.manpower.title': 'حلول القوى العاملة',
        'services.manpower.description': 'خدمات توفير القوى العاملة الشاملة.',
        'services.cleaning.title': 'خدمات التنظيف المخصصة',
        'services.cleaning.description': 'حلول التنظيف والصيانة المهنية.',

        // Projects
        'projects.title': 'مشاريعنا',
        'projects.subtitle': 'التميز في جميع أنحاء المملكة العربية السعودية',
        'projects.viewAll': 'عرض جميع المشاريع',

        // Clients
        'clients.title': 'موثوق من قبل رواد الصناعة',
        'clients.subtitle': 'بناء شراكات طويلة الأمد',

        // CTA Section
        'cta.title': 'هل أنت مستعد لتوسيع قوتك العاملة؟',
        'cta.description':
            'تواصل مع فريقنا لمناقشة متطلباتك من القوى العاملة. نحن نقدم حلولاً مخصصة للمشاريع من أي حجم.',
        'cta.button': 'تواصل معنا اليوم',

        // Footer
        'footer.description': 'شريككم الموثوق لحلول القوى العاملة في البناء في المملكة العربية السعودية.',
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
        'about.page.title': 'عن شركتنا',
        'about.page.subtitle': 'شريككم الموثوق لخدمات البناء والميكانيكا والكهرباء والعمالة والتنظيف في جميع أنحاء المملكة العربية السعودية.',
        'about.mission.title': 'مهمتنا',
        'about.mission.text':
            'توفير حلول قوى عاملة موثوقة وماهرة ومتوافقة تمكّن شركات البناء من تسليم مشاريعها في الوقت المحدد وضمن الميزانية.',
        'about.vision.title': 'رؤيتنا',
        'about.vision.text':
            'أن نكون الشريك الأكثر موثوقية للقوى العاملة في صناعة البناء في المملكة العربية السعودية، والمعروف بالجودة والسلامة والموثوقية.',
        'about.values.title': 'قيمنا الأساسية',
        'about.values.safety': 'السلامة أولاً',
        'about.values.safety.desc': 'لا تنازل عن سلامة العمال والامتثال.',
        'about.values.integrity': 'النزاهة',
        'about.values.integrity.desc': 'ممارسات تجارية صادقة وشفافة.',
        'about.values.quality': 'الجودة',
        'about.values.quality.desc': 'توفير عمال مهرة ومدربين.',
        'about.values.reliability': 'الموثوقية',
        'about.values.reliability.desc': 'التسليم المستمر لجميع الالتزامات.',
        'about.values.compliance': 'الامتثال',
        'about.values.compliance.desc': 'الالتزام الكامل بقوانين العمل السعودية.',

        // About Leaders
        'about.leaders.title': 'قيادتنا',
        'about.leaders.subtitle': 'قيادة ذات خبرة تقود شركة أركان جلوبال للمقاولات نحو المستقبل.',

        // Services Page
        'services.page.title': 'خدماتنا',
        'services.page.subtitle': 'حلول شاملة للقوى العاملة',

        // Projects Page
        'projects.page.title': 'مشاريعنا',
        'projects.page.subtitle': 'تقديم التميز في جميع أنحاء المملكة',
        'projects.filter.all': 'الكل',
        'projects.filter.construction': 'البناء',
        'projects.filter.infrastructure': 'البنية التحتية',
        'projects.filter.commercial': 'تجاري',
        'projects.filter.industrial': 'صناعي',

        // Clients Page
        'clients.page.title': 'عملاؤنا',
        'clients.page.subtitle': 'شراكات موثوقة عبر الصناعات',

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

