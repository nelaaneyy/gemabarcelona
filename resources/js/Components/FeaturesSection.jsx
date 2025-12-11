// src/components/FeaturesSection.jsx

// Menggunakan ikon Solid untuk tanda centang
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const featuresList = [
    {
        title: 'Akselerasi Tindak Lanjut',
        description: 'Mekanisme pelaporan terstruktur memastikan aduan langsung diteruskan ke petugas RT/Lurah terkait, mengurangi waktu tunda.'
    },
    {
        title: 'Metrik Dampak Terverifikasi',
        description: 'Setiap aduan dilengkapi data lokasi dan status penanganan yang jelas, memberikan metrik keberhasilan yang akurat.'
    },
    {
        title: 'Akses ke Riwayat Pengaduan Global',
        description: 'Warga dapat melihat riwayat aduan di seluruh perumahan untuk memantau tren dan efektivitas penanganan.'
    },
    {
        title: 'Transparansi Status Real-time',
        description: 'Setiap pelapor mendapatkan notifikasi dan dapat melacak status aduan dari Diterima hingga Selesai.'
    },
    {
        title: 'Basis Data Kolaborasi Komunitas',
        description: 'Membangun sumber data terpusat yang dapat digunakan oleh warga dan pengurus untuk perencanaan infrastruktur di masa depan.'
    },
];

export default function FeaturesSection() {
    return (
        // Menggunakan warna latar belakang yang netral/lembut
        <div className="relative isolate overflow-hidden py-24 sm:py-32 bg-gray-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-center">

                    {/* Konten Kiri: Heading dan Daftar Fitur */}
                    <div className="lg:pr-4 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <p className="text-sm font-semibold leading-7 text-gray-500 uppercase tracking-widest">Mengapa Memilih Kami</p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Akselerasi Solusi Infrastruktur Anda
                            </h2>

                            {/* Deskripsi */}
                            <p className="mt-6 text-lg leading-7 text-gray-600">
                                Platform kami menyediakan keunggulan unik bagi warga dan pengurus RT/Lurah untuk mengelola aduan, memastikan tidak ada masalah yang terlewatkan dan penanganan dilakukan secara efisien.
                            </p>

                            {/* Daftar Fitur Detail */}
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {featuresList.map((feature, index) => (
                                    <div key={index} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            {/* Ikon Centang */}
                                            <CheckCircleIcon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                            {feature.title}
                                        </dt>{' '}
                                        {/* Deskripsi Fitur */}
                                        <dd className="block text-gray-500 mt-1">
                                            {feature.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>

                    {/* Konten Kanan: Gambar Visual (Mockup Dashboard/Grafik) */}
                    <div className="flex justify-end">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/10] w-full max-w-xl bg-gray-900 ring-1 ring-gray-400/10">
                            <img
                                src="https://placehold.co/600x400?text=Dashboard+Mockup"
                                alt="Dashboard Statistik Pengaduan"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
