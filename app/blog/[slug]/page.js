import Footer from '@/components/Footer';

export async function generateStaticParams() {
    return [
        { slug: 'post-1' },
        { slug: 'post-2' },
    ];
}

export default async function BlogPost({ params }) {
    const { slug } = await params;

    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 md:pt-48 pb-0 px-5 md:px-[80px] max-w-[1920px] mx-auto flex flex-col justify-between overflow-x-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 md:gap-x-[40px] mb-16 md:mb-32">
                <div className="col-span-1 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium mb-4 capitalize">{slug.replace('-', ' ')}</h1>
                    <p className="text-gray-500 text-base md:text-lg font-medium mb-6">January 20, 2025</p>

                    <div className="w-full aspect-video bg-gray-400 mb-6" />

                    <div className="prose prose-lg font-medium text-base md:text-xl max-w-none">
                        <p className="mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
