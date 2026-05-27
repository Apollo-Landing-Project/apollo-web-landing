"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface InvestorNewsItem {
	id: string;
	title: string;
	description: string;
	image: string;
	publishedAt: string;
	href: string;
}

interface NewsCarouselSectionProps {
	badge?: string;
	title?: string;
	desc?: string;
	items?: InvestorNewsItem[];
	lang?: string;
}

export default function NewsCarouselSection({
	badge = "Berita",
	title = "Berita",
	desc = "Ikuti pembaruan terbaru dan pengumuman resmi kami.",
	items = [],
	lang = "id",
}: NewsCarouselSectionProps) {
	const dragThreshold = 8;
	const containerRef = useRef<HTMLDivElement>(null);
	const pointerStateRef = useRef({
		active: false,
		startX: 0,
		scrollLeft: 0,
	});
	const didDragRef = useRef(false);

	const [isDragging, setIsDragging] = useState(false);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(items.length > 1);

	const isId = lang === "id";

	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}

		const updateScrollState = () => {
			const maxScrollLeft = container.scrollWidth - container.clientWidth;
			setCanScrollLeft(container.scrollLeft > 4);
			setCanScrollRight(maxScrollLeft - container.scrollLeft > 4);
		};

		updateScrollState();
		container.addEventListener("scroll", updateScrollState, { passive: true });
		window.addEventListener("resize", updateScrollState);

		return () => {
			container.removeEventListener("scroll", updateScrollState);
			window.removeEventListener("resize", updateScrollState);
		};
	}, [items.length]);

	const scrollByCard = (direction: number) => {
		const container = containerRef.current;
		if (!container) {
			return;
		}

		const firstCard = container.querySelector<HTMLElement>("[data-news-card]");
		const cardWidth = firstCard
			? firstCard.getBoundingClientRect().width + 24
			: container.clientWidth * 0.9;

		container.scrollBy({
			left: direction * cardWidth,
			behavior: "smooth",
		});
	};

	const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
		const container = containerRef.current;
		if (!container || (event.pointerType === "mouse" && event.button !== 0)) {
			return;
		}

		pointerStateRef.current = {
			active: true,
			startX: event.clientX,
			scrollLeft: container.scrollLeft,
		};
		didDragRef.current = false;
		setIsDragging(false);
	};

	const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
		const container = containerRef.current;
		if (!container || !pointerStateRef.current.active) {
			return;
		}

		const deltaX = event.clientX - pointerStateRef.current.startX;
		if (!didDragRef.current && Math.abs(deltaX) <= dragThreshold) {
			return;
		}

		if (!didDragRef.current) {
			didDragRef.current = true;
			setIsDragging(true);
			event.currentTarget.setPointerCapture(event.pointerId);
		}

		container.scrollLeft = pointerStateRef.current.scrollLeft - deltaX;
	};

	const finishDragging = (event: React.PointerEvent<HTMLDivElement>) => {
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}

		pointerStateRef.current.active = false;
		setIsDragging(false);
		window.setTimeout(() => {
			didDragRef.current = false;
		}, 0);
	};

	const preventClickAfterDrag = (event: React.MouseEvent<HTMLAnchorElement>) => {
		if (!didDragRef.current) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
	};

	return (
		<section className="w-full bg-[linear-gradient(180deg,#f8fafc_0%,#eef4fb_100%)] py-16 md:py-20">
			<div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-4 md:px-10">
				<div className="flex flex-col gap-6 border-b border-[#d9e2ef] pb-8 md:flex-row md:items-end md:justify-between">
					<div className="max-w-3xl">
						<div className="mb-4 inline-flex w-fit items-center justify-center rounded-full bg-white px-4 py-1.5 text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15">
							{badge}
						</div>
						<h2 className="text-3xl font-bold text-[#323441] md:text-[44px] md:leading-tight">
							{title}
						</h2>
						<p className="mt-3 max-w-2xl text-base text-[#5f6775] md:text-lg">
							{desc}
						</p>
					</div>

					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:justify-end">
						<p className="max-w-xs text-sm font-medium leading-6 text-[#70819a] sm:max-w-none">
							{isId ? "Geser atau klik panah untuk melihat berita lain." : "Drag or use the arrows to browse more news."}
						</p>
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={() => scrollByCard(-1)}
								disabled={!canScrollLeft}
								className="flex h-12 w-12 items-center justify-center rounded-full border border-[#cdd8e7] bg-white text-[#4d6485] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#5a80b9] hover:text-[#5a80b9] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
								aria-label={isId ? "Berita sebelumnya" : "Previous news"}
							>
								<ChevronLeft className="h-5 w-5" />
							</button>
							<button
								type="button"
								onClick={() => scrollByCard(1)}
								disabled={!canScrollRight}
								className="flex h-12 w-12 items-center justify-center rounded-full border border-[#cdd8e7] bg-white text-[#4d6485] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#5a80b9] hover:text-[#5a80b9] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
								aria-label={isId ? "Berita berikutnya" : "Next news"}
							>
								<ChevronRight className="h-5 w-5" />
							</button>
						</div>
					</div>
				</div>

				{items.length > 0 ? (
					<div
						ref={containerRef}
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={finishDragging}
						onPointerCancel={finishDragging}
						className={`flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
						style={{ touchAction: "pan-y" }}
					>
						{items.map((item) => {
							const imageSrc = item.image || "/assets/news/news-1.png";

							return (
								<Link
									key={item.id}
									href={item.href}
									onClickCapture={preventClickAfterDrag}
									className="group block min-w-[272px] snap-start sm:min-w-[340px] lg:min-w-[400px]"
									data-news-card
								>
									<article className="flex h-full min-h-[430px] flex-col overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-[0_24px_60px_rgba(43,71,111,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_70px_rgba(43,71,111,0.14)] md:min-h-[480px]">
										<div className="relative h-[210px] overflow-hidden md:h-[240px]">
											<Image
												src={imageSrc}
												alt={item.title}
												fill
												sizes="(max-width: 640px) 290px, (max-width: 1024px) 340px, 400px"
												className="object-cover transition-transform duration-500 group-hover:scale-105"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/50 via-transparent to-transparent" />
										</div>

										<div className="flex flex-1 flex-col gap-5 p-6">
											<div className="flex items-center gap-2 text-sm font-medium text-[#5a80b9]">
												<CalendarDays className="h-4 w-4" />
												<span>{item.publishedAt}</span>
											</div>

											<div className="space-y-3">
												<h3 className="text-2xl font-bold leading-tight text-[#323441] transition-colors group-hover:text-[#355f8d]">
													{item.title}
												</h3>
												<p className="line-clamp-4 text-base leading-7 text-[#667085]">
													{item.description}
												</p>
											</div>

											<div className="mt-auto flex items-center justify-between border-t border-[#edf2f7] pt-5 text-sm font-semibold text-[#355f8d]">
												<span>{isId ? "Baca selengkapnya" : "Read more"}</span>
												<span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef4fb] text-[#355f8d] transition-colors group-hover:bg-[#5a80b9] group-hover:text-white">
													<ArrowUpRight className="h-4 w-4" />
												</span>
											</div>
										</div>
									</article>
								</Link>
							);
						})}
					</div>
				) : (
					<div className="rounded-[28px] border border-dashed border-[#cdd8e7] bg-white/75 px-6 py-16 text-center text-[#70819a]">
						<p className="text-base font-medium">
							{isId ? "Belum ada berita yang tersedia saat ini." : "There are no news articles available right now."}
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
