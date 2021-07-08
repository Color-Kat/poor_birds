<?php

namespace App\Console\Commands;

use App\User;
use Illuminate\Console\Command;

class SellEggsContract extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contracts:sellEggs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sell all eggs every hour to users who bought contract';

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
        // get users who have a contract
        $users = User::whereHas('my_contracts', function ($query) {
            return $query->where('script_name', '=', 'sell_eggs');
        })->get();

        foreach ($users as $user) {
            $eggs = $user->my_eggs()->get();

            foreach ($eggs as $egg) {
                // eggs is already collected
                if ($egg->collected || !$egg) {
                    continue;
                }

                // get number of available eggs (demand or less)
                $availableEggs   = $egg->count > $egg->demand ? $egg->demand : $egg->count;
                $egg->count     -= $availableEggs; // decrease eggs count
                $egg->collected  = true; // eggs is collected
                $profit          = $availableEggs * $egg->price; // get profit

                $egg->update();
                $user->money += $profit;
                $user->update();
            }
        }
    }
}
