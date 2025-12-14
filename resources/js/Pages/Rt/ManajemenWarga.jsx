import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react'; // Perbaikan: router diimport dari @inertiajs/react
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal'; // Pastikan Anda punya komponen Modal, atau gunakan HeadlessUI Dialog manual

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

    // Handler untuk Aktivasi Kembali (Tanpa Modal, langsung konfirmasi alert biasa atau langsung eksekusi)
    const activateUser = (user) => {
        if (confirm(`Apakah Anda yakin ingin mengaktifkan kembali akun ${user.name}?`)) {
            router.post(route('rt.warga.toggle', user.id), { // Perbaikan: Gunakan router.post
                is_active: true
            });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Manajemen Warga" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Daftar Warga RT {auth.user.nomor_rt}</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email/No HP</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {wargas.map((warga) => (
                                        <tr key={warga.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{warga.name}</div>
                                                <div className="text-sm text-gray-500">Blok/No: {warga.alamat || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{warga.email}</div>
                                                <div className="text-sm text-gray-500">{warga.no_hp || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {warga.is_active ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Aktif
                                                    </span>
                                                ) : (
                                                    <div className="flex flex-col">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 w-fit">
                                                            Nonaktif
                                                        </span>
                                                        <span className="text-xs text-red-500 mt-1 italic max-w-xs truncate">
                                                            "{warga.deactivation_reason}"
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {warga.is_active ? (
                                                    <button
                                                        onClick={() => confirmDeactivation(warga)}
                                                        className="text-red-600 hover:text-red-900 font-bold"
                                                    >
                                                        Nonaktifkan Akun
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => activateUser(warga)}
                                                        className="text-green-600 hover:text-green-900 font-bold"
                                                    >
                                                        Aktifkan Kembali
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {wargas.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500 italic">
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
                    <h2 className="text-lg font-medium text-gray-900">
                        Apakah Anda yakin ingin menonaktifkan akun {userToDeactivate?.name}?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Warga tidak akan bisa login ke aplikasi setelah akun dinonaktifkan.
                        Silakan masukkan alasan penonaktifan agar warga mengetahui penyebabnya.
                    </p>

                    <div className="mt-6">
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Alasan Penonaktifan</label>
                        <textarea
                            id="reason"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            rows="3"
                            value={data.reason}
                            onChange={(e) => setData('reason', e.target.value)}
                            placeholder="Contoh: Pindah domisili, Tidak membayar iuran 3 bulan berturut-turut, dll."
                            required
                        ></textarea>
                        <InputError message={errors.reason} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Nonaktifkan Akun
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
