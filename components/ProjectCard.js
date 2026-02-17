import Link from 'next/link';

export default function ProjectCard({ project, className = "" }) {
    const CardContent = () => (
        <>
            <div className="w-full relative mb-2 md:mb-4 overflow-hidden">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-auto object-cover transition-opacity duration-500 block ${!project.wip ? 'group-hover:opacity-90' : 'opacity-90'}`}
                    />
                ) : (
                    <div className={`w-full aspect-[4/3] bg-gray-400 transition-colors duration-300 ${!project.wip ? 'group-hover:bg-gray-500' : ''}`} />
                )}
                {(project.wip && project.category !== 'Personal') && (
                    <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1">
                        WIP
                    </div>
                )}
            </div>
            <h3 className={`text-sm mb-1 font-extrabold transition-opacity ${(!project.wip || project.category === 'Personal') ? 'group-hover:opacity-70' : 'opacity-70'}`}>{project.title}</h3>
            <p className={`text-sm font-extrabold text-gray-500`}>{project.description}</p>
        </>
    );

    if (project.wip) {
        return (
            <div className={`block cursor-default ${className}`}>
                <CardContent />
            </div>
        );
    }

    return (
        <Link href={`/work/${project.slug}`} className={`group block ${className}`}>
            <CardContent />
        </Link>
    );
}
