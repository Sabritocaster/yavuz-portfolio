export default function About() {
    return (
        <div className="w-full min-h-screen bg-white text-black pt-32 md:pt-48 pb-24 px-4 md:px-12">
            <div className="flex flex-col md:flex-row gap-12 lg:gap-24">

                {/* Left Column: Image */}
                <div className="w-full md:w-1/3">
                    <div className="w-full aspect-square bg-gray-400"></div>
                </div>

                {/* Right Column: Text */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <p className="text-xl leading-relaxed">
                        Natias autatia prest, qui officidus, consecusae. Veratem ipsametus, cul
                        parunt quas porepta quaspis dolupti doles ut et reiume nectatur se
                        quunt aliquae vellorrum exerchi ciusand ebist, quam assunt occusti ut
                        aut qui ditate cusa qui archill oreiur aut omnis am nulparc hicatempo
                        rem volest, ute re comnia con cullabo rempossimil inum essequi do
                        lores dolupturibus ese veria est, quas etur am sin nonsectium reperup
                        tas et archili quistrupta as qui con plautem fuga. Beatiorum aut ut lis de
                        nonserum ut rem velenetur? Onsent.
                    </p>
                    <p className="text-xl leading-relaxed mb-12">
                        Alit lam dolo omnis qui debitia volum iur sunt qui optae nobit audan
                        discit volupta tiorestem volut quatate mperit, nos aborem exceatiorunt
                        quiam, quis es il mo blacepe rferiam, o
                    </p>

                    <div className="mt-auto">
                        <p className="font-medium text-lg">Süleyman Seba Cd. No:79</p>
                        <p className="font-medium text-lg">34357 Besiktas / Istanbul Turkey</p>
                        <a href="mailto:info@fol.com.tr" className="font-medium text-lg hover:underline">info@fol.com.tr</a>
                    </div>
                </div>

            </div>
        </div>
    );
}
