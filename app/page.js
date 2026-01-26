import Link from 'next/link';
import FluidBackground from '@/components/FluidBackground';

export default function Home() {
  return (
    <div className="w-full h-screen bg-white text-white overflow-hidden relative">
      {/* Fluid Animation Background */}
      <FluidBackground className="absolute inset-0 w-full h-full z-0" />
      
      {/* Content Overlay - pointer-events-none so mouse can interact with canvas */}
      <div className="relative z-10 w-full h-full px-5 md:px-[80px] pt-24 md:pt-32 pb-8 md:pb-12 pointer-events-none">
        {/* Main Content Area */}
        <div className="flex flex-col justify-between h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] w-full">
          <div className="mt-24">
            <h1 className="text-4xl sm:text-5xl md:text-[7vw] leading-none font-extrabold tracking-tight">
              Merhaba*
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-[7vw] leading-tight md:leading-none font-extrabold tracking-tight">
              I <Link href="/work" className="underline hover:no-underline">design</Link> & <Link href="/blog" className="relative inline-block text-white cursor-pointer pointer-events-auto after:content-[''] after:absolute after:w-full after:h-[3px] md:after:h-[6px] after:bg-white after:bottom-0 after:left-0 after:origin-left after:scale-x-100 hover:after:scale-x-0 after:transition-transform after:duration-500 after:ease-in-out">write</Link>.
            </h2>
          </div>

          <p className="text-xl md:text-3xl text-white mb-32 md:mb-16 font-extrabold">*Hello</p>
        </div>
      </div>
    </div>
  );
}
