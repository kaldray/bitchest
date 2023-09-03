<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Currency;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClientController extends Controller
{
    public function __construct(protected User $user)
    {
    }

    /**
     * Display user's wallets with aggregate quantity for each currency
     */
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection|\Exception
    {
        try {
            return UserResource::collection($this->user->getUserCryptoWalletListWithTrashed());
        } catch (\Exception $exception) {
            return $exception;
        }
    }

    /***
     * Display user's wallet with data for one currency only
     * @param Currency $currency
     * @return \Exception|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function show(
        Currency $currency,
    ): \Exception|\Illuminate\Http\Resources\Json\AnonymousResourceCollection {
        try {
            return UserResource::collection(
                $this->user->getUserCryptoWalletListDetailsWithTrashed($currency),
            );
        } catch (\Exception $exception) {
            return $exception;
        }
    }
}
