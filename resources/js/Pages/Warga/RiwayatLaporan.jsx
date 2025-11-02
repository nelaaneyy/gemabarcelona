// resources/js/Components/RiwayatLaporan.jsx

import { Link } from '@inertiajs/react';

// --- Komponen Kartu Laporan (Internal untuk RiwayatLaporan) ---
const LaporanCard = ({ laporan }) => {
    const fotoUrl = laporan.foto ? `/storage/${laporan.foto}` : 'https://via.placeholder.com/150/CBD5E0/FFFFFF?text=GEMA';

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-200">
            <div className="w-1/3 flex-shrink-0">
                <img
                    src={fotoUrl}
                    alt={laporan.judul}
                    className="w-full h-32 sm:h-40 object-cover"
                />
            </div>
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
                     <p className="text-xs text-gray-400 mt-2">
                        Dilaporkan: {new Date(laporan.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                </div>
                <div className="text-right mt-3">
                    <Link
                        href={route('warga.pengaduan.show', laporan.id)}
                        className="px-3 py-1.5 bg-green-700 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-green-600 transition-colors shadow-sm"
                    >
                        Lihat
                    </Link>
                </div>
            </div>
        </div>
    );
};

// --- Komponen Utama RiwayatLaporan ---
// Menerima 'pengaduans' sebagai prop
export default function RiwayatLaporan({ pengaduans = [] }) {
    return (
        <div className="space-y-6">
            {/* Logika untuk menampilkan daftar atau pesan kosong */}
            {pengaduans.length > 0 ? (
                pengaduans.map((laporan) => (
                    <LaporanCard key={laporan.id} laporan={laporan} />
                ))
            ) : (
                <div className="text-center bg-white shadow-sm rounded-lg py-20">
                    <h3 className="text-xl font-semibold text-gray-700">Anda belum membuat laporan apapun.</h3>
                    <p className="text-gray-500 mt-2">Klik tombol "Buat Laporan" untuk memulai.</p>
                </div>
            )}
        </div>
    );
}