import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    // Style Dark Mode
    const inputStyle = "mt-1 block w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-white placeholder-gray-500 transition-all";

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-xl font-black text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    Hapus Akun
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                    Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion} className="rounded-xl shadow-lg shadow-red-900/20 px-6 py-3 font-bold bg-red-600/80 hover:bg-red-600 border border-red-500/20">
                Lanjutkan Hapus Akun
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-xl font-black text-white">
                        Apakah Anda yakin?
                    </h2>

                    <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                        Tindakan ini tidak dapat dibatalkan. Setelah akun dihapus, semua data akan hilang permanen. Silakan masukkan password Anda untuk konfirmasi.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={inputStyle}
                            autoFocus
                            placeholder="Masukkan password Anda"
                        />

                        <InputError message={errors.password} className="mt-2 text-red-400" />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal} className="bg-white/10 border-transparent text-gray-300 hover:bg-white/20 hover:text-white rounded-xl font-bold">
                            Batal
                        </SecondaryButton>

                        <DangerButton className="rounded-xl shadow-lg shadow-red-900/40 bg-red-600 hover:bg-red-500 border-none font-bold" disabled={processing}>
                            Hapus Akun
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
