<?php

namespace App\Http\Controllers;

use App\Http\Resources\CurrencyResource;
use App\Models\Currency;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    public function __construct(protected Currency $currency)
    {
    }

    /**
     * Display currencies with histories.
     */
    public function index()
    {
        try {
            return CurrencyResource::collection($this->currency->getCurrenciesWithHistories());
        } catch (\Exception $exception) {
        }
        return $exception;
    }

    /**
     * Get currency histories.
     * @param Currency $currency
     * @return CurrencyResource|\Exception
     */
    public function show(Currency $currency)
    {
        try {
            return new CurrencyResource($this->currency->getCurrencyHistory($currency));
        } catch (\Exception $exception) {
            return $exception;
        }
    }
}
