'use client';

import ProjectCard from '@/components/ProjectCard';
import { projects, categories } from '@/data/projects';

export default function Work() {
    const scrollToCategory = (category) => {
        const element = document.getElementById(category);
        if (element) {
            const offset = 80; // Adjust for header height/spacing
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 lg:pt-48 pb-24">

            {/* Top Section Container - Constrained to Grid */}
            <div className="layout-grid debug-layout mb-32">
                {/* Title Section - Spans 4 Columns */}
                <div className="col-start-1 col-end-5">
                    <h1 className="text-6xl md:text-8xl font-medium tracking-tight leading-none">
                        Selected<br />Projects
                    </h1>
                </div>

                {/* Button Grid - Spans 6 Columns (Cols 1-6) */}
                <div className="col-start-1 col-end-7 grid grid-cols-6 gap-x-[40px] gap-y-4 mt-32 text-lg">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => scrollToCategory(category)}
                            className="col-span-2 border border-black/20 py-4 text-center font-medium hover:border-black transition-colors"
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Vertical Content Flow */}
            <div className="flex flex-col gap-32">
                {categories.map((category) => {
                    const categoryProjects = projects.filter(p => p.category === category);
                    // if (categoryProjects.length === 0) return null; // Logic removed to show empty categories

                    return (
                        <div key={category} id={category} className="scroll-mt-32">
                            {/* Category Title - Column 1 (Constrained) */}
                            <div className="layout-grid debug-layout mb-12">
                                <h2 className="col-start-1 col-end-2 text-xl font-medium tracking-widest uppercase writing-vertical-lr md:writing-horizontal-tb transform rotate-180 md:rotate-0">
                                    {category}
                                </h2>
                            </div>

                            {/* Projects Grid */}
                            <div className="layout-grid debug-layout gap-y-16 align-start"> {/* align-start ensures items don't stretch to max height in row if strictly using grid */}
                                {categoryProjects.map((project) => {
                                    // Handle Full Width Breakout
                                    if (project.isFullWidth) {
                                        return (
                                            <div key={project.id} className="col-span-12 relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                                                {/* Full Width Image/Card */}
                                                <div className="w-full bg-gray-100 relative mb-16">
                                                    {project.image && (
                                                        <img
                                                            src={project.image}
                                                            alt={project.title}
                                                            className="w-full h-auto object-cover block"
                                                        />
                                                    )}
                                                    {/* Gradient Overlay */}
                                                    <div className="absolute inset-0 bg-black/20" />

                                                    <div className="absolute bottom-8 left-0 right-0 px-5 md:px-[80px] max-w-[1920px] mx-auto text-white">
                                                        <h3 className="text-4xl font-bold">{project.title}</h3>
                                                        <p className="text-lg">{project.description}</p>
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
                                    if (span === 9) spanClass = 'md:col-span-9'; // Just in case

                                    return (
                                        <div key={project.id} className={`col-span-12 ${spanClass} h-fit`}> {/* h-fit to prevent grid items from stretching to row height */}
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
        </div>
    );
}
