// resources/js/Pages/Lurah/PengaduanShowLurah.jsx (Kode Siap Copas)

import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

// Fungsi bantuan untuk style status
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

export default function PengaduanShowLurah({ auth, pengaduan, tanggapans }) {
    const { flash } = usePage().props;

    // Form untuk Aksi Lurah
    const { data, setData, patch, processing, errors } = useForm({
        status: pengaduan.status,
    });

    // State untuk modal keputusan final
    const [isKeputusanModalOpen, setIsKeputusanModalOpen] = useState(false);
    const [finalStatus, setFinalStatus] = useState(null); // Menentukan SELESAI atau DITOLAK


    // --- HANDLER MODAL ---
    function closeModal() { setIsKeputusanModalOpen(false); setFinalStatus(null); }
    function openModal(status) {
        setFinalStatus(status);
        setIsKeputusanModalOpen(true);
    }

    // --- HANDLER SUBMIT LURAH ---
    const handleKeputusanFinal = (e) => {
        e.preventDefault();

        const url = route('lurah.pengaduan.proses', pengaduan.id);

        patch(url, {
            status: finalStatus // Kirim status final
        }, {
            onSuccess: () => closeModal(),
        });
    };

    // Data tampilan
    const formattedTanggalLapor = new Date(pengaduan.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' });
    const fotoUrl = pengaduan.foto ? `/storage/${pengaduan.foto}` : 'https://via.placeholder.com/600x400/E5E7EB/9CA3AF?text=Tidak+Ada+Foto';
    const statusBgColor = getStatusStyles(pengaduan.status);
    const isFinalized = pengaduan.status === 'SELESAI' || pengaduan.status === 'DITOLAK';


    return (
        <AdminLayout user={auth.user}>
            <Head title={`Laporan Eskalasi: ${pengaduan.judul}`} />

            <div className="p-6 sm:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        {/* Header */}
                        <div className="p-6 sm:p-8 border-b border-gray-200">
                            <Link href={route('lurah.dashboard')} className="text-sm text-gray-600 hover:text-gray-900 mb-2 block">
                                &larr; Kembali ke Antrian
                            </Link>

                            <h2 className="text-2xl font-semibold text-gray-900">
                                Detail Laporan Eskalasi
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Dari RT {pengaduan.user?.nomor_rt ?? 'N/A'}.
                            </p>
                        </div>

                        {/* Konten Detail */}
                        <div className="p-6 sm:p-8">

                            {/* Status dan Judul */}
                            <div className="space-y-4 mb-6">
                                <h3 className="text-2xl font-semibold text-gray-800">{pengaduan.judul}</h3>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBgColor}`}>
                                        Status: {pengaduan.status.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>

                            {/* --- BAGIAN AKSI LURAH (KEPUTUSAN) --- */}
                            {!isFinalized && (
                                <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg">
                                    <h4 className="text-lg font-medium text-gray-900 mb-3">Keputusan Lurah</h4>
                                    <p className='text-sm text-gray-700 mb-3'>Setelah review laporan RT dan riwayat penanganan, tentukan status akhir:</p>
                                    <div className="flex space-x-3">
                                        <PrimaryButton
                                            onClick={() => openModal('SELESAI')}
                                            className="bg-green-600 hover:bg-green-700"
                                            disabled={processing}
                                        >
                                            Nyatakan Selesai
                                        </PrimaryButton>
                                        <PrimaryButton
                                            onClick={() => openModal('DITOLAK')}
                                            className="bg-red-600 hover:bg-red-700"
                                            disabled={processing}
                                        >
                                            Nyatakan Ditolak
                                        </PrimaryButton>
                                    </div>
                                </div>
                            )}

                            <hr className="my-6" />

                            {/* Riwayat Tanggapan RT */}
                            <div className="mb-8">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">Riwayat Tanggapan RT ({tanggapans?.length ?? 0})</h4>

                                {tanggapans?.filter(t => !t.is_private).map(t => ( // Hanya tampilkan tanggapan PUBLIK
                                    <div key={t.id} className="bg-gray-100 p-3 rounded-lg border-l-4 border-purple-400 mb-3 text-sm">
                                        <p className="font-semibold text-gray-800">Tanggapan dari RT {t.user.nomor_rt} pada {new Date(t.created_at).toLocaleDateString('id-ID')}</p>
                                        <p className="mt-1 whitespace-pre-wrap">{t.isi_tanggapan}</p>
                                    </div>
                                ))}
                                {tanggapans?.filter(t => !t.is_private).length === 0 && (
                                     <p className="text-gray-500 text-sm">RT belum memberikan tanggapan publik.</p>
                                )}
                            </div>

                            {/* Detail Laporan Asli */}
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Detail Laporan Asli</h4>
                            <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                                <img src={fotoUrl} alt={`Foto ${pengaduan.judul}`} className="w-full h-auto object-contain max-h-96 bg-gray-50" />
                            </div>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                                <div className="sm:col-span-1"><dt className="font-medium text-gray-500">Pelapor Asli</dt><dd className="mt-1 text-gray-900">{pengaduan.nama_pelapor}</dd></div>
                                <div className="sm:col-span-1"><dt className="font-medium text-gray-500">Tanggal Lapor</dt><dd className="mt-1 text-gray-900">{formattedTanggalLapor}</dd></div>
                                <div className="sm:col-span-2"><dt className="font-medium text-gray-500">Alamat Kejadian</dt><dd className="mt-1 text-gray-900">{pengaduan.alamat_kejadian}</dd></div>
                                <div className="sm:col-span-2"><dt className="font-medium text-gray-500">Deskripsi</dt><dd className="mt-1 text-gray-900 whitespace-pre-wrap">{pengaduan.isi_laporan}</dd></div>
                            </dl>


                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODAL KONFIRMASI KEPUTUSAN FINAL --- */}
            <Transition appear show={isKeputusanModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    {/* ... (Overlay dan Transisi) ... */}
                    <div className="fixed inset-0 bg-black/30" />

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
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Konfirmasi Keputusan Final
                                    </Dialog.Title>

                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Anda akan mengubah status laporan ini menjadi:
                                            <span className='font-bold text-red-600'> {finalStatus && finalStatus.replace('_', ' ')}</span>.
                                            Keputusan ini bersifat final. Lanjutkan?
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none"
                                            onClick={handleKeputusanFinal}
                                            disabled={processing}
                                        >
                                            Konfirmasi & Simpan
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 ml-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                                            onClick={closeModal}
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
