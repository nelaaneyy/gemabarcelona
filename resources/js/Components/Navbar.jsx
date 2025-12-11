// src/components/Navbar.jsx
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// Pastikan Anda sudah menginstal dan mengkonfigurasi Ziggy di Laravel

const navigation = [
    { name: 'Beranda', href: '#' },
    { name: 'Tentang Kami', href: '#' },
    // { name: 'For Investors', href: '#' },
    // { name: 'Insights', href: '#' },
    // { name: 'Events', href: '#' },
];

export default function Navbar() {
    return (
        <Disclosure as="nav" className="absolute top-0 left-0 right-0 z-20 bg-white/30">
            {({ open }) => (
                <>
                    {/* Kontainer Utama Navigasi */}
                    <div className="mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
                        <div className="relative flex h-20 items-center justify-between backdrop-blur-sm">

                            <div className="flex-shrink-0 flex items-center backdrop-blur-sm">
                                <h1 className="text-xl font-bold text-black tracking-wider drop-shadow-sm">
                                    GEMA
                                </h1>
                            </div>

                            {/* Tautan Navigasi Desktop */}
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium transition duration-150"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Tombol Login/Join Now & Tombol Menu Mobile */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/* 🔑 LOGIN (Desktop) - Menggunakan route('login') */}
                                <a
                                    href={route('login')}
                                    className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium hidden sm:block"
                                >
                                    Login
                                </a>

                                {/* 🔑 JOIN NOW (REGISTER) (Desktop) - Menggunakan route('register') */}
                                <a
                                    href={route('register')}
                                    className="ml-4 bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-md hidden sm:block transition duration-150"
                                >
                                    Daftar
                                </a>

                                {/* Tombol Menu Mobile */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black sm:hidden">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    {/* Navigasi Mobile Panel */}
                    <Disclosure.Panel className="sm:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg">
                        <div className="space-y-1 px-4 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black"
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                            {/* Login (Mobile) - Menggunakan route('login') */}
                            <Disclosure.Button
                                as="a"
                                href={route('login')}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black mt-2"
                            >
                                Login
                            </Disclosure.Button>
                            {/* Join Now (Mobile) - Menggunakan route('register') */}
                            <Disclosure.Button
                                as="a"
                                href={route('register')}
                                className="block rounded-md px-3 py-2 text-base font-medium text-white bg-black hover:bg-gray-800 mt-2 text-center"
                            >
                                Join Now
                            </Disclosure.Button>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
