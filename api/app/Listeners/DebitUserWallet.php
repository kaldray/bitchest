<?php

namespace App\Listeners;

use App\Events\CryptoPurchase;
use App\Models\CurrencyHistory;
use App\Models\Wallet;

class DebitUserWallet
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
    public function handle(CryptoPurchase $event): void
    {
        $quoting = CurrencyHistory::whereDate("date", now())
            ->where("currency_id", "=", $event->cryptoWallet->currency_id)
            ->first(["quoting"]);
        $userWallet = Wallet::where("user_id", "=", $event->cryptoWallet->user_id)->first();
        $debit = $quoting->quoting * $event->cryptoWallet->quantity;
        $userWallet->quantity = $userWallet->quantity - $debit;
        $userWallet->save();
    }
}
