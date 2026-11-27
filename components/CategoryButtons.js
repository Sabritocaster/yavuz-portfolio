'use client';

export default function CategoryButtons({ categories }) {
    const scrollToCategory = (category) => {
        const element = document.getElementById(category);
        if (element) {
            const offset = 80; // Adjust for header height/spacing
            const elementPosition = element.getBoundingClientRect().top;
            const targetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="col-span-12 md:col-span-6 grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-x-[2.5%] md:gap-y-4 mt-8 md:mt-16 text-base md:text-lg">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => scrollToCategory(category)}
                    className="border border-black pt-2.5 pb-3.5 md:pt-3 md:pb-4.5 text-center font-extrabold hover:bg-black hover:text-white transition-all duration-300"
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
