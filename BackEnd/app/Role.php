<?php

namespace App;
use App\User ; 
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
   protected $table = 'roles' ;
   protected $fillable = [
       'name',
   ];
   
 
   public function users()
   {
    return $this->hasMany(User::class) ;
   }
   public static function roleSimple (){
       $role = Role::query()->where('name' , '=', 'Normal User')->pluck('id')->first();
       return $role;
   }
}
