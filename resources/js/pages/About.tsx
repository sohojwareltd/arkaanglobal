import React, { useEffect, useMemo, useState } from 'react';
import { Shield, Heart, Star, Clock, FileCheck, ChevronLeft, ChevronRight, Quote, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import WhenVisible from '@/components/ui/when-visible';
import { cn } from '@/lib/utils';

export default function About() {
    const { t, language, direction } = useLanguage();

    const leaders = [
        {
            name: language === 'en' ? 'Eng. Ahmad Al-Ghamdi' : 'م. أحمد الغامدي',
            role: language === 'en' ? 'Chairman' : 'رئيس مجلس الإدارة',
            image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=900',
            message:
                language === 'en'
                    ? 'At Arkaan Global Contracting, we believe that people are the foundation of every successful project. Our commitment is to deliver manpower solutions that elevate safety, quality, and reliability on every site.'
                    : 'في أركان جلوبال للمقاولات، نؤمن بأن الإنسان هو أساس كل مشروع ناجح. التزامنا هو تقديم حلول قوى عاملة ترفع من مستوى السلامة والجودة والموثوقية في كل موقع.',
        },
        {
            name: language === 'en' ? 'Eng. Faisal Al-Subaie' : 'م. فيصل السبيعي',
            role: language === 'en' ? 'Chief Executive Officer' : 'الرئيس التنفيذي',
            image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=900',
            message:
                language === 'en'
                    ? 'Our vision is to be the most trusted manpower partner in Saudi Arabia, building long-term relationships through transparency, performance, and unwavering support to our clients.'
                    : 'رؤيتنا هي أن نكون الشريك الأكثر موثوقية للقوى العاملة في المملكة العربية السعودية، من خلال بناء علاقات طويلة الأمد قائمة على الشفافية والأداء والدعم المستمر لعملائنا.',
        },
        {
            name: language === 'en' ? 'Eng. Noura Al-Harbi' : 'م. نورة الحربي',
            role: language === 'en' ? 'Operations Director' : 'مدير العمليات',
            image: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=900',
            message:
                language === 'en'
                    ? 'Operational excellence means getting the right people, to the right project, at the right time—with zero compromise on compliance and worker welfare.'
                    : 'التميز التشغيلي يعني إيصال الشخص المناسب إلى المشروع المناسب في الوقت المناسب، دون أي تنازل عن الامتثال أو سلامة العاملين.',
        },
        {
            name: language === 'en' ? 'Eng. Saad Al-Qahtani' : 'م. سعد القحطاني',
            role: language === 'en' ? 'Projects Director' : 'مدير المشاريع',
            image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=900',
            message:
                language === 'en'
                    ? 'Every project we support is a piece of Saudi Arabia’s future. We take pride in deploying teams that deliver safely, on schedule, and to the highest standards.'
                    : 'كل مشروع ندعمه هو جزء من مستقبل المملكة. نفخر بنشر فرق عمل تنجز أعمالها بأمان وفي الوقت المحدد وبأعلى المعايير.',
        },
        {
            name: language === 'en' ? 'Eng. Rania Al-Otaibi' : 'م. رانيا العتيبي',
            role: language === 'en' ? 'HR & Manpower Director' : 'مدير الموارد البشرية والقوى العاملة',
            image: 'https://images.unsplash.com/photo-1525130413817-d45c1d127c42?q=80&w=900',
            message:
                language === 'en'
                    ? 'We invest in our workforce with training, development, and fair opportunities—because empowered people build stronger projects and stronger communities.'
                    : 'نستثمر في كوادرنا من خلال التدريب والتطوير والفرص العادلة، لأن تمكين الأفراد يعني مشاريع أقوى ومجتمعات أقوى.',
        },
        {
            name: language === 'en' ? 'Eng. Mohammed Al-Shahrani' : 'م. محمد الشهراني',
            role: language === 'en' ? 'HSE Director' : 'مدير السلامة والصحة المهنية',
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=900',
            message:
                language === 'en'
                    ? 'For us, safety is not a policy—it is a culture. Every worker returns home safely, and every client can trust that their sites operate with world-class HSE standards.'
                    : 'بالنسبة لنا، السلامة ليست سياسة بل ثقافة. يعود كل عامل إلى منزله بأمان، ويمكن لكل عميل أن يثق بأن مواقع عمله تعمل وفق أعلى معايير السلامة والصحة المهنية.',
        },
    ];

    const [leaderPage, setLeaderPage] = useState(0);
    const [activeLeaderIndex, setActiveLeaderIndex] = useState<number | null>(null);
    const [perPage, setPerPage] = useState(4);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [hasDragged, setHasDragged] = useState(false);

    // Responsive items per page: 1 on mobile, 2 on tablet, 4 on desktop
    useEffect(() => {
        const updatePerPage = () => {
            if (typeof window === 'undefined') {
                return;
            }

            const width = window.innerWidth;

            if (width < 640) {
                setPerPage(1);
            } else if (width < 1024) {
                setPerPage(2);
            } else {
                setPerPage(4);
            }
        };

        updatePerPage();
        window.addEventListener('resize', updatePerPage);

        return () => window.removeEventListener('resize', updatePerPage);
    }, []);

    const totalPages = Math.max(1, Math.ceil(leaders.length / perPage));

    const isMobileLeaders = perPage === 1;

    const translatePercent = useMemo(() => {
        const sign = direction === 'rtl' ? 1 : -1;
        const baseTranslate = sign * leaderPage * 100;
        // Add drag offset for smooth dragging
        const dragOffsetPercent = dragOffset / (typeof window !== 'undefined' ? window.innerWidth : 1) * 100;
        return baseTranslate + (direction === 'rtl' ? -dragOffsetPercent : dragOffsetPercent);
    }, [direction, leaderPage, dragOffset]);

    const handlePrev = () => {
        setLeaderPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    const handleNext = () => {
        setLeaderPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    };

    // Touch gesture handlers
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.targetTouches[0].clientX);
        setIsDragging(true);
        setDragOffset(0);
        setHasDragged(false);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (touchStartX === null) {
            return;
        }
        const currentX = e.targetTouches[0].clientX;
        const diff = currentX - touchStartX;
        setDragOffset(diff);
        if (Math.abs(diff) > 10) {
            setHasDragged(true);
        }
    };

    const onTouchEnd = (endX: number) => {
        if (touchStartX === null) {
            setIsDragging(false);
            setDragOffset(0);
            setTouchStartX(null);
            return;
        }

        const distance = endX - touchStartX;
        const absDistance = Math.abs(distance);

        if (absDistance < minSwipeDistance) {
            setIsDragging(false);
            setDragOffset(0);
            setTouchStartX(null);
            return;
        }

        // Determine swipe direction based on RTL
        const isLeftSwipe = direction === 'rtl' ? distance > 0 : distance < 0;
        
        if (isLeftSwipe) {
            handleNext();
        } else {
            handlePrev();
        }

        setIsDragging(false);
        setDragOffset(0);
        setTouchStartX(null);
        // Reset hasDragged after a short delay to allow click handler to check it
        setTimeout(() => setHasDragged(false), 100);
    };

    // Mouse drag handlers for desktop
    const [mouseStartX, setMouseStartX] = useState<number | null>(null);
    const [isMouseDragging, setIsMouseDragging] = useState(false);

    const onMouseDown = (e: React.MouseEvent) => {
        setIsMouseDragging(true);
        setMouseStartX(e.clientX);
        setDragOffset(0);
        setHasDragged(false);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDragging || mouseStartX === null) {
            return;
        }
        const diff = e.clientX - mouseStartX;
        setDragOffset(diff);
        if (Math.abs(diff) > 10) {
            setHasDragged(true);
        }
    };

    const onMouseUp = () => {
        if (mouseStartX === null) {
            setIsMouseDragging(false);
            setDragOffset(0);
            return;
        }

        const distance = dragOffset;
        const absDistance = Math.abs(distance);
        const minDragDistance = 100; // Slightly higher threshold for mouse

        if (absDistance < minDragDistance) {
            setIsMouseDragging(false);
            setDragOffset(0);
            setMouseStartX(null);
            return;
        }

        // Determine swipe direction based on RTL
        const isLeftSwipe = direction === 'rtl' ? distance > 0 : distance < 0;
        
        if (isLeftSwipe) {
            handleNext();
        } else {
            handlePrev();
        }

        setIsMouseDragging(false);
        setDragOffset(0);
        setMouseStartX(null);
    };

    const onMouseLeave = () => {
        setIsMouseDragging(false);
        setDragOffset(0);
        setMouseStartX(null);
        setTimeout(() => setHasDragged(false), 100);
    };

    // Ensure current page is valid when perPage or leaders change
    useEffect(() => {
        const maxPage = Math.max(0, Math.ceil(leaders.length / perPage) - 1);
        if (leaderPage > maxPage) {
            setLeaderPage(maxPage);
        }
    }, [leaders.length, perPage, leaderPage]);

    // Auto-slide on mobile (1 card per slide). Pause while modal is open.
    useEffect(() => {
        if (!isMobileLeaders) {
            return;
        }

        if (activeLeaderIndex !== null) {
            return;
        }

        const id = window.setInterval(() => {
            setLeaderPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
        }, 4500);

        return () => {
            window.clearInterval(id);
        };
    }, [activeLeaderIndex, isMobileLeaders, totalPages]);

    const values = [
        { icon: Shield, title: t('about.values.safety'), desc: t('about.values.safety.desc') },
        { icon: Heart, title: t('about.values.integrity'), desc: t('about.values.integrity.desc') },
        { icon: Star, title: t('about.values.quality'), desc: t('about.values.quality.desc') },
        { icon: Clock, title: t('about.values.reliability'), desc: t('about.values.reliability.desc') },
        { icon: FileCheck, title: t('about.values.compliance'), desc: t('about.values.compliance.desc') },
    ];

    return (
        <Layout>
            {/* Hero */}
            <section className="py-12 lg:py-16">
                <div className="container-custom">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-4 mt-10  text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                            {t('about.page.title')}
                        </h1>
                        <p className="text-xl text-muted-foreground">{t('about.page.subtitle')}</p>
                    </div>
                </div>
            </section>

            {/* Company Overview */}
            <section className="py-8 lg:py-12">
                <div className="container-custom">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"
                                alt="Construction team"
                                className="aspect-[4/3] w-full rounded-2xl object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="mb-6 text-3xl font-bold text-foreground">
                                {language === 'en' ? 'Who We Are' : 'من نحن'}
                            </h2>
                            <p className="mb-4 text-muted-foreground">
                                {language === 'en'
                                    ? "Established in 2009, we have grown to become one of Saudi Arabia's leading manpower supply companies, specializing in the construction sector. Our deep understanding of the industry, combined with our commitment to quality and compliance, has made us the partner of choice for major contractors and developers."
                                    : 'تأسست في عام 2009، ونمت لتصبح واحدة من الشركات الرائدة في توريد القوى العاملة في المملكة العربية السعودية، متخصصة في قطاع البناء. إن فهمنا العميق للصناعة، جنبًا إلى جنب مع التزامنا بالجودة والامتثال، جعلنا الشريك المفضل لكبار المقاولين والمطورين.'}
                            </p>
                            <p className="text-muted-foreground">
                                {language === 'en'
                                    ? 'We provide comprehensive workforce solutions, from skilled engineers and technicians to general laborers, ensuring our clients have access to the talent they need to complete their projects successfully.'
                                    : 'نحن نقدم حلول شاملة للقوى العاملة، من المهندسين والفنيين المهرة إلى العمال العامين، مما يضمن لعملائنا الوصول إلى المواهب التي يحتاجونها لإكمال مشاريعهم بنجاح.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-8 lg:py-12 bg-muted/30">
                <div className="container-custom">
                    <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
                        {/* Mission */}
                        <div className="group relative overflow-hidden rounded-3xl border border-border/60 shadow-2xl">
                            <div className="relative h-96 lg:h-[500px]">
                                {/* Background Image */}
                                <img
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"
                                    alt="Our Mission"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70" />
                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-background/20 backdrop-blur-sm border border-white/20">
                                        <Star className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
                                        {t('about.mission.title')}
                                    </h3>
                                    <p className="text-lg leading-relaxed text-white/95 lg:text-xl">
                                        {t('about.mission.text')}
                                    </p>
                                </div>
                                {/* Decorative Element */}
                                <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-bl-full blur-3xl" />
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="group relative overflow-hidden rounded-3xl border border-border/60 shadow-2xl">
                            <div className="relative h-96 lg:h-[500px]">
                                {/* Background Image */}
                                <img
                                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"
                                    alt="Our Vision"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-bl from-accent/90 via-accent/80 to-accent/70" />
                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-background/20 backdrop-blur-sm border border-white/20">
                                        <Shield className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
                                        {t('about.vision.title')}
                                    </h3>
                                    <p className="text-lg leading-relaxed text-white/95 lg:text-xl">
                                        {t('about.vision.text')}
                                    </p>
                                </div>
                                {/* Decorative Element */}
                                <div className="absolute top-0 left-0 h-32 w-32 bg-white/10 rounded-br-full blur-3xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Commitment */}
            <section className="py-8 lg:py-12 bg-muted/30">
                <div className="container-custom">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                            {t('about.values.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            {language === 'en'
                                ? 'Every project is built on a foundation of trust, excellence, and unwavering commitment to our core principles.'
                                : 'كل مشروع مبني على أساس من الثقة والتميز والالتزام الثابت بمبادئنا الأساسية.'}
                        </p>
                    </div>

                    {/* Horizontal Scrolling Cards */}
                    <div className="relative">
                        <div className="overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(106, 0, 255, 0.2) transparent' }}>
                            <div className="flex gap-6 lg:gap-8" style={{ width: 'max-content' }}>
                                {values.map((value, index) => (
                                    <div
                                        key={index}
                                        className="group relative flex min-w-[320px] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-border/40 bg-card shadow-lg transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 lg:min-w-[360px]"
                                    >
                                        {/* Background Image with Overlay */}
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"
                                                alt={value.title}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                                            
                                            {/* Icon Badge */}
                                            <div className="absolute bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-xl hero-gradient shadow-xl backdrop-blur-sm border border-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                                <value.icon className="h-7 w-7 text-primary-foreground" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="relative p-6">
                                            <div className="mb-2 flex items-center gap-2">
                                                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <div className="h-px flex-1 bg-border" />
                                            </div>
                                            <h3 className="mb-3 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                                                {value.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {value.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-5">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group flex flex-col items-center rounded-xl border border-border/40 bg-card p-6 text-center transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                            >
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full hero-gradient transition-transform duration-300 group-hover:scale-110">
                                    <value.icon className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div className="text-2xl font-bold text-primary">{index + 1}</div>
                                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    {value.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Leaders – Sliding Row */}
            <section className="relative py-8 lg:py-12 bg-gradient-to-b from-muted/50 via-background to-muted/40">
                <div className="container-custom">
                    <WhenVisible className="mx-auto mb-10 max-w-2xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                            {language === 'en' ? 'Leadership' : 'القيادة'}
                        </p>
                        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                            {t('about.leaders.title')}
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            {t('about.leaders.subtitle')}
                        </p>
                    </WhenVisible>

                    <div className="relative">
                        {/* Slider Controls */}
                        <div className="mb-4 flex items-center justify-end gap-2">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                                aria-label={language === 'en' ? 'Previous leaders' : 'القيادات السابقة'}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                                aria-label={language === 'en' ? 'Next leaders' : 'القيادات التالية'}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Sliding Row – 4 cards at a time on desktop */}
                        <div 
                            className="overflow-hidden mt-4 rounded-3xl backdrop-blur cursor-grab active:cursor-grabbing select-none"
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={(e) => {
                                onTouchEnd(e.changedTouches[0].clientX);
                            }}
                            onMouseDown={onMouseDown}
                            onMouseMove={onMouseMove}
                            onMouseUp={onMouseUp}
                            onMouseLeave={onMouseLeave}
                        >
                            <div
                                className="flex transition-transform duration-700 ease-out"
                                style={{ 
                                    transform: `translateX(${translatePercent}%)`,
                                    transitionDuration: isDragging || isMouseDragging ? '0ms' : '700ms',
                                }}
                            >
                                {Array.from({ length: totalPages }).map((_, pageIndex) => {
                                    const start = pageIndex * perPage;
                                    const pageLeaders = leaders.slice(start, start + perPage);

                                    return (
                                        <div
                                            key={pageIndex}
                                            className="min-w-full px-1"
                                        >
                                            <div className={cn(
                                                'grid gap-6',
                                                isMobileLeaders ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-4',
                                            )}>
                                                {pageLeaders.map((leader, index) => (
                                                    <div
                                                        key={`${leader.name}-${index}`}
                                                        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/60 shadow-md transition-all duration-300 "
                                                        onClick={() => {
                                                            if (!hasDragged) {
                                                                setActiveLeaderIndex(start + index);
                                                            }
                                                        }}
                                                    >
                                                        <div className="relative aspect-[3/4] w-full overflow-hidden">
                                                            <img
                                                                src={leader.image}
                                                                alt={leader.name}
                                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                            {/* Hover Overlay with Name and Position */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
                                                                <h3 className="text-xl font-bold text-white mb-2">
                                                                    {leader.name}
                                                                </h3>
                                                                <p className="text-sm text-white/90 font-medium">
                                                                    {leader.role}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Mobile Indicators */}
                        {isMobileLeaders && totalPages > 1 && (
                            <div className="mt-6 flex items-center justify-center gap-2">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setLeaderPage(i)}
                                        aria-label={
                                            language === 'en'
                                                ? `Go to slide ${i + 1}`
                                                : `الانتقال إلى الشريحة ${i + 1}`
                                        }
                                        className={cn(
                                            'h-2.5 rounded-full transition-all duration-300',
                                            i === leaderPage
                                                ? 'w-8 bg-primary'
                                                : 'w-2.5 bg-border hover:bg-muted-foreground/40',
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Leader Modal */}
                {activeLeaderIndex !== null && leaders[activeLeaderIndex] && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 overflow-y-auto"
                        onClick={() => setActiveLeaderIndex(null)}
                    >
                        <div
                            className="relative mx-auto my-8 flex max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_120px_rgba(0,0,0,0.2)] max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                onClick={() => setActiveLeaderIndex(null)}
                                className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                                aria-label={language === 'en' ? 'Close' : 'إغلاق'}
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <div className="flex max-h-[90vh] flex-col overflow-y-auto md:flex-row">
                                <div className="relative h-80 flex-shrink-0 md:h-auto md:w-80 md:max-h-[90vh]">
                                    <img
                                        src={leaders[activeLeaderIndex].image}
                                        alt={leaders[activeLeaderIndex].name}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 hero-overlay" />
                                    <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 text-white">
                                        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
                                            {language === 'en' ? 'Leadership Message' : 'رسالة القيادة'}
                                        </span>
                                        <h3 className="text-xl font-bold text-white">
                                            {leaders[activeLeaderIndex].name}
                                        </h3>
                                        <p className="text-sm text-white/90">
                                            {leaders[activeLeaderIndex].role}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between p-6 md:p-8 overflow-y-auto bg-card">
                                    <div>
                                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl hero-gradient">
                                            <Quote className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                        <p className="text-base leading-relaxed text-foreground">
                                            {leaders[activeLeaderIndex].message}
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                                        <span>
                                            {language === 'en'
                                                ? 'Guiding the future of Arkaan Global Contracting.'
                                                : 'يقود مستقبل أركان جلوبال للمقاولات.'}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setActiveLeaderIndex(null)}
                                            className="hero-gradient inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                                        >
                                            {language === 'en' ? 'Close Message' : 'إغلاق الرسالة'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </Layout>
    );
}
