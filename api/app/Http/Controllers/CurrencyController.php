<?php

namespace App\Http\Controllers;

use App\Http\Resources\CurrencyResource;
use App\Models\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return CurrencyResource::collection(Currency::all());
        } catch (\Exception $exception) {
        }
        return $exception;
    }
}
