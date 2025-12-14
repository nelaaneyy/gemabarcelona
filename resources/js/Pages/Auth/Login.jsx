// resources/js/Pages/Auth/Login.jsx
import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Field, Input, Label, Button } from '@headlessui/react';
import clsx from 'clsx';

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
            <Head title="Masuk Akun" />

            <div className="min-h-screen relative flex items-center justify-center overflow-hidden">

                {/* 1. BACKGROUND IMAGE & OVERLAY GRADIENT */}
                <div
                    className="absolute inset-0 z-0 transform scale-105 transition-transform duration-[20s] ease-linear animate-slow-zoom"
                    style={{
                        backgroundImage: "url('/image/barcelona1.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-black/80 to-green-900/90 z-0"></div>

                {/* 2. GLASS CARD CONTAINER */}
                <div className="relative z-10 w-full max-w-lg px-6">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] transition-all hover:border-white/30">

                        {/* HEADER */}
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-black text-white tracking-widest mb-2 drop-shadow-md">
                                GEMA
                            </h1>
                            <p className="text-green-100 text-lg font-light tracking-wide">
                                Selamat Datang Kembali
                            </p>
                        </div>

                        {/* STATUS MESSAGE */}
                        {status && (
                            <div className={`mb-6 p-4 rounded-xl border ${status.includes('DINONAKTIFKAN') ? 'bg-red-500/20 border-red-500/50 text-red-100 font-bold' : 'bg-green-500/20 border-green-500/50 text-green-100 font-medium'} text-center backdrop-blur-sm`}>
                                {status.includes('DINONAKTIFKAN') ? status.replace('DINONAKTIFKAN', 'DINONAKTIFKAN') : status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">

                            {/* EMAIL */}
                            <Field>
                                <Label htmlFor="email" className="block text-sm font-medium text-green-50 mb-2 ml-1">Email / NIK</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="contoh@email.com"
                                    className={clsx(
                                        'block w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3.5 text-white placeholder-white/30',
                                        'focus:bg-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/50 outline-none transition-all duration-300',
                                        'hover:bg-white/15'
                                    )}
                                    autoComplete="username"
                                    required
                                />
                                <InputError message={errors.email} className="mt-2 ml-1 text-red-300 font-medium" />
                            </Field>

                            {/* PASSWORD */}
                            <Field>
                                <div className="flex justify-between items-center mb-2 ml-1">
                                    <Label htmlFor="password" className="block text-sm font-medium text-green-50">Password</Label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs text-green-300 hover:text-white transition-colors"
                                        >
                                            Lupa Password?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className={clsx(
                                        'block w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3.5 text-white placeholder-white/30',
                                        'focus:bg-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/50 outline-none transition-all duration-300',
                                        'hover:bg-white/15'
                                    )}
                                    autoComplete="current-password"
                                    required
                                />
                                <InputError message={errors.password} className="mt-2 ml-1 text-red-300 font-medium" />
                            </Field>

                            {/* SUBMIT BUTTON */}
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
                                {processing ? 'Memproses...' : 'Masuk Sekarang'}
                            </Button>

                            {/* REGISTER LINK */}
                            <div className="text-center mt-8">
                                <p className="text-sm text-green-100/80">
                                    Belum memiliki akun?{' '}
                                    <Link
                                        href={route('register')}
                                        className="font-bold text-white hover:text-green-300 underline decoration-green-300/50 hover:decoration-green-300 transition-all"
                                    >
                                        Daftar di sini
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* FOOTER TEXT */}
                    <div className="text-center mt-8 relative z-10">
                        <p className="text-xs text-white/40 tracking-wider">
                            &copy; 2025 GEMA Perumahan Barcelona
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}