<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{ asset('img/ico.png') }}">

    <title>Odontoradiosis | Solicitar acesso</title>

    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">

    <!-- IonIcons -->
    <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Google Font: Source Sans Pro -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

<body class="hold-transition sidebar-mini">
<div class="wrapper">

    <!-- Navbar -->
    <nav class="navbar navbar-expand bg-white navbar-light border-bottom">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">

            <li class="nav-item d-none d-sm-inline-block">
                <a href="{{ route('home') }}" class="nav-link">Home</a>
            </li>
        </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Content Wrapper. Contains page content -->
    <div>
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
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="m-0">Ortodontista</h5>
                            </div>
                            <div class="card-body">
                                <form method="POST" action="{{ action('RequestOrthodontistController@store') }}">
                                    @csrf

                                    <div class="form-group row">
                                        <label for="name_orthodontist"
                                               class="col-md-4 col-form-label text-md-right">{{ __('Nome completo') }}</label>

                                        <div class="col-md-6">
                                            <input id="name_orthodontist" type="text"
                                                   class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}"
                                                   name="name" value="{{ old('name') }}" required autofocus placeholder="Nome completo">

                                            @if ($errors->has('name'))
                                                <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('name') }}</strong>
                                            </span>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="email_orthodontist"
                                               class="col-md-4 col-form-label text-md-right">{{ __('E-mail') }}</label>

                                        <div class="col-md-6">
                                            <input id="email_orthodontist" type="email"
                                                   class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"
                                                   name="email" value="{{ old('email') }}" required>

                                            @if ($errors->has('email'))
                                                <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('email') }}</strong>
                                            </span>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="password_orthodontist"
                                               class="col-md-4 col-form-label text-md-right">{{ __('Senha') }}</label>

                                        <div class="col-md-6">
                                            <input id="password_orthodontist" type="password"
                                                   class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}"
                                                   name="password" required>

                                            @if ($errors->has('password'))
                                                <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('password') }}</strong>
                                            </span>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="password-confirm_orthodontist"
                                               class="col-md-4 col-form-label text-md-right">{{ __('Confirmar senha') }}</label>

                                        <div class="col-md-6">
                                            <input id="password-confirm_orthodontist" type="password"
                                                   class="form-control"
                                                   name="password_confirmation" required>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="cro_orthodontist"
                                               class="col-md-4 col-form-label text-md-right">{{ __('CRO') }}</label>

                                        <div class="col-md-6">
                                            <input id="cro_orthodontist" type="text" class="form-control"
                                                   name="cro" required placeholder="Somente números">
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="cpf_orthodontist"
                                               class="col-md-4 col-form-label text-md-right">{{ __('CPF') }}</label>

                                        <div class="col-md-6">
                                            <input id="cpf_orthodontist" type="text" class="form-control"
                                                   name="cpf" required placeholder="Somente números" maxlength="11">
                                        </div>
                                    </div>

                                    <div class="form-group row mb-0">
                                        <div class="col-md-6 offset-md-4">
                                            <button type="submit" class="btn btn-primary">
                                                {{ __('Solicitar acesso') }}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                    <!-- /.col-md-6 -->
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="m-0">Estudante</h5>
                            </div>
                            <div class="card-body">
                                <form method="POST" action="{{ action('RequestStudentController@store') }}"
                                      enctype="multipart/form-data">
                                    @csrf

                                    <div class="form-group row">
                                        <label for="name_student"
                                               class="col-md-4 col-form-label text-md-right">{{ __('Nome completo') }}</label>

                                        <div class="col-md-6">
                                            <input id="name_student" type="text"
                                                   class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}"
                                                   name="name" value="{{ old('name') }}" required autofocus placeholder="Nome completo">

                                            @if ($errors->has('name'))
                                                <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('name') }}</strong>
                                            </span>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="email_student"
                                               class="col-md-4 col-form-label text-md-right">{{ __('E-mail') }}</label>

                                        <div class="col-md-6">
                                            <input id="email_student" type="email"
                                                   class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"
                                                   name="email" value="{{ old('email') }}" required>

                                            @if ($errors->has('email'))
                                                <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('email') }}</strong>
                                            </span>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="password_student"
                                               class="col-md-4 col-form-label text-md-right">{{ __('Senha') }}</label>

                                        <div class="col-md-6">
                                            <input id="password_student" type="password"
                                                   class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}"
                                                   name="password" required>

                                            @if ($errors->has('password'))
                                                <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('password') }}</strong>
                                            </span>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="password-confirm_student"
                                               class="col-md-4 col-form-label text-md-right">{{ __('Confirmar senha') }}</label>

                                        <div class="col-md-6">
                                            <input id="password-confirm_student" type="password" class="form-control"
                                                   name="password_confirmation" required>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="registration_guide_student"
                                               class="col-md-4 col-form-label text-md-right">{{ __('Guia de matrícula') }}</label>

                                        <div class="col-md-6">
                                            <input id="registration_guide_student" type="file" name="registration_guide"
                                                   required>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="cpf_student"
                                               class="col-md-4 col-form-label text-md-right">{{ __('CPF') }}</label>

                                        <div class="col-md-6">
                                            <input id="cpf_student" type="text" class="form-control"
                                                   name="cpf" required placeholder="Somente números" maxlength="11>
                                        </div>
                                    </div>

                                    <div class="form-group row mb-0">
                                        <div class="col-md-6 offset-md-4">
                                            <button type="submit" class="btn btn-primary">
                                                {{ __('Solicitar acesso') }}
                                            </button>
                                        </div>
                                    </div>
                                </form>
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

    <!-- Main Footer -->
    <footer class="navbar">
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

</body>
</html>