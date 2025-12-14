<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tanggapan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pengaduan_id',
        'isi_tanggapan',
        'is_private',
    ];

    protected $casts = [
        'is_private' => 'boolean',
    ];

    // Relasi: tanggapan ini milik 1 user (RT / Lurah / Warga)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relasi: tanggapan ini milik 1 pengaduan
    public function pengaduan()
    {
        return $this->belongsTo(Pengaduan::class, 'pengaduan_id');
    }
}
