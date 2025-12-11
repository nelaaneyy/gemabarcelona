import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import clsx from 'clsx'; // Diperlukan untuk styling kondisional

// --- Komponen Kartu Laporan (Mirip Warga, tapi mungkin nanti ada tombol aksi beda) ---
const LaporanCardRt = ({ laporan }) => {
    const fotoUrl = laporan.foto ? `/storage/${laporan.foto}` : 'https://via.placeholder.com/150/CBD5E0/FFFFFF?text=GEMA';

    // Fungsi helper untuk mendapatkan warna status
    const getStatusStyles = (status) => {
        switch (status) {
            case 'BARU': return 'bg-blue-100 text-blue-800';
            case 'DIPROSES_RT': return 'bg-yellow-100 text-yellow-800';
            case 'DITERUSKAN_LURAH': return 'bg-purple-100 text-purple-800';
            case 'SELESAI': return 'bg-green-100 text-green-800';
            case 'DITOLAK': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex border border-gray-200 hover:shadow-lg transition-shadow">
            {/* Bagian Gambar */}
            <div className="w-1/4 flex-shrink-0">
                <img
                    src={fotoUrl}
                    alt={laporan.judul}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Bagian Info Laporan */}
            <div className="w-3/4 p-4 sm:p-5 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {laporan.judul}
                    </h3>
                    {/* Tampilkan Nama Pelapor */}
                    <p className="text-sm text-gray-500 mt-1">
                        Pelapor: <span className="font-medium">{laporan.user?.name ?? 'Tidak Diketahui'}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Dilaporkan: {new Date(laporan.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                        Status:
                        <span className={`font-medium ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusStyles(laporan.status)}`}>
                            {laporan.status.replace('_', ' ')}
                        </span>
                    </p>
                </div>

                {/* Tombol Aksi untuk RT */}
                <div className="text-right mt-3 space-x-2">
                    <Link
                        // Rute yang baru! rt.laporan.show
                        href={route('rt.laporan.show', { laporan: laporan.id })}
                        className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-500 transition-colors shadow-sm"
                    >
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default function DashboardRt({ auth, pengaduans, filters }) {

    // State untuk filtering, mengambil dari props filters jika ada
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');

    // Handler untuk mengirim permintaan filter/pagination baru
    const handleFilterOrPagination = (statusValue, url = null) => {
        // Objek data yang akan dikirim
        const data = statusValue ? { status: statusValue } : {};

        // URL yang akan digunakan (default ke rute dashboard)
        const targetUrl = url || route('rt.dashboard');

        router.get(targetUrl, data, {
            preserveState: true,
            preserveScroll: true
        });
    };

    // Handler saat dropdown filter status berubah
    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatusFilter(newStatus);
        handleFilterOrPagination(newStatus);
    };


    return (
        <AdminLayout user={auth.user}>
            <Head title="Dashboard RT" />

            {/* Background abu-abu muda */}
            <div className="py-12 bg-gray-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Header Dashboard RT */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Dashboard RT {auth.user.nomor_rt}
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Daftar laporan masuk dari warga di wilayah Anda.
                        </p>
                    </div>

                    {/* --- FILTER STATUS --- */}
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-6 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">Filter Laporan</h2>

                        <div className="flex items-center space-x-3">
                            <label htmlFor="statusFilter" className="text-sm text-gray-600">Status:</label>
                            <select
                                id="statusFilter"
                                value={statusFilter}
                                onChange={handleStatusChange}
                                className="border-gray-300 rounded-md shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Semua Status</option>
                                <option value="BARU">BARU</option>
                                <option value="DIPROSES_RT">DIPROSES RT</option>
                                <option value="DITERUSKAN_LURAH">DITERUSKAN LURAH</option>
                                <option value="SELESAI">SELESAI</option>
                                <option value="DITOLAK">DITOLAK</option>
                            </select>
                        </div>
                    </div>
                    {/* --- BATAS FILTER STATUS --- */}


                    {/* Daftar Laporan Masuk */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Laporan ({pengaduans.total})
                        </h2>

                        {pengaduans?.data?.length > 0 ? (
                            pengaduans.data.map((laporan) => (
                                <LaporanCardRt key={laporan.id} laporan={laporan} />
                            ))
                        ) : (
                            <div className="text-center bg-white shadow-sm rounded-lg py-16">
                                <h3 className="text-lg font-semibold text-gray-700">Tidak ada laporan yang sesuai dengan filter.</h3>
                                <p className="text-gray-500 mt-2">Coba ganti pilihan status Anda.</p>
                            </div>
                        )}

                        {/* --- Komponen Pagination --- */}
                        {pengaduans.links.length > 3 && ( // Tampilkan jika ada lebih dari 3 link (prev, 1, next)
                            <div className="pt-4 flex justify-center">
                                {pengaduans.links.map((link, index) => (
                                    <button
                                        key={index}
                                        // Mengatasi karakter khusus seperti < dan > pada link 'Previous'/'Next'
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        onClick={() => link.url && handleFilterOrPagination(statusFilter, link.url)}
                                        disabled={!link.url}
                                        className={clsx(
                                            'mx-1 px-3 py-1 text-sm rounded-lg transition-colors',
                                            link.active ? 'bg-indigo-600 text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-200',
                                            !link.url && 'opacity-50 cursor-not-allowed'
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                        {/* --- BATAS Komponen Pagination --- */}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
