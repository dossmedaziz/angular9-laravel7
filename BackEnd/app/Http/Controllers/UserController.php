<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Support\Facades\Validator ;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth ; 
use Illuminate\Http\Request;
use App\User ; 
use App\Role ; 
class UserController extends Controller
{
    public function login(Request $request)
    {

                $login = $request->validate([
                'email' => 'required|string',
                'password' => 'required|string'
            ]) ;
                
                    if(!Auth::attempt($login))
                    {
                        return response(['message'=>'invalid login credentials','access'=>'0']);
                    }
                    
                    $accessToken = Auth::user()->createToken('authToken')->accessToken ; 

                    return response(['user'=>Auth::user(), 'access_token' => $accessToken ,'access' =>'1']) ;

                }
                public function create(Request $request)
    {
        $rules = [
            'name' => 'required|min:4',
            'email' => 'required|email',
            'password' => 'required|min:8|max:16', 
        ];
        $validator = Validator::make($request->all(),$rules) ;
        if($validator->fails())
        {
            return response()->json($validator->errors(),400) ;
        }
        $user=User::create([
            'name'=> $request->input('name'),
            'email'=> $request->input('email'),
            'password'=> Hash::make($request->input('password')) , 
            'role_id' => Role::roleSimple(),
        ]);

        $accessToken = $user->createToken('authToken')->accessToken ; 
        return response()->json(['message'=>'created','access_token' => $accessToken]) ;
    }



    public function myproduct()
    {
        $myproducts =  Product::all() ; 
            
        return response()->json(['myproducts'=>$myproducts]) ; 

    }





}
