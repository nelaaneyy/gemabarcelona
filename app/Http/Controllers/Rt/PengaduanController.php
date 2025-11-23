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
        // Memuat user: untuk otorisasi RT
        // Memuat tanggapans.user: untuk menampilkan siapa (RT mana) yang memberi tanggapan
        $laporan->load(['user:id,name,nomor_rt', 'tanggapans.user:id,nomor_rt']);

        // Cek apakah nomor RT warga pembuat laporan SAMA dengan nomor RT user RT
        if (!$laporan->user || $laporan->user->nomor_rt !== $rtUser->nomor_rt) {
            abort(403, 'Anda tidak berhak mengakses laporan ini.');
        }
        // --- BATAS AUTHORIZATION ---

        // Render halaman frontend
        return Inertia::render('Rt/PengaduanShowRt', [
            'pengaduan' => $laporan, // Mengirim data sebagai 'pengaduan' ke frontend
            'tanggapans' => $laporan->tanggapans, // Mengirimkan relasi tanggapan
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    /**
     * Menangani pembaruan status laporan (dipicu oleh rute PATCH).
     */
    public function updateStatus(Request $request, Pengaduan $laporan): RedirectResponse
    {
        // 1. Authorization
        $rtUser = Auth::user();
        $laporan->load('user:id,nomor_rt');

        if (!$laporan->user || $laporan->user->nomor_rt !== $rtUser->nomor_rt) {
             abort(403, 'Anda tidak berhak mengubah status laporan ini.');
        }

        // 2. Validasi Input Status Baru
        $validated = $request->validate([
            'status' => [
                'required',
                // Pastikan status yang dikirim valid sesuai ENUM di database
                Rule::in(['BARU', 'DIPROSES_RT', 'DITERUSKAN_LURAH', 'SELESAI', 'DITOLAK']),
            ],
        ]);

        // 3. Update Status di Database
        $laporan->update(['status' => $validated['status']]);

        // 4. Redirect ke rute detail laporan yang baru (rt.laporan.show)
        return redirect()->route('rt.laporan.show', $laporan)->with('success', 'Status laporan berhasil diperbarui!');
    }
}
