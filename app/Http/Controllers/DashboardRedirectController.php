<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class DashboardRedirectController extends Controller
{
    public function index()
    {
        // 1. Ambil role dari user yang sedang login
        $role = Auth::user()->role;

        // 2. Cek rolenya dan arahkan (redirect)
        if ($role == 'warga') {
            // Arahkan ke route 'warga.dashboard'
            return redirect()->route('warga.dashboard'); // <-- PERBAIKI INI
        } 
        elseif ($role == 'rt') {
            // Arahkan ke route 'rt.dashboard'
            return redirect()->route('rt.dashboard'); // <-- PERBAIKI INI
        } 
        elseif ($role == 'lurah') {
            // Arahkan ke route 'lurah.dashboard'
            return redirect()->route('lurah.dashboard'); // <-- PERBAIKI INI
        }

        // 3. Jika rolenya tidak dikenali, logout dan lempar ke login
        Auth::logout();
        return redirect('/login')->withErrors([
            'email' => 'Role tidak teridentifikasi. Silakan hubungi admin.'
        ]);
    }
}