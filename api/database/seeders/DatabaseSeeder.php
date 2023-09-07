<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\CryptoWallet;
use App\Models\Currency;
use App\Models\CurrencyHistory;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */

    public function run(): void
    {
        User::factory(4)
            ->state(new Sequence(["role" => "client"], ["role" => "admin"]))
            ->has(Wallet::factory()->count(1))
            ->create();
        Currency::factory(10)
            ->has(
                CurrencyHistory::factory()
                    ->count(30)
                    ->generateQuoting(),
            )
            ->has(CryptoWallet::factory(2))
            ->create();
    }
}
