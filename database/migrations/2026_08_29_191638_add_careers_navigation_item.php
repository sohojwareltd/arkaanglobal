<?php

use App\Models\NavigationItem;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        NavigationItem::query()->updateOrCreate(
            ['path' => '/careers'],
            [
                'label_en' => 'Careers',
                'label_ar' => 'الوظائف',
                'order' => 6,
                'is_active' => true,
            ],
        );

        NavigationItem::query()
            ->where('path', '/hse-contact')
            ->update(['order' => 7]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        NavigationItem::query()->where('path', '/careers')->delete();

        NavigationItem::query()
            ->where('path', '/hse-contact')
            ->update(['order' => 6]);
    }
};
