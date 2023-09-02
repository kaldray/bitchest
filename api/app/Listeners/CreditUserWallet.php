<?php

namespace App\Listeners;

use App\Events\CryptoSale;
use App\Models\CryptoWallet;
use App\Models\CurrencyHistory;
use App\Models\Wallet;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreditUserWallet
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CryptoSale $event)
    {
        $benefices = $event->cryptoToDeleted->map(function ($item) use ($event) {
            return $item->quantity * $event->currencyHistory->quoting;
        });
        $userWallet = Wallet::where(
            "user_id",
            "=",
            $event->cryptoToDeleted->first()->user_id,
        )->first();
        $userWallet->quantity = $userWallet->quantity + $benefices->sum();
        $userWallet->save();
        return $benefices->toArray();
    }
}
