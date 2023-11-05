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
        $history = $this->currencyHistory->getQuotingWithId(
            $event->cryptoWallet->currency_histories_id,
        );
        $userWallet = $this->wallet->getUserWallet();
        $debit = $history->quoting * $event->cryptoWallet->quantity;
        $userWallet->quantity = $userWallet->quantity - $debit;
        $userWallet->save();
    }
}
