<?php

namespace App\Services;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;

class UserService
{
    public function __construct(protected User $user, protected WalletService $walletService)
    {
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllUsers(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->user->getAllUsersExceptConnectedOne();
    }

    /**
     * @param StoreUserRequest $request
     * @return void
     */
    public function createUser(StoreUserRequest $request): void
    {
        $user = $this->user::create($request->validated());
        $this->walletService->createUserWallet($user);
    }

    /**
     * @param User $user
     * @return \Illuminate\Database\Eloquent\Collection|User
     */
    public function getUser(User $user): \Illuminate\Database\Eloquent\Collection|\App\Models\User
    {
        return $this->user::query()->findOrFail($user->id);
    }

    /**
     * @param UpdateUserRequest $request
     * @param User $user
     * @return void
     */
    public function updateUser(UpdateUserRequest $request, User $user): void
    {
        $validateData = $request->validated();
        $user->update($validateData);
    }

    /**
     * @param User $user
     * @return void
     */
    public function deleteUser(User $user)
    {
        $user->delete();
    }
}
