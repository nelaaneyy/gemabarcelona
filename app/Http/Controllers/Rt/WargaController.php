<?php

namespace App\Http\Controllers\Rt;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WargaController extends Controller
{
    /**
     * Tampilkan daftar warga.
     * Filter hanya warga yang nomor_rt nya sama dengan user RT yang sedang login (jika ada relasi).
     * Jika tidak ada kolom nomor_rt di user, tampilkan semua role 'warga'.
     */
    public function index()
    {
        $rt = Auth::user();
        
        $wargas = User::where('role', 'warga')
            ->when($rt->nomor_rt, function ($query, $nomor_rt) {
                return $query->where('nomor_rt', $nomor_rt);
            })
            ->latest()
            ->get();

        return Inertia::render('Rt/ManajemenWarga', [
            'wargas' => $wargas,
            'auth' => [
                'user' => $rt
            ]
        ]);
    }

    /**
     * Toggle status aktif/nonaktif warga.
     */
    public function toggleStatus(Request $request, User $user)
    {
        // Validasi: Pastikan user yang diedit adalah 'warga'
        if ($user->role !== 'warga') {
            abort(403, 'Tidak dapat mengubah status user selain warga.');
        }

        // Opsional: Validasi nomor RT match
        if (Auth::user()->nomor_rt && $user->nomor_rt !== Auth::user()->nomor_rt) {
             abort(403, 'Warga ini bukan anggota RT Anda.');
        }

        $validated = $request->validate([
            'is_active' => 'required|boolean', // Status BARU yang diinginkan
            'reason' => 'nullable|string|required_if:is_active,false', // Alasan wajib jika dinonaktifkan
        ]);

        $user->update([
            'is_active' => $validated['is_active'],
            'deactivation_reason' => $validated['is_active'] ? null : $validated['reason'], // Hapus alasan jika diaktifkan kembali
        ]);

        $message = $validated['is_active'] 
            ? 'Akun warga berhasil diaktifkan kembali.' 
            : 'Akun warga berhasil dinonaktifkan.';

        return back()->with('success', $message);
    }
}
