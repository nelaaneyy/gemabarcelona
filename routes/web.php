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


Route::get('/', [RegisteredUserController::class,'create'])
    ->middleware('guest')
    ->name('register.show');
// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', [DashboardRedirectController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/verify-email', [EmailVerificationPromptController::class, '__invoke'])
    ->middleware(['auth'])
    ->name('verification.notice');


    Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('/profile/deactivate', [ProfileController::class, 'deactivate'])->name('profile.deactivate');
    Route::middleware(['verified'])->group(function () {


    Route::middleware('role:warga')->prefix('warga')->name('warga.')->group(function(){
        Route::get('/dashboard',[DashboardController::class, 'warga'])->name('dashboard');
        Route::get('/pengaduan/buat', [PengaduanController::class, 'create'])->name('pengaduan.create');
        Route::post('/pengaduan', [PengaduanController::class, 'store'])->name('pengaduan.store');

        Route::get('/pengaduan/sukses/{pengaduan}', [PengaduanController::class, 'success'])->name('pengaduan.success');
        Route::get('/pengaduan/{pengaduan}', [PengaduanController::class, 'show'])->name('pengaduan.show');
        Route::get('/riwayat', [PengaduanController::class, 'riwayat'])->name('riwayat');
    });

    Route::middleware('role:rt')->prefix('rt')->name('rt.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'rt'])->name('dashboard');

        Route::get('/laporan/{laporan}', [RtPengaduanController::class, 'show'])->name('laporan.show');

        Route::patch('/laporan/{laporan}/proses', [RtPengaduanController::class, 'updateStatus'])->name('laporan.proses');

        Route::post('/laporan/{laporan}/tanggapan', [TanggapanController::class, 'store'])->name('laporan.tanggapan.store');
    });

        Route::middleware('role:lurah')->prefix('lurah')->name('lurah.')->group(function () {
     Route::get('/dashboard', [DashboardController::class, 'lurah'])->name('dashboard');

    // Rute Detail
    Route::get('/pengaduan/{pengaduan}', [LurahPengaduanController::class, 'show'])->name('pengaduan.show');

    // Rute Update Status (Selesai/Ditolak)
    Route::patch('/pengaduan/{pengaduan}/proses', [LurahPengaduanController::class, 'updateStatus'])->name('pengaduan.updateStatus');

    // Rute Tambah Tanggapan
    Route::post('/pengaduan/{pengaduan}/tanggapan', [LurahPengaduanController::class, 'storeTanggapan'])->name('pengaduan.tanggapan.store');
    });

    Route::post('/laporan/{laporan}/tanggapan', [TanggapanController::class, 'store'])->name('laporan.tanggapan.store');
    });
});
require __DIR__.'/auth.php';
