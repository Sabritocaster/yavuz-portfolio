export const dynamic = 'force-static';

import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';
import { SITE_URL, absoluteUrl, projectImage, toIsoDate } from '@/lib/seo';

export default async function sitemap() {
    const buildDate = new Date().toISOString();

    const blogUrls = blogPosts.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}/`,
        lastModified: toIsoDate(post.date) || buildDate,
        changeFrequency: 'yearly',
        priority: 0.7,
        ...(post.heroImage ? { images: [absoluteUrl(post.heroImage)] } : {}),
    }));

    // Only projects that actually have a detail page (see generateStaticParams in app/work/[id]).
    const projectUrls = projects
        .filter((project) => project.clickable !== false && !project.wip)
        .map((project) => ({
            url: `${SITE_URL}/work/${project.slug}/`,
            lastModified: toIsoDate(project.date) || buildDate,
            changeFrequency: 'yearly',
            priority: 0.8,
            images: [absoluteUrl(projectImage(project))],
        }));

    const staticRoutes = [
        { route: '/', priority: 1.0, changeFrequency: 'monthly' },
        { route: '/work/', priority: 0.9, changeFrequency: 'monthly' },
        { route: '/about/', priority: 0.8, changeFrequency: 'yearly' },
        { route: '/blog/', priority: 0.8, changeFrequency: 'monthly' },
    ].map(({ route, priority, changeFrequency }) => ({
        url: `${SITE_URL}${route}`,
        lastModified: buildDate,
        changeFrequency,
        priority,
    }));

    return [...staticRoutes, ...projectUrls, ...blogUrls];
}
