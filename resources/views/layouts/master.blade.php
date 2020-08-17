<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{ asset('img/ico.png') }}">

    <title>Odontoradiosis | Home</title>

    <link rel="stylesheet" type="text/css" href="{{ asset('css/landmark_system/marking_system.css') }}">

    <!-- IonIcons -->
    <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Google Font: Source Sans Pro -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

    <!-- Main System CSS -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/landmark_system/bezier.css') }}">

<body class="hold-transition sidebar-mini">
<div class="wrapper">

    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand bg-white navbar-light border-bottom">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <!--<li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#"><i class="fa fa-bars"><img
                                src="img/menu.png"></i></a>
            </li>-->
            <li class="nav-item d-none d-sm-inline-block">
                <a href="{{ route('home') }}" class="nav-link">Home</a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <a href="{{ route('help') }}" class="nav-link">Ajuda</a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="btn btn-primary">Sair</button>
                </form>
            </li>
        </ul>


        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
            <!-- Messages Dropdown Menu -->
            <li class="nav-item">
                <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#"><i
                            class="fa fa-th-large"><img src="{{ asset('img/mini-menu.png') }}"></i></a>
            </li>
        </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a  align="middle" href="{{ route('home') }}" class="brand-link">
            <img width="200" height="133" src="{{ asset('img/odontoradiosis_logo.png') }}" alt="Odontoradiosis"  align="middle">
        </a>

        <!-- Sidebar -->
        <div class="sidebar">

            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                    data-accordion="false">
                    @yield('content_sidebar')
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-9">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="m-0">Radiografia</h5>
                            </div>
                            <div id ="card-canvas" class="card-body">
                                <div id="stack-canvas">
                                    <canvas id="image"></canvas>
                                    <canvas id="landmarks"></canvas>
                                    <canvas id="bezier"></canvas>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- /.col-md-6 -->
                    <div class="col-lg-3">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="m-0">Referência</h5>
                            </div>
                            <div class="card-body" id="canvas-reference">
                                <canvas id="referenceLandmark"></canvas>
                            </div>
                        </div>
                    </div>
                    <!-- /.col-md-6 -->
                </div>
                <!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
        <div class="p-3">
            <h5>Ações</h5>
            @yield('content')
        </div>
    </aside>
    <!-- /.control-sidebar -->

    <!-- Main Footer -->
    <footer class="main-footer">
        <!-- Default to the left -->
        <strong>© 2018 <a href="https://github.com/argalvao/">Abel Ramalho Galvão</a> and <a
                    href="https://github.com/jictyvoo/">João Victor Oliveira Couto</a>. Powered by <a
                    href="http://php.net"
                    target="_blank">PHP</a>
        </strong>
    </footer>
</div>
<!-- ./wrapper -->

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<!--<script src="{{ asset('js/jquery-3.3.1.min.js') }}"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script> -->
<script src="{{ asset('js/app.js') }}"></script>

<?php
use App\Http\Controllers\MinimizeJSController;
//MinimizeJSController::minimize('js/odontoradiosis/landmark_selection.js', 'js/landmark.min.js');
MinimizeJSController::minimize('js/odontoradiosis/semiautomaticLandmarksMarking.js', 'js/semiautomatic_landmark.min.js');
MinimizeJSController::minimizeAll('js/odontoradiosis/landmark_system', 'js/landmark.min.js');
?>

<script src="{{ asset('js/landmark.min.js') }}"></script>
<script src="{{ asset('js/semiautomatic_landmark.min.js') }}"></script>
<!--<script language="javascript" src="{{ asset('js/semiautomaticLandmarksMarking.js') }}"></script> -->
<!--<script language="javascript" src="{{ asset('js/landmark_selection.js') }}"></script>-->

</body>
</html>
