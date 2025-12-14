import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Layout untuk Warga
import { Head, Link } from '@inertiajs/react'; // Add Link import

// Impor partial yang sama
// import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function EditWarga({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile Saya" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl space-y-8 sm:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <nav className="px-4 sm:px-0 mb-4 flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link
                                    href={route('warga.dashboard')}
                                    className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <span className="ml-1 text-sm font-medium text-gray-100 md:ml-2">Profil Saya</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    {/* Header */}
                    <div className="px-4 sm:px-0">
                        <h2 className="font-black text-3xl text-white leading-tight">
                            Pengaturan Profil
                        </h2>
                        <p className="mt-1 text-gray-400">
                            Kelola informasi akun, password, dan keamanan Anda.
                        </p>
                    </div>

                    {/* 1. Update Profile Information */}
                    <div className="p-4 sm:p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl sm:rounded-3xl">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                            user={auth.user}
                        />
                    </div>

                    {/* 2. Update Password */}
                    <div className="p-4 sm:p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl sm:rounded-3xl">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* 3. Nonaktifkan Akun (DIHAPUS untuk Warga) */}
                    {/* <div className="p-4 sm:p-8 bg-black/40 backdrop-blur-xl border border-red-500/30 shadow-2xl sm:rounded-3xl">
                        <DeleteUserForm className="max-w-xl" />
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
