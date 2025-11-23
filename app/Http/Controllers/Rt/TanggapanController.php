<?php

namespace App\Http\Controllers\Rt;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class TanggapanController extends Controller
{
    public function store(Request $request, Pengaduan $laporan): RedirectResponse
    {
        // 1. Otorisasi (Memastikan RT berhak menanggapi laporan ini)
        $laporan->load('user:id,nomor_rt');

        if (!$laporan->user || $laporan->user->nomor_rt !== Auth::user()->nomor_rt) {
            abort(403, 'Anda tidak berhak memberikan tanggapan pada laporan ini.');
        }

        // 2. Validasi Input
        $validated = $request->validate([
            'isi_tanggapan' => 'required|string|max:1000',
            // is_private tidak wajib ada di request, tapi jika ada, harus boolean.
            'is_private' => 'nullable|boolean',
        ]);

        // 3. Buat Tanggapan melalui relasi
        $laporan->tanggapans()->create([
            'user_id' => Auth::id(), // ID RT yang sedang login
            'isi_tanggapan' => $validated['isi_tanggapan'],
            'is_private' => $request->boolean('is_private'), // Mengambil nilai boolean
        ]);

        // 4. Redirect kembali ke halaman detail laporan dengan pesan sukses
        return back()->with('success', 'Catatan/Tanggapan berhasil ditambahkan!');
    }
}
