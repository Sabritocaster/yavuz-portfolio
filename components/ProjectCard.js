import Image from 'next/image';
import Link from 'next/link';

export default function ProjectCard({ project, className = "", aspect = "aspect-[4/3]" }) {
    return (
        <Link href={`/work/${project.slug}`} className={`group block ${className}`}>
            <div className={`bg-gray-400 ${aspect} w-full relative mb-4 overflow-hidden`}>
                {/* Placeholder for image - using a gray div as per design draft */}
                <div className="absolute inset-0 bg-gray-400 group-hover:bg-gray-500 transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-medium mb-1 group-hover:opacity-70 transition-opacity">{project.title}</h3>
            <p className="text-gray-500 text-sm">{project.category} — {project.description}</p>
        </Link>
    );
}
