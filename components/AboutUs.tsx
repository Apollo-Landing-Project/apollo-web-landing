"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type StatCard = {
    id: string;
    count: string;
    label: string;
    icon: string;
};


export default function AboutUs({ lang, data }: { lang: string, data: any }) {
    const [activeCard, setActiveCard] = useState<string>("experience");
    const isId = lang === "id";

    const labels = {
        pill: isId ? "Tentang Kami" : "About Us",
        learnMore: isId ? "Pelajari Lebih Lanjut" : "Learn More",
        stats: {
            exp: isId ? "Tahun Pengalaman" : "Years Experience",
            products: isId ? "Produk" : "Products",
            countries: isId ? "Negara" : "Countries",
            brands: isId ? "Merek Produk" : "Product Brands",
        }
    };

    const stats: StatCard[] = [
        {
            id: "experience",
            count: `${data.yearsExp}+`,
            label: labels.stats.exp,
            icon: "/assets/about/products.svg"
        },
        {
            id: "products",
            count: `${data.products}+`,
            label: labels.stats.products,
            icon: "/assets/about/products.svg",
        },
        {
            id: "countries",
            count: `${data.countries}+`,
            label: labels.stats.countries,
            icon: "/assets/about/countries.svg",
        },
        {
            id: "brands",
            count: `${data.brands}+`,
            label: labels.stats.brands,
            icon: "/assets/about/brands.svg",
        },
    ];

    return (
        <section id="about-us" className="w-full bg-white px-4 py-16 md:px-10 md:py-24 scroll-mt-32">
            <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-24">
                {/* Left Content */}
                <div className="flex flex-1 flex-col items-start gap-6">
                    <div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-3 py-1 text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15">
                        {labels.pill}
                    </div>

                    <h2 className="text-3xl font-bold leading-tight text-[#323441] md:text-4xl lg:text-[40px]">
                        {data.title}
                    </h2>

                    <div className="whitespace-pre-line flex flex-col gap-4 text-base leading-relaxed text-[#767676] md:text-lg text-justify">
                        <p>
                            {data.desc}
                        </p>

                    </div>

                    <Link href={`/${lang}/about`} className="mt-4 rounded-full bg-[#7a95c3] px-8 py-3 text-base font-medium text-white transition-colors hover:bg-[#5a80b9] cursor-pointer">
                        {labels.learnMore}
                    </Link>
                </div>

                {/* Right Content - Stats Grid */}
                <div className="grid w-full flex-1 grid-cols-1 gap-6 min-[400px]:grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 lg:max-w-xl">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            onMouseEnter={() => setActiveCard(stat.id)}
                            className={`group flex min-h-[180px] cursor-default flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${activeCard === stat.id
                                ? "bg-gradient-to-b from-[#5a80b9] to-[#3f639e] text-white shadow-lg"
                                : "bg-white text-[#323441] shadow-[0px_4px_24px_rgba(0,0,0,0.06)] hover:shadow-md"
                                }`}
                        >
                            <div
                                className={`mb-[10px] relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${activeCard === stat.id ? "bg-white/20" : "bg-[#f2f7ff]"
                                    }`}
                            >
                                <Image
                                    src={stat.icon}
                                    alt={stat.label}
                                    width={24}
                                    height={24}
                                    className={`transition-all duration-300 ${activeCard === stat.id ? "brightness-0 invert" : ""
                                        }`}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-4xl font-bold">{stat.count}</span>
                                <span
                                    className={`text-base font-normal ${activeCard === stat.id ? "text-white/90" : "text-[#767676]"
                                        }`}
                                >
                                    {stat.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
