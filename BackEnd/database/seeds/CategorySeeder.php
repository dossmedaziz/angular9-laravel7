<?php

use Illuminate\Database\Seeder;
use App\Category; 
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i=1;$i<=3;$i++)
        {
        Category::create([
                      'name'=>'Category_'.$i,
                      'description'=>'Description'.$i
                      ]);
        }
    }
}
