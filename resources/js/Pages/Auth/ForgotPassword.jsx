// resources/js/Pages/Auth/ForgotPassword.jsx

import InputError from '@/Components/InputError';
import { Head, useForm, Link } from '@inertiajs/react';
import { Field, Input, Label, Button } from '@headlessui/react';
import clsx from 'clsx';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    // Style umum untuk input agar konsisten
    const inputClasses = clsx(
        'block w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-white/30',
        'focus:bg-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/50 outline-none transition-all duration-300',
        'hover:bg-white/15'
    );

    const labelClasses = "block text-sm font-medium text-green-50 mb-1 ml-1";

    return (
        <>
            <Head title="Lupa Password" />

            <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">

                {/* 1. BACKGROUND IMAGE & OVERLAY GRADIENT */}
                <div
                    className="absolute inset-0 z-0 opacity-60"
                    style={{
                        backgroundImage: "url('/image/barcelona1.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-black/80 to-green-900/90 z-0"></div>

                {/* 2. GLASS CARD CONTAINER */}
                <div className="relative z-10 w-full max-w-md">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl transition-all">

                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-black text-white tracking-widest mb-2">
                                GEMA
                            </h1>
                            <h2 className="text-xl font-light text-green-100">
                                Lupa Kata Sandi
                            </h2>
                        </div>

                        <p className="mb-6 text-sm text-green-50/80 text-center leading-relaxed">
                            Masukkan email yang terdaftar, kami akan mengirimkan tautan untuk mereset kata sandi Anda.
                        </p>

                        {/* Menampilkan status (misal: "password reset link sent") */}
                        {status && (
                            <div className="mb-6 rounded-lg bg-green-500/20 border border-green-500/30 p-4">
                                <p className="text-sm font-medium text-green-300 text-center">{status}</p>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Input Email */}
                            <Field>
                                <Label htmlFor="email" className={labelClasses}>Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder="alamat@email.com"
                                    className={inputClasses}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoFocus
                                />
                                <InputError message={errors.email} className="mt-2 ml-1 text-red-300 font-medium" />
                            </Field>

                            {/* Tombol Konfirmasi */}
                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className={clsx(
                                        'w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-green-600 to-green-500',
                                        'hover:from-green-500 hover:to-green-400 hover:shadow-green-500/30 transform hover:-translate-y-1',
                                        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300',
                                        processing && 'opacity-75 cursor-not-allowed'
                                    )}
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Tautan Reset'}
                                </Button>
                            </div>

                            {/* Link kembali ke Halaman Login */}
                            <div className="text-center mt-6">
                                <Link
                                    href={route('login')}
                                    className="font-bold text-white hover:text-green-300 underline decoration-green-300/50 hover:decoration-green-300 transition-all text-sm"
                                >
                                    Kembali ke Halaman Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}