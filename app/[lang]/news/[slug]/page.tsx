import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

// Mock function to simulate fetching metadata from Backend
async function getNewsMetadata(slug: string, lang: string) {
    // Simulate DB fetch
    await new Promise((resolve) => setTimeout(resolve, 50));

    const isId = lang === 'id';

    // In real app, fetch article by slug
    return {
        title: isId
            ? "Ringkasan Risalah RUPSLB 2026"
            : "Summary of Minutes of EGMS 2026",
        description: isId
            ? "Rapat Umum Pemegang Saham Luar Biasa (RUPSLB) 2026 Apollo Global Interactive berhasil diselenggarakan pada 23 Oktober 2026."
            : "The Extraordinary General Meeting of Shareholders (EGMS) 2026 of Apollo Global Interactive was successfully convened on October 23, 2026.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
    };
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const data = await getNewsMetadata(slug, lang);

    return {
        title: data.title,
        description: data.description,
        alternates: {
            canonical: `https://apolloglobalinteractive.com/${lang}/news/${slug}`,
            languages: {
                'id-ID': `https://apolloglobalinteractive.com/id/news/${slug}`,
                'en-US': `https://apolloglobalinteractive.com/en/news/${slug}`,
            },
        },
        openGraph: {
            title: `${data.title} - Apollo`,
            description: data.description,
            url: `https://apolloglobalinteractive.com/${lang}/news/${slug}`,
            siteName: "Apollo",
            images: [
                {
                    url: data.image,
                    width: 1200,
                    height: 630,
                },
            ],
            locale: lang === 'id' ? 'id_ID' : 'en_US',
            type: "article",
        },
    };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    // In a real application, you would fetch data using params.slug
    // For now, we mock the content to match the design

    return (
        <main className="w-full bg-white px-4 py-8 text-[#323441] md:px-10">
            {/* Back Button */}
            <div className="mb-8">
                <Link
                    href={`/${lang}/news`}
                    className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#d1d1d6] px-4 py-3 text-sm font-semibold text-[#323441] transition-colors hover:bg-gray-50"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back To Home
                </Link>
            </div>

            {/* Header Content */}
            <div className="mb-12">
                <h1 className="mb-6 max-w-[1000px] text-3xl font-bold leading-tight text-[#323441] md:text-[54px] md:leading-[1.2]">
                    Summary of Minutes of EGMS 2026
                </h1>

                {/* Metadata */}
                <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                        {/* Placeholder for Author Avatar */}
                        <Image
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                            alt="Author"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-bold text-[#323441]">Author Name</span>
                        <span className="text-sm text-[#767676]">Published on October 25, 2025</span>
                    </div>
                </div>
            </div>

            {/* Cover Image */}
            <div className="relative mb-12 h-[300px] w-full overflow-hidden rounded-[32px] md:h-[600px]">
                <Image
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
                    alt="Summary of Minutes of EGMS 2026"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none text-[#767676] mb-16">
                <p className="mb-8 leading-loose">
                    The Extraordinary General Meeting of Shareholders (EGMS) 2026 of Apollo Global Interactive was successfully convened on October 23, 2026. The meeting was attended by the Board of Directors, the Board of Commissioners, and shareholders representing 85% of the company's total outstanding shares. The primary agenda focused on the strategic roadmap for the upcoming fiscal year, approval of the new expansion plans in Southeast Asia, and the ratification of the recent changes in the company's organizational structure.
                </p>

                {/* Inline Image 1 */}
                <div className="relative mb-8 h-[300px] md:h-[400px] w-full md:w-[80%] mx-auto overflow-hidden rounded-[24px]">
                    <Image
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2670&auto=format&fit=crop"
                        alt="Meeting Discussion"
                        fill
                        className="object-cover"
                    />
                </div>

                <h3 className="text-2xl font-bold text-[#323441] mb-4 mt-8">Key Decisions & Strategic Milestones</h3>
                <p className="mb-8 leading-loose">
                    Shareholders unanimously approved the allocation of capital expenditure for the development of the new EV manufacturing plant in Batang, Central Java. This facility is expected to increase our production capacity by 40% annually. Furthermore, the meeting ratified the appointment of two new independent commissioners to strengthen corporate governance and oversight.
                </p>

                {/* Inline Image 2 */}
                <div className="relative mb-8 h-[300px] md:h-[400px] w-full md:w-[80%] mx-auto overflow-hidden rounded-[24px]">
                    <Image
                        src="https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=2670&auto=format&fit=crop"
                        alt="Strategy Session"
                        fill
                        className="object-cover"
                    />
                </div>

                <p className="mb-8 leading-loose">
                    "We are committed to accelerating our transition towards sustainable mobility," stated the CEO during the keynote address. "The approval of today's agenda items marks a significant vote of confidence from our shareholders in our long-term vision." The meeting also discussed the financial performance of Q3 2026, which showed a resilient 15% year-on-year growth despite global economic headwinds.
                </p>

                {/* Inline Image 3 */}
                <div className="relative mb-8 h-[300px] md:h-[400px] w-full md:w-[80%] mx-auto overflow-hidden rounded-[24px]">
                    <Image
                        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2670&auto=format&fit=crop"
                        alt="Corporate Team"
                        fill
                        className="object-cover"
                    />
                </div>

                <h3 className="text-2xl font-bold text-[#323441] mb-4 mt-8">Future Outlook</h3>
                <p className="leading-loose">
                    Looking ahead, Apollo Global Interactive aims to solidify its market leadership by integrating AI-driven supply chain management and expanding its dealership network. The roadmap for 2027 includes the launch of three new hybrid models and a comprehensive digital transformation of our after-sales services. We thank our stakeholders for their continued support and trust.
                </p>
            </article>
        </main>
    );
}
