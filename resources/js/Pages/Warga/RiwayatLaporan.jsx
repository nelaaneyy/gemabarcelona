// resources/js/Components/RiwayatLaporan.jsx

import { Link } from '@inertiajs/react';

// --- Komponen Kartu Laporan (Internal untuk RiwayatLaporan) ---
const LaporanCard = ({ laporan }) => {
    const fotoUrl = laporan.foto
        ? (laporan.foto.startsWith('http') ? laporan.foto : `/storage/${laporan.foto}`)
        : 'https://via.placeholder.com/150/CBD5E0/FFFFFF?text=GEMA';

    // Helper untuk status badge
    const getStatusStyle = (status) => {
        switch (status) {
            case 'BARU': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
            case 'DIPROSES_RT': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
            case 'DITERUSKAN_LURAH': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
            case 'SELESAI': return 'bg-green-500/20 text-green-300 border-green-500/50';
            case 'DITOLAK': return 'bg-red-500/20 text-red-300 border-red-500/50';
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
        }
    };

    return (
        <div className="bg-white/5 rounded-2xl shadow-lg hover:shadow-green-900/20 overflow-hidden flex flex-col sm:flex-row transform transition-all duration-300 hover:-translate-y-1 border border-white/10 group">
            <div className="w-full sm:w-1/3 flex-shrink-0 relative overflow-hidden">
                <img
                    src={fotoUrl}
                    alt={laporan.judul}
                    className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent sm:bg-gradient-to-r" />
            </div>
            <div className="w-full sm:w-2/3 p-5 sm:p-6 flex flex-col justify-between relative">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                            {laporan.judul}
                        </h3>
                        {laporan.is_urgent && (
                            <span className="flex-shrink-0 ml-2 px-2 py-1 bg-red-500/20 border border-red-500/50 text-red-400 text-[10px] font-bold uppercase tracking-wider rounded-md animate-pulse">
                                Mendesak
                            </span>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyle(laporan.status)}`}>
                            {laporan.status.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-gray-500 px-2 border-l border-white/10">
                            {new Date(laporan.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </div>

                    <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                        {laporan.isi_laporan}
                    </p>
                </div>

                <div className="text-right mt-2 pt-4 border-t border-white/5">
                    <Link
                        href={route('warga.pengaduan.show', laporan.id)}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg shadow-green-900/30"
                    >
                        Lihat Detail &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

// --- Komponen Utama RiwayatLaporan ---
export default function RiwayatLaporan({ pengaduans = [] }) {
    return (
        <div className="space-y-6">
            {pengaduans.length > 0 ? (
                pengaduans.map((laporan) => (
                    <LaporanCard key={laporan.id} laporan={laporan} />
                ))
            ) : (
                <div className="text-center bg-white/5 border border-white/10 rounded-3xl py-20 px-4">
                    <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                        <svg className="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Belum ada laporan</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">Anda belum pernah membuat laporan pengaduan infrastruktur sebelumnya.</p>
                    <Link href={route('warga.pengaduan.create')} className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                        Buat Laporan Baru
                    </Link>
                </div>
            )}
        </div>
    );
}