import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({

    server: {
        // Ganti dari default 5173 ke port baru (misal: 5174 atau 3000)
        port: 5174,
        // Jika Anda menggunakan XAMPP/WAMPP, tambahkan ini:
        host: '0.0.0.0',
    },

    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
});
