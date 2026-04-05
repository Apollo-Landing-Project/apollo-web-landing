import React from "react";
import AboutHeader from "@/components/AboutHeader";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import CompanyStructure from "@/components/CompanyStructure";
import { Metadata } from "next";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";
import {
	AboutPageData,
	fallbackAboutData,
	TeamMember,
} from "@/lib/fallback-about-data";

// Helper to fetch data safely with fallback layer
async function fetchAboutData(
	lang: string,
): Promise<{ data: AboutPageData; isFallback: boolean }> {
	const token = process.env.API_TOKEN;
	try {
		const res = await dbFetch<{ data: AboutPageData }>(
			`client/about-us?lang=${lang}`,
			{
				headers: {
					"Cookie": `token=${token || ""}`,
				},
				next: { tags: ["about"], revalidate: false },
			},
		);

		if (!res || !res.data) throw new Error("Invalid structure from API");
		return { data: res.data, isFallback: false };
	} catch (error) {
		console.error(
			`[SSR] About fetch failed for '${lang}', using static fallback.`,
		);
		return { data: fallbackAboutData.data, isFallback: true };
	}
}

// ----------------------------------------------------------------------
// Metadata Generation
// ----------------------------------------------------------------------
export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	const { data } = await fetchAboutData(lang);

	const title =
		data.metadata?.title || (lang === "id" ? "Tentang Kami" : "About Us");
	const description =
		data.metadata?.description || "Apollo Global Interactive Legacy.";
	const ogImage = data.metadata?.og_image || `${SITE_URL}/og-about.jpg`;

	return {
		title: title,
		description: description,
		alternates: {
			canonical: `${SITE_URL}/${lang}/about`,
			languages: {
				"id-ID": `${SITE_URL}/id/about`,
				"en-US": `${SITE_URL}/en/about`,
			},
		},
		openGraph: {
			title: `${title} - Apollo`,
			description: description,
			url: `${SITE_URL}/${lang}/about`,
			siteName: "Apollo",
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
				},
			],
			locale: lang === "id" ? "id_ID" : "en_US",
			type: "website",
		},
	};
}

// ----------------------------------------------------------------------
// Main Komponen Server Page
// ----------------------------------------------------------------------
export default async function AboutPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang: pathLang } = await params;

	// Ambil data melalui layer perantara
	const { data: aboutData, isFallback } = await fetchAboutData(pathLang);

	// Override logic: Jika API gagal, paksakan UI ke bahasa Indonesia (karena statisnya Indonesia)
	const activeLang = isFallback ? "id" : pathLang;

	// Safety checks / object destruct untuk kenyamanan tipe data
	const data: AboutPageData = aboutData;

	return (
		<main className="flex flex-col items-center">
			{/* Header */}
			<div className="w-full">
				<AboutHeader
					title={data.hero.title}
					subtitle={data.hero.desc}
					backgroundImage={data.hero.background}
					targetId="our-vision"
					badge={data.hero.badge}
				/>
			</div>

			<div className="w-full px-4 md:px-10 mt-[85px]">
				{/* Our Vision */}
				<div id="our-vision" className="scroll-mt-32">
					<AboutSection
						tag={data.vision.badge}
						title={data.vision.title}
						imageSrc={data.vision.imageParent}
						imageAlt="Vision Image"
						overlayImageSrc={data.vision.imageChild}
						additionalContent={
							<>
								<ul className="mt-2 space-y-[6px]">
									{data.vision.list.map((item: string, i: number) => (
										<li key={i} className="flex items-start gap-3">
											<span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5a80b9] text-[10px] text-white">
												✓
											</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
								<p className="mt-4 italic text-gray-500">
									&quot;{data.vision.quote}&quot;
								</p>
							</>
						}
					>
						<p>{data.vision.desc}</p>
					</AboutSection>

					{/* Our Mission */}
					<AboutSection
						tag={data.mission.badge}
						title={data.mission.title}
						isReversed
						imageSrc={data.mission.imageParent}
						imageAlt="Mission Image"
						overlayImageSrc={data.mission.imageChild}
						additionalContent={
							<>
								<ul className="mt-2 space-y-2">
									{data.mission.list.map((item: string, i: number) => (
										<li key={i} className="flex items-start gap-3">
											<span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5a80b9] text-[10px] text-white">
												✓
											</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
								<p className="mt-4 italic text-gray-500">
									&quot;{data.mission.quote}&quot;
								</p>
							</>
						}
					>
						<p>{data.mission.desc}</p>
					</AboutSection>

					{/* Company History */}
					<AboutSection
						tag={data.history.badge}
						title={data.history.title}
						imageSrc={data.history.imageParent}
						imageAlt="Company History"
						overlayImageSrc={data.history.imageChild}
						mobileImagePriorToDescription
					>
						{data.history.desc.split("\r\n").map((paragraph, idx) => (
							<p key={idx} className={idx > 0 ? "mt-4" : ""}>
								{paragraph}
							</p>
						))}
					</AboutSection>

					{/* Company Structure */}
					<CompanyStructure
						badge={data.companyStructure.badge}
						title={data.companyStructure.title}
						description={data.companyStructure.desc}
						items={data.companyStructure.items}
					/>

					{/* BOC */}
					{/* <TeamSection
						tag={data.boc.badge}
						tagClassName="bg-[#f2f7ff] border border-[#5a80b9]/15 rounded-full px-4 py-1.5 text-[#5a80b9]"
						title={data.boc.title}
						description={data.boc.desc}
						members={data.boc.members.map((m: TeamMember) => ({
							name: m.name,
							role: m.positionDesc,
							image: m.photo,
							verified: true,
						}))}
					/> */}

					{/* BOD */}
					<TeamSection
						tag={data.bod.badge}
						tagClassName="bg-[#f2f7ff] border border-[#5a80b9]/15 rounded-full px-4 py-1.5 text-[#5a80b9]"
						title={data.bod.title}
						description={data.bod.desc}
						members={data.bod.members.map((m: TeamMember) => ({
							name: m.name,
							role: m.positionDesc,
							image: m.photo,
							verified: true,
						}))}
					/>
				</div>
			</div>
		</main>
	);
}
