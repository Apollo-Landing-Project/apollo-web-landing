import type { Metadata } from "next";
import { Geist, Geist_Mono, Reddit_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    template: "%s | Apollo Global Interactive",
    default: "Apollo Global Interactive",
  },
  description: "Create Next App",
  icons: {
    icon: "/logo-new.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${redditSans.variable} antialiased bg-[#FFF]`}
      >
        <Navbar />
        <div className="max-w-[1440px] mx-auto min-h-screen pt-24">
          {children}
        </div>
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
