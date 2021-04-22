<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Egg extends Model
{
    protected $fillable = ['name','birds_count', 'user_id', 'bird_seller_id', 'price', 'count', 'demand'];
}
