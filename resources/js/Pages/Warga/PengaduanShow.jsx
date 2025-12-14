// resources/js/Pages/Warga/PengaduanShow.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function PengaduanShow() {
    // Ambil data 'auth' (dari middleware) dan 'pengaduan' (dari controller)
    const { auth, pengaduan } = usePage().props;

    // Format tanggal agar lebih mudah dibaca (misal: "28 Oktober 2025")
    const formattedTanggalKejadian = new Date(pengaduan.tanggal_kejadian).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
    const formattedTanggalLapor = new Date(pengaduan.created_at).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    // Tentukan path foto
    const fotoUrl = pengaduan.foto ? `/storage/${pengaduan.foto}` : 'https://via.placeholder.com/600x400/000000/333333?text=Tidak+Ada+Foto';

    // Styling untuk status badge
    let statusStyle = 'bg-gray-500/20 text-gray-300 border-gray-500/50'; // Default
    if (pengaduan.status === 'BARU') statusStyle = 'bg-blue-500/20 text-blue-300 border-blue-500/50';
    if (pengaduan.status === 'DIPROSES_RT') statusStyle = 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
    if (pengaduan.status === 'SELESAI') statusStyle = 'bg-green-500/20 text-green-300 border-green-500/50';
    if (pengaduan.status === 'DITOLAK') statusStyle = 'bg-red-500/20 text-red-300 border-red-500/50';

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Detail Laporan: ${pengaduan.judul}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">

                    {/* Header Breadcrumb-ish */}
                    <div className="mb-6 flex items-center gap-2 text-sm text-gray-400 px-4 sm:px-0">
                        <Link href={route('warga.dashboard')} className="hover:text-white transition-colors">Dashboard</Link>
                        <span>/</span>
                        <span className="text-white">Detail Laporan</span>
                    </div>

                    {/* Glass Card untuk membungkus detail */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl sm:rounded-3xl relative">
                        {/* Status Ribbon (Opsional) */}
                        <div className="absolute top-0 right-0 p-6 sm:p-8">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${statusStyle} backdrop-blur-md`}>
                                {pengaduan.status.replace('_', ' ')}
                            </span>
                        </div>

                        {/* Header Halaman Detail */}
                        <div className="p-6 sm:p-10 border-b border-white/10">
                            <h2 className="text-3xl font-black text-white pr-20">
                                {pengaduan.judul}
                            </h2>
                            <p className="mt-2 text-gray-400">
                                Kode Laporan: <span className="font-mono text-green-400">#{pengaduan.id.toString().padStart(6, '0')}</span>
                            </p>
                        </div>

                        {/* Konten Detail */}
                        <div className="p-6 sm:p-10">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Kolom Kiri: Gambar */}
                                <div>
                                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black/50 group">
                                        <img
                                            src={fotoUrl}
                                            alt={`Foto ${pengaduan.judul}`}
                                            className="w-full h-auto object-contain max-h-[500px] transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <p className="text-center text-xs text-gray-500 mt-2">Bukti Foto Kejadian</p>
                                </div>

                                {/* Kolom Kanan: Informasi */}
                                <div className="space-y-8">

                                    {/* Deskripsi */}
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                                            <span className="w-1 h-6 bg-green-500 rounded-full mr-3"></span>
                                            Deskripsi Laporan
                                        </h3>
                                        <div className="bg-white/5 rounded-xl p-5 border border-white/5 text-gray-300 leading-relaxed whitespace-pre-wrap">
                                            {pengaduan.isi_laporan}
                                        </div>
                                    </div>

                                    {/* Detail Grid */}
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                                            <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
                                            Detail Informasi
                                        </h3>
                                        <div className="bg-white/5 rounded-xl border border-white/5 divide-y divide-white/5">
                                            <div className="p-4 grid grid-cols-2 gap-4">
                                                <div className="text-sm text-gray-500">Nama Pelapor</div>
                                                <div className="text-sm text-white font-medium text-right">{pengaduan.nama_pelapor}</div>
                                            </div>
                                            <div className="p-4 grid grid-cols-2 gap-4">
                                                <div className="text-sm text-gray-500">Tanggal Kejadian</div>
                                                <div className="text-sm text-white font-medium text-right">{formattedTanggalKejadian}</div>
                                            </div>
                                            <div className="p-4 grid grid-cols-2 gap-4">
                                                <div className="text-sm text-gray-500">Tanggal Lapor</div>
                                                <div className="text-sm text-white font-medium text-right">{formattedTanggalLapor}</div>
                                            </div>
                                            <div className="p-4 grid grid-cols-2 gap-4">
                                                <div className="text-sm text-gray-500">Lokasi</div>
                                                <div className="text-sm text-white font-medium text-right">{pengaduan.alamat_kejadian}</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Tombol Kembali */}
                            <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
                                <Link
                                    href={route('warga.dashboard')}
                                    className="py-3 px-6 border border-white/10 rounded-xl shadow-lg text-sm font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                                >
                                    &larr; Kembali ke Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
