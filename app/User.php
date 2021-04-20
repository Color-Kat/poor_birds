<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    public function my_birds()
    {
        // sold_bird is alias. Real table is bird_seller
        return $this->belongsToMany(
            'App\models\Sold_bird',
            'bird_seller_user',
            'user_id',
            'bird_seller_id')
            ->withPivot(['count', 'id'])
            ->with('bird')
            ->with(['seller' => function ($query) {
                $query->select('id', 'certificate_id'); // return only certificate that seller give
            }]);
    }

    public static function get_my_birds_with_certificate($my_birds)
    {
        $my_bird_with_certificate = [];

        foreach ($my_birds as $my_bird) {
            $bird        = $my_bird->bird;
            $certificate = $my_bird->seller->certificate;

            // certificate bonuses
            $fertility_bonus = $certificate ? 1 + $certificate->fertility_bonus / 100 : 1;
            $demand_bonus    = $certificate ? 1 + $certificate->demand_bonus / 100: 1;
            $care_bonus      = $certificate ? 1 + $certificate->care_bonus / 100: 1;
            $litter_bonus    = $certificate ? 1 + $certificate->litter_bonus / 100: 1;
            $price_bonus     = $certificate ? 1 + $certificate->price_bonus / 100: 1;

            $my_bird_with_certificate[] = [
                "id"                  => $my_bird->id,
                "image"               => $bird->image,
                "name"                => $bird->name,
                "description"         => $bird->description,
                "price"               => $bird->price,
                "fertility"           => round($bird->fertility * $fertility_bonus),
                "demand"              => round($bird->demand * $demand_bonus),
                "care"                => round($bird->care * $care_bonus),
                "litter"              => round($bird->litter * $litter_bonus),
                "egg_price"           => round($bird->egg_price * $price_bonus),
                "count"               => $my_bird->pivot->count,
                "certificate_id"      => $certificate ? $certificate->id : 0,
                "bird_seller_user_id" => $my_bird->pivot->id,
                "pivot"               => $my_bird->pivot
            ];
        }

//        dump($this->my_birds[0]->bird);
        return $my_bird_with_certificate;
    }

    public function my_eggs()
    {
        return $this->belongsToMany('App\models\Egg');
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}



// ------------------------------------------

// OLD CODE OF LARAVEL AUTH
//
//namespace App;
//
//use Illuminate\Contracts\Auth\MustVerifyEmail;
//use Illuminate\Foundation\Auth\User as Authenticatable;
//use Illuminate\Notifications\Notifiable;
//
//class User extends Authenticatable
//{
//    use Notifiable;
//
//    /**
//     * The attributes that are mass assignable.
//     *
//     * @var array
//     */
//    protected $fillable = [
//        'name', 'email', 'password',
//    ];
//
//    /**
//     * The attributes that should be hidden for arrays.
//     *
//     * @var array
//     */
//    protected $hidden = [
//        'password', 'remember_token',
//    ];
//
//    /**
//     * The attributes that should be cast to native types.
//     *
//     * @var array
//     */
//    protected $casts = [
//        'email_verified_at' => 'datetime',
//    ];
//}
