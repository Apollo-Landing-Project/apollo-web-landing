"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
    { name: "Investor Relations", href: "/investor-relations" },
    { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
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
                                className={`relative py-1 text-[16px] font-medium transition-colors hover:text-[#5a80b9] ${link.name === "Home"
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
                                className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 transition-all hover:bg-gray-50 md:px-4"
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
                                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setCurrentLang(lang);
                                                setIsLangOpen(false);
                                            }}
                                            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
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

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 lg:hidden"
                        >
                            {isMenuOpen ? (
                                <svg
                                    className="h-6 w-6 text-[#323441]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6 text-[#323441]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="mt-4 overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-xl lg:hidden">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`rounded-xl px-4 py-3 text-[16px] font-medium transition-colors ${link.name === "Home"
                                        ? "bg-[#5a80b9]/10 text-[#5a80b9]"
                                        : "text-[#323441] hover:bg-gray-50"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
