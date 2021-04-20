<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    protected $fillable = ['name', 'image', 'description', 'certificate_id', 'demand', 'discount', 'price'];

    public function birds()
    {
        return $this->belongsToMany('App\models\Bird')->withPivot(['id']);
    }

    public function certificate()
    {
        return $this->belongsTo('App\models\Certificate');
    }
//
//    public static function get_seller_with_birds($seller)
//    {
//        $sellers_with_birds = [];
//
//        $bird        = $seller->bird;
//        $certificate = $seller->certificate;
//
//        // certificate bonuses
//        $fertility_bonus = $certificate ? 1 + $certificate->fertility_bonus / 100 : 1;
//        $demand_bonus    = $certificate ? 1 + $certificate->demand_bonus / 100 : 1;
//        $care_bonus      = $certificate ? 1 + $certificate->care_bonus / 100 : 1;
//        $litter_bonus    = $certificate ? 1 + $certificate->litter_bonus / 100 : 1;
//        $price_bonus     = $certificate ? 1 + $certificate->price_bonus / 100 : 1;

//        return [
//            "id"                  => $seller->id,
//            "image"               => $seller->image,
//            "name"                => $seller->name,
//            "description"         => $seller->description,
//            "price"               => $seller->price,
//            "discount"            => $seller->discount,
//
//            "certificate"          => $certificate,
//            "certificate_id"       => $certificate->id,
//
//            "fertility"           => round($bird->fertility * $fertility_bonus),
//            "demand"              => round($bird->demand * $demand_bonus),
//            "care"                => round($bird->care * $care_bonus),
//            "litter"              => round($bird->litter * $litter_bonus),
//            "egg_price"           => round($bird->egg_price * $price_bonus),
//            "count"               => $my_bird->pivot->count,
//            "certificate_id"      => $certificate ? $certificate->id : 0,
//            "bird_seller_user_id" => $my_bird->pivot->id,
//            "pivot"               => $my_bird->pivot
//        ];


//    }
}
