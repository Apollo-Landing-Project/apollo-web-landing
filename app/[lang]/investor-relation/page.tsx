import React from 'react';
import type { Metadata } from 'next';
import InvestorHero from '@/components/InvestorRelation/InvestorHero';
import StockChart from '@/components/InvestorRelation/StockChart';
import StakeholderCharts from '@/components/InvestorRelation/StakeholderCharts';
import ReportSection from '@/components/InvestorRelation/ReportSection';
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";

// Helper to generate default data structure
function getDefaultInvestorData(lang: string) {
    const isId = lang === "id";
    return {
        meta_title: isId ? "Hubungan Investor" : "Investor Relations",
        meta_description: isId
            ? "Hubungan Investor: Akses data saham real-time, laporan keuangan, dan wawasan strategis. Bergabunglah dalam perjalanan pertumbuhan berkelanjutan dan kepemimpinan pasar kami."
            : "Investor Relations: Access real-time stock data, financial reports, and strategic insights. Join us in our journey of sustainable growth and market leadership.",
        og_image: "/og-investor-relation.jpg"
    };
}

// Helper to fetch data
async function getInvestorData(lang: string) {
    const token = process.env.API_TOKEN;
    try {
        const data = await dbFetch(`client/investor-relation?lang=${lang}`, {
            headers: {
                'Cookie': `token=${token}`
            }
        });

        if (data && data.data) {
            return data;
        }
        throw new Error("Invalid data structure received");
    } catch (error) {
        console.error("Error fetching investor data, using default fallback:", error);
        return { data: getDefaultInvestorData(lang) };
    }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    const investorData = await getInvestorData(lang);
    const data = investorData?.data;

    const title = data?.meta_title || (lang === "id" ? "Hubungan Investor" : "Investor Relations");
    const description = data?.meta_description || (lang === "id"
        ? "Hubungan Investor: Akses data saham real-time, laporan keuangan, dan wawasan strategis."
        : "Investor Relations: Access real-time stock data, financial reports, and strategic insights.");

    return {
        title: title,
        description: description,
        alternates: {
            canonical: `${SITE_URL}/${lang}/investor-relation`,
            languages: {
                'id-ID': `${SITE_URL}/id/investor-relation`,
                'en-US': `${SITE_URL}/en/investor-relation`,
            },
        },
        openGraph: {
            title: `${title} - Apollo`,
            description: description,
            url: `${SITE_URL}/${lang}/investor-relation`,
            siteName: "Apollo",
            images: [
                {
                    url: data?.og_image || `${SITE_URL}/og-investor-relation.jpg`,
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
    // We are fetching data here to ensure the mechanism exists, 
    // even if we don't pass it to child components yet (as they might be static or self-fetching)
    const { lang } = await params;
    await getInvestorData(lang);

    return (
        <main className="flex flex-col w-full">
            <InvestorHero />
            <StakeholderCharts />
            <StockChart />
            <ReportSection />
        </main>
    );
}
