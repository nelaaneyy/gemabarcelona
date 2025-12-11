import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Layout untuk Warga
import { Head } from '@inertiajs/react';

// Impor partial yang sama
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function EditWarga({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile Saya
                </h2>
            }
        >
            <Head title="Profile Saya" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8">

                    {/* 1. Update Profile Information */}
                    <div className="p-4 sm:p-8 bg-white shadow-xl sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-full"
                        />
                    </div>

                    {/* 2. Update Password */}
                    <div className="p-4 sm:p-8 bg-white shadow-xl sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-full" />
                    </div>

                    {/* 3. Nonaktifkan Akun */}
                    <div className="p-4 sm:p-8 bg-white shadow-xl sm:rounded-lg">
                        <DeleteUserForm className="max-w-full" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
