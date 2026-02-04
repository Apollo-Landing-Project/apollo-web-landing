"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TeamMember {
    name: string;
    role: string;
    image: string;
    verified?: boolean;
}

interface TeamSectionProps {
    tag?: string;
    tagClassName?: string;
    title: string;
    description?: string;
    members: TeamMember[];
}

export default function TeamSection({ tag, tagClassName, title, description, members }: TeamSectionProps) {
    const [width, setWidth] = useState(0);
    const carousel = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    useEffect(() => {
        const updateWidth = () => {
            if (carousel.current) {
                const totalWidth = carousel.current.scrollWidth;
                const visibleWidth = carousel.current.offsetWidth;
                setWidth(totalWidth - visibleWidth);
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [members]);

    const handlePrev = () => {
        const currentX = x.get();
        const newX = Math.min(currentX + 350, 0);
        animate(x, newX, { type: "spring", stiffness: 300, damping: 30 });
    };

    const handleNext = () => {
        const currentX = x.get();
        const newX = Math.max(currentX - 350, -width);
        animate(x, newX, { type: "spring", stiffness: 300, damping: 30 });
    };

    const formatName = (name: string) => {
        const parts = name.trim().split(/\s+/);
        if (parts.length === 3) {
            return `${parts[0]} ${parts[1]} ${parts[2][0]}`;
        }
        return name;
    };

    return (
        <section className="w-full py-12 md:py-20 text-center overflow-hidden">
            <div className="mx-auto mb-12 flex max-w-[1440px] px-4 md:px-10 justify-between items-end">
                {/* Header Title Group */}
                <div className="flex flex-col items-center text-center w-full md:max-w-3xl mx-auto">
                    {tag && (
                        <span className={`mb-2 text-sm font-semibold uppercase tracking-wider ${tagClassName ? tagClassName : "text-[#5a80b9]"}`}>
                            {tag}
                        </span>
                    )}
                    <h2 className="mb-4 text-3xl font-bold text-[#323441] md:text-4xl">{title}</h2>
                    {description && <p className="text-gray-600 max-w-2xl">{description}</p>}
                </div>

                {/* Navigation Buttons */}
                {members.length > 4 && (
                    <div className="hidden md:flex gap-4 mb-2 shrink-0">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#5a80b9] hover:text-white hover:border-[#5a80b9] transition-all active:scale-95"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#5a80b9] hover:text-white hover:border-[#5a80b9] transition-all active:scale-95"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </div>

            <motion.div ref={carousel} className="cursor-grab active:cursor-grabbing overflow-hidden px-4 md:px-10">
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    onDragStart={() => {
                        // Recalculate width on drag start to ensure accuracy on resize
                        if (carousel.current) {
                            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
                        }
                    }}
                    style={{ x }}
                    whileTap={{ cursor: "grabbing" }}
                    className={`flex gap-6 md:gap-8 ${members.length <= 4 ? "lg:justify-center" : ""}`}
                >
                    {members.map((member, idx) => (
                        <motion.div
                            key={idx}
                            className={`relative h-[320px] md:h-[400px] w-full min-w-[260px] md:min-w-[300px] max-w-[280px] md:max-w-[350px] overflow-hidden rounded-[24px] md:rounded-[32px] bg-gray-100 shadow-md shrink-0 ${members.length <= 4 ? "md:min-w-0" : ""}`}
                        >
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105 pointer-events-none" // pointer-events-none prevents image dragging interfering with framer-motion
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-left text-white pointer-events-none">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl md:text-2xl font-bold truncate">{formatName(member.name)}</h3>
                                    {member.verified && (
                                        <div className="relative w-5 h-5 md:w-6 md:h-6 shrink-0">
                                            <Image
                                                src="/assets/verified.png"
                                                alt="Verified"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm md:text-base font-medium opacity-90 truncate">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
