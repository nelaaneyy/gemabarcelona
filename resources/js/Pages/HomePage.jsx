// src/pages/HomePage.jsx
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { SparklesIcon, TruckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import AboutSection from '@/Components/AboutSection';
import FeaturesSection from '@/Components/FeaturesSection';

import Footer from '@/Components/Footer';
import { clsx } from 'clsx';

export default function HomePage() {
    const heroImageUrl = '/image/perumahan.jpg';

    const features = [
        { icon: SparklesIcon, text: 'Pengaduan Perbaikan Jalan' },
        { icon: TruckIcon, text: 'Pengaduan Listrik Mati' },
        { icon: CurrencyDollarIcon, text: 'Pengaduan Fasilitas Umum' },
    ];

    return (
        <GuestLayout navbarTheme="dark">

            <Head title="Beranda" />
            <div className="relative min-h-screen pt-16 overflow-hidden bg-black">

                <div
                    className="absolute inset-0 z-0 opacity-70 transform scale-105 transition-transform duration-[20s] ease-linear animate-slow-zoom"
                    style={{
                        backgroundImage: `url('${heroImageUrl}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                ></div>
                {/* Gradient Overlay Matching Auth Pages */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-black/80 to-green-900/90 z-0"></div>

                {/* Konten Hero */}
                <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-10 text-center relative z-10 px-4">

                    {/* Badge Glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-sm font-medium text-green-100 shadow-lg mb-8"
                    >
                        ✨ Web Pengaduan Infrastruktur Untuk Perumahan Barcelona Jambi
                    </motion.div>

                    {/* Heading Utama */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-black text-white leading-tight max-w-5xl tracking-wide drop-shadow-2xl mb-6"
                    >
                        Gerakan Masyarakat <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Melaporkan</span> Infrastruktur
                    </motion.h1>

                    {/* Deskripsi */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-4 text-lg md:text-xl text-green-50/80 max-w-2xl drop-shadow-md font-light tracking-wide leading-relaxed"
                    >
                        Laporkan masalah infrastruktur di Perumahan Barcelona Jambi secara cepat, mudah, dan transparan. Mewujudkan lingkungan yang lebih nyaman, satu laporan pada satu waktu.
                    </motion.p>

                    {/* Tombol Aksi */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
                    >
                        <a href={route('layanan')} className="flex items-center justify-center bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg shadow-green-900/50 transition-all duration-300 transform hover:-translate-y-1">
                            Jelajahi Layanan
                        </a>
                        <a href={route('register')} className="flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-md shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            Daftar Sekarang
                        </a>
                    </motion.div>

                    {/* Fitur Bawah - Glass Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-wrap justify-center gap-4 mt-20"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center space-x-3 px-5 py-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors duration-300 cursor-default"
                            >
                                <feature.icon className="h-6 w-6 text-green-400" />
                                <span className="text-white/90 text-sm font-medium tracking-wide">{feature.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Decorative Bottom Fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
            </div>

            {/* 2. BAGIAN ABOUT */}
            <AboutSection />

            {/* 3. BAGIAN FEATURES */}
            <FeaturesSection />

            {/* 3. BAGIAN FEATURES */}




            <Footer />

        </GuestLayout>
    );
}
