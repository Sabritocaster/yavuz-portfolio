import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full bg-white text-black pb-12 mt-auto font-extrabold px-5 md:px-[5%]">
            <div className="border-t border-black pt-6"></div>
            <div className="flex flex-row justify-between items-stretch gap-4 md:gap-8">
                {/* Left Side: Copyright & Location */}
                <div className="flex flex-col justify-between">
                    <p className="text-base md:text-lg text-black">
                        Yavuz Dağdelen © 2026
                    </p>
                    <p className="text-base md:text-lg text-black">
                        Ankara, Türkiye
                    </p>
                </div>

                {/* Right Side: Social Links */}
                <div className="flex flex-row items-start gap-3 mt-[3px] md:mt-[4px]">
                    <Link href="https://www.instagram.com/ben_isla_/" target="_blank" className="hover:opacity-60 transition-opacity" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
                            <rect x="48" y="48" width="416" height="416" rx="104" />
                            <circle cx="256" cy="256" r="104" />
                            <circle cx="370" cy="142" r="10" fill="currentColor" />
                        </svg>
                    </Link>
                    <Link href="mailto:yavuz.mountain@gmail.com" className="hover:opacity-60 transition-opacity" aria-label="Email">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
                            <rect x="48" y="48" width="416" height="320" rx="40" />
                            <path d="M48 68 l208 166 l208 -166" />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
