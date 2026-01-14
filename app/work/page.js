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
        <div className="w-full min-h-screen bg-white text-black pt-24 lg:pt-56 pb-24 px-4 md:px-12">
            <h1 className="text-6xl md:text-8xl font-medium tracking-tight mb-16">
                Case<br />Studies
            </h1>

            <div className="flex flex-wrap gap-4 mb-20 sticky top-0 py-4 bg-white/80 backdrop-blur-md z-10 transition-all">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => scrollToCategory(category)}
                        className="px-8 py-3 border border-gray-300 hover:border-black transition-colors"
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-32">
                {categories.map((category) => {
                    const categoryProjects = projects.filter(p => p.category === category);
                    if (categoryProjects.length === 0) return null;

                    return (
                        <div key={category} id={category} className="scroll-mt-24">
                            <h2 className="text-4xl font-medium mb-12">{category}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 md:gap-y-16 auto-rows-fr">
                                {categoryProjects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        className={project.colSpan || ''}
                                        aspect={project.aspect || undefined}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    );
}
