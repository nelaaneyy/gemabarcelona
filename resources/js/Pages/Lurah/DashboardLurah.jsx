import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

// --- Komponen Kartu Statistik (sesuai desain Figma) ---
const StatCard = ({ label, value, colorClass = 'bg-green-100 text-green-800' }) => (
    <div className={`p-4 rounded-lg shadow-sm ${colorClass}`}>
        <div className="text-sm font-medium uppercase tracking-wider">{label}</div>
        <div className="mt-1 text-3xl font-bold">{value}</div>
    </div>
);

// --- Komponen Badge Status ---
const StatusBadge = ({ status }) => {
    let colorClass = 'bg-gray-100 text-gray-800'; // Default
    if (status === 'BARU') colorClass = 'bg-blue-100 text-blue-800';
    if (status === 'DIPROSES_RT') colorClass = 'bg-yellow-100 text-yellow-800';
    if (status === 'DITERUSKAN_LURAH') colorClass = 'bg-purple-100 text-purple-800';
    if (status === 'SELESAI') colorClass = 'bg-green-100 text-green-800';
    if (status === 'DITOLAK') colorClass = 'bg-red-100 text-red-800';
    
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
            {status.replace('_', ' ')}
        </span>
    );
};

export default function DashboardLurah({ auth, stats, laporans }) { 
    // Terima props 'auth', 'stats', dan 'laporans'
    // 'laporans' adalah objek paginasi, jadi kita perlu '.data' untuk list-nya

    return (
        <AdminLayout user={auth.user}> {/* Pastikan kirim user ke layout */}
            <Head title="Beranda Lurah" />

            {/* Area Konten Utama (di dalam AdminLayout) */}
            <div className="p-6 sm:p-8 lg:p-12"> 
                
                {/* Header "Beranda" */}
                {/* Desain Figma punya header hijau "Laporan...", tapi kita ikuti layout AdminLayout */}
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Beranda</h1>

                {/* Section "Ringkasan" */}
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Ringkasan</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    <StatCard label="Total Laporan" value={stats.total} colorClass="bg-blue-100 text-blue-800" />
                    <StatCard label="Dalam Perbaikan" value={stats.diproses} colorClass="bg-yellow-100 text-yellow-800" />
                    <StatCard label="Diteruskan" value={stats.diteruskan} colorClass="bg-purple-100 text-purple-800" />
                    <StatCard label="Selesai" value={stats.selesai} colorClass="bg-green-100 text-green-800" />
                    <StatCard label="Ditolak" value={stats.ditolak} colorClass="bg-red-100 text-red-800" />
                </div>

                {/* Section "Daftar Laporan dari RT" */}
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Daftar Laporan Terbaru</h2>
                
                {/* Filter (UI saja, belum fungsional) */}
                <div className="flex justify-end space-x-2 mb-4">
                    <select className="border-gray-300 rounded-md shadow-sm text-sm focus:ring-green-500 focus:border-green-500">
                        <option>Pilih Kategori</option>
                        {/* Nanti bisa diisi dinamis */}
                    </select>
                    <select className="border-gray-300 rounded-md shadow-sm text-sm focus:ring-green-500 focus:border-green-500">
                        <option>Pilih Status</option>
                        {/* Nanti bisa diisi dinamis */}
                    </select>
                </div>

                {/* Tabel Laporan */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelapor (RT)</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori/Judul</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Detail</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {laporans.data.map((laporan) => (
                                <tr key={laporan.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {/* Format tanggal jadi 10/03/2025 */}
                                        {new Date(laporan.created_at).toLocaleDateString('id-ID')} 
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {laporan.user?.name ?? 'Warga'} (RT {laporan.user?.nomor_rt ?? 'N/A'})
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {laporan.judul}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <StatusBadge status={laporan.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link 
                                            // href={route('lurah.pengaduan.show', laporan.id)} 
                                            className="text-white bg-green-700 hover:bg-green-800 px-3 py-1 rounded-md text-xs"
                                        >
                                            Detail Laporan
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {laporans.data.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        Tidak ada data laporan untuk ditampilkan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Tombol "Lihat Selengkapnya" */}
                <div className="mt-6 text-center">
                    <Link 
                        href="#" // TODO: Buat route lurah.laporan.index (halaman semua laporan)
                        className="px-5 py-2 bg-green-800 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-green-700"
                    >
                        Lihat Selengkapnya
                    </Link>
                </div>

            </div>
        </AdminLayout>
    );
}