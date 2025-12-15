<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update the ENUM definition to include 'DIPROSES_LURAH' and other missing statuses
        DB::statement("ALTER TABLE pengaduans MODIFY COLUMN status ENUM('BARU', 'DIPROSES_RT', 'DITERUSKAN_LURAH', 'DIPROSES_LURAH', 'SELESAI', 'DITOLAK', 'pending', 'diproses') DEFAULT 'BARU'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert to a safe subset if needed, though usually expanding an enum is safe to keep.
        // We will just strictly revert to the previous known state for correctness.
        DB::statement("ALTER TABLE pengaduans MODIFY COLUMN status ENUM('BARU', 'DIPROSES_RT', 'DITERUSKAN_LURAH', 'SELESAI', 'DITOLAK', 'pending', 'diproses') DEFAULT 'BARU'");
    }
};
