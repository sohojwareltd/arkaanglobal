import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { HardHat, Users, CheckCircle2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import WhenVisible from '@/components/ui/when-visible';
import { useToast } from '@/hooks/use-toast';

import 'filepond/dist/filepond.min.css';
// Register FilePond plugins (validated by type definitions in types/filepond.d.ts)
registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export default function Careers() {
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [files, setFiles] = useState<any[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // In a real implementation you would submit `files` along with the form data to the backend here.

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast({
            title: t('careers.form.success'),
            description: language === 'en' ? 'We will contact you soon.' : 'سنتواصل معك قريبًا.',
        });

        setIsSubmitting(false);
        (e.target as HTMLFormElement).reset();
        setFiles([]);
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
                        <WhenVisible className="card-elevated p-8" options={{ threshold: 0.1 }}>
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
                        </WhenVisible>
                        <WhenVisible className="card-elevated p-8" options={{ threshold: 0.1 }} style={{ transitionDelay: '120ms' }}>
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
                        </WhenVisible>
                    </div>

                    {/* Application Form */}
                    <div className="mx-auto max-w-2xl">
                        <WhenVisible className="card-elevated p-8" options={{ threshold: 0.1 }}>
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
                                    <FilePond
                                        files={files}
                                        onupdatefiles={setFiles}
                                        allowMultiple={false}
                                        name="cv"
                                        acceptedFileTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                                        labelIdle={
                                            language === 'en'
                                                ? 'Drag & Drop your CV or <span class=\"filepond--label-action\">Browse</span>'
                                                : 'اسحب وأفلت السيرة الذاتية أو <span class=\"filepond--label-action\">تصفح</span>'
                                        }
                                        maxFileSize="5MB"
                                        className="filepond--theme"
                                        credits={false}
                                    />
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
                        </WhenVisible>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
