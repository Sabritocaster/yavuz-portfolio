import BlogPostCard from '@/components/BlogPostCard';
import Footer from '@/components/Footer';

const posts = [
    {
        slug: 'post-1',
        title: 'Untum idelit ma se volorisci vollorist ipsunt pro quaeAtus, dinamdiemnem nocciem ta Seriaeliu',
        date: 'January 20 2025',
        excerpt: 'Natias autatia prest, qui officidus, consecusae. Veratem ipsametus, cul parunt quas porepta quaspis dolupti doles ut et reiume nectatur se quunt aliquae vellorrum exerchi ciusand ebist, quam assunt occusti.',
    },
    {
        slug: 'post-2',
        title: 'Another design perspective on minimalism',
        date: 'February 10 2025',
        excerpt: 'Veratem ipsametus, cul parunt quas porepta quaspis dolupti doles ut et reiume nectatur se quunt aliquae vellorrum exerchi ciusand ebist.',
    },
];

export default function Blog() {
    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 md:pt-48 pb-0 px-5 md:px-[80px] max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-[40px] mb-32">
                {/* Title Section - Cols 1-5 */}
                <div className="col-span-1 md:col-span-5">
                    <h1 className="text-6xl md:text-8xl font-medium tracking-tight leading-none">
                        My Blog
                    </h1>
                </div>
            </div>

            {/* Posts Section - Vertical Stack */}
            <div className="flex flex-col gap-16 mb-24">
                {/* Align posts to grid if needed, or keeping them full width within the main container */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-[40px]">
                    <div className="col-span-1 md:col-span-10 flex flex-col gap-16">
                        {posts.map((post) => (
                            <BlogPostCard key={post.slug} post={post} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
