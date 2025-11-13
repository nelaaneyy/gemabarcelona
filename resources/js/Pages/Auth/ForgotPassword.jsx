// resources/js/Pages/Auth/ForgotPassword.jsx

import InputError from '@/Components/InputError';
import { Head, useForm, Link } from '@inertiajs/react';
import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { Button } from '@headlessui/react'


export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Lupa Password" />

            {/* Container Utama dengan Background Image */}
            <div 
                className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('/image/barcelona1.png')" }} // <-- Pakai gambar yang sama
            >
                {/* Overlay gelap tipis (Opsional) */}
                <div className="absolute inset-0 bg-black opacity-30"></div>

                {/* Kotak Form */}
                <div className="relative z-10 w-full max-w-md bg-green-800 bg-opacity-75 backdrop-blur-md p-8 sm:p-10 text-white border border-white/20 rounded-2xl shadow-xl transition-all">
                    
                    <h1 className="text-white text-3xl font-bold text-center mb-2">
                        GEMA
                    </h1>
                    <h2 className="text-white text-2xl font-light text-center mb-8">
                        Lupa Kata Sandi
                    </h2>

                    <p className="mb-4 text-sm text-white text-center">
                        Masukkan email Anda, kami akan mengirimkan link untuk reset password.
                    </p>

                    {/* Menampilkan status (misal: "password reset link sent") */}
                    {status && <div className="mb-4 font-medium text-sm text-green-300">{status}</div>}

                    <form onSubmit={submit} className="space-y-6">
                        {/* Input Email */}
                        <div className="w-full max-w-md px-4">
                            <Field>
                            <Label className="text-sm/6 font-medium text-white" htmlFor="email">Email Address</Label>
                                <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="Email address"
                                className={clsx('mt-3 block w-full rounded-lg border-none bg-white/2 px-3 py-1.5 text-sm/6 text-black','focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoFocus
                            />
                            <InputError message={errors.email} className="mt-2 text-yellow-300" />
                            </Field>
                            
                        </div>


                        {/* Tombol Konfirmasi */}
                        <div className="w-full max-w-md px-4">
                            <button 
                                className="w-full items-center gap-10 rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-blue-600 data-open:bg-blue-700 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0" 
                                disabled={processing}
                            >
                                Konfirmasi
                            </button>
                        </div>

                        {/* Link kembali ke Halaman Login */}
                        <div className="mt-6 text-center">
                            <Link
                                href={route('login')}
                                className="text-sm text-white hover:text-gray-300 hover:underline"
                            >
                                Kembali ke Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}