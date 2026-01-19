'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar({ theme = 'light' }) {
    const [isOpen, setIsOpen] = useState(false);

    // Determines color based on theme
    const textColor = theme === 'dark' ? 'text-white' : 'text-black';
    const borderColor = theme === 'dark' ? 'border-white' : 'border-black';
    const bgColor = theme === 'dark' ? 'bg-black' : 'bg-white';

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={`w-full fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${bgColor}`}>
            <div className={`w-full max-w-[1920px] mx-auto px-5 md:px-[80px] py-6 flex justify-between items-center border-b ${borderColor} relative`}>
                <Link href="/" className={`text-xl font-medium ${textColor}`} onClick={() => setIsOpen(false)}>
                    Yavuz Dağdelen
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-10">
                    <Link href="/work" className={`text-xl font-medium hover:opacity-70 transition-opacity ${textColor}`}>
                        Work
                    </Link>
                    <Link href="/about" className={`text-xl font-medium hover:opacity-70 transition-opacity ${textColor}`}>
                        About
                    </Link>
                    <Link href="/blog" className={`text-xl font-medium hover:opacity-70 transition-opacity ${textColor}`}>
                        Blog
                    </Link>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={toggleMenu}
                    className="flex flex-col justify-center items-center w-8 h-8 md:hidden space-y-1.5 z-50 focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    {/* Top Line */}
                    <span className={`block w-6 h-0.5 bg-current transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : ''} ${textColor}`}></span>
                    {/* Bottom Line */}
                    <span className={`block w-6 h-0.5 bg-current transform transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-45' : ''} ${textColor}`}></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 flex flex-col justify-start pt-32 px-4 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden ${bgColor}`}>
                <div className={`flex flex-col space-y-8 text-4xl font-medium ${textColor}`}>
                    <Link href="/work" onClick={toggleMenu} className="hover:opacity-70 transition-opacity">
                        Work
                    </Link>
                    <Link href="/about" onClick={toggleMenu} className="hover:opacity-70 transition-opacity">
                        About
                    </Link>
                    <Link href="/blog" onClick={toggleMenu} className="hover:opacity-70 transition-opacity">
                        Blog
                    </Link>
                </div>
            </div>
        </nav>
    );
}
