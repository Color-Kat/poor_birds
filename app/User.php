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

    public function my_birds() {
        // sold_bird is alias. Real table is bird_seller
//        return $this->belongsToMany('App\models\Sold_bird', 'bird_seller_user', 'user_id', 'bird_seller_id')

        return $this->belongsToMany(
            'App\models\Sold_bird',
            'bird_seller_user',
            'user_id',
            'bird_seller_id')
            ->with('bird')
            ->with('seller');
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
