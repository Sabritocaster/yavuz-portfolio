import BlogPostCard from '@/components/BlogPostCard';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blog';

export default function Blog() {
    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 lg:pt-42 pb-0 px-5 md:px-[5%] max-w-[1920px] mx-auto overflow-x-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 md:gap-x-[2.5%] mb-16 md:mb-32 mt-4">
                {/* Title Section - Cols 1-5 */}
                <div className="col-span-1 md:col-span-5">
                    <h1 className="text-4xl md:text-[8vw] font-extrabold leading-none">
                        My Blog
                    </h1>
                </div>
            </div>

            {/* Posts Section - Vertical Stack */}
            <div className="flex flex-col gap-8 md:gap-16 mb-16 md:mb-24">
                {/* Align posts to grid if needed, or keeping them full width within the main container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-5 md:gap-x-[2.5%]">
                    <div className="col-span-1 md:col-span-10 flex flex-col gap-8 md:gap-16">
                        {blogPosts.map((post) => (
                            <BlogPostCard key={post.slug} post={post} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
