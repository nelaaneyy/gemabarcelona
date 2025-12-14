import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
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
    const inputStyle = "mt-1 block w-full border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 bg-white/5 text-white placeholder-white/30 transition-all";

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-xl font-bold text-white">Hapus Akun</h2>

                <p className="mt-1 text-sm text-gray-400">
                    Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion} className="rounded-xl shadow-lg shadow-red-900/20">
                Hapus Akun
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-xl font-bold text-white">
                        Apakah Anda yakin ingin menghapus akun Anda?
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        Setelah akun dihapus, semua data akan hilang permanen. Silakan masukkan password Anda untuk konfirmasi tindakan ini.
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
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2 text-red-400" />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal} className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl">
                            Batal
                        </SecondaryButton>

                        <DangerButton className="rounded-xl shadow-lg shadow-red-900/20" disabled={processing}>
                            Hapus Akun
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
