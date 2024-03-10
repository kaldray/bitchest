<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

/**
 * @mixin IdeHelperUser
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ["email", "password", "role"];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = ["password", "remember_token"];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        "email_verified_at" => "datetime",
        "password" => "hashed",
    ];

    public function wallet(): HasOne
    {
        return $this->hasOne(Wallet::class);
    }

    public function cryptoWallets(): HasMany
    {
        return $this->hasMany(CryptoWallet::class);
    }

    public function getUserCryptoWalletListWithTrashed()
    {
        return DB::table("currency_histories")
            ->select(['currency_histories.id as ch_id', "quoting", "date", "currency_id", "crypto_name", "crypto_wallets.id as cw_id", "capital_gain", "quantity"])
            ->join("crypto_wallets", function (JoinClause $join) {
                $join->on('currency_histories.id', '=', 'crypto_wallets.currency_histories_id')
                    ->where('crypto_wallets.user_id', '=', \Auth::user()->id);
            })
            ->join("currencies", "currency_histories.currency_id", "=", "currencies.id")
            ->whereNotNull("currency_histories_id")
            ->get();
    }

    public function getUserCryptoWalletListDetailsWithTrashed(
        CurrencyHistory $currency,
    ): \Illuminate\Database\Eloquent\Collection|array {
        return $this::with([
            "wallet",
            "cryptoWallets" => function (HasMany $query) use ($currency) {
                return $query->where("currency_histories_id", $currency->id)->withTrashed();
            },
            "cryptoWallets.currency_histories",
        ])
            ->where("id", \Auth::user()->id)
            ->get();
    }

    public function getAllUsersExceptConnectedOne()
    {
        return $this::all()
            ->sortByDesc("created_at")
            ->where("id", "!=", Auth::user()->id);
    }
}
