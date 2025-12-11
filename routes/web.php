<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\DashboardRedirectController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PengaduanController;
use App\Http\Controllers\Rt\PengaduanController as RtPengaduanController;
use App\Http\Controllers\Lurah\PengaduanController as LurahPengaduanController;
use App\Http\Controllers\Rt\TanggapanController;

use Inertia\Inertia;



// Halaman Beranda (Landing Page) - Inertia/React HomePage
Route::get('/', function () {
    return Inertia::render('HomePage');
})->name('homepage');

// Rute Redirect Dashboard (setelah login)
Route::get('/dashboard', [DashboardRedirectController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Rute Verifikasi Email
Route::get('/verify-email', [EmailVerificationPromptController::class, '__invoke'])
    ->middleware(['auth'])
    ->name('verification.notice');


// --- RUTE AUTHENTICATED (Memerlukan login) ---

Route::middleware('auth')->group(function () {

    // Rute Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('/profile/deactivate', [ProfileController::class, 'deactivate'])->name('profile.deactivate');

    // Rute yang memerlukan Verifikasi Email
    Route::middleware(['verified'])->group(function () {

        // --- RUTE WARGA (Role: warga) ---
        Route::middleware('role:warga')->prefix('warga')->name('warga.')->group(function(){
            Route::get('/dashboard',[DashboardController::class, 'warga'])->name('dashboard');

            // Pengaduan Warga
            Route::get('/pengaduan/buat', [PengaduanController::class, 'create'])->name('pengaduan.create');
            Route::post('/pengaduan', [PengaduanController::class, 'store'])->name('pengaduan.store');
            Route::get('/pengaduan/sukses/{pengaduan}', [PengaduanController::class, 'success'])->name('pengaduan.success');
            Route::get('/pengaduan/{pengaduan}', [PengaduanController::class, 'show'])->name('pengaduan.show');
            Route::get('/riwayat', [PengaduanController::class, 'riwayat'])->name('riwayat');
        });

        // --- RUTE RT (Role: rt) ---
        Route::middleware('role:rt')->prefix('rt')->name('rt.')->group(function () {
            Route::get('/dashboard', [DashboardController::class, 'rt'])->name('dashboard');

            // Laporan/Pengaduan untuk RT
            Route::get('/laporan/{laporan}', [RtPengaduanController::class, 'show'])->name('laporan.show');
            Route::post('/laporan/{laporan}/proses', [RtPengaduanController::class, 'updateStatus'])->name('laporan.proses');

            // Tanggapan oleh RT
            Route::post('/laporan/{laporan}/tanggapan', [TanggapanController::class, 'store'])->name('laporan.tanggapan.store');
        });

        // --- RUTE LURAH (Role: lurah) ---
        Route::middleware('role:lurah')->prefix('lurah')->name('lurah.')->group(function () {
            Route::get('/dashboard', [DashboardController::class, 'lurah'])->name('dashboard');

            // Pengaduan untuk Lurah
            Route::get('/pengaduan/{pengaduan}', [LurahPengaduanController::class, 'show'])->name('pengaduan.show');
            Route::patch('/pengaduan/{pengaduan}/proses', [LurahPengaduanController::class, 'updateStatus'])->name('pengaduan.updateStatus');

            // Tanggapan oleh Lurah
            Route::post('/pengaduan/{pengaduan}/tanggapan', [LurahPengaduanController::class, 'storeTanggapan'])->name('pengaduan.tanggapan.store');
        });

    });
});

// Memuat rute Login, Register, Forgot Password, dll.
require __DIR__.'/auth.php';
