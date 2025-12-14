import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
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
    const inputStyle = "mt-1 block w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 hover:border-blue-500/30 text-white placeholder-gray-500 transition-all shadow-inner";
    const labelStyle = "text-gray-300 text-sm font-bold mb-1 ml-1";

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-black text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    Perbarui Password
                </h2>

                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    Pastikan akun Anda menggunakan password yang panjang dan acak agar tetap aman.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-8 space-y-6">
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
                        placeholder="••••••••"
                    />

                    <InputError message={errors.current_password} className="mt-2 text-red-400 text-sm" />
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
                        placeholder="Minimal 8 karakter"
                    />

                    <InputError message={errors.password} className="mt-2 text-red-400 text-sm" />
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
                        placeholder="Ulangi password baru"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2 text-red-400 text-sm" />
                </div>

                <div className="flex items-center gap-4 pt-4">
                    <PrimaryButton
                        disabled={processing}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-none rounded-xl shadow-lg shadow-blue-900/40 text-sm font-bold text-white transform hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center py-3 px-8"
                    >
                        Simpan Password
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0 translate-y-2"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in-out"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-bold text-blue-400 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            Tersimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
