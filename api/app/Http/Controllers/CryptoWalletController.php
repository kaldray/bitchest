<?php

namespace App\Http\Controllers;

use App\Events\CryptoProfits;
use App\Events\CryptoPurchase;
use App\Events\CryptoSale;
use App\Http\Requests\StoreCryptoWalletRequest;
use App\Models\CryptoWallet;
use App\Models\CurrencyHistory;
use App\Services\CryptoWalletServices;
use Illuminate\Support\Facades\Response;

class CryptoWalletController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */

    public function __construct(protected CryptoWalletServices $cryptoWalletServices)
    {
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
            $quotingForSell = CurrencyHistory::whereDate("date", now())
                ->where("currency_id", "=", $cryptoWallet->currency_id)
                ->firstOrFail();
            $cryptoToDeleted = CryptoWallet::where("currency_id", "=", $cryptoWallet->currency_id)
                ->where("user_id", "=", $cryptoWallet->user_id)
                ->get()
                ->each(function ($item) {
                    $item->delete();
                });
            $ids = $cryptoToDeleted->map(function ($item) {
                return $item->id;
            });
            $benef = CryptoSale::dispatch($quotingForSell, $cryptoToDeleted);
            $diff = CryptoProfits::dispatch($cryptoToDeleted);
            $longueur = count($benef[0]);
            $capital_gain = [];
            for ($i = 0; $i < $longueur; $i++) {
                array_push($capital_gain, $benef[0][$i] - $diff[0][$i]);
            }
            $withTrashed = CryptoWallet::onlyTrashed()
                ->whereIn("id", $ids)
                ->get();
            $withTrashed->each(function (CryptoWallet $item, $key) use ($capital_gain) {
                $item->update(["capital_gain" => $capital_gain[$key]]);
            });
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
