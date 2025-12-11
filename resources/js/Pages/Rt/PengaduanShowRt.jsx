import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

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

    const [processingId, setProcessingId] = useState(null); // Track which button is processing

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
                // Optional: Show success feedback if needed, but flash message usually handles it
            },
            onError: (errors) => {
                setProcessingId(null);
                console.error("Status Update Failed:", errors);
                // Feature to identify error:
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

        // ... (rest of simple postCat logic if unrelated) OR standard useForm is fine here for simple form
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
    const fotoUrl = pengaduan.foto ? `/storage/${pengaduan.foto}` : 'https://via.placeholder.com/600x400/E5E7EB/9CA3AF?text=Tidak+Ada+Foto';
    const statusBgColor = getStatusStyles(pengaduan.status);

    const isFinishedOrEscalated = pengaduan.status === 'SELESAI' || pengaduan.status === 'DITERUSKAN_LURAH';
    const isProcessing = pengaduan.status === 'DIPROSES_RT';

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Detail Laporan: ${pengaduan.judul}`} />

            <div className="p-6 sm:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 sm:p-8 border-b border-gray-200 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Detail Laporan
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Laporan dari: {pengaduan.user?.name ?? 'Warga'} (RT {pengaduan.user?.nomor_rt ?? 'N/A'})
                                </p>
                            </div>
                            <Link
                                href={route('rt.dashboard')}
                                className="text-sm text-indigo-600 hover:text-indigo-900"
                            >
                                &larr; Kembali ke Dashboard
                            </Link>
                        </div>

                        <div className="p-6 sm:p-8">
                            {flash?.success && (
                                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                                    {flash.success}
                                </div>
                            )}

                            {/* ... Detail Laporan (Image, Title, Data) ... */}
                            <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                                <img src={fotoUrl} alt={`Foto ${pengaduan.judul}`} className="w-full h-auto object-contain max-h-96 bg-gray-50" />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-gray-800">{pengaduan.judul}</h3>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBgColor}`}>
                                        Status: {pengaduan.status.replace('_', ' ')}
                                    </span>
                                    {pengaduan.status === 'DIPROSES_RT' && (
                                        <span className="ml-2 text-xs text-yellow-600 font-medium"> (Sedang ditangani oleh RT Anda)</span>
                                    )}
                                </div>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                                    <div className="sm:col-span-1"><dt className="font-medium text-gray-500">Nama Pelapor Asli</dt><dd className="mt-1 text-gray-900">{pengaduan.nama_pelapor}</dd></div>
                                    <div className="sm:col-span-1"><dt className="font-medium text-gray-500">Tanggal Kejadian</dt><dd className="mt-1 text-gray-900">{formattedTanggalKejadian}</dd></div>
                                    <div className="sm:col-span-1"><dt className="font-medium text-gray-500">No. HP</dt><dd className="mt-1 text-gray-900">{pengaduan.no_hp || '-'}</dd></div>
                                    <div className="sm:col-span-1"><dt className="font-medium text-gray-500">Tanggal Lapor</dt><dd className="mt-1 text-gray-900">{formattedTanggalLapor}</dd></div>
                                    <div className="sm:col-span-2"><dt className="font-medium text-gray-500">Alamat Kejadian</dt><dd className="mt-1 text-gray-900">{pengaduan.alamat_kejadian}</dd></div>
                                    <div className="sm:col-span-2"><dt className="font-medium text-gray-500">Deskripsi</dt><dd className="mt-1 text-gray-900 whitespace-pre-wrap">{pengaduan.isi_laporan}</dd></div>
                                </dl>
                            </div>
                            {/* ... Akhir Detail Laporan ... */}


                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">Aksi RT</h4>

                                {!isFinishedOrEscalated ? (
                                    <div className="flex space-x-3 mb-4">

                                        {/* TOMBOL BARU: TANDAI SELESAI */}
                                        {isProcessing && (
                                            <PrimaryButton
                                                onClick={handleFinish}
                                                className="bg-green-600 hover:bg-green-700"
                                                disabled={processingId === 'finish'}
                                            >
                                                {processingId === 'finish' ? 'Memproses...' : '✅ Tandai Selesai'}
                                            </PrimaryButton>
                                        )}

                                        <PrimaryButton
                                            onClick={() => setActionState(actionState === 'catatan' ? null : 'catatan')}
                                            className={actionState === 'catatan' ? 'bg-green-700' : 'bg-green-600'}
                                            disabled={!!processingId}
                                        >
                                            Tambah Catatan/Tanggapan
                                        </PrimaryButton>

                                        <PrimaryButton
                                            onClick={openLurahModal}
                                            className="bg-red-500 hover:bg-red-600"
                                            disabled={!!processingId}
                                        >
                                            Teruskan ke Kelurahan
                                        </PrimaryButton>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 font-medium">Laporan ini sudah ditutup (Status: {pengaduan.status.replace('_', ' ')})</p>
                                )}

                                {statusErrors.status && <p className="text-sm text-red-600 mt-2">{statusErrors.status}</p>}

                                {/* HAPUS: {actionState === 'status' && (...) } PAnel radio button Status */}

                                {actionState === 'catatan' && (
                                    <div className="bg-gray-50 p-4 border border-green-200 rounded-lg mt-4">
                                        <h5 className="font-semibold mb-3 text-gray-700">Tambahkan Catatan Resmi:</h5>
                                        <form onSubmit={handleAddCatatan} className="space-y-3">
                                            <textarea
                                                value={catData.isi_tanggapan}
                                                onChange={(e) => setCatData('isi_tanggapan', e.target.value)}
                                                placeholder="Tulis tanggapan atau catatan..."
                                                rows="4"
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                                                required
                                            />
                                            <InputError message={catErrors.isi_tanggapan} className="mt-2" />

                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id="is_private"
                                                    checked={catData.is_private}
                                                    onChange={(e) => setCatData('is_private', e.target.checked)}
                                                    className="form-checkbox text-green-600 rounded"
                                                />
                                                <label htmlFor="is_private" className="text-sm text-gray-700">
                                                    Catatan ini hanya untuk arsip RT (Tidak ditampilkan ke Warga)
                                                </label>
                                            </div>

                                            <div className="pt-3">
                                                <PrimaryButton className="bg-green-600 hover:bg-green-700" disabled={catProcessing}>
                                                    Kirim Catatan
                                                </PrimaryButton>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">Riwayat Tanggapan ({tanggapans?.length ?? 0})</h4>

                                {/* ... Riwayat Tanggapan (Tidak ada perubahan) ... */}
                                {tanggapans && tanggapans.map(t => (
                                    <div key={t.id} className="bg-gray-100 p-3 rounded-lg border-l-4 border-gray-400 mb-3 text-sm">
                                        <p className="font-semibold text-gray-800">Dari RT {t.user.nomor_rt} pada {new Date(t.created_at).toLocaleDateString('id-ID')}</p>
                                        <p className="mt-1 whitespace-pre-wrap">{t.isi_tanggapan}</p>
                                        {t.is_private && <span className="text-xs text-red-500 font-medium"> (Catatan Pribadi RT)</span>}
                                    </div>
                                ))}
                                {tanggapans?.length === 0 && (
                                    <p className="text-gray-500 text-sm">Belum ada catatan atau tanggapan resmi untuk laporan ini.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Teruskan ke Lurah (Tidak ada perubahan signifikan) */}
            <Transition appear show={isLurahModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeLurahModal}>
                    {/* ... (Modal backdrop dan panel) ... */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" />
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
                                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Konfirmasi Teruskan ke Kelurahan
                                    </Dialog.Title>

                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Apakah Anda yakin ingin meneruskan laporan ini ke tingkat Kelurahan? Setelah diteruskan, penanganan akan diambil alih oleh Lurah.
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={handleEscalateToLurah}
                                            disabled={statusProcessing}
                                        >
                                            Ya, Teruskan Sekarang
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 ml-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                                            onClick={closeLurahModal}
                                        >
                                            Batal
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
