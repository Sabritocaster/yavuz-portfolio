import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blog';

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
        <div className="w-full min-h-screen bg-white text-black pt-32 md:pt-48 pb-0 px-5 md:px-[80px] max-w-[1920px] mx-auto flex flex-col justify-between overflow-x-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 md:gap-x-[40px] mb-16 md:mb-32">
                <div className="col-span-1 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 capitalize">{post.title}</h1>
                    <p className="text-gray-500 text-base md:text-lg font-bold mb-6">{post.date}</p>

                    {post.heroImage ? (
                        <img
                            className="w-full aspect-video object-cover mb-6"
                            src={post.heroImage}
                            alt={post.title}
                        />
                    ) : (
                        <div className="w-full aspect-video bg-gray-400 mb-6" />
                    )}

                    <div className="prose prose-lg font-bold text-base md:text-xl max-w-none tracking-normal">
                        {post.content.map((paragraph, index) => (
                            <p className={index === 0 ? 'mb-4' : undefined} key={`${post.slug}-${index}`}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
