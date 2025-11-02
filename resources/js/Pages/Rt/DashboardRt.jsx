// resources/js/Pages/Rt/DashboardRt.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

// --- Komponen Kartu Laporan (Mirip Warga, tapi mungkin nanti ada tombol aksi beda) ---
const LaporanCardRt = ({ laporan }) => {
    const fotoUrl = laporan.foto ? `/storage/${laporan.foto}` : 'https://via.placeholder.com/150/CBD5E0/FFFFFF?text=GEMA';

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex border border-gray-200">
            {/* Bagian Gambar */}
            <div className="w-1/4 flex-shrink-0"> {/* Sedikit lebih kecil dari warga */}
                <img
                    src={fotoUrl}
                    alt={laporan.judul}
                    className="w-full h-full object-cover" // Biarkan tinggi menyesuaikan
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
                        <span className={`font-medium ml-2 px-2 py-0.5 rounded-full text-xs
                            ${laporan.status === 'BARU' ? 'bg-blue-100 text-blue-800' : ''}
                            ${laporan.status === 'DIPROSES_RT' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${laporan.status === 'DITERUSKAN_LURAH' ? 'bg-purple-100 text-purple-800' : ''}
                            ${laporan.status === 'SELESAI' ? 'bg-green-100 text-green-800' : ''}
                            ${laporan.status === 'DITOLAK' ? 'bg-red-100 text-red-800' : ''}
                        `}>
                            {laporan.status.replace('_', ' ')}
                        </span>
                    </p>
                </div>

                {/* Tombol Aksi untuk RT */}
                <div className="text-right mt-3 space-x-2">
                    {/* Tombol Detail (Akan kita buat nanti) */}
                    <Link
                        // TODO: Buat route rt.pengaduan.show
                        href={route('rt.pengaduan.show', laporan.id)}
                        className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-500 transition-colors shadow-sm"
                    >
                        Lihat Detail
                    </Link>
                     {/* Tombol Ubah Status (Akan kita buat nanti) */}
                    {/* <Link href="#" className="...">Ubah Status</Link> */}
                    {/* <Link href="#" className="...">Beri Tanggapan</Link> */}
                </div>
            </div>
        </div>
    );
};


export default function DashboardRt() {
    // Ambil data 'auth' dan 'pengaduans' dari props
    const { auth, pengaduans } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
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

                    {/* Nanti bisa tambahkan Ringkasan/Grafik di sini sesuai desain */}

                    {/* Daftar Laporan Masuk */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Laporan Terbaru</h2>
                        
                        {pengaduans.length > 0 ? (
                            pengaduans.map((laporan) => (
                                <LaporanCardRt key={laporan.id} laporan={laporan} />
                            ))
                        ) : (
                            <div className="text-center bg-white shadow-sm rounded-lg py-16">
                                <h3 className="text-lg font-semibold text-gray-700">Belum ada laporan masuk.</h3>
                                <p className="text-gray-500 mt-2">Saat ada warga melapor, laporannya akan muncul di sini.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}