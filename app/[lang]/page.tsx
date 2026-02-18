import { Metadata } from "next";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Partners from "@/components/Partners";
import News from "@/components/News";
import Contact from "@/components/Contact";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";

// Interfaces for API Response
interface HeroItem {
  id: string;
  title: string;
  desc: string;
  background: string;
}

interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  image: string;
}

interface PartnerItem {
  id: string;
  name: string;
  image: string;
}

interface HomeData {
  hero: HeroItem[];
  about: {
    badge: string;
    title: string;
    desc: string;
    yearsExp: number;
    products: number;
    countries: number;
    brands: number;
  };
  services: {
    badge: string;
    title: string;
    desc: string;
    serviceItems: ServiceItem[];
  };
  news: {
    badge: string;
    title: string;
    desc: string;
    newsItems: any[]; // Using any[] as we use local data for items
  };
  partners: {
    badge: string;
    title: string;
    desc: string;
    partnersFunding: PartnerItem[];
    partnersInsurance: PartnerItem[];
  };
  contact: {
    title: string;
    desc: string;
    email: string[];
    phone: string[];
    address: string;
    mapLink: string;
  };
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
}

// Fallback Data
function getDefaultHomeData(lang: string): HomeData {
  const isId = lang === 'id';

  return {
    hero: [
      {
        id: "3bc6c347-7178-425f-ba4e-2b166305d974",
        title: isId ? "Terpadu Otomotif, \nSolusi Layanan" : "Integrated Automotive, \nService Solutions.",
        desc: isId ? "Kami menyediakan solusi otomotif terpadu yang mencakup penjualan kendaraan, layanan rental, pemeliharaan, dan operasional mobil bekas untuk mendukung pertumbuhan bisnis yang berkelanjutan." : "We provide integrated automotive solutions encompassing vehicle sales, rental services, maintenance, and used car operations to support sustainable business growth.",
        background: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-094755157-eh4l.jpg"
      },
      {
        id: "66530cef-da43-4119-afac-f1ad59d5e8e1",
        title: isId ? "Terpadu Otomotif, \nSolusi Layanan." : "Integrated Automotive, \nService Solutions.",
        desc: isId ? "Teknisi bersertifikat kami memastikan kendaraan Anda tetap dalam kondisi prima dengan layanan perawatan dan perbaikan menyeluruh yang dirancang untuk keandalan." : "Our certified technicians ensure your vehicles remain in peak condition with comprehensive maintenance and repair services designed for reliability.",
        background: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-094755174-0to1.jpg"
      },
      {
        id: "c22a90a7-eba9-4397-a464-91d1679b7ff5",
        title: isId ? "Pilihan Premium, \nKualitas Tiada Tanding." : "Premium Selection,\nUnmatched Quality.",
        desc: isId ? "Telusuri koleksi lengkap kendaraan bekas bersertifikat dan baru kami. Kami menjamin kualitas dan transparansi di setiap transaksi." : "Browse our extensive collection of certified used and new vehicles. We guarantee quality and transparency in every transaction.",
        background: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-094755176-25ke.jpg"
      }
    ],
    about: {
      badge: isId ? "Tentang Kami" : "About Us",
      title: isId ? "Apa itu Apollo Global Interactive?" : "What’s Apollo Global Interactive?",
      desc: isId
        ? "PT Apollo Global Interactive adalah perusahaan otomotif terpadu yang memiliki lini bisnis dealer, penyewaan mobil, layanan otomotif, dan pengecer mobil bekas. Dengan sistem layanan terintegrasi yang didukung oleh tim manajemen berpengalaman di bidang otomotif.\r\n\r\nKami berkomitmen untuk memberikan solusi otomotif yang andal, efisien, dan berkelanjutan yang menciptakan nilai jangka panjang bagi pelanggan dan pemangku kepentingan."
        : "PT Apollo Global Interactive is an integrated automotive company that has a business line of the dealership, auto rental, auto service, and used car retailers. With an integrated service system supported by an experienced management team in the automotive field.\r\n\r\nWe’re committed to delivering reliable, efficient, and sustainable automotive solutions that create long-term value for customers and stakeholders.",
      yearsExp: 35,
      products: 500,
      countries: 50,
      brands: 8
    },
    services: {
      badge: isId ? "Layanan Kami" : "Our Services",
      title: isId ? "Apa yang Bisa Kami Lakukan untuk Anda" : "What We Can Do for You",
      desc: isId
        ? "Kami menyediakan solusi otomotif di bidang penjualan, penyewaan, layanan, dan operasi mobil bekas, dengan fokus pada efisiensi, keandalan, dan nilai jangka panjang."
        : "We deliver automotive solutions across sales, rental, service, and used car operations, focused on efficiency, reliability, and long-term value.",
      serviceItems: [
        {
          id: "df0aa3c0-f719-48a8-a34b-c4e332143e08",
          title: isId ? "Dealer mobil" : "Dealership",
          desc: isId ? "Solusi layanan penjualan dan purna jual komprehensif untuk kendaraan baru merek Honda." : "Comprehensive sales and after sales service solutions for Honda brand new vehicles.",
          image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-100314487-zef6.jpg"
        },
        {
          id: "d2dfd9a9-a0e1-4837-bca9-fa481199f864",
          title: isId ? "Penyewaan Mobil" : "Car Rental",
          desc: isId ? "Solusi transportasi lengkap yang disediakan melalui layanan sewa kendaraan yang fleksibel dan andal untuk mendukung berbagai kebutuhan mobilitas dan bisnis." : "A complete transportation solution provided through flexible and reliable vehicle rental services to support various mobility and business needs.",
          image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-100440594-ajmm.jpg"
        },
        {
          id: "6c7ec3f3-d6b2-400a-bc68-0b654a821181",
          title: isId ? "Pusat Perbaikan" : "Service center",
          desc: isId ? "Solusi fasilitas perawatan dan perbaikan profesional yang dirancang untuk memastikan keandalan, keselamatan, dan kinerja optimal kendaraan." : "Professional maintenance and repair facility solutions designed to ensure vehicle reliability, safety, and optimal performance.",
          image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-100632416-grby.jpg"
        },
        {
          id: "f599464a-aa6d-4601-8f1f-664bdb02b1fc",
          title: isId ? "Pedagang Mobil Bekas" : "Used Car Retailer",
          desc: isId ? "Solusi komprehensif untuk membeli dan menjual mobil bekas, disampaikan dengan transparansi, keandalan, dan standar penilaian yang terpercaya." : "Comprehensive solutions for buying and selling used cars, delivered with transparency, reliability, and trusted valuation standards.",
          image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-100649438-m58b.jpg"
        }
      ]
    },
    news: {
      badge: isId ? "Berita" : "News",
      title: isId ? "Berita Terbaru" : "Latest News",
      desc: isId
        ? "Tetap mendapat informasi dengan pembaruan terbaru dari perusahaan kami, termasuk inovasi produk, proses manufaktur, wawasan industri, dan pencapaian penting."
        : "Stay informed with the latest updates from our company, including product innovations, manufacturing, industry insights, and milestones",
      newsItems: []
    },
    partners: {
      badge: isId ? "Rekan Kerja Kami" : "Our Partners",
      title: isId ? "Kita Lebih Kuat Bersama Melalui Kolaborasi." : "We’re Stronger Together Through Collaboration.",
      desc: isId
        ? "Kami membangun kemitraan strategis yang memperkuat kapabilitas kami serta pertumbuhan berkelanjutan jangka panjang."
        : "We build strategic partnerships that strengthen our capabilities and sustainable, long-term growth.",
      partnersFunding: [
        {
          id: "91f5607f-ef4c-4b11-b212-36e8ba890157",
          name: "BCA Finance",
          image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-101645285-q8ys.jpg"
        }
      ],
      partnersInsurance: [
        {
          id: "e1daacca-0058-47e1-87e7-71deb6586bcd",
          name: "Fairfax",
          image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-101620588-ofx6.jpg"
        }
      ]
    },
    contact: {
      title: isId ? "Apakah Anda punya pertanyaan?" : "Do You Have Any Question?",
      desc: isId ? "Hubungi kami untuk pertanyaan produk, kemitraan bisnis, atau informasi umum." : "Get in touch with us for product inquiries, business partnerships, or general information.",
      email: ["cs@bintangotoglobal.com"],
      phone: ["+62 341 363499", "+62 341 2995051"],
      address: "S. Supriadi Street. No. 19-22 Sukun, Malang - East Java",
      mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7933.026174190804!2d106.88217995!3d-6.195829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4935b098709%3A0x60dc669208f8fdbb!2sRawamangun%2C%20Kec.%20Pulo%20Gadung%2C%20Kota%20Jakarta%20Timur%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1770298058584!5m2!1sid!2sid"
    },
    meta_title: isId ? "Beranda" : "Home",
    meta_description: isId
      ? "Rasakan masa depan mobilitas bersama Apollo Global Interactive. Kami adalah perusahaan otomotif terintegrasi terkemuka yang menyediakan penjualan, layanan, penyewaan, dan suku cadang untuk memenuhi kebutuhan Anda."
      : "Experience the future of mobility with Apollo Global Interactive. We are a leading integrated automotive company providing comprehensive sales, services, rentals, and spare parts solutions tailored to your needs.",
    og_image: "https://api.apolloglobalinteractive.com/storage/images/image-20260215-094755157-eh4l.jpg"
  };
}

// Fetch Helper
async function getHomeData(lang: string): Promise<{ data: HomeData }> {
  const token = process.env.API_TOKEN;
  try {
    const res = await dbFetch(`client/home?lang=${lang}`, {
      headers: {
        'Cookie': `token=${token}`
      },
      next: { tags: ['home'], revalidate: false } // Revalidate on-demand using 'home' tag
    });

    if (res && res.data) {
      // Cast the response data to match our interface, ensuring minimal compatibility
      return res as { data: HomeData };
    }
    throw new Error("Invalid data structure");
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
    // return { data: getDefaultHomeData(lang) };
  }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const homeData = await getHomeData(lang);
  const data = homeData.data;
  console.log(data);
  // Metadata mapping from API data
  const title = data.meta_title || (lang === 'id' ? "Beranda" : "Home");
  const description = data.meta_description || getDefaultHomeData(lang).meta_description;

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
          url: data.og_image || "/assets/home-og.webp",
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
  const homeData = await getHomeData(lang);

  const data = homeData.data;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero lang={lang} data={data.hero} />
      <AboutUs lang={lang} data={data.about} />
      <Services lang={lang} data={data.services} />
      <News lang={lang} data={data.news} />
      <Partners lang={lang} data={data.partners} />
      <Contact lang={lang} data={data.contact} />
    </main>
  );
}
