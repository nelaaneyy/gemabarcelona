import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';

export default function ManajemenWarga({ auth, wargas }) {
    const [confirmingUserDeactivation, setConfirmingUserDeactivation] = useState(false);
    const [userToDeactivate, setUserToDeactivate] = useState(null);

    // Form untuk Deaktivasi (Nonaktifkan)
    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        is_active: false,
        reason: '',
    });

    const confirmDeactivation = (user) => {
        setUserToDeactivate(user);
        setConfirmingUserDeactivation(true);
        setData({ is_active: false, reason: '' });
        clearErrors();
    };

    const closeModal = () => {
        setConfirmingUserDeactivation(false);
        setUserToDeactivate(null);
        reset();
    };

    const deactivateUser = (e) => {
        e.preventDefault();

        post(route('rt.warga.toggle', userToDeactivate.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    // Handler untuk Aktivasi Kembali
    const activateUser = (user) => {
        if (confirm(`Apakah Anda yakin ingin mengaktifkan kembali akun ${user.name}?`)) {
            router.post(route('rt.warga.toggle', user.id), {
                is_active: true
            });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Manajemen Warga" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                            Manajemen Warga
                        </h1>
                        <p className="text-gray-400">
                            Kelola data warga RT {auth.user.nomor_rt} yang terdaftar dalam sistem.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl rounded-3xl">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white">Daftar Warga</h2>
                            {/* Bisa tambah tombol "Tambah Warga" manual jika diperlukan nanti */}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/10">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Nama & Alamat</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Kontak</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-transparent divide-y divide-white/10">
                                    {wargas.map((warga) => (
                                        <tr key={warga.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-white">{warga.name}</div>
                                                <div className="text-sm text-gray-400">Blok/No: {warga.alamat || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-300">{warga.email}</div>
                                                <div className="text-sm text-gray-500 font-mono">{warga.no_hp || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {warga.is_active ? (
                                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                                                        Aktif
                                                    </span>
                                                ) : (
                                                    <div className="flex flex-col items-start">
                                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                                                            Nonaktif
                                                        </span>
                                                        <span className="text-xs text-red-400 mt-1 italic max-w-xs truncate">
                                                            "{warga.deactivation_reason}"
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {warga.is_active ? (
                                                    <button
                                                        onClick={() => confirmDeactivation(warga)}
                                                        className="text-red-400 hover:text-red-300 font-bold hover:underline transition-colors"
                                                    >
                                                        Nonaktifkan
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => activateUser(warga)}
                                                        className="text-green-400 hover:text-green-300 font-bold hover:underline transition-colors"
                                                    >
                                                        Aktifkan
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {wargas.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500 italic">
                                                Belum ada data warga terdaftar.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi Deaktivasi */}
            <Modal show={confirmingUserDeactivation} onClose={closeModal}>
                <form onSubmit={deactivateUser} className="p-6">
                    <h2 className="text-xl font-bold text-white">
                        Nonaktifkan Akun Warga
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                        Apakah Anda yakin ingin menonaktifkan akun <span className="font-bold text-white">{userToDeactivate?.name}</span>?
                        Warga tidak akan bisa login setelah akun dinonaktifkan.
                    </p>

                    <div className="mt-6">
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-300">Alasan Penonaktifan</label>
                        <textarea
                            id="reason"
                            className="mt-2 block w-full bg-black/50 border border-white/10 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm text-white placeholder-gray-500 p-3"
                            rows="3"
                            value={data.reason}
                            onChange={(e) => setData('reason', e.target.value)}
                            placeholder="Contoh: Pindah domisili, Tidak membayar iuran..."
                            required
                        ></textarea>
                        <InputError message={errors.reason} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <SecondaryButton onClick={closeModal} className="bg-white/10 text-white hover:bg-white/20 border-none">
                            Batal
                        </SecondaryButton>

                        <DangerButton className="bg-red-600 hover:bg-red-500 border-none" disabled={processing}>
                            Nonaktifkan Akun
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
