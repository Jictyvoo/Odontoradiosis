<?php

require_once "../../util/ArrayList.php";
require_once "../value/PontosCefalometricos.php";
require_once "../value/Medidas.php";
require_once "../business/Tracado.php";
require_once "../business/Calculos.php";

class TracadoTweed implements Tracado {

	private $listadePontos; /*is a ArrayList<PontosCefalometricos>*/
	private $listaMedidas; /*is a ArrayList<Medidas>*/

	public function __construct(){
		$this -> listadePontos = new ArrayList();
		$this -> listaMedidas = new ArrayList();
	}

	public function realizarTracado($g) {
		for ($i=0; $i < $this -> listadePontos -> size(); $i++) {
			if ($this -> listadePontos -> get($i) -> getNome() == "Po") {
				$ponto = $this -> listadePontos -> set(0, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Or") {
				$ponto = $this -> listadePontos -> set(1, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Go") {
				$ponto = $this -> listadePontos -> set(2, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Me") {
				$ponto = $this -> listadePontos -> set(3, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Eixo Incisivo - Sup") {
				$ponto = $this -> listadePontos -> set(4, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Eixo Incisivo - Inf") {
				$ponto = $this -> listadePontos -> set(5, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Or - Seguimento") {
				$ponto = $this -> listadePontos -> set(6, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
		}

		// Plano de Frankfurt
		$g -> drawLine($this -> listadePontos -> get(0) -> getPonto()['x'], $this -> listadePontos -> get(0) -> getPonto()['y'], $this -> listadePontos -> get(1) -> getPonto()['x'], $this -> listadePontos -> get(1) -> getPonto()['y']); //Po-OR
		//Plano Mandibular
		$g -> drawLine($this -> listadePontos -> get(2) -> getPonto()['x'], $this -> listadePontos -> get(2) -> getPonto()['y'], $this -> listadePontos -> get(3) -> getPonto()['x'], $this -> listadePontos -> get(3) -> getPonto()['y']); //Go-Me
		//Longo eixo do incisivo
		$g -> drawLine($this -> listadePontos -> get(4) -> getPonto()['x'], $this -> listadePontos -> get(4) -> getPonto()['y'], $this -> listadePontos -> get(5) -> getPonto()['x'], $this -> listadePontos -> get(5) -> getPonto()['y']); //Extremo do Me-Or
		//Seguimento do OR
		$g -> drawLine($this -> listadePontos -> get(1) -> getPonto()['x'], $this -> listadePontos -> get(1) -> getPonto()['y'], $this -> listadePontos -> get(6) -> getPonto()['x'], $this -> listadePontos -> get(6) -> getPonto()['y']); //Seguimento do OR

		$this -> calcularMedidas();
	}

	public function carregaPontos() {   /*returns a ArrayList<PontosCefalometricos>*/
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] = 0), "Po"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] = 0), "Or"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] = 0), "Or - Seguimento"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] = 0), "Go"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] = 0), "Me"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] = 0), "Eixo Incisivo - Sup"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] = 0), "Eixo Incisivo - Inf"));


		return $this -> listadePontos;
	}

	public function setListaPontos($pontos) {   /*receive a ArrayList<PontosCefalometricos>*/
		$this -> listadePontos = $pontos;
	}

	public function calcularMedidas() {

		$this -> listaMedidas = new ArrayList();
		$calcula = new Calculos();


		$FMA = $calcula -> calcularAngulo($this -> listadePontos -> get(0), $this -> listadePontos -> get(6), $this -> listadePontos -> get(2), $this -> listadePontos -> get(3)); //plano de frankfurt com plano mandibular
		$FMIA = $calcula -> calcularAngulo($this -> listadePontos -> get(0), $this -> listadePontos -> get(6), $this -> listadePontos -> get(4), $this -> listadePontos -> get(5)); //plano de frankfurt com longo eixo do incisivo
		$IMPA = $calcula -> calcularAngulo($this -> listadePontos -> get(2), $this -> listadePontos -> get(3), $this -> listadePontos -> get(4), $this -> listadePontos -> get(5)); //plano mandibular com longo eixo do incisivo


		$this -> listaMedidas -> add(new Medidas($FMA, "FMA"));
		$this -> listaMedidas -> add(new Medidas($FMIA, "FMIA"));
		$this -> listaMedidas -> add(new Medidas($IMPA, "IMPA"));
	}

	public function getListaMedidas() { /*returns a ArrayList<Medidas>*/
		return $this -> listaMedidas;
	}

	public function setListaMedidas($listaMedidas) {	/*receive a ArrayList<Medidas>*/
		$this -> listaMedidas = $listaMedidas;
	}

}

?>