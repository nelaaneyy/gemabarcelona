import { CheckBadgeIcon, WrenchScrewdriverIcon, UsersIcon } from '@heroicons/react/24/outline';

const features = [
    {
        title: 'Pelaporan Terverifikasi & Transparan',
        icon: CheckBadgeIcon,
        description: 'Setiap pengaduan divalidasi dan status penanganannya dapat dilacak secara real-time.'
    },
    {
        title: 'Alat Analisis Data Efisien',
        icon: WrenchScrewdriverIcon,
        description: 'Memudahkan RT/Lurah memprioritaskan perbaikan berdasarkan data dan lokasi.'
    },
    {
        title: 'Ekosistem Kolaboratif Komunitas',
        icon: UsersIcon,
        description: 'Menghubungkan warga, RT, dan pihak terkait untuk penyelesaian masalah bersama.'
    },
];

export default function AboutSection() {
    return (
        <div className="relative isolate py-24 sm:py-32 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Header Section */}
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold leading-7 text-gray-500 uppercase tracking-widest">Tentang GEMA</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        GEMA adalah platform utama untuk mengelola, melacak, dan menyelesaikan pengaduan infrastruktur di Perumahan Barcelona Jambi. Kami membangun solusi yang didorong oleh data dan transparansi.
                    </h2>
                </div>

                {/* Feature Icons */}
                <div className="mt-16 flex flex-wrap justify-center space-x-0 md:space-x-12 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="text-center max-w-xs p-4">
                            <feature.icon className="mx-auto h-8 w-8 text-indigo-600" aria-hidden="true" />
                            <p className="mt-3 text-lg font-semibold text-gray-800">{feature.title}</p>
                            <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Visual Cards (2 Columns) */}
                <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">

                    {/* Card 1: Contoh Foto Jalan/Infrastruktur */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[3/4]">
                        <img
                            src="/image/realtime.jpg"
                            alt="Contoh Pengaduan Jalan Rusak"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                            <p className="text-white text-lg font-semibold">Validasi Akurat, Penanganan Cepat.</p>
                        </div>
                    </div>

                    {/* Card 2: Contoh Peta/Data Dashboard */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[3/4]">
                        <img
                            src="/image/rusak.jpg"
                            alt="Data Dashboard Real-time"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                            <p className="text-white text-lg font-semibold">Transparansi Penanganan Masalah.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
