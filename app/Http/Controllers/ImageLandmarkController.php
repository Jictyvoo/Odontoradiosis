<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\ImageLandmark;
use App\Models\Landmark;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ImageLandmarkController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index() {
        $imageLandmarks = ImageLandmark::all()->where('fk_id_doctor', auth()->user()->id);
        return view("doctor.saved_images",['images' => $imageLandmarks]);
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
			$image = Image::where('path', '=', $request->input('currentImage'))->first();
			$imageLandmark = ImageLandmark::all()->where('fk_id_image', '=', $image->id)->where('fk_id_doctor', '=', auth()->user()->id)->first();
			if ($imageLandmark == null) {
				$imageLandmark = new ImageLandmark();
				$imageLandmark->fk_id_image = $image->id;
				$landmarkX = new Landmark();
				$landmarkY = new Landmark();
				$landmarkX->save();
				$landmarkY->save();
				$imageLandmark->fk_landmark_x = $landmarkX->id_landmark;
				$imageLandmark->fk_landmark_y = $landmarkY->id_landmark;
				$imageLandmark->fk_id_doctor = auth()->user()->id;
				$imageLandmark->save();
			}
			$dictionaryLandmarks = array("Básio (Ba)" => "Ba", "Sela (S)" => "S", "Násio (N)" => "N", "Espinha nasal anterior (ENA)" => "ENA", "Espinha nasal posterior (ENP)" => "ENP", "Ponto subespinhal (A)" => "A", "Ponto pupramental (B)" => "PB", "Próstil (Pr)" => "Pr", "Infradental (Id)" => "Id", "Pogônio (Pog)" => "Pog", "Gnátio (Gn)" => "Gn", "Mento (Me)" => "Me", "Ponto D (D)" => "D", "Bolton (Bo)" => "Bo", "Articular (Ar)" => "Ar", "Pório (Po)" => "Po", "Pterigóideo (Pt)" => "Pt", "Ponto E (E)" => "E", "Mentoniano (Me)" => "Men", "Condílio (Co)" => "Co", "Pró-nasal (Pn)" => "Pn", "Columela (Cm)" => "Cm", "Subnasal (Sn)" => "Sn", "Lábio Superior (Ls)" => "Ls", "Stomion Superior (Sts)" => "Sts", "Pogônio Mole (Pg’)" => "Pg'", "Palato Mole (pm)" => "pm", "Adenóide (ad)" => "ad", "Ponto bl (bl)" => "bl", "Ponto bf (bf)" => "bf");
			$valuesX = [];
			$valuesY = [];
			foreach ($landmarksSaved as $key => $value) {
				$valuesX[$dictionaryLandmarks[$key]] = $value->X;
				$valuesY[$dictionaryLandmarks[$key]] = $value->Y;
			}
			DB::table('landmarks')->where('id_landmark', $imageLandmark->fk_landmark_x)->update($valuesX);
			DB::table('landmarks')->where('id_landmark', $imageLandmark->fk_landmark_y)->update($valuesY);
			DB::commit();
			$imageLandmark->save();
		}
		return redirect('home');
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
