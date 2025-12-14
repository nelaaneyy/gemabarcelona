<?php

namespace App\Http\Controllers;

use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class RekapitulasiController extends Controller
{
    /**
     * Menampilkan daftar pengaduan yang berstatus SELESAI.
     */
    public function index()
    {
        $user = Auth::user();

        $query = Pengaduan::where('status', 'SELESAI')
            ->with(['user']);

        // Jika user adalah RT, filter berdasarkan nomor RT user pelapor (user)
        if ($user->hasRole('rt')) {
            $query->whereHas('user', function ($q) use ($user) {
                $q->where('nomor_rt', $user->nomor_rt);
            });
        }
        // Jika Lurah, tampilkan semua (tidak perlu filter tambahan)

        $pengaduans = $query->latest()->get();

        return Inertia::render('Rekapitulasi/Index', [
            'pengaduans' => $pengaduans
        ]);
    }

    /**
     * Cetak PDF rekapitulasi pengaduan.
     */
    public function cetak()
    {
        $user = Auth::user();

        $query = Pengaduan::where('status', 'SELESAI')
            ->with(['user']);

        // Filter sama seperti index
        if ($user->hasRole('rt')) {
            $query->whereHas('user', function ($q) use ($user) {
                $q->where('nomor_rt', $user->nomor_rt);
            });
        }

        $pengaduans = $query->latest()->get();

        $isRt = $user->hasRole('rt');
        $area = $isRt ? 'RT ' . $user->nomor_rt : 'Kelurahan ' . $user->nama_kelurahan;

        $pdf = Pdf::loadView('pdf.rekapitulasi', [
            'pengaduans' => $pengaduans,
            'user' => $user,
            'area' => $area,
            'tanggal' => now()->translatedFormat('d F Y'),
        ]);
        
        // Setup paper: A4 Landscape agar muat banyak kolom
        $pdf->setPaper('a4', 'landscape');

        return $pdf->download('rekapitulasi-pengaduan-' . now()->format('Y-m-d') . '.pdf');
    }
}
