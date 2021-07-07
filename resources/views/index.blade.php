<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Бедные птички - экономическая игра с сюжетом и интересной механикой,
 в которой нужно покупать птиц и зарабатывать, продавая их яйца. В игре есть очень много всего:
начиная от контрактов с людьми и заканчивая игрой на реальном курсе биткойна!">
    <meta name="theme-color" content="#ffffff" />
    <meta name="apple-mobile-web-app-title" content="Бедные птички">
    <meta name="application-name" content="Бедные птички">
    <meta name="theme-color" content="#ffffff">
    <base href="/">

    <title>Бедные птички</title>

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!--  favicons  -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ URL::asset('favicons/apple-touch-icon.png')  }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ URL::asset('favicons/favicon-32x32.png')  }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ URL::asset('favicons/favicon-16x16.png')  }}">
    <link rel="mask-icon" href="{{ URL::asset('favicons/safari-pinned-tab.svg')  }}" color="#5bbad5">

    <!-- manifest -->
    <link rel="manifest" href="{{ URL::asset('manifest.json')  }}">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">


    <!-- Styles -->
{{--    <link href="/css/app.css" rel="stylesheet">--}}
    <link rel="stylesheet" href="{{ mix('css/app.css') }}" />

    <style>
        html, body {
            font-family: 'Nunito', sans-serif;
            font-weight: 200;
            height: 100vh;
            margin: 0;
        }
        * {box-sizing: content-box;}
    </style>
</head>
<body class="blue-200">
<div id="app">
    <app></app>
</div>

<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
