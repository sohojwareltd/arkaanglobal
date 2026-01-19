import React, { useState } from 'react';
import { HardHat, Users, Upload, CheckCircle2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function Careers() {
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast({
            title: t('careers.form.success'),
            description: language === 'en' ? 'We will contact you soon.' : 'سنتواصل معك قريبًا.',
        });

        setIsSubmitting(false);
        (e.target as HTMLFormElement).reset();
    };

    const skillCategories =
        language === 'en'
            ? [
                  'Civil Engineer',
                  'Electrical Engineer',
                  'Mechanical Engineer',
                  'Site Supervisor',
                  'Safety Officer',
                  'Crane Operator',
                  'Welder',
                  'Electrician',
                  'General Labor',
                  'Helper',
                  'Driver',
                  'Other',
              ]
            : [
                  'مهندس مدني',
                  'مهندس كهربائي',
                  'مهندس ميكانيكي',
                  'مشرف موقع',
                  'مسؤول سلامة',
                  'مشغل رافعة',
                  'لحّام',
                  'كهربائي',
                  'عامل عام',
                  'مساعد',
                  'سائق',
                  'أخرى',
              ];

    const nationalities =
        language === 'en'
            ? ['Saudi', 'Indian', 'Pakistani', 'Bangladeshi', 'Filipino', 'Egyptian', 'Nepali', 'Indonesian', 'Other']
            : ['سعودي', 'هندي', 'باكستاني', 'بنغلاديشي', 'فلبيني', 'مصري', 'نيبالي', 'إندونيسي', 'أخرى'];

    const benefits =
        language === 'en'
            ? ['Competitive Salary', 'Medical Insurance', 'Annual Leave', 'Safety Training', 'Career Growth', 'Accommodation']
            : ['راتب تنافسي', 'تأمين طبي', 'إجازة سنوية', 'تدريب السلامة', 'نمو وظيفي', 'إقامة'];

    return (
        <Layout>
            {/* Hero */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                <div className="absolute inset-0 hero-gradient opacity-10" />
                <div className="container-custom relative">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                            {t('careers.title')}
                        </h1>
                        <p className="text-xl text-muted-foreground">{t('careers.subtitle')}</p>
                    </div>
                </div>
            </section>

            {/* Career Types */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="mb-16 grid gap-8 md:grid-cols-2">
                        <div className="card-elevated p-8">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl hero-gradient">
                                <HardHat className="h-7 w-7 text-primary-foreground" />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-foreground">{t('careers.skilled.title')}</h3>
                            <p className="mb-6 text-muted-foreground">{t('careers.skilled.description')}</p>
                            <ul className="space-y-2">
                                {benefits.slice(0, 3).map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        <span className="text-foreground">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card-elevated p-8">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl gold-gradient">
                                <Users className="h-7 w-7 text-accent-foreground" />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-foreground">{t('careers.unskilled.title')}</h3>
                            <p className="mb-6 text-muted-foreground">{t('careers.unskilled.description')}</p>
                            <ul className="space-y-2">
                                {benefits.slice(3).map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-accent" />
                                        <span className="text-foreground">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Application Form */}
                    <div className="mx-auto max-w-2xl">
                        <div className="card-elevated p-8">
                            <h3 className="mb-6 text-center text-2xl font-bold text-foreground">{t('careers.form.title')}</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">{t('careers.form.name')}</Label>
                                        <Input id="name" name="name" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">{t('careers.form.phone')}</Label>
                                        <Input id="phone" name="phone" type="tel" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t('careers.form.email')}</Label>
                                    <Input id="email" name="email" type="email" required />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>{t('careers.form.nationality')}</Label>
                                        <Select name="nationality" required>
                                            <SelectTrigger>
                                                <SelectValue placeholder={language === 'en' ? 'Select nationality' : 'اختر الجنسية'} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {nationalities.map((nat) => (
                                                    <SelectItem key={nat} value={nat}>
                                                        {nat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t('careers.form.skill')}</Label>
                                        <Select name="skill" required>
                                            <SelectTrigger>
                                                <SelectValue placeholder={language === 'en' ? 'Select skill' : 'اختر المهارة'} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {skillCategories.map((skill) => (
                                                    <SelectItem key={skill} value={skill}>
                                                        {skill}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cv">{t('careers.form.cv')}</Label>
                                    <div className="cursor-pointer rounded-lg border-2 border-dashed border-border p-6 text-center transition-colors hover:border-primary/50">
                                        <Input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" className="hidden" />
                                        <label htmlFor="cv" className="cursor-pointer">
                                            <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                {language === 'en' ? 'Click to upload or drag and drop' : 'انقر للتحميل أو اسحب وأفلت'}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">PDF, DOC (max 5MB)</p>
                                        </label>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full hero-gradient border-0 text-primary-foreground"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (language === 'en' ? 'Submitting...' : 'جاري الإرسال...') : t('careers.form.submit')}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
