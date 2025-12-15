import { motion } from 'framer-motion';

export default function LoadingScreen() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95 backdrop-blur-sm"
        >
            <div className="flex flex-col items-center">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative w-24 h-24 mb-4"
                >
                    {/* Logo or Abstract Shape representing Gema */}
                    <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50"></div>
                    <img
                        src="/assets/logos/logosec.png"
                        alt="Loading"
                        className="relative w-full h-full object-contain"
                    />
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white text-lg font-medium tracking-wider"
                >
                    Memuat...
                </motion.p>
            </div>
        </motion.div>
    );
}
