<?php
require "../value/PontosCefalometricos.php";
class Calculos {
	public function calcularMedida($retaP1, $retaP2, $ponto) { // distancia de um ponto a uma reta
		
		/* https://www.topcoder.com/community/data-science/data-science-tutorials/geometry-concepts-basic-concepts/#line_point_distance */
		// calculo por vetor
		$A = new PontosCefalometricos ( $retaP1->getPonto (), "A" );
		$B = new PontosCefalometricos ( $retaP2->getPonto (), "B" );
		$C = new PontosCefalometricos ( $ponto->getPonto (), "C" );
		
		$AB0 = $A->getPonto () ['x'] - $B->getPonto () ['x'];
		$AB1 = $A->getPonto () ['y'] - $B->getPonto () ['y'];
		$AC0 = $A->getPonto () ['x'] - $A->getPonto () ['y'];
		$AC1 = $A->getPonto () ['y'] - $C->getPonto () ['y'];
		
		// Compute the distance from A to B = |AB| = ra9z de (x2+y2)
		$distanciaAB = sqrt ( $AB0 * $AB0 + $AB1 * $AB1 );
		
		// AB x AC
		// cross = AB[0] * AC[1] - AB[1] * AC[0];
		$produto = $AB0 * $AC1 - $AB1 * $AC0;
		
		// calculo final
		$medida = (($produto / $distanciaAB) * 0.264583);
		
		return $medida;
	}
	public function calcularAngulo($reta1P1, $reta1P2, $reta2P1, $reta2P2) { // odontoradiosis
		$angularR1 = calcCoefAngular ( $reta1P1, $reta1P2 );
		$angularR2 = calcCoefAngular ( $reta2P1, $reta2P2 );
		
		$valor = toDegrees ( abs ( atan ( $angularR1 ) - atan ( $angularR2 ) ) );
		return $valor;
	}
	public function calcCoefAngular($P1, $P2) {
		$angular = (($P1->getPonto () ['y'] - $P2->getPonto () ['y']) / ($P1->getPonto () ['x'] - $P2->getPonto () ['x']));
		return $angular;
	}
}
?>