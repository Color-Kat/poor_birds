<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
{{--    <meta name="viewport" content="width=device-width, initial-scale=1">--}}
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Бедные птички</title>

    <!--  favicons  -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ URL::asset('favicons/apple-touch-icon.png')  }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ URL::asset('favicons/favicon-32x32.png')  }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ URL::asset('favicons/favicon-16x16.png')  }}">
    <link rel="manifest" href="{{ URL::asset('favicons/site.webmanifest')  }}">
    <link rel="mask-icon" href="{{ URL::asset('favicons/safari-pinned-tab.svg')  }}" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">

    <!-- Scripts -->
    <script src="/js/app.js" defer></script>

    <!--  NProgress  -->
{{--    <script src='nprogress.js'></script>--}}
{{--    <link rel='stylesheet' href='nprogress.css'/>--}}

    <!-- Styles -->
    <link href="/css/app.css" rel="stylesheet">
    <style>
        html, body {
            background-color: #fff;
            color: #636b6f;
            font-family: 'Nunito', sans-serif;
            font-weight: 200;
            height: 100vh;
            margin: 0;
        }
        * {box-sizing: content-box;}
    </style>
</head>
<body>
<div id="app">
    <app></app>
</div>
{{--    <script src="/js/app.js"></script>--}}
</body>
</html>
