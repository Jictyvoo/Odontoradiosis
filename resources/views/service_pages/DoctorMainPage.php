<?php

	use Fit_Piece\controllers\ModulesLoader;

	if (isset ($_POST ['savedPoints'])) {
		$jsonReceived = $_POST ['savedPoints'];
		$landmarksSaved = json_decode($jsonReceived);

		if ($landmarksSaved) {
			$decodedJson = $landmarksSaved;
			$columns = "";
			$values = "";
			$dictionaryLandmarks = array(
				"Básio (Ba)" => "Ba",
				"Sela (S)" => "S",
				"Násio (N)" => "N",
				"Espinha nasal anterior (ENA)" => "ENA",
				"Espinha nasal posterior (ENP)" => "ENP",
				"Ponto subespinhal (A)" => "A",
				"Ponto pupramental (B)" => "PB",
				"Próstil (Pr)" => "Pr",
				"Infradental (Id)" => "Id",
				"Pogônio (Pog)" => "Pog",
				"Gnátio (Gn)" => "Gn",
				"Mento (Me)" => "Me",
				"Ponto D (D)" => "D",
				"Bolton (Bo)" => "Bo",
				"Articular (Ar)" => "Ar",
				"Pório (Po)" => "Po",
                "Pterigóideo (Pt)" => "Pt",
                "Ponto E (E)" => "E",
                "Mentoniano (Me)" => "Men",
                "Condílio (Co)" => "Co",
                "Pró-nasal (Pn)" => "Pn",
                "Columela (Cm)" => "Cm",
                "Subnasal (Sn)" => "Sn",
                "Lábio Superior (Ls)" => "Ls",
                "Stomion Superior (Sts)" => "Sts",
                "Pogônio Mole (Pg’)" => "Pg'",
                "Palato Mole (pm)" => "pm",
                "Adenóide (ad)" => "ad",
                "Ponto bl (bl)" => "bl",
                "Ponto bf (bf)" => "bf"


			);
			foreach ($decodedJson as $key => $value) {
				$columns = $columns . $dictionaryLandmarks [$key] . "X, " . $dictionaryLandmarks [$key] . "Y, ";
				$values = $values . $value->X . ", " . $value->Y . ", ";
			}

			$modulesLoader = new ModulesLoader ();
			$DatabaseController = $modulesLoader->getDatabaseController();
			$paths = $DatabaseController->generateDAO("Imagem")->select(array(
				"id_imagem"
			), "caminho like '%" . $_POST ['currentImage'] . "%'");

			$dictionaryLandmarks = null;
			$DatabaseController->execute("REPLACE Img_Save(" . $columns . "id_doctor, fk_id_img) VALUES(" . $values . getUser()->getUserID() . ", " . $paths [0] ["id_imagem"] . ")");
		} else {
			echo "<script> alert('No landmarks to save'); </script>";
		}
	}
?>

<div class="row">
	<div class="col-sm-3 col-md-2 sidebar">
		<ul class="nav nav-sidebar">
			<!--<li class="active"><a href="#"><label class="filter-label" >Estruturas</label><select style="width: 80%; color:black">
						<option selected>Selecione</option>
						<option>Molar Superior</option>
						<option>Molar Inferior</option>
						<option>Incisivo Superior</option>
						<option>Incisivo Inferior</option>
						<option>Sela</option>
						<option>Pório</option>
						<option>Fosse Pterigo Maxilar</option>
						<option>Maxila</option>
						<option>Mandibula</option>
						<option>Sínfise</option>
						<option>Ossos Nasais</option>
						<option>Frontal</option>
						<option>Tecido Mole Inferior</option>
						<option>Tecido Mole Superior</option>
					</select></a></li>
			<li class="active"><a href="#"><label class="filter-label" >Traçados</label><select style="width: 80%; color:black">
						<option selected>Selecione</option>
						<option>Harvold</option>
						<option>Steiner</option>
						<option>Downs</option>
					</select></a></li>-->
			<li class="active"><a href="#"><label class="filter-label" >Pontos</label><select id = "pointsId" style="width: 80%; color:black">
						<option selected>Selecione</option>
						<option>Básio (Ba)</option>
						<option>Sela (S)</option>
						<option>Násio (N)</option>
						<option>Espinha nasal anterior (ENA)</option>
						<option>Espinha nasal posterior (ENP)</option>
						<option>Ponto subespinhal (A)</option>
						<option>Ponto pupramental (B)</option>
						<option>Próstil (Pr)</option>
						<option>Infradental (Id)</option>
						<option>Pogônio (Pog)</option>
						<option>Gnátio (Gn)</option>
						<option>Mento (Me)</option>
						<option>Ponto D (D)</option>
						<option>Bolton (Bo)</option>
						<option>Articular (Ar)</option>
						<option>Pório (Po)</option>
                        <option>Pterigóideo (Pt)</option>
                        <option>Ponto E (E)</option>
                        <option>Mentoniano (Men)</option>
                        <option>Condílio (Co)</option>
                        <option>Pró-nasal (Pn)</option>
                        <option>Columela (Cm)</option>
                        <option>Subnasal (Sn)</option>
                        <option>Lábio Superior (Ls)</option>
                        <option>Stomion Superior (Sts)</option>
                        <option>Pogônio Mole (Pg’)</option>
                        <option>Palato Mole (pm)</option>
                        <option>Adenóide (ad)</option>
                        <option>Ponto bl (bl)</option>
                        <option>Ponto bf (bf)</option>
					</select></a></li>
			<li class="active"><a href="#">
					<label class="filter-label" >Contraste</label>
					<input type="range" id="contrast" min="0" max="200" value="100"/>
				</a></li>
			<li class="active"><a href="#">
					<label class="filter-label" >Brilho</label>
					<input type="range" id="brightness" min="0" max="200" value="100"/>
				</a></li>
			<li class="active"><a href="#">
					<label class="filter-label" >Escala de cinza</label>
					<input type="range" id="grayscale" min="0" max="100" value="0"/>
				</a></li>
			<li class="active"><a href="#">
					<label class="filter-label" >Negativo</label>
					<input type="range" id="invert" min="0" max="100" value="0"/>
				</a></li>
			<li class="active"><a href="#">
					<label class="filter-label" ><font color="#696969"><input type="button" value="Desfazer" onclick="reset()"/></font></label>
				</a></li>
		</ul>
	</div>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
		<div class="page-header">
			<table class="methods-table" width="400px" border="0">
				<tr>
					<td>
						<input type="image" name="selectImage" src="../layout/imagens/Abrir.png" onClick="openWindow()">
					</td>
					<td>
						<input type="image" name="markStitch" src="../layout/imagens/Ponto.png" onClick="openWindowSave()">
					</td>
					<!--<td>
						<input type="image" name="generateMeasurement" src="../layout/imagens/Tracar.png" onClick="this.form.submit()">
					</td>-->
					<td>
						<input type="image" name="unmake" src="../layout/imagens/Desfazer.png" onClick="desfazer()">
					</td>
					<td>
						<form method="post" action="">
							<input type="hidden" name="savedPoints" id="saved_points" value=""/>
							<input type="hidden" name="currentImage" id="current_image" value=""/>
							<input type="image" name="save" src="../layout/imagens/salvar.png" onClick="this.form.submit()">
						</form>
					</td>

				</tr>
			</table>
		</div>
		<div id="image"></div>
	</div>
</div>