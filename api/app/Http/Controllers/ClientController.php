<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Currency;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ClientController extends Controller
{
    public function __construct(protected User $user)
    {
    }

    /**
     * Display user's wallets with aggregate quantity for each currency
     * @return AnonymousResourceCollection|\Exception
     */
    public function index()
    {
        try {
            return $this->user->getUserCryptoWalletListWithTrashed();
        } catch (\Exception $exception) {
            return $exception;
        }
    }

    /***
     * Display user's wallet with data for one currency only
     * @param Currency $currency
     * @return \Exception|AnonymousResourceCollection
     */
    public function show(Currency $currency): \Exception|AnonymousResourceCollection
    {
        try {
            return UserResource::collection(
                $this->user->getUserCryptoWalletListDetailsWithTrashed($currency),
            );
        } catch (\Exception $exception) {
            return $exception;
        }
    }
}
