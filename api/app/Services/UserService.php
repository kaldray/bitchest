<?php

namespace App\Services;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserService
{
    public function __construct(protected User $user, protected UserWalletService $walletService)
    {
    }

    public function getAllUsers(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->user::all();
    }

    public function createUser(StoreUserRequest $request): void
    {
        $user = $this->user::create($request->validated());
        $this->walletService->createUserWallet($user);
    }

    public function getUser(User $user): \Illuminate\Database\Eloquent\Collection
    {
        return $this->user::query()->findOrFail($user->id);
    }

    public function updateUser(UpdateUserRequest $request, User $user): void
    {
        $validateData = $request->validated();
        $user->update($validateData);
    }

    public function deleteUser(User $user)
    {
        $user->delete();
    }
}
