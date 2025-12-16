import { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    HomeIcon,
    DocumentTextIcon,
    UserIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import Dropdown from '@/Components/Dropdown';
import ScrollReveal from '@/Components/ScrollReveal';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/Components/PageTransition';

// --- Komponen NavLink Samping (untuk Sidebar) ---
const SidebarNavLink = ({ href, active, children, icon: Icon }) => (
    <Link
        href={href}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
            ${active
                ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-900/30' // Style Aktif
                : 'text-gray-400 hover:bg-white/5 hover:text-white' // Style Tidak Aktif
            }
        `}
    >
        <Icon className={`h-6 w-6 mr-3 transition-colors ${active ? 'text-white' : 'text-gray-500 group-hover:text-green-400'}`} />
        {children}
    </Link>
);

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Set body background to black to match Admin theme
    useEffect(() => {
        document.body.style.background = 'black';
        document.body.style.color = 'white';
        return () => {
            document.body.style.background = '';
            document.body.style.color = '';
        };
    }, []);

    // Set body background to black to match Admin theme
    useEffect(() => {
        document.body.style.background = 'black';
        document.body.style.color = 'white';
        return () => {
            document.body.style.background = '';
            document.body.style.color = '';
        };
    }, []);

    // Set body background to black to match Admin theme
    useState(() => {
        document.body.style.background = 'black';
        document.body.style.color = 'white';
        return () => {
            document.body.style.background = '';
            document.body.style.color = '';
        };
    }, []);

    return (
        <div className="min-h-screen flex bg-black">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/image/barcelona1.png')] bg-cover bg-center opacity-20 filter blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/95 to-black"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/20 blur-[100px] rounded-full"></div>
            </div>

            <div className={`fixed inset-0 z-50 flex md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)}></div>
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-black border-r border-white/10">
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
                    <SidebarContent user={user} />
                </div>
            </div>

            <div className="hidden md:flex md:shrink-0 relative z-10">
                <div className="flex flex-col w-72">
                    <div className="flex flex-col grow bg-black/40 backdrop-blur-xl border-r border-white/10 pt-5 pb-4 overflow-y-auto">
                        <SidebarContent user={user} />
                    </div>
                </div>
            </div>

            {/* === Konten Utama (Kanan) === */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden relative z-10">

                {/* Navbar Atas */}
                <div className="relative shrink-0 flex h-20 bg-black/20 backdrop-blur-md border-b border-white/10">
                    <button
                        type="button"
                        className="px-4 border-r border-white/10 text-gray-400 focus:outline-none md:hidden hover:text-white"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" />
                    </button>


                    <div className="flex-1 px-4 sm:px-8 flex justify-end">
                        <div className="flex items-center">
                            {/* Profil Dropdown Removed as per request */}
                            <div className="inline-flex items-center px-4 py-2 border border-white/10 rounded-full text-sm font-medium text-gray-300 bg-white/5 backdrop-blur-sm">
                                <span className="mr-2">Hello,</span>
                                <span className="text-white font-bold">{user?.name}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="flex-1 relative overflow-y-auto focus:outline-none custom-scrollbar p-6 sm:p-8">
                    <AnimatePresence mode="wait">
                        <PageTransition key={usePage().url}>
                            <ScrollReveal>
                                {children}
                            </ScrollReveal>
                        </PageTransition>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}

// Extracted Sidebar Content to avoid duplication
const SidebarContent = ({ user }) => (
    <>
        <div className="flex items-center shrink-0 px-6 mb-8">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 tracking-wider drop-shadow-sm">
                GEMA
            </h1>
        </div>

        <div className="flex-1 flex flex-col px-4">
            <nav className="flex-1 space-y-2">
                <SidebarNavLink
                    href={user?.role === 'rt' ? route('rt.dashboard') : route('lurah.dashboard')}
                    active={route().current('lurah.dashboard') || route().current('rt.dashboard')}
                    icon={HomeIcon}
                >
                    Dashboard
                </SidebarNavLink>

                {/* Menu Khusus RT */}
                {user?.role === 'rt' && (
                    <SidebarNavLink href={route('rt.warga.index')} active={route().current('rt.warga.index')} icon={UserIcon}>
                        Manajemen Warga
                    </SidebarNavLink>
                )}

                {/* Menu Rekapitulasi (RT & Lurah) */}
                {(user?.role === 'rt' || user?.role === 'lurah') && (
                    <SidebarNavLink href={route('rekapitulasi.index')} active={route().current('rekapitulasi.index')} icon={DocumentTextIcon}>
                        Rekapitulasi
                    </SidebarNavLink>
                )}

                <SidebarNavLink href={route('profile.edit')} active={route().current('profile.edit')} icon={UserIcon}>
                    Profil Saya
                </SidebarNavLink>
            </nav>
        </div>

        <div className="shrink-0 flex border-t border-white/10 p-4 mx-4 mt-4">
            <Link href={route('logout')} method="post" as="button" className="w-full">
                <div className="flex items-center px-4 py-3 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 group">
                    <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3 group-hover:text-red-400" />
                    Logout
                </div>
            </Link>
        </div>
    </>
);
