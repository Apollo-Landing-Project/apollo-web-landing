'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, MapPin, ArrowRight, Instagram, Twitter, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const links = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/#about-us' },
        { name: 'Our Services', href: '/services' },
        { name: 'News', href: '/news' },
        { name: 'Investor Relation', href: '/investor-relation' },
        { name: 'Contact Us', href: '/contact' },
    ];

    const socialLinks = [
        { icon: Facebook, href: '#' },
        { icon: Twitter, href: '#' },
        { icon: Instagram, href: '#' },
        { icon: MessageCircle, href: '#' },
    ];

    return (
        <footer className="w-full bg-gradient-to-br from-[#5A80B9] to-[#2D476E] text-white pt-20 pb-8 px-6 md:px-20 relative mt-20">
            <div className="mx-auto max-w-[1440px] flex flex-col gap-16">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">

                    {/* Left Column: CTA */}
                    <div className="flex flex-col gap-6 max-w-md">
                        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                            Committed to Supporting Your Business
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed">
                            Reach out to us for service information, strategic partnerships, or other business-related inquiries.
                        </p>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white text-[#5A80B9] font-medium rounded-full px-8 py-3 w-fit hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            Contact
                        </button>
                    </div>

                    {/* Middle Column: Links & Location */}
                    <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full lg:w-auto">

                        {/* Links */}
                        <div className="flex flex-col gap-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-white/90 hover:text-white hover:translate-x-1 transition-all text-lg font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-6 max-w-xs">
                            <h4 className="text-lg font-medium text-white/80">Our Location</h4>
                            <div className="flex flex-col gap-1 text-white/90 text-lg">
                                <p>S. Supriadi Street. No. 19-22</p>
                                <p>Sukun, Malang - East Java</p>
                            </div>

                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 border border-white/30 rounded-full px-5 py-2.5 w-fit hover:bg-white/10 transition-colors text-white"
                            >
                                <span className="text-sm font-medium">Use Navigation</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Back to Top */}
                    <div className="hidden lg:block">
                        <button
                            onClick={scrollToTop}
                            className="bg-white text-[#5A80B9] flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:bg-[#5A80B9] hover:text-white border border-white cursor-pointer group"
                        >
                            <span>Back To Top</span>
                            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/20" />

                {/* Bottom Section */}
                <div className="flex flex-col-reverse gap-6 items-center text-center">
                    <p className="text-white/80 text-sm md:text-base">
                        © 2017 - {new Date().getFullYear()} PT Apollo Global Interactive Tbk. All Rights Reserved
                    </p>

                    <div className="flex gap-6">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                className="text-white hover:text-white/80 hover:scale-110 transition-all cursor-pointer"
                            >
                                <social.icon className="w-6 h-6" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Mobile Back To Top (Visible only on smaller screens) */}
                <div className="lg:hidden flex justify-center">
                    <button
                        onClick={scrollToTop}
                        className="bg-white/10 text-white backdrop-blur-md border border-white/20 flex items-center gap-2 px-6 py-3 rounded-full font-medium hover:bg-white hover:text-[#5A80B9] transition-all duration-300 cursor-pointer group"
                    >
                        <span>Back To Top</span>
                        <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
