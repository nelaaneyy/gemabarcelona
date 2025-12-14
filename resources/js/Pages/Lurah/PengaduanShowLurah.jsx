import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';

// Status styling helper
const getStatusStyles = (status) => {
    switch (status) {
        case 'BARU': return 'bg-blue-100 text-blue-800';
        case 'DIPROSES_RT': return 'bg-yellow-100 text-yellow-800';
        case 'DITERUSKAN_LURAH': return 'bg-purple-100 text-purple-800';
        case 'DIPROSES_LURAH': return 'bg-orange-100 text-orange-800';
        case 'SELESAI': return 'bg-green-100 text-green-800';
        case 'DITOLAK': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export default function PengaduanShowLurah({ auth, pengaduan, tanggapans }) {
    const { flash } = usePage().props;
    const [actionState, setActionState] = useState(null);
    const [processingId, setProcessingId] = useState(null);

    // =========================================================================
    // 1. UPDATE STATUS HANDLER (Mirrored from RT)
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
    // 2. TANGGAPAN HANDLER (Mirrored from RT)
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
    const formattedTanggalLapor = new Date(pengaduan.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' });
    const fotoUrl = pengaduan.foto ? `/storage/${pengaduan.foto}` : 'https://via.placeholder.com/600x400/E5E7EB/9CA3AF?text=Tidak+Ada+Foto';
    const statusBgColor = getStatusStyles(pengaduan.status);

    const isFinalStatus = ['SELESAI', 'DITOLAK'].includes(pengaduan.status);

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Detail Laporan: ${pengaduan.judul}`} />

            <div className="p-6 sm:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 sm:p-8 border-b border-gray-200 flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{pengaduan.judul}</h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Dilaporkan oleh <span className="font-medium text-gray-700">{pengaduan.user?.name || 'Warga'}</span>
                                </p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-bold tracking-wide ${getStatusStyles(pengaduan.status)}`}>
                                {pengaduan.status.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="p-6 sm:p-8">
                            {flash?.success && (
                                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                                    {flash.success}
                                </div>
                            )}

                            {/* Konten Laporan */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <img
                                        src={fotoUrl}
                                        alt="Bukti Laporan"
                                        className="w-full h-auto rounded-lg shadow-md object-cover"
                                        style={{ maxHeight: '300px' }}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Lokasi</h3>
                                        <p className="text-gray-900 text-lg">{pengaduan.lokasi_kejadian}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Tanggal Kejadian</h3>
                                        <p className="text-gray-900 text-lg">{formattedTanggalKejadian}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Deskripsi</h3>
                                        <p className="text-gray-700 whitespace-pre-line leading-relaxed bg-gray-50 p-4 rounded-md border border-gray-100">
                                            {pengaduan.isi_laporan}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">Aksi Lurah</h4>

                                {!isFinalStatus ? (
                                    <div className="flex flex-wrap gap-3">
                                        <PrimaryButton
                                            onClick={() => handleStatusUpdate('SELESAI', 'finish')}
                                            className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
                                            disabled={processingId === 'finish'}
                                        >
                                            {processingId === 'finish' ? 'Memproses...' : '✅ Selesai & Tutup Kasus'}
                                        </PrimaryButton>

                                        <PrimaryButton
                                            onClick={() => handleStatusUpdate('DITOLAK', 'reject')}
                                            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                                            disabled={processingId === 'reject'}
                                        >
                                            {processingId === 'reject' ? 'Memproses...' : '❌ Tolak Laporan'}
                                        </PrimaryButton>

                                        <div className="w-px h-10 bg-gray-300 mx-2 hidden sm:block"></div>

                                        <PrimaryButton
                                            onClick={() => setActionState(actionState === 'catatan' ? null : 'catatan')}
                                            className="bg-indigo-600 hover:bg-indigo-700"
                                            disabled={!!processingId}
                                        >
                                            {actionState === 'catatan' ? 'Batal' : '📝 Tulis Catatan / Tanggapan'}
                                        </PrimaryButton>
                                    </div>
                                ) : (
                                    <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center border border-gray-200">
                                        <p className="text-gray-600 font-medium">
                                            🔒 Laporan ini telah ditutup dengan status: <span className="font-bold">{pengaduan.status}</span>
                                        </p>
                                    </div>
                                )}

                                {/* Form Catatan */}
                                {actionState === 'catatan' && (
                                    <div className="bg-gray-50 p-4 border border-indigo-200 rounded-lg mt-4 animate-fadeIn">
                                        <h5 className="font-semibold text-gray-700 mb-3">Kirim Tanggapan / Instruksi Tambahan</h5>
                                        <form onSubmit={handleAddCatatan} className="space-y-4">
                                            <div>
                                                <textarea
                                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    rows="3"
                                                    placeholder="Tuliskan tanggapan atau catatan di sini..."
                                                    value={catData.isi_tanggapan}
                                                    onChange={(e) => setCatData('isi_tanggapan', e.target.value)}
                                                    required
                                                ></textarea>
                                                <InputError message={catErrors.isi_tanggapan} className="mt-1" />
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    id="is_private"
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                    checked={catData.is_private}
                                                    onChange={(e) => setCatData('is_private', e.target.checked)}
                                                />
                                                <label htmlFor="is_private" className="ml-2 block text-sm text-gray-700">
                                                    Catatan Internal (Hanya terlihat oleh petugas)
                                                </label>
                                            </div>

                                            <div className="flex justify-end">
                                                <PrimaryButton className="bg-indigo-600 hover:bg-indigo-700" disabled={catProcessing}>
                                                    {catProcessing ? 'Mengirim...' : 'Kirim Tanggapan'}
                                                </PrimaryButton>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>

                            {/* Riwayat Tanggapan */}
                            <div className="mt-8 border-t border-gray-200 pt-8">
                                <h4 className="text-lg font-semibold text-gray-900 mb-6">Riwayat Tanggapan ({tanggapans?.length || 0})</h4>
                                {tanggapans && tanggapans.length > 0 ? (
                                    <div className="space-y-4">
                                        {tanggapans.map((tanggapan) => (
                                            <div key={tanggapan.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <span className="font-semibold text-gray-900">{tanggapan.user?.name || 'User'}</span>
                                                        <span className="text-xs text-gray-500 ml-2">
                                                            {new Date(tanggapan.created_at).toLocaleString('id-ID')}
                                                        </span>
                                                    </div>
                                                    {tanggapan.is_private ? (
                                                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-700">Internal</span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">Publik</span>
                                                    )}
                                                </div>
                                                <p className="text-gray-700 whitespace-pre-wrap">{tanggapan.isi_tanggapan}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">Belum ada tanggapan.</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
