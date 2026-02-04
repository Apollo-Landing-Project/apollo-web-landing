import Image from "next/image";
import React from "react";

interface AboutSectionProps {
    tag?: string;
    title: string;
    children: React.ReactNode;
    imageSrc: string;
    imageAlt: string;
    isReversed?: boolean;
    overlayImageSrc?: string;
    additionalContent?: React.ReactNode;
    mobileImagePriorToDescription?: boolean;
}

export default function AboutSection({
    tag,
    title,
    children,
    imageSrc,
    imageAlt,
    isReversed = false,
    overlayImageSrc,
    additionalContent,
    mobileImagePriorToDescription = false,
}: AboutSectionProps) {
    return (
        <section className="w-full mb-[100px]">
            <div className={`flex flex-col gap-6 lg:gap-10 ${overlayImageSrc ? "lg:items-center" : ""} ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} ${overlayImageSrc ? (isReversed ? "lg:gap-20 xl:gap-32" : "lg:gap-20 xl:gap-28") : "lg:gap-[60px]"}`}>

                {/* Main Image (Desktop Only) - Hidden on Mobile */}
                <div className={`hidden lg:block w-full lg:flex-[2] px-4 lg:px-0 flex justify-center lg:block ${overlayImageSrc ? (isReversed ? "lg:pl-16" : "lg:pr-16") : ""}`}>
                    <div className={`relative ${overlayImageSrc ? `w-full max-w-[450px] aspect-square ${isReversed ? "lg:ml-auto" : "lg:mx-0"}` : "w-full h-full min-h-[400px]"} `}>
                        {/* Main Image */}
                        <div className="relative w-full h-full overflow-hidden rounded-[32px] shadow-lg z-10">
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>

                        {/* Overlay Image */}
                        {overlayImageSrc && (
                            <div
                                className={`absolute top-1/2 -translate-y-1/2 w-[55%] aspect-square rounded-[24px] md:rounded-[32px] border-[6px] md:border-[8px] border-white shadow-xl overflow-hidden z-20 hidden lg:block ${isReversed
                                    ? "left-0 -translate-x-1/2"
                                    : "right-0 translate-x-1/2"
                                    }`}
                            >
                                <Image
                                    src={overlayImageSrc}
                                    alt="Overlay Detail"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex w-full lg:flex-[3] flex-col items-center lg:items-start relative z-30">

                    {/* Mobile Tag (Order: 1, Visible < lg) */}
                    {tag && (
                        <span className="inline-flex lg:hidden w-fit self-center items-center justify-center rounded-full border border-[#5a80b9]/15 bg-[#f2f7ff] px-4 py-1.5 text-base font-normal text-[#5a80b9] mb-3">
                            {tag}
                        </span>
                    )}

                    {/* Desktop Tag (Hidden < lg) */}
                    {tag && (
                        <span className="hidden lg:inline-flex mb-3 items-center justify-center rounded-full border border-[#5a80b9]/15 bg-[#f2f7ff] px-4 py-1.5 text-base font-normal text-[#5a80b9]">
                            {tag}
                        </span>
                    )}

                    {/* Title (Order: 2) */}
                    <h2 className="mb-4 text-3xl font-bold leading-tight text-[#323441] md:text-4xl text-center lg:text-left">
                        {title}
                    </h2>

                    {/* Mobile Image (Order: Optional 3 - Before Description) */}
                    {mobileImagePriorToDescription && (
                        <div className="w-full flex justify-center lg:hidden my-6">
                            <div className="relative w-full aspect-video md:aspect-[21/9] h-full overflow-hidden rounded-[24px] shadow-lg z-10">
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Text Description (Order: 3 or 4) */}
                    <div className="text-justify flex flex-col  text-base leading-relaxed text-gray-600 md:text-lg">
                        {children}
                    </div>

                    {/* Mobile Image (Order: 4 - After Description, Default) */}
                    {!mobileImagePriorToDescription && (
                        <div className="w-full flex justify-center lg:hidden my-6">
                            <div className="relative w-full aspect-video md:aspect-[21/9] h-full overflow-hidden rounded-[24px] shadow-lg z-10">
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Additional Content / List (Order: 5) */}
                    {additionalContent && (
                        <div className="flex flex-col  text-base leading-relaxed text-gray-600 md:text-lg text-justify w-full">
                            {additionalContent}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
