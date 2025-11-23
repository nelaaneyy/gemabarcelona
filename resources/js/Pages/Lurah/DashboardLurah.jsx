import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react'; // Diperlukan untuk komponen-komponen yang lebih kompleks

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

    // Asumsi: 'laporans' adalah objek paginasi dengan key 'data'
    const laporanList = laporans.data;
    const lurahName = auth.user.name;

    return (
        <AdminLayout user={auth.user}>
            <Head title="Beranda Lurah" />

            <div className="p-6 sm:p-8 lg:p-12">

                {/* Header Beranda */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang, Lurah {lurahName}</h1>
                <p className="text-gray-600 mb-6">Ringkasan dan antrian laporan yang diteruskan dari RT.</p>

                {/* Section "Ringkasan Statistik" */}
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Ringkasan Laporan Sistem</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    {/* Statistik yang diambil dari DB::raw() */}
                    <StatCard label="Total Laporan" value={stats.total} colorClass="bg-blue-100 text-blue-800" />
                    <StatCard label="Dalam Perbaikan" value={stats.diproses} colorClass="bg-yellow-100 text-yellow-800" />
                    <StatCard label="Diteruskan (Antrian)" value={stats.diteruskan} colorClass="bg-purple-100 text-purple-800" />
                    <StatCard label="Selesai" value={stats.selesai} colorClass="bg-green-100 text-green-800" />
                    <StatCard label="Ditolak" value={stats.ditolak} colorClass="bg-red-100 text-red-800" />
                </div>

                {/* Section "Antrian Laporan Eskalasi" */}
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Antrian Laporan Eskalasi (Status: DITERUSKAN LURAH)</h2>

                {/* Tabel Laporan */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelapor (RT)</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul Laporan</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Detail</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {laporanList.map((laporan) => (
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
                                            href={route('lurah.pengaduan.show', laporan.id)} // PENTING: Gunakan rute Lurah
                                            className="text-white bg-green-700 hover:bg-green-800 px-3 py-1 rounded-md text-xs"
                                        >
                                            Lihat Detail
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {laporanList.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        Tidak ada laporan yang diteruskan dari RT saat ini.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (menggunakan laporans.links dari objek paginasi) */}
                {laporans.links && laporans.links.length > 3 && (
                    <div className="mt-6 flex justify-center">
                        {laporans.links.map((link, index) => (
                            <button
                                key={index}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true })}
                                disabled={!link.url}
                                className={`mx-1 px-3 py-1 text-sm rounded-lg transition-colors
                                    ${link.active ? 'bg-indigo-600 text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'}
                                    ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            />
                        ))}
                    </div>
                )}

            </div>
        </AdminLayout>
    );
}
