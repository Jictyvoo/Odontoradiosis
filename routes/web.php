<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return redirect('home');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/help', 'HomeController@help')->name('help');
Route::get('/request', 'RequestAccess@index')->name('request');
Route::get('/approveOrthodontist/{id}', 'HomeController@approveOrthodontist')->name('approveOrthodontist');
Route::get('/refuseOrthodontist/{id}', 'HomeController@refuseOrthodontist')->name('refuseOrthodontist');
Route::get('/approveStudent/{id}', 'HomeController@approveStudent')->name('approveStudent');
Route::get('/refuseStudent/{id}', 'HomeController@refuseStudent')->name('refuseStudent');

Route::resource('user', 'UsersController');
Route::resource('image', 'ImageController');
Route::resource('image_landmark', 'ImageLandmarkController');
Route::resource('bezier_curve', 'BezierCurveController');
Route::resource('request_orthodontist', 'RequestOrthodontistController');
Route::resource('request_student', 'RequestStudentController');
/**
 * To validate landmarks
 */
Route::get('/validation/{toCompare}', 'AnalyzerController@compareLandmarks');
Route::get('/semiautomatic/{quantity}', 'SemiautomaticLandmarkController@run');
