import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import clsx from 'clsx';

// --- Card Statistik Modern ---
const StatCard = ({ label, value, colorClass = 'text-green-400' }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors shadow-lg group relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${colorClass}`}>
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 00-1-1H3zm6 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
        </div>
        <div className="relative z-10">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-4xl font-black ${colorClass} drop-shadow-sm`}>{value}</p>
        </div>
    </div>
);

// --- Card Laporan Modern ---
const LaporanCardLurah = ({ laporan }) => {
    const fotoUrl = laporan.foto ? `/storage/${laporan.foto}` : 'https://via.placeholder.com/150/22543D/FFFFFF?text=GEMA';

    const getStatusStyles = (status) => {
        switch (status) {
            case 'BARU': return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
            case 'DIPROSES_RT': return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
            case 'DITERUSKAN_LURAH': return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
            case 'SELESAI': return 'bg-green-500/20 text-green-300 border border-green-500/30';
            case 'DITOLAK': return 'bg-red-500/20 text-red-300 border border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col md:flex-row border border-white/10 hover:shadow-2xl hover:shadow-green-900/20 transition-all duration-300 hover:-translate-y-1 group">
            <div className="md:w-1/4 h-48 md:h-auto flex-shrink-0 relative overflow-hidden">
                <img
                    src={fotoUrl}
                    alt={laporan.judul}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 to-transparent"></div>
            </div>

            <div className="p-5 md:w-3/4 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
                            {laporan.judul}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${getStatusStyles(laporan.status)}`}>
                            {laporan.status.replace('_', ' ')}
                        </span>
                    </div>

                    <div className="flex flex-col gap-1 mt-2">
                        <p className="text-sm text-gray-300">
                            <span className="text-gray-500">Pelapor:</span> {laporan.user?.name ?? 'Warga'}
                            <span className="text-green-400 font-bold ml-1">(RT {laporan.user?.nomor_rt})</span>
                        </p>
                        <p className="text-xs text-gray-500 font-mono">
                            {new Date(laporan.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex justify-end">
                    <Link
                        href={route('lurah.pengaduan.show', laporan.id)}
                        className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-green-900/30 hover:from-green-500 hover:to-green-400 transition-all duration-200 transform group-hover:scale-105"
                    >
                        Tinjau Laporan &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default function DashboardLurah({ auth, stats, laporans }) {
    return (
        <AdminLayout user={auth.user}>
            <Head title="Dashboard Lurah" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                            Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Kelurahan</span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Selamat datang, <span className="text-white font-bold">{auth.user.name}</span>. Pantau aspirasi warga dari seluruh RT.
                        </p>
                    </div>

                    {/* Statistik */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                        <StatCard label="Total Laporan" value={stats.total} colorClass="text-blue-400" />
                        <StatCard label="Diproses RT" value={stats.diproses} colorClass="text-yellow-400" />
                        <StatCard label="Perlu Tindakan" value={stats.diteruskan} colorClass="text-purple-400" />
                        <StatCard label="Selesai" value={stats.selesai} colorClass="text-green-400" />
                        <StatCard label="Ditolak" value={stats.ditolak} colorClass="text-red-400" />
                    </div>

                    {/* Antrian Laporan (Hanya DITERUSKAN_LURAH) */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-white/5">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
                                Antrian Eskalasi <span className="ml-2 text-sm font-normal text-gray-500">({laporans.total} Laporan)</span>
                            </h2>
                        </div>

                        {laporans.data.length > 0 ? (
                            <div className="grid gap-4">
                                {laporans.data.map((laporan) => (
                                    <LaporanCardLurah key={laporan.id} laporan={laporan} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl py-24 px-6">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Semua Bersih!</h3>
                                <p className="text-gray-500">Tidak ada laporan yang menunggu tindak lanjut Lurah saat ini.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {laporans.links.length > 3 && (
                            <div className="pt-8 flex justify-center">
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1 flex space-x-1">
                                    {laporans.links.map((link, index) => (
                                        <button
                                            key={index}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true })}
                                            disabled={!link.url}
                                            className={clsx(
                                                'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
                                                link.active
                                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                                    : 'text-gray-400 hover:text-white hover:bg-white/10',
                                                !link.url && 'opacity-30 cursor-not-allowed'
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
