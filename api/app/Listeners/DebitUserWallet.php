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
    public function __construct(protected CurrencyHistory $currencyHistory)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CryptoPurchase $event): void
    {
        $quoting = $this->currencyHistory->getQuotingAtCurrentDate(
            $event->cryptoWallet->currency_id,
        );
        $userWallet = Wallet::where("user_id", "=", $event->cryptoWallet->user_id)->first();
        $debit = $quoting->quoting * $event->cryptoWallet->quantity;
        $userWallet->quantity = $userWallet->quantity - $debit;
        $userWallet->save();
    }
}
