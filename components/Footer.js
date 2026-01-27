import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full bg-white text-black pt-6 pb-12 border-t border-gray-100 mt-auto font-extrabold">
            <div className="max-w-[1920px] mx-auto flex flex-row justify-between items-end gap-4 md:gap-8">
                {/* Left Side: Copyright & Location */}
                <div className="flex flex-col gap-1">
                    <p className="text-base md:text-lg text-black">
                        Yavuz Dagdelen © 2026
                    </p>
                    <p className="text-base md:text-lg text-black">
                        Ankara, Türkiye
                    </p>
                </div>

                {/* Right Side: Social Placeholders (Black Squares) */}
                <div className="flex gap-3 md:gap-4">
                    <Link href="#" className="w-[32px] h-[32px] md:w-[2.5%] md:h-[40px] bg-black block hover:opacity-80 transition-opacity" aria-label="Social Link 1"></Link>
                    <Link href="#" className="w-[32px] h-[32px] md:w-[2.5%] md:h-[40px] bg-black block hover:opacity-80 transition-opacity" aria-label="Social Link 2"></Link>
                </div>
            </div>
        </footer>
    );
}
