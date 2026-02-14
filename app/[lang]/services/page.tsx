import React from "react";
import AboutHeader from "@/components/AboutHeader";
import ServiceCarousel from "@/components/ServiceCarousel";
import ServiceList from "@/components/ServiceList"; // Import the new component
import { Metadata } from "next";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";

// Helper to generate default data structure
function getDefaultServiceData(lang: string) {
    const isId = lang === "id";
    return {
        meta_title: isId ? "Layanan Kami" : "Our Services",
        meta_description: isId
            ? "Solusi otomotif komprehensif yang disesuaikan untuk Anda."
            : "Comprehensive automotive solutions tailored for you.",
        og_image: "/og-services.jpg",
        title: isId ? "Pelajari Lebih Lanjut Tentang Apollo Global Interactive" : "Learn More About Apollo Global Interactive",
        subtitle: isId
            ? "Solusi otomotif komprehensif yang disesuaikan dengan kebutuhan Anda, mulai dari pembelian hingga perawatan dan seterusnya."
            : "Comprehensive automotive solutions tailored to your needs, from purchasing to maintenance and beyond.",
        badge: isId ? "Layanan Kami" : "Our Services",
        services: [
            {
                id: "1",
                image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2072&auto=format&fit=crop",
                title: isId ? "Penjualan Mobil Baru" : "New Car Sales",
                desc: isId
                    ? "Solusi penjualan dan purna jual yang komprehensif untuk kendaraan Honda baru, dirancang untuk memberikan dukungan handal dan kepuasan pelanggan jangka panjang."
                    : "Comprehensive sales and after-sales service solutions for new Honda vehicles, designed to deliver reliable support and long-term customer satisfaction.",
                location: "Honda Sukun Malang, S. Supriadi Street. No. 19-22 Sukun, Malang - East Java",
                contact: ["(P) +62 341 363499", "(f) +62 341 2995051"],
                email: ["cs@bintangotoglobal.com"],
                quote: isId
                    ? "Untuk informasi lebih lanjut atau pertanyaan, silakan hubungi kami melalui detail yang tersedia di atas."
                    : "For further information or inquiries, please contact us through the details provided above."
            },
            {
                id: "2",
                image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
                title: isId ? "Layanan Rental Mobil" : "Car Rental Services",
                desc: isId
                    ? "Solusi penyewaan mobil yang fleksibel dan andal untuk individu dan bisnis. Pilih dari berbagai kendaraan terawat baik untuk kebutuhan jangka pendek atau panjang, memastikan kenyamanan dan keamanan di setiap perjalanan."
                    : "Flexible and reliable car rental solutions for individuals and businesses. Choose from a wide range of well-maintained vehicles for short-term or long-term needs, ensuring comfort and safety on every journey.",
                location: "Honda Sukun Malang, S. Supriadi Street. No. 19-22 Sukun, Malang - East Java",
                contact: ["(P) +62 341 363499", "(f) +62 341 2995051"],
                email: ["cs@bintangotoglobal.com"],
                quote: isId
                    ? "Untuk informasi lebih lanjut atau pertanyaan, silakan hubungi kami melalui detail yang tersedia di atas."
                    : "For further information or inquiries, please contact us through the details provided above."
            },
            {
                id: "3",
                image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=2080&auto=format&fit=crop",
                title: isId ? "Pusat Servis" : "Service Center",
                desc: isId
                    ? "Layanan perawatan dan perbaikan profesional menggunakan peralatan canggih dan teknisi bersertifikat. Kami memastikan kendaraan Anda beroperasi pada performa terbaiknya dengan standar layanan berkualitas tinggi yang efisien."
                    : "Professional maintenance and repair services utilizing state-of-the-art equipment and certified technicians. We ensure your vehicle performs at its best with efficient, high-quality service standards.",
                location: "Honda Sukun Malang, S. Supriadi Street. No. 19-22 Sukun, Malang - East Java",
                contact: ["(P) +62 341 363499", "(f) +62 341 2995051"],
                email: ["cs@bintangotoglobal.com"],
                quote: isId
                    ? "Untuk informasi lebih lanjut atau pertanyaan, silakan hubungi kami melalui detail yang tersedia di atas."
                    : "For further information or inquiries, please contact us through the details provided above."
            },
            {
                id: "4",
                image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1974&auto=format&fit=crop",
                title: isId ? "Jual Beli Mobil Bekas" : "Used Car Retailer",
                desc: isId
                    ? "Kami menawarkan berbagai pilihan mobil bekas berkualitas tinggi yang telah lulus standar pemeriksaan ketat untuk memastikan keamanan dan kenyamanan. Temukan mobil impian Anda dengan harga kompetitif dan jaminan pembelian kembali yang terpercaya."
                    : "We offer a wide selection of high-quality used cars that have passed rigorous inspection standards to ensure safety and comfort. Find your dream car at competitive prices with our trusted buy-back guarantee.",
                location: "Honda Sukun Malang, S. Supriadi Street. No. 19-22 Sukun, Malang - East Java",
                contact: ["(P) +62 341 363499", "(f) +62 341 2995051"],
                email: ["cs@bintangotoglobal.com"],
                quote: isId
                    ? "Untuk informasi lebih lanjut atau pertanyaan, silakan hubungi kami melalui detail yang tersedia di atas."
                    : "For further information or inquiries, please contact us through the details provided above."
            }
        ],
        usedCarGallery: {
            title: isId ? "Daftar Mobil Yang Tersedia" : "Our Available Used Car Collection",
            desc: isId
                ? "Berikut adalah daftar mobil yang tersedia"
                : "Discover a selection of quality used cars with transparent information to support confident purchasing decisions.",
            items: [
                {
                    id: "04ea0173-bdee-4a13-ab2a-29d66dcbc8a5",
                    image: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-112832064-yej1.jpg",
                    title: "Honda CR-V 1.5L Turbo",
                    desc: isId
                        ? "Sebuah SUV premium yang dirancang untuk kenyamanan keluarga dan performa bertenaga, menawarkan fitur keselamatan canggih dan interior yang lapang untuk setiap perjalanan."
                        : "A premium SUV designed for family comfort and powerful performance, offering advanced safety features and a spacious interior for every journey."
                },
                {
                    id: "75f57484-f422-4a9a-ad9f-b4373d4e0cd4",
                    image: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-112932660-zz7f.jpg",
                    title: "Honda Brio Satya E",
                    desc: isId
                        ? "Dirancang kompak dan efisien untuk mobilitas perkotaan sehari-hari dengan performa responsif dan gaya modern. Menawarkan pengalaman berkendara yang nyaman dan rekayasa yang andal."
                        : "Designed compact and efficient for everyday urban mobility with responsive performance and modern styling. Offers a comfortable driving experience and reliable engineering."
                },
                {
                    id: "c898cb4a-000b-483b-a1ce-59807c2812df",
                    image: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-113029028-0uvp.jpg",
                    title: "Honda Civic Type R",
                    desc: isId
                        ? "Sebuah desain kompak dan efisien untuk mobilitas perkotaan sehari-hari dengan performa responsif dan gaya modern. Menawarkan pengalaman berkendara yang nyaman dan rekayasa yang dapat diandalkan."
                        : "A compact and efficient design for everyday urban mobility with responsive performance and modern styling. Offers a comfortable driving experience and reliable engineering."
                },
                {
                    id: "7ad18c43-34cd-4cee-a629-7714f7e6a15c",
                    image: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-113129615-4wzl.jpg",
                    title: "Honda HR-V SE CVT",
                    desc: isId
                        ? "Sebuah SUV kompak dan bergaya yang memadukan efisiensi dengan desain dinamis, sempurna untuk berkendara di perkotaan dan liburan akhir pekan."
                        : "A compact and stylish SUV that blends efficiency with dynamic design, perfect for urban driving and weekend getaways alike."
                }
            ]
        }
    };
}

// Helper to fetch data
async function getServiceData(lang: string) {
    const token = process.env.API_TOKEN;
    try {
        const data = await dbFetch(`client/service?lang=${lang}`, {
            headers: {
                'Cookie': `token=${token}`
            }
        });

        if (data && data.data) {
            return data;
        }
        throw new Error("Invalid data structure received");
    } catch (error) {
        console.error("Error fetching service data, using default fallback:", error);
        return { data: getDefaultServiceData(lang) };
    }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    // Fetch data for metadata
    const serviceData = await getServiceData(lang);
    const data = serviceData?.data;

    // Console log for testing metadata fetch
    console.log("Creating Metadata for Service Page:", { lang, data });

    // Fallback if fetch fails or data structure doesn't match
    const title = data?.meta_title || (lang === "id" ? "Layanan Kami" : "Our Services");
    const description = data?.meta_description || (lang === "id"
        ? "Solusi otomotif komprehensif yang disesuaikan untuk Anda."
        : "Comprehensive automotive solutions tailored for you.");

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
                    url: data?.og_image || `${SITE_URL}/og-services.jpg`,
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

    // Ensure we have data to work with
    const data = serviceData?.data || getDefaultServiceData(lang);

    // Log data for testing
    // console.log("========================================");
    // console.log(`[ServicePage] Fetching data for lang: ${lang}`);
    // console.log("[ServicePage] Data received:", JSON.stringify(data, null, 2));
    // console.log("========================================");

    return (
        <main className="flex flex-col items-center">
            {/* Header */}
            <div className="w-full">
                <AboutHeader
                    title={data.hero.title}
                    subtitle={data.hero.desc}
                    backgroundImage={data.hero.background}
                    targetId="services-content"
                    badge={data.badge}
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
