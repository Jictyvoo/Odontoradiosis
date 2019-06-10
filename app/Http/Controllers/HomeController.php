<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Models\RequestOrthodontist;
use App\Models\RequestStudent;


class HomeController extends Controller {
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->middleware('auth');
	}

	/**
	 * Show the application dashboard.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index() {
		if (auth()->user()->access_level == 1) {
			$requests = RequestOrthodontist::all();
			$students = RequestStudent::all();
			return view('administrator/index', ["requests" => $requests], ["students" => $students]);
		}
		return view('doctor/index');
	}

	public function approveOrthodontist($id) {
		$user = new User();
		$request = RequestOrthodontist::find($id);
		$user->name = $request->name;
		$user->email = $request->email;
		$user->password = $request->password;
		$user->cpf = $request->cpf;
		$user->access_level = $request->access_level;
		$user->save();
		$request->delete();
		return redirect()->route('home');
	}

	public function refuseOrthodontist($id) {
		$request = RequestOrthodontist::find($id);
		$request->delete();
		return redirect()->route('home');
	}

	public function approveStudent($id) {
		$user = new User();
		$request = RequestStudent::find($id);
		$user->name = $request->name;
		$user->email = $request->email;
		$user->password = $request->password;
		$user->cpf = $request->cpf;
		$user->access_level = $request->access_level;
		$user->save();
		$request->delete();
		return redirect()->route('home');
	}

	public function refuseStudent($id) {
		$request = RequestStudent::find($id);
		$request->delete();
		return redirect()->route('home');
	}
}
