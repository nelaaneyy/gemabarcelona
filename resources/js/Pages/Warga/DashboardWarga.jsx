import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import RiwayatLaporan from './RiwayatLaporan';

const LaporanCard = ({ laporan }) => {
    // Path foto
    const fotoUrl = laporan.foto ? `/storage/${laporan.foto}` : 'https://via.placeholder.com/150/22543D/FFFFFF?text=GEMA';

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden flex transform transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/20 hover:-translate-y-1 border border-white/10 group">
            {/* Bagian Gambar */}
            <div className="w-1/3 relative overflow-hidden">
                <img
                    src={fotoUrl}
                    alt={laporan.judul}
                    className="w-full h-32 sm:h-40 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            </div>

            {/* Info Laporan */}
            <div className="w-2/3 p-4 sm:p-5 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
                        {laporan.judul}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2 flex items-center">
                        Status:
                        <span className={`font-bold ml-2 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider
                            ${laporan.status === 'BARU' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50' : ''}
                            ${laporan.status === 'DIPROSES_RT' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50' : ''}
                            ${laporan.status === 'SELESAI' ? 'bg-green-500/20 text-green-300 border border-green-500/50' : ''}
                            ${laporan.status === 'DITOLAK' ? 'bg-red-500/20 text-red-300 border border-red-500/50' : ''}
                        `}>
                            {laporan.status.replace('_', ' ')}
                        </span>
                    </p>
                </div>

                {/* Tombol Lihat */}
                <div className="text-right mt-4">
                    <Link
                        href={route('warga.pengaduan.show', laporan.id)}
                        className="inline-flex items-center text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
                    >
                        Lihat detail <span className="ml-1">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const GreenButton = ({ href, children, active = false }) => (
    <Link
        href={href}
        className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-300 shadow-lg transform hover:-translate-y-0.5
            ${active
                ? 'bg-transparent border border-green-500 text-green-400 shadow-green-900/50'
                : 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-green-900/50 hover:from-green-500 hover:to-green-400'
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
                        <div className="mb-8 bg-green-500/10 border border-green-500/50 text-green-300 px-6 py-4 rounded-2xl relative shadow-lg backdrop-blur-sm animate-fadeIn" role="alert">
                            <span className="block sm:inline font-medium flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {successMessage}
                            </span>
                        </div>
                    )}

                    {/* "Hai, [User]!"*/}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                            Hai, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">{auth.user.name.split(' ')[0]}</span>! 👋
                        </h1>
                        <p className="text-gray-400 text-lg">Selamat datang kembali di GEMA. Mari buat lingkungan kita lebih baik.</p>
                    </div>


                    <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4 border-b border-white/10 pb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">
                                Aktivitas Anda
                            </h2>
                            <p className="text-sm text-gray-500">Pantau laporan yang telah Anda buat.</p>
                        </div>
                        <div className="flex space-x-3">
                            <GreenButton
                                href={route('warga.pengaduan.create')}>
                                + Buat Laporan
                            </GreenButton>
                            <GreenButton href={route('warga.riwayat')}
                                active={route().current('warga.riwayat')}>
                                Riwayat Lengkap
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
                            <div className="text-center bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl py-24 px-6">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Belum ada laporan</h3>
                                <p className="text-gray-400 max-w-md mx-auto mb-8">Anda belum membuat laporan apapun. Jadilah inisiator perubahan di lingkungan Anda sekarang.</p>
                                <Link
                                    href={route('warga.pengaduan.create')}
                                    className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Mulai Melapor
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
