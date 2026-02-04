import React from 'react';
import type { Metadata } from 'next';
import InvestorHero from '@/components/InvestorRelation/InvestorHero';
import StockChart from '@/components/InvestorRelation/StockChart';
import StakeholderCharts from '@/components/InvestorRelation/StakeholderCharts';
import ReportSection from '@/components/InvestorRelation/ReportSection';

export const metadata: Metadata = {
    title: 'Investor Relations',
    description: 'Financial information, stock performance, and reports for Apollo Global Interactive shareholders.',
};

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
