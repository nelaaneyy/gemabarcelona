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
    /**
     * Menampilkan view untuk membuat pengaduan baru.
     */
    public function create(): Response
    {
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
            'no_hp' => 'nullable|string|max:20',
            'alamat_kejadian' => 'required|string',
            'tanggal_kejadian' => 'required|date',
            'is_urgent' => 'required|boolean',
        ]);

        // 2. Handle File Upload
        $fotoPath = null;
        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('pengaduan', 'public');
        }

        // 3. Simpan ke Database
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

        // 4. Redirect ke halaman sukses
        return redirect()->route('warga.pengaduan.success', ['pengaduan' => $newPengaduan->id]);
    }

    /**
     * Menampilkan halaman sukses setelah pengaduan.
     */
    public function success(Pengaduan $pengaduan): Response
    {
        return Inertia::render('Warga/PengaduanSuccess', [
            'pengaduan' => $pengaduan,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    /**
     * Menampilkan detail satu laporan (show) milik Warga.
     * Menggunakan Route Model Binding ($pengaduan).
     */
    public function show(Pengaduan $pengaduan): Response
    {
        // 1. Otorisasi: Pastikan laporan ini milik user yang sedang login (Warga)
        if ($pengaduan->user_id !== Auth::id()) {
            abort(403, 'Akses Ditolak');
        }

        // 2. Memuat Tanggapan PUBLIK yang relevan
        $pengaduan->load([
            'tanggapans' => function ($query) {
                // Muat tanggapan yang is_private = false, beserta user (RT) yang membuatnya
                $query->where('is_private', false)->with('user:id,nomor_rt');
            }
        ]);

        // Asumsi: View frontend sudah diganti menjadi PengaduanShowWarga
        return Inertia::render('Warga/PengaduanShowWarga', [
            'pengaduan' => $pengaduan,
            'tanggapans' => $pengaduan->tanggapans, // Kirim tanggapan publik
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    /**
     * Menampilkan daftar riwayat (semua laporan) yang pernah dibuat oleh Warga.
     */
    public function riwayat(): Response
    {
        // KOREKSI: Hapus where('status', 'SELESAI') agar menampilkan SEMUA riwayat
        $pengaduans = Auth::user()
            ->pengaduans()
            ->latest() // Urutkan dari yang terbaru
            ->get();

        // Render halaman React baru 'Warga/RiwayatIndex.jsx' (sesuai nama folder/file Anda)
        return Inertia::render('Warga/Riwayat/RiwayatIndex', [
            'pengaduans' => $pengaduans,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
}
