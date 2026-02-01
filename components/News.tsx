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

export default function News() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }
    }, []);

    return (
        <section className="w-full bg-white py-16 md:py-24">
            <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-4 md:px-10">

                {/* Header */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-3 py-1 text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15">
                        Latest News
                    </div>
                    <h2 className="max-w-[800px] text-3xl font-semibold leading-tight text-[#323441] md:text-[54px]">
                        See Our Insights, Milestones, And Stories From Our Journey
                    </h2>
                    <p className="max-w-[700px] text-lg text-[#323441]/80">
                        Stay informed with the latest updates from our company, including product innovations, manufacturing, industry insights, and milestones
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
                                        alt={news.title}
                                        fill
                                        draggable={false}
                                        className="object-cover transition-transform duration-500 hover:scale-110 pointer-events-none"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-3">
                                    <span className="text-sm text-[#767676]">{news.date}</span>
                                    <h3 className="text-xl font-bold leading-tight text-[#323441]">
                                        {news.title}
                                    </h3>
                                    <p className="text-base text-[#767676]">
                                        {news.description}
                                    </p>
                                    <button className="group mt-2 flex w-fit items-center gap-2 rounded-full bg-[#5a80b9] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4a6d9e]">
                                        Read More
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* See More Button */}
                <Link
                    href="/news"
                    className="mt-4 rounded-full border border-gray-200 bg-white px-8 py-3 text-base font-medium text-[#323441] shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5a80b9] focus:ring-offset-2"
                >
                    See More News
                </Link>
            </div>
        </section>
    );
}
