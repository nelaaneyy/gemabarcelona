// resources/js/Pages/Warga/PengaduanSuccess.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// --- HAPUS 'usePage' DARI SINI ---
import { Head, Link } from '@inertiajs/react';

// --- Ikon Centang (Check Circle) ---
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-green-600 animate-pop-in">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// --- TERIMA 'auth' SEBAGAI PROP, BUKAN DARI usePage ---
export default function PengaduanSuccess({ auth, pengaduan }) {
    // --- HAPUS BARIS usePage DARI SINI ---
    // const { auth, pengaduan } = usePage().props;

    return (
        // Panggil layout dengan auth.user (Ini sudah benar)
        <AuthenticatedLayout user={auth.user}>
            <Head title="Laporan Berhasil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Card Putih untuk konten */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Konten ditengahkan */}
                        <div className="p-10 md:p-16 flex flex-col items-center text-center">

                            {/* Ikon Centang */}
                            <CheckCircleIcon />

                            {/* Pesan Sukses */}
                            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
                                Laporan anda berhasil!
                            </h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                terimakasih!
                            </p>

                            {/* Tombol Aksi */}
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                                {/* Tombol Lacak Proses */}
                                <Link
                                    // TODO: Arahkan ke halaman detail laporan nanti
                                    href="{route('warga.pengaduan.show', laporan.id)}" // Untuk sementara
                                    className="px-6 py-3 bg-green-800 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                >
                                    Lacak Proses
                                </Link>

                                {/* Tombol Kembali ke Menu Utama */}
                                <Link
                                    href={route('warga.dashboard')}
                                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                                >
                                    Kembali ke Menu Utama
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}