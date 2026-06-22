export const dynamic = 'force-static';

import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';

export default async function sitemap() {
    const baseUrl = 'https://yavuzdagdelen.com';

    const parseDate = (dateStr) => {
        if (!dateStr) return new Date();
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? new Date() : date;
    };

    const blogUrls = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}/`,
        lastModified: parseDate(post.date).toISOString(),
    }));

    const projectUrls = projects.map((project) => ({
        url: `${baseUrl}/work/${project.slug}/`,
        lastModified: parseDate(project.date).toISOString(),
    }));

    const staticRoutes = [
        '',
        '/about/',
        '/work/',
        '/blog/',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
    }));

    return [...staticRoutes, ...blogUrls, ...projectUrls];
}
