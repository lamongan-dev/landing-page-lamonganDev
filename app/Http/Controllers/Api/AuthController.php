<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    // Register new user
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'avatar' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'data' => [
                    'errors' => $validator->errors(),
                    'path' => 'app/Http/Controllers/Api/AuthController.php',
                    'timestamp' => now(),
                ]
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone,
            'avatar' => $request->avatar,
        ]);

        $token = Auth::guard('api')->login($user);

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'bearer'
            ]
        ], 201);
    }

    // Login user
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password',
                'data' => [
                    'path' => 'app/Http/Controllers/Api/AuthController.php',
                    'timestamp' => now(),
                ]
            ], 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'User logged in successfully',
            'data' => [
                'token' => $token,
                'token_type' => 'bearer'
            ]
        ]);
    }

    // Get user profile
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    // Logout user
    public function logout()
    {
        Auth::guard('api')->logout();

        return response()->json(['message' => 'User logged out successfully']);
    }

    // Refresh JWT token
    public function refresh()
    {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());

            return response()->json([
                'success' => true,
                'message' => 'Token refreshed successfully',
                'data' => [
                    'token' => $newToken,
                    'token_type' => 'bearer'
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Could not refresh token',
                'data' => [
                    'error' => $e->getMessage(),
                    'path' => 'app/Http/Controllers/Api/AuthController.php',
                    'timestamp' => now(),
                ]
            ], 401);
        }
    }

    // Return token response structure
    protected function responseWithToken($token)
    {
        return response()->json([
            'success' => true,
            'message' => 'Token generated successfully',
            'data' => [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => JWTAuth::factory()->getTTL() * 60,
            ]
        ]);
    }
}
