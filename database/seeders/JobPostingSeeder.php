<?php

namespace Database\Seeders;

use App\Models\JobPosting;
use Illuminate\Database\Seeder;

class JobPostingSeeder extends Seeder
{
    /**
     * Seed common job openings for Arkaan Construction Company.
     */
    public function run(): void
    {
        $postings = [
            [
                'title_en' => 'Site Engineer',
                'title_ar' => 'مهندس موقع',
                'description_en' => '<p>We are seeking an experienced Site Engineer to supervise daily construction activities, coordinate with subcontractors, and ensure work complies with drawings, specifications, and safety standards.</p><ul><li>Monitor progress and report to the Project Manager</li><li>Review shop drawings and method statements</li><li>Conduct site inspections and quality checks</li><li>Ensure HSE procedures are followed on site</li></ul><p><strong>Requirements:</strong> Bachelor’s degree in Civil Engineering, 3+ years site experience in Saudi Arabia, strong communication skills.</p>',
                'description_ar' => '<p>نبحث عن مهندس موقع ذي خبرة للإشراف على أعمال البناء اليومية والتنسيق مع المقاولين من الباطن وضمان مطابقة الأعمال للمخططات والمواصفات ومعايير السلامة.</p><ul><li>متابعة التقدم ورفع التقارير لمدير المشروع</li><li>مراجعة مخططات التنفيذ وطرق العمل</li><li>إجراء الفحوصات الميدانية ومراقبة الجودة</li><li>ضمان تطبيق إجراءات الصحة والسلامة</li></ul><p><strong>المتطلبات:</strong> بكالوريوس هندسة مدنية، خبرة موقع 3+ سنوات في المملكة، مهارات تواصل جيدة.</p>',
                'location_en' => 'Riyadh, Saudi Arabia',
                'location_ar' => 'الرياض، المملكة العربية السعودية',
                'employment_type' => 'full-time',
                'application_deadline' => now()->addMonths(2)->toDateString(),
                'order' => 1,
            ],
            [
                'title_en' => 'MEP Engineer',
                'title_ar' => 'مهندس أعمال كهروميكانيكية',
                'description_en' => '<p>Join our MEP division to manage mechanical, electrical, and plumbing systems across commercial and industrial projects.</p><ul><li>Review MEP design drawings and BOQs</li><li>Coordinate MEP installation with civil works</li><li>Support commissioning and testing activities</li><li>Resolve technical issues with consultants and vendors</li></ul><p><strong>Requirements:</strong> Degree in Mechanical or Electrical Engineering, MEP contracting experience, familiarity with Saudi building codes.</p>',
                'description_ar' => '<p>انضم إلى قسم الأعمال الكهروميكانيكية لإدارة الأنظمة الميكانيكية والكهربائية والسباكة في المشاريع التجارية والصناعية.</p><ul><li>مراجعة مخططات التصميم الكهروميكانيكي وجداول الكميات</li><li>تنسيق تركيب الأعمال الكهروميكانيكية مع الأعمال المدنية</li><li>دعم أعمال التشغيل والاختبار</li><li>حل المشكلات الفنية مع الاستشاريين والموردين</li></ul><p><strong>المتطلبات:</strong> شهادة في الهندسة الميكانيكية أو الكهربائية، خبرة في مقاولات MEP، معرفة بكود البناء السعودي.</p>',
                'location_en' => 'Eastern Province, Saudi Arabia',
                'location_ar' => 'المنطقة الشرقية، المملكة العربية السعودية',
                'employment_type' => 'full-time',
                'application_deadline' => now()->addMonths(2)->toDateString(),
                'order' => 2,
            ],
            [
                'title_en' => 'Civil Foreman',
                'title_ar' => 'مراقب أعمال مدنية',
                'description_en' => '<p>Responsible for leading construction crews, assigning daily tasks, and maintaining productivity and safety on site.</p><ul><li>Direct workers and monitor workmanship</li><li>Read and interpret construction drawings</li><li>Report material and manpower requirements</li><li>Enforce PPE and site safety rules</li></ul><p><strong>Requirements:</strong> 5+ years foreman experience in civil works, ability to lead multi-national teams.</p>',
                'description_ar' => '<p>مسؤول عن قيادة فرق البناء وتوزيع المهام اليومية والحفاظ على الإنتاجية والسلامة في الموقع.</p><ul><li>توجيه العمال ومتابعة جودة التنفيذ</li><li>قراءة وتفسير مخططات البناء</li><li>رفع احتياجات المواد والقوى العاملة</li><li>تطبيق معدات الوقاية وقواعد السلامة</li></ul><p><strong>المتطلبات:</strong> خبرة 5+ سنوات كمراقب في الأعمال المدنية، القدرة على قيادة فرق متعددة الجنسيات.</p>',
                'location_en' => 'Jubail / Dammam, Saudi Arabia',
                'location_ar' => 'الجبيل / الدمام، المملكة العربية السعودية',
                'employment_type' => 'full-time',
                'application_deadline' => null,
                'order' => 3,
            ],
            [
                'title_en' => 'HSE Officer',
                'title_ar' => 'مسؤول الصحة والسلامة',
                'description_en' => '<p>Ensure compliance with company HSE policies, conduct toolbox talks, and support incident reporting and prevention across project sites.</p><ul><li>Daily site safety inspections and audits</li><li>Prepare HSE documentation and reports</li><li>Deliver safety inductions and training</li><li>Investigate near-misses and incidents</li></ul><p><strong>Requirements:</strong> NEBOSH or equivalent certification, 2+ years HSE experience in construction, valid Saudi work authorization.</p>',
                'description_ar' => '<p>ضمان الالتزام بسياسات الصحة والسلامة، وتنفيذ اجتماعات السلامة، ودعم الإبلاغ عن الحوادث والوقاية منها في مواقع المشاريع.</p><ul><li>الفحوصات والتدقيقات اليومية للسلامة</li><li>إعداد مستندات وتقارير HSE</li><li>تقديم برامج التوعية والتدريب</li><li>التحقيق في الحوادث والإبلاغ عنها</li></ul><p><strong>المتطلبات:</strong> شهادة NEBOSH أو ما يعادلها، خبرة 2+ سنوات في البناء، إقامة/تصريح عمل ساري.</p>',
                'location_en' => 'Kingdom-wide, Saudi Arabia',
                'location_ar' => 'جميع أنحاء المملكة',
                'employment_type' => 'full-time',
                'application_deadline' => now()->addMonths(3)->toDateString(),
                'order' => 4,
            ],
            [
                'title_en' => 'Skilled Electrician',
                'title_ar' => 'كهربائي ماهر',
                'description_en' => '<p>Install, maintain, and troubleshoot electrical systems for building and infrastructure projects.</p><ul><li>Cable routing, termination, and panel installation</li><li>Testing and commissioning support</li><li>Follow approved electrical drawings</li><li>Maintain tools and work areas safely</li></ul><p><strong>Requirements:</strong> Proven electrician experience, ability to read electrical schematics, valid Iqama preferred.</p>',
                'description_ar' => '<p>تركيب وصيانة وإصلاح الأنظمة الكهربائية لمشاريع المباني والبنية التحتية.</p><ul><li>تمديد الكابلات والتوصيلات وتركيب اللوحات</li><li>دعم الاختبار والتشغيل</li><li>العمل وفق المخططات الكهربائية المعتمدة</li><li>الحفاظ على الأدوات ومناطق العمل بأمان</li></ul><p><strong>المتطلبات:</strong> خبرة مثبتة ككهربائي، القدرة على قراءة المخططات، إقامة سارية مفضلة.</p>',
                'location_en' => 'Riyadh / Dammam, Saudi Arabia',
                'location_ar' => 'الرياض / الدمام، المملكة العربية السعودية',
                'employment_type' => 'contract',
                'application_deadline' => null,
                'order' => 5,
            ],
            [
                'title_en' => 'General Construction Worker',
                'title_ar' => 'عامل بناء',
                'description_en' => '<p>Support civil construction teams with formwork, concrete, finishing, and general site assistance under supervisor direction.</p><ul><li>Assist with material handling and site cleanup</li><li>Follow safe work procedures at all times</li><li>Work rotating shifts when required</li></ul><p><strong>Requirements:</strong> Physical fitness, prior construction site experience is an advantage, team-oriented attitude.</p>',
                'description_ar' => '<p>دعم فرق البناء في أعمال القوالب والخرسانة والتشطيب والمساعدة العامة في الموقع تحت إشراف المراقب.</p><ul><li>المساعدة في نقل المواد وتنظيف الموقع</li><li>اتباع إجراءات العمل الآمنة</li><li>العمل بنظام الورديات عند الحاجة</li></ul><p><strong>المتطلبات:</strong> لياقة بدنية، خبرة موقع بناء ميزة، روح العمل الجماعي.</p>',
                'location_en' => 'Multiple Locations, Saudi Arabia',
                'location_ar' => 'مواقع متعددة، المملكة العربية السعودية',
                'employment_type' => 'temporary',
                'application_deadline' => null,
                'order' => 6,
            ],
            [
                'title_en' => 'Cleaning Supervisor',
                'title_ar' => 'مشرف تنظيف',
                'description_en' => '<p>Lead dedicated cleaning teams for commercial, industrial, and post-construction cleaning contracts.</p><ul><li>Plan daily cleaning schedules and checklists</li><li>Train staff on chemicals, equipment, and safety</li><li>Inspect work quality and client satisfaction</li><li>Coordinate with project managers on site access</li></ul><p><strong>Requirements:</strong> 3+ years supervisory experience in facility or industrial cleaning, good Arabic/English communication.</p>',
                'description_ar' => '<p>قيادة فرق التنظيف في عقود التنظيف التجاري والصناعي وما بعد البناء.</p><ul><li>تخطيط جداول التنظيف اليومية وقوائم المراجعة</li><li>تدريب الموظفين على المواد الكيميائية والمعدات والسلامة</li><li>فحص جودة العمل ورضا العملاء</li><li>التنسيق مع مديري المشاريع للدخول للموقع</li></ul><p><strong>المتطلبات:</strong> خبرة إشراف 3+ سنوات في التنظيف، تواصل جيد بالعربية والإنجليزية.</p>',
                'location_en' => 'Riyadh, Saudi Arabia',
                'location_ar' => 'الرياض، المملكة العربية السعودية',
                'employment_type' => 'full-time',
                'application_deadline' => now()->addMonth()->toDateString(),
                'order' => 7,
            ],
        ];

        foreach ($postings as $posting) {
            JobPosting::query()->updateOrCreate(
                ['title_en' => $posting['title_en']],
                array_merge($posting, ['is_active' => true]),
            );
        }
    }
}
