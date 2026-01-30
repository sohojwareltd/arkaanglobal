<?php

namespace App\Filament\Widgets;

use App\Models\Certificate;
use App\Models\CoreValue;
use App\Models\HeroSection;
use App\Models\Service;
use App\Models\Stat;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat as StatCard;

class ContentStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            StatCard::make('Active Services', Service::where('is_active', true)->count())
                ->description('Total active services')
                ->descriptionIcon('heroicon-m-wrench-screwdriver')
                ->color('success'),
            StatCard::make('Hero Sections', HeroSection::where('is_active', true)->count())
                ->description('Active hero sections')
                ->descriptionIcon('heroicon-m-photo')
                ->color('info'),
            StatCard::make('Core Values', CoreValue::where('is_active', true)->count())
                ->description('Active core values')
                ->descriptionIcon('heroicon-m-star')
                ->color('warning'),
            StatCard::make('Certificates', Certificate::where('is_active', true)->count())
                ->description('Active certificates')
                ->descriptionIcon('heroicon-m-academic-cap')
                ->color('primary'),
            StatCard::make('Statistics', Stat::where('is_active', true)->count())
                ->description('Active statistics')
                ->descriptionIcon('heroicon-m-chart-bar')
                ->color('success'),
        ];
    }
}
