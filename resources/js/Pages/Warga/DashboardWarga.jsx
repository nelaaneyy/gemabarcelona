import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import RiwayatLaporan from './RiwayatLaporan';

const LaporanCard = ({ laporan }) => {
    // Path foto
    const fotoUrl = laporan.foto ? `/storage/${laporan.foto}` : 'https://via.placeholder.com/150/22543D/FFFFFF?text=GEMA';

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-200">
            {/* Bagian Gambar */}
            <div className="w-1/3">
                <img
                    src={fotoUrl}
                    alt={laporan.judul}
                    className="w-full h-32 sm:h-40 object-cover"
                />
            </div>

            {/* Info Laporan */}
            <div className="w-2/3 p-4 sm:p-5 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                        {laporan.judul}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Status:
                        <span className={`font-medium ml-2 px-2 py-0.5 rounded-full text-xs
                            ${laporan.status === 'BARU' ? 'bg-blue-100 text-blue-800' : ''}
                            ${laporan.status === 'DIPROSES_RT' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${laporan.status === 'SELESAI' ? 'bg-green-100 text-green-800' : ''}
                            ${laporan.status === 'DITOLAK' ? 'bg-red-100 text-red-800' : ''}
                        `}>
                            {laporan.status.replace('_', ' ')}
                        </span>
                    </p>
                </div>

                {/* Tombol Lihat */}
                <div className="text-right mt-4">
                    <Link
                        href={route('warga.pengaduan.show', laporan.id)}
                        className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-md hover:bg-green-600 transition-colors shadow-sm"
                    >
                        Lihat
                    </Link>
                </div>
            </div>
        </div>
    );
};

const GreenButton = ({ href, children, active = false }) => (
    <Link
        href={href}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
            ${active
                ? 'bg-green-800 text-white shadow-sm'
                : 'bg-white text-green-800 border border-green-800 hover:bg-green-50 dark:bg-green-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600'
            }
        `}
    >
        {children}
    </Link>
);

export default function DashboardWarga() {
    const { auth, pengaduans, flash } = usePage().props;
    const successMessage = flash?.success;
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Warga" />

            {/* Area Konten Utama di luar header */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Pesan Sukses */}
                    {successMessage && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative" role="alert">
                            <span className="block sm:inline">{successMessage}</span>
                        </div>
                    )}

                    {/* "Hai, [User]!"*/}
                    <h1 className="text-4xl font-bold text-gray-900">
                        Hai, {auth.user.name.split(' ')[0]}!
                    </h1>
                    <hr className="my-4 border-gray-300 dark:border-gray-700" />

                    
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Ayo laporkan!!
                        </h2>
                        <div className="flex space-x-2">
                            <GreenButton 
                            href={route('warga.pengaduan.create')}>
                                Buat Laporan
                            </GreenButton>
                            <GreenButton href={route('warga.riwayat')} 
                            active={route().current('warga.riwayat')}>
                                Riwayat Laporan
                            </GreenButton>
                        </div>
                    </div>

                    {/* Daftar Laporan */}
                    <div className="space-y-6">
                        {pengaduans.length > 0 ? (
                            pengaduans.map((laporan) => (
                                <LaporanCard key={laporan.id} laporan={laporan} />
                            ))
                        ) : (
                            <div className="text-center bg-white dark:bg-gray-800 shadow-sm rounded-lg py-20">
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Anda belum membuat laporan apapun.</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Klik tombol "Buat Laporan" untuk memulai.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}