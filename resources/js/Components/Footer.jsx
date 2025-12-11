// src/components/Footer.jsx
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const navigation = {
    solution: [
        { name: 'Jelajahi Layanan', href: '#' },
        { name: 'Panduan Warga', href: '#' },
        { name: 'FAQ & Bantuan', href: '#' },
    ],
    support: [
        { name: 'Pusat Bantuan', href: '#' },
        { name: 'Hubungi Kami', href: '#' },
        { name: 'Kebijakan Privasi', href: '#' },
    ],
    company: [
        { name: 'Tentang GEMA', href: '#' },
        { name: 'Tim Pengurus', href: '#' },
        { name: 'Karir (RT/Lurah)', href: '#' },
    ],
    social: [
        { name: 'Facebook', href: '#', icon: FaFacebook },
        { name: 'Twitter', href: '#', icon: FaTwitter },
        { name: 'Instagram', href: '#', icon: FaInstagram },
        { name: 'LinkedIn', href: '#', icon: FaLinkedin },
    ],
};

export default function Footer() {
    return (
        // Menggunakan warna latar belakang yang gelap atau netral
        <footer className="bg-gray-900 mt-12" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">

                    {/* Kolom 1: Logo dan Deskripsi Singkat */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-white tracking-wider">GEMA</h3>
                        <p className="text-sm leading-6 text-gray-400">
                            Gerakan Masyarakat Melaporkan Infrastruktur. Platform untuk penanganan aduan infrastruktur di Perumahan Barcelona Jambi.
                        </p>
                        <div className="flex space-x-6">
                            {navigation.social.map((item) => (
                                <a key={item.name} href={item.href} className="text-gray-400 hover:text-white transition duration-150">
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Kolom 2 & 3: Navigasi Tautan */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Layanan</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.solution.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition duration-150">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Dukungan</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.support.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition duration-150">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Kolom 4: Kontak dan Informasi */}
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Perusahaan</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.company.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition duration-150">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Kontak</h3>
                                <ul role="list" className="mt-6 space-y-4 text-sm leading-6 text-gray-400">
                                    <li className="flex items-start space-x-2">
                                        <MapPinIcon className="h-5 w-5 flex-shrink-0 text-gray-500 mt-1" />
                                        <span>Perumahan Barcelona, Jambi</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <EnvelopeIcon className="h-5 w-5 flex-shrink-0 text-gray-500 mt-1" />
                                        <span>contact@gema.id</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <PhoneIcon className="h-5 w-5 flex-shrink-0 text-gray-500 mt-1" />
                                        <span>+62 812 XXXX XXXX</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-16 border-t border-gray-800 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-400">&copy; {new Date().getFullYear()} GEMA. All rights reserved. Built for Barcelona Jambi Community.</p>
                </div>
            </div>
        </footer>
    );
}
