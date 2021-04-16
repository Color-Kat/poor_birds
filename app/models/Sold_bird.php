<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Sold_bird extends Pivot
{
    protected $table = 'bird_seller'; // sold_bird is alias

    public function birds() {
//        dd($this->with('birds'));
//        return $this->pivot;
    }
}
