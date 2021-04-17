<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = ['name', 'price', 'price_bonus', 'fertility_bonus', 'litter_bonus', 'demand_bonus', 'care_bonus', 'grade'];

//    public function sellers() {
//        return $this->hasMany('App\models\Seller', 'id', 'seller_id');
//    }
}
