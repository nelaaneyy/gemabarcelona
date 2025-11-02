<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tanggapan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'judul',
        'deskripsi',
        'kategori',
        'foto',
        'status',
        'handled_by',
    ];

    // Relasi: laporan ini milik 1 user (warga)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relasi: laporan bisa punya banyak tanggapan
    public function tanggapans()
    {
        return $this->hasMany(Tanggapan::class);
    }

    // Relasi: laporan bisa ditangani oleh user lain (RT / Lurah)
    public function handler()
    {
        return $this->belongsTo(User::class, 'handled_by');
    }
}
