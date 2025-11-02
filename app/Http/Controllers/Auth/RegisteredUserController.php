<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'in:warga,rt,lurah'],
        ];

        // Add conditional validation based on role
        if ($request->role === 'rt') {
            $rules['nomor_rt'] = ['required', 'string', 'max:10'];
        } elseif ($request->role === 'lurah') {
            $rules['nama_kelurahan'] = ['required', 'string', 'max:255'];
        } elseif ($request->role === 'warga') {
            $rules['alamat'] = ['required', 'string', 'max:500'];
            $rules['nomor_ktp'] = ['required', 'string', 'size:16', 'unique:users,nomor_ktp'];
        }

        $validated = $request->validate($rules);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'nomor_rt' => $validated['nomor_rt'] ?? null,
            'nama_kelurahan' => $validated['nama_kelurahan'] ?? null,
            'alamat' => $validated['alamat'] ?? null,
            'nomor_ktp' => $validated['nomor_ktp'] ?? null,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
