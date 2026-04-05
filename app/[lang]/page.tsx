import { Metadata } from "next";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Partners from "@/components/Partners";
import HomeInvestor from "@/components/HomeInvestor";
import Contact from "@/components/Contact";
import { dbFetch } from "@/lib/fetcher";
import { SITE_URL } from "@/lib/constants";
import { fallbackHomeData } from "@/lib/fallback-data";
import { fallbackInvestorData } from "@/lib/fallback-investor-data";

// ----------------------------------------------------------------------
// Interfaces (Bentuk Akhir yang Dibutuhkan oleh Komponen UI Utama)
// ----------------------------------------------------------------------
interface HeroItem { id: string; title: string; desc: string; background: string; }
interface ServiceItem { id: string; title: string; desc: string; image: string; }
interface PartnerItem { id: string; name: string; image: string; }

interface HomeData {
  hero: HeroItem[];
  about: { badge: string; title: string; desc: string; yearsExp: number; products: number; countries: number; brands: number; };
  services: { badge: string; title: string; desc: string; serviceItems: ServiceItem[]; };
  investor?: { badge: string; title: string; desc: string; lastReport?: any; shares?: any[]; };
  partners: { badge: string; title: string; desc: string; partnersFunding: PartnerItem[]; partnersInsurance: PartnerItem[]; };
  contact: { title: string; desc: string; email: string[]; phone: string[]; address: string; mapLink: string; };
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
}

// ----------------------------------------------------------------------
// Fallback Adaptor / Mapper
// Menyelaraskan struktur fallback dari fallback-data.ts agar 100% 
// kompatibel dengan komponen UI utama tanpa merusak struktur komponen UI.
// ----------------------------------------------------------------------
function getMappedHomeFallback(): HomeData {
  const fb = fallbackHomeData.data;
  return {
    // Hero sekarang sudah array dari fallback-data.ts
    hero: (fb.hero || []).map(h => ({
      id: h.id,
      title: h.title,
      desc: h.desc,
      background: h.background
    })),
    about: {
      badge: fb.about?.badge || "Tentang Kami",
      title: fb.about?.title || "",
      desc: fb.about?.desc || "",
      yearsExp: fb.about?.yearsExp || 35,
      products: fb.about?.products || 500,
      countries: fb.about?.countries || 50,
      brands: fb.about?.brands || 8
    },
    services: {
      badge: fb.services?.badge || "Layanan Kami",
      title: fb.services?.title || "Apa yang Bisa Kami Lakukan untuk Anda",
      desc: fb.services?.desc || "",
      serviceItems: (fb.services?.serviceItems || []).map(s => ({
        id: s.id,
        title: s.title,
        desc: s.desc,
        image: s.image
      }))
    },
    partners: {
      badge: fb.partners?.badge || "Rekan Kerja Kami",
      title: fb.partners?.title || "Kita Lebih Kuat Bersama Melalui Kolaborasi.",
      desc: fb.partners?.desc || "",
      partnersFunding: (fb.partners?.partnersFunding || []).map(p => ({
        id: p.id,
        name: p.name,
        image: p.image
      })),
      partnersInsurance: (fb.partners?.partnersInsurance || []).map(p => ({
        id: p.id,
        name: p.name,
        image: p.image
      }))
    },
    contact: {
      title: fb.contact?.title || "Apakah Anda punya pertanyaan?",
      desc: fb.contact?.desc || "Hubungi kami untuk pertanyaan produk, kemitraan bisnis, atau informasi umum.",
      email: fb.contact?.email || [],
      phone: fb.contact?.phone || [],
      address: fb.contact?.address || "",
      mapLink: fb.contact?.mapLink || ""
    },
    meta_title: fallbackHomeData.metadata?.title || "Beranda",
    meta_description: fallbackHomeData.metadata?.description || "Rasakan masa depan mobilitas bersama Apollo Global Interactive.",
    og_image: fallbackHomeData.metadata?.og_image || ""
  };
}

// ----------------------------------------------------------------------
// Fetch Logic & Fallback Decision
// Mengembalikan { data, isFallback } untuk mentrigger Override Bahasa
// ----------------------------------------------------------------------
async function fetchHomeContent(lang: string): Promise<{ data: HomeData; isFallback: boolean }> {
  try {
    const res = await dbFetch<{ data: HomeData }>(`client/home?lang=${lang}`, {
      headers: { 'Cookie': `token=${process.env.API_TOKEN || ''}` },
      next: { tags: ['home'], revalidate: false }
    });

    if (!res || !res.data || !res.data.hero) {
      throw new Error("Invalid Home API Response Structure");
    }

    return { data: res.data, isFallback: false };
  } catch (error) {
    console.error(`[SSR] Home fetch failed for lang '${lang}'. Using English/ID fallback.`, error);
    return { data: getMappedHomeFallback(), isFallback: true };
  }
}

async function fetchInvestorContent(lang: string): Promise<{ data: any; isFallback: boolean }> {
  try {
    const res = await dbFetch<{ data: any }>(`client/investor?lang=${lang}`, {
      headers: { 'Cookie': `token=${process.env.API_TOKEN || ''}` },
      next: { tags: ['investor_relation'], revalidate: false }
    });

    if (!res || !res.data) throw new Error("Invalid Investor API Response");
    return { data: res.data, isFallback: false };
  } catch (error) {
    console.warn(`[SSR] Investor fetch failed for lang '${lang}'. Using fallback.`);
    return { data: fallbackInvestorData.data, isFallback: true };
  }
}

// ----------------------------------------------------------------------
// Metadata Generation (SEO-Safe)
// ----------------------------------------------------------------------
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const { data } = await fetchHomeContent(lang); // Tetap resolve SSR

  const title = data.meta_title || "Beranda";
  const desc = data.meta_description || "Apollo Global Interactive Service";

  return {
    title: title,
    description: desc,
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: { 'id-ID': `${SITE_URL}/id`, 'en-US': `${SITE_URL}/en` },
    },
    openGraph: {
      title: `${title} - Apollo`,
      description: desc,
      url: `${SITE_URL}/${lang}`,
      siteName: "Apollo",
      images: [{ url: data.og_image || "/assets/home-og.webp", width: 1200, height: 630 }],
      locale: lang === 'id' ? 'id_ID' : 'en_US',
      type: "website",
    },
  };
}

// ----------------------------------------------------------------------
// Main Page Component
// ----------------------------------------------------------------------
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: pathLang } = await params;

  // 1. Lakukan fetching data secara modular paralel (SEO Safe & Non-blocking)
  const [homeResult, investorResult] = await Promise.all([
    fetchHomeContent(pathLang),
    fetchInvestorContent(pathLang)
  ]);

  const homeData = homeResult.data;
  const investorData = investorResult.data;

  // 2. LOGIC KRITIS: OVERRIDE BAHASA BILA JATUH KE FALLBACK STATIS
  // Jika API gagal, kita paksakan client menggunakan bahasa 'id' di JSX, 
  // mengabaikan prefix URL (/en) user sat ini.
  const isGlobalFallback = homeResult.isFallback || investorResult.isFallback;
  const activeLang = isGlobalFallback ? 'id' : pathLang;

  // 3. Safety Check: Merajut data investor jika parsial
  const safeInvestor = homeData.investor || {
    badge: "Hubungan Investor",
    title: "Informasi Investor Terkini",
    desc: "Akses informasi terbaru kinerja dan pelaporan kami.",
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* activeLang memaksa UI Components menjadi "id" jika isFallback === true */}

      {homeData.hero && <Hero lang={activeLang} data={homeData.hero} />}

      {homeData.about && <AboutUs lang={activeLang} data={homeData.about} />}

      {homeData.services && <Services lang={activeLang} data={homeData.services} />}

      <HomeInvestor
        lang={activeLang}
        data={{
          ...safeInvestor,
          lastReport: investorData?.report?.reportItems?.[0] || null,
          shares: investorData?.stakeholders?.shares || []
        }}
      />

      {homeData.partners && <Partners lang={activeLang} data={homeData.partners} />}

      {homeData.contact && <Contact lang={activeLang} data={homeData.contact} />}
    </main>
  );
}
