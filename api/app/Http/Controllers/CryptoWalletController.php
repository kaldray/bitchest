<?php

namespace App\Http\Controllers;

use App\Events\CryptoProfits;
use App\Events\CryptoPurchase;
use App\Events\CryptoSale;
use App\Http\Requests\StoreCryptoWalletRequest;
use App\Models\CryptoWallet;
use App\Models\CurrencyHistory;
use App\Services\CryptoWalletServices;
use App\Services\CurrencyHistoryServices;
use Illuminate\Support\Facades\Response;

class CryptoWalletController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */

    public function __construct(
        protected CryptoWalletServices $cryptoWalletServices,
        protected CurrencyHistoryServices $currencyHistoryServices,
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
            $benef = CryptoSale::dispatch($quotingForSell, $deletedCrypto);
            $diff = CryptoProfits::dispatch($deletedCrypto);
            $capital_gain = $this->cryptoWalletServices->calculateCapitalGain($benef, $diff);
            $this->cryptoWalletServices->fillCapitalGainValue($deletedCrypto, $capital_gain);
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
