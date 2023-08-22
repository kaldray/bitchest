<?php

namespace App\Http\Controllers;

use App\Events\CryptoPurchase;
use App\Http\Requests\StoreCryptoWalletRequest;
use App\Models\CryptoWallet;
use App\Models\CurrencyHistory;
use App\Models\Wallet;
use Illuminate\Support\Facades\Response;

class CryptoWalletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCryptoWalletRequest $request)
    {
        try {
            $data = CryptoWallet::create($request->validated());
            CryptoPurchase::dispatch($data);
            return Response::json(
                [
                    "message" => "L'opération s'est déroulée avec succès",
                    "status" => \Illuminate\Http\Response::HTTP_OK,
                ],
                \Illuminate\Http\Response::HTTP_CREATED,
            );
        } catch (\Exception $exception) {
            return $exception;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(CryptoWallet $cryptoWallet)
    {
        //
    }
}
