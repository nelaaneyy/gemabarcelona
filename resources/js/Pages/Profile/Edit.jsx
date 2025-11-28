import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth = { user: {} } } = usePage().props;
    const [isEditing, setIsEditing] = useState(false);

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile Pengguna
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="bg-white min-h-screen">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    {/* Header Profil Anda */}
                    <div className="border-b-4 border-green-700 pb-4 mb-8">
                        <h1 className="text-4xl font-bold text-green-800">
                            Profil Anda
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Kolom Kiri - Avatar dan Info Dasar */}
                        <div className="lg:col-span-1">
                            <div className="flex flex-col items-center">
                                {/* Avatar dengan Icon Kamera */}
                                <div className="relative mb-6">
                                    <div className="w-48 h-48 rounded-full bg-gray-400 overflow-hidden flex items-center justify-center">
                                        {auth.user.avatar ? (
                                            <img 
                                                src={auth.user.avatar} 
                                                alt="Profile" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-6xl text-white font-bold">
                                                {auth.user.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <button 
                                        type="button"
                                        className="absolute bottom-2 right-2 bg-teal-700 hover:bg-teal-800 text-white p-3 rounded-lg shadow-lg transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Info Display Only */}
                                <div className="w-full space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Nama
                                        </label>
                                        <p className="text-gray-700 pb-2 border-b border-gray-300">
                                            {auth.user.name || '-'}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Email
                                        </label>
                                        <p className="text-gray-700 pb-2 border-b border-gray-300">
                                            {auth.user.email || '-'}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Kata Sandi
                                        </label>
                                        <p className="text-gray-700 pb-2 border-b border-gray-300">
                                            ••••••••
                                        </p>
                                        <a 
                                            href="#" 
                                            className="text-sm text-blue-600 hover:underline"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsEditing(true);
                                                document.getElementById('password-section')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                        >
                                            forgot password?
                                        </a>
                                    </div>

                                    <button 
                                        type="button"
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 px-4 rounded transition-colors mt-6"
                                    >
                                        {isEditing ? 'Sembunyikan Form' : 'Edit Profil'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Kanan - Form Edit */}
                        {isEditing && (
                            <div className="lg:col-span-2 space-y-6">
                                {/* Update Profile Information */}
                                <div className="bg-gray-50 p-6 rounded-lg shadow">
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-full"
                                    />
                                </div>

                                {/* Update Password */}
                                <div id="password-section" className="bg-gray-50 p-6 rounded-lg shadow">
                                    <UpdatePasswordForm className="max-w-full" />
                                </div>

                                {/* Nonaktifkan Akun */}
                                <div className="bg-gray-50 p-6 rounded-lg shadow">
                                    <DeleteUserForm className="max-w-full" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}