export async function generateStaticParams() {
    return [
        { slug: 'post-1' },
        { slug: 'post-2' },
    ];
}

export default async function BlogPost({ params }) {
    const { slug } = await params;

    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 px-4 md:px-12">
            <div className="container mx-auto max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-serif mb-6 capitalize">{slug.replace('-', ' ')}</h1>
                <p className="text-gray-500 mb-12">January 20, 2025</p>

                <div className="prose prose-lg">
                    <p>
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
    );
}
