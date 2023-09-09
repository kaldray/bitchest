<?php

namespace App\Services;

use App\Http\Requests\LoginStoreRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticationService
{
    public function signIn(
        LoginStoreRequest $request,
    ): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|Response {
        if (Auth::attempt($request->validated())) {
            $user = Auth::user();
            return response(
                ["message" => "Utilisateur authentifié", "status" => 201, "user" => $user->role],
                Response::HTTP_OK,
            );
        }
        return response(["message" => "Les informations sont incorrectes.", "status" => 401], 401);
    }

    public function signOut(Request $request): Response
    {
        Auth::guard("web")->logout();
        $request->session()->invalidate();

        $request->session()->regenerateToken();
        return response(["message" => "Utilisateur déconnecter", "status" => 200], 200);
    }
}
