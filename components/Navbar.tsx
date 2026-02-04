"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
    {
        code: "en",
        label: "English",
        shortLabel: "Eng",
        flag: "https://flagcdn.com/w40/gb.png",
    },
    {
        code: "id",
        label: "Bahasa Indonesia",
        shortLabel: "Ind",
        flag: "https://flagcdn.com/w40/id.png",
    },
];

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "News", href: "/news" },
    { name: "Investor Relations", href: "/investor-relation" },
    { name: "Contact Us", href: "/#contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(languages[0]);
    const langRef = useRef<HTMLDivElement>(null);

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
                        <Link href="/" className="flex items-center shrink-0">
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
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative py-1 text-[16px] font-medium transition-colors hover:text-[#5a80b9] ${pathname === link.href
                                        ? "text-[#5a80b9] after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-[#5a80b9]"
                                        : "text-[#323441]"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
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
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setCurrentLang(lang);
                                                    setIsLangOpen(false);
                                                }}
                                                className="cursor-pointer flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                                            >
                                                <div className="relative h-6 w-8 overflow-hidden rounded-sm">
                                                    <Image
                                                        src={lang.flag}
                                                        alt={lang.label}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="text-[15px] font-medium text-[#323441]">
                                                    {lang.label}
                                                </span>
                                                {currentLang.code === lang.code && (
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
                                            </button>
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
                                    {navLinks.map((link, i) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 + 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`block w-full rounded-xl px-4 py-3 text-[16px] font-medium transition-colors ${pathname === link.href
                                                    ? "bg-[#5a80b9]/10 text-[#5a80b9]"
                                                    : "text-[#323441] hover:bg-gray-50"
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
        </>
    );
}
