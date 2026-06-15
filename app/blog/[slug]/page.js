import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blog';
import Image from 'next/image';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = blogPosts.find((item) => item.slug === slug);

    if (!post) {
        return null;
    }

    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 md:pt-48 pb-0 mx-auto flex flex-col justify-between overflow-x-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 md:gap-x-[2.5%] px-5 md:px-[5%] mb-16 md:mb-32">
                <div className="col-span-1 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">{post.title}</h1>
                    <p className="text-gray-500 text-base md:text-lg font-bold mb-6">{post.date}</p>

                    {post.heroImage ? (
                        <Image
                            className="w-full aspect-video object-cover mb-6"
                            src={post.heroImage}
                            alt={post.title}
                            width={0}
                            height={0}
                            sizes="100vw"
                            priority
                        />
                    ) : (
                        <div className="w-full aspect-video bg-gray-400 mb-6" />
                    )}

                    <div className="prose prose-lg font-bold text-base md:text-xl max-w-none tracking-normal text-black/95">
                        {post.content.map((block, index) => {
                            if (typeof block === 'string') {
                                return (
                                    <p className="mb-6 leading-relaxed" key={`${post.slug}-${index}`}>
                                        {block}
                                    </p>
                                );
                            }
                            switch (block.type) {
                                case 'h2':
                                    return (
                                        <h2 className="text-2xl md:text-4xl font-extrabold mt-12 mb-6 text-black tracking-tight leading-tight" key={`${post.slug}-${index}`}>
                                            {block.text}
                                        </h2>
                                    );
                                case 'h3':
                                    return (
                                        <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-black tracking-tight leading-snug" key={`${post.slug}-${index}`}>
                                            {block.text}
                                        </h3>
                                    );
                                case 'p':
                                    return (
                                        <p className="mb-6 leading-relaxed" key={`${post.slug}-${index}`}>
                                            {block.text}
                                        </p>
                                    );
                                case 'image':
                                    return (
                                        <figure className="my-10 flex flex-col items-center w-full" key={`${post.slug}-${index}`}>
                                            <Image
                                                src={block.src}
                                                alt={block.alt || 'Blog image'}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                className="w-full h-auto object-cover max-h-[600px]"
                                            />
                                            {block.caption && (
                                                <figcaption className="text-xs md:text-sm text-gray-500 mt-3 text-left w-full italic font-normal tracking-tight px-1">
                                                    {block.caption}
                                                </figcaption>
                                            )}
                                        </figure>
                                    );
                                case 'list':
                                    return (
                                        <ul className="list-disc pl-6 mb-6 space-y-3 font-bold text-base md:text-xl text-black/95" key={`${post.slug}-${index}`}>
                                            {block.items.map((item, i) => (
                                                <li key={i} className="leading-relaxed">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
