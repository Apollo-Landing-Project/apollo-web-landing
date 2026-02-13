import React from "react";
import NewsHero from "@/components/NewsHero";
import NewsCategorySection from "@/components/NewsCategorySection";
import AboutHeader from "@/components/AboutHeader";
import { Metadata } from "next";

// Mock function to simulate fetching metadata from Backend
async function getMetadataFromBE(slug: string, lang: string) {
    // Simulate DB fetch
    await new Promise((resolve) => setTimeout(resolve, 50));

    if (lang === "id") {
        return {
            title: "Berita & CSR",
            description: "Tetap terinformasi bersama Apollo Global Interactive. Baca berita perusahaan terbaru, pembaruan keuangan, dan inisiatif Tanggung Jawab Sosial Perusahaan (CSR) yang membawa perubahan positif.",
        };
    }

    return {
        title: "News & CSR",
        description: "Stay informed with Apollo Global Interactive. Read our latest corporate news, financial updates, and Corporate Social Responsibility (CSR) initiatives driving positive change.",
    };
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const data = await getMetadataFromBE("news-page", lang);

    return {
        title: data.title,
        description: data.description,
        alternates: {
            canonical: `https://apolloglobalinteractive.com/${lang}/news`,
            languages: {
                'id-ID': 'https://apolloglobalinteractive.com/id/news',
                'en-US': 'https://apolloglobalinteractive.com/en/news',
            },
        },
        openGraph: {
            title: `${data.title} - Apollo`,
            description: data.description,
            url: `https://apolloglobalinteractive.com/${lang}/news`,
            siteName: "Apollo",
            images: [
                {
                    url: "https://apolloglobalinteractive.com/og-news.jpg",
                    width: 1200,
                    height: 630,
                },
            ],
            locale: lang === 'id' ? 'id_ID' : 'en_US',
            type: "website",
        },
    };
}

const companyNewsItems = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop",
        date: "October 23, 2025",
        title: "Summary of Minutes of EGMS 2026",
        description: "We've been enhancing production to support growing demand product.",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670&auto=format&fit=crop",
        date: "October 23, 2025",
        title: "Summary of Minutes of EGMS 2026",
        description: "We've been enhancing production to support growing demand product.",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop",
        date: "October 23, 2025",
        title: "Summary of Minutes of EGMS 2026",
        description: "We've been enhancing production to support growing demand product.",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1720236177685-b62ffa6377aa?q=80&w=2117&auto=format&fit=crop",
        date: "October 23, 2025",
        title: "Summary of Minutes of EGMS 2026",
        description: "We've been enhancing production to support growing demand product.",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
        date: "September 15, 2025",
        title: "Q3 Financial Results Announcement",
        description: "Apollo Global Interactive reports strong growth in the third quarter of 2025.",
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2670&auto=format&fit=crop",
        date: "August 20, 2025",
        title: "Partnership with Green Energy Corp",
        description: "Strategic alliance to boost our sustainable energy initiatives and reduce carbon footprint.",
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop",
        date: "July 10, 2025",
        title: "Expansion into Southeast Asian Market",
        description: "Opening of new regional headquarters in Singapore to serve the growing ASEAN market.",
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2670&auto=format&fit=crop",
        date: "June 05, 2025",
        title: "New Product Line Launch Event",
        description: "Unveiling our latest innovative solutions for the automotive industry at the Global Tech Summit.",
    },
];

const csrItems = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop",
        date: "October 23, 2025",
        title: "Santunan Ramadhan Tahunan di Pesantren Mua ...",
        description: "We've been enhancing production to support growing demand product.",
        badge: "CSR",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=2070&auto=format&fit=crop",
        date: "October 23, 2025",
        title: "Sosialisasi Kendaraan Otomotif Tahun 2025",
        description: "We've been enhancing production to support growing demand product.",
        badge: "CSR",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
        date: "October 23, 2025",
        title: "Acara Jumat Berkah Bersama Kel. Cempaka",
        description: "We've been enhancing production to support growing demand product.",
        badge: "CSR",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop",
        date: "October 23, 2025",
        title: "Acara Jumat Berkah Bersama Kel. Cempaka",
        description: "We've been enhancing production to support growing demand product.",
        badge: "CSR",
    },
];

export default function NewsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="w-full">
                <AboutHeader
                    title="Stay Up To Date With Our Company News."
                    subtitle="Explore the latest updates, announcements, and stories from Apollo Global Interactive."
                    backgroundImage="https://plus.unsplash.com/premium_photo-1725075086642-584ef254b39c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    targetId="news"
                    badge="News"
                />
            </div>

            {/* Company News Section */}
            <NewsCategorySection
                id="news"
                badge="News"
                title="Company News & Information"
                description="Stay informed with the latest company news, official announcements, and key developments that reflect our progress and business activities."
                items={companyNewsItems}
                basePath="/news"
            />

            {/* CSR Section */}
            <NewsCategorySection
                id="csr"
                badge="CSR"
                title="Corporate Social Responsibility"
                description="Apollo Global Interactive is committed to corporate social responsibility by contributing to social development, environmental sustainability, and community well-being."
                items={csrItems}
                basePath="/csr"
            />
        </main>
    );
}
