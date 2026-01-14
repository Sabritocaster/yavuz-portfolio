import BlogPostCard from '@/components/BlogPostCard';

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
        <div className="w-full min-h-screen bg-white text-black pt-24 pb-24 px-4 md:px-12">
            <h1 className="text-6xl md:text-8xl font-medium tracking-tight mt-24 mb-36">
                My Blog
            </h1>

            <div className="flex flex-col">
                {posts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
}
