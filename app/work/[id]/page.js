import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';

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

    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 md:pt-48 pb-24">

            {/* Header & Description Section (Standard Layout with Padding) */}
            <div className="px-5 md:px-[80px] max-w-[1920px] mx-auto mb-24 md:mb-32"> {/* Added bottom margin to separate from content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-[40px]">
                    {/* Left Column: Title & Meta */}
                    <div className="col-span-1 md:col-span-4 flex flex-col justify-between h-full"> {/* min-h to create spacing if description is short */}
                        <h1 className="text-4xl md:text-4xl font-medium tracking-tight leading-none mb-12 md:mb-0">
                            {project.title}
                        </h1>

                        <div className="flex flex-col gap-1 mt-auto">
                            <p className="text-gray-400 text-xl md:text-xl font-normal">
                                {project.date || "2024"}
                            </p>
                            <p className="text-gray-400 text-xl md:text-xl font-normal">
                                {project.category}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Description */}
                    <div className="col-span-1 md:col-start-5 md:col-span-6 flex flex-col gap-8">
                        <p className="text-xl md:text-2xl leading-snug font-normal">
                            {project.longDescription}
                        </p>
                        <p className="text-xl md:text-2xl leading-snug font-normal">
                            At the end of the 6-month design process we went through with Turknet,
                            we aimed to reflect the brand’s modern and dynamic spirit in the new logo
                            and visual world that emerged.
                        </p>
                    </div>
                </div>
            </div>

            {/* Dynamic Details Section */}
            <div className="flex flex-col gap-12">
                {project.details && project.details.map((item, index) => {
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
                                        <div className="px-5 md:px-[80px] max-w-[1920px] mx-auto mt-4">
                                            <p className="text-sm text-gray-500">{item.caption}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        } else {
                            // Standard: With Navbar Padding (80px), No Sidebar
                            return (
                                <div key={index} className="px-5 md:px-[80px] max-w-[1920px] mx-auto w-full">
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


        </div>
    );
}
