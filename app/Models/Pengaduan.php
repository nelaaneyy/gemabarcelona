<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pengaduan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    // --- TAMBAHKAN ARRAY INI ---
    protected $fillable = [
        'judul',
        'isi_laporan',
        'foto',
        'status',
        'nama_pelapor',
        'no_hp',
        'alamat_kejadian',
        'tanggal_kejadian',
        // 'user_id' atau 'warga_id' TIDAK PERLU di sini
        // karena kita mengisinya via relasi Auth::user()->pengaduans()
    ];
    // --- BATAS TAMBAHAN ---


    // --- PASTIKAN RELASI KE USER ADA ---
    /**
     * Get the user that owns the pengaduan.
     */
    public function user()
    {
        // Ganti User::class jika model wargamu bukan User
        // Ganti 'user_id' jika foreign key-nya beda
        return $this->belongsTo(User::class, 'user_id'); 
    }
}
