import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            // --- TAMBAHKAN KEYFRAMES DI SINI ---
            keyframes: {
                'pop-in': {
                    '0%': { 
                        transform: 'scale(0.5)', // Mulai dari setengah ukuran
                        opacity: '0',           // Mulai dari transparan
                    },
                    '100%': { 
                        transform: 'scale(1)',   // Selesai di ukuran normal
                        opacity: '1',           // Selesai dengan terlihat penuh
                    },
                },
            },
            // --- TAMBAHKAN ANIMATION DI SINI ---
            animation: {
                // Nama utility class: 'animate-pop-in'
                // Menggunakan keyframes 'pop-in'
                // Durasi 0.5 detik
                // Easing 'ease-out' (cepat di awal, lambat di akhir)
                // 'forwards' agar tetap di state akhir setelah animasi selesai
                'pop-in': 'pop-in 0.5s ease-out forwards', 
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
