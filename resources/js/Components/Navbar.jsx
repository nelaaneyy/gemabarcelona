// src/components/Navbar.jsx
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';

const navigation = [
    { name: 'Beranda', routeName: 'homepage' },
    { name: 'Layanan', routeName: 'layanan' },
    { name: 'Tentang Kami', routeName: 'tentang-kami' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar({ theme = 'light' }) {
    // Defines styles based on theme
    const isDark = theme === 'dark';

    const navClasses = isDark
        ? 'bg-transparent backdrop-blur-sm border-b border-white/10' // Dark/Transparent Theme
        : 'bg-white/30 backdrop-blur-md border-b border-white/20';   // Light/Glass Theme

    const textLogoClass = isDark ? 'text-white' : 'text-black';
    const textLinkDefault = isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-800 hover:text-[#085128] hover:bg-white/40';
    const textLinkActive = isDark ? 'text-white font-bold border-b-2 border-white' : 'text-[#085128] font-bold border-b-2 border-[#085128]';
    const loginBtnClass = isDark ? 'text-white hover:text-green-400' : 'text-gray-900 hover:text-indigo-600';
    const registerBtnClass = isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800';
    const mobileMenuButtonClass = isDark ? 'text-white hover:bg-white/10 hover:text-white' : 'text-gray-800 hover:bg-gray-100/50 hover:text-black';

    return (
        <Disclosure as="nav" className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses}`}>
            {({ open }) => (
                <>
                    <div className="mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="relative flex h-20 items-center justify-between">

                            {/* LOGO (Left) */}
                            <div className="flex-shrink-0 flex items-center z-20">
                                <Link href={route('homepage')} className={`text-2xl font-black tracking-wider drop-shadow-sm hover:opacity-80 transition ${textLogoClass}`}>
                                    GEMA
                                </Link>
                            </div>

                            {/* DESKTOP MENU (Absolute Center) */}
                            <div className="hidden sm:absolute sm:inset-0 sm:flex sm:justify-center sm:items-center z-10 pointer-events-none">
                                <div className="pointer-events-auto flex space-x-8">
                                    {navigation.map((item) => {
                                        // Handle routing securely
                                        const isActive = item.routeName ? route().current(item.routeName) : false;
                                        const href = item.routeName ? route(item.routeName) : item.href;

                                        return (
                                            <Link
                                                key={item.name}
                                                href={href}
                                                className={classNames(
                                                    isActive ? textLinkActive : textLinkDefault,
                                                    'px-3 py-2 text-sm font-medium transition-all duration-200 rounded-t-md'
                                                )}
                                                aria-current={isActive ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* RIGHT SIDE BUTTONS (Right) */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 z-20">

                                <Link
                                    href={route('login')}
                                    className={`px-3 py-2 text-sm font-bold tracking-wide transition hidden sm:block ${loginBtnClass}`}
                                >
                                    Masuk
                                </Link>

                                <Link
                                    href={route('register')}
                                    className={`ml-4 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 hidden sm:block ${registerBtnClass}`}
                                >
                                    Daftar Sekarang
                                </Link>

                                {/* Mobile menu button */}
                                <Disclosure.Button className={`inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden ${mobileMenuButtonClass}`}>
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE MENU */}
                    <Disclosure.Panel className="sm:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 shadow-2xl">
                        <div className="space-y-1 px-4 pb-3 pt-2">
                            {navigation.map((item) => {
                                const isActive = item.routeName ? route().current(item.routeName) : false;
                                const href = item.routeName ? route(item.routeName) : item.href;
                                return (
                                    <Disclosure.Button
                                        key={item.name}
                                        as={Link}
                                        href={href}
                                        className={classNames(
                                            isActive
                                                ? 'bg-white/10 text-white font-bold border-l-4 border-green-500'
                                                : 'text-gray-300 hover:bg-white/5 hover:text-white font-medium',
                                            'block rounded-r-md px-3 py-2 text-base w-full text-left transition'
                                        )}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                );
                            })}

                            <div className="mt-4 border-t border-white/10 pt-4 pb-2">
                                <Link
                                    href={route('login')}
                                    className="block w-full text-center px-3 py-2 text-base font-bold text-gray-300 hover:text-white"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="block w-full mt-2 text-center px-3 py-3 rounded-lg text-base font-bold text-black bg-white hover:bg-gray-200 shadow-md"
                                >
                                    Daftar Sekarang
                                </Link>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
