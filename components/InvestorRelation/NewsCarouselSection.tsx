"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	ArrowRight,
	CalendarDays,
	ChevronLeft,
	ChevronRight,
	Download,
	FileText,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface InvestorNewsItem {
	id: string;
	title: string;
	description: string;
	image: string;
	publishedAt: string;
	href: string;
	has_report?: boolean;
	report_id?: string;
	download_url?: string;
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
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		containScroll: "trimSnaps",
		dragFree: false,
		slidesToScroll: 1,
		skipSnaps: false,
	});

	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(items.length > 1);
	const isId = lang === "id";

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setCanScrollLeft(emblaApi.canScrollPrev());
		setCanScrollRight(emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect();
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);

		return () => {
			emblaApi.off("select", onSelect);
			emblaApi.off("reInit", onSelect);
		};
	}, [emblaApi, onSelect]);

	const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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
							{isId ?
								"Geser kartu atau gunakan panah untuk melihat berita lain."
							:	"Drag the cards or use the arrows to browse more news."}
						</p>
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={scrollPrev}
								disabled={!canScrollLeft}
								className="flex h-12 w-12 items-center justify-center rounded-full border border-[#cdd8e7] bg-white text-[#4d6485] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#5a80b9] hover:text-[#5a80b9] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
								aria-label={isId ? "Berita sebelumnya" : "Previous news"}
							>
								<ChevronLeft className="h-5 w-5" />
							</button>
							<button
								type="button"
								onClick={scrollNext}
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
						ref={emblaRef}
						className="overflow-hidden touch-pan-y select-none"
					>
						<div className="-ml-6 flex">
							{items.map((item) => {
								const imageSrc = (item.image && item.image.trim() !== "") ? item.image : "/assets/news/news-1.png";
								const hasDownload = Boolean(item.download_url);

								return (
									<div
										key={item.id}
										className="min-w-0 flex-[0_0_88%] pl-6 sm:flex-[0_0_60%] lg:flex-[0_0_42%]"
									>
										<article className="flex h-full min-h-[470px] flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-[0_28px_70px_rgba(43,71,111,0.10)] transition-shadow duration-300 hover:shadow-[0_32px_80px_rgba(43,71,111,0.16)] md:min-h-[520px]">
											<Link
												href={item.href}
												className="group block"
											>
												<div className="relative h-[220px] overflow-hidden md:h-[260px]">
													<Image
														src={imageSrc}
														alt={item.title}
														fill
														draggable={false}
														sizes="(max-width: 640px) 88vw, (max-width: 1024px) 60vw, 42vw"
														className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
													/>
													<div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/45 via-[#0f172a]/5 to-transparent" />

													{item.has_report && (
														<div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-orange-600 shadow-lg backdrop-blur-sm">
															<FileText className="h-3.5 w-3.5" />
															<span>{isId ? "Dokumen Tersedia" : "Document Available"}</span>
														</div>
													)}
												</div>
											</Link>

											<div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
												<div className="flex items-center gap-2 text-sm font-medium text-[#5a80b9]">
													<CalendarDays className="h-4 w-4" />
													<span>{item.publishedAt}</span>
												</div>

												<div className="space-y-3">
													<Link
														href={item.href}
														className="group/title inline-block"
													>
														<h3 className="text-2xl font-bold leading-tight text-[#323441] transition-colors group-hover/title:text-[#355f8d]">
															{item.title}
														</h3>
													</Link>
													<p className="line-clamp-4 text-base leading-7 text-[#667085]">
														{item.description}
													</p>
												</div>

												{item.has_report && (
													<div className="rounded-2xl border border-orange-100 bg-[#fff6eb] px-4 py-3 text-sm font-medium text-[#b86210]">
														{isId ?
															"Berita ini terhubung dengan dokumen investor dan bisa langsung diunduh."
														:	"This article is linked to an investor document and can be downloaded directly."}
													</div>
												)}

												<div className="mt-auto flex flex-col gap-3 border-t border-[#edf2f7] pt-5">
													<Link
														href={item.href}
														className="inline-flex items-center justify-between rounded-2xl border border-[#d9e5f2] bg-[#f7fbff] px-5 py-3.5 text-sm font-semibold text-[#355f8d] transition-all hover:border-[#5a80b9] hover:bg-[#edf5ff]"
													>
														<span>{isId ? "Lihat Berita" : "View Article"}</span>
														<ArrowRight className="h-4 w-4" />
													</Link>

													{hasDownload && (
														<a
															href={item.download_url}
															target="_blank"
															rel="noopener noreferrer"
															className="inline-flex items-center justify-between rounded-2xl border border-orange-500 bg-orange-500 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:border-orange-600"
														>
															<span>{isId ? "Unduh Dokumen" : "Download Document"}</span>
															<Download className="h-4 w-4" />
														</a>
													)}
												</div>
											</div>
										</article>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<div className="rounded-[28px] border border-dashed border-[#cdd8e7] bg-white/75 px-6 py-16 text-center text-[#70819a]">
						<p className="text-base font-medium">
							{isId ?
								"Belum ada berita yang tersedia saat ini."
							:	"There are no news articles available right now."}
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
