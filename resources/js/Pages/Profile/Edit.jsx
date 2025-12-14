import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

// Pastikan path import ini benar:
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile Pengguna
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8">

                    {/* 1. Update Profile Information */}
                    <div className="bg-white p-4 shadow-xl sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-full"
                        />
                    </div>

                    {/* 2. Update Password */}
                    <div className="bg-white p-4 shadow-xl sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-full" />
                    </div>

                    {/* 3. Nonaktifkan Akun (Menggantikan Delete) */}
                    <div className="bg-white p-4 shadow-xl sm:rounded-lg sm:p-8">
                        {/* Karena logic DeleteUserForm sudah kita ubah menjadi Deactivate */}
                        <DeleteUserForm className="max-w-full" />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
