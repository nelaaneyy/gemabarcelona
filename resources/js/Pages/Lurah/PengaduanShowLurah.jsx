import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';

// FUNGSI INI HARUS SESUAI DENGAN STATUS BARU UNTUK LURAH
const getStatusStyles = (status) => {
    switch (status) {
        case 'BARU': return 'bg-blue-100 text-blue-800';
        case 'DIPROSES_RT': return 'bg-yellow-100 text-yellow-800';
        case 'DITERUSKAN_LURAH': return 'bg-purple-100 text-purple-800';
        case 'DIPROSES_LURAH': return 'bg-orange-100 text-orange-800'; // <<< STATUS BARU
        case 'SELESAI': return 'bg-green-100 text-green-800';
        case 'DITOLAK': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export default function PengaduanShowLurah({ auth, pengaduan, tanggapans }) {
    const { flash } = usePage().props;
    const [actionState, setActionState] = useState(null);

    // useForm untuk PATCH status
    const {
        processing: statusProcessing,
        patch,
        errors: statusErrors
    } = useForm({});

    // useForm untuk Tanggapan/Catatan Baru
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


    // =====================================================
    // >>> HANDLER BARU UNTUK LURAH <<<
    // =====================================================

    // Handler untuk Selesai
    const handleFinish = () => {
        // Menggunakan nama route yang sudah didefinisikan di routes/web.php
        const url = route('lurah.pengaduan.updateStatus', pengaduan.id);

        patch(url, { status: 'SELESAI' }, {
            preserveScroll: true,
            onSuccess: () => setActionState(null),
            onError: (err) => console.error("Finish failed:", err),
        });
    };

    // Handler untuk Tolak
    const handleReject = () => {
        // Anda bisa menambahkan modal konfirmasi jika diperlukan,
        // tapi kita gunakan patch langsung untuk kemudahan.
        const url = route('lurah.pengaduan.updateStatus', pengaduan.id);

        patch(url, { status: 'DITOLAK' }, {
            preserveScroll: true,
            onSuccess: () => setActionState(null),
            onError: (err) => console.error("Reject failed:", err),
        });
    };

    const handleAddCatatan = (e) => {
        e.preventDefault();
        // Menggunakan nama route yang sudah didefinisikan di routes/web.php
        const url = route('lurah.pengaduan.tanggapan.store', pengaduan.id);

        postCat(url, catData, {
            onSuccess: () => {
                resetCat();
                setActionState(null);
            },
            onError: (err) => console.error("Validation/Server Error:", err),
        });
    };
    // =====================================================


    const formattedTanggalKejadian = new Date(pengaduan.tanggal_kejadian).toLocaleDateString('id-ID', { dateStyle: 'long' });
    const formattedTanggalLapor = new Date(pengaduan.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' });
    const fotoUrl = pengaduan.foto ? `/storage/${pengaduan.foto}` : 'https://via.placeholder.com/600x400/E5E7EB/9CA3AF?text=Tidak+Ada+Foto';
    const statusBgColor = getStatusStyles(pengaduan.status);

    // KONDISI UNTUK MENYEMBUNYIKAN/MENAMPILKAN TOMBOL AKSI LURAH
    const isFinishedOrRejected = pengaduan.status === 'SELESAI' || pengaduan.status === 'DITOLAK';
    const isProcessingLurah = pengaduan.status === 'DIPROSES_LURAH'; // Hanya tampil jika sedang diproses Lurah

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Detail Laporan: ${pengaduan.judul}`} />
            <div className="p-6 sm:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        {/* Header dan Detail Laporan (Sama seperti RT) */}
                        <div className="p-6 sm:p-8 border-b border-gray-200 flex justify-between items-center">
                            {/* ... */}
                        </div>

                        <div className="p-6 sm:p-8">
                            {/* Flash Message */}
                            {/* ... */}

                            {/* Foto dan Detail Laporan */}
                            {/* ... */}

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">Aksi Lurah</h4>

                                {!isFinishedOrRejected ? (
                                    <div className="flex space-x-3 mb-4">

                                        {/* Tombol Aksi Lurah */}
                                        {(isProcessingLurah || pengaduan.status === 'DITERUSKAN_LURAH') && (
                                            <>
                                                <PrimaryButton
                                                    onClick={handleFinish}
                                                    className="bg-green-600 hover:bg-green-700"
                                                    disabled={statusProcessing}
                                                >
                                                    ✅ Tandai Selesai
                                                </PrimaryButton>

                                                <PrimaryButton
                                                    onClick={handleReject}
                                                    className="bg-red-600 hover:bg-red-700"
                                                    disabled={statusProcessing}
                                                >
                                                    ❌ Tolak Laporan
                                                </PrimaryButton>
                                            </>
                                        )}


                                        <PrimaryButton
                                            onClick={() => setActionState(actionState === 'catatan' ? null : 'catatan')}
                                            className={actionState === 'catatan' ? 'bg-indigo-700' : 'bg-indigo-600'}
                                            disabled={statusProcessing}
                                        >
                                            Tambah Catatan/Tanggapan
                                        </PrimaryButton>

                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 font-medium">Laporan ini sudah ditutup (Status: {pengaduan.status.replace('_', ' ')})</p>
                                )}

                                {statusErrors.status && <p className="text-sm text-red-600 mt-2">{statusErrors.status}</p>}


                                {actionState === 'catatan' && (
                                    <div className="bg-gray-50 p-4 border border-indigo-200 rounded-lg mt-4">
                                        {/* Form Tambah Catatan (Sama seperti RT, tetapi disesuaikan warna) */}
                                        <h5 className="font-semibold mb-3 text-gray-700">Tambahkan Catatan Resmi:</h5>
                                        <form onSubmit={handleAddCatatan} className="space-y-3">
                                            {/* Textarea dan Checkbox */}
                                            {/* ... */}
                                            <div className="pt-3">
                                                <PrimaryButton className="bg-indigo-600 hover:bg-indigo-700" disabled={catProcessing}>
                                                    Kirim Catatan
                                                </PrimaryButton>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>

                            {/* Riwayat Tanggapan */}
                            {/* ... */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Hapus Modal Teruskan ke Lurah (Tidak relevan di sini) */}
        </AdminLayout>
    );
}
