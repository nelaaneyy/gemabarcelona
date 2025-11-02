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
    public function show(Pengaduan $pengaduan): Response
    {
        // --- AUTHORIZATION: Pastikan laporan ini dari warga di wilayah RT ---
        $rtUser = Auth::user(); // User RT yang sedang login
        
        // Ambil data pengaduan beserta data user pembuatnya (warga)
        $pengaduan->load('user:id,name,nomor_rt'); // Load relasi user

        // Cek apakah nomor RT warga pembuat laporan SAMA dengan nomor RT user RT
        if (!$pengaduan->user || $pengaduan->user->nomor_rt !== $rtUser->nomor_rt) {
            abort(403, 'Anda tidak berhak mengakses laporan ini.'); // Tolak akses jika tidak cocok
        }
        // --- BATAS AUTHORIZATION ---

        // Render halaman React 'Rt/PengaduanShowRt.jsx'
        // Kirim data 'pengaduan' yang spesifik ini ke frontend
        return Inertia::render('Rt/PengaduanShowRt', [
            'pengaduan' => $pengaduan ,
            'auth' => [
                'user' => Auth::user(),
            ],
            // 'auth' dikirim otomatis oleh middleware
        ]);
    }

    public function updateStatus(Request $request, Pengaduan $pengaduan): RedirectResponse
    {
        // 1. Authorization (Sama seperti di show, pastikan RT berhak)
        $rtUser = Auth::user();
        
        // Cek dulu relasi user sebelum akses propertynya
        if (!$pengaduan->user || $pengaduan->user->nomor_rt !== $rtUser->nomor_rt) {
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
        $pengaduan->update(['status' => $validated['status']]);

        // 4. Redirect kembali ke halaman detail dengan pesan sukses
        // Kita gunakan 'back()' agar kembali ke halaman detail sebelumnya
        return back()->with('success', 'Status laporan berhasil diperbarui!');
        
    }
}
