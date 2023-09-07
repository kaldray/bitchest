<?php

namespace Database\Factories;

use App\Models\Currency;
use App\Models\CurrencyHistory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CryptoWallet>
 */
class CryptoWalletFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $randomDate = CurrencyHistory::all("date")->random()->date;
        return [
            "created_at" => $randomDate,
            "updated_at" => $randomDate,
            "sell_at" => null,
            "quantity" => 2,
            "capital_gain" => null,
            "currency_id" => Currency::factory(),
            "user_id" => User::where("role", "=", "client")
                ->get()
                ->random()->id,
        ];
    }
}
