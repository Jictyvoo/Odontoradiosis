



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



include_once "../../../models/value/User.class.php";
include_once "../../../__init__.php";
session_start();




	use Fit_Piece\controllers\ModulesLoader;

	$modulesLoader = new ModulesLoader ();
	$DatabaseController = $modulesLoader->getDatabaseController();
    $fkImgs = array();
	if ($DatabaseController) {
        $fkImgs = $DatabaseController->generateDAO("img_save")->select(array(
            "fk_id_img"
        ), "id_doctor= " . $_SESSION['logged']->getUserID());
        $paths = array();
        for($i=0; $i<sizeof($fkImgs); $i++){
            $array =  $DatabaseController->generateDAO("imagem")->select(array(
                "caminho"
            ), "id_imagem=". $fkImgs[$i][0]);

            array_push($paths, $array[0][0]);
        }


        $img_save = $DatabaseController->generateDAO("img_save")->selectAll("id_doctor= " . $_SESSION['logged']->getUserID());





    }







?>


<?php for ($x = 0; $x < sizeof($paths); $x += 1): ?>
    <input type="hidden">
    <img src="<?= '../../../' . $paths[$x] ?>">
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