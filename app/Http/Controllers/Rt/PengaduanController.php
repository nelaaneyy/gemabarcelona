<?php

namespace App\Http\Controllers\Rt;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;

class PengaduanController extends Controller
{
    /**
     * Menampilkan detail satu laporan (pengaduan) milik RT.
     */
    public function show(Pengaduan $laporan): Response
    {
        // --- AUTHORIZATION: Pastikan laporan ini dari warga di wilayah RT ---
        $rtUser = Auth::user();

        // Ambil data laporan beserta user pembuatnya dan relasi tanggapan
        $laporan->load(['user:id,name,nomor_rt', 'tanggapans.user:id,nomor_rt']);

        // Cek apakah nomor RT warga pembuat laporan SAMA dengan nomor RT user RT
        if (!$laporan->user || $laporan->user->nomor_rt !== $rtUser->nomor_rt) {
            abort(403, 'Anda tidak berhak mengakses laporan ini.');
        }

        // =======================================================
        // >>> LOGIC BARU: UBAH STATUS OTOMATIS SAAT DILIHAT <<<
        // =======================================================
        if ($laporan->status === 'BARU') {
            $laporan->update(['status' => 'DIPROSES_RT']);
            // Catatan: Ini akan memuat ulang halaman secara otomatis di Inertia
            // untuk menampilkan status yang baru ('DIPROSES_RT').
        }
        // =======================================================

        // Render halaman frontend
        return Inertia::render('Rt/PengaduanShowRt', [
            // Kirim data laporan yang MUNGKIN sudah diperbarui
            'pengaduan' => $laporan,
            'tanggapans' => $laporan->tanggapans,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    /**
     * Menangani pembaruan status laporan (dipicu oleh rute PATCH).
     * Fungsi ini sekarang hanya menangani status 'SELESAI' dan 'DITERUSKAN_LURAH'.
     */
    public function updateStatus(Request $request, Pengaduan $laporan): RedirectResponse
    {
        // 1. Authorization
        $rtUser = Auth::user();
        $laporan->load('user:id,nomor_rt');

        if (!$laporan->user || $laporan->user->nomor_rt !== $rtUser->nomor_rt) {
            // Error ini akan ditangkap oleh Inertia di frontend jika terjadi.
            return back()->withErrors(['status' => 'Anda tidak berhak mengubah status laporan ini.']);
        }

        // Cek kondisi status saat ini sebelum diubah
        if ($laporan->status === 'SELESAI' || $laporan->status === 'DITERUSKAN_LURAH') {
            return back()->withErrors(['status' => 'Laporan sudah ditutup dan tidak dapat diubah lagi.']);
        }

        // 2. Validasi Input Status Baru
        $validated = $request->validate([
            'status' => [
                'required',
                // Batasi status yang boleh di-PATCH HANYA status akhir
                Rule::in(['SELESAI', 'DITERUSKAN_LURAH']),
            ],
        ]);

        // 3. Update Status di Database
        $laporan->update(['status' => $validated['status']]);

        // 4. Redirect ke rute detail laporan yang baru (rt.laporan.show)
        return redirect()->route('rt.laporan.show', $laporan)->with('success', 'Status laporan berhasil diperbarui!');
    }
}
