<?php $_SESSION['paginaAnterior'] = "service_pages/Login.php";?>

<div class="row">
	<div class="col-md-2"></div>
	<div class="col-md-8">
		<form  method="post" action="<?='../views/gerenciadorView.php?selectPage='.($_SESSION['PageCodification'] -> getChave("../controllers/ServiceAccessController.php"))?>">
			<h2 class="form-signin-heading">Login</h2>
			<input id="inputUsername" name="username" class="form-control" placeholder="Nome de Usuário" required autofocus/>
			<input type="password" id="inputPassword" name="password" class="form-control" placeholder="Senha" required/>
			<div class="checkbox">
				<label>
					<input type="checkbox" value="remember-me"> Lembrar
				</label>
			</div>
			<input class="btn btn-lg btn-primary btn-block" type="submit" value="Entrar"/>
		</form>

		<?php if(isset($_SESSION['service_pages/Login.php']['error'])) : ?>
			<br/><br/>
			<div class="alert alert-danger" role="alert">
				<?= $_SESSION['service_pages/Login.php']['error'] ?>
			</div>
			<?php unset($_SESSION['service_pages/Login.php']['error']); ?>
		<?php endif ?>

	</div>
	<div class="col-md-2"></div>
</div>
<br><br><br><br><br>