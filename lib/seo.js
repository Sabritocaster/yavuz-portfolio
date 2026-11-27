// Shared SEO helpers: site constants, URL building and JSON-LD rendering.

export const SITE_URL = 'https://yavuzdagdelen.com';
export const SITE_NAME = 'Yavuz Dağdelen';
export const SITE_DESCRIPTION =
    'Portfolio and blog of Yavuz Dağdelen, a graphic design student at Bilkent University.';
export const DEFAULT_OG_IMAGE = '/images/About.jpg';
export const INSTAGRAM_URL = 'https://www.instagram.com/ben_isla_/';

// Next.js replaces (doesn't merge) openGraph/twitter objects per page,
// so pages spread these to keep site-wide defaults.
export const baseOpenGraph = {
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
};
export const baseTwitter = {
    card: 'summary_large_image',
    images: [DEFAULT_OG_IMAGE],
};

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// Absolute, URL-encoded URL for a site path (handles non-ASCII file names like "Düş").
export function absoluteUrl(path = '/') {
    if (/^https?:\/\//.test(path)) return path;
    return encodeURI(`${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`);
}

const isVideo = (src = '') => /\.(mp4|webm|mov)$/i.test(src);

// Pick a still image suitable for social previews / structured data.
export function projectImage(project) {
    if (project.image && !isVideo(project.image)) return project.image;
    const detailImage = (project.details || []).find((d) => d.type === 'image' && d.src);
    return detailImage ? detailImage.src : DEFAULT_OG_IMAGE;
}

// Plain-text summary trimmed to a meta-description friendly length.
export function summarize(text = '', max = 160) {
    const plain = text
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    if (plain.length <= max) return plain;
    const cut = plain.slice(0, max - 1);
    return `${cut.slice(0, cut.lastIndexOf(' ') > 0 ? cut.lastIndexOf(' ') : cut.length)}…`;
}

// "19 October 2026" / "2025" -> ISO string, or undefined when unparseable.
export function toIsoDate(dateStr) {
    if (!dateStr) return undefined;
    const value = /^\d{4}$/.test(String(dateStr).trim()) ? `${dateStr}-01-01T00:00:00Z` : `${dateStr} UTC`;
    const date = new Date(value);
    return isNaN(date.getTime()) ? undefined : date.toISOString();
}

// Very small heuristic so Turkish posts are labelled correctly for search engines.
export function detectLanguage(text = '') {
    return /[ğışĞİŞ]/.test(text) ? 'tr' : 'en';
}

// Renders a JSON-LD <script>. Escapes "<" so content can never break out of the tag.
export function JsonLd({ data }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    );
}
