import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Layout untuk Warga
import { Head } from '@inertiajs/react';

// Impor partial yang sama
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function EditWarga({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile Saya" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl space-y-8 sm:px-6 lg:px-8">

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

                    {/* 3. Nonaktifkan Akun */}
                    <div className="p-4 sm:p-8 bg-black/40 backdrop-blur-xl border border-red-500/30 shadow-2xl sm:rounded-3xl">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
