import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { HomeIcon } from '@heroicons/react/24/outline'; // Pastikan HeroIcons terinstall

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout>
            <Head title="Profile" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header + Breadcrumb */}
                    <div className="mb-8 space-y-4">
                        <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5 w-fit">
                            <Link href={route('rt.dashboard')} className="hover:text-green-400 transition-colors flex items-center">
                                <HomeIcon className="w-4 h-4 mr-1" /> Dashboard
                            </Link>
                            <span className="text-gray-600">/</span>
                            <span className="text-white">Profile</span>
                        </nav>

                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                                Profil Pengguna
                            </h1>
                            <p className="text-gray-400">
                                Kelola informasi akun, keamanan, dan privasi Anda.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {/* 1. Update Profile Information */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-green-500/20 transition-all duration-700"></div>

                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl relative z-10"
                            />
                        </div>

                        {/* 2. Update Password */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700"></div>

                            <UpdatePasswordForm className="max-w-xl relative z-10" />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
