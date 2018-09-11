<?php

use Fit_Piece\Exception\UnsupportedOperationException;

require_once "../value/PontosCefalometricos.php";
require_once "../../util/ArrayList.php";
require_once "../business/Tracado.php";

class TracadoDowns implements Tracado {

	private $listadePontos; /*is a ArrayList<PontosCefalometricos>*/
	private $listaMedidas; /*is a ArrayList<Medidas>*/

	public function __construct(){
		$this -> listadePontos = new ArrayList();
		$this -> listaMedidas = new ArrayList();
	}

	public function realizarTracado($g) {
		for ($i=0; $i<$this -> listadePontos -> size(); $i += 1) {
			if ($this -> listadePontos -> get($i) -> getNome() == "S") {
				$ponto = $this -> listadePontos -> set(0, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "N") {
				$ponto = $this -> listadePontos -> set(1, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Or") {
				$ponto = $this -> listadePontos -> set(2, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Po") {
				$ponto = $this -> listadePontos -> set(3, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "A") {
				$ponto = $this -> listadePontos -> set(4, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "B") {
				$ponto = $this -> listadePontos -> set(5, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Gn") {
				$ponto = $this -> listadePontos -> set(6, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Me") {
				$ponto = $this -> listadePontos -> set(7, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Pog") {
				$ponto = $this -> listadePontos -> set(8, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "PMA") {
				$ponto = $this -> listadePontos -> set(9, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "PMP") {
				$ponto = $this -> listadePontos -> set(10, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "MPM") {
				$ponto = $this -> listadePontos -> set(11, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Incisal Inc. Inf.") {
				$ponto = $this -> listadePontos -> set(12, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Incisal Inc. Sup.") {
				$ponto = $this -> listadePontos -> set(13, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Apice Inc. Inf.") {
				$ponto = $this -> listadePontos -> set(14, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Apice Inc. Sup.") {
				$ponto = $this -> listadePontos -> set(15, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
		}

		$g.drawLine($this -> listadePontos -> get(2) -> getPonto()['x'], $this -> listadePontos -> get(2) -> getPonto()['y'], $this -> listadePontos -> get(3) -> getPonto()['x'], $this -> listadePontos -> get(3) -> getPonto()['y']); //Po-Or
		$g.drawLine($this -> listadePontos -> get(1) -> getPonto()['x'], $this -> listadePontos -> get(1) -> getPonto()['y'], $this -> listadePontos -> get(8) -> getPonto()['x'], $this -> listadePontos -> get(8) -> getPonto()['y']); //N-Pog
		$g.drawLine($this -> listadePontos -> get(0) -> getPonto()['x'], $this -> listadePontos -> get(0) -> getPonto()['y'], $this -> listadePontos -> get(6) -> getPonto()['x'], $this -> listadePontos -> get(6) -> getPonto()['y']); //S-Gn
		$g.drawLine($this -> listadePontos -> get(1) -> getPonto()['x'], $this -> listadePontos -> get(1) -> getPonto()['y'], $this -> listadePontos -> get(4) -> getPonto()['x'], $this -> listadePontos -> get(4) -> getPonto()['y']); //N-A
		$g.drawLine($this -> listadePontos -> get(8) -> getPonto()['x'], $this -> listadePontos -> get(8) -> getPonto()['y'], $this -> listadePontos -> get(4) -> getPonto()['x'], $this -> listadePontos -> get(4) -> getPonto()['y']); //A-Pog
		$g.drawLine($this -> listadePontos -> get(4) -> getPonto()['x'], $this -> listadePontos -> get(4) -> getPonto()['y'], $this -> listadePontos -> get(5) -> getPonto()['x'], $this -> listadePontos -> get(5) -> getPonto()['y']); //A-B
		$g.drawLine($this -> listadePontos -> get(9) -> getPonto()['x'], $this -> listadePontos -> get(9) -> getPonto()['y'], $this -> listadePontos -> get(10) -> getPonto()['x'], $this -> listadePontos -> get(10) -> getPonto()['y']); //PMA-PMB
		$g.drawLine($this -> listadePontos -> get(11) -> getPonto()['x'], $this -> listadePontos -> get(11) -> getPonto()['y'], $this -> listadePontos -> get(12) -> getPonto()['x'], $this -> listadePontos -> get(12) -> getPonto()['y']); //Inc. Ii - MPM
		$g.drawLine($this -> listadePontos -> get(12) -> getPonto()['x'], $this -> listadePontos -> get(12) -> getPonto()['y'], $this -> listadePontos -> get(14) -> getPonto()['x'], $this -> listadePontos -> get(14) -> getPonto()['y']); //Apice - Incisal Ii
		$g.drawLine($this -> listadePontos -> get(13) -> getPonto()['x'], $this -> listadePontos -> get(13) -> getPonto()['y'], $this -> listadePontos -> get(15) -> getPonto()['x'], $this -> listadePontos -> get(15) -> getPonto()['y']); //Apice - Incisal Is

		}

		public function carregaPontos() {   /*returns a ArrayList<PontosCefalometricos>*/
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "S"));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "N"));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Or"));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Po"));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "A"));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "B"));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Gn"));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Me"));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Pog"));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "PMA"));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "PMP"));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "MPM"));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Incisal Inc. Inf."));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Incisal Inc. Sup."));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Apice Inc. Inf."));
			$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Apice Inc. Sup."));


			return $this -> listadePontos;
		}

		public function setListaPontos($pontos) {   /*receive a ArrayList<PontosCefalometricos>*/
			$this -> listadePontos = $pontos;
		}

		public function calcularMedidas() {
			throw new UnsupportedOperationException("Not supported yet.");
		}

		public function getListaMedidas() {	/*receive a ArrayList<Medidas>*/
			throw new UnsupportedOperationException("Not supported yet.");
		}

}
?>