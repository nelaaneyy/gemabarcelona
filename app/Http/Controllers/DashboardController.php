<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use Inertia\Inertia; 
use Inertia\Response; 
use App\Models\Pengaduan;
use Illuminate\Support\Facades\DB;

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
        // 1. Ambil Statistik Ringkasan (sesuai desain Figma)
        $stats = Pengaduan::query()
            ->select(DB::raw('count(*) as total')) // "Total Laporan"
            // "Dalam Perbaikan" = DIPROSES_RT
            ->selectRaw("count(case when status = 'DIPROSES_RT' then 1 end) as diproses") 
            ->selectRaw("count(case when status = 'DITERUSKAN_LURAH' then 1 end) as diteruskan") // "Diteruskan ke kelurahan"
            ->selectRaw("count(case when status = 'SELESAI' then 1 end) as selesai")
            ->selectRaw("count(case when status = 'DITOLAK' then 1 end) as ditolak")
            ->first(); // Ambil 1 baris hasil perhitungan

        // 2. Ambil Daftar Laporan (kita ambil 5 terbaru untuk dashboard)
        // Ganti dari 'laporanPenting' menjadi 'laporans'
        $laporans = Pengaduan::with('user:id,name,nomor_rt') // Ambil info pelapor
            ->latest() // Urutkan dari terbaru
            ->paginate(5); // Ambil 5 laporan per halaman (untuk tabel)

        // 3. Render halaman 'Lurah/DashboardLurah.jsx'
        return Inertia::render('Lurah/DashboardLurah', [ // <-- Ganti nama file view
            'stats' => $stats,
            'laporans' => $laporans, // Kirim data laporan (ter-paginate)
            'auth' => [ // Mengirim auth manual (sesuai preferensimu)
                'user' => Auth::user(),
            ],
        ]);
    }
}