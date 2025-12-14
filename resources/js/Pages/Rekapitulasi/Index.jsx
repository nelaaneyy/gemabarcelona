import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Index({ pengaduans }) {
    return (
        <AdminLayout>
            <Head title="Rekapitulasi Pengaduan" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                                Rekapitulasi Pengaduan
                            </h1>
                            <p className="text-gray-400">
                                Arsip laporan pengaduan yang telah selesai diproses.
                            </p>
                        </div>

                        <a
                            href={route('rekapitulasi.cetak')}
                            target="_blank"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 shadow-lg shadow-green-900/40 transform hover:-translate-y-0.5 transition-all"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Cetak PDF
                        </a>
                    </div>

                    {/* Table Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-gray-300 text-sm border-b border-white/5">
                                        <th className="px-6 py-4 font-bold border-r border-white/5 last:border-r-0">No</th>
                                        <th className="px-6 py-4 font-bold border-r border-white/5 last:border-r-0">Tanggal</th>
                                        <th className="px-6 py-4 font-bold border-r border-white/5 last:border-r-0">Pelapor</th>
                                        <th className="px-6 py-4 font-bold border-r border-white/5 last:border-r-0">Judul Laporan</th>
                                        <th className="px-6 py-4 font-bold border-r border-white/5 last:border-r-0">Kategori</th>
                                        <th className="px-6 py-4 font-bold text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {pengaduans.length > 0 ? (
                                        pengaduans.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-white/5 transition-colors group text-sm text-gray-300">
                                                <td className="px-6 py-4 text-center border-r border-white/5 last:border-r-0 text-gray-500 group-hover:text-white transition-colors">{index + 1}</td>
                                                <td className="px-6 py-4 border-r border-white/5 last:border-r-0 whitespace-nowrap">
                                                    {new Date(item.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric', month: 'long', year: 'numeric'
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 border-r border-white/5 last:border-r-0 group-hover:text-white transition-colors font-medium">
                                                    {item.user?.name || 'Warga (Deleted)'}
                                                </td>
                                                <td className="px-6 py-4 border-r border-white/5 last:border-r-0 font-medium text-white">
                                                    {item.judul}
                                                </td>
                                                <td className="px-6 py-4 border-r border-white/5 last:border-r-0">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400 border border-blue-400/20">
                                                        {item.kategori || '-'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                                                        SELESAI
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                                Belum ada data pengaduan yang selesai.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
