import React from "react";
import AboutHeader from "@/components/AboutHeader";
import ServiceCarousel from "@/components/ServiceCarousel";
import ServiceList from "@/components/ServiceList";
import { Metadata } from "next";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";

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

// Helper to fetch data
async function getServiceData(lang: string): Promise<ApiResponse> {
    const token = process.env.API_TOKEN;
    try {
        const res = await dbFetch(`client/service?lang=${lang}`, {
            headers: {
                'Cookie': `token=${token}`
            },
            next: { tags: ['services', 'home'], revalidate: false }
        });

        if (res && res.data) {
            return res as ApiResponse;
        }
        throw new Error("Invalid data structure received");
    } catch (error) {
        console.error("Error fetching service data:", error);
        throw error;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    // Fetch data for metadata
    const serviceData = await getServiceData(lang);
    const data = serviceData.data;

    // Use metadata from API
    const title = serviceData.metadata?.title || (lang === "id" ? "Layanan Kami" : "Our Services");
    const description = serviceData.metadata?.description || "";
    const ogImage = serviceData.metadata?.og_image || `${SITE_URL}/og-services.jpg`;

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
    const { lang } = await params;

    // Fetch data server-side
    const serviceData = await getServiceData(lang);
    const data = serviceData.data;

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
            <ServiceList services={data.services} lang={lang} />

            {/* Used Cars Carousel */}
            <div className="w-full">
                <ServiceCarousel
                    badge={data.usedCarGallery.badge}
                    title={data.usedCarGallery.title}
                    description={data.usedCarGallery.desc}
                    items={data.usedCarGallery.items}
                />
            </div>
        </main>
    );
}
