// resources/js/Pages/Rt/PengaduanShowRt.jsx

import AdminLayout from '@/Layouts/AdminLayout';
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
                // alert(`Gagal mengubah status: ${JSON.stringify(errors, null, 2)}`);
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
                // alert(`Gagal mengirim catatan: ${JSON.stringify(err, null, 2)}`);
            },
        });
    };

    const formattedTanggalKejadian = new Date(pengaduan.tanggal_kejadian).toLocaleDateString('id-ID', { dateStyle: 'long' });
    const fotoUrl = pengaduan.foto
        ? (pengaduan.foto.startsWith('http') ? pengaduan.foto : `/storage/${pengaduan.foto}`)
        : 'https://via.placeholder.com/600x400/000000/333333?text=Tidak+Ada+Foto';
    const statusStyle = getStatusStyles(pengaduan.status);

    const isFinishedOrEscalated = pengaduan.status === 'SELESAI' || pengaduan.status === 'DITERUSKAN_LURAH';
    const isProcessing = pengaduan.status === 'DIPROSES_RT';

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Detail Laporan: ${pengaduan.judul}`} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400 font-medium">
                        <Link href={route('rt.dashboard')} className="hover:text-green-400 transition-colors">Dashboard</Link>
                        <span className="text-gray-600">/</span>
                        <span className="text-white">Detail Laporan</span>
                    </nav>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl rounded-3xl relative">

                        {/* Header */}
                        <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                    Detail Laporan
                                </h1>
                                <p className="mt-1 text-gray-400 text-sm">
                                    Dari: <span className="text-green-400 font-bold">{pengaduan.user?.name ?? 'Warga'}</span> • {new Date(pengaduan.created_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                                </p>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${statusStyle} backdrop-blur-md shadow-lg`}>
                                {pengaduan.status.replace('_', ' ')}
                            </div>
                            {pengaduan.is_urgent && (
                                <div className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border bg-red-500/20 text-red-300 border-red-500/50 backdrop-blur-md shadow-lg animate-pulse">
                                    Mendesak
                                </div>
                            )}
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
                                            <span className="text-gray-500 col-span-1">Tanggal</span>
                                            <span className="text-white col-span-2 font-medium">{formattedTanggalKejadian}</span>
                                        </div>
                                        <div className="p-4 grid grid-cols-3 gap-4 items-center">
                                            <span className="text-gray-500 col-span-1">Kontak</span>
                                            <span className="text-white col-span-2 font-medium font-mono">{pengaduan.no_hp || '-'}</span>
                                        </div>
                                    </div>

                                    {/* --- AREA AKSI RT --- */}
                                    <div className="pt-8 border-t border-white/10">
                                        <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-green-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                                            </svg>
                                            Penanganan RT
                                        </h4>

                                        {!isFinishedOrEscalated ? (
                                            <div className="flex flex-wrap gap-4 mb-4">
                                                {/* TOMBOL SELESAI */}
                                                {isProcessing && (
                                                    <PrimaryButton
                                                        onClick={handleFinish}
                                                        className="bg-green-600 hover:bg-green-500 border-none shadow-lg shadow-green-900/30 px-6 py-3 text-sm"
                                                        disabled={processingId === 'finish'}
                                                    >
                                                        {processingId === 'finish' ? 'Memproses...' : '✅ Tandai Selesai'}
                                                    </PrimaryButton>
                                                )}

                                                <button
                                                    onClick={() => setActionState(actionState === 'catatan' ? null : 'catatan')}
                                                    className={`px-6 py-3 rounded-xl text-sm font-bold transition-all border border-white/10 shadow-lg ${actionState === 'catatan' ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/5 text-white hover:bg-white/10'}`}
                                                    disabled={!!processingId}
                                                >
                                                    📝 Tulis Catatan
                                                </button>

                                                <button
                                                    onClick={openLurahModal}
                                                    className="px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-red-900/40 to-red-800/40 text-red-200 border border-red-500/30 hover:border-red-500/50 hover:bg-red-800/50 transition-all shadow-lg shadow-red-900/10"
                                                    disabled={!!processingId}
                                                >
                                                    ⚠️ Teruskan ke Lurah
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center flex flex-col items-center">
                                                <p className="text-gray-400 mb-3">Laporan ini telah ditutup dengan status:</p>
                                                <span className={`px-4 py-2 rounded-full text-sm font-bold border ${statusStyle}`}>{pengaduan.status.replace('_', ' ')}</span>
                                            </div>
                                        )}

                                        {statusErrors.status && <p className="text-sm text-red-400 mt-2">{statusErrors.status}</p>}

                                        {/* FORM CATATAN */}
                                        {actionState === 'catatan' && (
                                            <div className="bg-black/40 p-6 border border-white/10 rounded-2xl mt-6 animate-fadeIn shadow-inner">
                                                <h5 className="font-bold text-white mb-4 flex items-center">
                                                    <span className="w-1 h-6 bg-green-500 rounded-full mr-3"></span>
                                                    Tambah Catatan Penanganan
                                                </h5>
                                                <form onSubmit={handleAddCatatan} className="space-y-5">
                                                    <textarea
                                                        value={catData.isi_tanggapan}
                                                        onChange={(e) => setCatData('isi_tanggapan', e.target.value)}
                                                        placeholder="Tulis detail progress, kendala, atau hasil penanganan..."
                                                        rows="4"
                                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-green-500 focus:border-green-500 transition-all"
                                                        required
                                                    />
                                                    <InputError message={catErrors.isi_tanggapan} className="mt-1" />



                                                    <div className="flex justify-end">
                                                        <PrimaryButton className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 border-none px-6 py-3 shadow-lg shadow-green-900/40 text-white" disabled={catProcessing}>
                                                            Kirim Catatan
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
                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-emerald-600 rounded-l-2xl"></div>
                                                    <div className="flex justify-between items-start mb-2 pl-3">
                                                        <span className="font-bold text-green-400 text-base">RT {t.user.nomor_rt}</span>
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

            {/* Modal Teruskan ke Lurah */}
            <Transition appear show={isLurahModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[999]" onClose={closeLurahModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/90 backdrop-blur-md" />
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-gray-900 border border-white/10 p-8 text-left align-middle shadow-2xl transition-all">
                                    <Dialog.Title as="h3" className="text-xl font-black leading-6 text-white mb-4">
                                        Teruskan ke Kelurahan?
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            Anda akan meneruskan laporan ini kepada <strong className="text-white">Lurah</strong>.
                                            <br /><br />
                                            Wewenang penanganan akan berpindah sepenuhnya. Anda tidak dapat lagi mengubah status laporan ini setelah diteruskan.
                                        </p>
                                    </div>

                                    <div className="mt-8 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-gray-300 hover:bg-white/10 hover:text-white focus:outline-none transition-colors"
                                            onClick={closeLurahModal}
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-xl border border-transparent bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700 shadow-lg shadow-red-900/30 transition-all transform hover:scale-105"
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
