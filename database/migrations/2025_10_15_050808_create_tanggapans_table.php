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
        Schema::create('tanggapans', function (Blueprint $table) {
    $table->id();

    // Foreign Key ke tabel pengaduans
    $table->foreignId('pengaduan_id')->constrained('pengaduans')->onDelete('cascade');

    // Foreign Key ke tabel users (user RT yang memberikan tanggapan)
    $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

    $table->text('isi_tanggapan'); // Konten tanggapan

    // Flag untuk menandai apakah tanggapan ini penting (misalnya, resolusi final)
    $table->boolean('is_private')->default(false);

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tanggapans');
    }
};
