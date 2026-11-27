import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { cache } from 'react';
import { preconnect } from 'react-dom';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import {
    SITE_URL,
    SITE_NAME,
    PERSON_ID,
    absoluteUrl,
    projectImage,
    summarize,
    baseOpenGraph,
    JsonLd,
} from '@/lib/seo';

const DEFAULT_VIDEO_ASPECT_RATIO = '16 / 9';

const getVimeoAspectRatio = cache(async (vimeoId) => {
    if (!vimeoId) {
        return DEFAULT_VIDEO_ASPECT_RATIO;
    }

    try {
        const oEmbedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${vimeoId}`)}`;
        const response = await fetch(oEmbedUrl, { next: { revalidate: 86400 } });

        if (!response.ok) {
            return DEFAULT_VIDEO_ASPECT_RATIO;
        }

        const data = await response.json();
        const width = Number(data?.width);
        const height = Number(data?.height);

        if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
            return DEFAULT_VIDEO_ASPECT_RATIO;
        }

        return `${width} / ${height}`;
    } catch {
        return DEFAULT_VIDEO_ASPECT_RATIO;
    }
});

function renderLinkifiedLine(line, lineIndex) {
    const tokenRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)/g;
    const nodes = [];
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
            nodes.push(line.slice(lastIndex, match.index));
        }

        const href = match[2] || match[3];
        const label = match[1] || match[3];

        nodes.push(
            <a
                key={`link-${lineIndex}-${match.index}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 break-all"
            >
                {label}
            </a>
        );

        lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < line.length) {
        nodes.push(line.slice(lastIndex));
    }

    return nodes.length > 0 ? nodes : line;
}

function renderLongDescription(text = '') {
    const lines = text.split('\n');

    return lines.map((line, lineIndex) => (
        <span key={`line-${lineIndex}`}>
            {renderLinkifiedLine(line, lineIndex)}
            {lineIndex < lines.length - 1 && <br />}
        </span>
    ));
}

export async function generateStaticParams() {
    return projects.filter(p => p.clickable !== false).map((project) => ({
        id: project.slug,
    }));
}

function projectDescription(project) {
    const base = project.seoDescription || project.longDescription || project.description || '';
    return summarize(base) || `${project.title} — ${project.category} project by ${SITE_NAME}.`;
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const project = projects.find((p) => p.slug === id);

    if (!project) {
        return { title: 'Project Not Found', robots: { index: false } };
    }

    const title = `${project.title} — ${project.category} — ${SITE_NAME}`;
    const description = projectDescription(project);
    const url = `/work/${project.slug}/`;
    const image = projectImage(project);

    return {
        title,
        description,
        ...(project.keywords ? { keywords: project.keywords } : {}),
        alternates: { canonical: url },
        openGraph: {
            ...baseOpenGraph,
            type: 'article',
            url,
            title,
            description,
            images: [{ url: image, alt: project.imageAlt || project.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

export default async function WorkDetails({ params }) {
    const { id } = await params;
    const project = projects.find((p) => p.slug === id);

    if (!project) {
        notFound();
    }

    const projectUrl = `${SITE_URL}/work/${project.slug}/`;
    const detailImages = (project.details || [])
        .filter((item) => item.type === 'image' && item.src)
        .map((item) => absoluteUrl(item.src));
    const vimeoVideos = (project.details || []).filter((item) => item.type === 'video' && item.vimeoId);

    if (vimeoVideos.length > 0) {
        preconnect('https://player.vimeo.com');
        preconnect('https://i.vimeocdn.com');
        preconnect('https://f.vimeocdn.com');
    }

    const projectJsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CreativeWork',
                '@id': `${projectUrl}#work`,
                url: projectUrl,
                name: project.title,
                headline: project.title,
                description: projectDescription(project),
                genre: project.category,
                ...(project.keywords ? { keywords: project.keywords.join(', ') } : {}),
                ...(project.date ? { dateCreated: String(project.date) } : {}),
                image: [absoluteUrl(projectImage(project)), ...detailImages].filter(
                    (src, i, arr) => arr.indexOf(src) === i
                ),
                ...(vimeoVideos.length > 0
                    ? {
                          video: vimeoVideos.map((v) => ({
                              '@type': 'VideoObject',
                              name: v.title || project.title,
                              description: projectDescription(project),
                              embedUrl: `https://player.vimeo.com/video/${v.vimeoId}`,
                              thumbnailUrl: absoluteUrl(projectImage(project)),
                              ...(project.date ? { uploadDate: `${project.date}-01-01` } : {}),
                          })),
                      }
                    : {}),
                author: { '@id': PERSON_ID },
                creator: { '@id': PERSON_ID },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                    { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work/` },
                    { '@type': 'ListItem', position: 3, name: project.title, item: projectUrl },
                ],
            },
        ],
    };

    // Get next 3 projects with incrementing ids (wrap around if needed)
    const currentIndex = projects.findIndex(p => p.slug === id);
    const otherProjects = [];
    for (let i = 1; i <= 4; i++) {
        const nextIndex = (currentIndex + i) % projects.length;
        otherProjects.push(projects[nextIndex]);
    }

    const videoItems = (project.details || []).filter((item) => item.type === 'video' && item.vimeoId);
    const aspectRatioEntries = await Promise.all(
        videoItems.map(async (item) => [item.vimeoId, await getVimeoAspectRatio(item.vimeoId)])
    );
    const videoAspectRatios = Object.fromEntries(aspectRatioEntries);

    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 md:pt-48 pb-0 overflow-x-clip">
            <JsonLd data={projectJsonLd} />

            {/* Header & Description Section (Standard Layout with Padding) */}
            <div className="px-5 md:px-[5%] mb-12 md:mb-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 md:gap-x-[2.5%]">
                    {/* Left Column: Title & Meta */}
                    <div className="col-span-1 md:col-span-4 flex flex-col justify-between h-full md:min-h-[140px] mb-6 md:mb-0 font-extrabold">
                        <h1 className="text-2xl md:text-4xl tracking-tight">
                            {project.title}
                        </h1>

                        <div className="flex flex-col gap-1 mt-auto md:pt-6 font-bold mb-6 md:mb-0">
                            <p className="text-gray-400 text-base md:text-xl">
                                {project.date || "2024"}
                            </p>
                            <p className="text-gray-400 text-base md:text-xl">
                                {project.category}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Description */}
                    <div className="col-span-1 md:col-start-5 md:col-span-6 flex flex-col gap-4 md:gap-8 font-bold">
                        <p className="text-base md:text-2xl leading-snug whitespace-pre-wrap break-words">
                            {renderLongDescription(project.longDescription)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Dynamic Details Section */}
            <div className={`flex flex-col ${project.noImageGap ? 'gap-0' : 'gap-12'}`}>
                {project.details && project.details.map((item, index) => {
                    if (item.type === 'video') {
                        if (item.vimeoId) {
                            const videoAspectRatio = videoAspectRatios[item.vimeoId] || DEFAULT_VIDEO_ASPECT_RATIO;

                            // Vimeo Video Embed
                            if (item.isFullscreen) {
                                return (
                                    <div key={index} className="w-full">
                                        <div style={{ position: 'relative', aspectRatio: videoAspectRatio }}>
                                            <iframe
                                                src={`https://player.vimeo.com/video/${item.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                                                frameBorder="0"
                                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                loading="lazy"
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                title={item.title || project.title}
                                            />
                                        </div>
                                        {item.caption && (
                                            <div className="px-5 md:px-[5%] mt-4">
                                                <p className="text-sm text-gray-500">{item.caption}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={index} className="px-5 md:px-[5%] w-full">
                                        <div style={{ position: 'relative', aspectRatio: videoAspectRatio }}>
                                            <iframe
                                                src={`https://player.vimeo.com/video/${item.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                                                frameBorder="0"
                                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                loading="lazy"
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                title={item.title || project.title}
                                            />
                                        </div>
                                        {item.caption && (
                                            <p className="mt-4 text-sm text-gray-500">
                                                {item.caption}
                                            </p>
                                        )}
                                    </div>
                                );
                            }
                        }

                        if (item.src) {
                            if (item.isFullscreen) {
                                return (
                                    <div key={index} className="w-full block leading-none">
                                        <video
                                            src={item.src}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-auto object-cover block"
                                        />
                                        {item.caption && (
                                            <div className="px-5 md:px-[5%] mt-4">
                                                <p className="text-sm text-gray-500">{item.caption}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={index} className="px-5 md:px-[5%] w-full">
                                        <div className="w-full">
                                            <video
                                                src={item.src}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-auto object-cover"
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
                    }
                    if (item.type === 'image') {
                        if (item.isFullscreen) {
                            // Fullscreen: No horizontal padding, 100vw
                            return (
                                <div key={index} className="w-full block leading-none">
                                    <Image
                                        src={item.src}
                                        alt={item.alt || `${project.title} detail ${index + 1}`}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="w-full h-auto object-cover block"
                                        unoptimized={item.src.endsWith('.gif')}
                                    />
                                    {item.caption && (
                                        <div className="px-5 md:px-[5%] mt-4">
                                            <p className="text-sm text-gray-500">{item.caption}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        } else {
                            // Standard: With Navbar Padding (80px), No Sidebar
                            return (
                                <div key={index} className="px-5 md:px-[5%] w-full">
                                    <div className="w-full">
                                        <Image
                                            src={item.src}
                                            alt={item.alt || `${project.title} detail ${index + 1}`}
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

            <div className="px-5 md:px-[5%] mt-12 md:mt-24">
                {/* More Work Section */}
                <div className="mb-16 md:mb-32">
                    <h2 className="text-2xl md:text-4xl font-extrabold mb-8 md:mb-28">More Work</h2>
                    <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-x-[2.5%] md:gap-y-12">
                        {otherProjects.map((p, index) => {
                            return (
                                <div key={p.id} className="col-span-1 md:col-span-3">
                                    <ProjectCard project={p} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
