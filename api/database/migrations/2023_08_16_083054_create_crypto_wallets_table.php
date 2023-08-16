<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("crypto_wallets", function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes("sell_at");
            $table->decimal("capital_gain");
            $table->unsignedBigInteger("quantity")->nullable(false);

            $table
                ->foreignId("user_id")
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table
                ->foreignId("currency_id")
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("crypto_wallets");
    }
};
