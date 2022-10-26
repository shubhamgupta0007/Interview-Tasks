<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::get("users/export", "UserController@export");
// Route::get("home", "UserListDetailsController@index");

// Route::resource("users", "UserController");

Route::get("index", "UserListDetailsController@index");
Route::post("save", "UserListDetailsController@save");
Route::get("Edit-User/{id}", "UserListDetailsController@edit");
Route::put("Update-User/{id}", "UserListDetailsController@update");
Route::get("Excel-Export", "UserListDetailsController@download_excel");
