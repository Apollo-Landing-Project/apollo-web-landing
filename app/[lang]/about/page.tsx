import React from "react";
import Image from "next/image";
import AboutHeader from "@/components/AboutHeader";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import CompanyStructure from "@/components/CompanyStructure";
import { Metadata } from "next";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";

// Helper to generate default data structure
function getDefaultAboutData(lang: string) {
    const isId = lang === "id";
    return {
        meta_title: isId ? "Tentang Kami" : "About Us",
        meta_description: isId
            ? "Temukan warisan keunggulan Apollo Global Interactive. Pelajari visi kami untuk mobilitas berkelanjutan, tim kepemimpinan yang berdedikasi, dan komitmen kami terhadap inovasi."
            : "Discover Apollo Global Interactive's legacy of excellence. Learn about our vision for sustainable mobility, our dedicated leadership team, and our commitment to automotive innovation.",
        og_image: "/og-about.jpg",
        header: {
            title: isId ? "Pelajari Lebih Lanjut Tentang Apollo Global Interactive" : "Learn More About Apollo Global Interactive",
            subtitle: isId
                ? "PT Apollo Global Interactive Tbk (Perseroan) adalah perusahaan otomotif multidimensi yang berdedikasi melayani Anda melalui inovasi, layanan unggul, dan pertumbuhan berkelanjutan."
                : "PT Apollo Global Interactive Tbk (The Company) is a multidimensional automotive company dedicated to serving you through innovation, superior service, and sustainable growth.",
            badge: isId ? "Tentang Kami" : "About Us"
        },
        vision: {
            tag: isId ? "Visi" : "Vision",
            title: isId ? "Visi Kami" : "Our Vision",
            desc: isId
                ? "Menjadi perusahaan otomotif terintegrasi terkemuka yang membentuk masa depan mobilitas melalui inovasi, keunggulan operasional, dan pertumbuhan berkelanjutan."
                : "To be a leading integrated automotive company that shapes the future of mobility through innovation, operational excellence, and sustainable growth.",
            listTitle: isId ? "Kami bertujuan untuk:" : "We aim to:",
            points: isId ? [
                "Memberikan solusi otomotif terintegrasi di seluruh siklus hidup kendaraan.",
                "Membangun nilai jangka panjang bagi pelanggan, mitra, dan pemangku kepentingan.",
                "Mendorong inovasi melalui teknologi dan keunggulan layanan.",
                "Mempromosikan praktik bisnis yang berkelanjutan dan bertanggung jawab."
            ] : [
                "Deliver integrated automotive solutions across the entire vehicle lifecycle.",
                "Build long-term value for customers, partners, and stakeholders.",
                "Drive innovation through technology and service excellence.",
                "Promote sustainable and responsible business practices."
            ],
            footer: isId
                ? "Melalui visi ini, Perseroan berkomitmen untuk memperkuat kehadiran pasarnya sambil menciptakan nilai berkelanjutan bagi semua pemangku kepentingan."
                : "Through this vision, the Company is committed to strengthening its market presence while creating sustainable value for all stakeholders."
        },
        mission: {
            tag: isId ? "Misi" : "Mission",
            title: isId ? "Misi Kami" : "Our Mission",
            desc: isId
                ? "Memberikan layanan otomotif terintegrasi dengan fokus kuat pada kualitas, keandalan, dan kepuasan pelanggan, didukung oleh manajemen profesional dan perbaikan berkelanjutan."
                : "To deliver integrated automotive services with a strong focus on quality, reliability, and customer satisfaction, supported by professional management and continuous improvement.",
            listTitle: isId ? "Kami berkomitmen untuk:" : "We are committed to:",
            points: isId ? [
                "Menyediakan solusi otomotif komprehensif di seluruh dealer, penyewaan, layanan, dan suku cadang.",
                "Mempertahankan standar tinggi keunggulan operasional dan kualitas layanan.",
                "Memperkuat kemitraan untuk mendukung pertumbuhan bisnis yang berkelanjutan.",
                "Memanfaatkan inovasi dan teknologi untuk meningkatkan efisiensi dan kinerja."
            ] : [
                "Providing comprehensive automotive solutions across dealership, rental, service, and spare parts.",
                "Maintaining high standards of operational excellence and service quality.",
                "Strengthening partnerships to support sustainable business growth.",
                "Leveraging innovation and technology to enhance efficiency and performance."
            ],
            footer: isId
                ? "Melalui misi ini, Perseroan bertujuan untuk secara konsisten memberikan nilai, membangun kepercayaan, dan mendukung pertumbuhan jangka panjang bagi pelanggan, mitra, dan pemangku kepentingan."
                : "Through this mission, the Company aims to consistently deliver value, build trust, and support long-term growth for customers, partners, and stakeholders."
        },
        history: {
            tag: isId ? "Sejarah" : "History",
            title: isId ? "Sejarah Perusahaan" : "Company History",
            p1: isId
                ? "PT Apollo Global Interactive Tbk secara resmi mengadopsi identitas barunya setelah Rapat Umum Pemegang Saham Luar Biasa (RUPSLB) yang diadakan pada 31 Januari 2024, ketika PT Bintang Oto Global Tbk mengubah namanya dan memperbarui identitas korporatnya. Rebranding ini juga memperkenalkan logo baru dan alamat email resmi."
                : "PT Apollo Global Interactive Tbk officially adopted its new identity following the Extraordinary General Meeting of Shareholders (RUPSLB) held on 31 January 2024, when PT Bintang Oto Global Tbk changed its name and updated its corporate identity. This rebranding also introduced a new logo and official email address.",
            p2: isId
                ? "Perubahan tersebut kemudian diungkapkan kepada OJK dan BEI pada 21 Januari 2024, bersamaan dengan perombakan manajemen yang mengonfirmasi Albert Wibowo Setiawan sebagai Direktur Utama, dengan penunjukan dewan baru dilakukan tanpa berdampak pada kelangsungan operasional, keuangan, atau hukum Perseroan."
                : "The change was subsequently disclosed to OJK and BEI on 21 January 2024, alongside a management reshuffle that confirmed Albert Wibowo Setiawan as President Director, with new board appointments made without impacting the Company's operational, financial, or legal continuity."
        },
        commissioners: {
            tag: isId ? "Dewan Komisaris Kami" : "Our BOC",
            title: isId ? "Dewan Komisaris (BOC)" : "Board of Commissioners (BOC)",
            desc: isId
                ? "Dewan Komisaris mengawasi dan memberikan panduan strategis kepada Dewan Direksi untuk memastikan tata kelola perusahaan yang baik dan keberlanjutan jangka panjang."
                : "The Board of Commissioners supervises and provides strategic guidance to the Board of Directors to ensure good corporate governance and long-term sustainability.",
            members: [
                {
                    name: "Romeo Lledo",
                    role: isId ? "Komisaris Utama" : "President Commissioner",
                    image: "/assets/stakeholder/placeholder.png",
                    verified: true,
                },
                {
                    name: "Marjorie E Wairizal, SE",
                    role: isId ? "Komisaris Independen" : "Independent Commissioner",
                    image: "/assets/stakeholder/placeholder.png",
                    verified: true,
                },
            ]
        },
        directors: {
            tag: isId ? "Dewan Direksi Kami" : "Our BOD",
            title: isId ? "Dewan Direksi (BOD)" : "Board of Directors (BOD)",
            desc: isId
                ? "Dewan Direksi bertanggung jawab atas pengelolaan operasional Perusahaan dan pelaksanaan strategi untuk mencapai tujuan kami."
                : "The Board of Directors is responsible for managing the Company's operations and executing strategies to achieve our goals.",
            members: [
                {
                    name: "Albert Witono Setiawan",
                    role: isId ? "Direktur Utama" : "President Director",
                    image: "/assets/stakeholder/albert-witono-setiawan.png",
                    verified: true,
                },
                {
                    name: "Farras Pina",
                    role: isId ? "Direktur" : "Director",
                    image: "/assets/stakeholder/placeholder.png",
                    verified: true,
                },
            ]
        }
    };
}

// Helper to fetch data
async function getAboutData(lang: string) {
    const token = process.env.API_TOKEN;
    try {
        const data = await dbFetch(`client/about?lang=${lang}`, {
            headers: {
                'Cookie': `token=${token}`
            }
        });

        if (data && data.data) {
            return data;
        }
        throw new Error("Invalid data structure received");
    } catch (error) {
        console.error("Error fetching about data, using default fallback:", error);
        return { data: getDefaultAboutData(lang) };
    }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    const aboutData = await getAboutData(lang);
    const data = aboutData?.data;

    const title = data?.meta_title || (lang === "id" ? "Tentang Kami" : "About Us");
    const description = data?.meta_description || (lang === "id"
        ? "Temukan warisan keunggulan Apollo Global Interactive."
        : "Discover Apollo Global Interactive's legacy of excellence.");

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
                    url: data?.og_image || `${SITE_URL}/og-about.jpg`,
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
    const data = aboutData?.data || getDefaultAboutData(lang);

    return (
        <main className="flex flex-col items-center">
            {/* Header */}
            <div className="w-full">
                <AboutHeader
                    title={data.header.title}
                    subtitle={data.header.subtitle}
                    backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    targetId="our-vision"
                    badge={data.header.badge}
                />
            </div>

            <div className="w-full px-4 md:px-10 mt-[85px]">
                {/* Our Vision */}
                <div id="our-vision" className="scroll-mt-32">
                    <AboutSection
                        tag={data.vision.tag}
                        title={data.vision.title}
                        imageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                        imageAlt="Team collaborating"
                        overlayImageSrc="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                        additionalContent={
                            <>
                                <p className="mt-3 font-semibold text-[#323441]">{data.vision.listTitle}</p>
                                <ul className="mt-2 space-y-[6px]">
                                    {data.vision.points.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5a80b9] text-[10px] text-white">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-4">
                                    {data.vision.footer}
                                </p>
                            </>
                        }
                    >
                        <p>{data.vision.desc}</p>
                    </AboutSection>

                    {/* Our Mission */}
                    <AboutSection
                        tag={data.mission.tag}
                        title={data.mission.title}
                        isReversed
                        imageSrc="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop"
                        imageAlt="Modern architecture looking up"
                        overlayImageSrc="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop"
                        additionalContent={
                            <>
                                <p className="mt-4 font-semibold text-[#323441]">{data.mission.listTitle}</p>
                                <ul className="mt-2 space-y-2">
                                    {data.mission.points.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5a80b9] text-[10px] text-white">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-4">
                                    {data.mission.footer}
                                </p>
                            </>
                        }
                    >
                        <p>{data.mission.desc}</p>
                    </AboutSection>

                    {/* Company History */}
                    <AboutSection
                        tag={data.history.tag}
                        title={data.history.title}
                        imageSrc="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop"
                        imageAlt="Company building"
                        overlayImageSrc="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2670&auto=format&fit=crop"
                        mobileImagePriorToDescription
                    >
                        <p>{data.history.p1}</p>
                        <p className="mt-4">{data.history.p2}</p>
                    </AboutSection>

                    {/* Company Structure */}
                    <CompanyStructure />

                    {/* BOC */}
                    <TeamSection
                        tag={data.commissioners.tag}
                        tagClassName="bg-[#f2f7ff] border border-[#5a80b9]/15 rounded-full px-4 py-1.5 text-[#5a80b9]"
                        title={data.commissioners.title}
                        description={data.commissioners.desc}
                        members={data.commissioners.members}
                    />

                    {/* BOD */}
                    <TeamSection
                        tag={data.directors.tag}
                        tagClassName="bg-[#f2f7ff] border border-[#5a80b9]/15 rounded-full px-4 py-1.5 text-[#5a80b9]"
                        title={data.directors.title}
                        description={data.directors.desc}
                        members={data.directors.members}
                    />
                </div>
            </div>
        </main>
    );
}
