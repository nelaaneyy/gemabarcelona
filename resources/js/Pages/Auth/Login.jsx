// resources/js/Pages/Auth/Login.jsx

import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { Button } from '@headlessui/react'

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
                <div className="relative z-10 w-full max-w-md bg-green-800 bg-opacity-75 backdrop-blur-md p-8 sm:p-10 text-white border border-white/20 rounded-2xl shadow-xl transition-all">
                    
                    <h1 className="text-white text-3xl font-bold text-center tracking-wider mb-2">
                        GEMA
                    </h1>
                    <h2 className="text-white text-2xl font-light text-center mb-8">
                        Selamat Datang!
                    </h2>
                    
                    {status && <div className="mb-4 font-medium text-sm text-green-300">{status}</div>}

                    <form onSubmit={submit} className="space-y-6">
                        {/* Input Email */}
                        <div className="w-full max-w-md px-4">
                        <Field>
                            <Label className="text-sm/6 font-medium text-white" htmlFor="email">Email</Label>
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
                            />
                            <InputError message={errors.email} className="mt-2 text-yellow-300" />
                        </Field>    
                        </div>

                        {/* Input Password */}
                        <div className="w-full max-w-md px-4">
                            <Field>
                            <Label className="text-sm/6 font-medium text-white" htmlFor="password" >Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Password"
                                className={clsx('mt-3 block w-full rounded-lg border-none bg-white/2 px-3 py-1.5 text-sm/6 text-black','focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')}
                                autoComplete="current-password" 
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2 text-yellow-300" />
                            </Field>
                            
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
                        <div className="w-full max-w-md px-4">
                            <Button 
                                type="submit"
                                className="w-full items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-blue-600 data-open:bg-blue-700 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0" 
                                disabled={processing}
                            >
                                Masuk
                            </Button>
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