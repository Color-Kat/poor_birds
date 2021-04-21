<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Bird extends Model
{
    protected $fillable = ['name', 'price', 'fertility', 'litter', 'demand', 'care', 'egg_price', 'description',
        'image'];

    public function sellers()
    {
        return $this->belongsToMany('App\models\Seller');
    }

//
    public static function apply_certificate_to_bird($bird, $certificate)
    {
        $bird_with_certificate = [];

        // certificate bonuses
        $fertility_bonus = $certificate ? 1 + $certificate->fertility_bonus / 100 : 1;
        $demand_bonus    = $certificate ? 1 + $certificate->demand_bonus / 100 : 1;
        $care_bonus      = $certificate ? 1 + $certificate->care_bonus / 100 : 1;
        $litter_bonus    = $certificate ? 1 + $certificate->litter_bonus / 100 : 1;
        $price_bonus     = $certificate ? 1 + $certificate->price_bonus / 100 : 1;

        return [
//                "id"                  => $sold_birds->id,
            "image"          => $bird->image,
            "name"           => $bird->name,
            "description"    => $bird->description,
            "price"          => $bird->price,
            "fertility"      => round($bird->fertility * $fertility_bonus),
            "demand"         => round($bird->demand * $demand_bonus),
            "care"           => round($bird->care * $care_bonus),
            "litter"         => round($bird->litter * $litter_bonus),
            "egg_price"      => round($bird->egg_price * $price_bonus),
            "certificate_id" => $certificate ? $certificate->id : 0,
            "pivot"          => $bird->pivot
        ];
    }
}
