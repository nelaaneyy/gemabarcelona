// src/pages/HomePage.jsx
import GuestLayout from '@/Layouts/GuestLayout';
import { SparklesIcon, TruckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import AboutSection from '@/Components/AboutSection';
import FeaturesSection from '@/Components/FeaturesSection';
import FeaturedStartups from '@/Components/FeaturedStartups';
import Footer from '@/Components/Footer';

export default function HomePage() {
    // 🔑 Pastikan 'perumahan.jpg' ada di folder public/image/
    const heroImageUrl = '/image/perumahan.jpg';

    // Konten feature di bagian bawah
    const features = [
        { icon: SparklesIcon, text: 'Pengaduan Perbaikan Jalan' },
        { icon: TruckIcon, text: 'Pengaduan Listrik Mati' },
        { icon: CurrencyDollarIcon, text: 'Pengaduan Lorem Ipsum' },
    ];

    return (
        <GuestLayout>

            {/* 1. BAGIAN HERO UTAMA (Full Screen) */}
            <div className="relative min-h-screen pt-16">

                {/* Konten Hero (Teks, Tombol, dll.) */}
                {/* z-10 memastikan konten ini berada di atas gambar */}
                <div className="flex flex-col items-center justify-center pt-20 pb-10 text-center relative z-10">

                    {/* Badge di atas Heading */}
                    <div className="bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-black shadow-lg mb-4">
                        ✨ Web Pengaduan Infrastruktur Untuk Perumahan Barcelona Jambi
                    </div>

                    {/* Heading Utama */}
                    <h1 className="text-6xl font-extrabold text-black leading-tight max-w-4xl tracking-wider drop-shadow-lg">
                        Gerakan Masyarakat Melaporkan Infrastruktur
                    </h1>

                    {/* Deskripsi (Telah Disesuaikan ke Bahasa Indonesia) */}
                    <p className="mt-6 text-lg text-gray-800 max-w-xl drop-shadow-md">
                        Laporkan masalah infrastruktur di Perumahan Barcelona Jambi secara cepat dan transparan. Bersama, kita wujudkan lingkungan yang lebih baik dan nyaman.
                    </p>

                    {/* Tombol Aksi */}
                    <div className="mt-10 flex space-x-6">
                        <a href="#" className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full text-lg font-semibold shadow-2xl transition duration-300">
                            Jelajahi Layanan
                        </a>
                        <a href={route('register')} className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full text-lg font-semibold shadow-2xl transition duration-300">
                            Daftar Sekarang
                        </a>
                    </div>

                    {/* Fitur Bawah */}
                    {/* Menyesuaikan warna teks fitur bawah agar lebih terlihat di atas gambar */}
                    <div className="absolute bottom-[-150px] w-full flex justify-center space-x-12 mt-12 p-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-white text-sm font-semibold p-2 bg-black/50 backdrop-blur-sm rounded-full">
                                <feature.icon className="h-5 w-5 text-yellow-400" />
                                <span>{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Elemen Visual (Gambar Latar Belakang) */}
                <div
                    className="absolute inset-0 z-0 opacity-70"
                    style={{
                        backgroundImage: `url('${heroImageUrl}')`,
                        backgroundSize: 'cover', // Mengisi lebar penuh
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    {/* Overlay gradasi gelap di bagian bawah gambar (untuk membantu keterbacaan) */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-100 to-transparent"></div>
                </div>
            </div>

            {/* 2. BAGIAN ABOUT (Diaktifkan) */}
            <AboutSection />

            {/* 3. BAGIAN FEATURES (Diaktifkan) */}
            <FeaturesSection />

            {/* 4. BAGIAN FEATURED STARTUPS (Diaktifkan) */}
            <FeaturedStartups />

            <Footer />

        </GuestLayout>
    );
}
