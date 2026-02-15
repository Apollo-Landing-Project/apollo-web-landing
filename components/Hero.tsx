'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export interface HeroItem {
    id: string;
    title: string;
    desc: string;
    background: string;
}

export default function Hero({ lang = "en", data }: { lang?: string, data: HeroItem[] }) {
    const slides = data;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev (though only next is requested)

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };
    const handlePrevious = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const slideVariants: Variants = {
        hidden: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
        }),
        visible: {
            x: 0,
            transition: {
                x: { type: 'tween', ease: 'easeInOut', duration: 0.8 },
            },
        },
        exit: (direction: number) => ({
            x: direction > 0 ? '-100%' : '100%',
            transition: {
                x: { type: 'tween', ease: 'easeInOut', duration: 0.8 },
            },
        }),
    };

    const textVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: (custom: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: 0.2 + custom * 0.1, duration: 0.5, ease: 'easeOut' },
        }),
    };

    return (
        <div id="home" className="w-full max-w-[1440px] mx-auto px-4 md:px-10 mt-6 md:mt-10 scroll-mt-32">
            <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-3xl">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Background Image */}
                        <div className="relative w-full h-full">
                            <Image
                                src={slides[currentIndex].background}
                                alt={slides[currentIndex].title}
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/70 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="container mx-auto px-6 sm:px-10 md:px-16">
                                <div className="max-w-[768px] flex flex-col gap-8 text-white">
                                    <div className="flex flex-col gap-4">
                                        <motion.h1
                                            custom={0}
                                            variants={textVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="whitespace-pre-line font-sans font-bold text-4xl sm:text-5xl md:text-[62px] leading-[1.1] md:leading-[85px]"
                                        >
                                            {slides[currentIndex].title.replace(/\\n/g, '\n')}
                                        </motion.h1>

                                        <motion.div
                                            custom={1}
                                            variants={textVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="whitespace-pre-line font-sans font-normal text-sm sm:text-base md:text-lg tracking-wide opacity-90 max-w-[600px]"
                                        >
                                            <p>{slides[currentIndex].desc.replace(/\\n/g, '\n')}</p>
                                        </motion.div>
                                    </div>

                                    <motion.button
                                        custom={2}
                                        variants={textVariants}
                                        initial="hidden"
                                        animate="visible"
                                        onClick={() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="bg-[#5a80b9] hover:bg-[#4a6d9e] transition-colors cursor-pointer flex gap-4 items-center pl-6 pr-3 py-3 w-fit rounded-full group"
                                    >
                                        <span className="font-medium text-white text-base md:text-lg">
                                            {lang === 'id' ? 'Mulai Sekarang' : 'Get Started'}
                                        </span>
                                        <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors">
                                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                        </div>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Next Navigation Button */}
                <button
                    onClick={handleNext}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 md:p-4 rounded-full text-white border border-white/30 transition-all hover:scale-110 active:scale-95 group cursor-pointer shadow-lg hidden md:block"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Mobile Next Navigation Button (Bottom Right) */}
                <div className='flex md:hidden justify-end items-center'>
                    <button
                        onClick={handlePrevious}
                        className="absolute right-20 bottom-4 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white border border-white/30 transition-all active:scale-95 group cursor-pointer shadow-lg md:hidden"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 bottom-4 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white border border-white/30 transition-all active:scale-95 group cursor-pointer shadow-lg md:hidden"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
