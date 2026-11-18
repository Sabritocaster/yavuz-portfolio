'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';

export default function NavbarWrapper() {
    const pathname = usePathname();
    const [isNotFound, setIsNotFound] = useState(false);

    useEffect(() => {
        const checkNotFound = () => {
            setIsNotFound(document.body.classList.contains('is-not-found'));
        };

        checkNotFound();

        // Create a MutationObserver to listen to class changes on body
        const observer = new MutationObserver(checkNotFound);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    // Ana sayfa veya 404 için transparent arka plan ve sarı tema
    const isHome = pathname === '/';
    const isYellow = isHome || isNotFound;
    const theme = 'light';
    const transparent = isYellow;

    useEffect(() => {
        if (isYellow) {
            document.documentElement.classList.add('is-yellow-page');
            document.body.classList.add('is-yellow-page');
        } else {
            document.documentElement.classList.remove('is-yellow-page');
            document.body.classList.remove('is-yellow-page');
        }

        // Dynamically update theme-color meta tag for mobile browser UI (Safari / Chrome)
        let metaTheme = document.querySelector('meta[name="theme-color"]');
        if (!metaTheme) {
            metaTheme = document.createElement('meta');
            metaTheme.setAttribute('name', 'theme-color');
            document.head.appendChild(metaTheme);
        }
        metaTheme.setAttribute('content', isYellow ? '#ffd400' : '#ffffff');
    }, [isYellow]);

    return <Navbar theme={theme} transparent={transparent} />;
}
