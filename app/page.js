import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col justify-between px-4 md:px-12 pt-32 pb-12 overflow-hidden relative">
      <h1 className="text-3xl md:text-[7vw] leading-none font-bold tracking-tighter mt-10">
        Merhaba<span className="align-top text-3xl md:text-6xl">*</span>
      </h1>

      <div className="flex flex-col items-start space-y-2 text-3xl md:text-3xl text-gray-500 font-medium z-10">
        <p>
          Selected <Link href="/work" className="text-white border-b border-gray-700 hover:border-white transition-colors pb-0.5">Work</Link>.
        </p>
        <p>
          Thoughts on <Link href="/blog" className="text-white border-b border-gray-700 hover:border-white transition-colors pb-0.5">Blog</Link>.
        </p>
        <p>
          More <Link href="/about" className="text-white border-b border-gray-700 hover:border-white transition-colors pb-0.5">About</Link> me.
        </p>
      </div>

      <p className="text-3xl text-white"><span className="align-top text-2xl">*</span>Hello</p>
    </div>
  );
}
