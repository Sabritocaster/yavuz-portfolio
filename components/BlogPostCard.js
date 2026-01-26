import Link from 'next/link';

export default function BlogPostCard({ post }) {
    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 md:mb-16 items-start border-b border-gray-100 pb-8 md:pb-12 last:border-0">
            <div className="w-full md:w-1/3 aspect-video bg-gray-400 shrink-0" /> {/* Image Placeholder */}
            <div className="w-full md:w-2/3">
                <h2 className="text-xl md:text-2xl font-medium mb-2 leading-tight hover:opacity-70 transition-opacity">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium mb-3 md:mb-4">{post.excerpt}</p>
                <div className="text-sm md:text-lg text-gray-400">{post.date}</div>
            </div>
        </div>
    );
}
