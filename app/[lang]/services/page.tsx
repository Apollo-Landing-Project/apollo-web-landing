import React from "react";
import AboutHeader from "@/components/AboutHeader";
import ServiceCarousel from "@/components/ServiceCarousel";
import ServiceList from "@/components/ServiceList";
import { Metadata } from "next";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";

// Type definitions matching the API response
interface ServiceItem {
    badge: string;
    id: string;
    image: string;
    order: number;
    title: string;
    desc: string;
    location: string;
    contact: string[];
    email: string[];
    quote: string;
}

interface UsedCarItem {
    id: string;
    image: string;
    title: string;
    desc: string;
}

interface ServicePageData {
    id: string;
    hero: {
        badge: string;
        title: string;
        desc: string;
        background: string;
    };
    services: ServiceItem[];
    usedCarGallery: {
        badge: string;
        title: string;
        desc: string;
        items: UsedCarItem[];
    };
    metadata: {
        title: string;
        description: string;
        og_image: string;
    };
}

// Helper to generate default data structure
function getDefaultServiceData(lang: string): ServicePageData {
    const isId = lang === "id";
    return {
        id: "073bbd55-6523-47ee-ba10-d296d083c781",
        hero: {
            badge: isId ? "Tentang Kami" : "About Us",
            title: isId ? "Pelajari Lebih Lanjut Tentang Apollo Global Interactive" : "Learn More About Apollo Global Interactive",
            desc: isId
                ? "PT Apollo Global Interactive Tbk adalah perusahaan otomotif terintegrasi yang menyediakan solusi dealer, penyewaan mobil, layanan servis, dan ritel mobil bekas melalui sistem layanan terpadu."
                : "PT Apollo Global Interactive Tbk is an integrated automotive company providing dealership, auto rental, auto service, and used car retail solutions through an integrated service system.",
            background: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-105640659-0swf.jpg"
        },
        services: [
            {
                badge: "Service#1",
                id: "df0aa3c0-f719-48a8-a34b-c4e332143e08",
                image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-100314487-zef6.jpg",
                order: 1,
                title: isId ? "Dealer" : "Dealership",
                desc: isId
                    ? "Solusi layanan penjualan dan purna jual yang komprehensif untuk kendaraan baru merek Honda."
                    : "Comprehensive sales and after sales service solutions for Honda brand new vehicles.",
                location: "Honda Sukun Malang, S. Supriadi Street. No. 19-22 Sukun, Malang - East Java",
                contact: [
                    "+62341363499 ",
                    "+623412995051 "
                ],
                email: [
                    "cs@bintangotoglobal.com"
                ],
                quote: isId
                    ? "Untuk informasi lebih lanjut atau pertanyaan, silakan hubungi kami melalui detail yang tersedia di atas."
                    : "For further information or inquiries, please contact us through the details provided above."
            },
            {
                badge: "Service#2",
                id: "d2dfd9a9-a0e1-4837-bca9-fa481199f864",
                image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-100440594-ajmm.jpg",
                order: 2,
                title: isId ? "Penyewaan Mobil" : "Car Rental",
                desc: isId
                    ? "Solusi transportasi lengkap yang disediakan melalui layanan penyewaan kendaraan yang fleksibel dan andal untuk mendukung berbagai kebutuhan mobilitas dan bisnis."
                    : "A complete transportation solution provided through flexible and reliable vehicle rental services to support various mobility and business needs.",
                location: "Honda Sukun Malang, S. Supriadi Street. No. 19-22 Sukun, Malang - East Java",
                contact: [
                    "+62 341 2995051 "
                ],
                email: [
                    "cs@bintangotoglobal.com"
                ],
                quote: isId
                    ? "Untuk informasi lebih lanjut atau pertanyaan, silakan hubungi kami melalui detail yang tersedia di atas."
                    : "For further information or inquiries, please contact us through the details provided above."
            },
            {
                badge: "Service#3",
                id: "6c7ec3f3-d6b2-400a-bc68-0b654a821181",
                image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-100632416-grby.jpg",
                order: 3,
                title: isId ? "Pusat Servis" : "Service center",
                desc: isId
                    ? "Solusi fasilitas perawatan dan perbaikan profesional yang dirancang untuk memastikan keandalan kendaraan, keselamatan, dan kinerja optimal."
                    : "Professional maintenance and repair facility solutions designed to ensure vehicle reliability, safety, and optimal performance.",
                location: "Honda Sukun Malang, S. Supriadi Street. No. 19-22 Sukun, Malang - East Java",
                contact: [
                    "+623412995051 "
                ],
                email: [
                    "cs@bintangotoglobal.com"
                ],
                quote: isId
                    ? "Untuk informasi lebih lanjut atau pertanyaan, silakan hubungi kami melalui detail yang tersedia di atas."
                    : "For further information or inquiries, please contact us through the details provided above."
            },
            {
                badge: "Service#4",
                id: "f599464a-aa6d-4601-8f1f-664bdb02b1fc",
                image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-100649438-m58b.jpg",
                order: 4,
                title: isId ? "Pengecer Mobil Bekas" : "Used Car Retailer",
                desc: isId
                    ? "Solusi komprehensif untuk membeli dan menjual mobil bekas, disampaikan dengan transparansi, keandalan, dan standar penilaian yang terpercaya."
                    : "Comprehensive solutions for buying and selling used cars, delivered with transparency, reliability, and trusted valuation standards.",
                location: "Honda Sukun Malang, S. Supriadi Street. No. 19-22 Sukun, Malang - East Java",
                contact: [
                    "+62 341 2995051 "
                ],
                email: [
                    "cs@bintangotoglobal.com"
                ],
                quote: isId
                    ? "Untuk informasi lebih lanjut atau pertanyaan, silakan hubungi kami melalui detail yang tersedia di atas."
                    : "For further information or inquiries, please contact us through the details provided above."
            }
        ],
        usedCarGallery: {
            badge: isId ? "Galeri Mobil Bekas" : "Used Car Gallery",
            title: isId ? "Koleksi Mobil Bekas Kami yang Tersedia" : "Our Available Used Car Collection",
            desc: isId
                ? "Temukan pilihan mobil bekas berkualitas dengan informasi transparan untuk mendukung keputusan pembelian yang percaya diri."
                : "Discover a selection of quality used cars with transparent information to support confident purchasing decisions.",
            items: [
                {
                    id: "5e74448e-1394-4213-bc44-ee667f8ddb37",
                    image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-105854274-aqd4.jpg",
                    title: "Honda Brio Satya E",
                    desc: isId
                        ? "Dirancang kompak dan efisien untuk mobilitas perkotaan sehari-hari dengan performa responsif dan gaya modern. Menawarkan pengalaman berkendara yang nyaman dan teknik yang handal."
                        : "Designed compact and efficient for everyday urban mobility with responsive performance and modern styling. Offers a comfortable driving experience and reliable engineering."
                },
                {
                    id: "d47cd3b2-d4a7-4162-883a-140b1fb995e7",
                    image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-105956464-297m.jpg",
                    title: "Honda HR-V SE CVT",
                    desc: isId
                        ? "Sebuah SUV kompak dan bergaya yang memadukan efisiensi dengan desain dinamis, sempurna untuk mengemudi di perkotaan dan liburan akhir pekan."
                        : "A compact and stylish SUV that blends efficiency with dynamic design, perfect for urban driving and weekend getaways alike."
                },
                {
                    id: "2a08a9c0-e974-4b25-88c9-26218ad5f759",
                    image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-110053272-d9a4.jpg",
                    title: "Honda CR-V 1.5L Turbo",
                    desc: isId
                        ? "Sebuah SUV premium yang dirancang untuk kenyamanan keluarga dan performa bertenaga, menawarkan fitur keselamatan canggih dan interior yang luas untuk setiap perjalanan."
                        : "A premium SUV designed for family comfort and powerful performance, offering advanced safety features and a spacious interior for every journey."
                },
                {
                    id: "1b333d75-59a9-4cce-ad7d-5bfcda859085",
                    image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-110141664-yrj7.jpg",
                    title: "Honda Civic Type R",
                    desc: isId
                        ? "Sebuah desain kompak dan efisien untuk mobilitas perkotaan sehari-hari dengan performa responsif dan gaya modern. Menawarkan pengalaman berkendara yang nyaman dan teknik yang handal."
                        : "A compact and efficient design for everyday urban mobility with responsive performance and modern styling. Offers a comfortable driving experience and reliable engineering."
                }
            ]
        },
        metadata: {
            title: isId ? "Layanan Kami" : "Our Services",
            description: isId
                ? "Solusi otomotif komprehensif yang disesuaikan untuk Anda. Dari dealer mobil baru dan perawatan bersertifikat hingga penyewaan yang fleksibel dan mobil bekas berkualitas, Apollo memiliki semuanya."
                : "Comprehensive automotive solutions tailored for you. From new car dealerships and certified maintenance to flexible rentals and quality used cars, Apollo has it all.",
            og_image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-105640659-0swf.jpg"
        }
    };
}

// Helper to fetch data
async function getServiceData(lang: string): Promise<{ data: ServicePageData }> {
    const token = process.env.API_TOKEN;
    try {
        const res = await dbFetch(`client/service?lang=${lang}`, {
            headers: {
                'Cookie': `token=${token}`
            },
            next: { tags: ['services', 'home'], revalidate: false }
        });

        if (res && res.data) {
            return res as { data: ServicePageData };
        }
        throw new Error("Invalid data structure received");
    } catch (error) {
        console.error("Error fetching service data:", error);
        throw error;
        // return { data: getDefaultServiceData(lang) };
    }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    // Fetch data for metadata
    const serviceData = await getServiceData(lang);
    const data = serviceData.data;

    // Use metadata from API
    const title = data.metadata?.title || (lang === "id" ? "Layanan Kami" : "Our Services");
    const description = data.metadata?.description || "";
    const ogImage = data.metadata?.og_image || `${SITE_URL}/og-services.jpg`;

    return {
        title: title,
        description: description,
        alternates: {
            canonical: `${SITE_URL}/${lang}/services`,
            languages: {
                'id-ID': `${SITE_URL}/id/services`,
                'en-US': `${SITE_URL}/en/services`,
            },
        },
        openGraph: {
            title: `${title} - Apollo`,
            description: description,
            url: `${SITE_URL}/${lang}/services`,
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

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    // Fetch data server-side
    const serviceData = await getServiceData(lang);
    const data = serviceData.data;

    return (
        <main className="flex flex-col items-center">
            {/* Header */}
            <div className="w-full">
                <AboutHeader
                    title={data.hero.title}
                    subtitle={data.hero.desc}
                    backgroundImage={data.hero.background}
                    targetId="services-content"
                    badge={data.hero.badge}
                />
            </div>

            {/* Service Sections List */}
            <ServiceList services={data.services} lang={lang} />

            {/* Used Cars Carousel */}
            <div className="w-full">
                <ServiceCarousel
                    title={data.usedCarGallery.title}
                    description={data.usedCarGallery.desc}
                    items={data.usedCarGallery.items}
                />
            </div>
        </main>
    );
}
