'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar({ theme = 'light', transparent = false }) {
    const [isOpen, setIsOpen] = useState(false);

    // Determines color based on theme
    const textColor = theme === 'dark' ? 'text-white' : 'text-black';
    const borderColor = theme === 'dark' ? 'border-black' : 'border-black';
    // Ana sayfa için transparent arka plan, diğer sayfalar için normal
    const bgColor = transparent ? 'bg-transparent' : (theme === 'dark' ? 'bg-black' : 'bg-white');
    const navColor = transparent ? 'bg-black' : (theme === 'dark' ? 'bg-black' : 'bg-white');

    const toggleMenu = () => setIsOpen(!isOpen);

    // Menü açıkken scroll'u engelle
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <nav className={`w-full fixed top-0 left-0 right-0 z-50 ${bgColor}`}>
            <div className={`w-full z-99 max-w-[1920px] mx-auto px-5 md:px-[5%] py-4 md:py-6 flex justify-between items-center ${borderColor} relative`}> {/* border-b */}
                <Link href="/" className={`text-lg font-extrabold tracking-tight ${textColor}`} onClick={() => setIsOpen(false)}>
                    Yavuz Dağdelen
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-10">
                    <Link href="/work" className={`text-lg font-medium hover:opacity-70 transition-opacity ${textColor}`}>
                        Work
                    </Link>
                    <Link href="/about" className={`text-lg font-medium hover:opacity-70 transition-opacity ${textColor}`}>
                        About
                    </Link>
                    <Link href="/blog" className={`text-lg font-medium hover:opacity-70 transition-opacity ${textColor}`}>
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
            <div className={`fixed inset-0 z-40 flex flex-col justify-start pt-24 px-5 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden ${navColor}`}>
                <div className={`flex flex-col space-y-6 text-3xl font-medium ${textColor}`}>
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
