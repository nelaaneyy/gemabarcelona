import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { Transition } from '@headlessui/react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    // Style Dark Mode
    const inputStyle = "mt-1 block w-full border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400 hover:border-green-500/50 bg-white/5 text-white placeholder-white/30 transition-all [&:-webkit-autofill]:shadow-[0_0_0_1000px_#171717_inset] [&:-webkit-autofill]:text-white [&:-webkit-autofill]:-webkit-text-fill-color-white";
    const labelStyle = "text-green-50/80 mb-1 ml-1 font-medium";

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-bold text-white">Perbarui Password</h2>

                <p className="mt-1 text-sm text-gray-400">
                    Pastikan akun Anda menggunakan password yang panjang dan acak agar tetap aman.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="current_password" className={labelStyle} value="Password Saat Ini" />

                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className={inputStyle}
                        autoComplete="current-password"
                    />

                    <InputError message={errors.current_password} className="mt-2 text-red-400" />
                </div>

                <div>
                    <InputLabel htmlFor="password" className={labelStyle} value="Password Baru" />

                    <input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className={inputStyle}
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2 text-red-400" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" className={labelStyle} value="Konfirmasi Password" />

                    <input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className={inputStyle}
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2 text-red-400" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}
                        className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 border-none rounded-xl shadow-lg shadow-green-900/40 text-sm font-bold text-white transform hover:-translate-y-0.5 transition-all text-center justify-center py-2.5 px-6"
                    >
                        Simpan Password
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-400">Tersimpan.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
