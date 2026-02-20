"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
    {
        code: "id",
        label: "Bahasa Indonesia",
        shortLabel: "Ind",
        flag: "https://flagcdn.com/w40/id.png",
    },
    {
        code: "en",
        label: "English",
        shortLabel: "Eng",
        flag: "https://flagcdn.com/w40/gb.png",
    },
];

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Investor Relations", href: "/investor-relation" },
    { name: "Contact Us", href: "/#contact" },
];

export default function Navbar({ lang = "en" }: { lang?: string }) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const langRef = useRef<HTMLDivElement>(null);

    const isId = lang === "id";

    // Dynamic Navigation Links
    const navLinks = [
        { name: isId ? "Beranda" : "Home", href: "/" },
        { name: isId ? "Tentang Kami" : "About Us", href: "/about" },
        { name: isId ? "Layanan Kami" : "Our Services", href: "/services" },
        { name: isId ? "Hubungan Investor" : "Investor Relations", href: "/investor-relation" },
        { name: isId ? "Hubungi Kami" : "Contact Us", href: "/#contact" },
    ];

    // Current Language Display
    const currentLang = languages.find(l => l.code === lang) || languages[1];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ... scroll observer effect ...

    const getSwitchedPath = (newLang: string) => {
        if (!pathname) return `/${newLang}`;
        const segments = pathname.split('/').filter(Boolean);
        if (segments.length === 0) return `/${newLang}`;

        // If first segment is a lang code, replace it
        if (['en', 'id'].includes(segments[0])) {
            segments[0] = newLang;
        } else {
            // Should not happen with middleware, but fallback prepending
            segments.unshift(newLang);
        }
        return `/${segments.join('/')}`;
    };


    // Intersection Observer for Active Section on Home Page
    useEffect(() => {
        if (pathname !== "/") {
            setActiveSection("");
            return;
        }

        const sections = ["home", "about-us", "services", "news", "contact"];
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -50% 0px", // Adjust to trigger when section is properly in view
            threshold: 0.2
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [pathname]);

    const isActiveLink = (link: typeof navLinks[0]) => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const currentLang = pathSegments[0] || 'id';

        // pathWithoutLang logic:
        // if pathname is /en/about -> segments: ['en', 'about'] -> slice(1) -> ['about'] -> /about
        // if pathname is /en -> segments: ['en'] -> slice(1) -> [] -> /
        const pathRest = pathSegments.slice(1);
        const pathWithoutLang = pathRest.length > 0 ? '/' + pathRest.join('/') : '/';

        // 1. Special case for CSR subpages removed along with News

        // 2. Home Page Scroll Logic
        // This applies when we are EXACTLY at the language root (e.g. /en or /id)
        if (pathWithoutLang === '/') {
            if (link.href === "/" && activeSection === "home") return true;
            if (link.href === "/about" && activeSection === "about-us") return true;
            if (link.href === "/services" && activeSection === "services") return true;
            if (link.href === "/#contact" && activeSection === "contact") return true;

            // If just on home and no active section (top of page), highlight Home
            if (link.href === "/" && !activeSection) return true;

            return false;
        }

        // 3. Standard Page Matching (e.g. /en/about vs link /about)
        // Check exact match of the path part
        return pathWithoutLang === link.href;
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 right-0 h-32 z-40 pointer-events-none"
                style={{
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)'
                }}
            />
            <nav className="fixed top-6 left-0 right-0 z-50 px-4 md:px-10">
                <div className="mx-auto max-w-[1440px]">
                    <div className="flex h-[72px] items-center justify-between rounded-full border border-gray-100 bg-[#fdfdfd] px-6 py-2 shadow-[0px_2px_12px_0px_rgba(112,109,109,0.12)] md:px-8">
                        {/* Logo */}
                        <Link href={`/${lang}`} className="flex items-center shrink-0">
                            <div className="relative h-10 w-24 md:w-32">
                                <Image
                                    src="/logo-new.png"
                                    alt="Apollo Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
                            {navLinks.map((link) => {
                                const langPath = pathname.split('/')[1] || 'en';
                                const href = link.href === "/" ? `/${langPath}` : `/${langPath}${link.href}`;
                                return (
                                    <Link
                                        key={link.name}
                                        href={href}
                                        className={`relative py-1 text-[16px] font-medium transition-colors hover:text-[#5a80b9] ${isActiveLink(link)
                                            ? "text-[#5a80b9] after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-[#5a80b9]"
                                            : "text-[#323441]"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Section: Language Dropdown & Mobile Menu */}
                        <div className="flex items-center gap-4">
                            {/* Language Dropdown */}
                            <div className="relative" ref={langRef}>
                                <button
                                    onClick={() => setIsLangOpen(!isLangOpen)}
                                    className="cursor-pointer flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 transition-all hover:bg-gray-50 md:px-4"
                                >
                                    <div className="relative h-6 w-6 overflow-hidden rounded-full border border-gray-100">
                                        <Image
                                            src={currentLang.flag}
                                            alt={currentLang.label}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="hidden text-[16px] font-medium text-[#323441] sm:inline">
                                        {currentLang.shortLabel}
                                    </span>
                                    <svg
                                        className={`h-4 w-4 text-gray-500 transition-transform ${isLangOpen ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {isLangOpen && (
                                    <div className=" absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                                        {languages.map((langOption) => (
                                            <Link
                                                key={langOption.code}
                                                href={getSwitchedPath(langOption.code)}
                                                onClick={() => {
                                                    setIsLangOpen(false);
                                                }}
                                                className="cursor-pointer flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                                            >
                                                <div className="relative h-6 w-8 overflow-hidden rounded-sm">
                                                    <Image
                                                        src={langOption.flag}
                                                        alt={langOption.label}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="text-[15px] font-medium text-[#323441]">
                                                    {langOption.label}
                                                </span>
                                                {currentLang.code === langOption.code && (
                                                    <svg
                                                        className="ml-auto h-4 w-4 text-[#5a80b9]"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>


                            <motion.button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 lg:hidden"
                                whileTap={{ scale: 0.9 }}
                            >
                                <motion.div
                                    className="flex flex-col gap-[5px] items-center justify-center w-6"
                                    animate={isMenuOpen ? "open" : "closed"}
                                >
                                    <motion.span
                                        className="w-5 h-[2px] bg-[#323441] rounded-full origin-center"
                                        variants={{
                                            closed: { rotate: 0, y: 0 },
                                            open: { rotate: 45, y: 7 }
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />
                                    <motion.span
                                        className="w-5 h-[2px] bg-[#323441] rounded-full"
                                        variants={{
                                            closed: { opacity: 1 },
                                            open: { opacity: 0 }
                                        }}
                                        transition={{ duration: 0.2 }}
                                    />
                                    <motion.span
                                        className="w-5 h-[2px] bg-[#323441] rounded-full origin-center"
                                        variants={{
                                            closed: { rotate: 0, y: 0 },
                                            open: { rotate: -45, y: -7 }
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />
                                </motion.div>
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                animate={{ opacity: 1, height: "auto", scale: 1 }}
                                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="mt-4 overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-xl lg:hidden"
                            >
                                <div className="flex flex-col gap-2">
                                    {navLinks.map((link, i) => {
                                        const langPath = pathname.split('/')[1] || 'en';
                                        const href = link.href === "/" ? `/${langPath}` : `/${langPath}${link.href}`;

                                        return (
                                            <motion.div
                                                key={link.name}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 + 0.1 }}
                                            >
                                                <Link
                                                    href={href}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className={`block w-full rounded-xl px-4 py-3 text-[16px] font-medium transition-colors ${isActiveLink(link)
                                                        ? "bg-[#5a80b9]/10 text-[#5a80b9]"
                                                        : "text-[#323441] hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {link.name}
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
        </>
    );
}
