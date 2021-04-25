<?php

namespace App;

use App\models\Bird;
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
//                dump($seller);
                // TODO получать сертификат
            }]);
    }

    public static function get_my_birds_with_certificate($my_birds)
    {
        $my_bird_with_certificate = [];

        foreach ($my_birds as $key => $my_bird ) {
            $bird        = $my_bird->bird;
            $certificate = $my_bird->seller->certificate;
            $my_bird_with_certificate[$key] = Bird::apply_certificate_to_bird($bird, $certificate);
            $my_bird_with_certificate[$key]["id"] = $my_bird->id;
            $my_bird_with_certificate[$key]["bird_seller_user_id"] = $my_bird->pivot->id;
            $my_bird_with_certificate[$key]["bird_seller_id"] = $my_bird->pivot->bird_seller_id;
            $my_bird_with_certificate[$key]["count"] = $my_bird->pivot->count;
        }

        return $my_bird_with_certificate;
    }

    public static function get_all_users_birds_with_certificate() {
        $birds = [];

        foreach (User::with('my_birds')->get() as $user) {
//            $birds[] = self::get_my_birds_with_certificate($user->my_birds()->with(['sellers'])->get());
            $birds[$user->id][] = self::get_my_birds_with_certificate($user->my_birds()->get());
        }

        return $birds;
    }

    public function my_eggs()
    {
        return $this->hasMany('App\models\Egg');
    }

    public function my_sellers() {
        return $this->belongsToMany('App\models\Seller');
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
