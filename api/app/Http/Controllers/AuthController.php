<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginStoreRequest;
use App\Services\AuthenticationService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct(protected AuthenticationService $authenticationService)
    {
    }

    /**
     * @param LoginStoreRequest $request
     * @return Response
     */
    public function login(LoginStoreRequest $request): Response
    {
        return $this->authenticationService->signIn($request);
    }

    public function logout(
        Request $request,
    ): \Illuminate\Foundation\Application|Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory {
        return $this->authenticationService->signOut($request);
    }
}
