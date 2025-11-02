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
        Schema::table('users', function (Blueprint $table) {
            // Tambahkan 4 kolom baru setelah kolom 'role'
            // Kita pakai ->nullable() karena kolom ini opsional tergantung rolenya
            // (Lurah tidak punya nomor_rt, Warga tidak punya nama_kelurahan, dll)
            
            $table->string('nomor_rt')->nullable()->after('role');
            $table->string('nama_kelurahan')->nullable()->after('nomor_rt');
            $table->string('nomor_ktp', 20)->nullable()->unique()->after('alamat');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Ini untuk 'rollback' jika terjadi kesalahan
            $table->dropColumn(['nomor_rt', 'nama_kelurahan', 'nomor_ktp']);
        });
    }
};
