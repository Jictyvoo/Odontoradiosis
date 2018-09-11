<?php
require "../value/PontosCefalometricos.php";
require "../../util/ArrayList.php";
interface Tracado {
	public function realizarTracado($g);
	public function carregaPontos(); /* return a PontosCefalometricos ArrayList */
	public function setListaPontos($pontos); /* receive a PontosCefalometricos ArrayList */
	public function calcularMedidas();
	public function getListaMedidas(); /* return a Medidas ArrayList */
}
?>