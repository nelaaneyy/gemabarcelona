<?php

namespace App\Http\Controllers\Lurah;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PengaduanController extends Controller
{
    public function show(Pengaduan $pengaduan): Response
    {
        // 1. Otorisasi: Lurah bisa melihat semua,
        //    tapi mungkin kita batasi hanya yang 'DITERUSKAN_LURAH'?
        //    Untuk saat ini, kita izinkan Lurah melihat semua detail.
        
        // 2. Load relasi yang dibutuhkan
        $pengaduan->load('user:id,name,nomor_rt'); 

        // 3. Render halaman React 'Lurah/PengaduanShowLurah.jsx'
        return Inertia::render('Lurah/PengaduanShowLurah', [
            'pengaduan' => $pengaduan,
            'auth' => [ 
                'user' => Auth::user(),
            ],
        ]);
    }
}
