"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselItem = {
    id: string | number;
    title: string;
    desc: string;
    image: string;
};

type ServiceCarouselProps = {
    title: string;
    description: string;
    items: CarouselItem[];
};

const CarouselImage = ({
    src,
    alt,
    priority,
    className
}: {
    src: string;
    alt: string;
    priority: boolean;
    className?: string;
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative w-full h-full ${className}`}>
            {/* Skeleton Loader */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
            )}

            <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1440px"
                className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
};

export default function ServiceCarousel({ title, description, items }: ServiceCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            transition: {
                x: { type: 'tween', ease: 'easeInOut', duration: 0.8 },
            },
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction > 0 ? '-100%' : '100%',
            transition: {
                x: { type: 'tween', ease: 'easeInOut', duration: 0.8 },
            },
        }),
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = items.length - 1;
            if (nextIndex >= items.length) nextIndex = 0;
            return nextIndex;
        });
    };

    if (!items || items.length === 0) return null;

    const currentCar = items[currentIndex];

    // Smart Pre-loading: Calculate next and previous indices
    const nextIndex = (currentIndex + 1) % items.length;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;

    return (
        <section className="w-full py-12 md:py-20">
            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10">
                {/* Section Header */}
                <div className="mb-10 flex flex-col items-center justify-center gap-6 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="inline-flex w-fit items-center justify-center rounded-full border border-[#5a80b9]/15 bg-white px-4 py-1.5 backdrop-blur-sm">
                            <span className="text-sm font-medium text-[#5a80b9]">Used Car Gallery</span>
                        </div>
                        <h2 className="text-3xl font-bold leading-tight text-[#323441] md:text-4xl">
                            {title}
                        </h2>
                        <p className="max-w-xl text-base text-gray-600 md:text-lg">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Main Slider Container */}
                <div className="relative h-[500px] w-full overflow-hidden rounded-[32px] md:h-[600px] shadow-2xl group">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute inset-0 h-full w-full bg-gray-100"
                        >
                            {/* Optimized Image with Skeleton */}
                            <CarouselImage
                                src={currentCar.image}
                                alt={currentCar.title}
                                priority={currentIndex === 0} // LCP optimization for first slide
                            />

                            {/* Radial Gradient Overlay for Center Content focus */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 pointer-events-none" />

                            {/* Content Overlay - Centered Bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 mb-12 flex flex-col items-center text-center text-white z-10 pointer-events-none">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="max-w-3xl"
                                >
                                    <h3 className="mb-3 text-3xl font-bold md:text-4xl">{currentCar.title}</h3>
                                    <p className="text-base font-light leading-relaxed text-gray-200 md:text-lg">
                                        {currentCar.desc}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons - Centered Vertical Sides */}
                    <button
                        onClick={() => paginate(-1)}
                        className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-xl focus:outline-none active:scale-95"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-xl focus:outline-none active:scale-95"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
                    </button>

                    {/* Pagination Dots - Bottom Center */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-[#5a80b9]" : "w-2 bg-white/50 hover:bg-white"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Hidden Preloader for Next/Prev Images */}
                <div className="hidden" aria-hidden="true">
                    <Image
                        src={items[nextIndex].image}
                        alt="preload next"
                        width={1}
                        height={1}
                        priority
                    />
                    <Image
                        src={items[prevIndex].image}
                        alt="preload prev"
                        width={1}
                        height={1}
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
