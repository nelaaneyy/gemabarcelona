// resources/js/Pages/Rt/PengaduanShowRt.jsx

import AdminLayout from '@/Layouts/AdminLayout'; // Pastikan AdminLayout juga sudah Dark Mode atau gunakan AuthenticatedLayout jika sama
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const getStatusStyles = (status) => {
    switch (status) {
        case 'BARU': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
        case 'DIPROSES_RT': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
        case 'DITERUSKAN_LURAH': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
        case 'SELESAI': return 'bg-green-500/20 text-green-300 border-green-500/50';
        case 'DITOLAK': return 'bg-red-500/20 text-red-300 border-red-500/50';
        default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
};

export default function PengaduanShowRt({ auth, pengaduan, tanggapans }) {
    const { flash } = usePage().props;
    const [actionState, setActionState] = useState(null);
    const [isLurahModalOpen, setIsLurahModalOpen] = useState(false);

    const {
        processing: statusProcessing,
        post,
        errors: statusErrors
    } = useForm({});
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

    const [processingId, setProcessingId] = useState(null);

    function closeLurahModal() { setIsLurahModalOpen(false); }
    function openLurahModal() { setIsLurahModalOpen(true); }

    const handleStatusUpdate = (newStatus, actionName) => {
        setProcessingId(actionName);
        const url = route('rt.laporan.proses', pengaduan.id);

        router.post(url, { status: newStatus }, {
            preserveScroll: true,
            onSuccess: () => {
                setProcessingId(null);
                setActionState(null);
            },
            onError: (errors) => {
                setProcessingId(null);
                console.error("Status Update Failed:", errors);
                alert(`Gagal mengubah status: ${JSON.stringify(errors, null, 2)}`);
            },
            onFinish: () => setProcessingId(null),
        });
    };

    const handleFinish = () => {
        handleStatusUpdate('SELESAI', 'finish');
    };

    const handleEscalateToLurah = () => {
        closeLurahModal();
        handleStatusUpdate('DITERUSKAN_LURAH', 'escalate');
    };

    const handleAddCatatan = (e) => {
        e.preventDefault();
        const url = route('rt.laporan.tanggapan.store', pengaduan.id);

        postCat(url, catData, {
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
    const fotoUrl = pengaduan.foto ? `/storage/${pengaduan.foto}` : 'https://via.placeholder.com/600x400/000000/333333?text=Tidak+Ada+Foto';
    const statusStyle = getStatusStyles(pengaduan.status);

    const isFinishedOrEscalated = pengaduan.status === 'SELESAI' || pengaduan.status === 'DITERUSKAN_LURAH';
    const isProcessing = pengaduan.status === 'DIPROSES_RT';

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Detail Laporan: ${pengaduan.judul}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <div className="mb-6 flex items-center gap-2 text-sm text-gray-400 px-4 sm:px-0">
                        <Link href={route('rt.dashboard')} className="hover:text-white transition-colors">Dashboard RT</Link>
                        <span>/</span>
                        <span className="text-white">Detail Laporan Warga</span>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl sm:rounded-3xl relative">

                        {/* Header */}
                        <div className="p-6 sm:p-10 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-3xl font-black text-white">
                                    Detail Laporan
                                </h2>
                                <p className="mt-1 text-gray-400">
                                    Laporan dari: <span className="text-green-400 font-bold">{pengaduan.user?.name ?? 'Warga'}</span> (RT {pengaduan.user?.nomor_rt ?? 'N/A'})
                                </p>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${statusStyle} backdrop-blur-md`}>
                                {pengaduan.status.replace('_', ' ')}
                            </div>
                        </div>

                        <div className="p-6 sm:p-10">
                            {flash?.success && (
                                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-300 rounded-xl">
                                    {flash.success}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Kiri: Foto */}
                                <div>
                                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black/50 group">
                                        <img src={fotoUrl} alt={`Foto ${pengaduan.judul}`} className="w-full h-auto object-contain max-h-[500px]" />
                                    </div>
                                    <p className="text-center text-xs text-gray-500 mt-2">Gambar Bukti Laporan</p>
                                </div>

                                {/* Kanan: Info & Aksi */}
                                <div className="space-y-8">

                                    {/* Judul & Desc */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{pengaduan.judul}</h3>
                                        <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-gray-300 whitespace-pre-wrap">
                                            {pengaduan.isi_laporan}
                                        </div>
                                    </div>

                                    {/* Data Grid */}
                                    <div className="bg-white/5 rounded-xl border border-white/5 divide-y divide-white/5 text-sm">
                                        <div className="p-3 grid grid-cols-2">
                                            <span className="text-gray-500">Pelapor</span>
                                            <span className="text-white text-right">{pengaduan.nama_pelapor}</span>
                                        </div>
                                        <div className="p-3 grid grid-cols-2">
                                            <span className="text-gray-500">Tgl. Kejadian</span>
                                            <span className="text-white text-right">{formattedTanggalKejadian}</span>
                                        </div>
                                        <div className="p-3 grid grid-cols-2">
                                            <span className="text-gray-500">No. HP</span>
                                            <span className="text-white text-right">{pengaduan.no_hp || '-'}</span>
                                        </div>
                                        <div className="p-3 grid grid-cols-2">
                                            <span className="text-gray-500">Lokasi</span>
                                            <span className="text-white text-right">{pengaduan.alamat_kejadian}</span>
                                        </div>
                                    </div>

                                    {/* --- AREA AKSI RT --- */}
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <h4 className="text-lg font-bold text-white mb-4">Aksi Penanganan RT</h4>

                                        {!isFinishedOrEscalated ? (
                                            <div className="flex flex-wrap gap-3 mb-4">
                                                {/* TOMBOL SELESAI */}
                                                {isProcessing && (
                                                    <PrimaryButton
                                                        onClick={handleFinish}
                                                        className="bg-green-600 hover:bg-green-500 border-none"
                                                        disabled={processingId === 'finish'}
                                                    >
                                                        {processingId === 'finish' ? 'Memproses...' : '✅ Tandai Selesai'}
                                                    </PrimaryButton>
                                                )}

                                                <button
                                                    onClick={() => setActionState(actionState === 'catatan' ? null : 'catatan')}
                                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${actionState === 'catatan' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                                                    disabled={!!processingId}
                                                >
                                                    📝 Catatan / Tanggapan
                                                </button>

                                                <button
                                                    onClick={openLurahModal}
                                                    className="px-4 py-2 rounded-lg text-sm font-bold bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 transition-colors"
                                                    disabled={!!processingId}
                                                >
                                                    ⚠️ Teruskan ke Lurah
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                                                <p className="text-gray-400">Laporan ini telah ditutup dengan status:</p>
                                                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${statusStyle}`}>{pengaduan.status.replace('_', ' ')}</span>
                                            </div>
                                        )}

                                        {statusErrors.status && <p className="text-sm text-red-400 mt-2">{statusErrors.status}</p>}

                                        {/* FORM CATATAN */}
                                        {actionState === 'catatan' && (
                                            <div className="bg-black/40 p-5 border border-white/10 rounded-xl mt-4 animate-fadeIn">
                                                <h5 className="font-bold text-white mb-3">Tulis Catatan / Tanggapan</h5>
                                                <form onSubmit={handleAddCatatan} className="space-y-4">
                                                    <textarea
                                                        value={catData.isi_tanggapan}
                                                        onChange={(e) => setCatData('isi_tanggapan', e.target.value)}
                                                        placeholder="Tulis detail penanganan atau tanggapan untuk warga..."
                                                        rows="4"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-green-500 focus:border-green-500"
                                                        required
                                                    />
                                                    <InputError message={catErrors.isi_tanggapan} className="mt-1" />

                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            id="is_private"
                                                            checked={catData.is_private}
                                                            onChange={(e) => setCatData('is_private', e.target.checked)}
                                                            className="rounded bg-white/10 border-white/20 text-green-500 focus:ring-green-500"
                                                        />
                                                        <label htmlFor="is_private" className="text-sm text-gray-300">
                                                            Simpan sebagai Catatan Pribadi (Hanya RT)
                                                        </label>
                                                    </div>

                                                    <div className="pt-2 flex justify-end">
                                                        <PrimaryButton className="bg-white text-black hover:bg-gray-200 border-none" disabled={catProcessing}>
                                                            Kirim Catatan
                                                        </PrimaryButton>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                    </div>

                                    {/* RIWAYAT TANGGAPAN */}
                                    <div className="pt-6 border-t border-white/10">
                                        <h4 className="text-lg font-bold text-white mb-4">Riwayat Aktivitas ({tanggapans?.length ?? 0})</h4>
                                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                            {tanggapans && tanggapans.map(t => (
                                                <div key={t.id} className="bg-white/5 p-4 rounded-xl border-l-4 border-green-500 text-sm">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="font-bold text-green-400">RT {t.user.nomor_rt}</span>
                                                        <span className="text-xs text-gray-500">{new Date(t.created_at).toLocaleDateString('id-ID')}</span>
                                                    </div>
                                                    <p className="text-gray-300 whitespace-pre-wrap">{t.isi_tanggapan}</p>
                                                    {t.is_private && <span className="text-xs text-red-400/80 font-bold block mt-2">🔒 Catatan Internal</span>}
                                                </div>
                                            ))}
                                            {tanggapans?.length === 0 && (
                                                <p className="text-gray-600 text-sm italic">Belum ada catatan aktivitas.</p>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Teruskan ke Lurah */}
            <Transition appear show={isLurahModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeLurahModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-gray-900 border border-white/10 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-white">
                                        Teruskan ke Kelurahan?
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-300">
                                            Laporan ini akan dialihkan wewenangnya ke Lurah. Anda tidak dapat lagi memproses laporan ini setelah diteruskan.
                                        </p>
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none"
                                            onClick={closeLurahModal}
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={handleEscalateToLurah}
                                            disabled={statusProcessing}
                                        >
                                            Ya, Teruskan
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </AdminLayout>
    );
}
