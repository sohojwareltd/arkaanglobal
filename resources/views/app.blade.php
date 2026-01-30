<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Arkaan Global Contracting') }}</title>

        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
        <link rel="manifest" href="/favicon/site.webmanifest">
        <meta name="theme-color" content="#0d4554">

        <!-- Default SEO Meta Tags -->
        <meta name="description" content="Arkaan Global Contracting - Leading provider of construction, MEP, manpower, and cleaning services in Saudi Arabia. Strength in People, Precision in Work.">
        <meta name="keywords" content="construction, MEP services, manpower solutions, cleaning services, Saudi Arabia, contracting, civil works">
        <meta name="author" content="Arkaan Global Contracting">
        <meta name="robots" content="index, follow">
        <meta name="language" content="English, Arabic">
        <meta name="revisit-after" content="7 days">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="Arkaan Global Contracting - Construction, MEP, Manpower & Cleaning Services">
        <meta property="og:description" content="Leading provider of construction, MEP, manpower, and cleaning services in Saudi Arabia. Strength in People, Precision in Work.">
        <meta property="og:image" content="{{ url('/logo-main.png') }}">
        <meta property="og:site_name" content="Arkaan Global Contracting">
        <meta property="og:locale" content="en_US">
        <meta property="og:locale:alternate" content="ar_SA">

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" content="{{ url()->current() }}">
        <meta name="twitter:title" content="Arkaan Global Contracting - Construction, MEP, Manpower & Cleaning Services">
        <meta name="twitter:description" content="Leading provider of construction, MEP, manpower, and cleaning services in Saudi Arabia.">
        <meta name="twitter:image" content="{{ url('/logo-main.png') }}">

        <!-- Canonical URL -->
        <link rel="canonical" href="{{ url()->current() }}">

        <!-- Preconnect for Performance -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="dns-prefetch" href="https://fonts.bunny.net">

        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
        @inertiaHead

        <!-- Google Analytics (GA4) -->
        @if(config('services.google_analytics_id'))
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ config('services.google_analytics_id') }}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            window.GA_MEASUREMENT_ID = '{{ config('services.google_analytics_id') }}';
            gtag('config', '{{ config('services.google_analytics_id') }}', {
                'page_path': window.location.pathname + window.location.search,
                'page_title': document.title
            });
        </script>
        @endif

        <!-- Facebook Pixel -->
        @if(config('services.facebook_pixel_id'))
        <script>
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '{{ config('services.facebook_pixel_id') }}');
            fbq('track', 'PageView');
        </script>
        <noscript>
            <img height="1" width="1" style="display:none"
                 src="https://www.facebook.com/tr?id={{ config('services.facebook_pixel_id') }}&ev=PageView&noscript=1"/>
        </noscript>
        @endif

        <!-- Microsoft Clarity -->
        @if(config('services.microsoft_clarity_id'))
        <script type="text/javascript">
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "{{ config('services.microsoft_clarity_id') }}");
        </script>
        @endif
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
