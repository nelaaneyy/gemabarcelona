// resources/js/Layouts/AuthenticatedLayout.jsx
// VERSI PERBAIKAN

import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/Components/PageTransition';
export default function AuthenticatedLayout({ header, children }) {
    // Mengambil user dari usePage() (Bawaan Breeze)
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    useEffect(() => {
        document.body.style.background = 'black';
        document.body.style.color = 'white';
        return () => {
            document.body.style.background = '';
            document.body.style.color = '';
        };
    }, []);

    // Set body background to black to match Auth theme
    useState(() => { // Using useState initializer for once-run or useEffect. Ideally useEffect.
        // Wait, the prompt said useEffect. Let's use useEffect.
    }, []);
    // Correcting to useEffect below in replacement content
    useState(() => { }, []);
    // Actually I will simply use useEffect.
    const { useEffect } = require('react'); // Wait this is ESM.

    // I need to make sure I import useEffect or use React.useEffect.
    // The previous file imports `useState` from 'react'. I should add `useEffect`.


    // --- SVG Ikon (dari desain baru) ---

    const UserProfileIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>

    );
    // --- Batas SVG Ikon ---

    return (
        <div className="min-h-screen bg-black text-gray-100 relative selection:bg-green-500 selection:text-white">

            {/* GLOBAL BACKGROUND - Fixed to ensure it stays during scroll */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/image/barcelona1.png')] bg-cover bg-center opacity-30 filter blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/95 to-black"></div>
                {/* Green Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-green-900/20 blur-[100px] rounded-full"></div>
            </div>

            {/* --- Navbar Dark Glass --- */}
            <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">

                        {/* 1. SISI KIRI (Logo + NavLink Dashboard) */}
                        <div className="flex">
                            {/* Logo GEMA */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 tracking-wider drop-shadow-sm hover:opacity-80 transition-opacity">GEMA</h1>
                                </Link>
                            </div>
                        </div>

                        {/* 2. SISI KANAN (Ikon Lonceng + Dropdown User) */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {/* Tombol Notifikasi */}
                            {/* Tombol Notifikasi (DIHAPUS) */}
                            {/* <button ... /> */}

                            {/* Dropdown User */}
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-full">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-white/10 rounded-full text-sm font-medium leading-4 text-white bg-white/5 hover:bg-white/10 hover:text-green-300 focus:outline-none transition ease-in-out duration-150 backdrop-blur-sm shadow-lg"
                                            >
                                                {user.name}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="py-1 bg-black/90 backdrop-blur-xl border border-white/10 shadow-xl ring-1 ring-white/5">
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="text-gray-300 hover:bg-green-500/20 hover:text-green-300 focus:bg-green-500/20 focus:text-green-300 transition-all duration-200"
                                        >
                                            <div className="flex items-center justify-between">
                                                Profile
                                                <UserProfileIcon />
                                            </div>
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-gray-300 hover:bg-red-500/20 hover:text-red-300 focus:bg-red-500/20 focus:text-red-300 transition-all duration-200"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* 3. Hamburger Menu (Mobile) */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white hover:bg-white/10 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive Navigation Menu (Mobile) */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-black/90 backdrop-blur-xl border-t border-white/10'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('warga.dashboard')}
                            active={route().current('warga.dashboard')}
                            className="block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 hover:border-green-500 transition-all"
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-white/10 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-400">
                                {user.email}
                            </div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                href={route('profile.edit')}
                                className="block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 hover:border-green-500 transition-all"
                            >
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 hover:border-green-500 transition-all"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Konten Halaman (children) */}
            <main className="relative z-10">
                <AnimatePresence mode="wait">
                    <PageTransition key={usePage().url}>
                        <ScrollReveal>
                            {children}
                        </ScrollReveal>
                    </PageTransition>
                </AnimatePresence>
            </main>
        </div>
    );
}