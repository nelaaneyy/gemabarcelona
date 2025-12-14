import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

// --- Ikon Centang (Modern & Animated) ---
const CheckCircleIcon = () => (
    <div className="relative flex items-center justify-center w-32 h-32 mb-8">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-green-500/30 blur-3xl rounded-full animate-pulse"></div>

        {/* Circle Border */}
        <div className="relative w-full h-full rounded-full border-4 border-green-500/50 flex items-center justify-center bg-green-900/20 backdrop-blur-md shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-16 h-16 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-bounce-short"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
        </div>
    </div>
);

export default function PengaduanSuccess({ auth, pengaduan }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Laporan Berhasil" />

            <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                {/* Modern Dark Glass Card */}
                <div className="w-full max-w-lg relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center text-center overflow-hidden">

                    {/* Background decoration inside card */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                    {/* Ikon */}
                    <CheckCircleIcon />

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                        Laporan Berhasil <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                            Dikirim!
                        </span>
                    </h2>

                    {/* Subtext */}
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Terima kasih telah berkontribusi. Laporan Anda dengan ID <span className="font-mono text-green-400 font-bold">#{pengaduan.id}</span> telah kami terima dan akan segera diproses oleh petugas terkait.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col w-full gap-4 relative z-10">
                        <Link
                            href={route('warga.dashboard')}
                            className="w-full inline-flex items-center justify-center px-6 py-4 text-base font-bold text-white bg-gradient-to-r from-green-600 to-green-500 rounded-xl shadow-lg shadow-green-900/30 hover:from-green-500 hover:to-green-400 hover:scale-[1.02] transform transition-all duration-300"
                        >
                            Kembali ke Dashboard
                        </Link>

                        <Link
                            href={route('warga.pengaduan.show', pengaduan.id)}
                            className="w-full inline-flex items-center justify-center px-6 py-4 text-base font-bold text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300"
                        >
                            Lihat Detail Laporan &rarr;
                        </Link>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
