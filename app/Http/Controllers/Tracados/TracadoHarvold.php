<?php

require_once "../value/PontosCefalometricos.php";
require_once "../value/Medidas.php";
require_once "../../util/ArrayList.php";
require_once "../business/Tracado.php";

class TracadoHarvold implements Tracado {

	private $listadePontos; /*is a ArrayList<PontosCefalometricos>*/
	private $listaMedidas; /*is a ArrayList<Medidas>*/

	public function __construct(){
		$this -> listadePontos = new ArrayList();
		$this -> listaMedidas = new ArrayList();
	}
			
	public function realizarTracado($g) {
		for ($i=0; $i < $this -> listadePontos -> size(); $i++) {
			if ($this -> listadePontos -> get($i) -> getNome() == "ENA") {
				$ponto = $this -> listadePontos -> set(0, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "ATM") {
				$ponto = $this -> listadePontos -> set(1, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Gn") {
				$ponto = $this -> listadePontos -> set(2, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "PGn") {
				$ponto = $this -> listadePontos -> set(3, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
		}

		$g -> drawLine($this -> listadePontos -> get(0) -> getPonto()['x'], $this -> listadePontos -> get(0) -> getPonto()['y'], $this -> listadePontos -> get(1) -> getPonto()['x'], $this -> listadePontos -> get(1) -> getPonto()['y']);
		$g -> drawLine($this -> listadePontos -> get(1) -> getPonto()['x'], $this -> listadePontos -> get(1) -> getPonto()['y'], $this -> listadePontos -> get(3) -> getPonto()['x'], $this -> listadePontos -> get(3) -> getPonto()['y']);
		$g -> drawLine($this -> listadePontos -> get(0) -> getPonto()['x'], $this -> listadePontos -> get(0) -> getPonto()['y'], $this -> listadePontos -> get(2) -> getPonto()['x'], $this -> listadePontos -> get(2) -> getPonto()['y']);

		$this -> calcularMedidas();
	}

	public function carregaPontos() {   /*returns a ArrayList<PontosCefalometricos>*/
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "ENA"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "ATM"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Gn"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "PGn"));

		return $this -> listadePontos;
	}

	public function setListaPontos($pontos) {   /*receive a ArrayList<PontosCefalometricos>*/
		$this -> listadePontos = $pontos;
	}

	public function calcularMedidas() {
		$this -> listaMedidas = new ArrayList();

		$ComprimentoMandibular = sqrt(abs($this -> listadePontos -> get(1) -> getPonto()['x'] - $this -> listadePontos -> get(3) -> getPonto()['x']) + abs($this -> listadePontos -> get(1) -> getPonto()['y'] - $this -> listadePontos -> get(3) -> getPonto()['y']));

		$ComprimentoMaxilar = sqrt(abs($this -> listadePontos -> get(1) -> getPonto()['x'] - $this -> listadePontos -> get(0) -> getPonto()['x']) + abs($this -> listadePontos -> get(1) -> getPonto()['y'] - $this -> listadePontos -> get(0) -> getPonto()['y']));

		$AlturaFacial = sqrt(abs($this -> listadePontos -> get(0) -> getPonto()['x'] - $this -> listadePontos -> get(2) -> getPonto()['x']) + abs($this -> listadePontos -> get(0) -> getPonto()['y'] - $this -> listadePontos -> get(2) -> getPonto()['y']));

		$DifComprimento = $ComprimentoMandibular - $ComprimentoMaxilar;

		$this -> listaMedidas -> add(new Medidas($ComprimentoMandibular, "Comprimento Mandibular"));
		$this -> listaMedidas -> add(new Medidas($ComprimentoMaxilar, "Comprimento Maxilar"));
		$this -> listaMedidas -> add(new Medidas($AlturaFacial, "Altura Facial"));
		$this -> listaMedidas -> add(new Medidas($DifComprimento, "Diferença Comprimento Maxilomandibular"));

	}

	public function getListaMedidas() { /*returns a ArrayList<Medidas>*/
		return $this -> listaMedidas;
	}

	public function setListaMedidas($listaMedidas) { /*receive a ArrayList<Medidas>*/
		$this -> listaMedidas = $listaMedidas;
	}
}
?>