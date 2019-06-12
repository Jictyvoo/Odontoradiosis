<?php

namespace App\Http\Controllers;

use App\Models\RequestStudent;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class RequestStudentController extends Controller {
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
		$access_level = 0;
		return RequestStudent::create(['name' => $data['name'], 'email' => $data['email'], 'password' => Hash::make($data['password']), 'cpf' => $data['cpf'], 'registration_guide' => $data['registration_guide'], 'access_level' => $access_level]);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param Request $request
	 * @return Response
	 */
	public function store (Request $request) {
		$requestStudent = new RequestStudent();
		$requestStudent->name = $request->input('name');
		$requestStudent->email = $request->input('email');
		$requestStudent->password = Hash::make($request->input('password'));
		$requestStudent->access_level = 0;
		$requestStudent->cpf = $request->input('cpf');
		$requestStudent->registration_guide = $request->file('registration_guide')->store('guide', "public");
		$requestStudent->save();
		return redirect('home');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param RequestStudent $requestStudent
	 * @return void
	 */
	public function show (RequestStudent $requestStudent) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param RequestStudent $requestStudent
	 * @return void
	 */
	public function edit (RequestStudent $requestStudent) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param Request $request
	 * @param RequestStudent $requestStudent
	 * @return void
	 */
	public function update (Request $request, RequestStudent $requestStudent) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param RequestStudent $requestStudent
	 * @return void
	 */
	public function destroy (RequestStudent $requestStudent) {
		//
	}
}
