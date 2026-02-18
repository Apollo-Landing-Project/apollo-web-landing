
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";
import CSRCarousel from "@/components/CSRCarousel";
import CSRGallery from "@/components/CSRGallery";
import { notFound } from "next/navigation";

// --- Types ---
interface CsrImage {
    image: string;
    description: string | null;
}

interface CsrDetailData {
    id: string;
    title: string;
    description: string;
    content: string; // HTML content
    image: CsrImage[];
    author: string;
    authorImage: string;
    publishedAt: string;
}

interface CsrDetailMetadata {
    title: string;
    description: string;
    og_image: string;
}

interface ApiResponse {
    status: string;
    message: string;
    data: CsrDetailData;
    metadata: CsrDetailMetadata;
}

// --- Helper Functions ---
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
        console.error("Date formatting error:", e);
        return dateString;
    }
}

// --- Data Fetching ---
async function getCsrDetail(id: string, lang: string) {
    const token = process.env.API_TOKEN;

    try {
        // Using the endpoint matching other client endpoints
        const response: ApiResponse = await dbFetch(`client/news/csr/${id}?lang=${lang}`, {
            headers: {
                'Cookie': `token=${token}`
            },
            next: { tags: ['csr', id], revalidate: 3600 } // fallback revalidate
        });

        if (response?.status === "success" && response?.data) {
            return {
                data: response.data,
                metadata: response.metadata
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching CSR detail:", error);
        return null;
    }
}

// --- Metadata ---
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    // Note: The file uses [slug] but the API expects an ID. We treat slug as ID here.
    const result = await getCsrDetail(slug, lang);
    const data = result?.data;
    const metadata = result?.metadata;

    if (!data || !metadata) {
        return {
            title: "CSR Detail",
        };
    }

    return {
        title: metadata.title,
        description: metadata.description,
        alternates: {
            canonical: `${SITE_URL}/${lang}/csr/${slug}`,
            languages: {
                'id-ID': `${SITE_URL}/id/csr/${slug}`,
                'en-US': `${SITE_URL}/en/csr/${slug}`,
            },
        },
        openGraph: {
            title: `${metadata.title} - Apollo`,
            description: metadata.description,
            url: `${SITE_URL}/${lang}/csr/${slug}`,
            siteName: "Apollo",
            images: [
                {
                    url: metadata.og_image || (data.image && data.image.length > 0 ? data.image[0].image : ""),
                    width: 1200,
                    height: 630,
                },
            ],
            locale: lang === 'id' ? 'id_ID' : 'en_US',
            type: "article",
        },
    };
}

// --- Page Component ---
export default async function CSRDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    // Note: The file uses [slug] but the API expects an ID. We treat slug as ID here.
    const result = await getCsrDetail(slug, lang);

    if (!result || !result.data) {
        notFound();
    }

    const { data } = result;
    const isId = lang === 'id';

    // Extract images for carousel/gallery
    const images = data.image.map(img => img.image);

    return (
        <main className="w-full bg-white px-4 py-8 text-[#323441] md:px-10">
            <div className="mx-auto max-w-[1440px]">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        href={`/${lang}/news`}
                        className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#d1d1d6] px-4 py-3 text-sm font-semibold text-[#323441] transition-colors hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        {isId ? "Kembali ke Berita" : "Back To News"}
                    </Link>
                </div>

                {/* Header: Carousel */}
                <div className="mb-12">
                    <CSRCarousel images={images} />
                </div>

                {/* Header Content & Metadata */}
                <div className="mb-12">
                    {/* Title */}
                    <h1 className="mb-6 max-w-[1000px] text-3xl font-bold leading-tight text-[#323441] md:text-[54px] md:leading-[1.2]">
                        {data.title}
                    </h1>

                    {/* Metadata */}
                    <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                            {data.authorImage ? (
                                <Image
                                    src={data.authorImage}
                                    alt={data.author}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-gray-300" />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-bold text-[#323441]">{data.author}</span>
                            <span className="text-sm text-[#767676]">
                                {isId ? "Diterbitkan pada " : "Published on "}
                                {formatDate(data.publishedAt, lang)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <article
                    className="prose prose-lg max-w-none text-[#767676] mb-16 prose-headings:font-bold prose-headings:text-[#323441] prose-a:text-[#5a80b9]"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />

                {/* Gallery Section - Only show if there's more than 1 image to justify a gallery, or just always show if the design calls for it. 
                    Given the structure, let's always include it if images exist. 
                */}
                {images.length > 0 && (
                    <CSRGallery images={images} />
                )}
            </div>
        </main>
    );
}
