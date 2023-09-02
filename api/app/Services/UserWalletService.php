<?php

namespace App\Services;

use App\Models\User;
use App\Models\Wallet;

class UserWalletService
{
    public function __construct(protected Wallet $wallet)
    {
    }

    public function createUserWallet(User $user)
    {
        $user->wallet()->create(["quantity" => 500]);
    }
}
