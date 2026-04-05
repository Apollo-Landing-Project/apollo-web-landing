import React from "react";
import AboutHeader from "@/components/AboutHeader";
import ServiceCarousel from "@/components/ServiceCarousel";
import ServiceList from "@/components/ServiceList";
import { Metadata } from "next";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";
import { fallbackServiceData, ServiceApiResponse } from "@/lib/fallback-service-data";

// Type definitions matching the API response
interface ServiceItem {
    badge: string;
    id: string;
    image: string;
    order: number;
    title: string;
    desc: string;
    location: string;
    contact: string[];
    email: string[];
    quote: string;
}

interface UsedCarItem {
    id: string;
    image: string;
    title: string;
    desc: string;
}

interface ServicePageData {
    id: string;
    hero: {
        badge: string;
        title: string;
        desc: string;
        background: string;
    };
    services: ServiceItem[];
    usedCarGallery: {
        badge: string;
        title: string;
        desc: string;
        items: UsedCarItem[];
    };
}

interface ApiResponse {
    status: string;
    message: string;
    data: ServicePageData;
    metadata: {
        title: string;
        description: string;
        og_image: string;
    };
}

// Adaptor Mapper Fallback
function getServiceFallbackData(): ApiResponse {
    // Cast because the structures are identical after the move
    return fallbackServiceData as unknown as ApiResponse;
}

// Helper to fetch data safely using centralized fallback logic
async function fetchServiceData(lang: string): Promise<{ response: ApiResponse; isFallback: boolean }> {
    const token = process.env.API_TOKEN;
    try {
        const res = await dbFetch<ApiResponse>(`client/service?lang=${lang}`, {
            headers: {
                'Cookie': `token=${token || ''}`
            },
            next: { tags: ['services', 'home'], revalidate: false }
        });

        if (!res || !res.data) {
            throw new Error("Invalid structure received");
        }
        return { response: res, isFallback: false };
    } catch (error) {
        console.error(`[SSR] Services fetch failed for '${lang}', using static fallback.`);
        return { response: getServiceFallbackData(), isFallback: true };
    }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    // Fetch data for metadata
    const { response } = await fetchServiceData(lang);
    const meta = response.metadata || { title: "", description: "", og_image: "" };

    // Use metadata from API
    const title = meta.title || (lang === "id" ? "Layanan Kami" : "Our Services");
    const description = meta.description || "";
    const ogImage = meta.og_image || `${SITE_URL}/og-services.jpg`;

    return {
        title: title,
        description: description,
        alternates: {
            canonical: `${SITE_URL}/${lang}/services`,
            languages: {
                'id-ID': `${SITE_URL}/id/services`,
                'en-US': `${SITE_URL}/en/services`,
            },
        },
        openGraph: {
            title: `${title} - Apollo`,
            description: description,
            url: `${SITE_URL}/${lang}/services`,
            siteName: "Apollo",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                },
            ],
            locale: lang === 'id' ? 'id_ID' : 'en_US',
            type: "website",
        },
    };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: pathLang } = await params;

    // Fetch data server-side via Safe Fallback Layer
    const { response, isFallback } = await fetchServiceData(pathLang);
    const data = response.data;
    
    // Override logic: Jika fallback -> ID
    const activeLang = isFallback ? "id" : pathLang;

    return (
        <main className="flex flex-col items-center">
            {/* Header */}
            <div className="w-full">
                <AboutHeader
                    title={data.hero.title}
                    subtitle={data.hero.desc}
                    backgroundImage={data.hero.background}
                    targetId="services-content"
                    badge={data.hero.badge}
                />
            </div>

            {/* Service Sections List */}
            <ServiceList services={data.services} lang={activeLang} />

            {/* Used Cars Carousel */}
            <div className="w-full">
                <ServiceCarousel
                    badge={activeLang === 'id' ? "Mobil Baru Tersedia" : "Available New Cars"}
                    title={activeLang === 'id' ? "Koleksi Mobil Baru Kami" : "Our New Car Collection"}
                    description={activeLang === 'id'
                        ? "Temukan pilihan mobil baru yang tersedia dengan informasi lengkap untuk mendukung keputusan pembelian Anda."
                        : "Discover a selection of available new cars with transparent information to support your purchasing decisions."}
                    items={data.usedCarGallery.items}
                />
            </div>
        </main>
    );
}
