<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCryptoWalletRequest;
use App\Models\CryptoWallet;

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
    }

    /**
     * Display the specified resource.
     */
    public function show(CryptoWallet $cryptoWallet)
    {
        //
    }
}
