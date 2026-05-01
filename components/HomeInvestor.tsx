"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, TrendingUp } from "lucide-react";

interface ShareItem {
    id: string;
    category: "MAJORITY" | "PUBLIC" | string;
    value: string;
}

interface ReportItem {
    id: string;
    title: string;
    description: string;
    file_url: string;
    original_filename?: string;
    download_url?: string;
    published_at: string;
    category: string;
}

interface HomeInvestorProps {
    lang: string;
    data: {
        badge?: string;
        title?: string;
        desc?: string;
        lastReport?: ReportItem;
        shares?: ShareItem[];
    };
}

export default function HomeInvestor({ lang, data }: HomeInvestorProps) {
    const isId = lang === "id";

    const labels = {
        badge: data.badge || (isId ? "Hubungan Investor" : "Investor Relations"),
        title: data.title || (isId ? "Informasi Investor Terkini" : "Latest Investor Information"),
        desc: data.desc || (isId ? "Akses informasi terbaru mengenai kinerja saham dan laporan resmi perusahaan kami." : "Access the latest information on our stock performance and official company reports."),
        lastDocument: isId ? "Dokumen Terakhir" : "Latest Document",
        sharesInfo: isId ? "Informasi Saham" : "Stock Information",
        viewDetails: isId ? "Lihat Detail" : "View Details",
        download: isId ? "Unduh" : "Download",
        seeAllReports: isId ? "Lihat Semua Laporan" : "See All Reports",
        stockSymbol: "IDX: BOGA",
        majority: isId ? "Pemegang Saham Mayoritas" : "Majority Stakeholder",
        public: isId ? "Publik" : "Public",
    };

    const lastReport = data.lastReport;
    const majorityShare = data.shares?.find(s => s.category === 'MAJORITY');
    const publicShare = data.shares?.find(s => s.category === 'PUBLIC');

    const formatNumber = (num: string) => {
        const val = parseInt(num, 10);
        return isNaN(val) ? "0" : val.toLocaleString('id-ID');
    };

    return (
        <section id="investor-relation" className="w-full bg-[#FBFBFB] py-16 md:py-24 scroll-mt-24">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-4 md:px-10">

                {/* Header */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-3 py-1 text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15">
                        {labels.badge}
                    </div>
                    <h2 className="max-w-[800px] text-3xl font-semibold leading-tight text-[#323441] md:text-[54px]">
                        {labels.title}
                    </h2>
                    <p className="max-w-[700px] text-lg text-[#323441]/80">
                        {labels.desc}
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">

                    {/* Stock / Shares Card */}
                    <div className="flex flex-col gap-6 p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-[#5a80b9]/10 flex items-center justify-center text-[#5a80b9]">
                                    <TrendingUp size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#323441]">{labels.sharesInfo}</h3>
                            </div>
                            <span className="text-sm font-bold text-[#5a80b9] bg-[#5a80b9]/5 px-3 py-1 rounded-full border border-[#5a80b9]/10">
                                {labels.stockSymbol}
                            </span>
                        </div>

                        <div className="flex flex-col gap-4 mt-2">
                            <div className="flex flex-col gap-1 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                <span className="text-sm text-gray-500">{labels.majority}</span>
                                <div className="flex items-end gap-2">
                                    <span className="text-xl font-bold text-[#323441]">
                                        {majorityShare ? formatNumber(majorityShare.value) : "0"}
                                    </span>
                                    <span className="text-sm text-gray-400 mb-0.5">Shares</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                <span className="text-sm text-gray-500">{labels.public}</span>
                                <div className="flex items-end gap-2">
                                    <span className="text-xl font-bold text-[#323441]">
                                        {publicShare ? formatNumber(publicShare.value) : "0"}
                                    </span>
                                    <span className="text-sm text-gray-400 mb-0.5">Shares</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={`/${lang}/investor-relation`}
                            className="group mt-auto flex items-center gap-2 text-[#5a80b9] font-medium hover:underline"
                        >
                            {labels.viewDetails}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Latest Document Card */}
                    <div className="flex flex-col gap-6 p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-[#5a80b9]/10 flex items-center justify-center text-[#5a80b9]">
                                <FileText size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#323441]">{labels.lastDocument}</h3>
                        </div>

                        {lastReport ? (
                            <div className="flex flex-col gap-4 mt-2 grow">
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-[#5a80b9]">{lastReport.category}</span>
                                    <h4 className="text-xl font-bold text-[#323441] leading-tight line-clamp-2">
                                        {lastReport.title}
                                    </h4>
                                    <p className="text-gray-500 text-sm line-clamp-2">
                                        {lastReport.description || (isId ? "Laporan resmi perusahaan" : "Official company report")}
                                    </p>
                                </div>
                                <div className="mt-auto pt-4 flex items-center justify-between border-top border-gray-50">
                                    <span className="text-sm text-gray-400">
                                        {new Date(lastReport.published_at).toLocaleDateString(isId ? 'id-ID' : 'en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <a
                                        href={lastReport.download_url || lastReport.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#5a80b9] hover:bg-[#4a6d9e] rounded-full text-white text-sm font-medium transition-colors"
                                    >
                                        {labels.download}
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="flex grow items-center justify-center text-gray-400 italic">
                                {isId ? "Tidak ada dokumen tersedia" : "No documents available"}
                            </div>
                        )}

                        {!lastReport && (
                            <Link
                                href={`/${lang}/investor-relation`}
                                className="group mt-auto flex items-center gap-2 text-[#5a80b9] font-medium hover:underline"
                            >
                                {labels.seeAllReports}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        )}
                    </div>

                </div>

                {/* Call to Action */}
                <div className="flex justify-center mt-4">
                    <Link
                        href={`/${lang}/investor-relation`}
                        className="rounded-full border border-gray-200 bg-white px-8 py-3 text-base font-medium text-[#323441] shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5a80b9] focus:ring-offset-2 flex items-center gap-2"
                    >
                        {isId ? "Kunjungi Hubungan Investor" : "Visit Investor Relations"}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>
        </section>
    );
}
