<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RequestAccess extends Controller {
	public function index () {
		return view('layouts/request');
	}
}
