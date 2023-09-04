<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @mixin IdeHelperCryptoWallet
 */
class CryptoWallet extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = ["sell_at"];

    const DELETED_AT = "sell_at";

    protected $fillable = ["quantity", "user_id", "currency_id", "capital_gain"];

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sellCrypto(CryptoWallet $cryptoWallet): Wallet|Collection
    {
        return $this::where("currency_id", "=", $cryptoWallet->currency_id)
            ->where("user_id", "=", $cryptoWallet->user_id)
            ->get()
            ->each(function ($item) {
                $item->delete();
            });
    }
}
