import { aboutContent } from '@/data/about';
import Footer from '@/components/Footer';

export default function About() {
    const { image, bio, location, socials } = aboutContent;

    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 md:pt-48 overflow-x-hidden font-bold">
            <div className="layout-grid mb-16 md:mb-32">
                {/* Image Section - Cols 1-4 on Desktop, Full on Mobile */}
                <div className="w-full col-span-12 lg:col-span-4 mb-8 lg:mb-0 px-5 md:px-0">
                    {image?.src ? (
                        <img className="w-full aspect-square object-cover" src={image.src} alt={image.alt || 'Portrait'} />
                    ) : (
                        <div className="w-full aspect-square bg-gray-400"></div>
                    )}
                </div>

                {/* Content Section - Cols 5-10 on Desktop (Spanning 6 cols), Full on Mobile */}
                <div className="w-full col-span-12 lg:col-start-5 lg:col-span-6 flex flex-col justify-center px-5 md:px-0">
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

            <div className="px-5 md:px-[5%]">
                <Footer />
            </div>
        </div>
    );

}
