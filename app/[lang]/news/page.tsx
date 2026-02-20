import React from "react";
import NewsCategorySection from "@/components/NewsCategorySection";
import AboutHeader from "@/components/AboutHeader";
import { Metadata } from "next";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";
import { parseISO, isWithinInterval, startOfDay, endOfDay, isValid } from "date-fns";

// --- Types ---

interface NewsItemApi {
    id: string;
    title: string;
    description: string;
    image: string;
    author: string;
    authorImage: string;
    publishedAt: string;
}

interface CsrItemApi {
    id: string;
    title: string;
    description: string;
    author: string;
    authorImage: string;
    publishedAt: string;
    images?: Array<{ id: string; image: string; description: string | null }>;
}

interface NewsPageApiData {
    id: string;
    hero: {
        badge: string | null;
        title: string;
        desc: string;
        background: string;
    };
    newsSection: {
        badge: string | null;
        title: string;
        desc: string;
    };
    csrSection: {
        badge: string | null;
        title: string;
        desc: string;
    };
    news: NewsItemApi[];
    csr: CsrItemApi[];
    metadata: {
        title: string;
        description: string;
        og_image: string;
    };
}

interface ApiResponse {
    status: string;
    message: string;
    data: NewsPageApiData;
}

// --- Default Data (Fallback) ---

function getDefaultNewsData(lang: string) {
    const isId = lang === "id";
    return {
        meta_title: isId ? "Berita & CSR" : "News & CSR",
        meta_description: isId
            ? "Tetap terinformasi bersama Apollo Global Interactive. Baca berita perusahaan terbaru, pembaruan keuangan, dan inisiatif Tanggung Jawab Sosial Perusahaan (CSR) yang membawa perubahan positif."
            : "Stay informed with Apollo Global Interactive. Read our latest corporate news, financial updates, and Corporate Social Responsibility (CSR) initiatives driving positive change.",
        og_image: "/assets/home-og.webp",
        header: {
            title: isId ? "Ikuti Berita Terbaru Perusahaan Kami." : "Stay Up To Date With Our Company News.",
            subtitle: isId
                ? "Jelajahi pembaruan terbaru, pengumuman, dan cerita dari Apollo Global Interactive."
                : "Explore the latest updates, announcements, and stories from Apollo Global Interactive.",
            badge: isId ? "Berita" : "News",
            backgroundImage: "https://plus.unsplash.com/premium_photo-1725075086642-584ef254b39c?q=80&w=2940&auto=format&fit=crop"
        },
        companyNews: {
            id: "news",
            badge: isId ? "Berita" : "News",
            title: isId ? "Berita & Informasi Perusahaan" : "Company News & Information",
            description: isId
                ? "Tetap terinformasi dengan berita perusahaan terbaru, pengumuman resmi, dan perkembangan utama yang mencerminkan kemajuan dan aktivitas bisnis kami."
                : "Stay informed with the latest company news, official announcements, and key developments that reflect our progress and business activities.",
            basePath: "/news",
            items: [
                {
                    id: "1",
                    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop",
                    date: "October 23, 2025",
                    title: "Summary of Minutes of EGMS 2026",
                    description: "We've been enhancing production to support growing demand product.",
                },
                {
                    id: "2",
                    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670&auto=format&fit=crop",
                    date: "October 23, 2025",
                    title: "Summary of Minutes of EGMS 2026",
                    description: "We've been enhancing production to support growing demand product.",
                },
                {
                    id: "3",
                    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop",
                    date: "October 23, 2025",
                    title: "Summary of Minutes of EGMS 2026",
                    description: "We've been enhancing production to support growing demand product.",
                },
                {
                    id: "4",
                    image: "https://images.unsplash.com/photo-1720236177685-b62ffa6377aa?q=80&w=2117&auto=format&fit=crop",
                    date: "October 23, 2025",
                    title: "Summary of Minutes of EGMS 2026",
                    description: "We've been enhancing production to support growing demand product.",
                }
            ]
        },
        csr: {
            id: "csr",
            badge: "CSR",
            title: isId ? "Tanggung Jawab Sosial Perusahaan" : "Corporate Social Responsibility",
            description: isId
                ? "Apollo Global Interactive berkomitmen terhadap tanggung jawab sosial perusahaan dengan berkontribusi pada pembangunan sosial, keberlanjutan lingkungan, dan kesejahteraan masyarakat."
                : "Apollo Global Interactive is committed to corporate social responsibility by contributing to social development, environmental sustainability, and community well-being.",
            basePath: "/csr",
            items: [
                {
                    id: "1",
                    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop",
                    date: "October 23, 2025",
                    title: "Santunan Ramadhan Tahunan di Pesantren Mua ...",
                    description: "We've been enhancing production to support growing demand product.",
                    badge: "CSR",
                },
                {
                    id: "2",
                    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=2070&auto=format&fit=crop",
                    date: "October 23, 2025",
                    title: "Sosialisasi Kendaraan Otomotif Tahun 2025",
                    description: "We've been enhancing production to support growing demand product.",
                    badge: "CSR",
                }
            ]
        }
    };
}


// --- Data Fetching ---

function formatDate(dateString: string, lang: string): string {
    if (!dateString) return "";
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    } catch (e) {
        return dateString;
    }
}

async function getNewsData(lang: string) {
    const defaultData = getDefaultNewsData(lang);
    const token = process.env.API_TOKEN;

    try {
        const response: ApiResponse = await dbFetch(`client/news?lang=${lang}`, {
            headers: {
                'Cookie': `token=${token}`
            },
            next: { tags: ['news', 'home'], revalidate: false }
        });

        if (response?.status === "success" && response?.data) {
            const apiData = response.data;
            return {
                meta_title: apiData.metadata?.title || "",
                meta_description: apiData.metadata?.description || "",
                og_image: apiData.metadata?.og_image || "",
                header: {
                    title: apiData.hero?.title || "",
                    subtitle: apiData.hero?.desc || "",
                    badge: apiData.hero?.badge || "",
                    backgroundImage: apiData.hero?.background || ""
                },
                companyNews: {
                    id: "news",
                    badge: apiData.newsSection?.badge || "News",
                    title: apiData.newsSection?.title || "Latest News",
                    description: apiData.newsSection?.desc || "",
                    basePath: `/${lang}/news`,
                    items: apiData.news?.length > 0 ? apiData.news.map((item) => ({
                        id: item.id,
                        image: item.image,
                        date: formatDate(item.publishedAt, lang),
                        title: item.title,
                        description: item.description,
                        badge: apiData.newsSection?.badge || "News",
                        rawDate: item.publishedAt
                    })) : []
                },
                csr: {
                    id: "csr",
                    badge: apiData.csrSection?.badge || "CSR",
                    title: apiData.csrSection?.title || "Corporate Social Responsibility",
                    description: apiData.csrSection?.desc || "",
                    basePath: `/${lang}/csr`,
                    items: apiData.csr?.length > 0 ? apiData.csr.map((item) => ({
                        id: item.id,
                        image: item.images?.[0]?.image || "",
                        date: formatDate(item.publishedAt, lang),
                        title: item.title,
                        description: item.description,
                        badge: apiData.csrSection?.badge || "CSR",
                        rawDate: item.publishedAt
                    })) : []
                }
            };
        }
        throw new Error("Failed to fetch news data from API");
    } catch (error) {
        console.error("Error fetching news data:", error);
        throw error;
    }
}

// --- Filtering & Pagination Helper ---

function filterAndPaginate(
    items: any[],
    sectionKey: string,
    searchParams: any
) {
    const ITEMS_PER_PAGE = 8;

    // 1. Extract Params for this section
    const search = searchParams[`${sectionKey}_search`];
    const startDate = searchParams[`${sectionKey}_start`];
    const endDate = searchParams[`${sectionKey}_end`];
    const pageParam = searchParams[`${sectionKey}_page`];

    // Parse page
    let page = 1;
    if (pageParam && !Array.isArray(pageParam)) {
        const parsed = parseInt(pageParam);
        if (!isNaN(parsed) && parsed > 0) page = parsed;
    }

    const searchQuery = (typeof search === 'string' ? search : "").toLowerCase();

    // 2. Filter
    let filtered = items;

    // Filter by Search
    if (searchQuery) {
        filtered = filtered.filter(item => {
            const titleMatch = item.title?.toLowerCase().includes(searchQuery);
            const descMatch = item.description?.toLowerCase().includes(searchQuery);
            return titleMatch || descMatch;
        });
    }

    // Filter by Date
    if (startDate && typeof startDate === 'string') {
        const start = startOfDay(new Date(startDate));
        let end = endOfDay(new Date(startDate)); // Default to same day

        if (endDate && typeof endDate === 'string') {
            end = endOfDay(new Date(endDate));
        }

        if (isValid(start) && isValid(end)) {
            filtered = filtered.filter(item => {
                // Prefer rawDate (ISO string) if available, otherwise try to parse 'date'
                const dateToUse = item.rawDate || item.date;
                if (!dateToUse) return false;

                const itemDate = new Date(dateToUse);
                if (!isValid(itemDate)) return false;

                return isWithinInterval(itemDate, { start, end });
            });
        }
    }

    // 3. Paginate
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
    const currentPage = Math.min(Math.max(1, page), totalPages);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return {
        items: paginatedItems,
        currentPage,
        totalPages
    };
}


// --- Page & Metadata ---
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    const data = await getNewsData(lang);

    return {
        title: data.meta_title,
        description: data.meta_description,
        alternates: {
            canonical: `${SITE_URL}/${lang}/news`,
            languages: {
                'id-ID': `${SITE_URL}/id/news`,
                'en-US': `${SITE_URL}/en/news`,
            },
        },
        openGraph: {
            title: `${data.meta_title} - Apollo`,
            description: data.meta_description,
            url: `${SITE_URL}/${lang}/news`,
            siteName: "Apollo",
            images: [
                {
                    url: data.og_image || "/assets/home-og.webp",
                    width: 1200,
                    height: 630,
                },
            ],
            locale: lang === 'id' ? 'id_ID' : 'en_US',
            type: "website",
        },
    };
}

export default async function NewsPage(props: {
    params: Promise<{ lang: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { lang } = await props.params;
    const resolvedSearchParams = await props.searchParams;

    // Fetch Data (Server Side)
    // Note: getNewsData handles errors gracefully by returning fallback
    const data = await getNewsData(lang);
    console.log(data);
    // Process Data (Server Side Filtering & Pagination)
    // We pass the raw items to helper
    const newsData = filterAndPaginate(data.companyNews.items, "news", resolvedSearchParams);
    const csrData = filterAndPaginate(data.csr.items, "csr", resolvedSearchParams);

    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="w-full">
                <AboutHeader
                    title={data.header.title}
                    subtitle={data.header.subtitle}
                    backgroundImage={data.header.backgroundImage}
                    targetId={data.companyNews.id}
                    badge={data.header.badge}
                />
            </div>

            {/* Company News Section */}
            <NewsCategorySection
                id={data.companyNews.id}
                badge={data.companyNews.badge}
                title={data.companyNews.title}
                description={data.companyNews.description}
                items={newsData.items}
                basePath={data.companyNews.basePath}
                sectionKey="news"
                currentPage={newsData.currentPage}
                totalPages={newsData.totalPages}
            />

            {/* CSR Section */}
            <NewsCategorySection
                id={data.csr.id}
                badge={data.csr.badge}
                title={data.csr.title}
                description={data.csr.description}
                items={csrData.items}
                basePath={data.csr.basePath}
                sectionKey="csr"
                currentPage={csrData.currentPage}
                totalPages={csrData.totalPages}
            />
        </main>
    );
}
