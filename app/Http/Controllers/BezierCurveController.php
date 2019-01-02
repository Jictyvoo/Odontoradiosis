<?php

namespace App\Http\Controllers;

use App\Models\BezierCurve;
use App\Models\BezierPoints;
use App\Models\Image;
use Illuminate\Http\Request;

class BezierCurveController extends Controller {
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

	private function saveBezierPoints($bezierPoint, $curveArray) {
		$bezierPoint->x1 = $curveArray[0];
		$bezierPoint->y1 = $curveArray[1];
		$bezierPoint->cx1 = $curveArray[2];
		$bezierPoint->cy1 = $curveArray[3];
		$bezierPoint->cx2 = $curveArray[4];
		$bezierPoint->cy2 = $curveArray[5];
		if (count($curveArray) > 6) {
			$bezierPoint->x2 = $curveArray[6];
			$bezierPoint->y2 = $curveArray[7];
		}
		$bezierPoint->save();
		return $bezierPoint;
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param Image|null $image
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request, Image $image = null) {
		$bezierArrayCurves = json_decode($request->input('bezierCurves'));
		if ($image == null) {
			$image = Image::where('path', '=', $request->input('currentImage'))->first();
		}
		foreach ($bezierArrayCurves as $key => $value) {
			$bezierCurves = BezierCurve::orderBy('id')->where('name', '=', $key)->where('image_id', '=', $image->id)->get();
			if ($bezierCurves->count() == 0) {
				foreach ($value as $curveArray) {
					$bezierPoints = $this->saveBezierPoints(new BezierPoints(), $curveArray);
					$bezierCurve = new BezierCurve();
					$bezierCurve->name = $key;
					$bezierCurve->image_id = $image->id;
					$bezierCurve->bezier_point_id = $bezierPoints->id;
					$bezierCurve->save();
				}
			} else {
				$count = 0;
				foreach ($bezierCurves as $bezierCurve) {
					$this->saveBezierPoints(BezierPoints::find($bezierCurve->bezier_point_id), $value[$count]);
					$count += 1;
				}
			}
		}
		return redirect('home');
	}

	/**
	 * Will convert required curve image into a JSON file
	 *
	 * @param $path
	 * @return string
	 */
	public function show($path) {
		$path = str_replace("@", "/", $path);
		$returnedJson = "{";
		$image = Image::where('path', '=', $path)->first();
		$bezierCurves = BezierCurve::where('image_id', '=', $image->id)->orderBy('name')->orderBy('id')->get();
		$previousCurveName = null;
		if ($bezierCurves->count() > 0) {
			$first = true;
			$initial = true;
			foreach ($bezierCurves as $bezierCurve) {
				if ($previousCurveName != $bezierCurve->name) {
					$previousCurveName = $bezierCurve->name;
					$initial = true;
					if (!$first) {
						$returnedJson = $returnedJson . "], ";
					}
					$returnedJson = $returnedJson . "\"" . $bezierCurve->name . "\":[";
					$first = false;
				}
				$bezierPoint = BezierPoints::find($bezierCurve->bezier_point_id);
				if (!$initial) {
					$returnedJson = $returnedJson . ", ";
				}
				$initial = false;
				$returnedJson = $returnedJson . "[";
				$returnedJson = $returnedJson . $bezierPoint->x1;
				$returnedJson = $returnedJson . ", " . $bezierPoint->y1;
				$returnedJson = $returnedJson . ", " . $bezierPoint->cx1;
				$returnedJson = $returnedJson . ", " . $bezierPoint->cy1;
				$returnedJson = $returnedJson . ", " . $bezierPoint->cx2;
				$returnedJson = $returnedJson . ", " . $bezierPoint->cy2;
				if ($bezierPoint->x2 != null) {
					$returnedJson = $returnedJson . ", " . $bezierPoint->x2;
					$returnedJson = $returnedJson . ", " . $bezierPoint->y2;
				}
				$returnedJson = $returnedJson . "]";
			}
			$returnedJson = $returnedJson . "]}";
			return $returnedJson;
		}
		return redirect(asset('js/bezier_curves.json'));
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
