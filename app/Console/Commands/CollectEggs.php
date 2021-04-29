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
        // counting eggs and litter for all users
        DB::select("
              INSERT INTO eggs (id, name, birds_count, price, demand, count, litter, collected, cared, fine, user_id, bird_seller_id)

            SELECT
                CONCAT(u.id, b_s.id), -- create UID from user_id and bird_seller_id
                birds.name, -- bird name
                count, -- count of birds from bird_seller_user table
                birds.egg_price * (1 + COALESCE(price_bonus, 0) / 100), -- egg price with certificate
                birds.demand * (1 + COALESCE(demand_bonus, 0) / 100), -- demand with certificate bonus
                count * birds.fertility * (1 + COALESCE(fertility_bonus, 0) / 100), -- get count of eggs from birds_count * fertility with certificate bonus
                count * birds.litter * (1 + COALESCE(litter_bonus, 0) / 100),
                0, -- change collected
                0, -- remove care bonus
               CASE
                    WHEN grade IS NULL THEN 5 -- no certificate. Fine is 5
                    WHEN grade = 0 THEN 3 -- grade 0 - fake certificate. Fine is 3
                    WHEN grade = 1 THEN 1 -- grade 1 - certificate with a typo. Fine is 1
                    ELSE 0
                END,
                user_id,
                bird_seller_id

            FROM users AS u -- get all users

            LEFT JOIN bird_seller_user AS b_s_u ON (b_s_u.user_id = u.id) -- join bird_seller_user table to get sold_bird

            JOIN bird_seller AS b_s ON (b_s.id = b_s_u.bird_seller_id) -- join bird_seller table (this id sol_bird)

            JOIN birds ON (b_s.bird_id = birds.id) -- join birds table

            LEFT JOIN certificates AS certs ON ((SELECT certificate_id FROM sellers WHERE id = b_s.seller_id) = certs.id) -- and join certificate table

            ON CONFLICT (id) DO UPDATE
                SET
                name = birds.name, -- update bird name (just in case)
                birds_count = b_s_u.count,
                price = birds.egg_price * (1 + COALESCE(price_bonus, 0) / 100),
                demand = birds.demand,
                count = eggs.count +
                    b_s_u.count * birds.fertility * (1 + COALESCE(fertility_bonus, 0) / 100) * -- count eggs with certificate bonus
                    IF ( (1 - (eggs.litter/20) / 100 ) < 0, 0, ( 1 - (eggs.litter/20) / 100 )) * -- litter deduction
                    IF (eggs.cared = 1, ( 1 + (birds.care / 100 * ( 1 + COALESCE(care_bonus, 0) / 100 ))), 1), -- care bonus
                litter = eggs.litter + b_s_u.count * birds.litter * (1 + COALESCE(litter_bonus, 0) / 100),
                collected = 0,
                cared = 0, -- remove care bonus
                fine = eggs.fine +    CASE
                    WHEN certs.grade IS NULL THEN 5 -- no certificate. Fine is 5
                    WHEN certs.grade = 0 THEN 3 -- grade 0 - fake certificate. Fine is 3
                    WHEN certs.grade = 1 THEN 1 -- grade 1 - certificate with a typo. Fine is 1
                    ELSE 0
                END
        ");

        Log::info('litter');


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
    }
}
