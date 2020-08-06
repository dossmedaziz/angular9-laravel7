<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
  protected $fillable = [
    'name', 'subtitle', 'description','price','qte','confirmed','picture','user_id',
    'category_id'
    ] ; 




                public function user ()
                {
                return $this->belongsTo('App\User') ;
                }



                public function category()
                {
                return $this->belongsTo('App\Category') ;
                }
}
