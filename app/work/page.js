import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import CategoryButtons from '@/components/CategoryButtons';
import { projects, categories } from '@/data/projects';
import Footer from '@/components/Footer';
import { SITE_URL, PERSON_ID, absoluteUrl, projectImage, baseOpenGraph, baseTwitter, JsonLd } from '@/lib/seo';

const WORK_DESCRIPTION =
    'Selected branding, editorial, poster and motion projects by Yavuz Dağdelen.';

export const metadata = {
    title: 'Work — Yavuz Dağdelen',
    description: WORK_DESCRIPTION,
    alternates: { canonical: '/work/' },
    openGraph: {
        ...baseOpenGraph,
        type: 'website',
        url: '/work/',
        title: 'Work — Yavuz Dağdelen',
        description: WORK_DESCRIPTION,
    },
    twitter: {
        ...baseTwitter,
        title: 'Work — Yavuz Dağdelen',
        description: WORK_DESCRIPTION,
    },
};

const linkedProjects = projects.filter((p) => !p.wip && p.clickable !== false);

const workJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/work/#collection`,
    url: `${SITE_URL}/work/`,
    name: 'Work — Yavuz Dağdelen',
    description: WORK_DESCRIPTION,
    author: { '@id': PERSON_ID },
    mainEntity: {
        '@type': 'ItemList',
        itemListElement: linkedProjects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${SITE_URL}/work/${project.slug}/`,
            name: project.title,
            image: absoluteUrl(projectImage(project)),
        })),
    },
};

export default function Work() {
    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 lg:pt-42 pb-0 overflow-x-clip">
            <JsonLd data={workJsonLd} />

            {/* Top Section Container - Constrained to Grid */}
            <div className="layout-grid mb-16 md:mb-32 mt-4">
                {/* Title Section - Full width */}
                <div className="col-span-12">
                    <h1 className="text-4xl md:text-[8vw] font-extrabold tracking-tight leading-none">
                        Selecte<span className="glyph-d">d</span><br />Projects
                    </h1>
                </div>

                {/* Button Grid - Below title, spans 6 cols on desktop */}
                <CategoryButtons categories={categories} />
            </div>

            {/* Vertical Content Flow */}
            <div className="flex flex-col gap-16 md:gap-32 mb-16 md:mb-32">
                {categories.map((category) => {
                    const categoryProjects = projects.filter(p => p.category === category);
                    // if (categoryProjects.length === 0) return null; // Logic removed to show empty categories

                    return (
                        <div key={category} id={category} className="scroll-mt-32">
                            {/* Category Title - Horizontal on all devices */}
                            <div className="layout-grid mb-8 md:mb-12">
                                <h2 className="col-span-12 md:col-span-2 text-lg md:text-xl font-extrabold tracking-tight">
                                    {category}
                                </h2>
                            </div>

                            {/* Projects Grid */}
                            <div className="layout-grid gap-y-10 md:gap-y-16 items-start">
                                {categoryProjects.map((project) => {
                                    // Handle Full Width Breakout - simplified for mobile
                                    if (project.isFullWidth) {
                                        return (
                                            <div key={project.id} className="col-span-12 -mx-5 md:mx-0 md:relative md:w-screen md:left-1/2 md:right-1/2 md:-ml-[50vw] md:-mr-[50vw]">
                                                {/* Full Width Image/Card */}
                                                <div className="w-full relative mb-8 md:mb-16">
                                                    {project.image && (
                                                        <Image
                                                            src={project.image}
                                                            alt={project.title}
                                                            width={0}
                                                            height={0}
                                                            sizes="100vw"
                                                            className="w-full h-auto object-cover block"
                                                            unoptimized={project.image.endsWith('.gif')}
                                                        />
                                                    )}
                                                    {/* Gradient Overlay */}
                                                    <div className="absolute inset-0 bg-black/20" />

                                                    <div className="absolute bottom-4 md:bottom-8 left-0 right-0 px-5 md:px-[5%] mx-auto text-white">
                                                        <h3 className="text-2xl md:text-4xl font-bold">{project.title}</h3>
                                                        <p className="text-sm md:text-lg">{project.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    // Regular Grid Item
                                    const span = project.colSpan || 12;
                                    let spanClass = 'md:col-span-12';
                                    if (span === 3) spanClass = 'md:col-span-3';
                                    if (span === 4) spanClass = 'md:col-span-4';
                                    if (span === 6) spanClass = 'md:col-span-6';
                                    if (span === 8) spanClass = 'md:col-span-8';
                                    if (span === 9) spanClass = 'md:col-span-9';

                                    return (
                                        <div key={project.id} className={`col-span-12 ${spanClass} h-fit`}>
                                            <ProjectCard
                                                project={project}
                                                className="w-full h-full"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <Footer />
        </div>
    );
}
