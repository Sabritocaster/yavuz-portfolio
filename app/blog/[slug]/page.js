import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blog';
import Image from 'next/image';
import {
    SITE_URL,
    SITE_NAME,
    PERSON_ID,
    WEBSITE_ID,
    DEFAULT_OG_IMAGE,
    absoluteUrl,
    summarize,
    toIsoDate,
    detectLanguage,
    baseOpenGraph,
    JsonLd,
} from '@/lib/seo';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

function postImages(post) {
    const images = post.heroImage ? [post.heroImage] : [];
    for (const block of post.content || []) {
        if (block?.type === 'image' && block.src) images.push(block.src);
        if (block?.type === 'image-grid') {
            for (const img of block.images || []) if (img.src) images.push(img.src);
        }
    }
    return images;
}

function postLanguage(post) {
    return post.lang || detectLanguage(`${post.title} ${post.excerpt}`);
}

// Search-result title: the SEO title plus the site name when it still fits (~70 chars).
function seoTitle(post) {
    const base = post.seoTitle || post.title;
    const withBrand = `${base} — ${SITE_NAME}`;
    return withBrand.length <= 70 ? withBrand : base;
}

function seoDescription(post) {
    return summarize(post.seoDescription || post.excerpt);
}

function toSchemaEntity({ type, ...rest }) {
    return { '@type': type || 'Thing', ...rest };
}

function wordCount(post) {
    return (post.content || [])
        .map((block) => {
            if (typeof block === 'string') return block;
            if (block?.text) return block.text;
            if (block?.items) return block.items.join(' ');
            return '';
        })
        .join(' ')
        .split(/\s+/)
        .filter(Boolean).length;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = blogPosts.find((item) => item.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found',
            robots: { index: false },
        };
    }

    const title = seoTitle(post);
    const description = seoDescription(post);
    const url = `/blog/${post.slug}/`;
    const image = post.heroImage || DEFAULT_OG_IMAGE;
    const lang = postLanguage(post);

    return {
        title,
        description,
        keywords: post.keywords,
        alternates: { canonical: url },
        authors: [{ name: SITE_NAME, url: SITE_URL }],
        category: post.section,
        openGraph: {
            ...baseOpenGraph,
            type: 'article',
            url,
            title,
            description,
            locale: lang === 'tr' ? 'tr_TR' : 'en_US',
            publishedTime: toIsoDate(post.date),
            modifiedTime: toIsoDate(post.updated || post.date),
            authors: [SITE_URL],
            section: post.section,
            tags: post.keywords,
            images: [{ url: image, alt: post.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = blogPosts.find((item) => item.slug === slug);

    if (!post) {
        return null;
    }

    const postUrl = `${SITE_URL}/blog/${post.slug}/`;
    const published = toIsoDate(post.date);
    const modified = toIsoDate(post.updated || post.date);
    const lang = postLanguage(post);
    const blogJsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BlogPosting',
                '@id': `${postUrl}#article`,
                mainEntityOfPage: postUrl,
                url: postUrl,
                headline: post.title,
                ...(post.seoTitle ? { alternativeHeadline: post.seoTitle } : {}),
                description: seoDescription(post),
                abstract: summarize(post.excerpt, 300),
                inLanguage: lang,
                image: [...new Set(postImages(post).map((src) => absoluteUrl(src)))],
                thumbnailUrl: absoluteUrl(post.heroImage || DEFAULT_OG_IMAGE),
                ...(published ? { datePublished: published, dateModified: modified } : {}),
                ...(post.section ? { articleSection: post.section } : {}),
                ...(post.keywords ? { keywords: post.keywords.join(', ') } : {}),
                ...(post.about ? { about: post.about.map(toSchemaEntity) } : {}),
                ...(post.mentions ? { mentions: post.mentions.map(toSchemaEntity) } : {}),
                wordCount: wordCount(post),
                author: { '@id': PERSON_ID, '@type': 'Person', name: SITE_NAME, url: SITE_URL },
                publisher: { '@id': PERSON_ID },
                isPartOf: { '@id': WEBSITE_ID },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
                    { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
                ],
            },
        ],
    };

    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 md:pt-48 pb-0 mx-auto flex flex-col justify-between overflow-x-clip">
            <JsonLd data={blogJsonLd} />
            <div lang={lang} className="grid grid-cols-1 md:grid-cols-12 gap-x-5 md:gap-x-[2.5%] px-5 md:px-[5%] mb-16 md:mb-32">
                <div className="col-span-1 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">{post.title}</h1>
                    <p className="text-gray-500 text-base md:text-lg font-bold mb-6">{published ? <time dateTime={published}>{post.date}</time> : post.date}</p>

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
                                    const isPortrait = Boolean(block.isPortrait);
                                    return (
                                        <figure className={`my-10 flex flex-col items-center w-full ${isPortrait ? 'max-w-md mx-auto' : ''}`} key={`${post.slug}-${index}`}>
                                            <Image
                                                src={block.src}
                                                alt={block.alt || 'Blog image'}
                                                width={0}
                                                height={0}
                                                sizes={isPortrait ? "(max-width: 768px) 100vw, 50vw" : "100vw"}
                                                className="w-full h-auto object-cover"
                                            />
                                            {block.caption && (
                                                <figcaption className="text-xs md:text-sm text-gray-500 mt-3 text-left w-full font-normal tracking-tight px-1">
                                                    {block.caption}
                                                </figcaption>
                                            )}
                                        </figure>
                                    );
                                case 'image-grid':
                                    return (
                                        <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full" key={`${post.slug}-${index}`}>
                                            {block.images.map((imgItem, imgIdx) => (
                                                <figure key={imgIdx} className="flex flex-col items-center w-full">
                                                    <Image
                                                        src={imgItem.src}
                                                        alt={imgItem.alt || 'Blog image'}
                                                        width={0}
                                                        height={0}
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        className="w-full h-auto object-cover"
                                                    />
                                                    {imgItem.caption && (
                                                        <figcaption className="text-xs md:text-sm text-gray-500 mt-3 text-left w-full font-normal tracking-tight px-1">
                                                            {imgItem.caption}
                                                        </figcaption>
                                                    )}
                                                </figure>
                                            ))}
                                        </div>
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
