<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Odontoradiosis | Acesso</title>

    <link rel="stylesheet" href="{{ asset('css/style.css') }}" media="screen" type="text/css"/>
    <link rel="icon" href="{{ asset('img/ico.png') }}">

</head>

<body class="profile-login">
<header class="global-header">
    <div>
        <nav class="global-nav">
            <!-- <center></center> -->
        </nav>
    </div>
</header>
<section class="login">
    <h1><img src="{{ asset('img/LOGO.png') }}"></h1>
    <h1>Odontoradiosis</h1>
    @yield('content')
</section>
</body>
</html>
