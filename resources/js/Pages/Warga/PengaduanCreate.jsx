import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Switch } from '@headlessui/react';
import UploadFoto from '@/Components/UploadFoto';

// --- Ikon Kamera ---
const CameraIconMini = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white/50 group-hover:text-green-400 transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);

export default function PengaduanCreate() {
    const { auth } = usePage().props;
    const [photoPreview, setPhotoPreview] = useState(null);

    const { data, setData, post, processing, errors, progress } = useForm({
        judul: '',
        isi_laporan: '',
        foto: null,
        nama_pelapor: auth.user.name || '',
        no_hp: '',
        alamat_kejadian: '',
        tanggal_kejadian: '',
        is_urgent: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('warga.pengaduan.store'));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('foto', file);
            setPhotoPreview(URL.createObjectURL(file));
        } else {
            setData('foto', null);
            setPhotoPreview(null);
        }
    };

    // === STYLE DARK MODE ===
    // Fix Autofill white background by injecting a dark shadow inset
    const inputStyle = "mt-1 block w-full border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400 hover:border-green-500/50 bg-white/5 text-white placeholder-white/30 transition-all [&:-webkit-autofill]:shadow-[0_0_0_1000px_#171717_inset] [&:-webkit-autofill]:text-white [&:-webkit-autofill]:-webkit-text-fill-color-white";
    const textareaStyle = `${inputStyle} resize-vertical min-h-[120px]`;
    const inputReadOnlyStyle = `${inputStyle} bg-white/5 opacity-60 cursor-not-allowed`;
    const labelStyle = "text-green-50/80 mb-1 ml-1 font-medium";

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Buat Laporan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Header Section */}
                    <div className="mb-8 px-4 sm:px-0">
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                            Buat Laporan Baru
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Laporkan masalah infrastruktur atau fasilitas umum di lingkungan Anda.
                        </p>
                    </div>

                    {/* Glass Card Form */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl sm:rounded-3xl">

                        <form onSubmit={submit}>
                            <div className="p-6 sm:p-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                                    {/* Kolom Kiri: Upload Foto */}
                                    <div className="md:col-span-1 space-y-4">
                                        <div className={labelStyle}>
                                            Lampirkan Foto Bukti <span className="text-red-500">*</span>
                                        </div>

                                        <UploadFoto
                                            onFileSelect={(file) => setData('foto', file)}
                                            error={errors.foto}
                                            currentImage={photoPreview} // If you want to show preview if editing
                                        />

                                        {/* Progress Bar */}
                                        {/* Progress Bar */}
                                        {progress && (
                                            <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
                                                <div className="bg-gradient-to-r from-green-500 to-green-400 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress.percentage}%` }}></div>
                                            </div>
                                        )}
                                        <InputError message={errors.foto} className="mt-1 text-xs text-red-300" />
                                    </div>

                                    {/* Kolom Kanan: Input Fields */}
                                    <div className="md:col-span-2 space-y-6">

                                        {/* Judul */}
                                        <div>
                                            <InputLabel htmlFor="judul" className={labelStyle}>
                                                Judul Laporan <span className="text-red-500">*</span>
                                            </InputLabel>
                                            <input
                                                id="judul" value={data.judul} className={inputStyle}
                                                placeholder="Contoh: Jalan Berlubang di RT 05"
                                                onChange={(e) => setData('judul', e.target.value)} required autoFocus
                                            />
                                            <InputError message={errors.judul} className="mt-1 text-xs text-red-300" />
                                        </div>

                                        {/* Row 2: Tanggal & Nama */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <InputLabel htmlFor="tanggal_kejadian" className={labelStyle}>
                                                    Tanggal Kejadian <span className="text-red-500">*</span>
                                                </InputLabel>
                                                <input
                                                    id="tanggal_kejadian" type="date" value={data.tanggal_kejadian} className={inputStyle}
                                                    onChange={(e) => setData('tanggal_kejadian', e.target.value)} required
                                                    max={new Date().toISOString().split('T')[0]}
                                                />
                                                <InputError message={errors.tanggal_kejadian} className="mt-1 text-xs text-red-300" />
                                            </div>
                                            <div>
                                                <InputLabel htmlFor="nama_pelapor" value="Nama Pelapor" className={labelStyle} />
                                                <input
                                                    id="nama_pelapor" value={data.nama_pelapor}
                                                    className={inputReadOnlyStyle}
                                                    onChange={(e) => setData('nama_pelapor', e.target.value)} required
                                                    readOnly
                                                />
                                                <InputError message={errors.nama_pelapor} className="mt-1 text-xs text-red-300" />
                                            </div>
                                        </div>

                                        {/* Row 3: HP & Alamat */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <InputLabel htmlFor="no_hp" value="No. WhatsApp (Opsional)" className={labelStyle} />
                                                <input
                                                    id="no_hp" type="tel" value={data.no_hp} className={inputStyle}
                                                    placeholder="08xxxxxxxxxx"
                                                    onChange={(e) => setData('no_hp', e.target.value.replace(/\D/g, ''))}
                                                />
                                                <InputError message={errors.no_hp} className="mt-1 text-xs text-red-300" />
                                            </div>
                                            <div>
                                                <InputLabel htmlFor="alamat_kejadian" className={labelStyle}>
                                                    Lokasi Kejadian <span className="text-red-500">*</span>
                                                </InputLabel>
                                                <input
                                                    id="alamat_kejadian" value={data.alamat_kejadian} className={inputStyle}
                                                    placeholder="Nama Jalan / Patokan"
                                                    onChange={(e) => setData('alamat_kejadian', e.target.value)} required
                                                />
                                                <InputError message={errors.alamat_kejadian} className="mt-1 text-xs text-red-300" />
                                            </div>
                                        </div>

                                        {/* Deskripsi */}
                                        <div>
                                            <InputLabel htmlFor="isi_laporan" className={labelStyle}>
                                                Deskripsi Lengkap <span className="text-red-500">*</span>
                                            </InputLabel>
                                            <textarea
                                                id="isi_laporan" value={data.isi_laporan} className={textareaStyle}
                                                onChange={(e) => setData('isi_laporan', e.target.value)} required
                                                placeholder="Jelaskan detail permasalahan, kronologi, atau dampak yang ditimbulkan..."
                                            ></textarea>
                                            <InputError message={errors.isi_laporan} className="mt-1 text-xs text-red-300" />
                                        </div>

                                        {/* Urgent Switch */}
                                        <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                                            <div>
                                                <span className="text-white font-medium block">Laporan Mendesak?</span>
                                                <span className="text-sm text-gray-400">Aktifkan jika membutuhkan penanganan segera (Darurat).</span>
                                            </div>
                                            <Switch
                                                checked={data.is_urgent}
                                                onChange={(value) => setData('is_urgent', value)}
                                                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black
                                                    ${data.is_urgent ? 'bg-red-600' : 'bg-white/20'}
                                                `}
                                            >
                                                <span className="sr-only">Laporan Mendesak</span>
                                                <span
                                                    aria-hidden="true"
                                                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                                        ${data.is_urgent ? 'translate-x-5' : 'translate-x-0'}
                                                    `}
                                                />
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex flex-col-reverse sm:flex-row items-center justify-end p-6 sm:p-10 bg-black/20 border-t border-white/10 gap-3">
                                <Link
                                    href={route('warga.dashboard')}
                                    className="w-full sm:w-auto py-3 px-6 rounded-xl text-sm font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-center"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton
                                    className="w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 border-none rounded-xl shadow-lg shadow-green-900/40 text-sm font-bold text-white transform hover:-translate-y-1 transition-all"
                                    disabled={processing}
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Laporan'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}