<?php

namespace App\Services;

use App\Models\CryptoWallet;
use App\Models\CurrencyHistory;

class CurrencyHistoryServices
{
    public function __construct(protected CurrencyHistory $currencyHistory)
    {
    }
}
