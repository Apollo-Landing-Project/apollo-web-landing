import React from "react";
import type { Metadata } from "next";
import AboutHeader from "@/components/AboutHeader";
import StockChart from "@/components/InvestorRelation/StockChart";
import StakeholderCharts from "@/components/InvestorRelation/StakeholderCharts";
import ReportSection from "@/components/InvestorRelation/ReportSection";
import NewsCarouselSection from "@/components/InvestorRelation/NewsCarouselSection";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";
import {
	fallbackInvestorData,
	InvestorApiResponse,
} from "@/lib/fallback-investor-data";
import { enrichInvestorReportDownloads } from "@/lib/report-download";

interface InvestorNewsItemApi {
	id: string;
	title: string;
	description: string;
	image: string;
	publishedAt: string;
}

interface InvestorNewsListApiResponse {
	status?: string;
	data?: {
		newsSection?: {
			badge?: string | null;
			title?: string;
			desc?: string;
		};
		news?: InvestorNewsItemApi[];
	};
}

interface InvestorNewsSectionData {
	badge: string;
	title: string;
	desc: string;
	items: Array<{
		id: string;
		title: string;
		description: string;
		image: string;
		publishedAt: string;
		href: string;
	}>;
}

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

function formatNewsDate(dateString: string, lang: string) {
	if (!dateString) {
		return "";
	}

	try {
		return new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(new Date(dateString));
	} catch {
		return dateString;
	}
}

function getDefaultNewsSection(lang: string): InvestorNewsSectionData {
	const isId = lang === "id";

	return {
		badge: isId ? "Berita" : "News",
		title: isId ? "Berita" : "News",
		desc: isId
			? "Ikuti pembaruan terbaru, pengumuman resmi, dan sorotan perusahaan kami."
			: "Follow our latest updates, official announcements, and company highlights.",
		items: [],
	};
}

async function fetchInvestorNews(lang: string): Promise<InvestorNewsSectionData> {
	const fallbackSection = getDefaultNewsSection(lang);

	try {
		const res = await dbFetch<InvestorNewsListApiResponse>(`client/news?lang=${lang}`, {
			next: { tags: ["investor_relation", "news"], revalidate: false },
		});

		if (res.status !== "success" || !res.data) {
			throw new Error("Invalid news payload");
		}

		return {
			badge: res.data.newsSection?.badge || fallbackSection.badge,
			title: res.data.newsSection?.title || fallbackSection.title,
			desc: res.data.newsSection?.desc || fallbackSection.desc,
			items: (res.data.news || []).map((item) => ({
				id: item.id,
				title: item.title,
				description: item.description,
				image: item.image,
				publishedAt: formatNewsDate(item.publishedAt, lang),
				href: `/${lang}/investor-relation/${item.id}`,
			})),
		};
	} catch (error) {
		console.error(`[SSR] Investor news fetch failed for '${lang}'.`, error);
		return fallbackSection;
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
	const newsSection = await fetchInvestorNews(activeLang);

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
			<div className="w-full">
				<NewsCarouselSection
					badge={newsSection.badge}
					title={newsSection.title}
					desc={newsSection.desc}
					items={newsSection.items}
					lang={activeLang}
				/>
			</div>
		</main>
	);
}
