<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Shovel extends Model
{
    protected $fillable = ['name', 'efficiency', 'price', 'donate_price', 'image'];
}
