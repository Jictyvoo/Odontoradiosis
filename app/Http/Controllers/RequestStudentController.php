<?php

namespace App\Http\Controllers;

use App\RequestStudent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RequestStudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }  

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(array $data)
    {
        $access_level = 0;
		return RequestStudent::create(['name' => $data['name'], 'email' => $data['email'], 'password' => Hash::make($data['password']), 'cpf' => $data['cpf'], 'registration_guide' => $data['registration_guide'], 'access_level' => $access_level]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestStudent = new RequestStudent();
		$requestStudent->name = $request->input('name');
        $requestStudent->email = $request->input('email');
        $requestStudent->password = Hash::make($request->input('password'));
        $requestStudent->access_level = 0;
        $requestStudent->cpf = $request->input('cpf');
        $requestStudent->registration_guide = $request->file('registration_guide')->store('guide');
        $requestStudent->save();
    	return redirect('home');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\RequestStudent  $requestStudent
     * @return \Illuminate\Http\Response
     */
    public function show(RequestStudent $requestStudent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\RequestStudent  $requestStudent
     * @return \Illuminate\Http\Response
     */
    public function edit(RequestStudent $requestStudent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\RequestStudent  $requestStudent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RequestStudent $requestStudent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RequestStudent  $requestStudent
     * @return \Illuminate\Http\Response
     */
    public function destroy(RequestStudent $requestStudent)
    {
        //
    }
}
