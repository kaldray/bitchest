<?php

namespace App\Services;

use App\Http\Requests\StoreCryptoWalletRequest;
use App\Models\CryptoWallet;

class CryptoWalletServices
{
    public function __construct(protected CryptoWallet $cryptoWallet)
    {
    }

    public function purchaseCurrency(StoreCryptoWalletRequest $request)
    {
        return $this->cryptoWallet::create($request->validated());
    }
}
