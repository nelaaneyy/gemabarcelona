<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['warga', 'rt', 'lurah'])->default('warga')->after('email');
            $table->string('nomor_rt', 10)->nullable()->after('role');
            $table->string('nama_kelurahan')->nullable()->after('nomor_rt');
            $table->text('alamat')->nullable()->after('nama_kelurahan');
            $table->string('nomor_ktp', 16)->nullable()->unique()->after('alamat');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'nomor_rt', 'nama_kelurahan', 'alamat', 'nomor_ktp']);
        });
    }
};
