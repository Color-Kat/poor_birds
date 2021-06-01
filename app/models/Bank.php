<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    protected $fillable = ['currency', 'rate', 'exchange'];
    protected $table = 'currencies';
}
