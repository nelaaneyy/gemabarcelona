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
        // Tampilkan hanya laporan yang sedang aktif/berjalan
        $pengaduans = Auth::user()->pengaduans()
            ->whereIn('status', ['BARU', 'DIPROSES_RT', 'DITERUSKAN_LURAH'])
            ->latest()
            ->get();

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
    public function rt(Request $request): Response
    {
        // Ambil nomor RT dari user yang sedang login
        $rtUser = Auth::user();
        $nomor_rt_user = $rtUser->nomor_rt;

        $query = Pengaduan::whereHas('user', function ($query) use ($nomor_rt_user) {
            $query->where('role', 'warga')
                  ->where('nomor_rt', $nomor_rt_user);
        });

        // Filter berdasarkan status jika ada di request
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $pengaduans = $query->with('user:id,name,nomor_rt')
            ->latest()
            ->paginate(10)
            ->withQueryString(); // Pastikan pagination mempertahankan query params

        return Inertia::render('Rt/DashboardRt', [
            'pengaduans' => $pengaduans,
            'filters' => $request->only(['status']), // Kirim state filter ke frontend
            'auth' => [
                'user' => $rtUser,
            ],
        ]);
    }

    /**
     * Arahkan ke dashboard Lurah (React).
     */
    public function lurah(): Response
    {
        $lurahUser = Auth::user();

        // Asumsi: Lurah melihat SEMUA laporan, tetapi fokus utamanya adalah yang diteruskan.
        // Jika Lurah hanya melihat kelurahannya, Anda perlu menambahkan filter berdasarkan $lurahUser->nama_kelurahan.

        // --- 1. Ambil Statistik Ringkasan (Fokus pada semua laporan di sistem atau di wilayah Lurah) ---
        $statsQuery = Pengaduan::query();

        // Jika Lurah terikat pada suatu kelurahan, tambahkan filter di sini:
        // if ($lurahUser->nama_kelurahan) {
        //     $statsQuery->whereHas('user', function($q) use ($lurahUser) {
        //         $q->where('nama_kelurahan', $lurahUser->nama_kelurahan);
        //     });
        // }

        $stats = $statsQuery->select(DB::raw('count(*) as total'))
            // "Dalam Perbaikan" = DIPROSES_RT
            ->selectRaw("count(case when status = 'DIPROSES_RT' then 1 end) as diproses")
            // "Diteruskan ke kelurahan" = DITERUSKAN_LURAH (Fokus Utama Lurah)
            ->selectRaw("count(case when status = 'DITERUSKAN_LURAH' then 1 end) as diteruskan")
            ->selectRaw("count(case when status = 'SELESAI' then 1 end) as selesai")
            ->selectRaw("count(case when status = 'DITOLAK' then 1 end) as ditolak")
            ->first();

        // --- 2. Ambil Daftar Laporan (Fokus pada yang 'DITERUSKAN_LURAH' saja) ---
        // --- 2. Ambil Daftar Laporan (DITERUSKAN_LURAH & DIPROSES_LURAH) ---
        $laporansQuery = Pengaduan::whereIn('status', ['DITERUSKAN_LURAH', 'DIPROSES_LURAH']);

        // Jika ada filter kelurahan, terapkan di sini juga
        // if ($lurahUser->nama_kelurahan) {
        //     $laporansQuery->whereHas('user', function($q) use ($lurahUser) {
        //         $q->where('nama_kelurahan', $lurahUser->nama_kelurahan);
        //     });
        // }

        $laporans = $laporansQuery
            ->with('user:id,name,nomor_rt') // Ambil info pelapor
            ->latest() // Urutkan dari terbaru
            ->paginate(5); // Ambil 5 laporan per halaman

        // --- 3. Render halaman 'Lurah/DashboardLurah.jsx' ---
        return Inertia::render('Lurah/DashboardLurah', [
            'stats' => $stats,
            'laporans' => $laporans,
            'auth' => [
                'user' => $lurahUser, // Kirim Auth::user() secara manual
            ],
        ]);
    }
}
