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
    const inputStyle = "mt-1 block w-full border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400 hover:border-green-500/50 bg-white/5 text-white placeholder-white/30 transition-all [&:-webkit-autofill]:shadow-[0_0_0_1000px_#171717_inset] [&:-webkit-autofill]:text-white [&:-webkit-autofill]:-webkit-text-fill-color-white";
    const labelStyle = "text-green-50/80 mb-1 ml-1 font-medium";

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-bold text-white">Informasi Profil</h2>

                <p className="mt-1 text-sm text-gray-400">
                    Perbarui informasi akun profil dan alamat email Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" className={labelStyle} value="Nama" />

                    <input
                        id="name"
                        className={inputStyle}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                    />

                    <InputError className="mt-2 text-red-400" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" className={labelStyle} value="Email" />

                    <input
                        id="email"
                        type="email"
                        className={inputStyle}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2 text-red-400" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-300">
                            Alamat email Anda belum terverifikasi.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-400 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ml-1"
                            >
                                Klik di sini untuk mengirim ulang.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-400">
                                Tautan verifikasi baru telah dikirim ke alamat email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}
                        className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 border-none rounded-xl shadow-lg shadow-green-900/40 text-sm font-bold text-white transform hover:-translate-y-0.5 transition-all text-center justify-center py-2.5 px-6"
                    >
                        Simpan Perubahan
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
