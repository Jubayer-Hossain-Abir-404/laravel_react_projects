<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(AuthRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'error' => 'Unauthorized',
                ], 401);
            }

            $token = $user->createToken(config('common.DEFAULT_DEVICE'))->plainTextToken;

            return response()->json(
                [
                    'message' => 'Login successful',
                    'user' => $user,
                    'token' => $token,
                ],
                201
            );
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function logout()
    {
        $user = Auth::guard('sanctum')->user();

        try {
            $user->tokens()->delete();

            return response()->json([
                'message' => 'Logout successful',
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
