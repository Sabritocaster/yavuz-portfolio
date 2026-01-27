import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.slug,
    }));
}

export default async function WorkDetails({ params }) {
    const { id } = await params;
    const project = projects.find((p) => p.slug === id);

    if (!project) {
        notFound();
    }

    // Get next 3 projects with incrementing ids (wrap around if needed)
    const currentIndex = projects.findIndex(p => p.slug === id);
    const otherProjects = [];
    for (let i = 1; i <= 4; i++) {
        const nextIndex = (currentIndex + i) % projects.length;
        otherProjects.push(projects[nextIndex]);
    }

    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 md:pt-48 pb-0 overflow-x-hidden">

            {/* Header & Description Section (Standard Layout with Padding) */}
            <div className="px-5 md:px-[5%] max-w-[1920px] mx-auto mb-12 md:mb-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 md:gap-x-[2.5%]">
                    {/* Left Column: Title & Meta */}
                    <div className="col-span-1 md:col-span-4 flex flex-col justify-between h-full mb-6 md:mb-0 font-extrabold">
                        <h1 className="text-2xl md:text-4xl tracking-tight">
                            {project.title}
                        </h1>

                        <div className="flex flex-col gap-1 mt-auto font-bold mb-6 md:mb-0">
                            <p className="text-gray-400 text-base md:text-xl">
                                {project.date || "2024"}
                            </p>
                            <p className="text-gray-400 text-base md:text-xl">
                                {project.category}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Description */}
                    <div className="col-span-1 md:col-start-5 md:col-span-6 flex flex-col gap-4 md:gap-8 font-bold">
                        <p className="text-base md:text-2xl leading-snug">
                            {project.longDescription}
                        </p>
                    </div>
                </div>
            </div>

            {/* Dynamic Details Section */}
            <div className="flex flex-col gap-12">
                {project.details && project.details.map((item, index) => {
                    if (item.type === 'video') {
                        // Vimeo Video Embed
                        if (item.isFullscreen) {
                            return (
                                <div key={index} className="w-full">
                                    <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                                        <iframe
                                            src={`https://player.vimeo.com/video/${item.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                                            frameBorder="0"
                                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                            title={item.title || project.title}
                                        />
                                    </div>
                                    {item.caption && (
                                        <div className="px-5 md:px-[5%] max-w-[1920px] mx-auto mt-4">
                                            <p className="text-sm text-gray-500">{item.caption}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        } else {
                            return (
                                <div key={index} className="px-5 md:px-[5%] max-w-[1920px] mx-auto w-full">
                                    <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                                        <iframe
                                            src={`https://player.vimeo.com/video/${item.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                                            frameBorder="0"
                                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                            title={item.title || project.title}
                                        />
                                    </div>
                                    {item.caption && (
                                        <p className="mt-4 text-sm text-gray-500">
                                            {item.caption}
                                        </p>
                                    )}
                                </div>
                            );
                        }
                    }
                    if (item.type === 'image') {
                        if (item.isFullscreen) {
                            // Fullscreen: No horizontal padding, 100vw
                            return (
                                <div key={index} className="w-full">
                                    <Image
                                        src={item.src}
                                        alt={`${project.title} detail ${index + 1}`}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="w-full h-auto object-cover"
                                        unoptimized={item.src.endsWith('.gif')}
                                    />
                                    {item.caption && (
                                        <div className="px-5 md:px-[5%] max-w-[1920px] mx-auto mt-4">
                                            <p className="text-sm text-gray-500">{item.caption}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        } else {
                            // Standard: With Navbar Padding (80px), No Sidebar
                            return (
                                <div key={index} className="px-5 md:px-[5%] max-w-[1920px] mx-auto w-full">
                                    <div className="w-full">
                                        <Image
                                            src={item.src}
                                            alt={`${project.title} detail ${index + 1}`}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            className="w-full h-auto object-cover"
                                            unoptimized={item.src.endsWith('.gif')}
                                        />
                                        {item.caption && (
                                            <p className="mt-4 text-sm text-gray-500">
                                                {item.caption}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                    }
                    return null;
                })}
            </div>

            <div className="px-5 md:px-[5%] mt-12 md:mt-24">
                {/* More Work Section */}
                <div className="mb-16 md:mb-32">
                    <h2 className="text-2xl md:text-4xl font-extrabold mb-8 md:mb-28">More Work</h2>
                    <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-x-[2.5%] md:gap-y-12">
                        {otherProjects.map((p, index) => {
                            return (
                                <div key={p.id} className="col-span-1 md:col-span-3">
                                    <ProjectCard project={p} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}
