<?php

require_once "../../util/ArrayList.php";
require_once "../value/PontosCefalometricos.php";
require_once "../value/Medidas.php";
require_once "../business/Tracado.php";
require_once "../business/Calculos.php";

class TracadoWylie implements Tracado {

	private $listadePontos; /*is a ArrayList<PontosCefalometricos>*/
	private $listaMedidas; /*is a ArrayList<Medidas>*/

	public function __construct(){
		$this -> listadePontos = new ArrayList();
		$this -> listaMedidas = new ArrayList();
	}

	public function realizarTracado($g) {
		for ($i = 0; $i < $this -> listadePontos -> size(); $i++) {
			//plano de frankfurt
			if ($this -> listadePontos -> get($i) -> getNome() == "Po") {
				$ponto = $this -> listadePontos -> set(0, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Or") {
				$ponto = $this -> listadePontos -> set(1, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			//plano mandibular
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Fg") {
				$ponto = $this -> listadePontos -> set(2, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Go") {
				$ponto = $this -> listadePontos -> set(3, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Me") {
				$ponto = $this -> listadePontos -> set(4, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			//pontos adicionais
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "ST") {
				$ponto = $this -> listadePontos -> set(5, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "FPM") {
				$ponto = $this -> listadePontos -> set(6, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Spna") {
				$ponto = $this -> listadePontos -> set(7, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "spnp") {
				$ponto = $this -> listadePontos -> set(8, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "6/") {
				$ponto = $this -> listadePontos -> set(9, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "pg") {
				$ponto = $this -> listadePontos -> set(10, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
		}

		// Plano de Frankfurt
		$g -> drawLine($this -> listadePontos -> get(0) -> getPonto()['x'], $this -> listadePontos -> get(0) -> getPonto()['y'], $this -> listadePontos -> get(1) -> getPonto()['x'], $this -> listadePontos -> get(1) -> getPonto()['y']); //Po-Or
		//Plano Mandibular
		$g -> drawLine($this -> listadePontos -> get(3) -> getPonto()['x'], $this -> listadePontos -> get(3) -> getPonto()['y'], $this -> listadePontos -> get(4) -> getPonto()['x'], $this -> listadePontos -> get(4) -> getPonto()['y']); //Go-Me

		/****************************************************************************************************************************************
		* tracado de wylie
		* pontos a serem marcados:
		* PLANO DE FRANKFURT: po, or
		* PLANO MANDIBULAR: Pg. Gera o tra�ado perpendicular ao PG e ao FG, com bases nos pontos  Go a Me.
		* PONTOS ADICIONAIS: ST, FPM, Spna (vai servir pros angulos) n�o vai ligar a ningu�m. pode ligar ao plano de frankfurt de forma tracejada
		****************************************************************************************************************************************/
	}

	public function carregaPontos() {   /*receive a ArrayList<PontosCefalometricos>*/
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Po"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Or"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Fg"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Go"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Me"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "St"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Fpm"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Spna"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "spnp"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "6/"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "pg"));


		return $this -> listadePontos;
	}

	public function setListaPontos($pontos) {   /*receive a ArrayList<PontosCefalometricos>*/
		$this -> listadePontos = $pontos;
	}

	public function calcularMedidas() {
		$listaMedidas = new ArrayList();
		$calcula = new Calculos();


		/*
		* Fossa glen�ide (FG) � sela t�rcica (ST)
		* fg - 2 e st - 5
		*/
		$FGST = ($this -> pointDistance($this -> listadePontos -> get(2) -> getPonto()['x'], $this -> listadePontos -> get(2) -> getPonto()['y'], $this -> listadePontos -> get(5) -> getPonto()['x'], $this -> listadePontos -> get(2) -> getPonto()['y']) * 0.264583);

		/*
		* Sela t�rcica (ST) � fissura pterigomaxilar (Fpm)
		* st - 5 e fpm - 6
		*/
		$STFPM = ($this -> pointDistance($this -> listadePontos -> get(6) -> getPonto()['x'], $this -> listadePontos -> get(6) -> getPonto()['y'], $this -> listadePontos -> get(5) -> getPonto()['x'], $this -> listadePontos -> get(6) -> getPonto()['y']) * 0.264583);

		/*
		* Fissura pterigomaxilar (Fpm)* � espinha nasal anterior (Spna).
		* spnp 8-spna 7
		*/
		$spnAP = ($this -> pointDistance($this -> listadePontos -> get(8) -> getPonto()['x'], $this -> listadePontos -> get(8) -> getPonto()['y'], $this -> listadePontos -> get(7) -> getPonto()['x'], $this -> listadePontos -> get(8) -> getPonto()['y']) * 0.264583);

		/*
		* Fissura pterigomaxilar (Fpm) ao centro do 1� molar superior (6)
		* fpm - 6 e 6 - 9
		*/
		$fpm6 = ($this -> pointDistance($this -> listadePontos -> get(6) -> getPonto()['x'], $this -> listadePontos -> get(6) -> getPonto()['y'], $this -> listadePontos -> get(9) -> getPonto()['x'], $this -> listadePontos -> get(6) -> getPonto()['y']) * 0.264583);

		/*
		* Fossa glen�ide (FG) ao pog�nio (Pg)
		* fg - 2 e pg - 10
		*/
		$fgpg = ($this -> pointDistance($this -> listadePontos -> get(10) -> getPonto()['x'], $this -> listadePontos -> get(10) -> getPonto()['y'], $this -> listadePontos -> get(2) -> getPonto()['x'], $this -> listadePontos -> get(3) -> getPonto()['y']) * 0.264583);

		$this -> listaMedidas.add(new Medidas($FGST, "Fossa glen�ide � sela t�rcica"));
		$this -> listaMedidas.add(new Medidas($STFPM, "Sela t�rcica � fissura pterigomaxilar"));
		$this -> listaMedidas.add(new Medidas($spnAP, "Fissura pterigomaxilar � espinha nasal anterior"));
		$this -> listaMedidas.add(new Medidas($fpm6, "Fissura pterigomaxilar ao centro do 1� molar superior "));
		$this -> listaMedidas.add(new Medidas($fgpg, "Fossa glen�ide ao pog�nio "));
	}

	public function getListaMedidas() { /*returns a ArrayList<Medidas>*/
		return $this -> listaMedidas;
	}

	public function setListaMedidas($listaMedidas) {	/*receive a ArrayList<Medidas>*/
		$this -> listaMedidas = $listaMedidas;
	}

}

?>