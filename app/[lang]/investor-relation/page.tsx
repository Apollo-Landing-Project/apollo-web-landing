import React from 'react';
import type { Metadata } from 'next';
import InvestorHero from '@/components/InvestorRelation/InvestorHero';
import StockChart from '@/components/InvestorRelation/StockChart';
import StakeholderCharts from '@/components/InvestorRelation/StakeholderCharts';
import ReportSection from '@/components/InvestorRelation/ReportSection';

// Mock function to simulate fetching metadata from Backend
async function getMetadataFromBE(slug: string, lang: string) {
    // Simulate DB fetch
    await new Promise((resolve) => setTimeout(resolve, 50));

    if (lang === "id") {
        return {
            title: "Hubungan Investor",
            description: "Hubungan Investor: Akses data saham real-time, laporan keuangan, dan wawasan strategis. Bergabunglah dalam perjalanan pertumbuhan berkelanjutan dan kepemimpinan pasar kami.",
        };
    }

    return {
        title: "Investor Relations",
        description: "Investor Relations: Access real-time stock data, financial reports, and strategic insights. Join us in our journey of sustainable growth and market leadership.",
    };
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const data = await getMetadataFromBE("investor-relation-page", lang);

    return {
        title: data.title,
        description: data.description,
        alternates: {
            canonical: `https://apolloglobalinteractive.com/${lang}/investor-relation`,
            languages: {
                'id-ID': 'https://apolloglobalinteractive.com/id/investor-relation',
                'en-US': 'https://apolloglobalinteractive.com/en/investor-relation',
            },
        },
        openGraph: {
            title: `${data.title} - Apollo`,
            description: data.description,
            url: `https://apolloglobalinteractive.com/${lang}/investor-relation`,
            siteName: "Apollo",
            images: [
                {
                    url: "https://apolloglobalinteractive.com/og-investor-relation.jpg",
                    width: 1200,
                    height: 630,
                },
            ],
            locale: lang === 'id' ? 'id_ID' : 'en_US',
            type: "website",
        },
    };
}

export default function InvestorRelationPage() {
    return (
        <main className="flex flex-col w-full">
            <InvestorHero />
            <StakeholderCharts />
            <StockChart />
            <ReportSection />
        </main>
    );
}
