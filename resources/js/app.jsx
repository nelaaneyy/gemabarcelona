import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './Components/PageTransition';


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

        function AnimatedApp({ App, props }) {
            return (
                <AnimatePresence mode="wait" initial={false}>
                    <PageTransition key={props.initialPage.url}>
                        <App {...props} />
                    </PageTransition>
                </AnimatePresence>
            );
        }

        root.render(<AnimatedApp App={App} props={props} />);
    },
    progress: {
        color: '#10B981', // green-500
        showSpinner: false,
    },
});
