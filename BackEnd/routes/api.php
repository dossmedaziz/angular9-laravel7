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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});










                                            Route::get('find','ProductController@search');
                                            Route::get('get','ProductController@index');

                            
                                      Route::group(['middleware' => 'auth:api'], function () {
                                           
    /*more info for public */               Route::get('get/{id}','ProductController@showByID'); 
    /* more info for user */                Route::get('more-info/{id}','ProductController@moreInfo'); 
    /* every user see his products */       Route::get('myproducts','ProductController@myProducts') ;
    /* delete product */                    Route:: delete('delete/{id}','ProductController@destroy') ; 
     /* add new product */                  Route::post('post','ProductController@store'); 
     /* update */                           Route::put('put/{id}','ProductController@update'); 

                                    });

                    
    
             
                        
                        
                        // Api Routes {Users}
                        Route::get('categories','CategoryController@allCategories'); 
                        Route::get('users','UserController@index') ; 
                        
                        
                        Route::post('create','UserController@create') ;
                        Route::post('/login','UserController@login') ; 
                    


                        // for admin
                        Route::get('admin','ProductController@admin'); 
                        //confirmer
                        Route::put('confirm/{id}','ProductController@confirmProduct') ; 
                              