// resources/js/Pages/Rt/PengaduanShowRt.jsx
// Versi dengan MODAL untuk Ubah Status

import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

// --- TAMBAHKAN IMPORT BARU ---
import { useState, Fragment } from 'react'; // 'Fragment' diperlukan untuk Transisi
import { Dialog, Transition } from '@headlessui/react';
// --- BATAS IMPORT BARU ---

export default function PengaduanShowRt({ auth, pengaduan }) { 

    const { flash } = usePage().props;

    // Setup useForm untuk update status (ini tetap sama)
    const { data, setData, patch, processing, errors, reset } = useForm({
        status: pengaduan.status,
    });

    // --- TAMBAHKAN STATE UNTUK MODAL ---
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
        reset('status'); // Reset dropdown ke status awal jika dibatalkan
    }

    function openModal() {
        setIsOpen(true);
    }
    // --- BATAS STATE MODAL ---

    // Handler untuk submit form
    const handleUpdateStatus = (e) => {
        e.preventDefault();
        const url = `/rt/pengaduan/${pengaduan.id}/status`;
        patch(url, {
            preserveScroll: true,
            onSuccess: () => closeModal(), // <-- Tutup modal jika update berhasil
        });
    };

    // ... (kode format tanggal, fotoUrl, statusBgColor tetap sama) ...
    const formattedTanggalKejadian = new Date(pengaduan.tanggal_kejadian).toLocaleDateString('id-ID', { dateStyle: 'long' });
    const formattedTanggalLapor = new Date(pengaduan.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' });
    const fotoUrl = pengaduan.foto ? `/storage/${pengaduan.foto}` : 'https://via.placeholder.com/600x400/E5E7EB/9CA3AF?text=Tidak+Ada+Foto';
    let statusBgColor = 'bg-gray-100 text-gray-800';
    if (pengaduan.status === 'BARU') statusBgColor = 'bg-blue-100 text-blue-800';
    if (pengaduan.status === 'DIPROSES_RT') statusBgColor = 'bg-yellow-100 text-yellow-800';
    if (pengaduan.status === 'DITERUSKAN_LURAH') statusBgColor = 'bg-purple-100 text-purple-800';
    if (pengaduan.status === 'SELESAI') statusBgColor = 'bg-green-100 text-green-800';
    if (pengaduan.status === 'DITOLAK') statusBgColor = 'bg-red-100 text-red-800';


    return (
        <AdminLayout user={auth.user}> {/* Pastikan pakai AdminLayout */}
            <Head title={`Detail Laporan: ${pengaduan.judul}`} />

            <div className="p-6 sm:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        {/* ... (Header Halaman Detail tetap sama) ... */}
                        <div className="p-6 sm:p-8 border-b border-gray-200 flex justify-between items-center">
                           {/* ... (kode header) ... */}
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

                        {/* Konten Detail */}
                        <div className="p-6 sm:p-8">
                             {flash?.success && (
                                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                                    {flash.success}
                                </div>
                            )}

                            {/* ... (Gambar Laporan & Detail Teks tetap sama) ... */}
                            <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                                <img src={fotoUrl} alt={`Foto ${pengaduan.judul}`} className="w-full h-auto object-contain max-h-96 bg-gray-50" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-gray-800">{pengaduan.judul}</h3>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBgColor}`}>
                                        Status: {pengaduan.status.replace('_', ' ')}
                                    </span>
                                </div>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                                    {/* ... (Semua detail <dt> dan <dd>) ... */}
                                    <div className="sm:col-span-1"><dt className="font-medium text-gray-500">Nama Pelapor Asli</dt><dd className="mt-1 text-gray-900">{pengaduan.nama_pelapor}</dd></div>
                                    <div className="sm:col-span-1"><dt className="font-medium text-gray-500">Tanggal Kejadian</dt><dd className="mt-1 text-gray-900">{formattedTanggalKejadian}</dd></div>
                                    <div className="sm:col-span-1"><dt className="font-medium text-gray-500">No. HP</dt><dd className="mt-1 text-gray-900">{pengaduan.no_hp || '-'}</dd></div>
                                    <div className="sm:col-span-1"><dt className="font-medium text-gray-500">Tanggal Lapor</dt><dd className="mt-1 text-gray-900">{formattedTanggalLapor}</dd></div>
                                    <div className="sm:col-span-2"><dt className="font-medium text-gray-500">Alamat Kejadian</dt><dd className="mt-1 text-gray-900">{pengaduan.alamat_kejadian}</dd></div>
                                    <div className="sm:col-span-2"><dt className="font-medium text-gray-500">Deskripsi</dt><dd className="mt-1 text-gray-900 whitespace-pre-wrap">{pengaduan.isi_laporan}</dd></div>
                                </dl>
                            </div>

                            {/* --- UBAH BAGIAN AKSI RT INI --- */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">Ubah Status</h4>
                                <PrimaryButton
                                    type="button" // <-- Pastikan type="button" agar tidak submit
                                    onClick={openModal} // <-- Panggil fungsi openModal
                                    className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                                >
                                    Ubah Status Laporan
                                </PrimaryButton>
                                {/* Nanti bisa tambahkan tombol "Beri Tanggapan" di sini */}
                            </div>
                            {/* --- BATAS PERUBAHAN --- */}

                        </div>
                    </div>
                </div>
            </div>

            {/* --- TAMBAHKAN MODAL HEADLESS UI DI SINI --- */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    {/* Overlay */}
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

                    {/* Konten Modal */}
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Ubah Status Laporan
                                    </Dialog.Title>
                                    
                                    {/* --- PINDAHKAN FORM KE DALAM MODAL --- */}
                                    <form onSubmit={handleUpdateStatus} className="mt-4">
                                        <div className="flex-grow">
                                            <InputLabel htmlFor="status" value="Status Baru" />
                                            <select
                                                id="status"
                                                name="status"
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value="BARU">Baru</option>
                                                <option value="DIPROSES_RT">Diproses RT</option>
                                                <option value="DITERUSKAN_LURAH">Diteruskan ke Lurah</option>
                                                <option value="SELESAI">Selesai</option>
                                                <option value="DITOLAK">Ditolak</option>
                                            </select>
                                            <InputError message={errors.status} className="mt-1 text-xs" />
                                        </div>

                                        {/* Tombol Aksi Modal */}
                                        <div className="mt-6 flex justify-end space-x-3">
                                            <button
                                                type="button" // <-- Pastikan type="button"
                                                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={closeModal}
                                            >
                                                Batal
                                            </button>
                                            <PrimaryButton
                                                className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                                                disabled={processing || data.status === pengaduan.status}
                                            >
                                                Update Status
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                    {/* --- BATAS FORM --- */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* --- BATAS MODAL --- */}
            
        </AdminLayout> 
    );
}