import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';

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

            {/* Header Section */}
            <div className="flex flex-col md:flex-row px-4 md:px-12 mb-24 md:mb-48">

                {/* Left Column: Title & Tags */}
                <div className="w-full md:w-1/3 flex flex-col justify-between min-h-0 md:min-h-[300px] gap-8 md:gap-0 mb-12 md:mb-0">
                    <div>
                        <h1 className="text-6xl font-bold tracking-tight uppercase md:mb-8">{project.title}</h1>
                    </div>

                    <div className="flex gap-4 items-stretch">
                        {/* Vertical Line */}
                        <div className="w-[1px] bg-black"></div>

                        {/* Category/Tags */}
                        <div className="flex flex-col justify-end py-1 text-sm font-medium tracking-widest uppercase gap-1">
                            <span>WORK</span>
                            <span>{project.category}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Description */}
                <div className="w-full md:w-2/3 md:pl-12 lg:pl-24">
                    <p className="text-2xl md:text-4xl leading-tight font-serif">
                        {project.longDescription}
                    </p>
                </div>
            </div>

            {/* Images Section - Full Width but respecting x margins */}
            <div className="w-full space-y-4 px-4 md:px-12">
                <div className="w-full aspect-video bg-gray-200"></div>
                <div className="w-full aspect-[21/9] bg-gray-300"></div>
                <div className="w-full aspect-video bg-gray-200"></div>
            </div>

        </div>
    );
}
