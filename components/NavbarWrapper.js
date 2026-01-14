'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
    const pathname = usePathname();
    const theme = pathname === '/' ? 'dark' : 'light';

    return <Navbar theme={theme} />;
}
