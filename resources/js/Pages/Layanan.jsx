import GuestLayout from '@/Layouts/GuestLayout';
import Footer from '@/Components/Footer';
import {
    WrenchScrewdriverIcon,
    LightBulbIcon,
    TrashIcon,
    ShieldCheckIcon,
    MapIcon,
    CameraIcon,
    PaperAirplaneIcon,
    CheckBadgeIcon,
    HandThumbUpIcon
} from '@heroicons/react/24/outline';

const categories = [
    {
        name: 'Infrastruktur Jalan',
        description: 'Lapor jalan berlubang, paving block rusak, atau trotoar ambles.',
        icon: MapIcon,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10 border-blue-400/20'
    },
    {
        name: 'Penerangan & Listrik',
        description: 'Lampu jalan mati, tiang listrik miring, atau kabel menjuntai bahaya.',
        icon: LightBulbIcon,
        color: 'text-yellow-400',
        bg: 'bg-yellow-400/10 border-yellow-400/20'
    },
    {
        name: 'Kebersihan Lingkungan',
        description: 'Sampah menumpuk, saluran air tersumbat, atau rumput liar.',
        icon: TrashIcon,
        color: 'text-green-400',
        bg: 'bg-green-400/10 border-green-400/20'
    },
    {
        name: 'Keamanan & Ketertiban',
        description: 'Gangguan keamanan, pos kamling rusak, atau aktivitas mencurigakan.',
        icon: ShieldCheckIcon,
        color: 'text-red-400',
        bg: 'bg-red-400/10 border-red-400/20'
    },
    {
        name: 'Fasilitas Umum',
        description: 'Taman bermain rusak, bangku taman patah, atau fasilitas olahraga tidak layak.',
        icon: WrenchScrewdriverIcon,
        color: 'text-cyan-400',
        bg: 'bg-cyan-400/10 border-cyan-400/20'
    },
];

const steps = [
    { id: 1, name: 'Dokumentasikan', description: 'Ambil foto atau video bukti kerusakan infrastruktur.', icon: CameraIcon },
    { id: 2, name: 'Lapor Online', description: 'Isi formulir pengaduan di website GEMA dengan detail lokasi.', icon: PaperAirplaneIcon },
    { id: 3, name: 'Verifikasi', description: 'Laporan akan diverifikasi oleh Ketua RT dan Kelurahan.', icon: CheckBadgeIcon },
    { id: 4, name: 'Penanganan', description: 'Petugas tindak lanjut akan memperbaiki masalah.', icon: HandThumbUpIcon },
];

export default function Layanan() {
    return (
        <GuestLayout navbarTheme="dark">
            <div className="bg-black min-h-screen">
                {/* HERO SECTION */}
                <div className="relative isolate pt-24 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-300 to-emerald-700 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                    </div>

                    <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-24 text-center">
                        <div className="mx-auto max-w-2xl">
                            <h2 className="text-base font-bold leading-7 text-green-500 uppercase tracking-widest">Layanan Kami</h2>
                            <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-6xl">
                                Apa yang Bisa Kami Bantu?
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-400">
                                GEMA menyediakan platform terpadu untuk melaporkan berbagai masalah infrastruktur di lingkungan Anda. Bersama kita jaga kenyamanan Barcelona Jambi.
                            </p>
                        </div>
                    </div>
                </div>

                {/* KATEGORI LAYANAN */}
                <div className="py-20 bg-black/50 border-t border-white/5 relative">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Kategori Laporan</h2>
                            <p className="mt-4 text-gray-400">Pilih kategori yang sesuai agar laporan Anda cepat ditangani oleh tim terkait.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.map((category) => (
                                <div key={category.name} className={`relative p-8 rounded-3xl border ${category.bg} backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2`}>
                                    <div className={`inline-flex items-center justify-center rounded-2xl p-3 ${category.color} bg-black/40 mb-6`}>
                                        <category.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{category.name}</h3>
                                    <p className="text-gray-400 leading-relaxed">{category.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ALUR PENGADUAN */}
                <div className="py-24 relative overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Cara Melapor</h2>
                            <p className="mt-4 text-gray-400">Ikuti 4 langkah mudah ini untuk berkontribusi.</p>
                        </div>

                        <div className="relative">
                            {/* Connecting Line (Mobile Hidden) */}
                            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0 -translate-y-1/2 z-0"></div>

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
                                {steps.map((step) => (
                                    <div key={step.id} className="relative flex flex-col items-center text-center bg-black/80 lg:bg-transparent p-6 rounded-2xl border border-white/5 lg:border-none">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 border-2 border-green-500 text-white font-bold text-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] mb-6">
                                            {step.id}
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{step.name}</h3>
                                        <p className="text-sm text-gray-400">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="relative isolate py-24 bg-neutral-900 border-y border-white/5">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                            Sudah Siap Melapor?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400">
                            Jangan biarkan kerusakan kecil menjadi masalah besar. Jadilah warga yang peduli hari ini.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="/register"
                                className="rounded-full bg-green-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all transform hover:scale-105"
                            >
                                Buat Akun & Lapor
                            </a>
                            <a href="/login" className="text-sm font-semibold leading-6 text-white hover:text-green-400 transition-colors">
                                Masuk ke Akun <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </GuestLayout>
    );
}
