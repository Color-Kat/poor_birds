<?php

namespace App\Console\Commands;

use App\models\Egg;
use App\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CollectEggs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'collect:eggs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Every hour counts the number of eggs in users';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Яйца и их пользователей
        // SELECT * FROM eggs JOIN users ON( users.id = eggs.user_id)

        // Получаем яйца, их пользователей, птицу, которая снесла яйцо и ее сертификат
        // SELECT * FROM eggs -- select eggs data
        // JOIN users AS u ON( u.id = eggs.user_id) -- join users table
        // JOIN bird_seller AS b_s ON (b_s.id = eggs.bird_seller_id) -- join bird_seller table
        // JOIN birds ON (b_s.bird_id = birds.id) -- join birds table
        // LEFT JOIN certificates AS certs ON ((SELECT certificate_id FROM sellers WHERE id = b_s.seller_id) = certs.id)
        // -- join certificate of seller by seller_id

        // Получает все, что написано выше и считает count
        // UPDATE eggs AS e -- select eggs data
        // JOIN users AS u ON( u.id = e.user_id) -- join users table
        // JOIN bird_seller AS b_s ON (b_s.id = e.bird_seller_id) -- join bird_seller table
        // JOIN birds ON (b_s.bird_id = birds.id) -- join birds table
        // LEFT JOIN certificates AS certs ON ((SELECT certificate_id FROM sellers WHERE id = b_s.seller_id) = certs.id)
        // -- fill eggs fields
        // SET
        // e.count = (birds.fertility * (1 + IFNULL(certs.fertility_bonus, 0) / 100))

//        DB::select("UPDATE eggs AS e -- select eggs data
//JOIN users AS u ON( u.id = e.user_id) -- join users table
//JOIN bird_seller AS b_s ON (b_s.id = e.bird_seller_id) -- join bird_seller table
//
//LEFT JOIN bird_seller_user AS b_s_u ON (b_s_u.bird_seller_id = b_s.id AND (b_s_u.user_id = u.id)) -- join bird_seller_user table
//
//
//JOIN birds ON (b_s.bird_id = birds.id) -- join birds table
//LEFT JOIN certificates AS certs ON ((SELECT certificate_id FROM sellers WHERE id = b_s.seller_id) = certs.id)
//-- fill eggs fields
//SET
//e.count = e.count + (birds.fertility * (1 + IFNULL(certs.fertility_bonus, 0) / 100)),
//e.price = (birds.egg_price * (1 + IFNULL(certs.price_bonus, 0) / 100)),
//e.demand = birds.demand,
//e.name = birds.name,
//e.birds_count = b_s_u.count,
//e.collected = 0");


//        $birds_users = User::get_all_users_birds_with_certificate();
//
//        foreach ($birds_users as $key => $birds_user) {
//            // get user by key (key is user id)
//            $user = User::with('my_eggs')->find($key);
//
//            // iterate all user birds
//            foreach ($birds_user[0] as $bird) {
//                // and add eggs in table
//                if (
//                    $user->my_eggs->contains('user_id', '===', $key) &&
//                    $user->my_eggs->contains('bird_seller_id', '===', $bird["bird_seller_id"])
//                ) {
//                    $birdRow = Egg::where('user_id', $key)->where('bird_seller_id', $bird["bird_seller_id"])->first();
//                    // TODO добавить колонку manipulated, чтобы можно было понять, что пользователь продавал яйца в
//                    // этом часу
//                    $birdRow->demand = $bird["demand"]; // if the characteristics of the bird will change
//                    $birdRow->count  += $bird["count"] * $bird["fertility"]; // increase eggs
//                    $birdRow->birds_count = $bird["count"];
//                    $birdRow->collected = false;
//                    $birdRow->update();
//                } else {
//                    // new kind of eggs, need to create it
//                    Egg::create([
//                        'user_id'        => $key,
//                        'bird_seller_id' => $bird["bird_seller_id"],
//                        'name'           => $bird["name"],
//                        'birds_count'    => $bird["count"],
//                        'collected'      => false,
//                        'price'          => $bird["egg_price"],
//                        'demand'         => $bird["demand"],
//                        'count'          => $bird["count"] * $bird["fertility"],
//                    ]);
//                }
//            }
//        }

        Log::info('work?');
    }
}
