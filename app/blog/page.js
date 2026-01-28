import BlogPostCard from '@/components/BlogPostCard';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blog';

export default function Blog() {
    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 lg:pt-42 pb-0 overflow-x-hidden flex flex-col">
            <div className="px-5 md:px-[5%]">
                <div className="mb-16 md:mb-32 mt-4">
                    <h1 className="text-4xl md:text-[8vw] font-extrabold leading-none">
                        My Blog
                    </h1>
                </div>

                {/* Posts Section - Vertical Stack */}
                <div className="flex flex-col gap-8 md:gap-16 mb-16 md:mb-24">
                    {blogPosts.map((post) => (
                        <BlogPostCard key={post.slug} post={post} />
                    ))}
                </div>
            </div>

            <div className="flex-grow"></div>
            <Footer />
        </div>
    );
}
