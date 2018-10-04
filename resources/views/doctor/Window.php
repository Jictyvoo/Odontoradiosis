<style>
    img {
        height: 100px;
        margin: 5px;
        border: 2px solid #fff;
        cursor: pointer;
    }

    img:hover {
        border-color: #EA0404;
    }
</style>

<?php

	include_once "../../../__init__.php";

	use Fit_Piece\controllers\ModulesLoader;

	$modulesLoader = new ModulesLoader ();
	$DatabaseController = $modulesLoader->getDatabaseController();
	if ($DatabaseController) {
		$paths = $DatabaseController->generateDAO("Imagem")->select(array(
			"caminho"
		), null);
	}
?>
<?php for ($x = 0; $x < count($paths); $x += 1): ?>
    <img src="<?= '../../../' . $paths[$x][0]?>" title="<?= 'Radiografia ' . ($x + 1)?>">
<?php endfor ?>

<script>
    var imgs = document.querySelectorAll("img");

    for (var x = 0; x < imgs.length; x++) {
        imgs[x].addEventListener("click", function () {

            window.opener.image(this.src); // envia para a função a imagem escolhida 
            window.close(); // fecha a janela ao escolher uma imagem 

        });
    }
</script>
