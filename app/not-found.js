'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import FluidBackground from '@/components/FluidBackground';

export default function NotFound() {
    useEffect(() => {
        document.body.classList.add('is-not-found');
        return () => {
            document.body.classList.remove('is-not-found');
        };
    }, []);

    return (
        <div className="w-full h-dvh min-h-dvh bg-[#ffd400] text-black overflow-hidden relative">
            {/* Fluid Animation Background */}
            <FluidBackground className="absolute inset-0 w-full h-full z-0" />

            {/* Content Overlay */}
            <div className="relative z-10 w-full h-full px-5 md:px-[5%] pt-32 lg:pt-42 flex flex-col pb-safe justify-between pointer-events-none">
                <div className="mt-4 pointer-events-auto">
                    <h1 className="text-4xl md:text-[8vw] leading-none font-semibold tracking-tight">
                        404*
                    </h1>
                    <h2 className="text-4xl md:text-[8vw] leading-tight md:leading-none font-semibold tracking-tight mt-2">
                        Page not <Link href="/" className="text-black cursor-pointer underline decoration-black underline-offset-[6px] md:underline-offset-[10px] transition-colors duration-500 hover:decoration-transparent">foun<span className="glyph-d">d</span></Link>.
                    </h2>
                </div>

                <p className="text-xl md:text-3xl text-black font-semibold pb-8 md:pb-12 mt-auto">
                    *This page could not be found
                </p>
            </div>
        </div>
    );
}
