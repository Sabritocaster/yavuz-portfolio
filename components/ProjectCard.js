import Link from 'next/link';

export default function ProjectCard({ project, className = "" }) {
    const isInteractive = !project.wip && project.clickable !== false;

    const isVideo = project.image && (project.image.endsWith('.mp4') || project.image.endsWith('.webm'));

    const CardContent = () => (
        <>
            <div className="w-full relative mb-2 md:mb-4 overflow-hidden">
                {project.image ? (
                    isVideo ? (
                        <video
                            src={project.image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto object-cover block pointer-events-none"
                            style={{ transform: 'none' }}
                        />
                    ) : (
                        <img
                            src={project.image}
                            alt={project.imageAlt || project.title}
                            className={`w-full h-auto object-cover transition-opacity duration-500 block ${isInteractive ? 'group-hover:opacity-90' : ''}`}
                        />
                    )
                ) : (
                    <div className={`w-full aspect-[4/3] bg-gray-400 transition-colors duration-300 ${isInteractive ? 'group-hover:bg-gray-500' : ''}`} />
                )}
            </div>
            <h3 className={`text-sm mb-1 font-extrabold transition-opacity ${isInteractive ? 'group-hover:opacity-70' : ''}`}>
                {project.title}{project.wip && ' [WIP]'}
            </h3>
            <p className={`text-sm font-extrabold text-gray-500`}>{project.description}</p>
        </>
    );

    if (!isInteractive) {
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
