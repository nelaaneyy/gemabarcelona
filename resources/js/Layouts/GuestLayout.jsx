// Ganti path import Navbar jika lokasi file Anda berbeda
import Navbar from '@/Components/Navbar';
import ScrollReveal from '@/Components/ScrollReveal';
import React from 'react';
import { usePage } from '@inertiajs/react';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/Components/PageTransition';

export default function GuestLayout({ children, navbarTheme = 'light' }) {
    const backgroundStyle = {
        background: 'linear-gradient(180deg, rgba(235, 227, 219, 1) 0%, rgba(200, 195, 185, 1) 100%)',
    };

    // Set body background to match Guest theme
    React.useEffect(() => {
        document.body.style.background = '#ebe3db'; // Base beige color
        document.body.style.color = 'black';
        return () => {
            document.body.style.background = ''; // Cleanup
            document.body.style.color = '';
        };
    }, []);

    return (
        <div style={backgroundStyle} className="min-h-screen">

            <Navbar theme={navbarTheme} />

            <main>
                <AnimatePresence mode="wait">
                    <PageTransition key={usePage().url}>
                        <ScrollReveal>
                            {children}
                        </ScrollReveal>
                    </PageTransition>
                </AnimatePresence>
            </main>

            <footer />
        </div>
    );
}
