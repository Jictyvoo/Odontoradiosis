<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\ImageLandmark;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ImageController extends Controller {

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
		/*$images = Image::all();*/
        $images = DB::table('images')->whereNotIn('id', ImageLandmark::select('fk_id_image')->where('fk_id_doctor', auth()->user()->id)->get()->toArray())->get();
		return view("doctor.all_images", compact('images'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create() {
		return view('administrator.add_radiography_form');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param Request $request
	 * @return Response
	 */
	public function store(Request $request) {
		$image = new Image();
		$path = $request->file('radiography')->store('radiography', 'public');
		$image->path = $path;
		$image->save();
		return redirect('image');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int $id
	 * @return Response
	 */
	public function show($id) {
		//
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
