<?php

namespace App\Console\Commands;

use App\models\Egg;
use App\User;
use Illuminate\Console\Command;
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

//        Log::info(234);
    }
}
