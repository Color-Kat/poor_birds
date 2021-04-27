<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\models\Egg;
use App\models\Seller;
use App\models\Shovel;
use App\models\Sold_bird;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\User;
use Validator;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $rules = [
            'email'    => 'required|string|email|max:100',
            'password' => 'required|string|min:6',
        ];

        $validatorMessages = [
            'required'     => 'Поле :attribute обязательно для заполнения',
            'min'          => 'Минимальная длина поля :attribute :min',
            'password.min' => 'Минимальная длина поля пароль :min',
        ];

        $validator = Validator::make($request->all(), $rules, $validatorMessages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => ['Неверный логин или пароль']], 401);
        }

        return $this->createNewToken($token);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // it is not right! So mush code in one place!!!(((
        $rules = [
            'name'     => 'required|string|between:2,100',
            'email'    => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ];

        $validatorMessages = [
            'required'     => 'Поле :attribute обязательно для заполнения',
            'min'          => 'Минимальная длина поля :attribute :min',
            'name.between' => 'Ник должен быть минимум 2 символа',
            'confirmed'    => 'Пароли не совпадают',
            'email.unique' => 'Этот email уже зарегестирован'
        ];

        $validator = Validator::make($request->all(), $rules, $validatorMessages);
//        $validator = $this->validate($request, $rules, $validatorMessages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 401);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

//        $user->my_sellers()->attach(1); // attach bazaar to available sellers

        return response()->json([
            'message' => 'Пользователь успешно зарегестрирован',
            'user'    => $user
        ], 201);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Пользователь успешно вышел из учетной записи']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user()
    {
        return response()->json(auth()->user()->load(['my_sellers:id', 'my_shovels']));
    }

    public function get_user_birds()
    {
        return response()->json(auth()->user()->my_birds);
    }

    public function get_my_birds_with_certificate()
    {
        return response()->json(User::get_my_birds_with_certificate(auth()->user()->my_birds));
    }

    public function get_my_eggs()
    {
        return response()->json(auth()->user()->my_eggs);
    }

    public function buyBird(Request $request)
    {
        $my_birds = auth()->user()->my_birds()->get();
        $pivotRow = Sold_bird::find($request->bird_seller_id);

        $price     = round($pivotRow->bird->price * (1 + $pivotRow->seller->discount / 100));
        $userMoney = auth()->user()->money;

        if ($price > $userMoney) return false; // not enough money

        auth()->user()->money -= $price; // decrease user money
        auth()->user()->update(); // update

        foreach ($my_birds as $key => $bird) {
            // this bird has already been purchased
            if ($my_birds[$key]->pivot->bird_seller_id === $request->bird_seller_id) {
                // increase count
                $bird->pivot->count++;
                $bird->pivot->update();
                return auth()->user()->money;
            }
        }

        // bird has not been purchased yet
        auth()->user()->my_birds()->attach($request->bird_seller_id);
        return auth()->user()->money;
    }

    public function sellBird(Request $request)
    {
        $my_birds = auth()->user()->my_birds;

        // looking for bird_seller_user_id
        foreach ($my_birds as $key => $bird) {
            if ($my_birds[$key]->pivot->id === $request->bird_seller_user_id) {
                // get bird price
                $bird_price = round($my_birds[$key]->bird->price * (1 + $my_birds[$key]->seller->discount / 100));

                // reduce user money
                auth()->user()->money += $bird_price / 2;
                auth()->user()->update(); // update

                if ($bird->pivot->count > 1) {
                    // user has several birds
                    // reduce count
                    $bird->pivot->count--;
                    $bird->pivot->update();
                    return auth()->user()->money;
                } else {
                    // user has only one bird
                    // delete it
                    auth()->user()->my_birds()->wherePivot('id', '=', $request->bird_seller_user_id)->detach();
                    // delete eggs and litter of bird
                    auth()->user()->my_eggs()->delete(auth()->user()->id . $bird->pivot->bird_seller_id);

                    return auth()->user()->money;
                }
            }
        }
        return false;
    }

    public function sellEggs(Request $request)
    {
        $eggs = auth()->user()->my_eggs()->where('id', $request->id)->first();

        // eggs is already collected
        if ($eggs->collected || !$eggs) {
            return response()->json([
                "message" => 'Яйца уже собраны!',
                "result"  => false
            ]);
        }

        // get number of available eggs (demand or less)
        $availableEggs   = $eggs->count > $eggs->demand ? $eggs->demand : $eggs->count;
        $eggs->count     -= $availableEggs; // decrease eggs count
        $eggs->collected = true; // eggs is collected
        $profit          = $availableEggs * $eggs->price; // get profit

        $eggs->update();
        auth()->user()->money += $profit;
        auth()->user()->update();

        return response()->json([
            "message" => '',
            "result"  => [
                'eggs_count' => $eggs->count,
                'balance'    => auth()->user()->money,
            ]
        ]);
    }

    public function clean(Request $request) {
        $egg = Egg::find($request->id); // get egg row

        // get shovel effectivity to clean litter
        $shovel = auth()->user()->my_shovels()->where('isActive', '=', 1)->first();
        if (!$shovel) return false;

        $shovelEfficiency = $shovel->efficiency;

        $egg->litter -= $egg->litter > $shovelEfficiency ? $shovelEfficiency: $egg->litter;
        $egg->update();

        return $egg->litter;
    }

    public function openSeller(Request $request) {
        $user = auth()->user();
        $seller = Seller::find($request->id);

        if ($user->money >= $seller->price) {
            auth()->user()->money -= $seller->price; // decrease user money
            auth()->user()->update(); // update balance
            $user->my_sellers()->attach($seller->id); // set seller available
            return auth()->user()->money ;
        } else return false;


    }

    public function cares(Request $request) {
        $eggRow = auth()->user()->my_eggs()->where('id', '=', auth()->user()->id . $request->id);
        $eggRow->update(["cared"=> 1]);

        return true;
    }

    public function buyShovel(Request $request)
    {
        $shovel = Shovel::find($request->id);
        if ($shovel->price > auth()->user()->money ) return false; // not enough money
        if(auth()->user()->my_shovels->contains($request->id)) return false; // shovel is already exists

        auth()->user()->money -= $shovel->price; // decrease user money
        auth()->user()->update(); // update
        auth()->user()->my_shovels()->attach($shovel->id); // attach shovel

        return auth()->user()->money;
    }

    public function selectShovel(Request $request)
    {
        $shovels = auth()->user()->my_shovels; // get all shovels
        foreach ($shovels as $key=>$item) {
            $item->pivot->update(['isActive' => $item->id == $request->id ? 1 : 0]);
        }

        return true;
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60,
            'user'         => auth()->user()
        ], 201);
    }

    public function checkAuth()
    {
        return auth()->check();
    }
}
