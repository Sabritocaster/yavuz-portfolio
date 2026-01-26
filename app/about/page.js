export default function About() {
    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 md:pt-48 pb-24 layout-grid overflow-x-hidden">

            {/* Image Section - Cols 1-4 on Desktop, Full on Mobile */}
            <div className="w-full col-span-12 md:col-span-4 mb-8 md:mb-0">
                <div className="w-full aspect-square bg-gray-400"></div>
            </div>

            {/* Content Section - Cols 5-10 on Desktop (Spanning 6 cols), Full on Mobile */}
            <div className="w-full col-span-12 md:col-start-5 md:col-span-6 flex flex-col justify-center">
                <p className="text-base md:text-xl leading-relaxed mb-4">
                    Natias autatia prest, qui officidus, consecusae. Veratem ipsametus, cul
                    parunt quas porepta quaspis dolupti doles ut et reiume nectatur se
                    quunt aliquae vellorrum exerchi ciusand ebist, quam assunt occusti ut
                    aut qui ditate cusa qui archill oreiur aut omnis am nulparc hicatempo
                    rem volest, ute re comnia con cullabo rempossimil inum essequi do
                    lores dolupturibus ese veria est, quas etur am sin nonsectium reperup
                    tas et archili quistrupta as qui con plautem fuga. Beatiorum aut ut lis de
                    nonserum ut rem velenetur? Onsent.
                </p>
                <p className="text-base md:text-xl leading-relaxed mb-8 md:mb-12">
                    Alit lam dolo omnis qui debitia volum iur sunt qui optae nobit audan
                    discit volupta tiorestem volut quatate mperit, nos aborem exceatiorunt
                    quiam, quis es il mo blacepe rferiam, o
                </p>

                <div className="mt-auto">
                    <p className="font-medium text-base md:text-lg">Ankara, Türkiye</p>
                    <p className="font-medium text-base md:text-lg">Instagram</p>
                    <p className="font-medium text-base md:text-lg">LinkedIn</p>
                </div>
            </div>
        </div>
    );

}
