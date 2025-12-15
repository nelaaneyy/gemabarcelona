import { motion } from 'framer-motion';
import React from 'react';

/**
 * ScrollReveal Component
 * 
 * Membungkus elemen dengan animasi fade-in/slide-up saat masuk viewport.
 * Animasi akan terjadi berulang kali setiap kali elemen masuk/keluar viewport (fade out saat keluar).
 * 
 * @param {React.ReactNode} children - Elemen yang akan dianimasikan
 * @param {string} className - Class tambahan untuk wrapper
 * @param {number} delay - Delay animasi dalam detik
 * @param {object} initial - State awal animasi (default: opacity 0, y 50)
 * @param {object} whileInView - State saat masuk viewport (default: opacity 1, y 0)
 */
export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    initial = { opacity: 0, y: 50 },
    whileInView = { opacity: 1, y: 0 }
}) {
    return (
        <motion.div
            initial={initial}
            whileInView={whileInView}
            // viewport={{ once: false }} artinya animasi akan diputar ulang setiap kali elemen masuk viewport.
            // amount: 0.3 artinya animasi mulai ketika 30% elemen terlihat.
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
