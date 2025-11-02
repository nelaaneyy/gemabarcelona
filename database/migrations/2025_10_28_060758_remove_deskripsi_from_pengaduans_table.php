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
        Schema::table('pengaduans', function (Blueprint $table) {
            Schema::table('pengaduans', function (Blueprint $table) {
            $table->dropColumn('deskripsi'); // Hapus kolom deskripsi
        });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengaduans', function (Blueprint $table) {
            // Untuk rollback, tambahkan kembali (sesuaikan tipe data jika perlu)
            $table->text('deskripsi')->after('isi_laporan');
        });
    }
};
