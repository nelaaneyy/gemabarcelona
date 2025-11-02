<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use Inertia\Inertia; 
use Inertia\Response; 
use App\Models\Pengaduan;

class DashboardController extends Controller
{
    /**
     * Arahkan ke dashboard Warga (React).
     */
    public function warga(): Response
    {
        $pengaduans = Auth::user()->pengaduans()->latest()->get();

        return Inertia::render('Warga/DashboardWarga', [
            'pengaduans' => $pengaduans,
            'flash' => [
                'success' => session('success'),
            ],
            'auth' => [
            'user' => Auth::user(),
        ],
        ]);
    }

    /**
     * Arahkan ke dashboard RT (React).
     */
    public function rt(): Response
    {
        $nomor_rt_user = Auth::user()->nomor_rt;

        // 2. Ambil pengaduan dari warga di RT yang sama
        $pengaduans = Pengaduan::whereHas('user', function ($query) use ($nomor_rt_user) {
            $query->where('role', 'warga')
                  ->where('nomor_rt', $nomor_rt_user);
        })
        ->with('user:id,name') // <-- Pindahkan ->with, ->latest, ->get ke sini
        ->latest()
        ->get();
        // --- BATAS PEMINDAHAN ---

        // 3. Render view dan kirim HANYA data yang sudah siap
        return Inertia::render('Rt/DashboardRt', [
            // Kirim data pengaduans yang sudah diambil
            'pengaduans' => $pengaduans,

            // Kirim data auth manual (sesuai keinginanmu)
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    /**
     * Arahkan ke dashboard Lurah (React).
     */
    public function lurah(): Response
    {
        // Nanti kita isi logikanya
        return Inertia::render('Lurah/Dashboard', [
            // --- TAMBAHKAN BARIS INI ---
             'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
}