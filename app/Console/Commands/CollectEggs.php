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
//        Log::info(User::all());
        $birds_users = User::get_all_users_birds_with_certificate();

        foreach ($birds_users as $key => $birds_user) {
            $user = User::with('my_eggs')->find($key);

            dump('user '.$key, $birds_user);
            Egg::create([
                'user_id' => $key,
                'bird_seller_id' => 20,
                'price' => 100,
                'demand' => 2,
                'count' => 20,

            ]);
            dump('user '.$key, $birds_user);
        }

//        dump($birds_users);
//        User
//        Log::info($birds);
    }
}
