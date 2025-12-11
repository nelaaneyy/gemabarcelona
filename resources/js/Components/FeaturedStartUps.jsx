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
        <div className="relative isolate py-24 sm:py-32" style={{ backgroundColor: '#D8D5D0' }}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Header Section */}
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold leading-7 text-gray-500 uppercase tracking-widest">Startups Featured</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Featured Startups
                    </h2>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                        Discover innovative companies making a real difference in sustainability and environmental impact.
                    </p>
                </div>
            </div>

            <div className="mt-16 overflow-x-auto whitespace-nowrap scrollbar-hide pb-6">
                <div className="inline-flex space-x-6 px-6">
                    {startups.map((startup, index) => (
                        <div
                            key={index}
                            className={`w-64 flex-shrink-0 relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] ${startup.color}`}
                        >
                            {/* Gambar Startup */}
                            <img
                                src={startup.image}
                                alt={startup.name}
                                className="w-full h-full object-cover absolute inset-0"
                            />

                            {/* Overlay dan Detail di Bawah */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <h3 className="text-lg font-semibold text-white">{startup.name}</h3>
                                <div className="flex items-center text-sm mt-1">
                                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                                    <span className="text-white font-medium">{startup.rating}</span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
