<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{ asset('img/ico.png') }}">

    <title>Odontoradiosis | Ajuda</title>

    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">

    <!-- IonIcons -->
    <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Google Font: Source Sans Pro -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

    <!-- Main System CSS -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/bezier.css') }}">

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
                    <div align="center">
                        <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" href="#about"><b>SOBRE</b></a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" href="#experience"><b>RADIOGRAFIAS</b></a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" href="#education"><b>EFEITOS</b></a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" href="#skills"><b>DESENHO ANATÔMICO</b></a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" href="#interests"><b>PONTOS</b></a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" href="#awards"><b>EDIÇÃO</b></a>
                        </li>
                    </div>
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


        <div class="container-fluid p-0">

    <section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="about">
      <div class="w-100">
        <h1 class="mb-0"><b>ODONTO</b>
          <span class="text-primary"><b>RADIOSIS</b></span>
        </h1>
        <div class="subheading mb-5">Abel Ramalho Galvão¹ · João Victor Oliveira Couto² ·
          <a href="mailto:abel.ramalho18@gmail.com">abel.ramalho18@gmail.com¹</a> · <a href="mailto:jictyvoo.ecomp@gmail.com">jictyvoo.ecomp@gmail.com²</a>
        </div>
        <p class="lead mb-5"><p align="justify">A cefalometria radiográfica consiste nas mensurações da radiografia cefalométrica lateral e é fundamental para o estudo da forma e do crescimento do crânio. As aplicações da cefalometria na Ortodontia possibilita a visualização dos chamados pontos de referência, faciais e cranianos.</p><br>

        <p  align="justify">A partir das radiografias cefalométricas laterais, os diagnósticos são realizados mediante aos traçados cefalométricos ou analisando a localização do conjunto de pontos cefalométricos que, uma vez unidos, permitem a realização das mensurações (ângulos e distâncias) ditadas pelas diferentes análises cefalométricas existentes.</p><br>

        <p  align="justify">Por muitos anos, a análise cefalométrica foi realizada manualmente, dificultando a reprodução dos traçados quando comparado por diversos observadores. Com o objetivo de auxiliar os especialistas da área de radiologia odontológica, uma ferramenta intitulada ODONTORADIOSIS vem sendo desenvolvida na Universidade Estadual de Feira de Santana.</p><br></p>
        <div class="social-icons">
          <a href="https://github.com/argalvao">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.facebook.com/abel.galvao.58">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://github.com/Jictyvoo/">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.facebook.com/Jictyvoo">
            <i class="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>
    </section>

    <hr class="m-0">

    <section class="resume-section p-3 p-lg-5 d-flex justify-content-center" id="experience">
      <div class="w-100">
        <h2 class="mb-5"><b>RADIOGRAFIAS</b></h2>

        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="resume-content">
            <h3 class="mb-0">Abrir radiografia</h3>
            <p  align="justify">Para abrir uma radiografia, basta clicar no menu lateral direito localizado no canto superior direita da ferramenta Odontoradiosis e clicar no botão "Abrir radiografia".</p>
          </div>
        </div>
        <div class="resume-content">
            <img class="img-fluid img-profile mx-auto mb-2" src="{{ asset('img/abrir_radiografia.png') }}" alt="">
        </div>

        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="resume-content">
            <h3 class="mb-0">Selecionar radiografia</h3>
            <p align="justify">Para selecionar uma radiografia a ser utilizada, basta clicar sobre uma radiografia exibida na janela de seleção.</p>
          </div>
        </div>
        <div class="resume-content">
            <img class="img-fluid img-profile mx-auto mb-2" src="{{ asset('img/selecionar_radiografia.png') }}" alt="">
        </div>

      </div>

    </section>

    <hr class="m-0">

    <section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="education">
      <div class="w-100">
        <h2 class="mb-5"><b>EFEITOS</b></h2>

        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="resume-content">
            <h3 class="mb-0">Aplicação de efeitos</h3>
            <div align="justify">Podem ser aplicados até 4 tipos de efeitos com o objetivo de melhorar a imagem para a marcação dos pontos cefalométricos com maior precisão. Sendo eles: Contraste; Brilho, Nagativo e Escala de Cinzas. Para realizar a aplicação dos efeitos, basta definir a intesidade dos mesmos nas barras de efeitos localizadas no menu lateral esquerdo. Para reverter a aplicação dos efeitos, basta clicar no botão "Desfazer", também localizado no menu lateral esquerdo.</div>
          </div>
        </div>
        <div class="resume-content">
            <img class="img-fluid img-profile mx-auto mb-2" src="{{ asset('img/efeitos.png') }}"  alt="">
        </div>

      </div>
    </section>

    <hr class="m-0">

    <section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="skills">
      <div class="w-100">
        <h2 class="mb-5"><b>DESENHO ANATÔMICO</b></h2>

        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="resume-content">
            <h3 class="mb-0">Seleção da curva</h3>
            <div align="justify">Para escolher qual curva irá ajustar, basta clicar no select de curvas localizado no menu lateral esquerdo.</div>
          </div>
        </div>
        <div class="resume-content">
            <img class="img-fluid img-profile mx-auto mb-2" src="{{ asset('img/menu_curvas.png') }}" alt="">
        </div>

        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="resume-content">
            <h3 class="mb-0">Ajuste do Desenho Anatômico</h3>
            <div align="justify">Após selecionar a curva que deseja ajustar, basta clicar e arrastar nos pontos de controle para mudar o tamanho e ajustar sobre a radografia.</div>
          </div>
        </div>
        <div class="resume-content">
            <img class="img-fluid img-profile mx-auto mb-2" src="{{ asset('img/ajuste_curvas.png') }}" alt="">
        </div>
      </div>


    </section>

    <hr class="m-0">

    <section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="interests">
      <div class="w-100">
        <h2 class="mb-5"><b>PONTOS</b></h2>

        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="resume-content">
            <h3 class="mb-0">Seleção de pontos</h3>
            <div align="justify">Para escolher qual ponto cefalométrico irá marcar, basta clicar no select de pontos localizado no menu lateral esquerdo.</div>
          </div>
        </div>
        <div class="resume-content">
            <img class="img-fluid img-profile mx-auto mb-2" src="{{ asset('img/menu_pontos.png') }}" alt="">
        </div>

        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="resume-content">
            <h3 class="mb-0">Marcação de Pontos cefalométricos</h3>
            <div align="justify">Após selecionar o ponto cefalométrico que deseja marcar sobre a radiografia, basta clicar clicar sobre a mesma para que o ponto seja marcado. No canto superior direito, uma imagem de referência irá auxiliar na localização do ponto a ser marcado.</div>
          </div>
        </div>
        <div class="resume-content">
            <img class="img-fluid img-profile mx-auto mb-2" src="{{ asset('img/marcar_ponto.png') }}" alt="">
        </div>

        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="resume-content">
            <h3 class="mb-0">Salvar</h3>
            <div align="justify">Após realizar todos os procedimentos desejados, para salvar, basta clicar no menu lateral esquerdo e clicar no botão "Salvar".</div>
          </div>
        </div>
        <div class="resume-content">
            <img class="img-fluid img-profile mx-auto mb-2" src="{{ asset('img/salvar_marcacao.png') }}" alt="">
        </div>
      </div>


    </section>

    <hr class="m-0">

    <section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="awards">
      <div class="w-100">
        <h2 class="mb-5"><b>EDIÇÃO</b></h2>

        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="resume-content">
            <h3 class="mb-0">Editar radiografias salvas</h3>
            <div align="justify">Para uma radiografia salva, basta clicar no menu lateral esquerdo e clicar no botão "Editar radiografia". Uma janela com as radiografias salvas será exibida no qual poderá ser selecionada a radiografia a ser editada.</div>
          </div>
        </div>
        <div class="resume-content">
            <img class="img-fluid img-profile mx-auto mb-2" src="{{ asset('img/menu_edicao.png') }}" alt="">
        </div>
        <div class="resume-content">
            <img class="img-fluid img-profile mx-auto mb-2" src="{{ asset('img/editar_radiografia.png') }}" alt="">
        </div>
      </div>
    </section>

  </div>
</div>
<!-- ./wrapper -->

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<!--<script src="{{ asset('js/jquery-3.3.1.min.js') }}"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script> -->
<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ asset('js/landmark.min.js') }}"></script>
<script src="{{ asset('js/semiautomatic_landmark.min.js') }}"></script>
<!--<script language="javascript" src="{{ asset('js/semiautomaticLandmarksMarking.js') }}"></script> -->
<!--<script language="javascript" src="{{ asset('js/landmark_selection.js') }}"></script>-->

<!-- Bootstrap core JavaScript -->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Plugin JavaScript -->
  <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for this template -->
  <script src="js/resume.min.js"></script>

</body>
</html>
