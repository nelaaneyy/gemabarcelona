import { StarIcon } from '@heroicons/react/24/solid';

const startups = [
    { name: 'SolarFlow', rating: 4.5, image: 'https://placehold.co/300x400?text=SolarFlow', color: 'bg-orange-400' },
    { name: 'CleanLoop', rating: 4.9, image: 'https://placehold.co/300x400?text=CleanLoop', color: 'bg-gray-200' },
    { name: 'GreenHarvest', rating: 4.6, image: 'https://placehold.co/300x400?text=GreenHarvest', color: 'bg-lime-500' },
    { name: 'Startup A', rating: 4.8, image: 'https://placehold.co/300x400?text=Startup+A', color: 'bg-green-500' },
    { name: 'EcoWave', rating: 4.7, image: 'https://placehold.co/300x400?text=EcoWave', color: 'bg-blue-300' },
];

export default function FeaturedStartups() {
    return (
        <div className="relative isolate py-24 sm:py-32 bg-black">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Header Section */}
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold leading-7 text-green-500 uppercase tracking-widest">Kolaborasi</p>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                        Didukung Oleh
                    </h2>
                    <p className="mt-4 text-base leading-7 text-gray-400">
                        Bekerjasama dengan berbagai pihak untuk mewujudkan lingkungan yang lebih baik.
                    </p>
                </div>
            </div>

            <div className="mt-16 overflow-x-auto whitespace-nowrap scrollbar-hide pb-6">
                <div className="inline-flex space-x-6 px-6">
                    {startups.map((startup, index) => (
                        <div
                            key={index}
                            className={`w-64 flex-shrink-0 relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] ${startup.color} group hover:scale-105 transition-transform duration-300`}
                        >
                            {/* Gambar Startup */}
                            <img
                                src={startup.image}
                                alt={startup.name}
                                className="w-full h-full object-cover absolute inset-0 mix-blend-overlay opacity-60 group-hover:opacity-80 transition-opacity"
                            />

                            {/* Overlay dan Detail di Bawah */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6">
                                <h3 className="text-xl font-bold text-white drop-shadow-md">{startup.name}</h3>
                                <div className="flex items-center text-sm mt-2">
                                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                                    <span className="text-white font-bold">{startup.rating}</span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
