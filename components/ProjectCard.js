import Link from 'next/link';

export default function ProjectCard({ project, className = "" }) {
    return (
        <Link href={`/work/${project.slug}`} className={`group block ${className}`}>
            <div className="w-full relative mb-2 md:mb-4 overflow-hidden">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity duration-500 block"
                    />
                ) : (
                    <div className="w-full aspect-[4/3] bg-gray-400 group-hover:bg-gray-500 transition-colors duration-300" />
                )}
            </div>
            <h3 className="text-base md:text-xl font-medium mb-1 group-hover:opacity-70 transition-opacity">{project.title}</h3>
            <p className="text-gray-500 text-xs md:text-sm">{project.description}</p>
        </Link>
    );
}
