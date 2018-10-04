<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LandmarksController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index() {
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create() {
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request) {
		$jsonReceived = $request->input('savedPoints');

		$landmarksSaved = json_decode($jsonReceived);
		if ($landmarksSaved) {
			$decodedJson = $landmarksSaved;
			$columns = "";
			$values = "";
			$dictionaryLandmarks = array("Básio (Ba)" => "Ba", "Sela (S)" => "S", "Násio (N)" => "N", "Espinha nasal anterior (ENA)" => "ENA", "Espinha nasal posterior (ENP)" => "ENP", "Ponto subespinhal (A)" => "A", "Ponto pupramental (B)" => "PB", "Próstil (Pr)" => "Pr", "Infradental (Id)" => "Id", "Pogônio (Pog)" => "Pog", "Gnátio (Gn)" => "Gn", "Mento (Me)" => "Me", "Ponto D (D)" => "D", "Bolton (Bo)" => "Bo", "Articular (Ar)" => "Ar", "Pório (Po)" => "Po", "Pterigóideo (Pt)" => "Pt", "Ponto E (E)" => "E", "Mentoniano (Me)" => "Men", "Condílio (Co)" => "Co", "Pró-nasal (Pn)" => "Pn", "Columela (Cm)" => "Cm", "Subnasal (Sn)" => "Sn", "Lábio Superior (Ls)" => "Ls", "Stomion Superior (Sts)" => "Sts", "Pogônio Mole (Pg’)" => "Pg'", "Palato Mole (pm)" => "pm", "Adenóide (ad)" => "ad", "Ponto bl (bl)" => "bl", "Ponto bf (bf)" => "bf");
			foreach ($decodedJson as $key => $value) {
				$columns = $columns . $dictionaryLandmarks [$key] . "X, " . $dictionaryLandmarks [$key] . "Y, ";
				$values = $values . $value->X . ", " . $value->Y . ", ";
			}
			return view('doctor_landmark', ['result' => "Landmarks successfully registered"]);
		}
		return view('doctor_landmark', ['result' => "Error to save Landmarks"]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit($id) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id) {
		//
	}
}
