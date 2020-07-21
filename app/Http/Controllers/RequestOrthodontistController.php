<?php

namespace App\Http\Controllers;

use App\Models\RequestOrthodontist;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class RequestOrthodontistController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index () {
		//
	}

    /**
     * Show the form for creating a new resource.
     *
     * @param array $data
     * @return Response
     */
	public function create (array $data) {
		return view('layouts/request');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param Request $request
	 * @return Response
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
	 * @param RequestOrthodontist $requestOrthodontist
	 * @return Response
	 */
	public function show (RequestOrthodontist $requestOrthodontist) {
		//
	}

    /**
     * Show the form for editing the specified resource.
     *
     * @param RequestOrthodontist $requestOrthodontist
     * @return void
     */
	public function edit (RequestOrthodontist $requestOrthodontist) {
		//
	}

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param RequestOrthodontist $requestOrthodontist
     * @return void
     */
	public function update (Request $request, RequestOrthodontist $requestOrthodontist) {
		//
	}

    /**
     * Remove the specified resource from storage.
     *
     * @param RequestOrthodontist $requestOrthodontist
     * @return void
     */
	public function destroy (RequestOrthodontist $requestOrthodontist) {
		//
	}
}
