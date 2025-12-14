// resources/js/Pages/Auth/Register.jsx
import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Field, Input, Label, Textarea, Button, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

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

    // Style umum untuk input agar konsisten
    const inputClasses = clsx(
        'block w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-white/30',
        'focus:bg-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/50 outline-none transition-all duration-300',
        'hover:bg-white/15'
    );

    const labelClasses = "block text-sm font-medium text-green-50 mb-1 ml-1";

    const roles = [
        { id: 'warga', name: 'Warga' },
        { id: 'rt', name: 'Ketua RT' },
        { id: 'lurah', name: 'Lurah' },
    ];

    const selectedRole = roles.find(r => r.id === data.role) || null;

    return (
        <>
            <Head title="Daftar Akun Baru" />

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
                <div className="relative z-10 w-full max-w-2xl">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl transition-all">

                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-black text-white tracking-widest mb-2">
                                GEMA
                            </h1>
                            <h2 className="text-xl font-light text-green-100">
                                Buat Akun Baru
                            </h2>
                        </div>

                        <form onSubmit={submit} className="space-y-5">

                            {/* NAMA */}
                            <Field>
                                <Label htmlFor="name" className={labelClasses}>Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    placeholder="Nama Lengkap sesuai KTP"
                                    className={inputClasses}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoFocus
                                />
                                <InputError message={errors.name} className="mt-2 ml-1 text-red-300 font-medium" />
                            </Field>

                            {/* EMAIL */}
                            <Field>
                                <Label htmlFor="email" className={labelClasses}>Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    placeholder="alamat@email.com"
                                    className={inputClasses}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2 ml-1 text-red-300 font-medium" />
                            </Field>

                            {/* ROLE SELECTION */}
                            {/* ROLE SELECTION */}
                            {/* ... (Previous code remains, skipping to relevant part for brevity in replacement) ... */}
                            <Field>
                                <Label className={labelClasses}>Daftar Sebagai</Label>
                                <div className="relative">
                                    <Listbox value={selectedRole} onChange={(role) => setData('role', role.id)}>
                                        <div className="relative mt-1">
                                            <ListboxButton className={clsx(
                                                'relative w-full cursor-default rounded-xl bg-white/10 py-3 pl-4 pr-10 text-left text-white shadow-md focus:outline-none focus:ring-2 focus:ring-green-400/50 sm:text-sm border border-white/10 hover:bg-white/15 transition-colors duration-300',
                                            )}>
                                                <span className={clsx("block truncate", !selectedRole && "text-white/30")}>
                                                    {selectedRole ? selectedRole.name : '--- Pilih Peran Pengguna ---'}
                                                </span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <ChevronUpDownIcon
                                                        className="h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </ListboxButton>
                                            <ListboxOptions
                                                transition
                                                className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-black py-1 text-base shadow-lg ring-1 ring-white/10 ring-opacity-5 focus:outline-none sm:text-sm data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in"
                                            >
                                                {roles.map((person, personIdx) => (
                                                    <ListboxOption
                                                        key={personIdx}
                                                        className={({ focus }) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${focus ? 'bg-green-600 text-white' : 'text-gray-300'
                                                            }`
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium text-white' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {person.name}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </div>
                                    </Listbox>
                                </div>
                                <InputError message={errors.role} className="mt-2 ml-1 text-red-300 font-medium" />
                            </Field>

                            {/* KONDISIONAL: WARGA */}
                            {data.role === 'warga' && (
                                <div className="space-y-5 border-l-2 border-green-500/30 pl-4 py-2 mt-4 animate-fadeIn">
                                    <Field>
                                        <Label htmlFor="nomor_ktp" className={labelClasses}>Nomor KTP</Label>
                                        <Input
                                            id="nomor_ktp"
                                            value={data.nomor_ktp}
                                            placeholder="16 digit NIK"
                                            className={inputClasses}
                                            onChange={(e) => setData('nomor_ktp', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.nomor_ktp} className="mt-2 ml-1 text-red-300 font-medium" />
                                    </Field>

                                    <Field>
                                        <Label htmlFor="alamat" className={labelClasses}>Alamat Lengkap</Label>
                                        <Textarea
                                            id="alamat"
                                            value={data.alamat}
                                            placeholder="Nama Jalan, Blok, Nomor Rumah"
                                            className={clsx(inputClasses, 'h-24 resize-none')}
                                            onChange={(e) => setData('alamat', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.alamat} className="mt-2 ml-1 text-red-300 font-medium" />
                                    </Field>

                                    <Field>
                                        <Label htmlFor="nomor_rt" className={labelClasses}>Nomor RT</Label>
                                        <Input
                                            id="nomor_rt"
                                            value={data.nomor_rt}
                                            placeholder="Contoh: 005"
                                            className={inputClasses}
                                            onChange={(e) => setData('nomor_rt', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.nomor_rt} className="mt-2 ml-1 text-red-300 font-medium" />
                                    </Field>
                                </div>
                            )}

                            {/* KONDISIONAL: RT */}
                            {data.role === 'rt' && (
                                <div className="space-y-5 border-l-2 border-green-500/30 pl-4 py-2 mt-4 animate-fadeIn">
                                    <Field>
                                        <Label htmlFor="nomor_rt" className={labelClasses}>Nomor RT yang Dipimpin</Label>
                                        <Input
                                            id="nomor_rt"
                                            value={data.nomor_rt}
                                            placeholder="Contoh: 005"
                                            className={inputClasses}
                                            onChange={(e) => setData('nomor_rt', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.nomor_rt} className="mt-2 ml-1 text-red-300 font-medium" />
                                    </Field>
                                </div>
                            )}

                            {/* KONDISIONAL: LURAH */}
                            {data.role === 'lurah' && (
                                <div className="space-y-5 border-l-2 border-green-500/30 pl-4 py-2 mt-4 animate-fadeIn">
                                    <Field>
                                        <Label htmlFor="nama_kelurahan" className={labelClasses}>Nama Kelurahan</Label>
                                        <Input
                                            id="nama_kelurahan"
                                            value={data.nama_kelurahan}
                                            placeholder="Nama Kelurahan"
                                            className={inputClasses}
                                            onChange={(e) => setData('nama_kelurahan', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.nama_kelurahan} className="mt-2 ml-1 text-red-300 font-medium" />
                                    </Field>
                                </div>
                            )}

                            {/* PASSWORD FIELDS */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field>
                                    <Label htmlFor="password" className={labelClasses}>Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        placeholder="••••••••"
                                        className={inputClasses}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2 ml-1 text-red-300 font-medium" />
                                </Field>

                                <Field>
                                    <Label htmlFor="password_confirmation" className={labelClasses}>Ulangi Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        placeholder="••••••••"
                                        className={inputClasses}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2 ml-1 text-red-300 font-medium" />
                                </Field>
                            </div>

                            {/* SUBMIT BUTTON */}
                            <div className="pt-4">
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
                                    {processing ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                                </Button>
                            </div>

                            {/* LOGIN LINK */}
                            <div className="text-center mt-6">
                                <p className="text-sm text-green-100/80">
                                    Sudah memiliki akun?{' '}
                                    <Link
                                        href={route('login')}
                                        className="font-bold text-white hover:text-green-300 underline decoration-green-300/50 hover:decoration-green-300 transition-all"
                                    >
                                        Masuk di sini
                                    </Link>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
