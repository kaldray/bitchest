<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperCurrencyHistory
 */
class CurrencyHistory extends Model
{
    use HasFactory;

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $casts = [
        "date" => "datetime:d-m-Y",
    ];

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function cryptoWallet(): HasMany
    {
        return $this->hasMany(CryptoWallet::class);
    }

    public function getQuotingAtCurrentDate($currency_id)
    {
        return $this::whereDate("date", now())
            ->where("currency_id", "=", $currency_id)
            ->first(["quoting"]);
    }

    public function getQuotingWithId($id)
    {
        return $this::where("id", "=", $id)->first();
    }

    public function getQuotingForDates(\Illuminate\Support\Collection $dates, $currency)
    {
        return $this::whereIn("date", $dates)
            ->where("currency_id", $currency->first()->currency_histories()->get()->first()->currency_id)
            ->get()
            ->map(function ($item) {
                return $item->quoting;
            });
    }
}
