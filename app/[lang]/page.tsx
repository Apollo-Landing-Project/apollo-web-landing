import { Metadata } from "next";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Partners from "@/components/Partners";
import News from "@/components/News";
import Contact from "@/components/Contact";
import { dbFetch } from "@/lib/fetcher";

// Helper to fetch data
async function getHomeData(lang: string) {
  const token = process.env.API_TOKEN;
  try {
    const data = await dbFetch(`client/home?lang=${lang}`, {
      headers: {
        'Cookie': `token=${token}`
      }
    });
    return data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null;
  }
}

import { SITE_URL } from "@/lib/constants";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  // Fetch data for metadata
  const data = await getHomeData(lang);

  // Console log for testing metadata fetch
  console.log("Creating Metadata for Home Page:", { lang, data });

  // Fallback if fetch fails or data structure doesn't match
  const title = data?.data?.meta_title || (lang === 'id' ? "Beranda" : "Home");
  const description = data?.data?.meta_description || (lang === 'id'
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
          url: data?.data?.og_image || `${SITE_URL}/og-home.jpg`,
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
  console.log(homeData.data);

  // // Log data for testing
  // console.log("========================================");
  // console.log(`[HomePage] Fetching data for lang: ${lang}`);
  // console.log("[HomePage] Data received:", JSON.stringify(homeData, null, 2));
  // console.log("========================================");

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* 
        Pass data to components as needed.
        Currently using existing components without passing data prop, 
        assuming they will be updated later or fetch their own data.
        For now, the request was specifically about fetching on page level.
       */}
      <Hero lang={lang} />
      <AboutUs lang={lang} data={homeData.data.about} />
      <Services lang={lang} data={homeData.data.services} />
      <News lang={lang} data={homeData.data.news} />
      <Partners lang={lang} data={homeData.data.partners} />
      <Contact lang={lang} data={homeData.data.contact} />
    </main>
  );
}
