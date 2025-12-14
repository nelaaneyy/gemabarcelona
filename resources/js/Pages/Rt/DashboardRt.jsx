import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

// --- Komponen Kartu Laporan (Dark Mode) ---
const LaporanCardRt = ({ laporan }) => {
    const fotoUrl = laporan.foto ? `/storage/${laporan.foto}` : 'https://via.placeholder.com/150/22543D/FFFFFF?text=GEMA';

    // Fungsi helper untuk mendapatkan warna status (Dark Mode)
    const getStatusStyles = (status) => {
        switch (status) {
            case 'BARU': return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
            case 'DIPROSES_RT': return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
            case 'DITERUSKAN_LURAH': return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
            case 'SELESAI': return 'bg-green-500/20 text-green-300 border border-green-500/30';
            case 'DITOLAK': return 'bg-red-500/20 text-red-300 border border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden flex border border-white/10 hover:shadow-2xl hover:shadow-green-900/20 transition-all duration-300 hover:-translate-y-1 group">
            {/* Bagian Gambar */}
            <div className="w-1/4 flex-shrink-0 relative overflow-hidden">
                <img
                    src={fotoUrl}
                    alt={laporan.judul}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>

            {/* Bagian Info Laporan */}
            <div className="w-3/4 p-4 sm:p-5 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
                        {laporan.judul}
                    </h3>
                    {/* Tampilkan Nama Pelapor */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                        <p className="text-xs text-gray-400">
                            Pelapor: <span className="font-semibold text-gray-200">{laporan.user?.name ?? 'Tidak Diketahui'}</span>
                        </p>
                        <span className="hidden sm:inline text-gray-600">•</span>
                        <p className="text-xs text-gray-500">
                            {new Date(laporan.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                        </p>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-400 mt-3 flex items-center">
                        Status:
                        <span className={`font-bold ml-2 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${getStatusStyles(laporan.status)}`}>
                            {laporan.status.replace('_', ' ')}
                        </span>
                    </p>
                </div>

                {/* Tombol Aksi untuk RT */}
                <div className="text-right mt-3">
                    <Link
                        href={route('rt.laporan.show', { laporan: laporan.id })}
                        className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors border border-white/10 group-hover:border-green-500/50 group-hover:text-green-300"
                    >
                        Lihat Detail <span className="ml-1">&rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default function DashboardRt({ auth, pengaduans, filters }) {

    // State untuk filtering, mengambil dari props filters jika ada
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');

    // Handler untuk mengirim permintaan filter/pagination baru
    const handleFilterOrPagination = (statusValue, url = null) => {
        const data = statusValue ? { status: statusValue } : {};
        const targetUrl = url || route('rt.dashboard');
        router.get(targetUrl, data, {
            preserveState: true,
            preserveScroll: true
        });
    };

    // Handler saat dropdown filter status berubah
    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatusFilter(newStatus);
        handleFilterOrPagination(newStatus);
    };


    return (
        <AdminLayout user={auth.user}>
            <Head title="Dashboard RT" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Dashboard RT */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                            Dashboard RT <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">{auth.user.nomor_rt}</span>
                        </h1>
                        <p className="text-gray-400">
                            Kelola laporan warga dan pantau perkembangan lingkungan Anda.
                        </p>
                    </div>

                    {/* --- FILTER STATUS --- */}
                    <div className="relative z-20 bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-6 rounded-2xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <h2 className="text-lg font-bold text-white flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-green-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                            </svg>
                            Filter Laporan
                        </h2>

                        <div className="w-full sm:w-72">
                            <Listbox value={statusFilter} onChange={(val) => {
                                setStatusFilter(val);
                                handleFilterOrPagination(val);
                            }}>
                                <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 py-3 pl-4 pr-10 text-left text-sm text-gray-200 shadow-lg focus:outline-none focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm transition-all hover:bg-white/10">
                                        <span className="block truncate">
                                            {statusFilter ? statusFilter.replace('_', ' ') : 'Semua Status'}
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-black/90 backdrop-blur-xl border border-white/10 py-1 text-base shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50 custom-scrollbar">
                                            <Listbox.Option
                                                value=""
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-green-600/20 text-green-300' : 'text-gray-300'
                                                    }`
                                                }
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span className={`block truncate ${selected ? 'font-medium text-green-400' : 'font-normal'}`}>
                                                            Semua Status
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-400">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                            {['BARU', 'DIPROSES_RT', 'DITERUSKAN_LURAH', 'SELESAI', 'DITOLAK'].map((status) => (
                                                <Listbox.Option
                                                    key={status}
                                                    value={status}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-green-600/20 text-green-300' : 'text-gray-300'
                                                        }`
                                                    }
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span className={`block truncate ${selected ? 'font-medium text-green-400' : 'font-normal'}`}>
                                                                {status.replace('_', ' ')}
                                                            </span>
                                                            {selected ? (
                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-400">
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>
                    </div>

                    {/* Daftar Laporan Masuk */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end mb-4">
                            <h2 className="text-xl font-bold text-white">
                                Daftar Laporan <span className="text-sm font-normal text-gray-500 ml-2">Total: {pengaduans.total}</span>
                            </h2>
                        </div>

                        {pengaduans?.data?.length > 0 ? (
                            pengaduans.data.map((laporan) => (
                                <LaporanCardRt key={laporan.id} laporan={laporan} />
                            ))
                        ) : (
                            <div className="text-center bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl py-20 px-6">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white">Tidak ada laporan ditemukan</h3>
                                <p className="text-gray-500 mt-2 text-sm">Coba ubah status filter atau tunggu laporan baru masuk.</p>
                            </div>
                        )}

                        {/* --- Komponen Pagination (Modern) --- */}
                        {pengaduans.links.length > 3 && (
                            <div className="pt-8 flex justify-center">
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1 flex space-x-1">
                                    {pengaduans.links.map((link, index) => (
                                        <button
                                            key={index}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            onClick={() => link.url && handleFilterOrPagination(statusFilter, link.url)}
                                            disabled={!link.url}
                                            className={clsx(
                                                'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
                                                link.active
                                                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
                                                    : 'text-gray-400 hover:text-white hover:bg-white/10',
                                                !link.url && 'opacity-30 cursor-not-allowed'
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
