"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CSRCarousel from "@/components/CSRCarousel";
import CSRGallery from "@/components/CSRGallery";

export default function CSRDetailPage({ params }: { params: { slug: string } }) {
    // Layout based on News Detail but with specific modifications for CSR

    return (
        <main className="w-full bg-white px-4 py-8 text-[#323441] md:px-10">
            {/* Back Button */}
            <div className="mb-8">
                <Link
                    href="/news"
                    className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#d1d1d6] px-4 py-3 text-sm font-semibold text-[#323441] transition-colors hover:bg-gray-50"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back To Home
                </Link>
            </div>

            {/* Header: Carousel/Slider (Modified from News Detail) */}
            <div className="mb-12">
                <CSRCarousel />
            </div>

            {/* Header Content & Metadata */}
            <div className="mb-12">
                {/* Title */}
                <h1 className="mb-6 max-w-[1000px] text-3xl font-bold leading-tight text-[#323441] md:text-[54px] md:leading-[1.2]">
                    Santunan Ramadhan Tahunan di Pesantren Mua'allamin Mua'allamat
                </h1>

                {/* Metadata */}
                <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                        {/* Placeholder for Author Avatar */}
                        <Image
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                            alt="Author"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-bold text-[#323441]">Author Name</span>
                        <span className="text-sm text-[#767676]">Published on October 25, 2025</span>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none text-[#767676] mb-16">
                <p className="mb-6 leading-loose">
                    In the spirit of the holy month of Ramadan, Apollo Global Interactive held its annual charity event, "Santunan Ramadhan," at Pesantren Mua'allamin Mua'allamat. This initiative is part of our ongoing commitment to corporate social responsibility and community engagement. The event was attended by our Board of Directors and employee volunteers who participated in distributing food packages and financial aid to 150 students and operational staff of the Islamic boarding school.
                </p>

                <p className="mb-6 leading-loose">
                    "Ramadan is a time for reflection and giving back," said our HR Director. "We are grateful for the opportunity to share our blessings with the students and caregivers here. We hope this contribution brings joy and eases their daily needs during this blessed month." The packages included essential food items such as rice, oil, sugar, and other staples, along with educational supplies for the students.
                </p>

                <h3 className="text-2xl font-bold text-[#323441] mb-4 mt-8">Impact & Future Commitments</h3>
                <p className="mb-6 leading-loose">
                    Beyond the material aid, the event served specifically to strengthen the bond between our company and the local community. We believe that sustainable business growth goes hand in hand with the well-being of the society we operate in. We were deeply moved by the warm welcome and the spirited performances prepared by the students.
                </p>

                <p className="leading-loose">
                    Apollo Global Interactive remains dedicated to expanding its CSR footprint. Future programs will focus on educational scholarships and vocational training workshops to empower the youth in the surrounding areas, ensuring they have the skills needed for the future job market.
                </p>
            </article>

            {/* Gallery Section */}
            <CSRGallery />

        </main>
    );
}
