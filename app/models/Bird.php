<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Bird extends Model
{
    protected $fillable = ['name', 'price', 'fertility', 'litter', 'demand', 'care', 'description', 'image'];
}
