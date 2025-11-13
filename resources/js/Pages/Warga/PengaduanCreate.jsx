import MyToggle from '@/Components/MyToggle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Switch } from '@headlessui/react';

// --- Ikon Kamera ---
const CameraIconMini = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);

export default function PengaduanCreate() {
    const [isUrgent, setIsUrgent] = useState(false);
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

    // === PERBAIKAN STYLING INPUT ===
    // Pastikan ada border, background putih, padding, dan focus style yang benar
    const inputStyle = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white text-gray-900 placeholder-gray-400";
    const textareaStyle = `${inputStyle} resize-vertical`;
    // Style khusus untuk input read-only/auto-filled
    const inputReadOnlyStyle = `${inputStyle} bg-gray-100 cursor-not-allowed`; // Abu-abu muda
    // === BATAS PERBAIKAN ===


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Buat Laporan" />

            {/* Background abu-abu muda */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Card Putih */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 sm:p-8 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Lapor !
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Laporkan Kerusakan Infrastruktur di Sekitar Anda !
                            </p>
                        </div>

                        <form onSubmit={submit}>
                            <div className="p-6 sm:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                    {/* Kolom Kiri: Upload Foto */}
                                    <div className="md:col-span-1 space-y-2">
                                        <InputLabel htmlFor="foto" value="Lampirkan Foto" />
                                        <div className="aspect-video w-full bg-gray-100 rounded-md flex items-center justify-center border border-gray-300 relative overflow-hidden group">
                                            {/* ... (kode preview foto) ... */}
                                            {photoPreview ? (
                                                <img src={photoPreview} alt="Preview" className="object-cover w-full h-full" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                                                    <CameraIconMini />
                                                    <p className="mt-2 text-xs text-gray-500">Klik atau Seret Foto Kesini</p> {/* Tambah margin atas sedikit */}
                                                </div>
                                            )}
                                            <input
                                                id="foto" type="file"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={handlePhotoChange} accept="image/*"
                                            />
                                            {photoPreview && (
                                                <label htmlFor="foto" className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Ganti
                                                </label>
                                            )}
                                        </div>
                                        {/* ... (kode progress bar) ... */}
                                        {progress && (
                                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                                            </div>
                                        )}
                                        <InputError message={errors.foto} className="mt-1 text-xs" />
                                    </div>

                                    {/* Kolom Kanan: Input Fields */}
                                    <div className="md:col-span-2 space-y-4">
                                        <div>
                                            <InputLabel htmlFor="judul" value="Judul Pengaduan" />
                                            {/* Terapkan inputStyle BARU */}
                                            <TextInput
                                                id="judul" value={data.judul} className={inputStyle}
                                                onChange={(e) => setData('judul', e.target.value)} required isFocused
                                            />
                                            <InputError message={errors.judul} className="mt-1 text-xs" />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel htmlFor="tanggal_kejadian" value="Tanggal Kejadian" />
                                                <TextInput
                                                    id="tanggal_kejadian" type="date" value={data.tanggal_kejadian} className={inputStyle}
                                                    onChange={(e) => setData('tanggal_kejadian', e.target.value)} required
                                                />
                                                <InputError message={errors.tanggal_kejadian} className="mt-1 text-xs" />
                                            </div>
                                            <div>
                                                <InputLabel htmlFor="nama_pelapor" value="Nama Pelapor" />
                                                {/* Gunakan inputReadOnlyStyle BARU */}
                                                <TextInput
                                                    id="nama_pelapor" value={data.nama_pelapor}
                                                    className={inputReadOnlyStyle}
                                                    onChange={(e) => setData('nama_pelapor', e.target.value)} required
                                                // readOnly // Aktifkan jika benar-benar tidak boleh diedit
                                                />
                                                <InputError message={errors.nama_pelapor} className="mt-1 text-xs" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel htmlFor="no_hp" value="No. HP (Opsional)" />
                                                <TextInput
                                                    id="no_hp" type="tel" value={data.no_hp} className={inputStyle}
                                                    onChange={(e) => setData('no_hp', e.target.value)}
                                                />
                                                <InputError message={errors.no_hp} className="mt-1 text-xs" />
                                            </div>
                                            <div>
                                                <InputLabel htmlFor="alamat_kejadian" value="Alamat Kejadian" />
                                                <TextInput
                                                    id="alamat_kejadian" value={data.alamat_kejadian} className={inputStyle}
                                                    onChange={(e) => setData('alamat_kejadian', e.target.value)} required
                                                />
                                                <InputError message={errors.alamat_kejadian} className="mt-1 text-xs" />
                                            </div>
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="isi_laporan" value="Deskripsi" />
                                            {/* Terapkan textareaStyle BARU */}
                                            <textarea
                                                id="isi_laporan" value={data.isi_laporan} className={textareaStyle} rows="4"
                                                onChange={(e) => setData('isi_laporan', e.target.value)} required
                                                placeholder="Jelaskan detail laporan..."
                                            ></textarea>
                                            <InputError message={errors.isi_laporan} className="mt-1 text-xs" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                        <div>
                                            <InputLabel htmlFor="is_urgent" value="Laporan Mendesak?" className="text-lg" />
                                            <p className="text-sm text-gray-500">
                                                Tandai jika ini adalah situasi darurat.
                                            </p>
                                        </div>
                                        <Switch
                                            checked={data.is_urgent} // Ambil nilai dari 'useForm'
                                            onChange={(value) => setData('is_urgent', value)} // Set nilai ke 'useForm'
                                            
                                            // Ini adalah styling Tailwind untuk komponen Headless UI
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2
                                                ${data.is_urgent ? 'bg-green-600' : 'bg-gray-200'}
                                            `}
                                        >
                                            <span className="sr-only">Laporan Mendesak</span>
                                            <span
                                                aria-hidden="true"
                                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                                    ${data.is_urgent ? 'translate-x-5' : 'translate-x-0'}
                                                `}
                                            />
                                        </Switch>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex items-center justify-end p-6 sm:p-8 bg-gray-50 border-t border-gray-200 rounded-b-lg space-x-3">
                                <Link
                                    href={route('warga.dashboard')}
                                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton
                                    className="py-2 px-6 bg-green-600 hover:bg-green-700 focus:ring-green-500 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    disabled={processing}
                                >
                                    Laporkan
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}