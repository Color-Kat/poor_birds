<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    protected $fillable = ['name', 'image', 'description', 'certificate_id', 'demand', 'discount', 'price'];

}
