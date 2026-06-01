"use client";

import React, { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";

type Partner = {
	id: string | number;
	name: string;
	image: string;
};

const DealerCarousel = ({
	title,
	dealers,
}: {
	title: string;
	dealers: Partner[];
}) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		loop: false,
		dragFree: true,
		containScroll: "trimSnaps",
	});
	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi],
	);
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi],
	);
	const scrollTo = useCallback(
		(index: number) => emblaApi && emblaApi.scrollTo(index),
		[emblaApi],
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
		setPrevBtnEnabled(emblaApi.canScrollPrev());
		setNextBtnEnabled(emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		// eslint-disable-next-line react-hooks/set-state-in-effect
		onSelect();
		setScrollSnaps(emblaApi.scrollSnapList());
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);
	}, [emblaApi, onSelect]);

	return (
		<div className="flex flex-col gap-8 md:gap-10 w-full">
			{/* Section Header */}
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-col gap-2">
					<h3 className="text-3xl font-bold text-[#323441] tracking-tight">
						{title}
					</h3>
					<div className="h-1 w-20 bg-[#5a80b9] rounded-full" />
				</div>

				{/* Navigation Buttons */}
				<div className="flex items-center gap-4">
					<button
						onClick={scrollPrev}
						disabled={!prevBtnEnabled}
						className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
							prevBtnEnabled
								? "bg-white text-[#5a80b9] border-[#5a80b9] hover:bg-[#5a80b9] hover:text-white shadow-md cursor-pointer"
								: "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
						}`}
					>
						<ChevronLeft className="w-6 h-6" />
					</button>
					<button
						onClick={scrollNext}
						disabled={!nextBtnEnabled}
						className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
							nextBtnEnabled
								? "bg-white text-[#5a80b9] border-[#5a80b9] hover:bg-[#5a80b9] hover:text-white shadow-md cursor-pointer"
								: "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
						}`}
					>
						<ChevronRight className="w-6 h-6" />
					</button>
				</div>
			</div>

			{/* Carousel */}
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex gap-6 md:gap-8">
					{dealers.map((dealer) => (
						<div
							key={dealer.id}
							className="flex-[0_0_85%] md:flex-[0_0_40%] min-w-0" // Shows ~2.5 items on desktop (100/40 = 2.5)
						>
							<div className="group relative bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 h-full">
								{/* Image Container */}
								<div className="relative h-[240px] md:h-[320px] lg:h-[450px] w-full overflow-hidden">
									<Image
										src={(dealer.image && dealer.image.trim() !== "") ? dealer.image : "/assets/news/news-1.png"}
										alt={dealer.name}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
								</div>

								{/* Info Overlay / Box */}
								<div className="p-6 md:p-8">
									<div className="flex items-start justify-between gap-4">
										<div className="flex flex-col gap-2">
											<div className="flex items-center gap-2 text-[#5a80b9]">
												<MapPin className="w-4 h-4" />
												<span className="text-xs font-bold uppercase tracking-wider">
													Official Dealer
												</span>
											</div>
											<h4 className="text-xl md:text-2xl font-bold text-[#323441] group-hover:text-[#5a80b9] transition-colors duration-300">
												{dealer.name}
											</h4>
										</div>
										<div className="shrink-0 w-12 h-12 rounded-2xl bg-[#f2f7ff] flex items-center justify-center text-[#5a80b9] group-hover:bg-[#5a80b9] group-hover:text-white transition-all duration-300">
											<ArrowRightUp className="w-6 h-6" />
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Pagination Dots */}
			<div className="flex justify-center gap-3 mt-4">
				{scrollSnaps.map((_, index) => (
					<button
						key={index}
						className={`h-2.5 rounded-full transition-all duration-500 ${
							index === selectedIndex
								? "w-10 bg-[#5a80b9]"
								: "w-2.5 bg-[#E4E7EC] hover:bg-gray-300"
						}`}
						onClick={() => scrollTo(index)}
					/>
				))}
			</div>
		</div>
	);
};

const ArrowRightUp = ({ className }: { className?: string }) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
	>
		<line x1="7" y1="17" x2="17" y2="7" />
		<polyline points="7 7 17 7 17 17" />
	</svg>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Partners({ lang, data }: { lang: string; data: any }) {
	const isId = lang === "id";

	const labels = {
		pill: isId ? "Jaringan Kami" : "Our Network",
		dealers: isId ? "Dealer Kami" : "Our Dealers",
	};

	return (
		<section className="w-full bg-[#fcfcfd] py-24 px-4 md:px-10 overflow-hidden">
			<div className="mx-auto max-w-[1440px] flex flex-col gap-20">
				{/* Header */}
				<div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
					<div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-5 py-2 text-sm font-bold text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/20">
						{data.badge || labels.pill}
					</div>

					<div className="flex flex-col gap-5">
						<h2 className="text-4xl md:text-[56px] font-bold text-[#323441] leading-[1.1] tracking-tight">
							{data.title}
						</h2>

						<p className="text-lg md:text-xl text-[#323441]/70 leading-relaxed">
							{data.desc}
						</p>
					</div>
				</div>

				{/* Content Sections */}
				<div className="flex flex-col gap-20">
					{data.partnersDealers && (
						<DealerCarousel
							title={labels.dealers}
							dealers={data.partnersDealers}
						/>
					)}

					{/* 
					<CarouselSection
						title={labels.insurance}
						partners={data.partnersInsurance}
					/>
					<CarouselSection
						title={labels.funding}
						partners={data.partnersFunding}
					/> 
					*/}
				</div>
			</div>
		</section>
	);
}
