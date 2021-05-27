<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Bird extends Model
{
    protected $fillable = ['name', 'price', 'fertility', 'litter', 'demand', 'care', 'egg_price', 'description',
        'quest', 'image'];

    /**
     * Set relationships for sellers table
     */
    public function sellers()
    {
        return $this->belongsToMany('App\models\Seller');
    }

    /**
     * Apply certificate to birds and return bird with certificate bonuses
     * @param $bird - receive bird,
     * @param $certificate - receive the certificate to be applied to the bird
     * @return mixed - bird with certificate bonuses
     */
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
            "id"             => $bird->pivot ? $bird->pivot->id : null,
            "image"          => $bird->image,
            "name"           => $bird->name,
            "description"    => $bird->description,
            "quest"          => $bird->quest,
            "price"          => $bird->price,
            "fertility"      => round($bird->fertility * $fertility_bonus, 2),
            "demand"         => round($bird->demand * $demand_bonus),
            "care"           => round($bird->care * $care_bonus, 2),
            "litter"         => round($bird->litter * $litter_bonus),
            "egg_price"      => round($bird->egg_price * $price_bonus, 2),
            "certificate_id" => $certificate ? $certificate->id : 0,
            "pivot"          => $bird->pivot
        ];
    }
}
