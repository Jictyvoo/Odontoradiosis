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
