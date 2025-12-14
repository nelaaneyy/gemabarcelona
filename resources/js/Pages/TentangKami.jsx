// src/pages/TentangKami.jsx
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { UserGroupIcon, BuildingOffice2Icon, MegaphoneIcon } from '@heroicons/react/24/outline';

export default function TentangKami() {
    const heroImageUrl = '/image/perumahan.jpg'; // Menggunakan gambar yang sama dulu atau ganti jika ada

    return (
        <GuestLayout navbarTheme="dark">
            <Head title="Tentang Kami" />
            <div className="relative min-h-[50vh] pt-16 flex items-center justify-center overflow-hidden bg-black">

                <div
                    className="absolute inset-0 z-0 opacity-70 transform scale-105 transition-transform duration-[20s] ease-linear animate-slow-zoom"
                    style={{
                        backgroundImage: `url('${heroImageUrl}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                ></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-black/80 to-green-900/90 z-0"></div>

                {/* Konten Hero */}
                <div className="flex flex-col items-center justify-center text-center relative z-10 px-4">
                    {/* Badge */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium text-green-100 shadow-lg mb-6 animate-fadeIn">
                        Tentang Kami
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight max-w-4xl tracking-wide drop-shadow-2xl">
                        Mengenal <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">GEMA</span> Lebih Dekat
                    </h1>
                    <p className="mt-4 text-lg text-green-50/80 max-w-xl drop-shadow-md font-light tracking-wide">
                        Gerakan Masyarakat Melaporkan Infrastruktur adalah Sebuah platform inisiatif warga untuk melaporkan infrastruktur yang rusak dan memantau status perbaikan infrastruktur yang dilaporkan.
                    </p>
                </div>

                {/* Decorative Bottom Fade */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
            </div>

            {/* KONTEN UTAMA */}
            {/* KONTEN UTAMA */}
            <div className="bg-black py-24 sm:py-32 relative">
                {/* Decorative background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-green-900/20 rounded-full blur-[128px]"></div>
                    <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-emerald-900/20 rounded-full blur-[128px]"></div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

                    {/* VISI MISI */}
                    <div className="mx-auto max-w-2xl lg:text-center mb-20">
                        <p className="text-base font-bold leading-7 text-green-400 uppercase tracking-widest mb-2">Visi Kami</p>
                        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl drop-shadow-lg">
                            Mewujudkan Infrastruktur Perumahan yang Prima dan Transparan
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300 font-light">
                            GEMA hadir untuk menjembatani komunikasi antara warga, ketua RT, dan pihak kelurahan. Kami percaya bahwa setiap laporan berharga dan setiap perbaikan membawa perubahan nyata bagi kenyamanan bersama di Perumahan Barcelona Jambi.
                        </p>
                    </div>

                    {/* NILAI / VALUES */}
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                            {[
                                {
                                    name: 'Partisipasi Warga',
                                    description:
                                        'Kami mendorong setiap warga untuk peduli dan aktif melaporkan kondisi infrastruktur lingkungan.',
                                    icon: UserGroupIcon,
                                },
                                {
                                    name: 'Transparansi',
                                    description:
                                        'Setiap laporan dapat dipantau statusnya secara realtime dari "Baru" hingga "Selesai".',
                                    icon: MegaphoneIcon,
                                },
                                {
                                    name: 'Responsif',
                                    description:
                                        'Sistem notifikasi real-time memastikan RT dan Lurah dapat segera menindaklanjuti laporan yang masuk.',
                                    icon: BuildingOffice2Icon,
                                },
                            ].map((feature) => (
                                <div key={feature.name} className="relative pl-16 group">
                                    <dt className="text-base font-bold leading-7 text-white">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/10 group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-all duration-300">
                                            <feature.icon className="h-6 w-6 text-green-400 group-hover:text-green-300 transition-colors" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-400">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* TIM / HUBUNGI KAMI */}
                    <div className="mt-24 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm py-12 px-6 sm:py-16 sm:px-12 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold tracking-tight text-white">Ingin Berpartisipasi Langsung?</h2>
                            <p className="mt-4 text-lg text-gray-300">
                                Anda dapat mulai dengan membuat akun dan melaporkan masalah yang Anda temui. Atau hubungi tim admin kami jika ada pertanyaan lebih lanjut.
                            </p>
                            <div className="mt-8">
                                <a href="/register" className="inline-block rounded-full bg-gradient-to-r from-green-600 to-green-500 px-8 py-3 text-center text-sm font-bold text-white shadow-lg shadow-green-900/50 hover:from-green-500 hover:to-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all transform hover:-translate-y-1">
                                    Gabung Sekarang
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </GuestLayout>
    );
}
