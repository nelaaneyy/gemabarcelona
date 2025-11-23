// resources/js/Pages/Auth/Register.jsx (Kode Siap Copas)

import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { Button } from '@headlessui/react'

export default function Register() {
    // 1. Ini adalah state form kita yang sudah lengkap
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '', // State awal adalah string kosong
        nomor_ktp: '',
        alamat: '',
        nomor_rt: '',
        nama_kelurahan: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    // Ini adalah class styling yang akan kita pakai ulang untuk semua input
    const inputStyle = "mt-1 block w-full rounded-md border-none shadow-sm p-3 text-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200";

    return (
        <>
            <Head title="Daftar" />

            {/* 1. Container Utama */}
            <div
                // Kita pakai `py-12` agar ada scroll jika form-nya terlalu panjang di HP
                className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
                style={{ backgroundImage: "url('/image/barcelona1.png')" }}
            >
                {/* 2. Overlay Gelap */}
                <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

                {/* 3. Kotak Form (Responsif) */}
                <div className="relative z-10 w-full max-w-md bg-green-800 bg-opacity-75 backdrop-blur-md p-8 sm:p-10 text-white border border-white/20 rounded-2xl shadow-xl transition-all">

                    <h1 className="text-white text-3xl font-bold text-center tracking-wider mb-2">
                        GEMA
                    </h1>
                    <h2 className="text-white text-2xl font-light text-center mb-8">
                        Buat Akun Baru
                    </h2>

                    <form onSubmit={submit} className="space-y-6">
                        {/* --- FIELD UTAMA --- */}

                        <div className="w-full max-w-md px-4">
                            <Field>
                                <Label htmlFor="name" className="text-sm/6 font-medium text-white">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    placeholder="Nama Lengkap"
                                    value={data.name}
                                    className={clsx('mt-3 block w-full rounded-lg border-none bg-white/2 px-3 py-1.5 text-sm/6 text-black', 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoFocus
                                />
                                <InputError message={errors.name} className="mt-2 text-yellow-300" />
                            </Field>

                        </div>

                        <div className="w-full max-w-md px-4">
                            <Field>
                                <Label htmlFor="email" className="text-sm/6 font-medium text-white">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email address"
                                    value={data.email}
                                    className={clsx('mt-3 block w-full rounded-lg border-none bg-white/2 px-3 py-1.5 text-sm/6 text-black', 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2 text-yellow-300" />
                            </Field>

                        </div>

                        {/* --- PILIHAN ROLE (KOREKSI DI SINI) --- */}
                        <div className="w-full max-w-md px-4">
                            <Field>
                                <Label htmlFor="role" className="text-sm/6 font-medium text-white">Daftar Sebagai</Label>
                                <select
                                    id="role"
                                    value={data.role}
                                    // Kita gunakan style yang sama, tapi text-gray-800 agar terlihat
                                    className={`${clsx('mt-3 block w-full rounded-lg border-none bg-white/2 px-3 py-1.5 text-sm/6 text-black', 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')} text-gray-800`}
                                    onChange={(e) => setData('role', e.target.value)}
                                    required
                                >
                                    {/* KOREKSI: Gunakan value="" agar cocok dengan state awal '' */}
                                    <option value="">---Pilih Role---</option>
                                    <option value="warga">Warga</option>
                                    <option value="rt">RT</option>
                                    <option value="lurah">Lurah</option>
                                </select>
                                {/* InputError untuk role */}
                                <InputError message={errors.role} className="mt-2 text-yellow-300" />
                            </Field>

                        </div>

                        {/* --- FIELD KONDISIONAL (WARGA) --- */}
                        {data.role === 'warga' && (
                            <>
                                <div className="w-full max-w-md px-4">
                                    <label htmlFor="nomor_ktp" className="text-sm/6 font-medium text-white">Nomor KTP</label>
                                    <input
                                        id="nomor_ktp"
                                        placeholder="Nomor KTP (16 digit)"
                                        value={data.nomor_ktp}
                                        className={clsx('mt-3 block w-full rounded-lg border-none bg-white/2 px-3 py-1.5 text-sm/6 text-black', 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')}
                                        onChange={(e) => setData('nomor_ktp', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.nomor_ktp} className="mt-2 text-yellow-300" />
                                </div>

                                <div className="w-full max-w-md px-4">
                                    <label htmlFor="alamat" className="text-sm/6 font-medium text-white">Alamat Lengkap</label>
                                    <textarea
                                        id="alamat"
                                        placeholder="Alamat Lengkap"
                                        value={data.alamat}
                                        className={`${clsx('mt-3 block w-full rounded-lg border-none bg-white/2 px-3 py-1.5 text-sm/6 text-black', 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')} h-24`} // Buat lebih tinggi
                                        onChange={(e) => setData('alamat', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.alamat} className="mt-2 text-yellow-300" />
                                </div>

                                <div className="w-full max-w-md px-4">
                                    <label htmlFor="nomor_rt" className="text-sm/6 font-medium text-white">Nomor RT</label>
                                    <input
                                        id="nomor_rt"
                                        placeholder="Nomor RT (Contoh: 031)"
                                        value={data.nomor_rt}
                                        className={clsx('mt-3 block w-full rounded-lg border-none bg-white/2 px-3 py-1.5 text-sm/6 text-black', 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')}
                                        onChange={(e) => setData('nomor_rt', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.nomor_rt} className="mt-2 text-yellow-300" />
                                </div>
                            </>
                        )}

                        {/* --- FIELD KONDISIONAL (RT) --- */}
                        {data.role === 'rt' && (
                            <div className="w-full max-w-md px-4">
                                <label htmlFor="nomor_rt" className="text-sm/6 font-medium text-white">Nomor RT</label>
                                <input
                                    id="nomor_rt"
                                    placeholder="Nomor RT (Contoh: 031)"
                                    value={data.nomor_rt}
                                    className={clsx('mt-3 block w-full rounded-lg border-none bg-white/2 px-3 py-1.5 text-sm/6 text-black', 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')}
                                    onChange={(e) => setData('nomor_rt', e.target.value)}
                                    required
                                />
                                <InputError message={errors.nomor_rt} className="mt-2 text-yellow-300" />
                            </div>
                        )}

                        {/* --- FIELD KONDISIONAL (LURAH) --- */}
                        {data.role === 'lurah' && (
                            <div className="w-full max-w-md px-4">
                                <label htmlFor="nama_kelurahan" className="text-sm/6 font-medium text-white">Nama Kelurahan</label>
                                <input
                                    id="nama_kelurahan"
                                    placeholder="Nama Kelurahan"
                                    value={data.nama_kelurahan}
                                    className={clsx('mt-3 block w-full rounded-lg border-none bg-white/2 px-3 py-1.5 text-sm/6 text-black', 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')}
                                    onChange={(e) => setData('nama_kelurahan', e.target.value)}
                                    required
                                />
                                <InputError message={errors.nama_kelurahan} className="mt-2 text-yellow-300" />
                            </div>
                        )}

                        {/* --- FIELD PASSWORD --- */}
                        <div className="w-full max-w-md px-4">
                            <label htmlFor="password" className="text-sm/6 font-medium text-white">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={data.password}
                                className={clsx('mt-3 block w-full rounded-lg border-none bg-white/2 px-3 py-1.5 text-sm/6 text-black', 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2 text-yellow-300" />
                        </div>

                        <div className="w-full max-w-md px-4">
                            <label htmlFor="password_confirmation" className="text-sm/6 font-medium text-white">Konfirmasi Password</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                placeholder="Konfirmasi Password"
                                value={data.password_confirmation}
                                className={clsx('mt-3 block w-full rounded-lg border-none bg-white/2 px-3 py-1.5 text-sm/6 text-black', 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2 text-yellow-300" />
                        </div>

                        {/* --- TOMBOL SUBMIT --- */}
                        <div className="w-full max-w-md px-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white p-3 rounded-md text-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-green-800 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0"
                                disabled={processing}
                            >
                                Daftar
                            </button>
                        </div>

                        {/* --- LINK KE LOGIN --- */}
                        <div className="text-center">
                            <Link
                                href={route('login')}
                                className="text-sm text-white hover:text-gray-300 hover:underline transition-colors duration-200"
                            >
                                Sudah punya akun? <span className="font-semibold">Masuk di sini</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
