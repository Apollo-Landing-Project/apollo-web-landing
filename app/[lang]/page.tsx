import { Metadata } from "next";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Partners from "@/components/Partners";
import News from "@/components/News";
import Contact from "@/components/Contact";
import { dbFetch } from "@/lib/fetcher";

// Helper to generate default data structure
function getDefaultHomeData(lang: string) {
  const isId = lang === 'id';
  return {
    meta_title: isId ? "Beranda" : "Home",
    meta_description: isId
      ? "Apollo Global Interactive adalah perusahaan otomotif terintegrasi terkemuka di Indonesia. Kami menyediakan solusi mobilitas menyeluruh termasuk penjualan mobil baru, perawatan bersertifikat, penyewaan kendaraan, dan mobil bekas berkualitas."
      : "Apollo Global Interactive is Indonesia's premier integrated automotive company. We provide end-to-end mobility solutions including new car sales, certified maintenance, vehicle rental, and quality used cars.",
    og_image: "/og-home.jpg",
    about: {
      title: isId ? "Tentang Kami" : "About Us",
      desc: isId
        ? "Kami berdedikasi untuk memberikan layanan otomotif terbaik dengan pengalaman bertahun-tahun di industri ini. Komitmen kami terhadap kualitas dan kepuasan pelanggan adalah prioritas utama."
        : "We are dedicated to providing the best automotive services with years of experience in the industry. Our commitment to quality and customer satisfaction is our top priority.",
      yearsExp: "20",
      products: "50",
      countries: "4",
      brands: "15"
    },
    services: {
      title: isId ? "Layanan Kami" : "Our Services",
      desc: isId
        ? "Temukan berbagai layanan otomotif komprehensif yang kami tawarkan untuk memenuhi kebutuhan Anda."
        : "Discover the comprehensive range of automotive services we offer to meet your needs."
    },
    news: {
      title: isId ? "Berita Terbaru" : "Latest News",
      desc: isId
        ? "Ikuti perkembangan terbaru dan wawasan industri dari Apollo Global Interactive."
        : "Stay updated with the latest developments and industry insights from Apollo Global Interactive."
    },
    partners: {
      title: isId ? "Mitra Kami" : "Our Partners",
      desc: isId
        ? "Kami bekerja sama dengan mitra terpercaya untuk memberikan solusi terbaik bagi Anda."
        : "We collaborate with trusted partners to deliver the best solutions for you."
    },
    contact: {
      title: isId ? "Hubungi Kami" : "Contact Us",
      desc: isId
        ? "Hubungi kami untuk pertanyaan produk, kemitraan bisnis, atau informasi umum."
        : "Get in touch with us for product inquiries, business partnerships, or general information.",
      email: "cs@bintangotoglobal.com",
      phone: ["(0341) 8202029"],
      mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15805.161058774029!2d112.6179354!3d-7.9696954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62822063dc2fb%3A0x78879446481a4da2!2sJl.%20S.%20Supriadi%20No.19-22%2C%20Sukun%2C%20Kec.%20Sukun%2C%20Kota%20Malang%2C%20Jawa%20Timur%2065147!5e0!3m2!1sen!2sid"
    }
  };
}

// Helper to fetch data
async function getHomeData(lang: string) {
  const token = process.env.API_TOKEN;
  try {
    const data = await dbFetch(`client/home?lang=${lang}`, {
      headers: {
        'Cookie': `token=${token}`
      }
    });

    // Return data if it exists and has the expected structure, otherwise throw to catch block
    if (data && data.data) {
      return data;
    }
    throw new Error("Invalid data structure received");
  } catch (error) {
    console.error("Error fetching home data, using default fallback:", error);
    // Return default data structure
    return { data: getDefaultHomeData(lang) };
  }
}

import { SITE_URL } from "@/lib/constants";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  // Fetch data for metadata
  const homeData = await getHomeData(lang);
  const data = homeData?.data;

  // Console log for testing metadata fetch
  console.log("Creating Metadata for Home Page:", { lang, data });

  // Fallback if fetch fails or data structure doesn't match
  const title = data?.meta_title || (lang === 'id' ? "Beranda" : "Home");
  const description = data?.meta_description || (lang === 'id'
    ? "Rasakan masa depan mobilitas bersama Apollo Global Interactive. Kami adalah perusahaan otomotif terintegrasi terkemuka yang menyediakan penjualan, layanan, penyewaan, dan suku cadang untuk memenuhi kebutuhan Anda."
    : "Experience the future of mobility with Apollo Global Interactive. We are a leading integrated automotive company providing comprehensive sales, services, rentals, and spare parts solutions tailored to your needs.");

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        'id-ID': `${SITE_URL}/id`,
        'en-US': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: `${title} - Apollo`,
      description: description,
      url: `${SITE_URL}/${lang}`,
      siteName: "Apollo",
      images: [
        {
          url: data?.og_image || `${SITE_URL}/og-home.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      locale: lang === 'id' ? 'id_ID' : 'en_US',
      type: "website",
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // Fetch data server-side
  const homeData = await getHomeData(lang);

  // Ensure we have data to work with (getHomeData now guarantees a return structure)
  const data = homeData?.data || getDefaultHomeData(lang);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero lang={lang} />
      <AboutUs lang={lang} data={data.about} />
      <Services lang={lang} data={data.services} />
      <News lang={lang} data={data.news} />
      <Partners lang={lang} data={data.partners} />
      <Contact lang={lang} data={data.contact} />
    </main>
  );
}
