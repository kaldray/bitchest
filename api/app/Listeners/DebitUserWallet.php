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
    public function __construct(
        protected CurrencyHistory $currencyHistory,
        protected Wallet $wallet,
    ) {
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
        $userWallet = $this->wallet->getUserWallet();
        $debit = $quoting->quoting * $event->cryptoWallet->quantity;
        $userWallet->quantity = $userWallet->quantity - $debit;
        $userWallet->save();
    }
}
