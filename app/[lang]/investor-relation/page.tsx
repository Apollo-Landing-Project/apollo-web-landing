import React from "react";
import type { Metadata } from "next";
import AboutHeader from "@/components/AboutHeader";
import StockChart from "@/components/InvestorRelation/StockChart";
import StakeholderCharts from "@/components/InvestorRelation/StakeholderCharts";
import ReportSection from "@/components/InvestorRelation/ReportSection";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";
import {
	fallbackInvestorData,
	InvestorApiResponse,
} from "@/lib/fallback-investor-data";
import { enrichInvestorReportDownloads } from "@/lib/report-download";

async function fetchInvestorData(
	lang: string,
): Promise<{ response: InvestorApiResponse; isFallback: boolean }> {
	try {
		const res = await dbFetch<InvestorApiResponse>(
			`client/investor?lang=${lang}`,
			{
				next: { tags: ["investor_relation"], revalidate: false },
			},
		);

		if (!res || !res.data?.hero || !res.data?.stakeholders || !res.data?.report) {
			throw new Error("Invalid Investor Data Response");
		}

		return {
			response: {
				...res,
				data: enrichInvestorReportDownloads({
					...res.data,
				}),
			},
			isFallback: false,
		};
	} catch (error) {
		console.error(
			`[SSR] Investor fetch failed for '${lang}', using static fallback.`,
			error,
		);
		return {
			response: {
				...fallbackInvestorData,
				data: enrichInvestorReportDownloads({
					...fallbackInvestorData.data,
				}),
			},
			isFallback: true,
		};
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;

	const { response } = await fetchInvestorData(lang);
	const meta = response.metadata || {
		title: lang === "id" ? "Hubungan Investor" : "Investor Relations",
		description: "",
		og_image: "",
	};

	return {
		title: meta.title,
		description: meta.description,
		alternates: {
			canonical: `${SITE_URL}/${lang}/investor-relation`,
			languages: {
				"id-ID": `${SITE_URL}/id/investor-relation`,
				"en-US": `${SITE_URL}/en/investor-relation`,
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
			locale: lang === "id" ? "id_ID" : "en_US",
			type: "website",
		},
	};
}

export default async function InvestorRelationPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang: pathLang } = await params;

	// Gunakan fallback safe layer
	const { response, isFallback } = await fetchInvestorData(pathLang);
	const data = response.data;

	// Override logic: Jika fallback -> ID
	const activeLang = isFallback ? "id" : pathLang;

	return (
		<main className="flex flex-col w-full items-center">
			<div className="w-full">
				<AboutHeader
					badge={data.hero.badge}
					title={data.hero.title}
					subtitle={data.hero.desc}
					backgroundImage={data.hero.background}
					targetId="stakeholder-charts"
				/>
			</div>

			<div id="stakeholder-charts" className="w-full scroll-mt-32">
				<StakeholderCharts
					badge={data.stakeholders.badge}
					title={data.stakeholders.title}
					desc={data.stakeholders.desc}
					shares={data.stakeholders.shares}
					lang={activeLang}
				/>
			</div>
			<div className="w-full">
				<StockChart />
			</div>
			<div className="w-full">
				<ReportSection
					badge={data.report.badge}
					title={data.report.title}
					desc={data.report.desc}
					reportItems={data.report.reportItems}
					lang={activeLang}
				/>
			</div>
		</main>
	);
}
