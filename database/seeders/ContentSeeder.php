<?php

namespace Database\Seeders;

use App\Models\AboutContent;
use App\Models\Certificate;
use App\Models\CleaningScopeItem;
use App\Models\CleaningServiceScope;
use App\Models\Client;
use App\Models\ClientCategory;
use App\Models\ContactInfo;
use App\Models\CoreValue;
use App\Models\HeroSection;
use App\Models\HseContent;
use App\Models\ManpowerCategory;
use App\Models\NavigationItem;
use App\Models\Project;
use App\Models\Service;
use App\Models\ServiceItem;
use App\Models\SiteSetting;
use App\Models\Stat;
use App\Models\Testimonial;
use App\Models\WhyChooseUs;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedNavigationItems();
        $this->seedHeroSections();
        $this->seedServices();
        $this->seedManpowerCategories();
        $this->seedCleaningScopes();
        $this->seedAboutContent();
        $this->seedCoreValues();
        $this->seedCertificates();
        $this->seedStats();
        $this->seedHseContent();
        $this->seedClientCategories();
        $this->seedWhyChooseUs();
        $this->seedContactInfo();
        $this->seedClients();
        $this->seedTestimonials();
        $this->seedProjects();
        $this->seedSiteSettings();
    }

    private function seedNavigationItems(): void
    {
        $items = [
            ['path' => '/', 'label_en' => 'Home', 'label_ar' => 'الرئيسية', 'order' => 1],
            ['path' => '/about', 'label_en' => 'About', 'label_ar' => 'من نحن', 'order' => 2],
            ['path' => '/services', 'label_en' => 'Services', 'label_ar' => 'خدماتنا', 'order' => 3],
            ['path' => '/projects', 'label_en' => 'Projects', 'label_ar' => 'مشاريعنا', 'order' => 4],
            ['path' => '/clients', 'label_en' => 'Clients', 'label_ar' => 'عملاؤنا', 'order' => 5],
            ['path' => '/hse-contact', 'label_en' => 'HSE & Contact', 'label_ar' => 'السلامة والاتصال', 'order' => 6],
        ];

        foreach ($items as $item) {
            NavigationItem::updateOrCreate(
                ['path' => $item['path']],
                array_merge($item, ['is_active' => true])
            );
        }
    }

    private function seedHeroSections(): void
    {
        $sections = [
            [
                'page' => 'home',
                'title_en' => 'Strength in People, Precision in Work',
                'title_ar' => 'القوة في الناس، الدقة في العمل',
                'subtitle_en' => 'Arkaan Global Contracting',
                'subtitle_ar' => 'أركان جلوبال للمقاولات',
                'description_en' => 'Your trusted partner for construction, MEP, manpower, and cleaning services across Saudi Arabia.',
                'description_ar' => 'شريككم الموثوق لخدمات البناء والميكانيكا والكهرباء والعمالة والتنظيف في جميع أنحاء المملكة العربية السعودية.',
                'cta_primary_text_en' => 'Get Quote',
                'cta_primary_text_ar' => 'احصل على عرض سعر',
                'cta_primary_link' => '/hse-contact',
                'cta_secondary_text_en' => 'Download Profile',
                'cta_secondary_text_ar' => 'تحميل الملف التعريفي',
                'cta_secondary_link' => '/company-profile.pdf',
            ],
            [
                'page' => 'about',
                'title_en' => 'About Our Company',
                'title_ar' => 'عن شركتنا',
                'subtitle_en' => 'Your trusted partner for construction, MEP, manpower, and cleaning services across Saudi Arabia.',
                'subtitle_ar' => 'شريككم الموثوق لخدمات البناء والميكانيكا والكهرباء والعمالة والتنظيف في المملكة.',
            ],
            [
                'page' => 'services',
                'title_en' => 'Our Services',
                'title_ar' => 'خدماتنا',
                'subtitle_en' => 'Comprehensive Workforce Solutions',
                'subtitle_ar' => 'حلول شاملة للقوى العاملة',
            ],
            [
                'page' => 'hse-contact',
                'title_en' => 'HSE, Clients & Contact',
                'title_ar' => 'السلامة والعملاء والاتصال',
                'subtitle_en' => 'Get In Touch With Our Team',
                'subtitle_ar' => 'تواصل مع فريقنا',
            ],
            [
                'page' => 'clients',
                'title_en' => 'Our Clients',
                'title_ar' => 'عملاؤنا',
                'subtitle_en' => 'Trusted by leading organizations across Saudi Arabia',
                'subtitle_ar' => 'موثوق به من قبل المنظمات الرائدة في المملكة العربية السعودية',
            ],
            [
                'page' => 'projects',
                'title_en' => 'Our Projects',
                'title_ar' => 'مشاريعنا',
                'subtitle_en' => 'Delivering excellence across Saudi Arabia',
                'subtitle_ar' => 'نقدم التميز في جميع أنحاء المملكة العربية السعودية',
            ],
        ];

        foreach ($sections as $section) {
            HeroSection::updateOrCreate(
                ['page' => $section['page']],
                array_merge($section, ['is_active' => true])
            );
        }
    }

    private function seedServices(): void
    {
        $services = [
            [
                'slug' => 'construction',
                'title_en' => 'General Construction & Civil Works',
                'title_ar' => 'البناء العام والأعمال المدنية',
                'description_en' => 'Complete construction and civil engineering services.',
                'description_ar' => 'خدمات البناء والهندسة المدنية الكاملة.',
                'icon' => 'hard-hat',
                'order' => 1,
                'items' => [
                    ['text_en' => 'Building construction', 'text_ar' => 'بناء المباني', 'order' => 1],
                    ['text_en' => 'Civil works', 'text_ar' => 'الأعمال المدنية', 'order' => 2],
                    ['text_en' => 'Infrastructure projects', 'text_ar' => 'مشاريع البنية التحتية', 'order' => 3],
                ],
            ],
            [
                'slug' => 'mep',
                'title_en' => 'MEP Services',
                'title_ar' => 'خدمات الميكانيكا والكهرباء',
                'description_en' => 'Mechanical, Electrical, and Plumbing solutions.',
                'description_ar' => 'حلول الميكانيكا والكهرباء والسباكة.',
                'icon' => 'wrench',
                'order' => 2,
                'items' => [
                    ['text_en' => 'HVAC systems', 'text_ar' => 'أنظمة التكييف', 'order' => 1],
                    ['text_en' => 'Electrical installations', 'text_ar' => 'التوصيلات الكهربائية', 'order' => 2],
                    ['text_en' => 'Plumbing & fire protection', 'text_ar' => 'السباكة والحماية من الحرائق', 'order' => 3],
                ],
            ],
            [
                'slug' => 'manpower',
                'title_en' => 'Manpower Solutions',
                'title_ar' => 'حلول القوى العاملة',
                'description_en' => 'Comprehensive workforce deployment services.',
                'description_ar' => 'خدمات توفير القوى العاملة الشاملة.',
                'icon' => 'users',
                'order' => 3,
                'items' => [
                    ['text_en' => 'Skilled & unskilled workers', 'text_ar' => 'عمال مهرة وعامة', 'order' => 1],
                    ['text_en' => 'Supervisors & foremen', 'text_ar' => 'المشرفون والملاحظون', 'order' => 2],
                    ['text_en' => 'Flexible deployment options', 'text_ar' => 'خيارات نشر مرنة', 'order' => 3],
                ],
            ],
            [
                'slug' => 'cleaning',
                'title_en' => 'Dedicated Cleaning Services',
                'title_ar' => 'خدمات التنظيف المخصصة',
                'description_en' => 'Professional cleaning and maintenance solutions.',
                'description_ar' => 'حلول التنظيف والصيانة المهنية.',
                'icon' => 'sparkles',
                'order' => 4,
                'items' => [
                    ['text_en' => 'Post-construction cleaning', 'text_ar' => 'التنظيف بعد البناء', 'order' => 1],
                    ['text_en' => 'Facility maintenance', 'text_ar' => 'صيانة المرافق', 'order' => 2],
                    ['text_en' => 'Dedicated cleaning teams', 'text_ar' => 'فرق تنظيف مخصصة', 'order' => 3],
                ],
            ],
        ];

        foreach ($services as $serviceData) {
            $items = $serviceData['items'] ?? [];
            unset($serviceData['items']);

            $service = Service::updateOrCreate(
                ['slug' => $serviceData['slug']],
                array_merge($serviceData, ['is_active' => true])
            );

            foreach ($items as $item) {
                ServiceItem::firstOrCreate(
                    [
                        'service_id' => $service->id,
                        'text_en' => $item['text_en'],
                    ],
                    [
                        'text_ar' => $item['text_ar'],
                        'order' => $item['order'],
                    ]
                );
            }
        }
    }

    private function seedManpowerCategories(): void
    {
        $categories = [
            ['category_en' => 'Project Managers', 'category_ar' => 'مديرو المشاريع', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 1],
            ['category_en' => 'Engineers', 'category_ar' => 'المهندسون', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 2],
            ['category_en' => 'Supervisors', 'category_ar' => 'المشرفون', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 3],
            ['category_en' => 'Skilled Workers', 'category_ar' => 'العمال المهرة', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 4],
            ['category_en' => 'Semi-skilled Workers', 'category_ar' => 'العمال شبه المهرة', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 5],
            ['category_en' => 'Male Cleaners', 'category_ar' => 'عمال النظافة (ذكور)', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 6],
            ['category_en' => 'Female Cleaners', 'category_ar' => 'عمال النظافة (إناث)', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 7],
        ];

        foreach ($categories as $cat) {
            ManpowerCategory::updateOrCreate(
                ['category_en' => $cat['category_en']],
                array_merge($cat, ['is_active' => true])
            );
        }
    }

    private function seedCleaningScopes(): void
    {
        $scopes = [
            [
                'category_en' => 'Office Cleaning',
                'category_ar' => 'تنظيف المكاتب',
                'order' => 1,
                'items' => [
                    ['text_en' => 'Daily office cleaning', 'text_ar' => 'تنظيف المكاتب اليومي', 'order' => 1],
                    ['text_en' => 'Carpet and upholstery cleaning', 'text_ar' => 'تنظيف السجاد والأثاث', 'order' => 2],
                    ['text_en' => 'Window cleaning', 'text_ar' => 'تنظيف النوافذ', 'order' => 3],
                    ['text_en' => 'Restroom maintenance', 'text_ar' => 'صيانة دورات المياه', 'order' => 4],
                    ['text_en' => 'Waste management', 'text_ar' => 'إدارة النفايات', 'order' => 5],
                    ['text_en' => 'Floor care and polishing', 'text_ar' => 'العناية بالأرضيات وتلميعها', 'order' => 6],
                ],
            ],
            [
                'category_en' => 'Industrial Cleaning',
                'category_ar' => 'التنظيف الصناعي',
                'order' => 2,
                'items' => [
                    ['text_en' => 'Factory floor cleaning', 'text_ar' => 'تنظيف أرضيات المصانع', 'order' => 1],
                    ['text_en' => 'Equipment cleaning', 'text_ar' => 'تنظيف المعدات', 'order' => 2],
                    ['text_en' => 'Hazardous waste handling', 'text_ar' => 'معالجة النفايات الخطرة', 'order' => 3],
                    ['text_en' => 'High-pressure washing', 'text_ar' => 'الغسيل بالضغط العالي', 'order' => 4],
                    ['text_en' => 'Tank and vessel cleaning', 'text_ar' => 'تنظيف الخزانات والأوعية', 'order' => 5],
                    ['text_en' => 'Industrial degreasing', 'text_ar' => 'إزالة الشحوم الصناعية', 'order' => 6],
                ],
            ],
            [
                'category_en' => 'Post-Construction Cleaning',
                'category_ar' => 'التنظيف بعد البناء',
                'order' => 3,
                'items' => [
                    ['text_en' => 'Construction debris removal', 'text_ar' => 'إزالة مخلفات البناء', 'order' => 1],
                    ['text_en' => 'Final cleaning and polishing', 'text_ar' => 'التنظيف النهائي والتلميع', 'order' => 2],
                    ['text_en' => 'Window and glass cleaning', 'text_ar' => 'تنظيف النوافذ والزجاج', 'order' => 3],
                    ['text_en' => 'Floor deep cleaning', 'text_ar' => 'التنظيف العميق للأرضيات', 'order' => 4],
                    ['text_en' => 'Sanitization', 'text_ar' => 'التعقيم', 'order' => 5],
                    ['text_en' => 'Waste disposal', 'text_ar' => 'التخلص من النفايات', 'order' => 6],
                ],
            ],
        ];

        foreach ($scopes as $scopeData) {
            $items = $scopeData['items'] ?? [];
            unset($scopeData['items']);

            $scope = CleaningServiceScope::updateOrCreate(
                ['category_en' => $scopeData['category_en']],
                array_merge($scopeData, ['is_active' => true])
            );

            foreach ($items as $item) {
                CleaningScopeItem::firstOrCreate(
                    [
                        'cleaning_service_scope_id' => $scope->id,
                        'text_en' => $item['text_en'],
                    ],
                    [
                        'text_ar' => $item['text_ar'],
                        'order' => $item['order'],
                    ]
                );
            }
        }
    }

    private function seedAboutContent(): void
    {
        $contents = [
            [
                'key' => 'overview',
                'content_en' => 'We are a leading manpower supply company specializing in the construction sector, providing comprehensive workforce solutions to major contractors and developers across the Kingdom of Saudi Arabia. Since our establishment, we have built a reputation for reliability, quality, and compliance.',
                'content_ar' => 'نحن شركة رائدة في توريد القوى العاملة متخصصة في قطاع البناء، نقدم حلولاً شاملة للقوى العاملة لكبار المقاولين والمطورين في جميع أنحاء المملكة العربية السعودية. منذ تأسيسنا، بنينا سمعة للموثوقية والجودة والامتثال.',
            ],
            [
                'key' => 'vision',
                'content_en' => "To be the most trusted manpower partner in Saudi Arabia's construction industry, known for quality, safety, and reliability.",
                'content_ar' => 'أن نكون الشريك الأكثر موثوقية للقوى العاملة في صناعة البناء في المملكة العربية السعودية، والمعروف بالجودة والسلامة والموثوقية.',
            ],
            [
                'key' => 'mission',
                'content_en' => 'To provide reliable, skilled, and compliant workforce solutions that empower construction companies to deliver their projects on time and within budget.',
                'content_ar' => 'توفير حلول قوى عاملة موثوقة وماهرة ومتوافقة تمكّن شركات البناء من تسليم مشاريعها في الوقت المحدد وضمن الميزانية.',
            ],
        ];

        foreach ($contents as $content) {
            AboutContent::updateOrCreate(['key' => $content['key']], $content);
        }
    }

    private function seedCoreValues(): void
    {
        $values = [
            ['title_en' => 'Integrity', 'title_ar' => 'النزاهة', 'description_en' => 'Honest and transparent business practices.', 'description_ar' => 'ممارسات تجارية صادقة وشفافة.', 'icon' => 'shield', 'order' => 1],
            ['title_en' => 'Quality', 'title_ar' => 'الجودة', 'description_en' => 'Providing highly skilled and trained workers.', 'description_ar' => 'توفير عمال مهرة ومدربين.', 'icon' => 'star', 'order' => 2],
            ['title_en' => 'Safety', 'title_ar' => 'السلامة', 'description_en' => 'Zero compromise on worker safety and compliance.', 'description_ar' => 'لا تنازل عن سلامة العمال والامتثال.', 'icon' => 'shield-check', 'order' => 3],
            ['title_en' => 'Reliability', 'title_ar' => 'الموثوقية', 'description_en' => 'Consistent delivery on all commitments.', 'description_ar' => 'التسليم المستمر لجميع الالتزامات.', 'icon' => 'check-circle', 'order' => 4],
            ['title_en' => 'Professionalism', 'title_ar' => 'الاحترافية', 'description_en' => 'Excellence in every aspect of our service.', 'description_ar' => 'التميز في كل جانب من جوانب خدماتنا.', 'icon' => 'award', 'order' => 5],
            ['title_en' => 'Compliance', 'title_ar' => 'الامتثال', 'description_en' => 'Full adherence to Saudi labor laws.', 'description_ar' => 'الالتزام الكامل بقوانين العمل السعودية.', 'icon' => 'file-check', 'order' => 6],
        ];

        foreach ($values as $value) {
            CoreValue::updateOrCreate(
                ['title_en' => $value['title_en']],
                array_merge($value, ['is_active' => true])
            );
        }
    }

    private function seedCertificates(): void
    {
        $certificates = [
            ['title_en' => 'Commercial Registration', 'title_ar' => 'السجل التجاري', 'description_en' => 'Official commercial registration certificate.', 'description_ar' => 'شهادة التسجيل التجاري الرسمية.', 'image' => 'certificates/cr-placeholder.png', 'order' => 1],
            ['title_en' => 'VAT Certificate', 'title_ar' => 'شهادة ضريبة القيمة المضافة', 'description_en' => 'VAT registration certificate.', 'description_ar' => 'شهادة تسجيل ضريبة القيمة المضافة.', 'image' => 'certificates/vat-placeholder.png', 'order' => 2],
        ];

        foreach ($certificates as $cert) {
            Certificate::updateOrCreate(
                ['title_en' => $cert['title_en']],
                array_merge($cert, ['is_active' => true])
            );
        }
    }

    private function seedStats(): void
    {
        $stats = [
            ['value' => '15+', 'label_en' => 'Years Experience', 'label_ar' => 'سنوات الخبرة', 'icon' => 'clock', 'order' => 1],
            ['value' => '500+', 'label_en' => 'Projects Completed', 'label_ar' => 'مشروع مكتمل', 'icon' => 'target', 'order' => 2],
            ['value' => '10,000+', 'label_en' => 'Workers Deployed', 'label_ar' => 'عامل تم توظيفهم', 'icon' => 'users', 'order' => 3],
            ['value' => '100+', 'label_en' => 'Satisfied Clients', 'label_ar' => 'عميل راضٍ', 'icon' => 'building', 'order' => 4],
        ];

        foreach ($stats as $stat) {
            Stat::updateOrCreate(
                ['value' => $stat['value'], 'label_en' => $stat['label_en']],
                array_merge($stat, ['is_active' => true])
            );
        }
    }

    private function seedHseContent(): void
    {
        HseContent::updateOrCreate(
            ['key' => 'commitments'],
            [
                'content_en' => '<ul><li>Zero harm policy – safety first in all operations</li><li>Compliance with Saudi labor laws and HSE regulations</li><li>Regular safety training for all workers</li><li>Quality assurance and continuous improvement</li><li>Environmental responsibility in all projects</li></ul>',
                'content_ar' => '<ul><li>سياسة عدم الإضرار – السلامة أولاً في جميع العمليات</li><li>الامتثال لقوانين العمل السعودية ولوائح السلامة</li><li>التدريب الدوري على السلامة لجميع العمال</li><li>ضمان الجودة والتحسين المستمر</li><li>المسؤولية البيئية في جميع المشاريع</li></ul>',
            ]
        );

        HseContent::updateOrCreate(
            ['key' => 'policy_link'],
            [
                'content_en' => null,
                'content_ar' => null,
                'link' => '/hse-policy.pdf',
            ]
        );

        HseContent::updateOrCreate(
            ['key' => 'services_manpower_categories_title'],
            [
                'content_en' => 'Manpower Categories & Deployment Options',
                'content_ar' => 'فئات القوى العاملة وخيارات النشر',
            ]
        );

        HseContent::updateOrCreate(
            ['key' => 'services_cleaning_matrix_title'],
            [
                'content_en' => 'Cleaning Services Scope Matrix',
                'content_ar' => 'مصفوفة نطاق خدمات التنظيف',
            ]
        );

        HseContent::updateOrCreate(
            ['key' => 'manpower_form_link'],
            [
                'content_en' => null,
                'content_ar' => null,
                'link' => '/manpower-request-form.pdf',
            ]
        );
    }

    private function seedClientCategories(): void
    {
        $categories = [
            ['name_en' => 'Government', 'name_ar' => 'حكومي', 'description_en' => 'Public sector projects and infrastructure', 'description_ar' => 'مشاريع القطاع العام والبنية التحتية', 'icon' => 'building', 'order' => 1],
            ['name_en' => 'Semi-Government', 'name_ar' => 'شبه حكومي', 'description_en' => 'Quasi-governmental organizations', 'description_ar' => 'المنظمات شبه الحكومية', 'icon' => 'building', 'order' => 2],
            ['name_en' => 'Industrial', 'name_ar' => 'صناعي', 'description_en' => 'Manufacturing and industrial facilities', 'description_ar' => 'مرافق التصنيع والصناعة', 'icon' => 'factory', 'order' => 3],
            ['name_en' => 'Private', 'name_ar' => 'خاص', 'description_en' => 'Commercial and private developments', 'description_ar' => 'التطويرات التجارية والخاصة', 'icon' => 'home', 'order' => 4],
        ];

        foreach ($categories as $cat) {
            ClientCategory::updateOrCreate(
                ['name_en' => $cat['name_en']],
                array_merge($cat, ['is_active' => true])
            );
        }
    }

    private function seedClients(): void
    {
        $clients = [
            ['name' => 'Saudi Binladin Group', 'abbr' => 'SBG', 'sector_en' => 'Construction', 'sector_ar' => 'البناء', 'order' => 1],
            ['name' => 'Al Rajhi Construction', 'abbr' => 'ARC', 'sector_en' => 'Development', 'sector_ar' => 'التطوير', 'order' => 2],
            ['name' => 'Nesma & Partners', 'abbr' => 'N&P', 'sector_en' => 'Infrastructure', 'sector_ar' => 'البنية التحتية', 'order' => 3],
            ['name' => 'El Seif Engineering', 'abbr' => 'ESE', 'sector_en' => 'Engineering', 'sector_ar' => 'الهندسة', 'order' => 4],
            ['name' => 'Al Bawani Company', 'abbr' => 'ABC', 'sector_en' => 'Commercial', 'sector_ar' => 'التجاري', 'order' => 5],
        ];

        foreach ($clients as $client) {
            Client::updateOrCreate(
                ['name' => $client['name']],
                array_merge($client, ['is_active' => true])
            );
        }
    }

    private function seedTestimonials(): void
    {
        $sbg = Client::where('name', 'Saudi Binladin Group')->first();
        $nesma = Client::where('name', 'Nesma & Partners')->first();
        $elseif = Client::where('name', 'El Seif Engineering')->first();

        $testimonials = [
            [
                'client_id' => $sbg?->id,
                'company' => 'Saudi Binladin Group',
                'quote_en' => 'Arkaan Global Contracting has been instrumental in delivering our projects on time. Their workforce is reliable, skilled, and safety-conscious.',
                'quote_ar' => 'كانت شركة أركان جلوبال للمقاولات أساسية في تسليم مشاريعنا في الوقت المحدد. قوتهم العاملة موثوقة وماهرة وواعية بالسلامة.',
                'author_en' => 'Mohammed Al-Rashid',
                'author_ar' => 'محمد الراشد',
                'position_en' => 'Project Director',
                'position_ar' => 'مدير المشروع',
                'order' => 1,
            ],
            [
                'client_id' => $nesma?->id,
                'company' => 'Nesma & Partners',
                'quote_en' => "We've worked with many manpower suppliers, but Arkaan Global Contracting stands out for their professionalism and commitment to quality.",
                'quote_ar' => 'عملنا مع العديد من موردي القوى العاملة، لكن أركان جلوبال للمقاولات تتميز باحترافيتها والتزامها بالجودة.',
                'author_en' => 'Ahmed Al-Harbi',
                'author_ar' => 'أحمد الحربي',
                'position_en' => 'Operations Manager',
                'position_ar' => 'مدير العمليات',
                'order' => 2,
            ],
            [
                'client_id' => $elseif?->id,
                'company' => 'El Seif Engineering',
                'quote_en' => 'Their ability to scale rapidly and provide qualified workers has been crucial for our large-scale projects.',
                'quote_ar' => 'كانت قدرتهم على التوسع السريع وتوفير العمال المؤهلين حاسمة لمشاريعنا الكبيرة.',
                'author_en' => 'Khalid Al-Saud',
                'author_ar' => 'خالد السعود',
                'position_en' => 'Procurement Head',
                'position_ar' => 'رئيس المشتريات',
                'order' => 3,
            ],
        ];

        foreach ($testimonials as $t) {
            Testimonial::updateOrCreate(
                ['author_en' => $t['author_en']],
                array_merge($t, ['is_active' => true])
            );
        }
    }

    private function seedProjects(): void
    {
        $sbg = Client::where('name', 'Saudi Binladin Group')->first();
        $nesma = Client::where('name', 'Nesma & Partners')->first();
        $elseif = Client::where('name', 'El Seif Engineering')->first();
        $albawani = Client::where('name', 'Al Bawani Company')->first();

        $projects = [
            ['title_en' => 'NEOM Infrastructure Development', 'title_ar' => 'تطوير البنية التحتية نيوم', 'location_en' => 'Tabuk Region', 'location_ar' => 'منطقة تبوك', 'workers' => '2,500+', 'category' => 'infrastructure', 'description_en' => 'Comprehensive workforce supply for mega infrastructure project', 'description_ar' => 'توريد شامل للقوى العاملة لمشروع البنية التحتية الضخم', 'image' => null, 'order' => 1, 'client_id' => $sbg?->id],
            ['title_en' => 'Riyadh Metro Lines', 'title_ar' => 'خطوط مترو الرياض', 'location_en' => 'Riyadh', 'location_ar' => 'الرياض', 'workers' => '1,800+', 'category' => 'infrastructure', 'description_en' => 'Skilled technicians and laborers for metro construction', 'description_ar' => 'فنيون وعمال مهرة لبناء المترو', 'image' => null, 'order' => 2, 'client_id' => $nesma?->id],
            ['title_en' => 'King Abdullah Financial District', 'title_ar' => 'مركز الملك عبدالله المالي', 'location_en' => 'Riyadh', 'location_ar' => 'الرياض', 'workers' => '3,200+', 'category' => 'commercial', 'description_en' => 'Full workforce solutions for commercial complex', 'description_ar' => 'حلول كاملة للقوى العاملة للمجمع التجاري', 'image' => null, 'order' => 3, 'client_id' => $elseif?->id],
            ['title_en' => 'Jubail Industrial City Expansion', 'title_ar' => 'توسعة مدينة الجبيل الصناعية', 'location_en' => 'Jubail', 'location_ar' => 'الجبيل', 'workers' => '1,500+', 'category' => 'industrial', 'description_en' => 'Industrial construction workforce deployment', 'description_ar' => 'نشر القوى العاملة للبناء الصناعي', 'image' => null, 'order' => 4, 'client_id' => $albawani?->id],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['title_en' => $project['title_en']],
                array_merge($project, ['is_active' => true])
            );
        }
    }

    private function seedSiteSettings(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => config('app.name'), 'group' => 'seo'],
            ['key' => 'default_meta_title', 'value' => 'Arkaan Global Contracting', 'group' => 'seo'],
            ['key' => 'default_meta_description', 'value' => 'Your trusted partner for construction, MEP, manpower, and cleaning services across Saudi Arabia.', 'group' => 'seo'],
            ['key' => 'default_meta_keywords', 'value' => 'construction, MEP, manpower, cleaning, Saudi Arabia', 'group' => 'seo'],
            ['key' => 'cr_number', 'value' => null, 'group' => 'legal'],
            ['key' => 'vat_number', 'value' => null, 'group' => 'legal'],
            ['key' => 'map_embed_url', 'value' => null, 'group' => 'map'],
            ['key' => 'quote_request_email', 'value' => 'info@arkaanglobal.com', 'group' => 'notifications'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }

    private function seedWhyChooseUs(): void
    {
        $items = [
            ['title_en' => '15+ Years Experience', 'title_ar' => 'أكثر من 15 عاماً من الخبرة', 'description_en' => 'Proven track record in Saudi Arabia\'s construction sector.', 'description_ar' => 'سجل حافل في قطاع البناء السعودي.', 'icon' => 'award', 'order' => 1],
            ['title_en' => 'Fully Compliant', 'title_ar' => 'متوافق بالكامل', 'description_en' => '100% adherence to Saudi labor laws and regulations.', 'description_ar' => 'الالتزام الكامل بقوانين ولوائح العمل السعودية.', 'icon' => 'shield-check', 'order' => 2],
            ['title_en' => 'Skilled Workforce', 'title_ar' => 'قوى عاملة ماهرة', 'description_en' => 'Trained and certified workers for all project types.', 'description_ar' => 'عمال مدربون ومعتمدون لجميع أنواع المشاريع.', 'icon' => 'users', 'order' => 3],
            ['title_en' => 'Flexible Deployment', 'title_ar' => 'نشر مرن', 'description_en' => 'Short-term, long-term, and project-based solutions.', 'description_ar' => 'حلول قصيرة وطويلة الأجل وقائمة على المشاريع.', 'icon' => 'calendar', 'order' => 4],
        ];

        foreach ($items as $item) {
            WhyChooseUs::updateOrCreate(
                ['title_en' => $item['title_en']],
                array_merge($item, ['is_active' => true])
            );
        }
    }

    private function seedContactInfo(): void
    {
        $contacts = [
            ['key' => 'address', 'value_en' => 'Jubail, Saudi Arabia', 'value_ar' => 'الجبيل، المملكة العربية السعودية', 'icon' => 'map-pin', 'order' => 1],
            ['key' => 'phone', 'value_en' => '+966 57 291 4027', 'value_ar' => '٩٦٦ ٥٧ ٢٩١ ٤٠٢٧+', 'icon' => 'phone', 'order' => 2],
            ['key' => 'email', 'value_en' => 'info@arkaanglobal.com', 'value_ar' => 'info@arkaanglobal.com', 'icon' => 'mail', 'order' => 3],
            ['key' => 'hours', 'value_en' => 'Sun - Thu: 8:00 AM - 5:00 PM', 'value_ar' => 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً', 'icon' => 'clock', 'order' => 4],
            ['key' => 'whatsapp', 'value_en' => '+966 57 291 4027', 'value_ar' => '٩٦٦ ٥٧ ٢٩١ ٤٠٢٧+', 'icon' => 'message-circle', 'order' => 5],
        ];

        foreach ($contacts as $contact) {
            ContactInfo::updateOrCreate(
                ['key' => $contact['key']],
                array_merge($contact, ['is_active' => true])
            );
        }
    }
}
