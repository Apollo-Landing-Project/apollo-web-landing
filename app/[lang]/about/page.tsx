import React from "react";
import Image from "next/image";
import AboutHeader from "@/components/AboutHeader";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import CompanyStructure from "@/components/CompanyStructure";
import { Metadata } from "next";

// Mock function to simulate fetching metadata from Backend
async function getMetadataFromBE(slug: string, lang: string) {
    // Simulate DB fetch
    await new Promise((resolve) => setTimeout(resolve, 50));

    if (lang === "id") {
        return {
            title: "Tentang Kami",
            description: "Temukan warisan keunggulan Apollo Global Interactive. Pelajari visi kami untuk mobilitas berkelanjutan, tim kepemimpinan yang berdedikasi, dan komitmen kami terhadap inovasi.",
        };
    }

    return {
        title: "About Us",
        description: "Discover Apollo Global Interactive's legacy of excellence. Learn about our vision for sustainable mobility, our dedicated leadership team, and our commitment to automotive innovation.",
    };
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const data = await getMetadataFromBE("about-page", lang);

    return {
        title: data.title,
        description: data.description,
        alternates: {
            canonical: `https://apolloglobalinteractive.com/${lang}/about`,
            languages: {
                'id-ID': 'https://apolloglobalinteractive.com/id/about',
                'en-US': 'https://apolloglobalinteractive.com/en/about',
            },
        },
        openGraph: {
            title: `${data.title} - Apollo`,
            description: data.description,
            url: `https://apolloglobalinteractive.com/${lang}/about`,
            siteName: "Apollo",
            images: [
                {
                    url: "https://apolloglobalinteractive.com/og-about.jpg",
                    width: 1200,
                    height: 630,
                },
            ],
            locale: lang === 'id' ? 'id_ID' : 'en_US',
            type: "website",
        },
    };
}


const commissioners = [
    {
        name: "Romeo Lledo",
        role: "President Commissioner",
        image: "/assets/stakeholder/placeholder.png",
        verified: true,
    },
    {
        name: "Marjorie E Wairizal, SE",
        role: "Independent Commissioner",
        image: "/assets/stakeholder/placeholder.png",
        verified: true,
    },
];

const directors = [
    {
        name: "Albert Witono Setiawan",
        role: "President Director",
        image: "/assets/stakeholder/albert-witono-setiawan.png",
        verified: true,

    },
    {
        name: "Farras Pina",
        role: "Director",
        image: "/assets/stakeholder/placeholder.png",
        verified: true,

    },


];

export default function AboutPage() {
    return (
        <main className="flex flex-col items-center">
            {/* Header */}
            <div className="w-full">
                <AboutHeader
                    title="Learn More About Apollo Global Interactive"
                    subtitle="PT Apollo Global Interactive Tbk (The Company) is a multidimensional automotive company dedicated to serving you through innovation, superior service, and sustainable growth."
                    backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    targetId="our-vision"
                    badge="About Us"
                />
            </div>

            <div className="w-full px-4 md:px-10 mt-[85px]">
                {/* Our Vision */}
                <div id="our-vision" className="scroll-mt-32">
                    <AboutSection
                        tag="Vision"
                        title="Our Vision"
                        imageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                        imageAlt="Team collaborating"
                        overlayImageSrc="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                        additionalContent={
                            <>
                                <p className="mt-3 font-semibold text-[#323441]">We aim to:</p>
                                <ul className="mt-2 space-y-[6px]">
                                    {[
                                        "Deliver integrated automotive solutions across the entire vehicle lifecycle.",
                                        "Build long-term value for customers, partners, and stakeholders.",
                                        "Drive innovation through technology and service excellence.",
                                        "Promote sustainable and responsible business practices."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5a80b9] text-[10px] text-white">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-4">
                                    Through this vision, the Company is committed to strengthening its market presence while creating sustainable value for all stakeholders.
                                </p>
                            </>
                        }
                    >
                        <p>
                            To be a leading integrated automotive company that shapes the future of mobility through innovation, operational excellence, and sustainable growth.
                        </p>
                    </AboutSection>

                    {/* Our Mission */}
                    <AboutSection
                        tag="Mission"
                        title="Our Mission"
                        isReversed
                        imageSrc="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop"
                        imageAlt="Modern architecture looking up"
                        overlayImageSrc="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop"
                        additionalContent={
                            <>
                                <p className="mt-4 font-semibold text-[#323441]">We are committed to:</p>
                                <ul className="mt-2 space-y-2">
                                    {[
                                        "Providing comprehensive automotive solutions across dealership, rental, service, and spare parts.",
                                        "Maintaining high standards of operational excellence and service quality.",
                                        "Strengthening partnerships to support sustainable business growth.",
                                        "Leveraging innovation and technology to enhance efficiency and performance."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5a80b9] text-[10px] text-white">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-4">
                                    Through this mission, the Company aims to consistently deliver value, build trust, and support long-term growth for customers, partners, and stakeholders.
                                </p>
                            </>
                        }
                    >
                        <p>
                            To deliver integrated automotive services with a strong focus on quality, reliability, and customer satisfaction, supported by professional management and continuous improvement.
                        </p>
                    </AboutSection>

                    {/* Company History */}
                    <AboutSection
                        tag="History"
                        title="Company History"
                        imageSrc="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop"
                        imageAlt="Company building"
                        overlayImageSrc="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2670&auto=format&fit=crop"
                        mobileImagePriorToDescription
                    >
                        <p>
                            PT Apollo Global Interactive Tbk officially adopted its new identity following the Extraordinary General Meeting of Shareholders (RUPSLB) held on 31 January 2024, when PT Bintang Oto Global Tbk changed its name and updated its corporate identity. This rebranding also introduced a new logo and official email address.
                        </p>
                        <p className="mt-4">
                            The change was subsequently disclosed to OJK and BEI on 21 January 2024, alongside a management reshuffle that confirmed Albert Wibowo Setiawan as President Director, with new board appointments made without impacting the Company&apos;s operational, financial, or legal continuity.
                        </p>
                    </AboutSection>

                    {/* Company Structure */}
                    <CompanyStructure />

                    {/* BOC */}
                    <TeamSection
                        tag="Our BOC"
                        tagClassName="bg-[#f2f7ff] border border-[#5a80b9]/15 rounded-full px-4 py-1.5 text-[#5a80b9]"
                        title="Board of Commissioners (BOC)"
                        description="The Board of Commissioners supervises and provides strategic guidance to the Board of Directors to ensure good corporate governance and long-term sustainability."
                        members={commissioners}
                    />

                    {/* BOD */}
                    <TeamSection
                        tag="Our BOD"
                        tagClassName="bg-[#f2f7ff] border border-[#5a80b9]/15 rounded-full px-4 py-1.5 text-[#5a80b9]"
                        title="Board of Directors (BOD)"
                        description="The Board of Directors is responsible for managing the Company's operations and executing strategies to achieve our goals."
                        members={directors}
                    />
                </div>
            </div>
        </main>
    );
}
