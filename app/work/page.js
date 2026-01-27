'use client';

import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import { projects, categories } from '@/data/projects';
import Footer from '@/components/Footer';

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
        <div className="w-full min-h-screen bg-white text-black pt-32 lg:pt-42 pb-0 overflow-x-hidden px-5 md:px-0">

            {/* Top Section Container - Constrained to Grid */}
            <div className="layout-grid mb-16 md:mb-32 mt-4">
                {/* Title Section - Full width */}
                <div className="col-span-12">
                    <h1 className="text-4xl md:text-[8vw] font-extrabold tracking-tight leading-none">
                        Selected<br />Projects
                    </h1>
                </div>

                {/* Button Grid - Below title, spans 6 cols on desktop */}
                <div className="col-span-12 md:col-span-6 grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-x-[2.5%] md:gap-y-4 mt-8 md:mt-16 text-base md:text-lg">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => scrollToCategory(category)}
                            className="border border-black py-3 md:py-4 text-center font-extrabold hover:bg-black hover:text-white transition-all duration-300"
                        >
                            {category}
                        </button>
                    ))}
                </div>
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

                                                    <div className="absolute bottom-4 md:bottom-8 left-0 right-0 px-5 md:px-[5%] max-w-[1920px] mx-auto text-white">
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

            <div className="px-5 md:px-[5%]">
                <Footer />
            </div>
        </div>
    );
}
