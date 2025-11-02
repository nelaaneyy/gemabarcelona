// resources/js/Pages/Rt/PengaduanShowRt.jsx
// Versi dengan 'auth' sebagai PROP (MANUAL)

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// Hapus usePage jika tidak butuh flash, tapi kita butuh flash
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function PengaduanShowRt({ auth, pengaduan }) { // Terima 'auth' sebagai prop

    // Ambil HANYA 'flash' dari usePage jika diperlukan
    const { flash } = usePage().props;

    // Setup useForm untuk update status
    const { data, setData, patch, processing, errors } = useForm({
        status: pengaduan.status,
    });

    // Handler untuk submit form
    const handleUpdateStatus = (e) => { // <-- 1. Ganti nama jadi 'handleUpdateStatus'
        e.preventDefault();

        // Buat URL secara manual (sudah benar)
        const url = `/rt/pengaduan/${pengaduan.id}/status`;

        // Panggil 'patch()' langsung ke URL yang benar
        patch(url, {
            preserveScroll: true,
        });
    };

    // Format tanggal
    const formattedTanggalKejadian = new Date(pengaduan.tanggal_kejadian).toLocaleDateString('id-ID', { dateStyle: 'long' });
    const formattedTanggalLapor = new Date(pengaduan.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' });

    // Path foto
    const fotoUrl = pengaduan.foto ? `/storage/${pengaduan.foto}` : 'https://via.placeholder.com/600x400/E5E7EB/9CA3AF?text=Tidak+Ada+Foto';

    // Styling status badge
    let statusBgColor = 'bg-gray-100 text-gray-800'; // Default
    if (pengaduan.status === 'BARU') statusBgColor = 'bg-blue-100 text-blue-800';
    if (pengaduan.status === 'DIPROSES_RT') statusBgColor = 'bg-yellow-100 text-yellow-800';
    if (pengaduan.status === 'DITERUSKAN_LURAH') statusBgColor = 'bg-purple-100 text-purple-800';
    if (pengaduan.status === 'SELESAI') statusBgColor = 'bg-green-100 text-green-800';
    if (pengaduan.status === 'DITOLAK') statusBgColor = 'bg-red-100 text-red-800';

    return (
        // Panggil layout dengan auth.user (Ini sudah benar)
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Detail Laporan: ${pengaduan.judul}`} />

            <div className="py-12 bg-gray-100">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        {/* Header Halaman Detail */}
                        <div className="p-6 sm:p-8 border-b border-gray-200 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Detail Laporan Masuk
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Laporan dari: {pengaduan.user?.name ?? 'Warga'} (RT {pengaduan.user?.nomor_rt ?? 'N/A'})
                                </p>
                            </div>
                            <Link
                                href={route('rt.dashboard')} // Tombol kembali ke Dashboard RT
                                className="text-sm text-indigo-600 hover:text-indigo-900"
                            >
                                &larr; Kembali ke Daftar Laporan
                            </Link>
                        </div>

                        {/* Konten Detail */}
                        <div className="p-6 sm:p-8">
                            {/* Tampilkan Flash Message Sukses */}
                            {flash?.success && ( // Gunakan ?. (optional chaining)
                                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                                    {flash.success}
                                </div>
                            )}

                            {/* Gambar Laporan */}
                            <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                                <img src={fotoUrl} alt={`Foto ${pengaduan.judul}`} className="w-full h-auto object-contain max-h-96 bg-gray-50" />
                            </div>

                            {/* Detail Teks */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-gray-800">{pengaduan.judul}</h3>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBgColor}`}>
                                        Status: {pengaduan.status.replace('_', ' ')}
                                    </span>
                                </div>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                                    <div className="sm:col-span-1">
                                        <dt className="font-medium text-gray-500">Nama Pelapor Asli</dt>
                                        <dd className="mt-1 text-gray-900">{pengaduan.nama_pelapor}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="font-medium text-gray-500">Tanggal Kejadian</dt>
                                        <dd className="mt-1 text-gray-900">{formattedTanggalKejadian}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="font-medium text-gray-500">No. HP</dt>
                                        <dd className="mt-1 text-gray-900">{pengaduan.no_hp || '-'}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="font-medium text-gray-500">Tanggal Lapor</dt>
                                        <dd className="mt-1 text-gray-900">{formattedTanggalLapor}</dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dt className="font-medium text-gray-500">Alamat Kejadian</dt>
                                        <dd className="mt-1 text-gray-900">{pengaduan.alamat_kejadian}</dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dt className="font-medium text-gray-500">Deskripsi</dt>
                                        <dd className="mt-1 text-gray-900 whitespace-pre-wrap">{pengaduan.isi_laporan}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* --- FORM AKSI RT (UBAH STATUS) --- */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">Aksi RT: Ubah Status Laporan</h4>
                                <form onSubmit={handleUpdateStatus}>
                                    <div className="flex items-end space-x-3">
                                        <div className="flex-grow">
                                            <InputLabel htmlFor="status" value="Status Baru" />
                                            <select
                                                id="status"
                                                name="status"
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value="BARU">Baru</option>
                                                <option value="DIPROSES_RT">Diproses RT</option>
                                                <option value="DITERUSKAN_LURAH">Diteruskan ke Lurah</option>
                                                <option value="SELESAI">Selesai</option>
                                                <option value="DITOLAK">Ditolak</option>
                                            </select>
                                            <InputError message={errors.status} className="mt-1 text-xs" />
                                        </div>
                                        <PrimaryButton
                                            className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 h-10"
                                            disabled={processing || data.status === pengaduan.status}
                                        >
                                            Update Status
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                            {/* --- BATAS FORM AKSI RT --- */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}