<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CryptoWalletResource extends JsonResource
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
            "quantity" => $this->quantity,
            "created_at" => $this->when(
                $this->created_at?->format("d-m-Y"),
                $this->created_at?->format("d-m-Y"),
            ),
            "sell_at" => $this->when($this->sell_at !== null, $this->sell_at?->format("d-m-Y")),
            "capital_gain" => $this->capital_gain,
            "currency" => CurrencyResource::make($this->whenLoaded("currency")),
        ];
    }
}
