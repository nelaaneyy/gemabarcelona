<?php

namespace App\Http\Controllers\Lurah;

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
     * Menampilkan detail satu laporan (pengaduan) yang diteruskan ke Lurah.
     */
    public function show(Pengaduan $pengaduan): Response
    {
        // ... (Authorization Lurah - menyesuaikan dengan wilayah) ...

        // Ambil data laporan beserta user pembuatnya dan relasi tanggapan
        $pengaduan->load(['user:id,name,nomor_rt', 'tanggapans.user:id,nomor_rt']);

        // =======================================================
        // >>> LOGIC BARU: UBAH STATUS OTOMATIS SAAT DILIHAT <<<
        // =======================================================
        // Status diubah dari DITERUSKAN_LURAH menjadi DIPROSES_LURAH
        if ($pengaduan->status === 'DITERUSKAN_LURAH') {
            $pengaduan->update(['status' => 'DIPROSES_LURAH']);
        }
        // =======================================================

        // Render halaman frontend
        return Inertia::render('Lurah/PengaduanShowLurah', [
            'pengaduan' => $pengaduan,
            'tanggapans' => $pengaduan->tanggapans,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    /**
     * Menangani pembaruan status laporan (dipicu oleh rute PATCH).
     * Fungsi ini sekarang hanya menangani status 'SELESAI' dan 'DITOLAK'.
     */
    public function updateStatus(Request $request, Pengaduan $pengaduan): RedirectResponse
    {
        // 1. Authorization
        // (Pastikan Lurah yang login berhak memproses laporan ini, misalnya berdasarkan wilayah/kelurahan)
        // ...

        // Cek kondisi status saat ini
        if ($pengaduan->status === 'SELESAI' || $pengaduan->status === 'DITOLAK') {
            return back()->withErrors(['status' => 'Laporan sudah ditutup dan tidak dapat diubah lagi.']);
        }

        // 2. Validasi Input Status Baru
        $validated = $request->validate([
            'status' => [
                'required',
                // Batasi status yang boleh di-PATCH HANYA status akhir Lurah
                Rule::in(['SELESAI', 'DITOLAK']),
            ],
        ]);

        // 3. Update Status di Database
        $pengaduan->update(['status' => $validated['status']]);

        // 4. Redirect
        return redirect()->route('lurah.pengaduan.show', $pengaduan)->with('success', 'Status laporan berhasil diperbarui!');
    }
}
