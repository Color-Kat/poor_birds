<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Egg extends Model
{
    protected $fillable = ['user_id', 'bird_seller_id', 'price', 'count', 'demand'];
}
