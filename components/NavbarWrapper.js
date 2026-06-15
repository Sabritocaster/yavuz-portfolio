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

    // Ana sayfa veya 404 için transparent arka plan
    const isHome = pathname === '/';
    const theme = 'light';
    const transparent = isHome || isNotFound;

    return <Navbar theme={theme} transparent={transparent} />;
}
