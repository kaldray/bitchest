<?php

namespace App\Services;

use App\Http\Requests\StoreCryptoWalletRequest;
use App\Models\CryptoWallet;

class CryptoWalletServices
{
    public function __construct(protected CryptoWallet $cryptoWallet)
    {
    }

    public function purchaseCurrency(StoreCryptoWalletRequest $request)
    {
        return $this->cryptoWallet::create($request->validated());
    }

    public function deleteCrypto(CryptoWallet $cryptoWallet)
    {
        return $this->cryptoWallet->sellCrypto($cryptoWallet);
    }

    public function getId($cryptoToDeleted)
    {
        return $cryptoToDeleted->map(function ($item) {
            return $item->id;
        });
    }

    public function calculateCapitalGain(array $benef, array $diff): array
    {
        $longueur = count($benef);
        $capital_gain = [];
        for ($i = 0; $i < $longueur; $i++) {
            array_push($capital_gain, $benef[$i] - $diff[0][$i]);
        }
        return $capital_gain;
    }

    public function fillCapitalGainValue($deletedCrypto, $capital_gain): void
    {
        $deletedCrypto->each(function (CryptoWallet $item, $key) use ($capital_gain) {
            $item->update(["capital_gain" => $capital_gain[$key]]);
        });
    }
}
