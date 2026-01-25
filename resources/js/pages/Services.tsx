import React, { useState } from 'react';
import { Building2, Zap, Users, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import WhenVisible from '@/components/ui/when-visible';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Services() {
    const { t, language, direction } = useLanguage();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const toggleRow = (index: number) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedRows(newExpanded);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast({
            title: language === 'en' ? 'Request Submitted' : 'تم إرسال الطلب',
            description: language === 'en' ? 'We will contact you soon.' : 'سنتواصل معك قريبًا.',
        });

        setIsSubmitting(false);
        (e.target as HTMLFormElement).reset();
    };

    // Cleaning Services Scope Matrix
    const cleaningMatrix = [
        {
            category: language === 'en' ? 'Office Cleaning' : 'تنظيف المكاتب',
            services: language === 'en'
                ? [
                      'Daily office cleaning',
                      'Carpet and upholstery cleaning',
                      'Window cleaning',
                      'Restroom maintenance',
                      'Waste management',
                      'Floor care and polishing',
                  ]
                : [
                      'تنظيف المكاتب اليومي',
                      'تنظيف السجاد والأثاث',
                      'تنظيف النوافذ',
                      'صيانة دورات المياه',
                      'إدارة النفايات',
                      'العناية بالأرضيات وتلميعها',
                  ],
        },
        {
            category: language === 'en' ? 'Industrial Cleaning' : 'التنظيف الصناعي',
            services: language === 'en'
                ? [
                      'Factory floor cleaning',
                      'Equipment cleaning',
                      'Hazardous waste handling',
                      'High-pressure washing',
                      'Tank and vessel cleaning',
                      'Industrial degreasing',
                  ]
                : [
                      'تنظيف أرضيات المصانع',
                      'تنظيف المعدات',
                      'معالجة النفايات الخطرة',
                      'الغسيل بالضغط العالي',
                      'تنظيف الخزانات والأوعية',
                      'إزالة الشحوم الصناعية',
                  ],
        },
        {
            category: language === 'en' ? 'Post-Construction Cleaning' : 'التنظيف بعد البناء',
            services: language === 'en'
                ? [
                      'Construction debris removal',
                      'Final cleaning and polishing',
                      'Window and glass cleaning',
                      'Floor deep cleaning',
                      'Sanitization',
                      'Waste disposal',
                  ]
                : [
                      'إزالة مخلفات البناء',
                      'التنظيف النهائي والتلميع',
                      'تنظيف النوافذ والزجاج',
                      'التنظيف العميق للأرضيات',
                      'التعقيم',
                      'التخلص من النفايات',
                  ],
        },
    ];

    // Manpower Categories Table Data
    const manpowerCategories = [
        {
            category: language === 'en' ? 'Project Managers' : 'مديرو المشاريع',
            shortTerm: '✓',
            longTerm: '✓',
            projectBased: '✓',
        },
        {
            category: language === 'en' ? 'Engineers' : 'المهندسون',
            shortTerm: '✓',
            longTerm: '✓',
            projectBased: '✓',
        },
        {
            category: language === 'en' ? 'Supervisors' : 'المشرفون',
            shortTerm: '✓',
            longTerm: '✓',
            projectBased: '✓',
        },
        {
            category: language === 'en' ? 'Skilled Workers' : 'العمال المهرة',
            shortTerm: '✓',
            longTerm: '✓',
            projectBased: '✓',
        },
        {
            category: language === 'en' ? 'Semi-skilled Workers' : 'العمال شبه المهرة',
            shortTerm: '✓',
            longTerm: '✓',
            projectBased: '✓',
        },
        {
            category: language === 'en' ? 'Male Cleaners' : 'عمال النظافة (ذكور)',
            shortTerm: '✓',
            longTerm: '✓',
            projectBased: '✓',
        },
        {
            category: language === 'en' ? 'Female Cleaners' : 'عمال النظافة (إناث)',
            shortTerm: '✓',
            longTerm: '✓',
            projectBased: '✓',
        },
    ];

    return (
        <Layout>
            {/* Hero */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    }}
                />
                <div className="hero-overlay absolute inset-0" />
                
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                        }}
                    />
                </div>

                <div className="container-custom relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-4 text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl">
                            {t('services.page.title')}
                        </h1>
                        <p className="text-xl text-primary-foreground/90">{t('services.page.subtitle')}</p>
                    </div>
                </div>
            </section>

            <div className="section-padding">
                <div className="container-custom space-y-20">
                    {/* General Construction & Civil Works */}
                    <WhenVisible id="construction" className="scroll-mt-24">
                        <section>
                            <div className="mb-8 flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient">
                                    <Building2 className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-foreground">
                                        {t('services.construction.title')}
                                    </h2>
                                    <p className="text-muted-foreground">{t('services.construction.description')}</p>
                                </div>
                            </div>
                            <div className="card-elevated p-8">
                                <ul className="space-y-3">
                                    {(
                                        language === 'en'
                                            ? [
                                                  'Building construction and renovation',
                                                  'Infrastructure development',
                                                  'Road and bridge construction',
                                                  'Site preparation and earthworks',
                                                  'Concrete works',
                                                  'Steel structure installation',
                                                  'Finishing works',
                                              ]
                                            : [
                                                  'بناء وتجديد المباني',
                                                  'تطوير البنية التحتية',
                                                  'بناء الطرق والجسور',
                                                  'إعداد الموقع والأعمال الترابية',
                                                  'أعمال الخرسانة',
                                                  'تركيب الهياكل الفولاذية',
                                                  'أعمال التشطيب',
                                              ]
                                    ).map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* MEP Services */}
                    <WhenVisible id="mep" className="scroll-mt-24">
                        <section>
                            <div className="mb-8 flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient">
                                    <Zap className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-foreground">{t('services.mep.title')}</h2>
                                    <p className="text-muted-foreground">{t('services.mep.description')}</p>
                                </div>
                            </div>
                            <div className="card-elevated p-8">
                                <ul className="space-y-3">
                                    {(
                                        language === 'en'
                                            ? [
                                                  'Electrical installation and maintenance',
                                                  'HVAC systems installation',
                                                  'Plumbing and water systems',
                                                  'Fire safety systems',
                                                  'Low voltage systems',
                                                  'Building automation',
                                                  'MEP maintenance and repair',
                                              ]
                                            : [
                                                  'تركيب وصيانة الكهرباء',
                                                  'تركيب أنظمة التكييف والتهوية',
                                                  'السباكة وأنظمة المياه',
                                                  'أنظمة السلامة من الحرائق',
                                                  'أنظمة الجهد المنخفض',
                                                  'أتمتة المباني',
                                                  'صيانة وإصلاح الميكانيكا والكهرباء',
                                              ]
                                    ).map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Manpower Solutions */}
                    <WhenVisible id="manpower" className="scroll-mt-24">
                        <section>
                            <div className="mb-8 flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient">
                                    <Users className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-foreground">
                                        {t('services.manpower.title')}
                                    </h2>
                                    <p className="text-muted-foreground">{t('services.manpower.description')}</p>
                                </div>
                            </div>

                            <div className="card-elevated overflow-hidden p-8">
                                <div className="mb-6">
                                    <h3 className="mb-4 text-xl font-semibold text-foreground">
                                        {language === 'en' ? 'Manpower Categories & Deployment Options' : 'فئات القوى العاملة وخيارات النشر'}
                                    </h3>
                                </div>

                                {/* Desktop Table */}
                                <div className="hidden overflow-x-auto lg:block">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-border bg-muted/50">
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                                                    {language === 'en' ? 'Category' : 'الفئة'}
                                                </th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                                                    {language === 'en' ? 'Short-term' : 'قصير الأجل'}
                                                </th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                                                    {language === 'en' ? 'Long-term' : 'طويل الأجل'}
                                                </th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                                                    {language === 'en' ? 'Project-based' : 'قائم على المشروع'}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {manpowerCategories.map((row, i) => (
                                                <tr key={i} className="border-b border-border">
                                                    <td className="px-4 py-3 text-sm text-foreground">{row.category}</td>
                                                    <td className="px-4 py-3 text-center text-primary">{row.shortTerm}</td>
                                                    <td className="px-4 py-3 text-center text-primary">{row.longTerm}</td>
                                                    <td className="px-4 py-3 text-center text-primary">{row.projectBased}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Accordion */}
                                <div className="lg:hidden space-y-2">
                                    {manpowerCategories.map((row, i) => (
                                        <div key={i} className="border border-border rounded-lg overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() => toggleRow(i)}
                                                className="w-full px-4 py-3 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
                                            >
                                                <span className="font-medium text-foreground">{row.category}</span>
                                                <span className="text-primary">
                                                    {expandedRows.has(i) ? '−' : '+'}
                                                </span>
                                            </button>
                                            {expandedRows.has(i) && (
                                                <div className="px-4 py-3 space-y-2 bg-card">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            {language === 'en' ? 'Short-term' : 'قصير الأجل'}
                                                        </span>
                                                        <span className="text-primary">{row.shortTerm}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            {language === 'en' ? 'Long-term' : 'طويل الأجل'}
                                                        </span>
                                                        <span className="text-primary">{row.longTerm}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            {language === 'en' ? 'Project-based' : 'قائم على المشروع'}
                                                        </span>
                                                        <span className="text-primary">{row.projectBased}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-6 border-t border-border">
                                    <a
                                        href="/manpower-request-form.pdf"
                                        download
                                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                                    >
                                        <Download className="h-4 w-4" />
                                        <span>{language === 'en' ? 'Download Manpower Request Form' : 'تحميل نموذج طلب القوى العاملة'}</span>
                                    </a>
                                </div>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Dedicated Cleaning Services */}
                    <WhenVisible id="cleaning" className="scroll-mt-24">
                        <section>
                            <div className="mb-8 flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient">
                                    <Sparkles className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-foreground">
                                        {t('services.cleaning.title')}
                                    </h2>
                                    <p className="text-muted-foreground">{t('services.cleaning.description')}</p>
                                </div>
                            </div>

                            <div className="card-elevated overflow-hidden p-8">
                                <h3 className="mb-6 text-xl font-semibold text-foreground">
                                    {language === 'en' ? 'Cleaning Services Scope Matrix' : 'مصفوفة نطاق خدمات التنظيف'}
                                </h3>

                                {/* Desktop Table */}
                                <div className="hidden overflow-x-auto lg:block">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-border bg-muted/50">
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                                                    {language === 'en' ? 'Service Category' : 'فئة الخدمة'}
                                                </th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                                                    {language === 'en' ? 'Services' : 'الخدمات'}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cleaningMatrix.map((row, i) => (
                                                <tr key={i} className="border-b border-border">
                                                    <td className="px-4 py-3 text-sm font-medium text-foreground align-top">
                                                        {row.category}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <ul className="space-y-1">
                                                            {row.services.map((service, j) => (
                                                                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                                    <span className="text-primary mt-1">•</span>
                                                                    <span>{service}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Accordion */}
                                <div className="lg:hidden space-y-2">
                                    {cleaningMatrix.map((row, i) => (
                                        <div key={i} className="border border-border rounded-lg overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() => toggleRow(i + 100)}
                                                className="w-full px-4 py-3 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
                                            >
                                                <span className="font-medium text-foreground">{row.category}</span>
                                                <span className="text-primary">
                                                    {expandedRows.has(i + 100) ? '−' : '+'}
                                                </span>
                                            </button>
                                            {expandedRows.has(i + 100) && (
                                                <div className="px-4 py-3 space-y-2 bg-card">
                                                    <ul className="space-y-2">
                                                        {row.services.map((service, j) => (
                                                            <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                                <span className="text-primary mt-1">•</span>
                                                                <span>{service}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </WhenVisible>

                    {/* Request Form */}
                    <WhenVisible className="scroll-mt-24">
                        <section className="card-elevated p-8">
                            <h2 className="mb-6 text-2xl font-bold text-foreground">
                                {language === 'en' ? 'Request Manpower / Quote' : 'طلب القوى العاملة / عرض سعر'}
                            </h2>
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="company">
                                            {language === 'en' ? 'Company Name' : 'اسم الشركة'}
                                        </Label>
                                        <Input id="company" name="company" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact">
                                            {language === 'en' ? 'Contact Person' : 'الشخص المسؤول'}
                                        </Label>
                                        <Input id="contact" name="contact" required />
                                    </div>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                                        </Label>
                                        <Input id="email" name="email" type="email" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">
                                            {language === 'en' ? 'Phone' : 'الهاتف'}
                                        </Label>
                                        <Input id="phone" name="phone" type="tel" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="serviceType">
                                        {language === 'en' ? 'Service Type' : 'نوع الخدمة'}
                                    </Label>
                                    <Select name="serviceType" required>
                                        <SelectTrigger id="serviceType">
                                            <SelectValue placeholder={language === 'en' ? 'Select service...' : 'اختر الخدمة...'} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="construction">{t('services.construction.title')}</SelectItem>
                                            <SelectItem value="mep">{t('services.mep.title')}</SelectItem>
                                            <SelectItem value="manpower">{t('services.manpower.title')}</SelectItem>
                                            <SelectItem value="cleaning">{t('services.cleaning.title')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="startDate">
                                        {language === 'en' ? 'Preferred Start Date' : 'تاريخ البدء المفضل'}
                                    </Label>
                                    <Input id="startDate" name="startDate" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="requirement">
                                        {language === 'en' ? 'Requirement Details' : 'تفاصيل المتطلبات'}
                                    </Label>
                                    <Textarea id="requirement" name="requirement" rows={4} />
                                </div>
                                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                                    {isSubmitting
                                        ? language === 'en'
                                            ? 'Submitting...'
                                            : 'جاري الإرسال...'
                                        : language === 'en'
                                            ? 'Submit Request'
                                            : 'إرسال الطلب'}
                                </Button>
                            </form>
                        </section>
                    </WhenVisible>
                </div>
            </div>
        </Layout>
    );
}
