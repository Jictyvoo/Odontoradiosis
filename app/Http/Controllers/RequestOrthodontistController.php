<?php

namespace App\Http\Controllers;

use App\Models\RequestOrthodontist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RequestOrthodontistController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index () {
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create (array $data) {
		return view('layuouts/request');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\Http\Response
	 */
	public function store (Request $request) {
		$requestOrthodontist = new RequestOrthodontist();
		$requestOrthodontist->name = $request->input('name');
		$requestOrthodontist->email = $request->input('email');
		$requestOrthodontist->password = Hash::make($request->input('password'));
		$requestOrthodontist->access_level = 0;
		$requestOrthodontist->cpf = $request->input('cpf');
		$requestOrthodontist->cro = $request->input('cro');
		$requestOrthodontist->save();
		return redirect('home');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\RequestOrthodontist $requestOrthodontist
	 * @return \Illuminate\Http\Response
	 */
	public function show (RequestOrthodontist $requestOrthodontist) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\RequestOrthodontist $requestOrthodontist
	 * @return \Illuminate\Http\Response
	 */
	public function edit (RequestOrthodontist $requestOrthodontist) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  \App\RequestOrthodontist $requestOrthodontist
	 * @return \Illuminate\Http\Response
	 */
	public function update (Request $request, RequestOrthodontist $requestOrthodontist) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\RequestOrthodontist $requestOrthodontist
	 * @return \Illuminate\Http\Response
	 */
	public function destroy (RequestOrthodontist $requestOrthodontist) {
		//
	}
}
