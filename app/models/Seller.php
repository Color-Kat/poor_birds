<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    protected $fillable = ['name', 'image', 'description', 'certificate_id', 'demand', 'discount', 'price'];

    public function birds()
    {
        return $this->belongsToMany('App\models\Bird')->withPivot('id');
    }

    public function certificate() {
        return $this->belongsTo('App\models\Certificate');
    }
}
