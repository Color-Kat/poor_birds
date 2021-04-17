<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Bird extends Model
{
    protected $fillable = ['name', 'price', 'fertility', 'litter', 'demand', 'care', 'egg_price', 'description',
'image'];

    public function sellers()
    {
        return $this->belongsToMany('App\models\Seller');
    }
}
