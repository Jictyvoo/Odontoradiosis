<?php

require_once "../../util/ArrayList.php";
require_once "../value/PontosCefalometricos.php";
require_once "../value/Medidas.php";
require_once "../business/Tracado.php";
require_once "../business/Calculos.php";

class TracadoSteiner implements Tracado {

	private $listadePontos; /*is a ArrayList<PontosCefalometricos>*/
	private $listaMedidas; /*is a ArrayList<Medidas>*/

	public function __construct(){
		$this -> listadePontos = new ArrayList();
		$this -> listaMedidas = new ArrayList();
	}

	public function realizarTracado($g) {

		for ($i = 0; $i < $this -> listadePontos -> size(); $i =+ 1) {
			if ($this -> listadePontos -> get($i) -> getNome() == "S") {
				$ponto = $this -> listadePontos -> set(0, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "N") {
				$ponto = $this -> listadePontos -> set(1, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "A") {
				$ponto = $this -> listadePontos -> set(2, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "B") {
				$ponto = $this -> listadePontos -> set(3, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "D") {
				$ponto = $this -> listadePontos -> set(4, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Go") {
				$ponto = $this -> listadePontos -> set(5, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Gn") {
				$ponto = $this -> listadePontos -> set(6, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Pog") {
				$ponto = $this -> listadePontos -> set(7, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Pog'") {
				$ponto = $this -> listadePontos -> set(8, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Labio Sup.") {
				$ponto = $this -> listadePontos -> set(9, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Apice Inc. Sup.") {
				$ponto = $this -> listadePontos -> set(10, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Apice Inc. Inf.") {
				$ponto = $this -> listadePontos -> set(11, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Incisal Inc. Sup.") {
				$ponto = $this -> listadePontos -> set(12, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Incisal Inc. Inf.") {
				$ponto = $this -> listadePontos -> set(13, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Or") {
				$ponto = $this -> listadePontos -> set(14, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "MPM") {
				$ponto = $this -> listadePontos -> set(15, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Me") {
				$ponto = $this -> listadePontos -> set(16, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "Ponto 6") {
				$ponto = $this -> listadePontos -> set(17, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "1") {
				$ponto = $this -> listadePontos -> set(18, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "1'") {
				$ponto = $this -> listadePontos -> set(19, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "PM1") {
				$ponto = $this -> listadePontos -> set(20, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "PM2") {
				$ponto = $this -> listadePontos -> set(21, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
			else if ($this -> listadePontos -> get($i) -> getNome() == "PMX") {
				$ponto = $this -> listadePontos -> set(22, $this -> listadePontos -> get($i));
				$this -> listadePontos -> set($i, $ponto);
			}
		}

		$g->drawLine($this -> listadePontos -> get(1) -> getPonto()['x'], $this -> listadePontos -> get(1) -> getPonto()['y'], $this -> listadePontos -> get(2) -> getPonto()['x'], $this -> listadePontos -> get(2) -> getPonto()['y']); //N-A
		$g->drawLine($this -> listadePontos -> get(1) -> getPonto()['x'], $this -> listadePontos -> get(1) -> getPonto()['y'], $this -> listadePontos -> get(3) -> getPonto()['x'], $this -> listadePontos -> get(3) -> getPonto()['y']); //N-B
		$g->drawLine($this -> listadePontos -> get(1) -> getPonto()['x'], $this -> listadePontos -> get(1) -> getPonto()['y'], $this -> listadePontos -> get(4) -> getPonto()['x'], $this -> listadePontos -> get(4) -> getPonto()['y']); //N-D
		$g->drawLine($this -> listadePontos -> get(1) -> getPonto()['x'], $this -> listadePontos -> get(1) -> getPonto()['y'], $this -> listadePontos -> get(0) -> getPonto()['x'], $this -> listadePontos -> get(0) -> getPonto()['y']); //S-N
		$g->drawLine($this -> listadePontos -> get(0) -> getPonto()['x'], $this -> listadePontos -> get(0) -> getPonto()['y'], $this -> listadePontos -> get(6) -> getPonto()['x'], $this -> listadePontos -> get(6) -> getPonto()['y']); //S-Gn
		$g->drawLine($this -> listadePontos -> get(10) -> getPonto()['x'], $this -> listadePontos -> get(10) -> getPonto()['y'], $this -> listadePontos -> get(12) -> getPonto()['x'], $this -> listadePontos -> get(12) -> getPonto()['y']); //Ã�pice dos incisivos superiores
		$g->drawLine($this -> listadePontos -> get(11) -> getPonto()['x'], $this -> listadePontos -> get(11) -> getPonto()['y'], $this -> listadePontos -> get(13) -> getPonto()['x'], $this -> listadePontos -> get(13) -> getPonto()['y']); //Ã�pice dos incisivos inferiores
		$g->drawLine($this -> listadePontos -> get(8) -> getPonto()['x'], $this -> listadePontos -> get(8) -> getPonto()['y'], $this -> listadePontos -> get(9) -> getPonto()['x'], $this -> listadePontos -> get(9) -> getPonto()['y']); //Pog'-LS
		$g->drawLine($this -> listadePontos -> get(5) -> getPonto()['x'], $this -> listadePontos -> get(5) -> getPonto()['y'], $this -> listadePontos -> get(6) -> getPonto()['x'], $this -> listadePontos -> get(6) -> getPonto()['y']); //Go-Gn
		$g->drawLine($this -> listadePontos -> get(22) -> getPonto()['x'], $this -> listadePontos -> get(22) -> getPonto()['y'], $this -> listadePontos -> get(16) -> getPonto()['x'], $this -> listadePontos -> get(16) -> getPonto()['y']); //PMX - Me
		$g->drawLine($this -> listadePontos -> get(20) -> getPonto()['x'], $this -> listadePontos -> get(20) -> getPonto()['y'], $this -> listadePontos -> get(21) -> getPonto()['x'], $this -> listadePontos -> get(21) -> getPonto()['y']); //PM1 - PM2
		$g->drawLine($this -> listadePontos -> get(11) -> getPonto()['x'], $this -> listadePontos -> get(11) -> getPonto()['y'], $this -> listadePontos -> get(17) -> getPonto()['x'], $this -> listadePontos -> get(17) -> getPonto()['y']); //Ã�pice Inc. Inf. - Ponto 6


		$dash1 = array(10.0);
		$dashed = "new BasicStroke(1.0, $BasicStroke->CAP_BUTT, $BasicStroke->JOIN_MITER, 10.0, dash1, 0.0);";
		$g2 = $g;
		$g2 -> setStroke($dashed);

		$bissetriz = $this -> calcularBissetriz($this -> listadePontos -> get(20), $this -> listadePontos -> get(21), $this -> listadePontos -> get(22), $this -> listadePontos -> get(16));

		$g2 -> drawLine($bissetriz[0]['x'], $bissetriz[0]['y'], $bissetriz[1]['x'], $bissetriz[1]['y']); //Mostrar a bissetriz
		$this -> calcularMedidas();
	}

	public function carregaPontos() {	/*returns a ArrayList<PontosCefalometricos>*/
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "S"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "N"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Or"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "A"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "B"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "D"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Go"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Gn"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Pog"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Ponto 6"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Apice Inc. Sup."));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Incisal Inc. Sup."));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Apice Inc. Inf."));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Incisal Inc. Inf."));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Labio Sup."));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "MPM"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Me"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "Pog'"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "PM1"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "PM2"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "PMX"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "1"));
		$this -> listadePontos -> add(new PontosCefalometricos(array(['x'] => 0, ['y'] => 0), "1'"));

		return $this -> listadePontos;
	}

	public function setListaPontos($pontos) {  /*receive a ArrayList<PontosCefalometricos>*/
		$this -> listadePontos = $pontos;
	}

	public function calcularMedidas() {
	}

	public function getListaMedidas() {	/*returns a ArrayList<Medidas>*/
		return $this -> listaMedidas;
	}

	private function geraEqGeral($ponto1, $ponto2) {   /*returns a float[] and receive 2 PontosCefalometricos*/
		$Cx = $ponto1 -> getPonto()['x'] * $ponto2 -> getPonto()['y'] - ($ponto2 -> getPonto()['x'] * $ponto1 -> getPonto()['y']);
		$Bx = $ponto1 -> getPonto()['x'] - $ponto2 -> getPonto()['x'];
		$Ax = $ponto1 -> getPonto()['y'] - $ponto2 -> getPonto()['y'];

		$returnedArray = array($Cx, $Bx, $Ax);

		return $returnedArray;
	}


	private function calcularBissetriz($p1, $p2, $p3, $p4) {   /*returns a Point[] and receive a PontosCefalometricos*/
		$eq1= $this -> geraEqGeral($p1, $p2);
		$eq2= $this -> geraEqGeral($p3, $p4);

		$a1 = $eq1[2];
		$b1 = $eq1[1];
		$c1 = $eq1[0];
		$a2 = $eq2[2];
		$b2 = $eq2[1];
		$c2 = $eq2[0];

		$v1 = sqrt(pow($a1, 2) + pow($b1, 2));
		$v2 = sqrt(pow($a2, 2) + pow($b2, 2));

		$aBisse = ((($a1 * $v2) - ($a2 * $v1)) / (($b1 * $v2) - ($b2 * $v1)));
		$bBisse = ((($c1 * $v2) - ($c2 * $v1)) / (($b1 * $v2) - ($b2 * $v1)));

		$ponto1 = array(['x'] => 0, round(($aBisse * 0 + $bBisse)));
		$ponto2 = array(['x'] => 800, round(($aBisse * 800 + $bBisse)));

		$bissetriz = array(['x'] => $ponto1, ['y'] => $ponto2);

		return $bissetriz;
	}
}

?>