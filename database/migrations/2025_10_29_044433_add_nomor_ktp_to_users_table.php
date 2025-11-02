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
            if (!Schema::hasColumn('users', 'nomor_ktp')) {
            Schema::table('users', function (Blueprint $table) {
                // Tambahkan kolom nomor_ktp
                // Sesuaikan 'after' jika perlu, misal setelah 'alamat'
                $table->string('nomor_ktp', 20)->nullable()->unique()->after('alamat'); 
            });
        }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'nomor_ktp')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropUnique(['nomor_ktp']); // Hapus index unique dulu
                $table->dropColumn('nomor_ktp'); // Hapus kolomnya
            });
        }
        });
    }
};
