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
//    public static function get_birds_with_certificates($birds)
//    {
//        $my_bird_with_certificate = [];
//
//        dump($birds);
//        return;
//        foreach ($birds as $bird) {
//            $bird        = $bird->bird;
//            $certificate = $bird->seller->certificate;
//
//            // certificate bonuses
//            $fertility_bonus = $certificate ? 1 + $certificate->fertility_bonus / 100 : 1;
//            $demand_bonus    = $certificate ? 1 + $certificate->demand_bonus / 100: 1;
//            $care_bonus      = $certificate ? 1 + $certificate->care_bonus / 100: 1;
//            $litter_bonus    = $certificate ? 1 + $certificate->litter_bonus / 100: 1;
//            $price_bonus     = $certificate ? 1 + $certificate->price_bonus / 100: 1;
//
//            $my_bird_with_certificate[] = [
//                "id"                  => $my_bird->id,
//                "image"               => $bird->image,
//                "name"                => $bird->name,
//                "description"         => $bird->description,
//                "price"               => $bird->price,
//                "fertility"           => round($bird->fertility * $fertility_bonus),
//                "demand"              => round($bird->demand * $demand_bonus),
//                "care"                => round($bird->care * $care_bonus),
//                "litter"              => round($bird->litter * $litter_bonus),
//                "egg_price"           => round($bird->egg_price * $price_bonus),
//                "count"               => $my_bird->pivot->count,
//                "certificate_id"      => $certificate ? $certificate->id : 0,
//                "bird_seller_user_id" => $my_bird->pivot->id,
//                "pivot"               => $my_bird->pivot
//            ];
//        }
//
//        return $my_bird_with_certificate;
//    }
}
