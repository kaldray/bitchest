<?php

namespace App\Http\Controllers;

use App\Events\CryptoPurchase;
use App\Http\Requests\StoreCryptoWalletRequest;
use App\Models\CryptoWallet;
use App\Services\CryptoWalletServices;
use App\Services\CurrencyHistoryServices;
use App\Services\WalletService;
use Illuminate\Http\JsonResponse;
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

    /**
     * @param StoreCryptoWalletRequest $request
     * @return JsonResponse|\Exception
     */
    public function store(StoreCryptoWalletRequest $request): JsonResponse|\Exception
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

    /**
     * @param CryptoWallet $cryptoWallet
     * @return JsonResponse|\Exception
     */
    public function delete(CryptoWallet $cryptoWallet): JsonResponse|\Exception
    {
        try {
            $quotingForSell = $this->currencyHistoryServices->getQuotingAtCurrentDate(
                $cryptoWallet->currency_id,
            );
            $deletedCrypto = $this->cryptoWalletServices->deleteCrypto($cryptoWallet);

            $amountAtSellingDate = $this->walletService->creditUserWallet(
                $quotingForSell,
                $deletedCrypto,
            );
            $amountAtPurchaseDate = $this->cryptoWalletServices->calculatePurchaseAmount(
                $deletedCrypto,
            );
            $capitalGain = $this->cryptoWalletServices->calculateCapitalGain(
                $amountAtSellingDate,
                $amountAtPurchaseDate,
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
