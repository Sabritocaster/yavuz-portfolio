import BlogPostCard from '@/components/BlogPostCard';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blog';
import { SITE_URL, PERSON_ID, WEBSITE_ID, absoluteUrl, summarize, toIsoDate, baseOpenGraph, baseTwitter, JsonLd } from '@/lib/seo';

const BLOG_DESCRIPTION = 'Notes, photos and essays by Yavuz Dağdelen.';

export const metadata = {
    title: 'Blog — Yavuz Dağdelen',
    description: BLOG_DESCRIPTION,
    alternates: { canonical: '/blog/' },
    openGraph: {
        ...baseOpenGraph,
        type: 'website',
        url: '/blog/',
        title: 'Blog — Yavuz Dağdelen',
        description: BLOG_DESCRIPTION,
    },
    twitter: {
        ...baseTwitter,
        title: 'Blog — Yavuz Dağdelen',
        description: BLOG_DESCRIPTION,
    },
};

const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog/#blog`,
    url: `${SITE_URL}/blog/`,
    name: 'Blog — Yavuz Dağdelen',
    description: BLOG_DESCRIPTION,
    author: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    blogPost: blogPosts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: `${SITE_URL}/blog/${post.slug}/`,
        description: summarize(post.seoDescription || post.excerpt),
        ...(post.lang ? { inLanguage: post.lang } : {}),
        ...(post.keywords ? { keywords: post.keywords.join(', ') } : {}),
        ...(post.heroImage ? { image: absoluteUrl(post.heroImage) } : {}),
        ...(toIsoDate(post.date) ? { datePublished: toIsoDate(post.date) } : {}),
        author: { '@id': PERSON_ID },
    })),
};

export default function Blog() {
    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 lg:pt-42 pb-0 overflow-x-clip flex flex-col">
            <JsonLd data={blogJsonLd} />
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
