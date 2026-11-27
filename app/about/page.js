import { aboutContent } from '@/data/about';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { SITE_URL, PERSON_ID, WEBSITE_ID, baseOpenGraph, baseTwitter, JsonLd } from '@/lib/seo';

const ABOUT_DESCRIPTION =
    'About Yavuz Dağdelen, a graphic design student at Bilkent University in Ankara.';

export const metadata = {
    title: 'About — Yavuz Dağdelen',
    description: ABOUT_DESCRIPTION,
    alternates: { canonical: '/about/' },
    openGraph: {
        ...baseOpenGraph,
        type: 'profile',
        url: '/about/',
        title: 'About — Yavuz Dağdelen',
        description: ABOUT_DESCRIPTION,
        firstName: 'Yavuz',
        lastName: 'Dağdelen',
    },
    twitter: {
        ...baseTwitter,
        title: 'About — Yavuz Dağdelen',
        description: ABOUT_DESCRIPTION,
    },
};

const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/about/#profile`,
    url: `${SITE_URL}/about/`,
    name: 'About — Yavuz Dağdelen',
    description: ABOUT_DESCRIPTION,
    mainEntity: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
};

export default function About() {
    const { image, bio, location, socials } = aboutContent;

    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 md:pt-48 overflow-x-clip font-bold flex flex-col">
            <JsonLd data={aboutJsonLd} />
            <div className="layout-grid mb-16 md:mb-32">
                {/* Image Section - Cols 1-4 on Desktop, Full on Mobile */}
                <div className="w-full col-span-12 lg:col-span-4 mb-8 lg:mb-0">
                    {image?.src ? (
                        <img className="w-full aspect-square object-cover" src={image.src} alt={image.alt || 'Portrait'} fetchPriority="high" />
                    ) : (
                        <div className="w-full aspect-square bg-gray-400"></div>
                    )}
                </div>

                {/* Content Section - Cols 5-10 on Desktop (Spanning 6 cols), Full on Mobile */}
                <div className="w-full col-span-12 lg:col-start-5 lg:col-span-6 flex flex-col justify-center">
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
                        <Link 
                            href="https://www.instagram.com/ben_isla_/" 
                            target="_blank" 
                            className="text-base md:text-lg block underline decoration-current underline-offset-2 transition-all duration-300 hover:decoration-transparent"
                        >
                            Instagram
                        </Link>
                        <Link 
                            href="mailto:yavuz.mountain@gmail.com" 
                            className="text-base md:text-lg block underline decoration-current underline-offset-2 transition-all duration-300 hover:decoration-transparent"
                        >
                            yavuz.mountain@gmail.com
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex-grow"></div>
            <Footer />
        </div>
    );

}
