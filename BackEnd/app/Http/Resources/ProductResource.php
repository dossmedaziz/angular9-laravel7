<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [


            'id'=> $this->id,
            'name' => $this->name,
            'subtitle' => $this->subtitle,
            'description' => $this->description,
            'price' => $this->price,
            'confirmed' => $this->confirmed  ,
            'created_at' => $this->created_at
           
        ];
    }
}
