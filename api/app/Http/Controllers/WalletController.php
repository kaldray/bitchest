<?php

namespace App\Http\Controllers;

use App\Http\Resources\WalletRessource;
use App\Models\Wallet;
use Exception;

class WalletController extends Controller
{
    public function __construct(protected Wallet $wallet)
    {
    }

    /**
     * @return WalletRessource|Exception
     */
    public function show()
    {
        try {
            return WalletRessource::make($this->wallet->getUserWallet());
        } catch (Exception $exception) {
            return $exception;
        }
    }
}
