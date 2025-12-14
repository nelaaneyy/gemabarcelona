// resources/js/Pages/Auth/ResetPassword.jsx
import InputError from '@/Components/InputError';
import { Head, useForm, Link } from '@inertiajs/react'; // Add Link import if needed later
import { Field, Input, Label, Button } from '@headlessui/react';
import clsx from 'clsx';
import { useEffect } from 'react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
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
            <Head title="Reset Password" />

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
                                Buat Kata Sandi Baru
                            </h2>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email Address */}
                            <Field>
                                <Label htmlFor="email" className={labelClasses}>Email</Label>
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

                            {/* Password */}
                            <Field>
                                <Label htmlFor="password" className={labelClasses}>Password Baru</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    placeholder="Kata sandi baru"
                                    className={inputClasses}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    autoComplete="new-password"
                                />
                                <InputError message={errors.password} className="mt-2 ml-1 text-red-300 font-medium" />
                            </Field>

                            {/* Confirm Password */}
                            <Field>
                                <Label htmlFor="password_confirmation" className={labelClasses}>Konfirmasi Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    placeholder="Ulangi kata sandi baru"
                                    className={inputClasses}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                    autoComplete="new-password"
                                />
                                <InputError message={errors.password_confirmation} className="mt-2 ml-1 text-red-300 font-medium" />
                            </Field>


                            {/* Submit Button */}
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
                                    {processing ? 'Mereset...' : 'Reset Password'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
