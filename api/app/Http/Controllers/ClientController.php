<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
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
                User::with(["wallet", "cryptoWallets"])
                    ->where("id", \Auth::user()->id)
                    ->get(),
            );
        } catch (\Exception $exception) {
            return $exception;
        }
    }
}
