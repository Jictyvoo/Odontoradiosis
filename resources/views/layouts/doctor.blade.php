<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('page-title')</title>

    <link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/bezier.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/landmark_system.css') }}">
    <link rel="icon" href="{{ asset('img/favicon.ico') }}">
</head>
<body>
<!-- Wrap all page content here -->
<div id="wrap">

    <!-- Fixed navbar -->

    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">@yield('page-title')</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="{{ route('home') }}">Início</a></li>
                    <li><a href="#">Ajuda</a></li>
                    <li class="dropdown"><a href="#" class="dropdown-toggle"
                                            data-toggle="dropdown">Sair <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li class="">
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button class="btn btn-primary" type="submit">Logout</button>
                                </form>
                            </li>
                        </ul>
                    </li>
                </ul>
                <form class="navbar-form navbar-right">
                    <input type="text" class="form-control" placeholder="Search...">
                </form>
            </div>
        </div>
    </nav>

    <div class="container-fluid">
        @yield('content')
    </div>

</div>
<div id="footer">
    <div class="container">
        <p align="center" class="text-muted">
            © 2018 <a href="https://github.com/argalvao/">Abel Ramalho Galvão</a> and <a
                    href="https://github.com/jictyvoo/">João Victor Oliveira Couto</a>. Powered by <a
                    href="http://php.net"
                    target="_blank">PHP</a>
        </p>
    </div>
</div>


<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="{{ asset('js/jquery-3.3.1.min.js') }}"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script>
<script language="javascript" src="{{ asset('js/landmark_selection.js') }}"></script>

</body>
</html>
