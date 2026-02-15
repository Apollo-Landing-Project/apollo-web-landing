"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function News({ lang, data }: { lang: string, data: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    const isId = lang === "id";
    const labels = {
        pill: isId ? "Berita Terbaru" : "Latest News",
        readMore: isId ? "Baca Selengkapnya" : "Read More",
        seeMore: isId ? "Lihat Berita Lainnya" : "See More News",
    };

    // Use data from API, fallback to empty array if missing
    // We assume the API returns localized data because we call it with ?lang=...
    const rawNewsItems = data?.newsItems || [];

    // Map API items to the structure used in the UI
    const newsItems = rawNewsItems.map((item: any) => ({
        id: item.id,
        image: item.image,
        // Format date if it's an ISO string, otherwise keep as is
        date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString(isId ? 'id-ID' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : (item.date || ""),
        title: item.title,
        description: item.desc || item.description,
    }));

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }
    }, [newsItems, width]);

    if (newsItems.length === 0) {
        // Option: Render nothing or a simplified empty state if no news
        return (
            <section id="news" className="w-full bg-white py-16 md:py-24 scroll-mt-24">
                <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-4 md:px-10">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-3 py-1 text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15">
                            {data.badge || labels.pill}
                        </div>
                        <h2 className="max-w-[800px] text-3xl font-semibold leading-tight text-[#323441] md:text-[54px]">
                            {data.title}
                        </h2>
                        <p className="max-w-[700px] text-lg text-[#323441]/80">
                            {data.desc}
                        </p>
                        <p className="mt-8 text-gray-500">
                            {isId ? "Belum ada berita." : "No news available."}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="news" className="w-full bg-white py-16 md:py-24 scroll-mt-24">
            <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-4 md:px-10">

                {/* Header */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-3 py-1 text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15">
                        {data.badge || labels.pill}
                    </div>
                    <h2 className="max-w-[800px] text-3xl font-semibold leading-tight text-[#323441] md:text-[54px]">
                        {data.title}
                    </h2>
                    <p className="max-w-[700px] text-lg text-[#323441]/80">
                        {data.desc}
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="w-full overflow-hidden" ref={containerRef}>
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        whileTap={{ cursor: "grabbing" }}
                        className="flex gap-6 ease-out"
                    >
                        {newsItems.map((news: any) => (
                            <motion.div
                                key={news.id}
                                className="flex w-[85%] shrink-0 flex-col gap-4 rounded-2xl bg-white md:w-[45%] lg:w-[calc((100%/3.2)-1.5rem)]"
                            >
                                {/* Image */}
                                <div className="relative h-[240px] w-full overflow-hidden rounded-2xl">
                                    <Image
                                        src={news.image}
                                        alt={news.title}
                                        fill
                                        draggable={false}
                                        className="object-cover transition-transform duration-500 hover:scale-110 pointer-events-none"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-3">
                                    <span className="text-sm text-[#767676]">{news.date}</span>
                                    {/* Using Link to news detail. Ensure the route exists. */}
                                    <Link href={`/${lang}/news/${news.id}`} className="block">
                                        <h3 className="text-xl font-bold leading-tight text-[#323441] hover:text-[#5a80b9] transition-colors line-clamp-2 h-[3.5rem] overflow-hidden">
                                            {news.title}
                                        </h3>
                                    </Link>
                                    <p className="text-base text-[#767676] line-clamp-3 leading-normal h-[72px]">
                                        {news.description}
                                    </p>
                                    <Link href={`/${lang}/news/${news.id}`}>
                                        <button className="group mt-2 cursor-pointer flex w-fit items-center gap-2 rounded-full bg-[#5a80b9] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4a6d9e]">
                                            {labels.readMore}
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* See More Button */}
                <Link
                    href={`/${lang}/news`}
                    className="mt-4 rounded-full border border-gray-200 bg-white px-8 py-3 text-base font-medium text-[#323441] shadow-sm transition-colors hover:bg-[#e7e7e7] focus:outline-none focus:ring-2 focus:ring-[#5a80b9] focus:ring-offset-2"
                >
                    {labels.seeMore}
                </Link>
            </div>
        </section>
    );
}
