import React from 'react';
import type { Metadata } from 'next';
import InvestorHero from '@/components/InvestorRelation/InvestorHero';
import StockChart from '@/components/InvestorRelation/StockChart';
import StakeholderCharts from '@/components/InvestorRelation/StakeholderCharts';
import ReportSection from '@/components/InvestorRelation/ReportSection';
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";

// Type definitions matching the API response
interface ReportItem {
    id: string;
    title: string;
    description: string;
    file_url: string;
    published_at: string;
    category: string;
    news_id?: string;
}

interface ShareItem {
    id: string;
    category: "MAJORITY" | "PUBLIC" | string;
    value: string;
}

interface InvestorPageData {
    id: string;
    hero: {
        badge: string;
        title: string;
        desc: string;
        background: string;
    };
    stakeholders: {
        badge: string;
        title: string;
        desc: string;
        shares: ShareItem[];
    };
    report: {
        badge: string;
        title: string;
        desc: string;
        reportItems: ReportItem[];
    };
    metadata: {
        title: string;
        description: string;
        og_image: string;
    };
}

// Helper to generate default data structure
function getDefaultInvestorData(lang: string): InvestorPageData {
    const isId = lang === "id";
    return {
        id: "2730dff8-b736-41c2-bb17-ffb0fd62c628",
        hero: {
            badge: isId ? "Hubungan Investor" : "Investor Relations",
            title: isId
                ? "Kami Konsisten Meningkatkan Nilai bagi Para Pemangku Kepentingan"
                : "We’re Consistent For Driving Value For Our Stakeholders",
            desc: isId
                ? "Kami berkomitmen untuk menjunjung tinggi tata kelola perusahaan yang kuat, kinerja yang transparan, dan bisnis yang berkelanjutan untuk secara konsisten meningkatkan nilai jangka panjang bagi semua pemangku kepentingan."
                : "We are committed to upholding strong corporate governance, transparent performance, and sustainable business to consistently enhance long-term value for all stakeholders.",
            background: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-004422355-amts.jpg"
        },
        stakeholders: {
            badge: isId ? "Pemegang Saham Kami" : "Our Shareholders",
            title: isId ? "Pemegang Saham" : "Shareholders",
            desc: isId
                ? "Struktur kepemilikan saham kami yang transparan mencerminkan komitmen kami terhadap kepemilikan yang seimbang dan partisipasi publik."
                : "Our transparent shareholding structure reflects our commitment to balanced ownership and public participation.",
            shares: [
                {
                    id: "mock-1",
                    category: "MAJORITY",
                    value: "1445000000"
                },
                {
                    id: "mock-2",
                    category: "PUBLIC",
                    value: "2358053525"
                }
            ]
        },
        report: {
            badge: isId ? "Laporan Kami" : "Our Reports",
            title: isId ? "Laporan Umum" : "General Reports",
            desc: isId
                ? "Akses laporan keuangan dan laporan operasional kami."
                : "Access our financial statements and operational reports.",
            reportItems: [
                {
                    id: "4a53dd29-476c-4429-bc83-4012815e8d10",
                    title: isId ? "Ringkasan Risalah RUPSLB 2026" : "Summar of RUPSLB 2026",
                    description: "",
                    file_url: "https://api.apolloglobalinteractive.com/storage/files/document-20260214-005516636-612r.pdf",
                    published_at: "2026-01-20T17:00:00.000Z",
                    category: "RUPS",
                    news_id: "example-slug"
                },
                {
                    id: "ef42357f-756e-40c2-88cf-db88176189e1",
                    title: isId ? "Undangan RUPS Boga 2025" : "Invitation of RUPS Boga 2025",
                    description: isId ? "Undangan" : "Invite",
                    file_url: "https://api.apolloglobalinteractive.com/storage/files/document-20260214-013746699-ht9f.pdf",
                    published_at: "2025-06-24T17:00:00.000Z",
                    category: isId ? "Laporan Keuangan" : "Financial Report"
                }
            ]
        },
        metadata: {
            title: isId ? "Hubungan Investor" : "Investor Relations",
            description: isId
                ? "Hubungan Investor: Akses data saham real-time, laporan keuangan, dan wawasan strategis. Bergabunglah dalam perjalanan pertumbuhan berkelanjutan dan kepemimpinan pasar kami."
                : "Investor Relations: Access real-time stock data, financial reports, and strategic insights. Join us in our journey of sustainable growth and market leadership.",
            og_image: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-004422355-amts.jpg"
        }
    };
}

// Helper to fetch data
async function getInvestorData(lang: string): Promise<{ data: InvestorPageData }> {
    const token = process.env.API_TOKEN;
    try {
        const res = await dbFetch(`client/investor?lang=${lang}`, {
            headers: {
                'Cookie': `token=${token}`
            },
            next: { tags: ['investor_relation'], revalidate: false }
        });

        if (res && res.data) {
            return res as { data: InvestorPageData };
        }
        throw new Error("Invalid data structure received");
    } catch (error) {
        console.error("Error fetching investor data:", error);
        throw error;
        // return { data: getDefaultInvestorData(lang) };
    }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    const investorData = await getInvestorData(lang);
    const data = investorData.data;
    const meta = data.metadata || {
        title: lang === "id" ? "Hubungan Investor" : "Investor Relations",
        description: "",
        og_image: ""
    };

    return {
        title: meta.title,
        description: meta.description,
        alternates: {
            canonical: `${SITE_URL}/${lang}/investor-relation`,
            languages: {
                'id-ID': `${SITE_URL}/id/investor-relation`,
                'en-US': `${SITE_URL}/en/investor-relation`,
            },
        },
        openGraph: {
            title: `${meta.title} - Apollo`,
            description: meta.description,
            url: `${SITE_URL}/${lang}/investor-relation`,
            siteName: "Apollo",
            images: [
                {
                    url: meta.og_image,
                    width: 1200,
                    height: 630,
                },
            ],
            locale: lang === 'id' ? 'id_ID' : 'en_US',
            type: "website",
        },
    };
}

export default async function InvestorRelationPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const investorData = await getInvestorData(lang);
    const data = investorData.data;

    return (
        <main className="flex flex-col w-full">
            <InvestorHero
                badge={data.hero.badge}
                title={data.hero.title}
                desc={data.hero.desc}
                background={data.hero.background}
            />
            <StakeholderCharts
                badge={data.stakeholders.badge}
                title={data.stakeholders.title}
                desc={data.stakeholders.desc}
                shares={data.stakeholders.shares}
                lang={lang}
            />
            <StockChart />
            <ReportSection
                badge={data.report.badge}
                title={data.report.title}
                desc={data.report.desc}
                reportItems={data.report.reportItems}
                lang={lang}
            />
        </main>
    );
}
