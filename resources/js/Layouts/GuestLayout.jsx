// Ganti path import Navbar jika lokasi file Anda berbeda
import Navbar from '@/Components/Navbar';
import ScrollReveal from '@/Components/ScrollReveal';

export default function GuestLayout({ children, navbarTheme = 'light' }) {
    const backgroundStyle = {
        background: 'linear-gradient(180deg, rgba(235, 227, 219, 1) 0%, rgba(200, 195, 185, 1) 100%)',
    };

    return (
        <div style={backgroundStyle} className="min-h-screen">

            <Navbar theme={navbarTheme} />

            <main>
                <ScrollReveal>
                    {children}
                </ScrollReveal>
            </main>

            <footer />
        </div>
    );
}
