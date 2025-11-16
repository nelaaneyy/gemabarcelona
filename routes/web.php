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

        Route::get('/pengaduan/{pengaduan}', [RtPengaduanController::class, 'show'])->name('pengaduan.show');
        Route::patch('/pengaduan/{pengaduan}/status', [RtPengaduanController::class, 'updateStatus'])->name('pengaduan.updateStatus');
    });

        Route::middleware('role:lurah')->prefix('lurah')->name('lurah.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'lurah'])->name('dashboard');
        Route::get('/pengaduan/{pengaduan}', [LurahPengaduanController::class, 'show'])->name('pengaduan.show');
    });
    });
});
require __DIR__.'/auth.php';
