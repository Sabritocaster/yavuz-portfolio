import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full h-screen bg-black text-white px-5 md:px-[80px] pt-32 pb-12 overflow-hidden relative">
      {/* Main Content Area - Removing Grid/Sidebar offset to align left */}
      <div className="flex flex-col justify-between h-full w-full">
        <div>
          <h1 className="text-3xl md:text-[7vw] leading-none font-bold tracking-tighter mt-10">
            Merhaba<span className="align-top text-3xl md:text-6xl">*</span>
          </h1>
          <h2 className="text-3xl md:text-[7vw] leading-none font-bold tracking-tighter">
            I <Link href="/work" className="relative inline-block text-white cursor-pointer after:content-[''] after:absolute after:w-full after:h-[6px] after:bg-white after:bottom-0 after:left-0 after:origin-left after:scale-x-100 hover:after:scale-x-0 after:transition-transform after:duration-500 after:ease-in-out">design</Link> & <Link href="/blog" className="relative inline-block text-white cursor-pointer after:content-[''] after:absolute after:w-full after:h-[6px] after:bg-white after:bottom-0 after:left-0 after:origin-left after:scale-x-100 hover:after:scale-x-0 after:transition-transform after:duration-500 after:ease-in-out">write</Link>.
          </h2>
        </div>

        <p className="text-3xl text-white"><span className="align-top text-2xl">*</span>Hello</p>
      </div>
    </div>
  );
}
