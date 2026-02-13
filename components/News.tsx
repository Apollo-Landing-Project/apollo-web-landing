"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";

type NewsItem = {
    id: number;
    image: string;
    date: string;
    title: string;
    description: string;
};

const newsItems: NewsItem[] = [
    {
        id: 1,
        image: "/assets/news/news-1.png",
        date: "October 23, 2025",
        title: "Summary of Minutes of EGMS 2026",
        description: "We've been enhancing production to support growing demand product.",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
        date: "October 24, 2025",
        title: "Expansion into South East Asia Region",
        description: "New dealerships opening in Malaysia and Thailand to serve our growing customer base.",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop",
        date: "October 25, 2025",
        title: "Q3 Financial Results Announcement",
        description: "Strong growth in the automotive sector drives record-breaking quarterly revenue.",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop",
        date: "October 26, 2025",
        title: "Launch of New Sustainable Initiatives",
        description: "Implementing eco-friendly practices across all our manufacturing plants.",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
        date: "October 27, 2025",
        title: "Strategic Partnership with Tech Giants",
        description: "Collaborating to bring next-gen AI solutions to our fleet management systems.",
    },
];

const DRAG_BUFFER = 50;

export default function News({ lang, data }: { lang: string, data: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    const isId = lang === "id";
    const labels = {
        pill: isId ? "Berita Terbaru" : "Latest News",
        readMore: isId ? "Baca Selengkapnya" : "Read More",
        seeMore: isId ? "Lihat Berita Lainnya" : "See More News",
    };

    const newsItems: (NewsItem & { content: { en: { title: string; desc: string }, id: { title: string; desc: string } } })[] = [
        {
            id: 1,
            image: "/assets/news/news-1.png",
            date: "October 23, 2025",
            title: "Summary of Minutes of EGMS 2026",
            description: "We've been enhancing production to support growing demand product.",
            content: {
                en: {
                    title: "Summary of Minutes of EGMS 2026",
                    desc: "We've been enhancing production to support growing demand product."
                },
                id: {
                    title: "Ringkasan Risalah RUPSLB 2026",
                    desc: "Kami telah meningkatkan produksi untuk mendukung permintaan produk yang terus berkembang."
                }
            }
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
            date: "October 24, 2025",
            title: "Expansion into South East Asia Region",
            description: "New dealerships opening in Malaysia and Thailand to serve our growing customer base.",
            content: {
                en: {
                    title: "Expansion into South East Asia Region",
                    desc: "New dealerships opening in Malaysia and Thailand to serve our growing customer base."
                },
                id: {
                    title: "Ekspansi ke Wilayah Asia Tenggara",
                    desc: "Dealer baru dibuka di Malaysia dan Thailand untuk melayani basis pelanggan kami yang terus berkembang."
                }
            }
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop",
            date: "October 25, 2025",
            title: "Q3 Financial Results Announcement",
            description: "Strong growth in the automotive sector drives record-breaking quarterly revenue.",
            content: {
                en: {
                    title: "Q3 Financial Results Announcement",
                    desc: "Strong growth in the automotive sector drives record-breaking quarterly revenue."
                },
                id: {
                    title: "Pengumuman Hasil Keuangan Q3",
                    desc: "Pertumbuhan kuat di sektor otomotif mendorong pendapatan kuartalan yang memecahkan rekor."
                }
            }
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop",
            date: "October 26, 2025",
            title: "Launch of New Sustainable Initiatives",
            description: "Implementing eco-friendly practices across all our manufacturing plants.",
            content: {
                en: {
                    title: "Launch of New Sustainable Initiatives",
                    desc: "Implementing eco-friendly practices across all our manufacturing plants."
                },
                id: {
                    title: "Peluncuran Inisiatif Berkelanjutan Baru",
                    desc: "Menerapkan praktik ramah lingkungan di seluruh pabrik manufaktur kami."
                }
            }
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
            date: "October 27, 2025",
            title: "Strategic Partnership with Tech Giants",
            description: "Collaborating to bring next-gen AI solutions to our fleet management systems.",
            content: {
                en: {
                    title: "Strategic Partnership with Tech Giants",
                    desc: "Collaborating to bring next-gen AI solutions to our fleet management systems."
                },
                id: {
                    title: "Kemitraan Strategis dengan Raksasa Teknologi",
                    desc: "Berkolaborasi untuk menghadirkan solusi AI generasi berikutnya ke sistem manajemen armada kami."
                }
            }
        },
    ];

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }
    }, [width]); // Added width as dependency to re-calc if screen resizes, ideally use resize observer but simple dep is okayish

    return (
        <section id="news" className="w-full bg-white py-16 md:py-24 scroll-mt-24">
            <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-4 md:px-10">

                {/* Header */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-3 py-1 text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15">
                        {labels.pill}
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
                        {newsItems.map((news) => (
                            <motion.div
                                key={news.id}
                                className="flex w-[85%] shrink-0 flex-col gap-4 rounded-2xl bg-white md:w-[45%] lg:w-[calc((100%/3.2)-1.5rem)]"
                            // The logic for lg:w-[calc(100%/3.2)] ensures 3 full items + 0.2 of the next are visible
                            // Note: adjusted slightly for gap accounting
                            >
                                {/* Image */}
                                <div className="relative h-[240px] w-full overflow-hidden rounded-2xl">
                                    <Image
                                        src={news.image}
                                        alt={news.content[lang as 'en' | 'id'].title}
                                        fill
                                        draggable={false}
                                        className="object-cover transition-transform duration-500 hover:scale-110 pointer-events-none"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-3">
                                    <span className="text-sm text-[#767676]">{news.date}</span>
                                    <Link href={`/${lang}/news/${news.id}`} className="block">
                                        <h3 className="text-xl font-bold leading-tight text-[#323441] hover:text-[#5a80b9] transition-colors">
                                            {news.content[lang as 'en' | 'id'].title}
                                        </h3>
                                    </Link>
                                    <p className="text-base text-[#767676]">
                                        {news.content[lang as 'en' | 'id'].desc}
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
