// resources/js/Pages/Warga/RiwayatIndex.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import RiwayatLaporan from '@/Pages/Warga/RiwayatLaporan';

export default function RiwayatIndex() {
    const { auth, pengaduans } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Riwayat Laporan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Header Halaman Riwayat */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-0">
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">
                                Riwayat Laporan
                            </h1>
                            <p className="mt-1 text-gray-400">
                                Pantau status semua laporan Infrastruktur yang pernah Anda buat.
                            </p>
                        </div>
                        <Link
                            href={route('warga.dashboard')}
                            className="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                        >
                            &larr; Kembali ke Dashboard
                        </Link>
                    </div>

                    <RiwayatLaporan pengaduans={pengaduans} />

                </div>
            </div>
        </AuthenticatedLayout>
    );
}