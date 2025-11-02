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
            $table->string('nama_pelapor')->after('user_id');
            $table->string('no_hp', 20)->nullable()->after('nama_pelapor'); // No HP bisa opsional
            $table->text('alamat_kejadian')->after('no_hp'); // Alamat kejadian/laporan
            $table->timestamp('tanggal_kejadian')->nullable()->after('alamat_kejadian'); // Tanggal kejadian bisa opsional
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengaduans', function (Blueprint $table) {
            $table->dropColumn(['nama_pelapor', 'no_hp', 'alamat_kejadian', 'tanggal_kejadian']);
        });
    }
};
