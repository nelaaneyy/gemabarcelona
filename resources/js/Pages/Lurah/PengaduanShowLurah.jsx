import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';

// Status styling helper (Modern Dark Mode)
const getStatusStyles = (status) => {
    switch (status) {
        case 'BARU': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
        case 'DIPROSES_RT': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
        case 'DITERUSKAN_LURAH': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
        case 'DIPROSES_LURAH': return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
        case 'SELESAI': return 'bg-green-500/20 text-green-300 border-green-500/50';
        case 'DITOLAK': return 'bg-red-500/20 text-red-300 border-red-500/50';
        default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
};

export default function PengaduanShowLurah({ auth, pengaduan, tanggapans }) {
    const { flash } = usePage().props;
    const [actionState, setActionState] = useState(null);
    const [processingId, setProcessingId] = useState(null);

    // =========================================================================
    // 1. UPDATE STATUS HANDLER
    // =========================================================================
    const handleStatusUpdate = (newStatus, actionName) => {
        setProcessingId(actionName);
        const url = route('lurah.pengaduan.updateStatus', pengaduan.id);

        router.post(url, { status: newStatus }, {
            preserveScroll: true,
            onSuccess: () => {
                setProcessingId(null);
                setActionState(null);
            },
            onError: (err) => {
                setProcessingId(null);
                console.error("Status Update Failed:", err);
                alert(`Gagal mengubah status: ${JSON.stringify(err, null, 2)}`);
            },
            onFinish: () => setProcessingId(null),
        });
    };

    // =========================================================================
    // 2. TANGGAPAN HANDLER
    // =========================================================================
    const {
        data: catData,
        setData: setCatData,
        post: postCat,
        processing: catProcessing,
        errors: catErrors,
        reset: resetCat
    } = useForm({
        isi_tanggapan: '',
        is_private: false,
    });

    const handleAddCatatan = (e) => {
        e.preventDefault();
        const url = route('lurah.pengaduan.tanggapan.store', pengaduan.id);

        postCat(url, {
            onSuccess: () => {
                resetCat();
                setActionState(null);
            },
            onError: (err) => {
                console.error("Validation/Server Error:", err);
                alert(`Gagal mengirim catatan: ${JSON.stringify(err, null, 2)}`);
            },
        });
    };

    const formattedTanggalKejadian = new Date(pengaduan.tanggal_kejadian).toLocaleDateString('id-ID', { dateStyle: 'long' });
    const fotoUrl = pengaduan.foto ? `/storage/${pengaduan.foto}` : 'https://via.placeholder.com/600x400/000000/333333?text=Tidak+Ada+Foto';
    const statusStyle = getStatusStyles(pengaduan.status);

    const isFinalStatus = ['SELESAI', 'DITOLAK'].includes(pengaduan.status);

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Detail Laporan: ${pengaduan.judul}`} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400 font-medium">
                        <Link href={route('lurah.dashboard')} className="hover:text-green-400 transition-colors">Dashboard</Link>
                        <span className="text-gray-600">/</span>
                        <span className="text-white">Detail Laporan Eskalasi</span>
                    </nav>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl rounded-3xl relative">

                        {/* Header */}
                        <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                    Detail Laporan
                                </h1>
                                <p className="mt-1 text-gray-400 text-sm">
                                    Dari: <span className="text-green-400 font-bold">{pengaduan.user?.name || 'Warga'}</span> • {new Date(pengaduan.created_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                                </p>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${statusStyle} backdrop-blur-md shadow-lg`}>
                                {pengaduan.status.replace('_', ' ')}
                            </div>
                        </div>

                        <div className="p-6 sm:p-8">
                            {flash?.success && (
                                <div className="mb-8 p-4 bg-green-500/10 border border-green-500/30 text-green-300 rounded-xl flex items-center shadow-lg shadow-green-900/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {flash.success}
                                </div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                                {/* Kiri: Foto */}
                                <div className="space-y-4">
                                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 group relative">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10 pointer-events-none"></div>
                                        <img src={fotoUrl} alt={`Foto ${pengaduan.judul}`} className="w-full h-auto object-contain max-h-[500px] transform group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex justify-center">
                                        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Bukti Laporan</span>
                                    </div>
                                </div>

                                {/* Kanan: Info & Aksi */}
                                <div className="space-y-8">

                                    {/* Judul & Desc */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4 leading-snug">{pengaduan.judul}</h3>
                                        <div className="bg-black/30 rounded-2xl p-5 border border-white/10 text-gray-300 whitespace-pre-wrap leading-relaxed shadow-inner">
                                            {pengaduan.isi_laporan}
                                        </div>
                                    </div>

                                    {/* Data Grid */}
                                    <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden text-sm">
                                        <div className="p-4 grid grid-cols-3 gap-4 border-b border-white/5 items-center">
                                            <span className="text-gray-500 col-span-1">Lokasi</span>
                                            <span className="text-white col-span-2 font-medium">{pengaduan.alamat_kejadian}</span>
                                        </div>
                                        <div className="p-4 grid grid-cols-3 gap-4 border-b border-white/5 items-center">
                                            <span className="text-gray-500 col-span-1">Tanggal Kejadian</span>
                                            <span className="text-white col-span-2 font-medium">{formattedTanggalKejadian}</span>
                                        </div>
                                        <div className="p-4 grid grid-cols-3 gap-4 items-center">
                                            <span className="text-gray-500 col-span-1">RT Pelapor</span>
                                            <span className="text-white col-span-2 font-medium font-mono">RT {pengaduan.user?.nomor_rt || '-'}</span>
                                        </div>
                                    </div>

                                    {/* --- AREA AKSI LURAH --- */}
                                    <div className="pt-8 border-t border-white/10">
                                        <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-purple-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Penanganan Lurah
                                        </h4>

                                        {!isFinalStatus ? (
                                            <div className="flex flex-wrap gap-4 mb-4">
                                                <PrimaryButton
                                                    onClick={() => handleStatusUpdate('SELESAI', 'finish')}
                                                    className="bg-green-600 hover:bg-green-500 border-none shadow-lg shadow-green-900/30 px-6 py-3 text-sm"
                                                    disabled={processingId === 'finish'}
                                                >
                                                    {processingId === 'finish' ? 'Memproses...' : '✅ Selesai & Tutup Kasus'}
                                                </PrimaryButton>

                                                <PrimaryButton
                                                    onClick={() => handleStatusUpdate('DITOLAK', 'reject')}
                                                    className="bg-red-600 hover:bg-red-500 border-none shadow-lg shadow-red-900/30 px-6 py-3 text-sm"
                                                    disabled={processingId === 'reject'}
                                                >
                                                    {processingId === 'reject' ? 'Memproses...' : '❌ Tolak Laporan'}
                                                </PrimaryButton>

                                                <button
                                                    onClick={() => setActionState(actionState === 'catatan' ? null : 'catatan')}
                                                    className={`px-6 py-3 rounded-xl text-sm font-bold transition-all border border-white/10 shadow-lg ${actionState === 'catatan' ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/5 text-white hover:bg-white/10'}`}
                                                    disabled={!!processingId}
                                                >
                                                    📝 Tulis Catatan
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center flex flex-col items-center">
                                                <p className="text-gray-400 mb-3">Laporan ini telah ditutup dengan status:</p>
                                                <span className={`px-4 py-2 rounded-full text-sm font-bold border ${statusStyle}`}>{pengaduan.status.replace('_', ' ')}</span>
                                            </div>
                                        )}

                                        {/* FORM CATATAN */}
                                        {actionState === 'catatan' && (
                                            <div className="bg-black/40 p-6 border border-white/10 rounded-2xl mt-6 animate-fadeIn shadow-inner">
                                                <h5 className="font-bold text-white mb-4 flex items-center">
                                                    <span className="w-1 h-6 bg-purple-500 rounded-full mr-3"></span>
                                                    Kirim Tanggapan / Instruksi
                                                </h5>
                                                <form onSubmit={handleAddCatatan} className="space-y-5">
                                                    <textarea
                                                        value={catData.isi_tanggapan}
                                                        onChange={(e) => setCatData('isi_tanggapan', e.target.value)}
                                                        placeholder="Tuliskan tanggapan atau catatan di sini..."
                                                        rows="4"
                                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                                        required
                                                    />
                                                    <InputError message={catErrors.isi_tanggapan} className="mt-1" />

                                                    <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                                        <input
                                                            type="checkbox"
                                                            id="is_private"
                                                            checked={catData.is_private}
                                                            onChange={(e) => setCatData('is_private', e.target.checked)}
                                                            className="rounded bg-black/50 border-white/20 text-purple-500 focus:ring-purple-500 w-5 h-5 cursor-pointer"
                                                        />
                                                        <label htmlFor="is_private" className="text-sm text-gray-300 cursor-pointer select-none">
                                                            Simpan sebagai <span className="text-red-300 font-bold">Catatan Internal</span> (Hanya visible ke petugas)
                                                        </label>
                                                    </div>

                                                    <div className="flex justify-end">
                                                        <PrimaryButton className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-none px-6 py-3 shadow-lg shadow-purple-900/40 text-white" disabled={catProcessing}>
                                                            Kirim Tanggapan
                                                        </PrimaryButton>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                    </div>

                                    {/* RIWAYAT TANGGAPAN */}
                                    <div className="pt-8 border-t border-white/10">
                                        <h4 className="text-lg font-bold text-white mb-6">Riwayat Aktivitas ({tanggapans?.length ?? 0})</h4>
                                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                            {tanggapans && tanggapans.map(t => (
                                                <div key={t.id} className="bg-white/5 p-5 rounded-2xl border border-white/5 text-sm relative group hover:bg-white/10 transition-colors">
                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-600 rounded-l-2xl"></div>
                                                    <div className="flex justify-between items-start mb-2 pl-3">
                                                        <span className="font-bold text-purple-400 text-base">{t.user?.name || 'User'}</span>
                                                        <span className="text-xs text-gray-500 font-mono">{new Date(t.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                                    </div>
                                                    <p className="text-gray-300 whitespace-pre-wrap pl-3 leading-relaxed">{t.isi_tanggapan}</p>
                                                    {t.is_private &&
                                                        <div className="mt-3 pl-3">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                                                                🔒 Catatan Internal
                                                            </span>
                                                        </div>
                                                    }
                                                </div>
                                            ))}
                                            {tanggapans?.length === 0 && (
                                                <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
                                                    <p className="text-gray-500 text-sm">Belum ada catatan aktivitas.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
