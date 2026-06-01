'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const InvestorHero = ({
    badge = "Investor Relations",
    title = "Transparent Growth & Sustainable Value.",
    desc = "We are committed to delivering long-term value to our shareholders through transparent governance and sustainable business practices.",
    background
}: {
    badge?: string;
    title?: string;
    desc?: string;
    background?: string;
}) => {
    const defaultBg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop";
    const finalBg = (background && background.trim() !== "") ? background : defaultBg;

    return (
        <section className="relative w-full h-[500px] md:h-[600px] mt-24 md:mt-0">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={finalBg}
                    alt="Investor Relations"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#0f172a]/90 to-[#0f172a]/40" />
            </div>

            <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-10 h-full flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl text-white"
                >
                    <div className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-white mb-6 border border-white/20">
                        {badge}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
                        {desc}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default InvestorHero;
