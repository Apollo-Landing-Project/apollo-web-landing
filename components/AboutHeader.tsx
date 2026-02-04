"use client";

import React from "react";
import Image from "next/image";

interface AboutHeaderProps {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
    targetId?: string;
    badge?: string;
}

export default function AboutHeader({
    title = "Learn More About Apollo Global Interactive",
    subtitle = "PT Apollo Global Interactive Tbk (The Company) is a multidimensional automotive company dedicated to serving you through innovation, superior service, and sustainable growth.",
    backgroundImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Placeholder building image
    targetId = "our-vision",
    badge = "About Us"
}: AboutHeaderProps) {
    const scrollToTarget = () => {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 mt-6 md:mt-10">
            <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-3xl">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={backgroundImage}
                        alt="About Header Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
                    <div className="mb-6 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                        <span className="text-sm font-medium text-white">{badge}</span>
                    </div>

                    <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                        {title}
                    </h1>

                    <p className="mb-8 max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">
                        {subtitle}
                    </p>

                    <button
                        onClick={scrollToTarget}
                        className="rounded-full bg-[#5a80b9] px-8 py-3 text-base font-semibold text-white transition-all hover:bg-[#4a6d9e] hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                    >
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}
