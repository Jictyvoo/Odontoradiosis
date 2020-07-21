<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\ImageLandmark;
use App\Models\Landmark;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ImageLandmarkController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth');
    }

    /**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index() {
        $imageLandmarks = ImageLandmark::all()->where('fk_id_doctor', auth()->user()->id);
        return view("doctor.saved_images",['images' => $imageLandmarks]);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create() {
		//
	}

	/**
	 * @return array
	 */
	private function getDictionaryLandmarks(){
		return  array(
			"Sela (S)" => "Sela_S", "Násio (N)" => "Nasio_N", "Espinha nasal anterior (ENA)" => "espinha_nasal_ENA", "Espinha nasal posterior (ENP)" => "espinha_nasal_ENP", "Ponto subespinhal (A)" => "ponto_subespinhal_A",
			"Ponto pupramental (B)" => "ponto_pupramental_B", "Pogônio (Pog)" => "pogonio_Pog", "Gnátio (Gn)" => "gnatio_Gn", "Mento (Me)" => "mento_Me",
			"Condílio (Co)" => "condilio_Co", "Pró-nasal (Pn)" => "pronasal_Pn", "Pogônio Mole (Pg)" => "pogonio_mole_Pg", "Palato Mole (pm)" => "palato_mole_pm",
			"Gônio (Go)" => "gonio_Go", "Órbitário (Or)" => "orbitale_Or", "Pório (Po)" => "porio_Po", "Ponta do Nariz (PN)" => "ponta_nariz_PtN",
			"Fossa Ptérigo Maxilar (Fpm)" => "pterigo_maxilar_Fpm", "Pterigóide (Pt)" => "pterigoide_Pt",
			/*"Básio (Ba)" => "Ba", "Próstil (Pr)" => "Pr", "Infradental (Id)" => "Id", "Ponto D (D)" => "D",
			"Bolton (Bo)" => "Bo", "Articular (Ar)" => "Ar", "Ponto E (E)" => "E", "Mentoniano (Me)" => "Men",
			"Columela (Cm)" => "Cm", "Subnasal (Sn)" => "Sn", "Lábio Superior (Ls)" => "Ls", "Stomion Superior (Sts)" => "Sts",
			"Adenóide (ad)" => "ad", "Ponto bl (bl)" => "bl", "Ponto bf (bf)" => "bf"*/
		);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param Request $request
	 * @return Response
	 */
	public function store(Request $request) {
		$jsonReceived = $request->input('savedPoints');
		$landmarksSaved = json_decode($jsonReceived);
		$image = null;
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
			$dictionaryLandmarks = $this->getDictionaryLandmarks();
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
		(new BezierCurveController())->store($request, $image);
		return redirect('home');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int $id
	 * @return Response|string
	 */
	public function show($id) {
		$imageLandmark = ImageLandmark::all()->where('fk_id_image', '=', $id)->where('fk_id_doctor', '=', auth()->user()->id)->first();
		if($imageLandmark) {
			$landmarkX = Landmark::find($imageLandmark->fk_landmark_x);
			$landmarkY = Landmark::find($imageLandmark->fk_landmark_y);
			$dictionaryLandmarks = $this->getDictionaryLandmarks();
			$landmarksJson = "{";
			$count = 0;
			foreach ($dictionaryLandmarks as $key => $value) {
				if ($count >= 1) {
					$landmarksJson = $landmarksJson . ", ";
				}
				$count += 1;
				$landmarksJson = $landmarksJson . "\"" . $key . "\":{\"X\": " . ($landmarkX[$value] ? $landmarkX[$value] : 0) . ", \"Y\": " . ($landmarkY[$value] ? $landmarkY[$value] : 0) . "}";
			}
			$landmarksJson = $landmarksJson . "}";
			return $landmarksJson;
		}
		return "{}";
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int $id
	 * @return Response
	 */
	public function edit($id) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param Request $request
	 * @param  int $id
	 * @return Response
	 */
	public function update(Request $request, $id) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int $id
	 * @return Response
	 */
	public function destroy($id) {
		//
	}
}
