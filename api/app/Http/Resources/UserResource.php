<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "email" => $this->email,
            "role" => $this->when($this->role === "admin", $this->role),
            "crypto_wallets" => CryptoWalletRessource::collection(
                $this->whenLoaded("cryptoWallets"),
            ),
            "wallet" => WalletRessource::make($this->whenLoaded("wallet")),
        ];
    }
}
