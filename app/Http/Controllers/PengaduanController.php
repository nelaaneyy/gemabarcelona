<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia; 
use Inertia\Response;

class PengaduanController extends Controller
{
    public function create(): Response
    {
        // Arahkan ke halaman React 'resources/js/Pages/Warga/PengaduanCreate.jsx'
        return Inertia::render('Warga/PengaduanCreate', [
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
        
        
    }

    /**
     * Menyimpan pengaduan baru ke database.
     */
    public function store(Request $request): RedirectResponse
    {
        // 1. Validasi data
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi_laporan' => 'required|string',
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'nama_pelapor' => 'required|string|max:255',
            'no_hp' => 'nullable|string|max:20', // Opsional
            'alamat_kejadian' => 'required|string',
            'tanggal_kejadian' => 'required|date', 
            'is_urgent' => 'required|boolean',
        ]);


        // 2. Handle File Upload
        $fotoPath = null;
        if ($request->hasFile('foto')) {
            // Simpan foto di 'storage/app/public/pengaduan'
            // 'pengaduan' adalah nama folder baru di dalam 'public'
            $fotoPath = $request->file('foto')->store('pengaduan', 'public');
        }

        // 3. Simpan ke Database menggunakan relasi
        // Ini otomatis mengisi 'user_id' (warga_id) dengan ID user yang sedang login
        $newPengaduan = Auth::user()->pengaduans()->create([
            'judul' => $request->judul,
            'isi_laporan' => $request->isi_laporan,
            'foto' => $fotoPath,
            'status' => 'BARU',
            'nama_pelapor' => $request->nama_pelapor,
            'no_hp' => $request->no_hp,
            'alamat_kejadian' => $request->alamat_kejadian,
            'tanggal_kejadian' => $request->tanggal_kejadian,
            'is_urgent' => $request->is_urgent,
        ]);

        // 4. Redirect kembali ke dashboard warga dengan pesan sukses
        return redirect()->route('warga.pengaduan.success', ['pengaduan' => $newPengaduan->id]);
    }

    public function success(Pengaduan $pengaduan): Response{
        return Inertia::render('Warga/PengaduanSuccess', [
            'pengaduan' => $pengaduan,
             'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function show(Pengaduan $pengaduan): Response{
        if ($pengaduan->user_id !== Auth::id()) {
            abort(403, 'Akses Ditolak'); // Tampilkan error jika bukan pemilik
        }

        // Render halaman React 'Warga/PengaduanShow.jsx'
        // Kirim data 'pengaduan' yang spesifik ini ke frontend
        return Inertia::render('Warga/PengaduanShow', [
            'pengaduan' => $pengaduan,
            'auth' => [
                'user' => Auth::user(),
            ],
        
        ]); 
    }

    public function riwayat(): Response{
    $pengaduans = Auth::user()
                    ->pengaduans() // Ambil relasi pengaduans
                    ->where('status', 'SELESAI') // <-- TAMBAHKAN FILTER INI
                    ->latest() // Urutkan dari yang terbaru
                    ->get(); // Ambil hasilnya
        // 2. Render halaman React baru 'Warga/RiwayatIndex.jsx'
        //    Kirim data 'pengaduans'
        return Inertia::render('Warga/Riwayat/RiwayatIndex', [
            'pengaduans' => $pengaduans,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
}
