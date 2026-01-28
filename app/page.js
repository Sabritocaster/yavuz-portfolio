import Link from 'next/link';
import FluidBackground from '@/components/FluidBackground';

export default function Home() {
  return (
    <div className="w-full h-screen bg-white text-white overflow-hidden relative">
      {/* Fluid Animation Background */}
      <FluidBackground className="absolute inset-0 w-full h-full z-0" />
      
      {/* Content Overlay - pointer-events-none so mouse can interact with canvas */}
      <div className="relative z-10 w-full h-full px-5 md:px-[5%] pt-32 lg:pt-42 pointer-events-none flex flex-col">
        {/* Main Content Area */}
        <div className="mt-4">
          <h1 className="text-4xl md:text-[8vw] leading-none font-extrabold tracking-tight">
            Merh<span className="glyph-a">a</span>b<span className="glyph-a">a</span>*
          </h1>
          <h2 className="text-4xl md:text-[8vw] leading-tight md:leading-none font-extrabold tracking-tight">
            I <Link href="/work" className="text-white cursor-pointer pointer-events-auto underline decoration-white underline-offset-[6px] md:underline-offset-[10px] transition-colors duration-500 hover:decoration-transparent"><span className="glyph-d">d</span>esign</Link> & <Link href="/blog" className="text-white cursor-pointer pointer-events-auto underline decoration-white underline-offset-[6px] md:underline-offset-[10px] transition-colors duration-500 hover:decoration-transparent">write</Link>.
          </h2>
        </div>

        <p className="text-xl md:text-3xl text-white font-extrabold mt-auto pb-8 md:pb-12">*Hello</p>
      </div>
      
    </div>
  );
}
