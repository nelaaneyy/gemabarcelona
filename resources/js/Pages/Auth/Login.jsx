// resources/js/Pages/Auth/Login.jsx

import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />
            
            {/* 1. Container Utama (Layar Penuh, Flexbox, Padding Mobile) */}
            <div 
                className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-cover bg-center"
                style={{ backgroundImage: "url('/image/barcelona1.png')" }} 
            >
                {/* 2. Overlay Gelap */}
                <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

                {/* 3. Kotak Form (Responsif: w-full di mobile, max-w-md di desktop) */}
                <div className="relative z-10 w-full max-w-md bg-green-800 bg-opacity-90 p-8 sm:p-10 rounded-2xl shadow-xl transition-all">
                    
                    <h1 className="text-white text-3xl font-bold text-center tracking-wider mb-2">
                        GEMA
                    </h1>
                    <h2 className="text-white text-2xl font-light text-center mb-8">
                        Selamat Datang!
                    </h2>
                    
                    {status && <div className="mb-4 font-medium text-sm text-green-300">{status}</div>}

                    <form onSubmit={submit} className="space-y-6">
                        {/* Input Email */}
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="Email address"
                                className="mt-1 block w-full rounded-md border-none shadow-sm p-3 text-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2 text-yellow-300" />
                        </div>

                        {/* Input Password */}
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Password"
                                className="mt-1 block w-full rounded-md border-none shadow-sm p-3 text-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2 text-yellow-300" />
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex items-center justify-end">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-white hover:text-gray-300 hover:underline transition-colors duration-200"
                                >
                                    forgot password?
                                </Link>
                            )}
                        </div>

                        {/* Tombol Masuk (Log In) */}
                        <div>
                            <button 
                                className="w-full bg-blue-600 text-white p-3 rounded-md text-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-green-800 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0" 
                                disabled={processing}
                            >
                                Masuk
                            </button>
                        </div>

                        {/* Link ke Halaman Register */}
                        <div className="text-center">
                            <Link
                                href={route('register')}
                                className="text-sm text-white hover:text-gray-300 hover:underline transition-colors duration-200"
                            >
                                Belum punya akun? <span className="font-semibold">Daftar di sini</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}