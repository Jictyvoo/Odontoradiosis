<?php
    $_SESSION['paginaAnterior'] = "service_pages/Login.php";
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Acesso</title>

    <link rel="stylesheet" href="../layout/css/style.css" media="screen" type="text/css" />

</head>
<link rel="icon" href="../layout/imagens/favicon.ico">

<body class="profile-login">
    <header class="global-header">
        <div>
            <nav class="global-nav">
                <!-- <center></center> -->
            </nav>
        </div>
    </header>
    <section class="login">
        <form id="login-form" accept-charset="utf-8" method="post" action="<?='SystemManager.php?selectPage='.($_SESSION['PageCodification'] -> getChave("../controllers/ServiceAccessController.php"))?>">
            <h1><img src="../layout/imagens/LOGO.png"></h1>
            <h1>Odontoradiosis</h1>
            Usuário<input type="text" name="username" aria-required="true" required class="required">
            <div class="password-container">
                Senha<input name="password" type="password" required class="required" aria-required="true">

            </div>
            <button class="button submit" data-analytics="sign-in" type="submit">Login</button>
            <!-- </span> -->
        </form>

		<?php if(isset($_SESSION['service_pages/Login.php']['error'])) : ?>
			<br/><br/>
			<div class="alert alert-danger" role="alert">
				<?= $_SESSION['service_pages/Login.php']['error'] ?>
			</div>
			<?php unset($_SESSION['service_pages/Login.php']['error']); ?>
		<?php endif ?>
    </section>

</body>

</html>