<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // PERHATIAN: Alter table untuk ENUM seringkali membutuhkan RAW SQL
        // Kita tambahkan semua status yang mungkin digunakan
        DB::statement("ALTER TABLE pengaduans MODIFY COLUMN status ENUM('BARU', 'DIPROSES_RT', 'DITERUSKAN_LURAH', 'DIPROSES_LURAH', 'SELESAI', 'DITOLAK', 'pending', 'diproses') DEFAULT 'BARU'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Kembalikan ke set yang lebih terbatas jika rollback (Opsional: bisa dibiarkan atau disesuaikan)
        DB::statement("ALTER TABLE pengaduans MODIFY COLUMN status ENUM('pending', 'diproses', 'selesai') DEFAULT 'pending'");
    }
};
