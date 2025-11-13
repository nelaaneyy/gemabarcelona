// resources/js/Layouts/AdminLayout.jsx

import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    HomeIcon,
    DocumentTextIcon,
    UserIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    BellIcon
} from '@heroicons/react/24/outline';
import Dropdown from '@/Components/Dropdown';

// --- Komponen NavLink Samping (untuk Sidebar) ---
const SidebarNavLink = ({ href, active, children, icon: Icon }) => (
    <Link
        href={href}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
            ${active
                ? 'bg-green-700 text-white' // Style Aktif
                : 'text-green-100 hover:bg-green-600 hover:text-white' // Style Tidak Aktif
            }
        `}
    >
        <Icon className="h-6 w-6 mr-3" />
        {children}
    </Link>
);

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false); // State untuk buka/tutup sidebar di mobile

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-100">
            {/* === Sidebar Hijau (Kiri) === */}
            {/* Sidebar Mobile (Overlay) */}
            <div
                className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
                role="dialog"
                aria-modal="true"
            >
                {/* Overlay Gelap */}
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75"
                    onClick={() => setSidebarOpen(false)}
                ></div>

                {/* Konten Sidebar Mobile */}
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-green-800">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="sr-only">Close sidebar</span>
                            <XMarkIcon className="h-6 w-6 text-white" />
                        </button>
                    </div>
                    {/* Isi Sidebar (Sama dengan Desktop) */}
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <h1 className="text-2xl font-bold text-white">GEMA</h1>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            <SidebarNavLink href={route('lurah.dashboard')} active={route().current('lurah.dashboard') || route().current('rt.dashboard')} icon={HomeIcon}>
                                Home
                            </SidebarNavLink>
                            <SidebarNavLink href="#" active={false} icon={DocumentTextIcon}>
                                Data Laporan
                            </SidebarNavLink>
                            <SidebarNavLink href="#" active={false} icon={DocumentTextIcon}>
                                Rekapitulasi
                            </SidebarNavLink>
                            <SidebarNavLink href={route('profile.edit')} active={route().current('profile.edit')} icon={UserIcon}>
                                Profil
                            </SidebarNavLink>
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-green-700 p-4">
                        <Link href={route('logout')} method="post" as="button" className="w-full">
                            <SidebarNavLink href="#" active={false} icon={ArrowLeftOnRectangleIcon}>
                                Logout
                            </SidebarNavLink>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sidebar Desktop (Statis) */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col flex-grow bg-green-800 pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <h1 className="text-2xl font-bold text-white">GEMA</h1>
                        </div>
                        <div className="mt-5 flex-1 flex flex-col">
                            <nav className="flex-1 px-2 space-y-1">
                                <SidebarNavLink href={route('lurah.dashboard')} active={route().current('lurah.dashboard') || route().current('rt.dashboard')} icon={HomeIcon}>
                                    Home
                                </SidebarNavLink>
                                <SidebarNavLink href="#" active={false} icon={DocumentTextIcon}>
                                    Data Laporan
                                </SidebarNavLink>
                                <SidebarNavLink href="#" active={false} icon={DocumentTextIcon}>
                                    Rekapitulasi
                                </SidebarNavLink>
                                <SidebarNavLink href={route('profile.edit')} active={route().current('profile.edit')} icon={UserIcon}>
                                    Profil
                                </SidebarNavLink>
                            </nav>
                        </div>
                        {/* Tombol Logout di Bawah Sidebar */}
                        <div className="flex-shrink-0 flex border-t border-green-700 p-2">
                            <Link href={route('logout')} method="post" as="button" className="w-full">
                                <SidebarNavLink href="#" active={false} icon={ArrowLeftOnRectangleIcon}>
                                    Logout
                                </SidebarNavLink>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* === Konten Utama (Kanan) === */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                {/* Navbar Atas (Hanya untuk Ikon Notifikasi & Profil di Kanan) */}
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-green-800 shadow-sm border-b border-green-800">
                    {/* Tombol Buka Sidebar (Mobile) */}
                    <button
                        type="button"
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    {/* Sisa Navbar: Spacer dan Ikon Kanan */}
                    <div className="flex-1 px-4 flex justify-end">
                        <div className="ml-4 flex items-center md:ml-6">
                            <button
                                type="button"
                                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" />
                            </button>

                            {/* Dropdown Profil (Ambil dari AuthenticatedLayout lama) */}
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}
                                                <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Konten Halaman Sebenarnya */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    {children}
                </main>
            </div>
        </div>
    );
}