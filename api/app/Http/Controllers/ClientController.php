<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display user's wallets
     */
    public function index()
    {
        try {
            return UserResource::collection(
                User::with([
                    "wallet",
                    "cryptoWallets" => function (HasMany $query) {
                        $query
                            ->select([
                                "user_id",
                                "currency_id",
                                \DB::raw("SUM(quantity) as quantity"),
                            ])
                            ->groupBy(["user_id", "currency_id"]);
                    },
                    "cryptoWallets.currency",
                ])
                    ->where("id", \Auth::user()->id)
                    ->get(),
            );
        } catch (\Exception $exception) {
            return $exception;
        }
    }
}
