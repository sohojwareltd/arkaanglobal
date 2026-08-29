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
use App\Models\ProjectGalleryItem;
use App\Models\Service;
use App\Models\ServiceItem;
use App\Models\SiteSetting;
use App\Models\Stat;
use App\Models\Testimonial;
use App\Models\WhyChooseUs;
use Illuminate\Database\Seeder;

/**
 * Seeds the site with real content sourced from the official
 * "Arkaan Construction Company" profile (public/Arkaan Profile web.pdf).
 * No fabricated client names, testimonials, or project case studies are
 * seeded — the profile does not name specific clients or projects, only
 * the sector categories and capabilities below.
 */
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
        $this->clearFabricatedShowcaseData();
        $this->seedSiteSettings();
    }

    private function seedNavigationItems(): void
    {
        $items = [
            ['path' => '/', 'label_en' => 'Home', 'label_ar' => 'الرئيسية', 'order' => 1],
            ['path' => '/about', 'label_en' => 'About', 'label_ar' => 'من نحن', 'order' => 2],
            ['path' => '/services', 'label_en' => 'Services', 'label_ar' => 'خدماتنا', 'order' => 3],
            ['path' => '/projects', 'label_en' => 'Capabilities', 'label_ar' => 'إمكانياتنا', 'order' => 4],
            ['path' => '/clients', 'label_en' => 'Clients', 'label_ar' => 'عملاؤنا', 'order' => 5],
            ['path' => '/careers', 'label_en' => 'Careers', 'label_ar' => 'الوظائف', 'order' => 6],
            ['path' => '/hse-contact', 'label_en' => 'HSE', 'label_ar' => 'السلامة والاتصال', 'order' => 7],
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
                'title_en' => 'Your Trusted Partner in Construction and Workforce Solutions',
                'title_ar' => 'شريككم الموثوق في حلول البناء والقوى العاملة',
                'subtitle_en' => 'Arkaan Construction Company',
                'subtitle_ar' => 'شركة أركان للمقاولات',
                'description_en' => 'Delivering reliable civil construction, MEP, manpower supply, and dedicated cleaning services to government, semi-government, industrial, and private sector clients across the Kingdom of Saudi Arabia.',
                'description_ar' => 'نقدّم خدمات موثوقة في البناء المدني والأعمال الكهروميكانيكية وتوريد القوى العاملة والتنظيف المخصص لعملائنا في القطاعات الحكومية وشبه الحكومية والصناعية والخاصة في جميع أنحاء المملكة العربية السعودية.',
                'cta_primary_text_en' => 'Get a Quote',
                'cta_primary_text_ar' => 'احصل على عرض سعر',
                'cta_primary_link' => '/hse-contact',
                'cta_secondary_text_en' => 'Download Company Profile',
                'cta_secondary_text_ar' => 'تحميل الملف التعريفي',
                'cta_secondary_link' => '/company-profile.pdf',
                'meta_title_en' => 'Arkaan Construction Company | Civil Construction, MEP, Manpower & Cleaning',
                'meta_title_ar' => 'شركة أركان للمقاولات | البناء المدني والأعمال الكهروميكانيكية والقوى العاملة والتنظيف',
                'meta_description_en' => 'Arkaan Construction Company delivers civil construction, MEP, manpower supply, and dedicated cleaning services across Saudi Arabia, aligned with Saudi Vision 2030.',
                'meta_description_ar' => 'تقدم شركة أركان للمقاولات خدمات البناء المدني والأعمال الكهروميكانيكية وتوريد القوى العاملة والتنظيف المخصص في جميع أنحاء المملكة العربية السعودية، بما يتماشى مع رؤية السعودية 2030.',
                'meta_keywords' => 'Arkaan Construction Company, civil construction Saudi Arabia, MEP contractor, manpower supply, dedicated cleaning services, Jubail, Dammam, Riyadh',
            ],
            [
                'page' => 'about',
                'title_en' => 'About Arkaan Construction Company',
                'title_ar' => 'عن شركة أركان للمقاولات',
                'subtitle_en' => 'A leading construction and manpower solutions provider across the Kingdom of Saudi Arabia',
                'subtitle_ar' => 'مزود رائد لحلول البناء والقوى العاملة في جميع أنحاء المملكة العربية السعودية',
                'meta_title_en' => 'About Us | Arkaan Construction Company',
                'meta_title_ar' => 'من نحن | شركة أركان للمقاولات',
                'meta_description_en' => 'Learn about Arkaan Construction Company — our vision, mission, core values, and commitment to quality, safety, and reliable execution across Saudi Arabia.',
                'meta_description_ar' => 'تعرف على شركة أركان للمقاولات — رؤيتنا ورسالتنا وقيمنا الأساسية والتزامنا بالجودة والسلامة والتنفيذ الموثوق في جميع أنحاء المملكة العربية السعودية.',
            ],
            [
                'page' => 'services',
                'title_en' => 'Our Services',
                'title_ar' => 'خدماتنا',
                'subtitle_en' => 'Civil Construction, MEP, Manpower Supply & Dedicated Cleaning',
                'subtitle_ar' => 'البناء المدني، الأعمال الكهروميكانيكية، توريد القوى العاملة، وخدمات التنظيف المخصص',
                'meta_title_en' => 'Services | Arkaan Construction Company',
                'meta_title_ar' => 'خدماتنا | شركة أركان للمقاولات',
                'meta_description_en' => 'Civil & construction, MEP, manpower supply, and dedicated cleaning services delivered across the Kingdom of Saudi Arabia by Arkaan Construction Company.',
                'meta_description_ar' => 'خدمات البناء المدني والأعمال الكهروميكانيكية وتوريد القوى العاملة والتنظيف المخصص التي تقدمها شركة أركان للمقاولات في جميع أنحاء المملكة العربية السعودية.',
            ],
            [
                'page' => 'careers',
                'title_en' => 'Join Our Team',
                'title_ar' => 'انضم إلى فريقنا',
                'subtitle_en' => 'Build your career with Arkaan Construction Company',
                'subtitle_ar' => 'ابنِ مسيرتك المهنية مع شركة أركان للمقاولات',
                'meta_title_en' => 'Careers | Arkaan Construction Company',
                'meta_title_ar' => 'الوظائف | شركة أركان للمقاولات',
                'meta_description_en' => 'Explore open positions at Arkaan Construction Company and apply online with your CV.',
                'meta_description_ar' => 'استكشف الوظائف المتاحة في شركة أركان للمقاولات وقدّم طلبك عبر الإنترنت مع سيرتك الذاتية.',
            ],
            [
                'page' => 'hse-contact',
                'title_en' => 'HSE, Capabilities & Contact',
                'title_ar' => 'السلامة والإمكانيات والتواصل',
                'subtitle_en' => 'Our commitment to Health, Safety, Quality & Environmental excellence',
                'subtitle_ar' => 'التزامنا بالتميز في الصحة والسلامة والجودة والبيئة',
            ],
            [
                'page' => 'clients',
                'title_en' => 'Our Clients & Industry Footprint',
                'title_ar' => 'عملاؤنا وحضورنا في الصناعة',
                'subtitle_en' => 'Serving government, semi-government, industrial, and private sector clients across the Kingdom',
                'subtitle_ar' => 'نخدم عملاء القطاعات الحكومية وشبه الحكومية والصناعية والخاصة في جميع أنحاء المملكة',
            ],
            [
                'page' => 'projects',
                'title_en' => 'Deployment Capability & Compliance',
                'title_ar' => 'قدرة النشر والامتثال',
                'subtitle_en' => 'How we mobilize, manage, and ensure compliant workforce delivery across the Kingdom',
                'subtitle_ar' => 'كيف نعبئ وندير القوى العاملة ونضمن الامتثال في تسليمها في جميع أنحاء المملكة',
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
                'title_en' => 'Civil & Construction',
                'title_ar' => 'الأعمال المدنية والبناء',
                'description_en' => 'Complete general construction and civil engineering services — from project planning and site preparation to final handover — executed to Saudi Building Code (SBC) requirements.',
                'description_ar' => 'خدمات بناء عام وهندسة مدنية متكاملة — من التخطيط للمشروع وتجهيز الموقع وحتى التسليم النهائي — منفذة وفق متطلبات كود البناء السعودي (SBC).',
                'icon' => 'hard-hat',
                'order' => 1,
                'items' => [
                    ['text_en' => 'General Construction — residential, commercial, industrial & institutional', 'text_ar' => 'البناء العام — سكني وتجاري وصناعي ومؤسسي', 'order' => 1],
                    ['text_en' => 'Civil Works — earthworks, excavation, concrete structures & drainage', 'text_ar' => 'الأعمال المدنية — الحفر والردم والهياكل الخرسانية والصرف', 'order' => 2],
                    ['text_en' => 'Building Construction — villas, offices, warehouses & factories', 'text_ar' => 'بناء المباني — الفلل والمكاتب والمستودعات والمصانع', 'order' => 3],
                    ['text_en' => 'Building Renovation & Remodeling', 'text_ar' => 'تجديد وإعادة تهيئة المباني', 'order' => 4],
                    ['text_en' => 'Finishing Works — tiling, painting, marble & carpentry', 'text_ar' => 'أعمال التشطيبات — البلاط والدهانات والرخام والنجارة', 'order' => 5],
                    ['text_en' => 'Preventive, Corrective & Scheduled Maintenance Services', 'text_ar' => 'خدمات الصيانة الوقائية والعلاجية والمجدولة', 'order' => 6],
                    ['text_en' => 'Infrastructure Works', 'text_ar' => 'أعمال البنية التحتية', 'order' => 7],
                    ['text_en' => 'Industrial & Commercial Construction', 'text_ar' => 'البناء الصناعي والتجاري', 'order' => 8],
                    ['text_en' => 'Material Supply & Transportation Support', 'text_ar' => 'توريد المواد ودعم النقل', 'order' => 9],
                ],
            ],
            [
                'slug' => 'mep',
                'title_en' => 'MEP (Mechanical, Electrical & Plumbing)',
                'title_ar' => 'الأعمال الكهروميكانيكية (ميكانيكا وكهرباء وسباكة)',
                'description_en' => 'Complete power distribution, plumbing & drainage, HVAC, and testing & commissioning services, compliant with the Saudi Building Code (SBC), SEC requirements, and international standards.',
                'description_ar' => 'خدمات متكاملة لتوزيع الطاقة والسباكة والصرف والتكييف والفحص والتشغيل، متوافقة مع كود البناء السعودي ومتطلبات الشركة السعودية للكهرباء والمعايير الدولية.',
                'icon' => 'wrench',
                'order' => 2,
                'items' => [
                    ['text_en' => 'Electrical Installation & Maintenance', 'text_ar' => 'تركيب وصيانة الأنظمة الكهربائية', 'order' => 1],
                    ['text_en' => 'Plumbing, Drainage & Water Supply Systems', 'text_ar' => 'أنظمة السباكة والصرف وإمداد المياه', 'order' => 2],
                    ['text_en' => 'HVAC Installation & Support Services', 'text_ar' => 'تركيب ودعم أنظمة التكييف والتهوية', 'order' => 3],
                    ['text_en' => 'Testing, Commissioning & Maintenance', 'text_ar' => 'الفحص والتشغيل والصيانة', 'order' => 4],
                    ['text_en' => 'Mechanical Works & Ductwork Installation', 'text_ar' => 'الأعمال الميكانيكية وتركيب المجاري الهوائية', 'order' => 5],
                ],
            ],
            [
                'slug' => 'manpower',
                'title_en' => 'Manpower Supply',
                'title_ar' => 'توريد القوى العاملة',
                'description_en' => 'Highly skilled and experienced construction professionals — plus semi-skilled and general workforce — mobilized on short-term, long-term, and project-based contracts across the Kingdom.',
                'description_ar' => 'كوادر بناء ماهرة وذات خبرة، إلى جانب قوى عاملة شبه ماهرة وعامة، يتم توفيرها بعقود قصيرة وطويلة الأجل وقائمة على المشاريع في جميع أنحاء المملكة.',
                'icon' => 'users',
                'order' => 3,
                'items' => [
                    ['text_en' => 'Skilled Construction Manpower — masons, electricians, welders & technicians', 'text_ar' => 'قوى عاملة ماهرة في البناء — بنّاؤون وكهربائيون ولحّامون وفنيون', 'order' => 1],
                    ['text_en' => 'Semi-Skilled & General Workforce', 'text_ar' => 'قوى عاملة شبه ماهرة وعامة', 'order' => 2],
                    ['text_en' => 'Construction Helpers & Site Support Staff', 'text_ar' => 'عمال مساعدون وطاقم دعم الموقع', 'order' => 3],
                    ['text_en' => 'Cleaning & Housekeeping Manpower', 'text_ar' => 'قوى عاملة للتنظيف والخدمات المنزلية', 'order' => 4],
                    ['text_en' => 'Project-Based & Contract Manpower Supply', 'text_ar' => 'توريد قوى عاملة قائم على المشاريع والعقود', 'order' => 5],
                ],
            ],
            [
                'slug' => 'cleaning',
                'title_en' => 'Dedicated Cleaning Services',
                'title_ar' => 'خدمات التنظيف المخصصة',
                'description_en' => 'Professional cleaning for offices, commercial buildings, industrial facilities, and post-construction handover, delivered by trained teams in accordance with client and HSE standards.',
                'description_ar' => 'خدمات تنظيف احترافية للمكاتب والمباني التجارية والمنشآت الصناعية وتسليم ما بعد البناء، تنفذها فرق مدربة وفق معايير العملاء ومتطلبات السلامة.',
                'icon' => 'sparkles',
                'order' => 4,
                'items' => [
                    ['text_en' => 'General Cleaning Services', 'text_ar' => 'خدمات التنظيف العامة', 'order' => 1],
                    ['text_en' => 'Industrial & Site Cleaning', 'text_ar' => 'التنظيف الصناعي وتنظيف المواقع', 'order' => 2],
                    ['text_en' => 'Post-Construction Cleaning', 'text_ar' => 'التنظيف بعد انتهاء البناء', 'order' => 3],
                    ['text_en' => 'Routine & Periodic Cleaning Services', 'text_ar' => 'خدمات التنظيف الدورية والمنتظمة', 'order' => 4],
                    ['text_en' => 'Specialized Cleaning Manpower', 'text_ar' => 'قوى عاملة متخصصة في التنظيف', 'order' => 5],
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

            // Full content replacement: clear old items for this service before reinserting.
            ServiceItem::where('service_id', $service->id)->delete();

            foreach ($items as $item) {
                ServiceItem::create([
                    'service_id' => $service->id,
                    'text_en' => $item['text_en'],
                    'text_ar' => $item['text_ar'],
                    'order' => $item['order'],
                ]);
            }
        }
    }

    private function seedManpowerCategories(): void
    {
        // The match key (category_en) is changing from the old placeholder
        // list, so clear the table first to avoid leaving stale duplicate rows.
        ManpowerCategory::query()->delete();

        $categories = [
            ['category_en' => 'Project Managers & Construction Managers', 'category_ar' => 'مديرو المشاريع ومديرو البناء', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 1],
            ['category_en' => 'Civil, Mechanical & Electrical Engineers', 'category_ar' => 'مهندسون مدنيون وميكانيكيون وكهربائيون', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 2],
            ['category_en' => 'Planning & QA/QC Engineers', 'category_ar' => 'مهندسو التخطيط وضمان وجودة الجودة', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 3],
            ['category_en' => 'HSE Engineers & Officers', 'category_ar' => 'مهندسون وضباط السلامة والصحة والبيئة', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 4],
            ['category_en' => 'Quantity Surveyors', 'category_ar' => 'مساحو الكميات', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 5],
            ['category_en' => 'Site Supervisors & Foremen', 'category_ar' => 'مشرفو ورؤساء عمال الموقع', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 6],
            ['category_en' => 'Safety Supervisors', 'category_ar' => 'مشرفو السلامة', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 7],
            ['category_en' => 'Skilled Tradesmen — Masons, Carpenters, Steel Fixers & Welders', 'category_ar' => 'حرفيون مهرة — بنّاؤون ونجارون وحدادو تسليح ولحّامون', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 8],
            ['category_en' => 'Electricians, Plumbers & HVAC Technicians', 'category_ar' => 'كهربائيون وسبّاكون وفنيو تكييف', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 9],
            ['category_en' => 'Equipment Operators & Scaffolders', 'category_ar' => 'مشغلو المعدات وفنيو السقالات', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 10],
            ['category_en' => 'Semi-Skilled Workforce & Material Handlers', 'category_ar' => 'قوى عاملة شبه ماهرة ومناولو المواد', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 11],
            ['category_en' => 'General Helpers & Site Support', 'category_ar' => 'عمال مساعدون ودعم الموقع', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 12],
            ['category_en' => 'Cleaning & Housekeeping Personnel', 'category_ar' => 'طاقم التنظيف والخدمات المنزلية', 'short_term' => true, 'long_term' => true, 'project_based' => true, 'order' => 13],
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
        // Two of the three category names are changing from the old
        // placeholder set ("Office Cleaning" -> "Office & Commercial
        // Facilities", "Industrial Cleaning" -> "Industrial & Site
        // Cleaning"), so clear the table first to avoid leaving stale
        // duplicate rows alongside the new ones.
        CleaningServiceScope::query()->delete();

        $scopes = [
            [
                'category_en' => 'Office & Commercial Facilities',
                'category_ar' => 'المكاتب والمنشآت التجارية',
                'order' => 1,
                'items' => [
                    ['text_en' => 'Daily, weekly, monthly, and periodic cleaning services', 'text_ar' => 'خدمات تنظيف يومية وأسبوعية وشهرية ودورية', 'order' => 1],
                    ['text_en' => 'Floor sweeping, mopping, scrubbing, polishing, and maintenance', 'text_ar' => 'كنس الأرضيات ومسحها وفركها وتلميعها وصيانتها', 'order' => 2],
                    ['text_en' => 'Glass, window, and façade cleaning (internal)', 'text_ar' => 'تنظيف الزجاج والنوافذ والواجهات (داخلياً)', 'order' => 3],
                    ['text_en' => 'Restroom cleaning, sanitization, and replenishment of consumables', 'text_ar' => 'تنظيف وتعقيم دورات المياه وتعبئة المستلزمات', 'order' => 4],
                    ['text_en' => 'Reception areas, meeting rooms, workstations, and common area cleaning', 'text_ar' => 'تنظيف مناطق الاستقبال وقاعات الاجتماعات ومحطات العمل والمناطق المشتركة', 'order' => 5],
                    ['text_en' => 'Dusting and disinfection of furniture, equipment, and high-touch surfaces', 'text_ar' => 'إزالة الغبار وتعقيم الأثاث والمعدات والأسطح كثيرة اللمس', 'order' => 6],
                    ['text_en' => 'Waste collection, segregation, and disposal per client and municipal requirements', 'text_ar' => 'جمع النفايات وفرزها والتخلص منها وفق متطلبات العميل والبلدية', 'order' => 7],
                    ['text_en' => 'Carpet vacuuming and upholstery cleaning', 'text_ar' => 'تنظيف السجاد بالمكنسة الكهربائية وتنظيف المفروشات', 'order' => 8],
                ],
            ],
            [
                'category_en' => 'Industrial & Site Cleaning',
                'category_ar' => 'التنظيف الصناعي وتنظيف المواقع',
                'order' => 2,
                'items' => [
                    ['text_en' => 'Cleaning of workshops, warehouses, factories, and industrial facilities', 'text_ar' => 'تنظيف الورش والمستودعات والمصانع والمنشآت الصناعية', 'order' => 1],
                    ['text_en' => 'Construction site cleaning and housekeeping', 'text_ar' => 'تنظيف مواقع البناء وخدمات النظافة', 'order' => 2],
                    ['text_en' => 'Removal of construction debris and non-hazardous waste materials', 'text_ar' => 'إزالة مخلفات البناء والنفايات غير الخطرة', 'order' => 3],
                    ['text_en' => 'Cleaning of production areas, storage facilities, and utility rooms', 'text_ar' => 'تنظيف مناطق الإنتاج ومرافق التخزين وغرف المرافق', 'order' => 4],
                    ['text_en' => 'Internal roads, walkways, loading bays, and yard cleaning', 'text_ar' => 'تنظيف الطرق الداخلية والممرات وأرصفة التحميل والساحات', 'order' => 5],
                    ['text_en' => 'Dust control and general housekeeping during project execution', 'text_ar' => 'التحكم بالغبار والنظافة العامة أثناء تنفيذ المشروع', 'order' => 6],
                    ['text_en' => 'Cleaning support during plant operations, shutdowns & turnarounds', 'text_ar' => 'دعم التنظيف أثناء تشغيل المصانع وعمليات الإيقاف والصيانة الدورية', 'order' => 7],
                    ['text_en' => 'Periodic deep cleaning and scheduled maintenance cleaning services', 'text_ar' => 'خدمات التنظيف العميق الدوري والتنظيف المجدول', 'order' => 8],
                ],
            ],
            [
                'category_en' => 'Post-Construction Cleaning',
                'category_ar' => 'التنظيف بعد انتهاء البناء',
                'order' => 3,
                'items' => [
                    ['text_en' => 'Removal of construction dust, cement residue, paint splashes, and debris', 'text_ar' => 'إزالة غبار البناء وبقايا الأسمنت وبقع الدهان والمخلفات', 'order' => 1],
                    ['text_en' => 'Detailed cleaning of floors, walls, ceilings, doors, windows, and glass', 'text_ar' => 'تنظيف تفصيلي للأرضيات والجدران والأسقف والأبواب والنوافذ والزجاج', 'order' => 2],
                    ['text_en' => 'Cleaning and polishing of tiles, marble, granite, and finished surfaces', 'text_ar' => 'تنظيف وتلميع البلاط والرخام والجرانيت والأسطح النهائية', 'order' => 3],
                    ['text_en' => 'Cleaning of sanitary fixtures, kitchens, and utility areas', 'text_ar' => 'تنظيف التجهيزات الصحية والمطابخ ومناطق المرافق', 'order' => 4],
                    ['text_en' => 'Interior and exterior cleaning of completed buildings', 'text_ar' => 'تنظيف داخلي وخارجي للمباني المكتملة', 'order' => 5],
                    ['text_en' => 'Removal and disposal of non-hazardous construction waste', 'text_ar' => 'إزالة والتخلص من نفايات البناء غير الخطرة', 'order' => 6],
                    ['text_en' => 'Final touch-up cleaning prior to project handover', 'text_ar' => 'تنظيف نهائي قبل تسليم المشروع', 'order' => 7],
                    ['text_en' => 'Deep cleaning of common areas, staircases, corridors, and entrances', 'text_ar' => 'تنظيف عميق للمناطق المشتركة والأدراج والممرات والمداخل', 'order' => 8],
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

            CleaningScopeItem::where('cleaning_service_scope_id', $scope->id)->delete();

            foreach ($items as $item) {
                CleaningScopeItem::create([
                    'cleaning_service_scope_id' => $scope->id,
                    'text_en' => $item['text_en'],
                    'text_ar' => $item['text_ar'],
                    'order' => $item['order'],
                ]);
            }
        }
    }

    private function seedAboutContent(): void
    {
        $contents = [
            [
                'key' => 'overview',
                'content_en' => 'ARKAAN CONSTRUCTION COMPANY is a leading construction and manpower solutions provider delivering high-quality engineering, construction, and workforce services across the Kingdom of Saudi Arabia, serving the oil & gas, petrochemical, power, infrastructure, manufacturing, and commercial sectors. Our construction capabilities span civil, structural, architectural, mechanical, and industrial works, backed by experienced engineers, project managers, and skilled technical personnel — while our manpower division supplies qualified engineers, technicians, supervisors, operators, and administrative professionals. Health, Safety, Environment (HSE), and quality management are fundamental to everything we do, allowing clients to benefit from a single, dependable partner for both construction execution and workforce support.',
                'content_ar' => 'شركة أركان للمقاولات هي مزود رائد لحلول البناء والقوى العاملة، تقدّم خدمات هندسية وإنشائية وقوى عاملة عالية الجودة في جميع أنحاء المملكة العربية السعودية، وتخدم قطاعات النفط والغاز والبتروكيماويات والطاقة والبنية التحتية والتصنيع والقطاع التجاري. تشمل قدراتنا الإنشائية الأعمال المدنية والإنشائية والمعمارية والميكانيكية والصناعية، بدعم من مهندسين ومديري مشاريع وكوادر فنية ماهرة ذوي خبرة — بينما يوفر قسم القوى العاملة لدينا مهندسين وفنيين ومشرفين ومشغلين وموظفين إداريين مؤهلين. تُعد الصحة والسلامة والبيئة وإدارة الجودة أساس كل ما نقوم به، مما يتيح لعملائنا الاستفادة من شريك واحد موثوق لتنفيذ الإنشاءات ودعم القوى العاملة معاً.',
            ],
            [
                'key' => 'vision',
                'content_en' => "ARKAAN CONSTRUCTION COMPANY aspires to be a recognized leader and preferred partner in Saudi Arabia's construction and manpower sectors by consistently delivering excellence, reliability, and value. Aligned with Saudi Vision 2030, we are dedicated to driving infrastructure and industrial development while supporting sustainable economic growth through high-quality project execution and skilled workforce solutions — grounded in quality, safety, and environmental stewardship.",
                'content_ar' => 'تطمح شركة أركان للمقاولات إلى أن تكون رائدة معترف بها وشريكاً مفضلاً في قطاعي البناء والقوى العاملة في المملكة العربية السعودية، من خلال تقديم التميز والموثوقية والقيمة باستمرار. وانسجاماً مع رؤية السعودية 2030، نلتزم بدفع عجلة تطوير البنية التحتية والصناعة ودعم النمو الاقتصادي المستدام من خلال تنفيذ مشاريع عالية الجودة وحلول قوى عاملة ماهرة — قائمة على الجودة والسلامة والحفاظ على البيئة.',
            ],
            [
                'key' => 'mission',
                'content_en' => 'Our mission is to deliver high-quality, reliable construction and manpower solutions through technical excellence, operational efficiency, and unwavering integrity. Dedicated to supporting Saudi Arabia\'s industrial and economic growth, we execute commercial, industrial, and infrastructure projects with precision, cost-effectiveness, and strict compliance with Health, Safety, Quality, and Environmental (HSQE) standards — deploying skilled, highly qualified personnel to complete every project safely, on time, and within budget.',
                'content_ar' => 'رسالتنا هي تقديم حلول بناء وقوى عاملة موثوقة وعالية الجودة من خلال التميز الفني والكفاءة التشغيلية والنزاهة الثابتة. والتزاماً منا بدعم النمو الصناعي والاقتصادي للمملكة العربية السعودية، ننفذ المشاريع التجارية والصناعية ومشاريع البنية التحتية بدقة وفعالية من حيث التكلفة والتزام صارم بمعايير الصحة والسلامة والجودة والبيئة (HSQE) — من خلال نشر كوادر ماهرة ومؤهلة تأهيلاً عالياً لإتمام كل مشروع بأمان وفي الوقت المحدد وضمن الميزانية.',
            ],
            [
                'key' => 'ceo_message',
                'content_en' => 'At ARKAAN, we are driven by a commitment to excellence, integrity, and innovation. Every successful project is built on trust, collaboration, and a clear understanding of our clients\' objectives — and we remain committed to the highest standards of Health, Safety, Quality, and Environmental (HSQE) practice as we grow. Thank you for your confidence in ARKAAN CONSTRUCTION COMPANY; we look forward to being your trusted partner in delivering excellence. — Chief Executive Officer, Arkaan Construction Company',
                'content_ar' => 'في أركان، ينبع التزامنا من السعي للتميز والنزاهة والابتكار. يُبنى كل مشروع ناجح على الثقة والتعاون وفهم واضح لأهداف عملائنا — ونظل ملتزمين بأعلى معايير الصحة والسلامة والجودة والبيئة مع استمرار نمونا. شكراً لثقتكم بشركة أركان للمقاولات؛ نتطلع لأن نكون شريككم الموثوق في تحقيق التميز. — الرئيس التنفيذي، شركة أركان للمقاولات',
            ],
        ];

        foreach ($contents as $content) {
            AboutContent::updateOrCreate(['key' => $content['key']], $content);
        }
    }

    private function seedCoreValues(): void
    {
        $values = [
            ['title_en' => 'Integrity', 'title_ar' => 'النزاهة', 'description_en' => 'We conduct our business with honesty, transparency, and ethical practices, building long-term relationships based on trust and accountability.', 'description_ar' => 'ندير أعمالنا بصدق وشفافية وممارسات أخلاقية، ونبني علاقات طويلة الأمد قائمة على الثقة والمساءلة.', 'icon' => 'shield', 'order' => 1],
            ['title_en' => 'Quality', 'title_ar' => 'الجودة', 'description_en' => 'We are committed to delivering superior workmanship and services that consistently meet or exceed client expectations while complying with international quality standards.', 'description_ar' => 'نلتزم بتقديم مستوى متميز من الحرفية والخدمات التي تلبي أو تتجاوز توقعات العملاء باستمرار، مع الامتثال لمعايير الجودة الدولية.', 'icon' => 'star', 'order' => 2],
            ['title_en' => 'Safety', 'title_ar' => 'السلامة', 'description_en' => 'Safety is our highest priority. We maintain a strong Health, Safety, and Environmental (HSE) culture to ensure a safe and healthy workplace for our employees, clients, and stakeholders.', 'description_ar' => 'السلامة هي أولويتنا القصوى. نحافظ على ثقافة قوية للصحة والسلامة والبيئة لضمان بيئة عمل آمنة وصحية لموظفينا وعملائنا وأصحاب المصلحة.', 'icon' => 'shield-check', 'order' => 3],
            ['title_en' => 'Reliability', 'title_ar' => 'الموثوقية', 'description_en' => 'We honor our commitments by delivering dependable services, skilled resources, and timely project execution with consistency and efficiency.', 'description_ar' => 'نفي بالتزاماتنا من خلال تقديم خدمات موثوقة وموارد ماهرة وتنفيذ المشاريع في وقتها بثبات وكفاءة.', 'icon' => 'check-circle', 'order' => 4],
            ['title_en' => 'Professionalism', 'title_ar' => 'الاحترافية', 'description_en' => 'We uphold the highest standards of competence, discipline, and respect in every aspect of our operations, ensuring excellence in management, supervision, and workforce performance.', 'description_ar' => 'نلتزم بأعلى معايير الكفاءة والانضباط والاحترام في كل جانب من جوانب عملياتنا، بما يضمن التميز في الإدارة والإشراف وأداء القوى العاملة.', 'icon' => 'award', 'order' => 5],
            ['title_en' => 'Compliance', 'title_ar' => 'الامتثال', 'description_en' => 'We strictly adhere to the laws and regulations of the Kingdom of Saudi Arabia, client specifications, contractual obligations, and industry best practices to ensure full compliance across all our operations.', 'description_ar' => 'نلتزم التزاماً صارماً بأنظمة وقوانين المملكة العربية السعودية ومواصفات العملاء والالتزامات التعاقدية وأفضل الممارسات في القطاع لضمان الامتثال الكامل في جميع عملياتنا.', 'icon' => 'file-check', 'order' => 6],
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
        // Match key includes 'value', and the old placeholder values (15+,
        // 500+, 10,000+, 100+) are being replaced with defensible facts from
        // the profile rather than invented numbers — clear old rows first.
        Stat::query()->delete();

        $stats = [
            ['value' => '4', 'label_en' => 'Core Service Lines', 'label_ar' => 'خطوط خدمة رئيسية', 'icon' => 'layers', 'order' => 1],
            ['value' => '3', 'label_en' => 'Cities Served: Jubail, Dammam & Riyadh', 'label_ar' => 'مدن الحضور: الجبيل والدمام والرياض', 'icon' => 'map-pin', 'order' => 2],
            ['value' => '6+', 'label_en' => 'Industry Sectors Served', 'label_ar' => 'قطاعات صناعية نخدمها', 'icon' => 'factory', 'order' => 3],
            ['value' => '100%', 'label_en' => 'PPE Usage & HSE Compliance', 'label_ar' => 'الالتزام بمعدات الحماية الشخصية والسلامة', 'icon' => 'shield-check', 'order' => 4],
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
                'content_en' => '<ul>'
                    .'<li><strong>Full Compliance:</strong> Adhering to all Saudi laws, regulations, and client HSQE standards.</li>'
                    .'<li><strong>Safety First:</strong> Mandatory HSE inductions, daily toolbox talks, and continuous training.</li>'
                    .'<li><strong>Protection &amp; Gear:</strong> Enforcing 100% PPE usage and proactive risk assessments with preventive controls.</li>'
                    .'<li><strong>Quality Assurance:</strong> Executing work to technical specifications with continuous inspections and engineering best practices.</li>'
                    .'<li><strong>Environmental Care:</strong> Responsible waste management and sustainable operational practices.</li>'
                    .'<li><strong>Zero Incidents:</strong> Striving for zero accidents through continuous improvement and accountability.</li>'
                    .'</ul>',
                'content_ar' => '<ul>'
                    .'<li><strong>الامتثال الكامل:</strong> الالتزام بجميع الأنظمة السعودية ومعايير الصحة والسلامة والجودة والبيئة الخاصة بالعملاء.</li>'
                    .'<li><strong>السلامة أولاً:</strong> توجيهات سلامة إلزامية، وجلسات توعية يومية، وتدريب مستمر.</li>'
                    .'<li><strong>الحماية والمعدات:</strong> فرض استخدام معدات الحماية الشخصية بنسبة 100% وتقييمات استباقية للمخاطر مع ضوابط وقائية.</li>'
                    .'<li><strong>ضمان الجودة:</strong> تنفيذ الأعمال وفق المواصفات الفنية مع تفتيش مستمر وأفضل الممارسات الهندسية.</li>'
                    .'<li><strong>العناية بالبيئة:</strong> إدارة مسؤولة للنفايات وممارسات تشغيلية مستدامة.</li>'
                    .'<li><strong>صفر حوادث:</strong> السعي لتحقيق صفر حوادث من خلال التحسين المستمر والمساءلة.</li>'
                    .'</ul>',
            ]
        );

        HseContent::updateOrCreate(
            ['key' => 'policy_link'],
            [
                'content_en' => null,
                'content_ar' => null,
                'link' => '/company-profile.pdf',
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
                'link' => '/hse-contact',
            ]
        );
    }

    private function seedClientCategories(): void
    {
        $categories = [
            ['name_en' => 'Government', 'name_ar' => 'حكومي', 'description_en' => 'We support government ministries, municipalities, authorities, and public institutions by delivering construction, maintenance, and workforce solutions in accordance with Saudi regulations and project specifications.', 'description_ar' => 'ندعم الوزارات والبلديات والهيئات والمؤسسات الحكومية من خلال تقديم حلول البناء والصيانة والقوى العاملة وفقاً للأنظمة السعودية ومواصفات المشاريع.', 'icon' => 'building', 'order' => 1],
            ['name_en' => 'Semi-Government', 'name_ar' => 'شبه حكومي', 'description_en' => 'We partner with semi-government entities, public corporations, and development authorities, providing dependable construction and technical services that contribute to national infrastructure and industrial development.', 'description_ar' => 'نتشارك مع الجهات شبه الحكومية والمؤسسات العامة وهيئات التطوير، ونقدم خدمات إنشائية وفنية موثوقة تسهم في تطوير البنية التحتية والصناعة الوطنية.', 'icon' => 'landmark', 'order' => 2],
            ['name_en' => 'Private', 'name_ar' => 'خاص', 'description_en' => 'We work closely with private developers, EPC contractors, consultants, and corporate organizations, delivering cost-effective construction, MEP, maintenance, and manpower solutions for projects of all sizes.', 'description_ar' => 'نعمل عن كثب مع المطورين ومقاولي EPC والاستشاريين والمؤسسات الخاصة، ونقدم حلول بناء وأعمال كهروميكانيكية وصيانة وقوى عاملة فعالة من حيث التكلفة لمشاريع بجميع أحجامها.', 'icon' => 'briefcase', 'order' => 3],
            ['name_en' => 'Industrial', 'name_ar' => 'صناعي', 'description_en' => 'Our services extend to oil & gas, petrochemical, manufacturing, logistics, power, warehousing, retail, healthcare, hospitality, educational, and commercial facilities — providing specialized project support, skilled manpower, and maintenance to ensure safe, efficient operations.', 'description_ar' => 'تمتد خدماتنا لتشمل قطاعات النفط والغاز والبتروكيماويات والتصنيع والخدمات اللوجستية والطاقة والتخزين والتجزئة والرعاية الصحية والضيافة والتعليم والمنشآت التجارية — لضمان تشغيل آمن وفعّال.', 'icon' => 'factory', 'order' => 4],
        ];

        foreach ($categories as $cat) {
            ClientCategory::updateOrCreate(
                ['name_en' => $cat['name_en']],
                array_merge($cat, ['is_active' => true])
            );
        }
    }

    private function seedWhyChooseUs(): void
    {
        // Titles are changing from the old placeholder set entirely, so
        // clear the table first to avoid leaving stale duplicate rows.
        WhyChooseUs::query()->delete();

        $items = [
            ['title_en' => 'Reliable Construction & Manpower Solutions', 'title_ar' => 'حلول بناء وقوى عاملة موثوقة', 'description_en' => 'Comprehensive construction, MEP, cleaning, and workforce services delivered with consistency, efficiency, and professionalism.', 'description_ar' => 'خدمات بناء وأعمال كهروميكانيكية وتنظيف وقوى عاملة شاملة، تُقدَّم بثبات وكفاءة واحترافية.', 'icon' => 'shield-check', 'order' => 1],
            ['title_en' => 'Experienced & Skilled Workforce', 'title_ar' => 'قوى عاملة ماهرة وذات خبرة', 'description_en' => 'Qualified engineers, supervisors, technicians, and skilled tradesmen selected to meet the highest industry and client standards.', 'description_ar' => 'مهندسون ومشرفون وفنيون وحرفيون مهرة مؤهلون يتم اختيارهم لتلبية أعلى معايير الصناعة والعملاء.', 'icon' => 'users', 'order' => 2],
            ['title_en' => 'Commitment to Quality & Safety', 'title_ar' => 'الالتزام بالجودة والسلامة', 'description_en' => 'Strict adherence to Health, Safety, Quality, and Environmental (HSQE) standards, ensuring safe operations and superior workmanship on every project.', 'description_ar' => 'التزام صارم بمعايير الصحة والسلامة والجودة والبيئة، لضمان عمليات آمنة وجودة تنفيذ متميزة في كل مشروع.', 'icon' => 'award', 'order' => 3],
            ['title_en' => 'Timely Project Execution', 'title_ar' => 'تنفيذ المشاريع في الوقت المحدد', 'description_en' => 'Effective planning, resource management, and rapid manpower mobilization to deliver projects on schedule and within budget.', 'description_ar' => 'تخطيط فعّال وإدارة للموارد وتعبئة سريعة للقوى العاملة لتسليم المشاريع في موعدها وضمن الميزانية.', 'icon' => 'clock', 'order' => 4],
            ['title_en' => 'Transparent & Ethical Business Practices', 'title_ar' => 'ممارسات عمل شفافة وأخلاقية', 'description_en' => 'We conduct our business with integrity, accountability, and open communication, fostering long-term relationships built on trust.', 'description_ar' => 'ندير أعمالنا بنزاهة ومساءلة وتواصل مفتوح، بما يعزز علاقات طويلة الأمد قائمة على الثقة.', 'icon' => 'file-check', 'order' => 5],
            ['title_en' => 'Customer-Focused Approach', 'title_ar' => 'نهج يركز على العميل', 'description_en' => 'We work closely with our clients to understand their objectives and deliver customized solutions that meet their operational and project requirements.', 'description_ar' => 'نعمل عن كثب مع عملائنا لفهم أهدافهم وتقديم حلول مخصصة تلبي متطلباتهم التشغيلية ومتطلبات مشاريعهم.', 'icon' => 'target', 'order' => 6],
            ['title_en' => 'Compliance & Professional Excellence', 'title_ar' => 'الامتثال والتميز المهني', 'description_en' => 'Full compliance with Saudi regulations, client specifications, and industry best practices while maintaining the highest standards of professionalism.', 'description_ar' => 'امتثال كامل للأنظمة السعودية ومواصفات العملاء وأفضل ممارسات القطاع، مع الحفاظ على أعلى معايير الاحترافية.', 'icon' => 'badge-check', 'order' => 7],
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
        // Phone and WhatsApp are intentionally not published — email is the
        // only direct contact channel shown on the site.
        ContactInfo::whereIn('key', ['phone', 'whatsapp'])->delete();

        $contacts = [
            ['key' => 'address', 'value_en' => 'PO BOX 35514, AL Safat Dist. 4628, AL Jubail, Kingdom of Saudi Arabia', 'value_ar' => 'ص.ب 35514، حي الصفاء 4628، الجبيل، المملكة العربية السعودية', 'icon' => 'map-pin', 'order' => 1],
            ['key' => 'email', 'value_en' => 'info@arkaanconstruction.com', 'value_ar' => 'info@arkaanconstruction.com', 'icon' => 'mail', 'order' => 3],
            ['key' => 'hours', 'value_en' => 'Sun - Thu: 8:00 AM - 5:00 PM', 'value_ar' => 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً', 'icon' => 'clock', 'order' => 4],
            ['key' => 'website', 'value_en' => 'www.arkaanconstruction.com', 'value_ar' => 'www.arkaanconstruction.com', 'icon' => 'globe', 'order' => 6],
            ['key' => 'cities', 'value_en' => 'Jubail | Dammam | Riyadh', 'value_ar' => 'الجبيل | الدمام | الرياض', 'icon' => 'map', 'order' => 7],
        ];

        foreach ($contacts as $contact) {
            ContactInfo::updateOrCreate(
                ['key' => $contact['key']],
                array_merge($contact, ['is_active' => true])
            );
        }
    }

    /**
     * The old seed data included fabricated named clients, testimonials, and
     * project case studies (e.g. "Saudi Binladin Group", "NEOM Infrastructure
     * Development") that never appeared in the real company profile. None of
     * that is real, so instead of reseeding placeholder companies we simply
     * clear those tables — the Clients and Capabilities pages now render the
     * real sector categories and service capabilities from the profile
     * instead (see seedClientCategories() and seedServices()).
     */
    private function clearFabricatedShowcaseData(): void
    {
        Testimonial::query()->delete();
        ProjectGalleryItem::query()->delete();
        Project::query()->delete();
        Client::query()->delete();
    }

    private function seedSiteSettings(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'Arkaan Construction Company', 'group' => 'seo'],
            ['key' => 'default_meta_title', 'value' => 'Arkaan Construction Company', 'group' => 'seo'],
            ['key' => 'default_meta_description', 'value' => 'Your trusted partner for construction, contracting, MEP, manpower, and cleaning services across Saudi Arabia.', 'group' => 'seo'],
            ['key' => 'default_meta_keywords', 'value' => 'construction, MEP, manpower supply, dedicated cleaning, Saudi Arabia, Jubail, Dammam, Riyadh', 'group' => 'seo'],
            ['key' => 'cr_number', 'value' => null, 'group' => 'legal'],
            ['key' => 'vat_number', 'value' => null, 'group' => 'legal'],
            ['key' => 'map_embed_url', 'value' => null, 'group' => 'map'],
            ['key' => 'quote_request_email', 'value' => 'info@arkaanconstruction.com', 'group' => 'notifications'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
