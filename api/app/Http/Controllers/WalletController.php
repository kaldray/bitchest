<?php

namespace App\Http\Controllers;

use App\Http\Resources\WalletRessource;
use App\Models\Wallet;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function __construct(protected Wallet $wallet)
    {
    }

    public function show()
    {
        try {
            return WalletRessource::make($this->wallet->getUserWallet());
        } catch (\Exception $exception) {
            return $exception;
        }
    }
}
