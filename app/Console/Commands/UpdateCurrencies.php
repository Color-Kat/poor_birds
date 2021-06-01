<?php

namespace App\Console\Commands;

use App\classes\Currencies;
use App\models\Bank;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class UpdateCurrencies extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:currency';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add article with new rate';

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
//        $weekData = Bank::where('created_at', '>=', now()->subDays(1)->startOfDay())->get();
        // get all currencies
        $currs = Currencies::getCurrencies();

        // iterate it
        foreach ($currs as $curr) {
            Bank::create($curr); // add record in DB
        }

        // delete old records
        $date  = Carbon::now()->subHours( 24 );
        Bank::where( 'created_at', '<=', $date )->delete();
    }
}
