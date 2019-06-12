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
		return  array("Básio (Ba)" => "Ba", "Sela (S)" => "S", "Násio (N)" => "N", "Espinha nasal anterior (ENA)" => "ENA", "Espinha nasal posterior (ENP)" => "ENP", "Ponto subespinhal (A)" => "A", "Ponto pupramental (B)" => "PB", "Próstil (Pr)" => "Pr", "Infradental (Id)" => "Id", "Pogônio (Pog)" => "Pog", "Gnátio (Gn)" => "Gn", "Mento (Me)" => "Me", "Ponto D (D)" => "D", "Bolton (Bo)" => "Bo", "Articular (Ar)" => "Ar", "Pório (Po)" => "Po", "Pterigóideo (Pt)" => "Pt", "Ponto E (E)" => "E", "Mentoniano (Me)" => "Men", "Condílio (Co)" => "Co", "Pró-nasal (Pn)" => "Pn", "Columela (Cm)" => "Cm", "Subnasal (Sn)" => "Sn", "Lábio Superior (Ls)" => "Ls", "Stomion Superior (Sts)" => "Sts", "Pogônio Mole (Pg)" => "Pg", "Palato Mole (pm)" => "pm", "Adenóide (ad)" => "ad", "Ponto bl (bl)" => "bl", "Ponto bf (bf)" => "bf");
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
	 * @param  string $path
	 * @return Response|string
	 */
	public function show($path) {
		$path = str_replace("@", "/", $path);
		$image = Image::where('path', '=', $path)->first();
		$imageLandmark = ImageLandmark::all()->where('fk_id_image', '=', $image->id)->where('fk_id_doctor', '=', auth()->user()->id)->first();
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
