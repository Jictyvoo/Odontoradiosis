<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?=$titlePage?></title>

	<link rel="stylesheet" type="text/css" href="../layout/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="../layout/css/landmark_system.css">

	</head>
	
	<link rel="icon" href="../layout/imagens/favicon.ico">
</head>
<body>

	<!-- Wrap all page content here -->
	<div id="wrap">

		<!-- Fixed navbar -->

		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#"><?=$titlePage?></a>
				</div>
				<div id="navbar" class="navbar-collapse collapse">
					<ul class="nav navbar-nav navbar-right">
						<li><a href="<?='SystemManager.php?selectPage='.($_SESSION['PageCodification'] -> getChave($informationsAboutPage -> getFileLocation('DoctorMainPage.php')))?>">Início</a></li>
						<li><a href="#">Ajuda</a></li>
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown">Sair <b class="caret"></b></a>
							<ul class="dropdown-menu">
								<li class=""><a href="<?php echo ('../controllers/ServiceAccessController.php?logout=true'); ?>">Logout</a></li>
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