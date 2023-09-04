<?php

namespace App\Http\Controllers;

use App\Events\CryptoPurchase;
use App\Http\Requests\StoreCryptoWalletRequest;
use App\Models\CryptoWallet;
use App\Services\CryptoWalletServices;
use App\Services\CurrencyHistoryServices;
use App\Services\WalletService;
use Illuminate\Support\Facades\Response;

class CryptoWalletController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */

    public function __construct(
        protected CryptoWalletServices $cryptoWalletServices,
        protected CurrencyHistoryServices $currencyHistoryServices,
        protected WalletService $walletService,
    ) {
    }

    public function store(StoreCryptoWalletRequest $request)
    {
        try {
            $data = $this->cryptoWalletServices->purchaseCurrency($request);
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

    public function delete(CryptoWallet $cryptoWallet)
    {
        try {
            $quotingForSell = $this->currencyHistoryServices->getQuotingAtCurrentDate(
                $cryptoWallet->id,
            );
            $deletedCrypto = $this->cryptoWalletServices->deleteCrypto($cryptoWallet);

            $capitalGainAtCurrentDate = $this->walletService->creditUserWallet(
                $quotingForSell,
                $deletedCrypto,
            );
            $amountOfPurchaseDate = $this->cryptoWalletServices->calculatePurchaseAmount(
                $deletedCrypto,
            );
            $capitalGain = $this->cryptoWalletServices->calculateCapitalGain(
                $capitalGainAtCurrentDate,
                $amountOfPurchaseDate,
            );
            $this->cryptoWalletServices->fillCapitalGainValue($deletedCrypto, $capitalGain);
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
}
