// resources/js/Pages/Warga/PengaduanShow.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function PengaduanShow() {
    // Ambil data 'auth' (dari middleware) dan 'pengaduan' (dari controller)
    const { auth, pengaduan } = usePage().props;

    // Format tanggal agar lebih mudah dibaca (misal: "28 Oktober 2025")
    const formattedTanggalKejadian = new Date(pengaduan.tanggal_kejadian).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
    const formattedTanggalLapor = new Date(pengaduan.created_at).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    // Tentukan path foto
    const fotoUrl = pengaduan.foto ? `/storage/${pengaduan.foto}` : 'https://via.placeholder.com/600x400/E5E7EB/9CA3AF?text=Tidak+Ada+Foto';

    // Styling untuk status badge
    let statusBgColor = 'bg-gray-100 text-gray-800'; // Default
    if (pengaduan.status === 'BARU') statusBgColor = 'bg-blue-100 text-blue-800';
    if (pengaduan.status === 'DIPROSES_RT') statusBgColor = 'bg-yellow-100 text-yellow-800';
    if (pengaduan.status === 'SELESAI') statusBgColor = 'bg-green-100 text-green-800';
    if (pengaduan.status === 'DITOLAK') statusBgColor = 'bg-red-100 text-red-800';

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Detail Laporan: ${pengaduan.judul}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Card Putih untuk membungkus detail */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        {/* Header Halaman Detail */}
                        <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-300">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-900">
                                Lacak Proses
                            </h2>
                            <p className="mt-1 text-sm text-gray-900 dark:text-gray-900">
                                Detail laporan pengaduan Anda.
                            </p>
                        </div>

                        {/* Konten Detail */}
                        <div className="p-6 sm:p-8">
                            {/* Gambar Laporan */}
                            <div className="mb-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-300">
                                <img src={fotoUrl} alt={`Foto ${pengaduan.judul}`} className="w-full h-auto object-contain max-h-96 bg-gray-50 dark:bg-gray-300" />
                            </div>

                            {/* Detail Teks */}
                            <div className="space-y-4">
                                {/* Judul */}
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-800">{pengaduan.judul}</h3>

                                {/* Status Badge */}
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBgColor}`}>
                                        Status: {pengaduan.status.replace('_', ' ')}
                                    </span>
                                </div>

                                {/* Detail Lainnya dalam bentuk list */}
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                                    <div className="sm:col-span-1">
                                        <dt className="font-medium text-gray-700 dark:text-gray-700">Nama Pelapor</dt>
                                        <dd className="mt-1 text-gray-900 dark:text-gray-500">{pengaduan.nama_pelapor}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="font-medium text-gray-700 dark:text-gray-700">Tanggal Kejadian</dt>
                                        <dd className="mt-1 text-gray-900 dark:text-gray-500">{formattedTanggalKejadian}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="font-medium text-gray-700 dark:text-gray-700">No. HP</dt>
                                        <dd className="mt-1 text-gray-900 dark:text-gray-500">{pengaduan.no_hp || '-'}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="font-medium text-gray-700 dark:text-gray-700">Tanggal Lapor</dt>
                                        <dd className="mt-1 text-gray-900 dark:text-gray-500">{formattedTanggalLapor}</dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dt className="font-medium text-gray-700 dark:text-gray-700">Alamat Kejadian</dt>
                                        <dd className="mt-1 text-gray-900 dark:text-gray-500">{pengaduan.alamat_kejadian}</dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dt className="font-medium text-gray-700 dark:text-gray-700">Deskripsi</dt>
                                        <dd className="mt-1 text-gray-900 dark:text-gray-500 whitespace-pre-wrap">{pengaduan.isi_laporan}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Tombol Kembali */}
                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-300 text-right">
                                <Link
                                    href={route('warga.dashboard')}
                                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-green-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-500"
                                >
                                    Kembali ke Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
