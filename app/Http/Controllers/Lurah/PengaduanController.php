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
use App\Models\Tanggapan; // Untuk logika Tanggapan Lurah

class PengaduanController extends Controller
{
    /**
     * Menampilkan detail satu laporan (pengaduan) untuk Lurah.
     */
    public function show(Pengaduan $pengaduan): Response
    {
        // --- AUTHORIZATION: Pastikan hanya Lurah yang bisa melihat
        if (Auth::user()->role !== 'lurah') {
            abort(403, 'Anda tidak memiliki akses ke halaman ini.');
        }

        // Memuat user: pelapor, dan tanggapans.user: pembuat tanggapan
        $pengaduan->load(['user:id,name,nomor_rt', 'tanggapans.user:id,role,nomor_rt']);

        return Inertia::render('Lurah/PengaduanShowLurah', [
            'pengaduan' => $pengaduan,
            'tanggapans' => $pengaduan->tanggapans,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    /**
     * Menangani pembaruan status laporan oleh Lurah (Finalisasi).
     */
    public function updateStatus(Request $request, Pengaduan $pengaduan): RedirectResponse
    {
        // 1. Authorization
        if (Auth::user()->role !== 'lurah') {
             abort(403, 'Anda tidak berhak mengubah status laporan ini.');
        }

        // Cek apakah status saat ini adalah DITERUSKAN_LURAH (opsional, tapi disarankan)
        if ($pengaduan->status !== 'DITERUSKAN_LURAH') {
             // Jika sudah selesai/ditolak, cegah perubahan status
             return back()->with('error', 'Laporan sudah final dan tidak dapat diubah lagi.');
        }

        // 2. Validasi Input Status Final
        $validated = $request->validate([
            'status' => [
                'required',
                // Lurah hanya bisa mengubah menjadi SELESAI atau DITOLAK
                Rule::in(['SELESAI', 'DITOLAK']),
            ],
        ]);

        // 3. Update Status di Database
        $pengaduan->update(['status' => $validated['status']]);

        // 4. Redirect ke rute detail laporan Lurah
        return redirect()->route('lurah.pengaduan.show', $pengaduan)->with('success', 'Status laporan berhasil difinalisasi!');
    }

    /**
     * Menyimpan tanggapan baru dari Lurah.
     */
    public function storeTanggapan(Request $request, Pengaduan $pengaduan): RedirectResponse
    {
        // 1. Otorisasi
        if (Auth::user()->role !== 'lurah') {
            abort(403, 'Anda tidak berhak memberikan tanggapan.');
        }

        // 2. Validasi Input
        $validated = $request->validate([
            'isi_tanggapan' => 'required|string|max:1000',
        ]);

        // 3. Buat Tanggapan
        $pengaduan->tanggapans()->create([
            'user_id' => Auth::id(), // ID Lurah yang sedang login
            'isi_tanggapan' => $validated['isi_tanggapan'],
            'is_private' => false, // Tanggapan Lurah umumnya publik
        ]);

        // 4. Redirect kembali
        return back()->with('success', 'Tanggapan resmi Lurah berhasil ditambahkan!');
    }
}
