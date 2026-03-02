import type { Metadata } from "next";
import { Geist, Geist_Mono, Reddit_Sans } from "next/font/google";
import "../globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const redditSans = Reddit_Sans({
  variable: "--font-reddit-sans",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const baseUrl = "https://apolloglobalinteractive.com";

  const isId = lang === 'id';

  const title = {
    template: isId ? "%s | Apollo Global Interactive" : "%s | Apollo Global Interactive",
    default: isId
      ? "Apollo Global Interactive - Memimpin Masa Depan Otomotif"
      : "Apollo Global Interactive - Leading the Future of Automotive",
  };

  const description = isId
    ? "Apollo Global Interactive adalah perusahaan otomotif terintegrasi terkemuka di Indonesia. Kami menyediakan solusi mobilitas menyeluruh termasuk penjualan mobil baru, perawatan bersertifikat, penyewaan kendaraan, dan mobil bekas berkualitas."
    : "Apollo Global Interactive is Indonesia's premier integrated automotive company. We provide end-to-end mobility solutions including new car sales, certified maintenance, vehicle rental, and quality used cars.";

  return {
    metadataBase: new URL(baseUrl),
    title: title,
    description: description,
    keywords: ["automotive indonesia", "dealer mobil", "showroom honda", "rental mobil", "sewa mobil", "bengkel resmi", "service mobil", "mobil bekas berkualitas", "vehicle logistics", "sustainable mobility", "apollo global interactive", "public company"],
    authors: [{ name: "Apollo Global Interactive" }],
    creator: "Apollo Global Interactive",
    publisher: "Apollo Global Interactive",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: {
        default: title.default,
        template: title.template,
      },
      description: description,
      url: `${baseUrl}/${lang}`,
      siteName: "Apollo Global Interactive",
      images: [
        {
          url: "/assets/home-og.webp",
          width: 1200,
          height: 630,
          alt: "Apollo Global Interactive",
        },
      ],
      locale: isId ? "id_ID" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Apollo Global Interactive",
      description: description,
      images: ["/assets/home-og.webp"],
      creator: "@apollo_global",
    },
    icons: {
      icon: [
        { url: "/assets/favicon.ico" },
        { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/assets/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/assets/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/assets/apple-touch-icon.png" }
      ],
      shortcut: ["/assets/favicon.ico"],
    },
    manifest: "/site.webmanifest",
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        "en-US": `${baseUrl}/en`,
        "id-ID": `${baseUrl}/id`,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${redditSans.variable} antialiased bg-[#FFF]`}
      >
        <Navbar lang={lang} />
        <div className="max-w-[1440px] mx-auto min-h-screen pt-24">
          {children}
        </div>
        <BackToTop />
        <Footer lang={lang} />
      </body>
    </html>
  );
}
