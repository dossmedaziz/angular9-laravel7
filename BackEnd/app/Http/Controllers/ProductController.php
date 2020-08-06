<?php

namespace App\Http\Controllers;

use App\User;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator ;
use App\Http\Resources\ProductResource;


class ProductController extends Controller
{
    



    //  Methods for API 

            public function admin()
            {
                    $products = Product::SELECT('*')->OrderBy('confirmed')->get() ;
                                
                return response($products);
            }

    public function index()
    { 
 
    $products = Product::SELECT("*")->WHERE('confirmed',1)->get() ; 
                 //  Affichage
      return  ProductResource::collection($products)  ; 
    }

    public function showByID($id)
    {    
       
          $products = Product::SELECT('*')->WHERE([['confirmed',1],['id',$id]])->first() ; 

   if(is_null($products))
      {
          return response()->json(["message"=>"Not found"],404);
      }
        return response()->json($products,200);
    }


         // Add new product  

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|min:4',
            'subtitle' => 'required',
            'description' => 'required',
            'price' => 'required',
            'qte' => 'required',
           'category_id' => 'required',
            'picture' => 'required',
        ];
         
        $validator = Validator::make($request->all(),$rules) ;
        if($validator->fails())
        { 
            $errors = $validator->errors() ; 
            return response()->json($errors,400) ;
        }
                    $product=Product::create($request->all());
                   
                    
                    $product->save() ;
                   
                    return response()->json('added!') ;
    }

        // Edit product



        public function update(Request $request, $id)
        {
            //
         
            $product = Product::find($id) ; 
            if(is_null($product))
        {
            return response()->json(["message"=>"Not found"],404);
        }
            $product->update($request->all());
            return response()->json('updated') ;
        }




        // delete product 
        
        public function destroy(Request $request,  $id)
        {
           
                $product = Product::find($id) ; 
                $user_id = $product->user_id ;
               

                if(is_null($product) || ($user_id != Auth::user()->id))
            {
                return response()->json(["message"=>"Not Found"],404);
            }

            
                $product->delete();
                return response()->json(['message'=>'Deleted']) ;
        }
    
            // search for product 


        public function search(Request $request)
            {
                  
                $rules = [
                    'name' => 'required',
                ];
        $validator = Validator::make($request->all(),$rules) ;
           if($validator->fails())
                { 
                    $errors = $validator->errors() ; 
                    return response()->json(["errors"=>$errors,"error"=>"1"]) ;
                }

                $products = DB::select('SELECT *FROM products  where confirmed = 1  AND name LIKE "'.$request->name.'%"');
               
                            if($products == [])
                            {
                                return response()->json(["message"=>"Not found","found"=>"0","error"=>"0"]   );
                            }
    
                               return response()->json(["result"=>ProductResource::collection($products),"found"=>"1","error"=>"0"],200);  

        }
        public function confirmProduct(Request $request ,$id)
        {
                $product = Product::find($id) ;
            
                $product->update([
                    'confirmed' => '1',
                ]);
                return response()->json(['message'=>'Confirmed']) ;
       
            }

            public function moreInfo($id)
            {
                $product = Product::find($id) ;
                return response()->json($product);
            }



            
            public function myProducts()
            {
                        $id = Auth::user()->id ; 
                        $myproducts = Product::SELECT('*')->WHERE('user_id',$id)->get() ; 

                           return ProductResource::collection($myproducts) ; 
            }
}
