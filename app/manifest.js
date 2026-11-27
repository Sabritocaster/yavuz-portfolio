export const dynamic = 'force-static';

import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';

export default function manifest() {
    return {
        name: SITE_NAME,
        short_name: SITE_NAME,
        description: SITE_DESCRIPTION,
        start_url: '/',
        display: 'browser',
        background_color: '#ffffff',
        theme_color: '#ffd400',
        icons: [{ src: '/icon.png', sizes: '64x64', type: 'image/png' }],
    };
}
