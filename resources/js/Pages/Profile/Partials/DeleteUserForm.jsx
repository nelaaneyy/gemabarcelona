import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeactivateUserForm({ className = '' }) {
    const [confirmingDeactivation, setConfirmingDeactivation] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        patch, // Menggunakan PATCH untuk mengirim perubahan status
        processing,
        errors,
        reset,
    } = useForm({
        password: '',
    });

    const confirmDeactivation = () => {
        setConfirmingDeactivation(true);
    };

    const deactivateUser = (e) => {
        e.preventDefault();

        patch(route('profile.deactivate'), { // Target rute deactivate yang baru
            preserveScroll: true,
            onSuccess: () => closeModal(), // Tutup modal setelah logout sukses
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingDeactivation(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Nonaktifkan Akun</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Akun Anda akan dinonaktifkan dan Anda akan otomatis dikeluarkan dari sistem.
                </p>
            </header>

            <DangerButton onClick={confirmDeactivation}>Nonaktifkan Akun</DangerButton>

            <Modal show={confirmingDeactivation} onClose={closeModal}>
                <form onSubmit={deactivateUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Apakah Anda yakin ingin menonaktifkan akun Anda?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Anda akan dikeluarkan dari sistem. Masukkan password Anda untuk mengonfirmasi.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Nonaktifkan
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
