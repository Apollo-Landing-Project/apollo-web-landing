import React from "react";
import AboutHeader from "@/components/AboutHeader";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import CompanyStructure from "@/components/CompanyStructure";
import { Metadata } from "next";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";

// Type definitions matching the API response
interface TeamMember {
    id: string;
    name: string;
    positionDesc: string;
    photo: string;
}

interface StructureItem {
    id: string;
    name: string;
    icon: string;
}

interface AboutPageData {
    hero: {
        badge: string;
        title: string;
        desc: string;
        background: string;
    };
    vision: {
        badge: string;
        title: string;
        desc: string;
        quote: string;
        list: string[];
        imageParent: string;
        imageChild: string;
    };
    mission: {
        badge: string;
        title: string;
        desc: string;
        quote: string;
        list: string[];
        imageParent: string;
        imageChild: string;
    };
    history: {
        badge: string;
        title: string;
        desc: string;
        imageParent: string;
        imageChild: string;
    };
    companyStructure: {
        badge: string;
        title: string;
        desc: string;
        items: StructureItem[];
    };
    boc: {
        badge: string;
        title: string;
        desc: string;
        members: TeamMember[];
    };
    bod: {
        badge: string;
        title: string;
        desc: string;
        members: TeamMember[];
    };
    metadata: {
        title: string;
        description: string;
        og_image: string;
    };
}

// Helper to generate default data structure
function getDefaultAboutData(lang: string): AboutPageData {
    const isId = lang === "id";
    return {
        hero: {
            badge: isId ? "Tentang Kami" : "About Us",
            title: isId ? "Pelajari Lebih Lanjut Tentang Apollo Global Interactive" : "Learn More About Apollo Global Interactive",
            desc: isId
                ? "PT Apollo Global Interactive Tbk adalah perusahaan otomotif terintegrasi yang menyediakan solusi dealer, penyewaan mobil, layanan servis, dan ritel mobil bekas melalui sistem layanan terpadu."
                : "PT Apollo Global Interactive Tbk is an integrated automotive company providing dealership, auto rental, auto service, and used car retail solutions through an integrated service system.",
            background: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327525-7zpn.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/")
        },
        vision: {
            badge: isId ? "Visi" : "Vision",
            title: isId ? "Visi Kami" : "Our Vision",
            desc: isId
                ? "Menjadi perusahaan otomotif terintegrasi terkemuka yang membentuk masa depan mobilitas melalui inovasi, keunggulan operasional, dan pertumbuhan berkelanjutan."
                : "To be a leading integrated automotive company that shapes the future of mobility through innovation, operational excellence, and sustainable growth.",
            quote: isId
                ? "Melalui visi ini, Perseroan berkomitmen untuk memperkuat kehadiran pasarnya sambil menciptakan nilai berkelanjutan bagi semua pemangku kepentingan."
                : "Through this vision, the Company is committed to strengthening its market presence while creating sustainable value for all stakeholders.",
            list: isId ? [
                "Memberikan solusi otomotif terintegrasi di seluruh siklus hidup kendaraan",
                "Membangun nilai jangka panjang bagi pelanggan, mitra, dan pemangku kepentingan",
                "Mendorong inovasi melalui teknologi dan keunggulan layanan",
                "Mempromosikan praktik bisnis yang berkelanjutan dan bertanggung jawab"
            ] : [
                "Deliver integrated automotive solutions across the entire vehicle lifecycle",
                "Build long-term value for customers, partners, and stakeholders",
                "Drive innovation through technology and service excellence",
                "Promote sustainable and responsible business practices"
            ],
            imageParent: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327532-cb8a.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/"),
            imageChild: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327532-ishp.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/")
        },
        mission: {
            badge: isId ? "Misi" : "Mission",
            title: isId ? "Misi Kami" : "Our Mission",
            desc: isId
                ? "Memberikan layanan otomotif terintegrasi dengan fokus kuat pada kualitas, keandalan, dan kepuasan pelanggan, didukung oleh manajemen profesional dan perbaikan berkelanjutan."
                : "To deliver integrated automotive services with a strong focus on quality, reliability, and customer satisfaction, supported by professional management and continuous improvement.",
            quote: isId
                ? "Melalui misi ini, Perseroan bertujuan untuk secara konsisten memberikan nilai, membangun kepercayaan, dan mendukung pertumbuhan jangka panjang bagi pelanggan, mitra, dan pemangku kepentingan."
                : "Through this mission, the Company aims to consistently deliver value, build trust, and support long-term growth for customers, partners, and stakeholders.",
            list: isId ? [
                "Menyediakan solusi otomotif komprehensif di seluruh dealer, penyewaan, layanan, dan suku cadang",
                "Mempertahankan standar tinggi keunggulan operasional dan kualitas layanan",
                "Memperkuat kemitraan untuk mendukung pertumbuhan bisnis yang berkelanjutan",
                "Memanfaatkan inovasi dan teknologi untuk meningkatkan efisiensi dan kinerja"
            ] : [
                "Providing comprehensive automotive solutions across dealership, rental, service, and used car operations",
                "Maintaining high standards of operational excellence and service quality",
                "Strengthening partnerships to support sustainable business growth",
                "Leveraging innovation and technology to enhance efficiency and performance"
            ],
            imageParent: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327532-k690.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/"),
            imageChild: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327533-r70d.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/")
        },
        history: {
            badge: isId ? "Sejarah" : "History",
            title: isId ? "Sejarah Perusahaan" : "Company History",
            desc: isId
                ? "PT Apollo Global Interactive Tbk secara resmi mengadopsi identitas barunya setelah Rapat Umum Pemegang Saham Luar Biasa (RUPSLB) yang diadakan pada 21 Januari 2026, ketika PT Bintang Oto Global Tbk mengubah namanya dan memperbarui identitas korporatnya. Rebranding ini juga memperkenalkan logo baru dan alamat email resmi.\r\n\r\nPerubahan tersebut kemudian diungkapkan kepada OJK dan BEI pada 27 Januari 2026, bersamaan dengan perombakan manajemen yang mengonfirmasi Albert Witono Setiawan sebagai Direktur Utama, dengan penunjukan dewan baru dilakukan tanpa berdampak pada kelangsungan operasional, keuangan, atau hukum Perseroan.\r\n\r\nSementara perusahaan melanjutkan kegiatan intinya dalam perdagangan kendaraan, suku cadang, pemeliharaan, dan penyewaan kendaraan melalui anak perusahaannya seiring dengan finalisasi migrasi situs web ke identitas baru."
                : "PT Apollo Global Interactive Tbk officially adopted its new identity following the Extraordinary General Meeting of Shareholders (RUPSLB) held on 21 January 2026, when PT Bintang Oto Global Tbk changed its name and updated its corporate identity The rebranding also introduced a new logo and official email address.\r\n\r\nThe change was subsequently disclosed to OJK and BEI on 27 January 2026, alongside a management reshuffle that confirmed Albert Witono Setiawan as President Director, with new board appointments made without impacting the Company’s operational, financial, or legal continuity.\r\n\r\nwhile the company continues its core activities in vehicle trading, spare parts, maintenance, and vehicle rental through its subsidiaries as the website migration to the new identity is finalized.",
            imageParent: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327533-7zi7.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/"),
            imageChild: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327534-px8d.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/")
        },
        companyStructure: {
            badge: isId ? "Struktur Perusahaan" : "Company Structural",
            title: isId ? "Lihat Struktur Perusahaan Kami" : "See Our Company Structure",
            desc: isId
                ? "Struktur organisasi PT Apollo Global Interactive mendukung tata kelola yang efektif, akuntabilitas yang jelas, dan pengambilan keputusan strategis."
                : "PT Apollo Global Interactive ’s organizational structure supports effective governance, clear accountability, and strategic decision-making.",
            items: [
                {
                    id: "d093689b-7cbc-42a4-b8a4-ebb7a4c8e34d",
                    name: isId ? "Dealer" : "Dealership",
                    icon: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327536-nin0.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/")
                },
                {
                    id: "ce6435a5-14cb-48d2-a809-118f88d1e3ef",
                    name: isId ? "Penyewaan Mobil" : "Auto Rental",
                    icon: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327536-5xra.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/")
                },
                {
                    id: "662533aa-d7da-40a8-a38a-86d45199ec87",
                    name: isId ? "Servis Mobil" : "Auto Service",
                    icon: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327536-fboi.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/")
                },
                {
                    id: "62e967cc-e419-4887-b609-c824abaffcb0",
                    name: isId ? "Ritel Mobil Bekas" : "Used Car Retailer",
                    icon: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327536-hdrw.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/")
                }
            ]
        },
        boc: {
            badge: isId ? "Dewan Komisaris Kami" : "Our BOC",
            title: isId ? "Dewan Komisaris (BOC)" : "Board of Commissioners (BOC)",
            desc: isId
                ? "Dewan Komisaris mengawasi dan memberikan panduan strategis kepada Dewan Direksi untuk memastikan tata kelola perusahaan yang baik dan keberlanjutan jangka panjang."
                : "The Board of Commissioners supervises and provides strategic guidance to the Board of Directors to ensure good corporate governance and long-term sustainability.",
            members: [
                {
                    id: "b0e3ebc8-7814-40a6-8fdb-86d4a4bbdc07",
                    name: "Romeo Lledo",
                    positionDesc: isId ? "Komisaris Utama" : "President Commisioner",
                    photo: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327536-qstl.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/")
                },
                {
                    id: "0acd028f-d9ce-47dd-bf0f-347a2d688370",
                    name: "Marjorie E Wairizal, SE",
                    positionDesc: isId ? "Komisaris Independen" : "Independent Commissioner",
                    photo: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327536-y4rq.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/")
                }
            ]
        },
        bod: {
            badge: isId ? "Dewan Direksi Kami" : "Our BOD",
            title: isId ? "Dewan Direksi (BOD)" : "Board of Directors (BOD)",
            desc: isId
                ? "Dewan Direksi bertanggung jawab atas pengelolaan operasional Perusahaan dan pelaksanaan strategi untuk mencapai tujuan kami."
                : "The Board of Directors is responsible for managing the Company’s operations and executing strategies to achieve our goals.",
            members: [
                {
                    id: "3b61714c-d6c4-4155-a6c0-276ead04525d",
                    name: "Albert Witono S",
                    positionDesc: isId ? "Direktur Utama" : "President Director",
                    photo: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327536-egcn.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/")
                },
                {
                    id: "9cce286f-c2c3-42f3-961d-09dc4ab2e4c2",
                    name: "Farras Pina",
                    positionDesc: isId ? "Direktur" : "Director",
                    photo: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327536-j32g.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/")
                }
            ]
        },
        metadata: {
            title: isId ? "Tentang Kami" : "About Us",
            description: isId
                ? "Temukan warisan keunggulan Apollo Global Interactive. Pelajari visi kami untuk mobilitas berkelanjutan, tim kepemimpinan yang berdedikasi, dan komitmen kami terhadap inovasi otomotif."
                : "Discover Apollo Global Interactive's legacy of excellence. Learn about our vision for sustainable mobility, our dedicated leadership team, and our commitment to automotive innovation.",
            og_image: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327525-7zpn.jpg".replace("https://api.apolloglobalinteractive.com/", process.env.API_BASE_URL?.replace('/api/', '/') || "https://api.apolloglobalinteractive.com/")
        }
    };
}

// Helper to fetch data
async function getAboutData(lang: string): Promise<{ data: AboutPageData }> {
    const token = process.env.API_TOKEN;
    try {
        const res = await dbFetch(`client/about-us?lang=${lang}`, {
            headers: {
                'Cookie': `token=${token}`
            },
            next: { tags: ['about'], revalidate: false }
        });

        if (res && res.data) {
            return res as { data: AboutPageData };
        }
        throw new Error("Invalid data structure received");
    } catch (error) {
        console.error("Error fetching about data:", error);
        throw error;
        // return { data: getDefaultAboutData(lang) };
    }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const aboutData = await getAboutData(lang);
    const data = aboutData.data;

    // Use metadata from API or fallback to default
    const title = data.metadata?.title || (lang === "id" ? "Tentang Kami" : "About Us");
    const description = data.metadata?.description || "";
    const ogImage = data.metadata?.og_image || `${SITE_URL}/og-about.jpg`;

    return {
        title: title,
        description: description,
        alternates: {
            canonical: `${SITE_URL}/${lang}/about`,
            languages: {
                'id-ID': `${SITE_URL}/id/about`,
                'en-US': `${SITE_URL}/en/about`,
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
            locale: lang === 'id' ? 'id_ID' : 'en_US',
            type: "website",
        },
    };
}


export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    const aboutData = await getAboutData(lang);
    const data: AboutPageData = aboutData.data;

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
                                            <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5a80b9] text-[10px] text-white">✓</span>
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
                                            <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5a80b9] text-[10px] text-white">✓</span>
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
                        {data.history.desc.split('\r\n').map((paragraph, idx) => (
                            <p key={idx} className={idx > 0 ? "mt-4" : ""}>{paragraph}</p>
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
                    <TeamSection
                        tag={data.boc.badge}
                        tagClassName="bg-[#f2f7ff] border border-[#5a80b9]/15 rounded-full px-4 py-1.5 text-[#5a80b9]"
                        title={data.boc.title}
                        description={data.boc.desc}
                        members={data.boc.members.map((m: TeamMember) => ({
                            name: m.name,
                            role: m.positionDesc,
                            image: m.photo,
                            verified: true
                        }))}
                    />

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
                            verified: true
                        }))}
                    />
                </div>
            </div>
        </main>
    );
}
