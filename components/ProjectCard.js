import Link from 'next/link';

export default function ProjectCard({ project, className = "" }) {
    return (
        <Link href={`/work/${project.slug}`} className={`group block ${className}`}>
            <div className="bg-gray-100 w-full relative mb-4 overflow-hidden">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 block"
                    />
                ) : (
                    <div className="w-full aspect-[4/3] bg-gray-400 group-hover:bg-gray-500 transition-colors duration-300" />
                )}
            </div>
            <h3 className="text-xl font-medium mb-1 group-hover:opacity-70 transition-opacity">{project.title}</h3>
            <p className="text-gray-500 text-sm">{project.description}</p>
        </Link>
    );
}
