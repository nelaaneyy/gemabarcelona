// resources/js/Pages/Warga/PengaduanShow.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function PengaduanShow() {
    // Ambil data 'auth' (dari middleware) dan 'pengaduan' (dari controller)
    const { auth, pengaduan, tanggapans } = usePage().props;

    // Format tanggal agar lebih mudah dibaca (misal: "28 Oktober 2025")
    const formattedTanggalKejadian = new Date(pengaduan.tanggal_kejadian).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
    const formattedTanggalLapor = new Date(pengaduan.created_at).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    // Tentukan path foto
    const fotoUrl = pengaduan.foto
        ? (pengaduan.foto.startsWith('http') ? pengaduan.foto : `/storage/${pengaduan.foto}`)
        : 'https://via.placeholder.com/600x400/000000/333333?text=Tidak+Ada+Foto';

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

                    {/* Riwayat Tanggapan / Aktivitas */}
                    <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl sm:rounded-3xl p-6 sm:p-10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                            <span className="w-1 h-6 bg-purple-500 rounded-full mr-3"></span>
                            Tanggapan & Progres Laporan
                        </h3>

                        <div className="space-y-6">
                            {tanggapans && tanggapans.length > 0 ? (
                                tanggapans.map((tanggapan) => (
                                    <div key={tanggapan.id} className="relative pl-8 sm:pl-0">
                                        {/* Timeline Line (Desktop Only) */}
                                        <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-px bg-white/10 ml-4"></div>

                                        <div className="sm:ml-12 bg-black/20 rounded-xl p-5 border border-white/5 relative group hover:bg-black/30 transition-colors">
                                            {/* Dot indicator */}
                                            <div className="hidden sm:block absolute -left-12 top-5 w-3 h-3 rounded-full bg-purple-500 border-2 border-gray-900 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>

                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                                                <span className="font-bold text-purple-400 text-base">
                                                    {tanggapan.user?.nomor_rt ? `RT ${tanggapan.user.nomor_rt}` : 'Petugas'}
                                                </span>
                                                <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-1 rounded-md">
                                                    {new Date(tanggapan.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                                    })} WIB
                                                </span>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                                                {tanggapan.isi_tanggapan}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-600 mx-auto mb-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                    </svg>
                                    <p className="text-gray-500 text-sm">Belum ada tanggapan untuk laporan ini.</p>
                                    <p className="text-gray-600 text-xs mt-1">Mohon menunggu RT atau petugas terkait memproses laporan Anda.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tombol Kembali */}
                    <div className="mt-10 pt-6 flex justify-end">
                        <Link
                            href={route('warga.dashboard')}
                            className="py-3 px-6 border border-white/10 rounded-xl shadow-lg text-sm font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                        >
                            &larr; Kembali ke Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
