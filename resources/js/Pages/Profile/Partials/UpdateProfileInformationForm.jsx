import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformationForm({ mustVerifyEmail, status, className = '', user }) {
    // Fallback if user prop is not passed (though it should be)
    const currentUser = user || usePage().props.auth?.user || {};

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: currentUser.name || '',
        email: currentUser.email || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    // Style Dark Mode
    const inputStyle = "mt-1 block w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400 hover:border-green-500/30 text-white placeholder-gray-500 transition-all shadow-inner";
    const labelStyle = "text-gray-300 text-sm font-bold mb-1 ml-1";

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-black text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-green-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    Informasi Profil
                </h2>

                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    Perbarui informasi akun visual dan alamat email Anda untuk menjaga profil tetap relevan.
                </p>
            </header>

            <form onSubmit={submit} className="mt-8 space-y-6">
                <div>
                    <InputLabel htmlFor="name" className={labelStyle} value="Nama Lengkap" />

                    <input
                        id="name"
                        className={inputStyle}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                        placeholder="Masukkan nama lengkap Anda"
                    />

                    <InputError className="mt-2 text-red-400 text-sm" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" className={labelStyle} value="Alamat Email" />

                    <input
                        id="email"
                        type="email"
                        className={inputStyle}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="contoh@email.com"
                    />

                    <InputError className="mt-2 text-red-400 text-sm" message={errors.email} />
                </div>

                {mustVerifyEmail && currentUser.email_verified_at === null && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                        <p className="text-sm text-yellow-200">
                            Alamat email Anda belum terverifikasi.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm font-bold text-yellow-400 hover:text-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ml-1 transition-colors"
                            >
                                Klik di sini untuk mengirim ulang.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-bold text-sm text-green-400">
                                Tautan verifikasi baru telah dikirim ke alamat email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-4">
                    <PrimaryButton
                        disabled={processing}
                        className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 border-none rounded-xl shadow-lg shadow-green-900/40 text-sm font-bold text-white transform hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center py-3 px-8"
                    >
                        Simpan Perubahan
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
                        <p className="text-sm font-bold text-green-400 flex items-center">
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
