// resources/js/Pages/Warga/RiwayatIndex.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
// Import komponen RiwayatLaporan
import RiwayatLaporan from '@/Pages/Warga/RiwayatLaporan'; // Sesuaikan path jika RiwayatLaporan ada di Pages/Warga

export default function RiwayatIndex() {
    // Ambil data 'auth' dan 'pengaduans' dari props
    const { auth, pengaduans } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Riwayat Laporan" />

            <div className="py-12 bg-gray-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Header Halaman Riwayat */}
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Riwayat Laporan Anda
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Pantau status semua laporan yang pernah Anda buat.
                            </p>
                        </div>
                        {/* Tombol kembali ke Dashboard (Opsional) */}
                        <Link
                            href={route('warga.dashboard')}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Kembali ke Dashboard
                        </Link>
                    </div>

                    {/* Gunakan komponen RiwayatLaporan untuk menampilkan daftar */}
                    <RiwayatLaporan pengaduans={pengaduans} />

                </div>
            </div>
        </AuthenticatedLayout>
    );
}