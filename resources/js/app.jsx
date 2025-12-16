import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import React from 'react';


const appName = import.meta.env.VITE_APP_NAME || 'Gerakan Masyarakat Melaporkan Infrastruktur';

createInertiaApp({
    title: (title) => `${title} - Gerakan Masyarakat Melaporkan Infrastruktur`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#10B981', // green-500
        showSpinner: false,
    },
});
