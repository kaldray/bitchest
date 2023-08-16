<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CryptoWallet extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The name of the "created at" column.
     *
     * @var string
     */
    const CREATED_AT = "purchased_at";
    protected $dateFormat = "d/m/Y H:i:s";

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
