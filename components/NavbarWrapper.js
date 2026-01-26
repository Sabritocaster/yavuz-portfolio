'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
    const pathname = usePathname();
    // Ana sayfa için dark tema (beyaz text) ve transparent arka plan
    const isHome = pathname === '/';
    const theme = isHome ? 'dark' : 'light';
    const transparent = isHome;

    return <Navbar theme={theme} transparent={transparent} />;
}
