<?php

namespace App\Http\Controllers;

use App\classes\Currencies;
use App\Http\Requests\RegisterRequest;
use App\models\Bank;
use App\models\Certificate;
use App\models\Contract;
use App\models\Egg;
use App\models\Seller;
use App\models\Shovel;
use App\models\Sold_bird;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\User;
use phpDocumentor\Reflection\Types\Boolean;
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
            'name'     => 'required|string|between:2,100|alpha_dash',
            'email'    => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6|alpha_dash',
        ];

        $validatorMessages = [
            'required'     => 'Поле :attribute обязательно для заполнения',
            'min'          => 'Минимальная длина поля :attribute :min',
            'name.between' => 'Ник должен быть минимум 2 символа',
            'confirmed'    => 'Пароли не совпадают',
            'alpha_dash'   => 'Недопустимые символы',
            'email.unique' => 'Этот email уже зарегистрирован',
            'password'     => 'Некорректный пароль'
        ];

        $validator = Validator::make($request->all(), $rules, $validatorMessages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 401);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' => 'Пользователь успешно зарегистрирован',
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
        // set notified = 0
        auth()->user()->update(['notified' => 0]);

        return response()->json(auth()->user()->load(['my_sellers:id', 'my_shovels', 'my_contracts:id']));
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
        $string_id = $pivotRow->bird->string_id; // get string id of bird
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

        // --- check bird string_id and change other_data --- //
        // get other_data
        $other_data = json_decode(auth()->user()->other_data) ?? new \stdClass();

        if ($string_id === 'angel') {
            $other_data->final         = true; // user
            auth()->user()->other_data = json_encode($other_data);
            auth()->user()->update();
        }

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
                    auth()->user()->my_eggs()->where('id', '=', auth()->user()->id . $bird->pivot->bird_seller_id)->delete();

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

    public function clean(Request $request)
    {
        $egg = Egg::find($request->id); // get egg row

        // get shovel effectivity to clean litter
        $shovel = auth()->user()->my_shovels()->where('isActive', '=', 1)->first();
        if (!$shovel) return false;
        $shovelEfficiency = $shovel->efficiency;

        // decrease litter count by efficiency or litter count
        $litter_1    = $egg->litter;
        $egg->litter -= $egg->litter > $shovelEfficiency ? $shovelEfficiency : $egg->litter;
        $egg->update();

        // apply user's contract for litter sale
        $maxEarnings = auth()->user()->my_contracts()->where('script_name', '=', 'litter_sale')
            ->max('payload');
        if ($maxEarnings) {
            // get litter difference and increase user money
            auth()->user()->money += ($litter_1 - $egg->litter) / 100 * (float)$maxEarnings;
            auth()->user()->update();
        }

        return $egg->litter;
    }

    public function openSeller(Request $request)
    {
        $user   = auth()->user();
        $seller = Seller::find($request->id);

        if ($user->money >= $seller->price) {
            auth()->user()->money -= $seller->price; // decrease user money
            auth()->user()->update(); // update balance
            $user->my_sellers()->attach($seller->id); // set seller available
            return auth()->user()->money;
        } else return false;
    }

    public function cares(Request $request): bool
    {
        $eggRow = auth()->user()->my_eggs()->where('id', '=', auth()->user()->id . $request->id);
        // no such bird
        if (!count($eggRow->get())) return false;

        $eggRow->update(["cared" => 1]);
        return true;
    }

    public function buyShovel(Request $request)
    {
        $shovel = Shovel::find($request->id); // get shovel data by id
        if (auth()->user()->my_shovels->contains($request->id)) return false; // shovel is already exists

        $payment = null; // create new payment

        // buy for GTN (donate currency)
        if ($shovel->donate_price)
            $payment = auth()->user()->payment('GTN', $shovel->donate_price);
        // buy for RUB (money)
        else
            $payment = auth()->user()->payment('money', $shovel->price);

        if ($payment) {
            auth()->user()->my_shovels()->attach($shovel->id); // attach shovel
            return auth()->user()->money; // return new money value
        } else return false;
    }

    public function selectShovel(Request $request)
    {
        $shovels = auth()->user()->my_shovels; // get all user's shovels

        // user doesn't have this shovel
        if (!$shovels->contains($request->id)) return false;

        // iterate all user's shovels
        foreach ($shovels as $key => $item) {
            $item->pivot->update(['isActive' => $item->id == $request->id ? 1 : 0]);
        }

        return true;
    }

    // pay off fines
    public function payOffFines()
    {
        $eggs    = auth()->user()->my_eggs;
        $fines   = 0;
        $balance = auth()->user()->money;

        foreach ($eggs as $egg) {
            if (auth()->user()->money >= $egg->fine) { // enough money
                $balance   = auth()->user()->money -= $egg->fine; // decrease user money
                $egg->fine = 0;
            } else { // decrease part of fine
                $egg->fine            -= auth()->user()->money;
                auth()->user()->money = 0;
                $fines                += $egg->fine;
            }

            // update all
            $egg->update();
            auth()->user()->update();
        }

        return response()->json([
            "money" => auth()->user()->money,
            "fines" => $fines
        ]);
    }

    public function buyCertificate(Request $request)
    {
        $user        = auth()->user(); // get user
        $certificate = Certificate::find($request->certificate_id); // get certificate by id
        $my_birds    = $user->my_birds; // get list of user's birds

        // search needed bird
        foreach ($my_birds as $my_bird) {
            if ($my_bird->pivot->id === $request->id) {
                // no money
                if ($user->money < $certificate->price) return false; // not enough money

                // decrease user money
                $user->money -= $certificate->price;
                $user->update();

                // add certificate to bird
                $my_bird->pivot->certificate_id = $request->certificate_id;
                $my_bird->pivot->update();
            }
        }

        return auth()->user()->money;
    }

    /**
     * add new contract to user for some money
     */
    public function buyContract(Request $request)
    {
        $user     = auth()->user(); // get user
        $contract = Contract::find($request->id); // get contract by id

        // check is contract already exists
        if ($user->my_contracts->contains($request->id)) return false;

        $payment = null; // create new payment

        // pay and get is-success
        if ($contract->isDonate) $payment = $user->payment('GTN', $contract->price);
        else $payment = $user->payment('money', $contract->price);

        // if successfully payment
        if ($payment) {
            $user->my_contracts()->attach($contract->id); // attach contract
            $user->update(); // update balance
        } else return false;

        return auth()->user()->money;
    }

    /** collect all eggs, delete fines for GTN
     * @return bool - is success
     */
    public function brigadeHire(): bool
    {
        $user     = auth()->user();
        $earnings = 0;

        // pay brigade service
        $payment = $user->payment('GTN', 20);

        // check is payment success
        if ($payment) {
            // count earnings from selling eggs
            foreach ($user->my_eggs as $egg) {
                $earnings += $egg->count * $egg->price;
            }

            $user->my_eggs()->delete(); // delete all eggs, litter, fines
            $user->money += $earnings; // increase user money
            $user->update(); // update all

            return true; // success
        } else return false; // no enough money
    }

    public function mine(Request $request)
    {
        // update user balance from earnings from front
        $user        = auth()->user();
        $user->money += $request->earnings;
        $user->update();

        return auth()->user()->money; // return new balance
    }

    public function transaction(Request $request)
    {
        // get transaction type
        $type = $request->type;
        // count of user money for transaction
        $amount = $request->amount;
        // type == buy ? currency to buy (1 USD) : currency to sell (1 USD)
        $currency = $request->currency != 'RUB' ? $request->currency : 'money';
        // type == buy ? currency to sell (73.5 RUB) : currency to get (73.5 RUB)
        $exchange = $request->exchange != 'RUB' ? $request->exchange : 'money';
        // get last rate of buy currency
        $rate = Bank::where('currency', '=', $request->currency)->latest('created_at')->first()->rate;

        // При покупке валюты
        //      $exchange - валюта, которую мы продаем взамен на $currency
        //            |
        //      $currency - валюта, которую м хотим купить

        // При продаже валюты наоборот:
        //      $currency - валюта, которую м хотим продать
        //            ^
        //      $exchange - валюта, которую мы получим при продаже

        $user = auth()->user();

        // check type of transaction
        if ($type == 'buy') {
            // check if the user has enough currency
            if ($user[$exchange] >= $amount) {
                /* ---- enough ----*/

                // get count of currency for user amount
                $currencyCount = Currencies::transaction(
                    $type,
                    $request->amount,
                    $request->currency,
                    $request->exchange,
                    $rate
                );

                $user[$exchange] = $user[$exchange] - $amount;
                $user[$currency] = $user[$currency] + $currencyCount;
                $user->update();

                return $user[$currency];
            } else {
                return false; // not enough
            }
        } else if ($type == 'sell') {
            // check if the user has enough currency
            if ($user[$currency] >= $amount) {
                /* ---- enough ----*/

                // get count of currency for user amount
                $currencyCount = Currencies::transaction(
                    $type,
                    $request->amount,
                    $request->currency,
                    $request->exchange,
                    $rate
                );

                // $currency - валюта, которую мы хотим продать
                // $exchange - валюта, которую хотим получить

                $user[$currency] = $user[$currency] - $amount;
                $user[$exchange] = $user[$exchange] + $currencyCount;

                return $user->update();
            } else {
                return false; // not enough
            }
        }
    }

    public function change_money(Request $request)
    {
        $user = auth()->user(); // get user

        // user is admin
        if ($user->role == 1) {
            // change balance
            $user->update(['money' => $request->money]);
            return response()->json([
                'success' => true,
                'message' => $request->money
            ], 200);
        } else return response()->json([
            'success' => false,
            'message' => 'YoU aRe noT Am@in#12$32&^!@'
        ], 200); // user is not admin
    }

    public function reduce_bribe(Request $request)
    {
        $user = auth()->user(); // get user
        $money = $user->money;
        $bribe = $user->bribe;
        $other_data = $user->other_data;

        if($money == 0) return false; // no money, end it
        else {
            $bribe_rest = $bribe - $money; // decrease bribe

            $bribeEnd = $bribe_rest >= 0 ? $bribe_rest : 0; // bribe is 0 minimum
            $rest_money = $bribe_rest >= 0 ? 0 : -$bribe_rest; // check rest of money

            // mark that the user has repaid the bribe
            if ($bribeEnd === 0) {
                $other = json_decode($other_data) ?? new \stdClass();
                $other->repaid = true; // set repaid true to
                $other_data = json_encode($other);
            }

            // update data in DB
            auth()->user()->update([
                'bribe' => $bribeEnd,
                'money' => $rest_money,
                'other_data' => $other_data
            ]);



            // return result
            return response()->json([
                'bribe' => $bribeEnd,
                'money' => $rest_money
            ]);
        }
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
