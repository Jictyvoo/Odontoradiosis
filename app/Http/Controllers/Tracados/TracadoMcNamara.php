<?php

require_once "../value/PontosCefalometricos.php";
require_once "../value/Medidas.php";
require_once "../../util/ArrayList.php";
require_once "../business/Tracado.php";
require_once "../business/Calculos.php";

class TracadoMcNamara implements Tracado {

	private $listadePontos; /*is a ArrayList<PontosCefalometricos>*/
	private $listaMedidas; /*is a ArrayList<Medidas>*/

	public function __construct(){
		$this -> listadePontos = new ArrayList();
		$this -> listaMedidas = new ArrayList();
	}


	public function realizarTracado($g) {
		for ($i=0; $i < $this -> listadePontos -> size(); $i += 1) {
			if ($this -> listadePontos -> get($i) -> getNome() =="Or") {
				$ponto = $this -> listadePontos -> set(0, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="Po") {
				$ponto = $this -> listadePontos -> set(1, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="N") {
				$ponto = $this -> listadePontos -> set(2, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="A") {
				$ponto = $this -> listadePontos -> set(3, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="Pg") { //o mesmo que o ponto pg
				$ponto = $this -> listadePontos -> set(4, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="Co") {
				$ponto = $this -> listadePontos -> set(5, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="Gn") {
				$ponto = $this -> listadePontos -> set(6, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="ENA") {
				$ponto = $this -> listadePontos -> set(7, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="Me") {
				$ponto = $this -> listadePontos -> set(8, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="Go") {
				$ponto = $this -> listadePontos -> set(9, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="Ba") {
				$ponto = $this -> listadePontos -> set(10, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="Ptm") {
				$ponto = $this -> listadePontos -> set(11, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="borda incisal do incisivo superior") {
				$ponto = $this -> listadePontos -> set(12, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			} 
			else if ($this -> listadePontos -> get($i) -> getNome() =="borda inferior do l�bio superior") {
				$ponto = $this -> listadePontos -> set(13, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			} 
			else if ($this -> listadePontos -> get($i) -> getNome() =="Inicio - Plano Oclusal") {
				$ponto = $this -> listadePontos -> set(14, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="Fim - Plano Oclusal") {
				$ponto = $this -> listadePontos -> set(15, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="Ls") {
				$ponto = $this -> listadePontos -> set(16, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="Sn") {
				$ponto = $this -> listadePontos -> set(17, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="Cm") {
				$ponto = $this -> listadePontos -> set(18, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() =="face vestibular do incisivo inferior") {
				$ponto = $this -> listadePontos -> set(19, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
		}

		$g -> drawLine($this -> listadePontos -> get(0) -> getPonto()['x'], $this -> listadePontos -> get(0) -> getPonto()['y'], $this -> listadePontos -> get(1) -> getPonto()['x'], $this -> listadePontos -> get(1) -> getPonto()['y']); //Po-Or
		$g -> drawLine($this -> listadePontos -> get(2) -> getPonto()['x'], $this -> listadePontos -> get(2) -> getPonto()['y'], $this -> listadePontos -> get(3) -> getPonto()['x'], $this -> listadePontos -> get(3) -> getPonto()['y']); //N-A
		$g -> drawLine($this -> listadePontos -> get(2) -> getPonto()['x'], $this -> listadePontos -> get(2) -> getPonto()['y'], $this -> listadePontos -> get(2) -> getPonto()['x'], $this -> listadePontos -> get(2) -> getPonto()['y']+5000); //Nperp (a-nperp e pg-nperp)
		$g -> drawLine($this -> listadePontos -> get(5) -> getPonto()['x'], $this -> listadePontos -> get(5) -> getPonto()['y'], $this -> listadePontos -> get(3) -> getPonto()['x'], $this -> listadePontos -> get(3) -> getPonto()['y']); //Co-A
		$g -> drawLine($this -> listadePontos -> get(5) -> getPonto()['x'], $this -> listadePontos -> get(5) -> getPonto()['y'], $this -> listadePontos -> get(6) -> getPonto()['x'], $this -> listadePontos -> get(6) -> getPonto()['y']); //Co-Gn
		$g -> drawLine($this -> listadePontos -> get(7) -> getPonto()['x'], $this -> listadePontos -> get(7) -> getPonto()['y'], $this -> listadePontos -> get(8) -> getPonto()['x'], $this -> listadePontos -> get(8) -> getPonto()['y']); //ENA-M
		$g -> drawLine($this -> listadePontos -> get(9) -> getPonto()['x'], $this -> listadePontos -> get(9) -> getPonto()['y'], $this -> listadePontos -> get(8) -> getPonto()['x'], $this -> listadePontos -> get(8) -> getPonto()['y']); //Go-M
		$g -> drawLine($this -> listadePontos -> get(10) -> getPonto()['x'], $this -> listadePontos -> get(10) -> getPonto()['y'], $this -> listadePontos -> get(2) -> getPonto()['x'], $this -> listadePontos -> get(2) -> getPonto()['y']); //Ba-N
		$g -> drawLine($this -> listadePontos -> get(11) -> getPonto()['x'], $this -> listadePontos -> get(11) -> getPonto()['y'], $this -> listadePontos -> get(6) -> getPonto()['x'], $this -> listadePontos -> get(6) -> getPonto()['y']); //Ptm-Gn
		$g -> drawLine($this -> listadePontos -> get(14) -> getPonto()['x'], $this -> listadePontos -> get(14) -> getPonto()['y'], $this -> listadePontos -> get(15) -> getPonto()['x'], $this -> listadePontos -> get(15) -> getPonto()['y']); //plano oclusal
		$g -> drawLine($this -> listadePontos -> get(16) -> getPonto()['x'], $this -> listadePontos -> get(16) -> getPonto()['y'], $this -> listadePontos -> get(17) -> getPonto()['x'], $this -> listadePontos -> get(17) -> getPonto()['y']); //Ls-Sn
		$g -> drawLine($this -> listadePontos -> get(18) -> getPonto()['x'], $this -> listadePontos -> get(18) -> getPonto()['y'], $this -> listadePontos -> get(17) -> getPonto()['x'], $this -> listadePontos -> get(17) -> getPonto()['y']); //Cm-Sn
		$g -> drawLine($this -> listadePontos -> get(3) -> getPonto()['x'], $this -> listadePontos -> get(3) -> getPonto()['y'], $this -> listadePontos -> get(4) -> getPonto()['x'], $this -> listadePontos -> get(4) -> getPonto()['y']); //A-pg

		$this -> calcularMedidas();
	}

	public function carregaPontos() {	/*returns a ArrayList<PontosCefalometricos>*/
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Or"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Po"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "N"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "A"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Pg"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Co"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Gn"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "ENA"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Me"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Go"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Ba"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Ptm"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "borda incisal do incisivo superior"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "borda inferior do l�bio superior"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Inicio - Plano Oclusal"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Fim - Plano Oclusal"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Ls"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Sn"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Cm"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "face vestibular do incisivo inferior"));

		return $this -> listadePontos;
	}

	public function setListaPontos($pontos) {	/*receive a ArrayList<PontosCefalometricos>*/
		$this -> listadePontos = $pontos;
	}

	public function calcularMedidas() {

		$this -> listaMedidas = new ArrayList();
		$calcula = new Calculos();


		//A-nperp
		$distancia = distance($this -> listadePontos -> get(3) -> getPonto()['x'], $this -> listadePontos -> get(3) -> getPonto()['y'], $this -> listadePontos -> get(2) -> getPonto()['x'], $this -> listadePontos -> get(6) -> getPonto()['y']) * 0.264583;

		$anperp = 0;
		if($this -> listadePontos -> get(6) -> getPonto()['x']  <  $this -> listadePontos -> get(2) -> getPonto()['x']){
			$anperp = ($distancia * (-1));
		}
		else{
			$anperp = $distancia;
		}


		//pg-nperp
		$distancia2 = distance($this -> listadePontos -> get(11) -> getPonto()['x'], $this -> listadePontos -> get(11) -> getPonto()['y'], $this -> listadePontos -> get(2) -> getPonto()['x'], $this -> listadePontos -> get(11) -> getPonto()['y']) * 0.264583;

		$pgnperp = 0;
		if($this -> listadePontos -> get(11) -> getPonto()['x']  <  $this -> listadePontos -> get(2) -> getPonto()['x']){
			$pgnperp =($distancia2 * (-1));
		}
		else{
			$pgnperp =$distancia2;
		}

		//---------------Dist�ncia Co-A--------------- OK
		$distanciaCOA = (distance($this -> listadePontos -> get(5) -> getPonto()['x'], $this -> listadePontos -> get(5) -> getPonto()['y'], $this -> listadePontos -> get(3) -> getPonto()['x'], $this -> listadePontos -> get(3) -> getPonto()['y']) * 0.264583);

		//---------------Dist�ncia Co-Gn--------------- OK
		$distanciaCOGN = (distance($this -> listadePontos -> get(5) -> getPonto()['x'], $this -> listadePontos -> get(5) -> getPonto()['y'], $this -> listadePontos -> get(6) -> getPonto()['x'], $this -> listadePontos -> get(6) -> getPonto()['y']) * 0.264583);

		$proporcaoMaxMan = $distanciaCOA - $distanciaCOGN;


		//medida afai - ena-me
		$medidaAFAI = (distance($this -> listadePontos -> get(7) -> getPonto()['x'], $this -> listadePontos -> get(7) -> getPonto()['y'], $this -> listadePontos -> get(8) -> getPonto()['x'], $this -> listadePontos -> get(8) -> getPonto()['y']) * 0.264583);

		//plano mandibular
		$PoOrGoMe = $calcula -> calcularAngulo($this -> listadePontos -> get(1), $this -> listadePontos -> get(0), $this -> listadePontos -> get(9), $this -> listadePontos -> get(8));

		//eixo facial
		$BANPTMGN = $calcula -> calcularAngulo($this -> listadePontos -> get(10), $this -> listadePontos -> get(2), $this -> listadePontos -> get(11), $this -> listadePontos -> get(6));

		//Rela��o anteroposterior dos incisivos superiores com a maxila

		//Rela��o vertical do incisivos superiores com a maxila e os l�bios em repouso
		$relacaovertical = (distance($this -> listadePontos -> get(12) -> getPonto()['x'], $this -> listadePontos -> get(12) -> getPonto()['y'], $this -> listadePontos -> get(13) -> getPonto()['x'], $this -> listadePontos -> get(13) -> getPonto()['y']) * 0.264583);


		//Rela��o anteroposterior do incisivo inferior com a mand�bula
		$apogvestibular = (distance($this -> listadePontos -> get(19) -> getPonto()['x'], $this -> listadePontos -> get(19) -> getPonto()['y'], $this -> listadePontos -> get(3) -> getPonto()['x'], $this -> listadePontos -> get(4) -> getPonto()['y']) * 0.264583);


		//Rela��o vertical do incisivo inferior com a mand�bula
		$distPlo = (distance($this -> listadePontos -> get(12) -> getPonto()['x'], $this -> listadePontos -> get(12) -> getPonto()['y'], $this -> listadePontos -> get(14) -> getPonto()['x'], $this -> listadePontos -> get(15) -> getPonto()['y']) * 0.264583);

		//angulo nasolabial  - LsSn e CmSn
		$nasolabial = $calcula -> calcularAngulo($this -> listadePontos -> get(16), $this -> listadePontos -> get(17), $this -> listadePontos -> get(18), $this -> listadePontos -> get(17));


		$this -> listaMedidas -> add(new Medidas($anperp, "A-nperp"));
		$this -> listaMedidas -> add(new Medidas($pgnperp, "Pg-nperp"));
		$this -> listaMedidas -> add(new Medidas($distanciaCOA, "Distancia Co-A"));
		$this -> listaMedidas -> add(new Medidas($distanciaCOGN, "Distancia Co-GN"));
		$this -> listaMedidas -> add(new Medidas($proporcaoMaxMan, "Rela��o entre maxila e mand�bula"));
		$this -> listaMedidas -> add(new Medidas($medidaAFAI, "Medida AFAI"));
		$this -> listaMedidas -> add(new Medidas($PoOrGoMe, "Plano mandibular"));
		$this -> listaMedidas -> add(new Medidas($BANPTMGN, "Eixo facial"));
		$this -> listaMedidas -> add(new Medidas($anperp, "Rela��o anteroposterior dos incisivos superiores com a maxila"));
		$this -> listaMedidas -> add(new Medidas($relacaovertical, "incisivos superiores com a maxila"));
		$this -> listaMedidas -> add(new Medidas($relacaovertical, "incisivos superiores com a mandibula"));
		$this -> listaMedidas -> add(new Medidas($apogvestibular, "anteroposterior - incisivo inferior com a mand�bula"));
		$this -> listaMedidas -> add(new Medidas($distPlo, "vertical - incisivo inferior com a mand�bula"));
		$this -> listaMedidas -> add(new Medidas($nasolabial, "angulo nasolabial"));

	}

	public function getListaMedidas() {	/*returns a ArrayList<Medidas>*/
		return $this -> listaMedidas;
	}

	public function setListaMedidas($listaMedidas) {	/*receive a ArrayList<Medidas>*/
		$this -> listaMedidas = $listaMedidas;
	}


}

?>