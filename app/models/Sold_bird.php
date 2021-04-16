<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Sold_bird extends Model
{
    protected $table = 'bird_seller'; // sold_bird is alias

    public function birds() {
//        dd($this->belongsToMany('App\models\Bird', 'bird_seller', 'bird_id')->all());
        return $this->belongsToMany('App\models\Bird', 'bird_seller', 'id', 'bird_id');
    }
}
