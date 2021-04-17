<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Sold_bird extends Model
{
    protected $table = 'bird_seller'; // sold_bird is alias

    // return bird
    public function bird()
    {
        return $this->belongsTo(
            'App\models\Bird',
            'bird_id',
            'id'
        );
    }

    // return seller and certificate
    public function seller()
    {
        return $this->belongsTo(
            'App\models\Seller',
            'seller_id',
            'id'
        )->with('certificate');
    }
}
