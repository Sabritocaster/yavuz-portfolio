import { aboutContent } from '@/data/about';

export default function About() {
    const { image, bio, location, socials } = aboutContent;

    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 md:pt-48 pb-24 layout-grid overflow-x-hidden font-bold">

            {/* Image Section - Cols 1-4 on Desktop, Full on Mobile */}
            <div className="w-full col-span-12 md:col-span-4 mb-8 md:mb-0">
                {image?.src ? (
                    <img className="w-full aspect-square object-cover" src={image.src} alt={image.alt || 'Portrait'} />
                ) : (
                    <div className="w-full aspect-square bg-gray-400"></div>
                )}
            </div>

            {/* Content Section - Cols 5-10 on Desktop (Spanning 6 cols), Full on Mobile */}
            <div className="w-full col-span-12 md:col-start-5 md:col-span-6 flex flex-col justify-center">
                {bio.map((paragraph, index) => (
                    <p
                        className={`text-base md:text-xl leading-relaxed ${index === bio.length - 1 ? 'mb-8 md:mb-12' : 'mb-4'}`}
                        key={`${index}-${paragraph.slice(0, 12)}`}
                    >
                        {paragraph}
                    </p>
                ))}

                <div className="mt-auto">
                    <p className="text-base md:text-lg">{location}</p>
                    {socials.map((label) => (
                        <p className="text-base md:text-lg" key={label}>{label}</p>
                    ))}
                </div>
            </div>
        </div>
    );

}
