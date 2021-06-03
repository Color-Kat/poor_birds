<?php

namespace App\Console\Commands;

use App\models\Egg;
use App\Notifications\PushEggs;
use App\Notifications\PushFines;
use App\Notifications\PushFinesBlock;
use App\Notifications\PushLitter;
use App\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Notification;

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
                birds.egg_price * (1 + IFNULL(price_bonus, 0) / 100), -- egg price with certificate
                birds.demand * (1 + IFNULL(demand_bonus, 0) / 100), -- demand with certificate bonus
                count * birds.fertility * (1 + IFNULL(fertility_bonus, 0) / 100), -- get count of eggs from birds_count * fertility with certificate bonus
                count * birds.litter * (1 + IFNULL(litter_bonus, 0) / 100), -- get litter with certificate bonus
                0, -- eggs are not collected
                IF(contracts.script_name = 'cares', 1, 0), -- remove care bonus or add it if user have contract
                CASE
                    WHEN grade IS NULL THEN 5 -- no certificate. Fine is 5
                    WHEN grade = 0 THEN 3 -- grade 0 - fake certificate. Fine is 3
                    WHEN grade = 1 THEN 1 -- grade 1 - certificate with a typo. Fine is 1
                    ELSE 0
                END,
                b_s_u.user_id,
                bird_seller_id

            FROM users AS u -- get all users

            LEFT JOIN bird_seller_user AS b_s_u ON (b_s_u.user_id = u.id) -- join bird_seller_user table to get sold_bird

            JOIN bird_seller AS b_s ON (b_s.id = b_s_u.bird_seller_id) -- join bird_seller table (this id sol_bird)

            JOIN birds ON (b_s.bird_id = birds.id) -- join birds table

            LEFT JOIN contract_user as c_u ON (c_u.user_id = u.id) -- join contract_user table to get user's contracts
           -- JOIN contracts ON (c_u.contract_id = u.id AND contracts.script_name = 'cares') -- join contracts table
            LEFT JOIN contracts ON (contracts.id = c_u.contract_id) -- join contracts table

            LEFT JOIN certificates AS certs ON (IFNULL( b_s_u.certificate_id, (SELECT certificate_id FROM sellers WHERE id = b_s.seller_id)) = certs.id) -- and join certificate table

            ON DUPLICATE KEY UPDATE
                name = birds.name, -- update bird name (just in case)
                birds_count = b_s_u.count, -- get birds count
                price = birds.egg_price * (1 + IFNULL(price_bonus, 0) / 100), -- get egg price
                demand = birds.demand * (1 + IFNULL(demand_bonus, 0) / 100), -- get bird demand
                count = eggs.count +
                    b_s_u.count * birds.fertility * (1 + IFNULL(fertility_bonus, 0) / 100) * -- count eggs with certificate bonus
                    IF ( (1 - (eggs.litter/20) / 100 ) < 0, 0, ( 1 - (eggs.litter/20) / 100 )) * -- litter deduction
                    IF (eggs.cared = 1, ( 1 + (birds.care / 100 * ( 1 + IFNULL(care_bonus, 0) / 100 ))), 1), -- care bonus
                litter = eggs.litter + b_s_u.count * birds.litter * (1 + IFNULL(litter_bonus, 0) / 100), -- get litter count + certificate litter_bonus
                collected = 0, -- eggs are not collected
                cared = IF(contracts.script_name = 'cares', 1, 0), -- remove care bonus or add it if user have contract
                fine = eggs.fine + b_s_u.count * CASE
                    WHEN certs.grade IS NULL THEN 5 -- no certificate. Fine is 5
                    WHEN certs.grade = 0 THEN 3.3 -- grade 0 - fake certificate. Fine is 4
                    WHEN certs.grade = 1 THEN 2.5 -- grade 1 - certificate with a typo. Fine is 1
                    WHEN certs.grade = 2 THEN 2 -- grade 1 - certificate with a typo. Fine is 1
                    WHEN certs.grade = 3 THEN 2 -- grade 1 - certificate with a typo. Fine is 1
                    WHEN certs.grade = 4 THEN 1.7 -- grade 1 - certificate with a typo. Fine is 1
                    WHEN certs.grade = 5 THEN 1.5 -- grade 1 - certificate with a typo. Fine is 1
                    WHEN certs.grade = 6 THEN 1.2 -- grade 1 - certificate with a typo. Fine is 1
                    WHEN certs.grade = 7 THEN 1 -- grade 1 - certificate with a typo. Fine is 1
                    WHEN certs.grade = 8 THEN 0.5 -- grade 1 - certificate with a typo. Fine is 1
                    WHEN certs.grade = 9 THEN 0.1 -- grade 1 - certificate with a typo. Fine is 1
                    ELSE 0
                END
        ");

        // iterate all users to send a notification to whoever needs it
        foreach (User::all() as $user) {
            if ($user->notified) continue; // skip notified users

            $fines = 0; // all fines
            $maxLitter = 0; // max litter of one bird
            $eggs = $user->my_eggs;

            // count fines and max litter
            foreach ($eggs as $eggRow) {
                // count fines
                $fines += $eggRow->fine;

                // get the maximum litter to find out how much fertility decreased
                if ($eggRow->litter > $maxLitter) $maxLitter = $eggRow->litter;
            }

            // fines notifications
            if($fines >= 300) {
                Notification::send($user, new PushFinesBlock);
            } else if ($fines >= 190) {
                Notification::send($user, new PushFines);
            }

            // litter notifications
            if ($maxLitter >= 999) {
                Notification::send($user, new PushLitter);
            }

            // user is notified
            $user->update(['notified' => 1]);
        }


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
