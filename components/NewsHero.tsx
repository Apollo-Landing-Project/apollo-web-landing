"use client";

import React from "react";
import Image from "next/image";

export default function NewsHero() {
    const scrollToNews = () => {
        const newsSection = document.getElementById("company-news");
        if (newsSection) {
            newsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative h-[600px] w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 h-full w-full">
                <Image
                    src="/assets/news-page/hero-bg.png"
                    alt="News Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-10 flex items-center px-4 md:px-10">
                <div className="mx-auto w-full max-w-[1440px]">
                    <div className="flex max-w-[768px] flex-col items-start gap-8">
                        <div className="flex flex-col gap-2.5">
                            {/* Badge */}
                            <div className="w-fit rounded-full border border-[#f2f2f7] px-2.5 py-1.5 backdrop-blur-sm">
                                <span className="text-base font-normal text-white">
                                    Company News
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-[40px] font-bold leading-tight text-white md:text-[62px]">
                                Stay Up To Date With <br /> Our Company News.
                            </h1>

                            {/* Description */}
                            <p className="max-w-[600px] text-base text-white/90">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
                            </p>
                        </div>

                        {/* Button */}
                        <button
                            onClick={scrollToNews}
                            className="rounded-full bg-[#5a80b9] px-6 py-4 text-base font-medium text-white transition-colors hover:bg-[#4a6d9e]"
                        >
                            See Our News
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
