'use client';

import React, { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type Partner = {
    id: number;
    name: string;
    logo: string; // URL placeholder
};

const insurancePartners: Partner[] = [
    { id: 1, name: 'Fairfax', logo: "/assets/partners/fairfax.png" },
    { id: 2, name: 'Allianz', logo: "/assets/partners/allianz.png" },
    { id: 3, name: 'BCA Insurance', logo: "/assets/partners/bca-insurance.png" },
    { id: 4, name: 'Jasindo', logo: "/assets/partners/jasindo.png" },
    { id: 5, name: 'Sompo', logo: "/assets/partners/sompo.png" },
    { id: 6, name: 'Tokio Marine', logo: "/assets/partners/tokio-marine.png" },
];

const fundingPartners: Partner[] = [
    { id: 1, name: 'BCA Finance', logo: "/assets/partners/bca-finance.png" },
    { id: 2, name: 'CIMB Niaga', logo: "/assets/partners/cimb-niaga.png" },
    { id: 3, name: 'KKB BCA', logo: "/assets/partners/kkb-bca.png" },
    { id: 4, name: 'Mizuho', logo: "/assets/partners/mizuho.png" },
    { id: 5, name: 'Mandiri Tunas', logo: "/assets/partners/mandiri-tunas.png" },
    { id: 6, name: 'Adira', logo: "/assets/partners/adira.png" },
];

const CarouselSection = ({ title, partners }: { title: string; partners: Partner[] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true, containScroll: 'trimSnaps' });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="flex flex-col gap-6 md:gap-8 w-full">
            {/* Section Header */}
            <div className="flex flex-row items-center justify-between">
                <h3 className="text-2xl font-bold text-[#323441]">{title}</h3>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={scrollPrev}
                        disabled={!prevBtnEnabled}
                        className={`w-10 h-10 rounded-full border border-[#D0D5DD] flex items-center justify-center transition-all ${prevBtnEnabled
                            ? 'bg-white text-[#323441] hover:bg-gray-50 border-[#D0D5DD] cursor-pointer'
                            : 'bg-transparent text-gray-300 border-gray-200 cursor-not-allowed'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={scrollNext}
                        disabled={!nextBtnEnabled}
                        className={`w-10 h-10 rounded-full border border-[#D0D5DD] flex items-center justify-center transition-all ${nextBtnEnabled
                            ? 'bg-white text-[#323441] hover:bg-gray-50 border-[#D0D5DD] cursor-pointer'
                            : 'bg-transparent text-gray-300 border-gray-200 cursor-not-allowed'
                            }`}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6">
                    {partners.map((partner) => (
                        <div
                            key={partner.id}
                            className="flex-[0_0_240px] min-w-0" // Fixed width card
                        >
                            <div className="h-[140px] w-full border border-gray-200 rounded-3xl bg-white flex items-center justify-center p-8 hover:shadow-lg transition-shadow duration-300 select-none">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        fill
                                        className={`object-contain ${partner.name === 'Mandiri Tunas' || partner.name === 'Adira' ? 'scale-125' : ''}`}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Dots (Optional based on design, good for UX) */}
            <div className="flex justify-center gap-2 mt-2">
                <div className="flex gap-2">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${index === selectedIndex ? "w-8 bg-[#5a80b9]" : "w-2 bg-[#E4E7EC]"
                                }`}
                            onClick={() => scrollTo(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function Partners() {
    return (
        <section className="w-full bg-white py-20 px-4 md:px-10 overflow-hidden">
            <div className="mx-auto max-w-[1440px] flex flex-col gap-16">

                {/* Header */}
                <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
                    <div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-4 py-1.5 text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15">
                        Our Partners
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-4xl md:text-[54px] font-semibold text-[#323441] leading-tight">
                            We’re Stronger Together Through Collaboration.
                        </h2>

                        <p className="text-lg text-[#323441]/80 leading-relaxed">
                            We build strategic partnerships that strengthen our capabilities and sustainable, long-term growth.
                        </p>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="flex flex-col gap-16">
                    <CarouselSection title="Insurance Partners" partners={insurancePartners} />
                    <CarouselSection title="Funding Partners" partners={fundingPartners} />
                </div>

            </div>
        </section>
    );
}
