<?php

namespace App\Models;

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

    /**
     * The name of the "created at" column.
     *
     * @var string
     */

    protected $fillable = ["quantity", "user_id", "currency_id"];

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
