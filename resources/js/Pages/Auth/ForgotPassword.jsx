// resources/js/Pages/Auth/ForgotPassword.jsx

import InputError from '@/Components/InputError';
import { Head, useForm, Link } from '@inertiajs/react';

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
                <div className="relative z-10 bg-green-800 bg-opacity-90 p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md">
                    
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

                    <form onSubmit={submit}>
                        {/* Input Email */}
                        <div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="Email address"
                                className="mt-1 block w-full rounded-md border-none shadow-sm p-3 text-lg focus:ring-2 focus:ring-blue-500"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoFocus
                            />
                            <InputError message={errors.email} className="mt-2 text-yellow-300" />
                        </div>


                        {/* Tombol Konfirmasi */}
                        <div className="mt-8">
                            <button 
                                className="w-full bg-blue-600 text-white p-3 rounded-md text-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-green-800 transition duration-150 ease-in-out" 
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