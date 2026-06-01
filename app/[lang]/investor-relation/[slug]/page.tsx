import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Metadata } from "next";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";
import { buildReportDownloadUrl } from "@/lib/report-download";

// --- Data & Types ---

interface NewsDetailApi {
    id: string;
    title: string;
    description: string;
    image: string;
    author: string;
    authorImage: string;
    publishedAt: string;
    content: string; // HTML or Markdown content
    relatedNews?: any[];
    attachment?: string; // URL to related document/report
    report_id?: string;
    download_url?: string;
    metadata?: {
        title: string;
        description: string;
        og_image: string;
    };
}

interface ApiResponse {
    status: string;
    message: string;
    data: any;
    metadata?: {
        title: string;
        description: string;
        og_image: string;
    };
}

// Helper to format date
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

// Fetching function for News Detail
async function getNewsDetail(slug: string, lang: string) {
    try {
        const res: ApiResponse = await dbFetch(`client/news/article/${slug}?lang=${lang}`, {
            next: { tags: ['investor_relation_post', slug], revalidate: 60 }
        });

        if (res?.status === "success" && res?.data) {
            return {
                ...res.data,
                metadata: res.metadata
            } as NewsDetailApi;
        }
        throw new Error("News article not found or invalid data");
    } catch (error) {
        console.error("Error fetching news detail:", error);
        throw error;
    }
}

// --- Metadata ---

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;

    try {
        const data = await getNewsDetail(slug, lang);

        const title = data.metadata?.title || data.title || "Investor Relation - Apollo";
        const description = data.metadata?.description || data.description || "Investor relation detail page";
        const ogImage = data.metadata?.og_image || data.image || `${SITE_URL}/og-investor.jpg`;

        return {
            title: title,
            description: description,
            alternates: {
                canonical: `${SITE_URL}/${lang}/investor-relation/${slug}`,
                languages: {
                    'id-ID': `${SITE_URL}/id/investor-relation/${slug}`,
                    'en-US': `${SITE_URL}/en/investor-relation/${slug}`,
                },
            },
            openGraph: {
                title: `${title} - Apollo`,
                description: description,
                url: `${SITE_URL}/${lang}/investor-relation/${slug}`,
                siteName: "Apollo",
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                    },
                ],
                locale: lang === 'id' ? 'id_ID' : 'en_US',
                type: "article",
            },
        };
    } catch (e) {
        console.error("Metadata error:", e);
        // Fallback metadata if fetch fails
        return {
            title: "Investor Relation - Apollo",
            description: "Information about Apollo Global Interactive investor relations.",
        };
    }
}

// --- Component ---

export default async function InvestorRelationDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;

    let data: NewsDetailApi;
    let attachmentUrl = null;

    try {
        data = await getNewsDetail(slug, lang);
        attachmentUrl =
            data.download_url ||
            (data as any).file_url ||
            data.attachment ||
            (data.report_id ? buildReportDownloadUrl(data.report_id) : null);
    } catch (error) {
        // Handle error state gracefully or let standard error.tsx catch it
        throw error;
    }

    // Default author image if missing
    const authorImage = data.authorImage || "https://ui-avatars.com/api/?name=" + (data.author || "Admin");

    return (
        <main className="w-full bg-white px-4 py-8 text-[#323441] md:px-10">
            {/* Back Button */}
            <div className="mb-8">
                <Link
                    href={`/${lang}/investor-relation`}
                    className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#d1d1d6] px-4 py-3 text-sm font-semibold text-[#323441] transition-colors hover:bg-gray-50"
                >
                    <ArrowLeft className="h-5 w-5" />
                    {lang === 'id' ? "Kembali ke Hubungan Investor" : "Back To Investor Relations"}
                </Link>
            </div>

            {/* Header Content */}
            <div className="mb-12">
                <h1 className="mb-6 max-w-[1000px] text-3xl font-bold leading-tight text-[#323441] md:text-[54px] md:leading-[1.2]">
                    {data.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                            <Image
                                src={authorImage}
                                alt={data.author || "Author"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-bold text-[#323441]">{data.author || "Admin"}</span>
                            <span className="text-sm text-[#767676]">{lang === 'id' ? 'Diterbitkan pada' : 'Published on'} {formatDate(data.publishedAt, lang)}</span>
                        </div>
                    </div>

                    {/* Download Button (If attachment exists) */}
                    {attachmentUrl && (
                        <a
                            href={attachmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 rounded-xl bg-[#F0F5FA] px-6 py-3 text-sm font-semibold text-[#5A80B9] transition-colors hover:bg-[#5A80B9] hover:text-white group"
                        >
                            <Download className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                            {lang === 'id' ? "Unduh Dokumen Terkait" : "Download Related Document"}
                        </a>
                    )}
                </div>
            </div>

            {/* Cover Image */}
            <div className="relative mb-12 h-[300px] w-full overflow-hidden rounded-[32px] md:h-[600px]">
                <Image
                    src={data.image}
                    alt={data.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Article Content */}
            <article
                className="prose prose-lg max-w-none text-[#767676] mb-16 prose-headings:text-[#323441] prose-a:text-[#5a80b9]"
                dangerouslySetInnerHTML={{ __html: data.content || data.description }} // Fallback to description if content is missing
            />
        </main>
    );
}
