"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Phone, ExternalLink, Send, CircleCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        question: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSending, setIsSending] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Map Iframe URL for "S. Supriadi Street. No. 19-22 Sukun, Malang - East Java"
    const googleMapsUrl =
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2164.2129535109407!2d112.61978966442776!3d-7.996287774128306!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e788350dbe153db%3A0xafa7ffa78cff0f77!2sHonda%20Sukun%20Malang%20(Official)!5e0!3m2!1sen!2sid!4v1769943996528!5m2!1sen!2sid"
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!formData.email.trim()) newErrors.email = "Email Address is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = "Invalid email address";
        if (!formData.subject.trim()) newErrors.subject = "Subject/Phone is required";
        if (!formData.question.trim()) newErrors.question = "Question is required";
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSending(true);

        // Simulate sending email
        const mailtoLink = `mailto:andisantoso491@gmail.com?subject=ContactForm: ${formData.subject}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0A${formData.question}`;

        // In a real app, we'd use an API route. Here we simulate delay + success.
        setTimeout(() => {
            setIsSending(false);
            setShowSuccess(true);
            setFormData({ name: "", email: "", subject: "", question: "" });

            // Ideally trigger the mailto or use a service
            window.location.href = mailtoLink;

            setTimeout(() => setShowSuccess(false), 5000);
        }, 1500);
    };

    return (
        <section id="contact" className="relative w-full bg-white px-4 py-16 md:px-10 md:py-24 scroll-mt-24">
            {/* Success Notification */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ y: -100, x: "-50%", opacity: 0 }}
                        animate={{ y: 0, x: "-50%", opacity: 1 }}
                        exit={{ y: -100, x: "-50%", opacity: 0 }}
                        className="fixed left-1/2 top-10 z-[100] flex items-center gap-3 rounded-full bg-green-50 px-6 py-3 shadow-[0px_4px_24px_rgba(0,0,0,0.12)] border border-green-200 text-green-700"
                    >
                        <div className="flex bg-green-500 rounded-full p-1">
                            <CircleCheck className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium">Message sent successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mx-auto flex max-w-[1440px] flex-col gap-12 lg:flex-row">
                {/* Left: Contact Form */}
                <div className="flex-1">
                    <div className="mb-10 flex flex-col gap-4">
                        <h2 className="text-4xl font-semibold leading-tight text-[#323441] md:text-5xl">
                            Do You Have Any Question?
                        </h2>
                        <p className="text-lg text-[#323441]/80 max-w-[600px]">
                            Get in touch with us for product inquiries, business partnerships, or general information.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0px_2px_12px_rgba(0,0,0,0.06)] md:p-10">
                        {/* Name */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-semibold text-[#323441]">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className={`w-full rounded-2xl border bg-white px-4 py-3 placeholder-gray-400 outline-none transition-all focus:border-[#5a80b9] focus:ring-1 focus:ring-[#5a80b9] ${errors.name ? "border-red-500" : "border-gray-200"
                                    }`}
                            />
                            {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-semibold text-[#323441]">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                                className={`w-full rounded-2xl border bg-white px-4 py-3 placeholder-gray-400 outline-none transition-all focus:border-[#5a80b9] focus:ring-1 focus:ring-[#5a80b9] ${errors.email ? "border-red-500" : "border-gray-200"
                                    }`}
                            />
                            {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                        </div>

                        {/* Subject (Design says "Email Subject" but placeholder is 08xx phone, user context is mixed. Using generic Subject input but can be phone too) */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="subject" className="text-sm font-semibold text-[#323441]">
                                Email Subject <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="08xxxxxxxxxx"
                                className={`w-full rounded-2xl border bg-white px-4 py-3 placeholder-gray-400 outline-none transition-all focus:border-[#5a80b9] focus:ring-1 focus:ring-[#5a80b9] ${errors.subject ? "border-red-500" : "border-gray-200"
                                    }`}
                            />
                            {errors.subject && <span className="text-xs text-red-500">{errors.subject}</span>}
                        </div>

                        {/* Question */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="question" className="text-sm font-semibold text-[#323441]">
                                Question <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="question"
                                name="question"
                                value={formData.question}
                                onChange={handleChange}
                                placeholder="Tell us your question ..."
                                rows={4}
                                className={`w-full resize-none rounded-2xl border bg-white px-4 py-3 placeholder-gray-400 outline-none transition-all focus:border-[#5a80b9] focus:ring-1 focus:ring-[#5a80b9] ${errors.question ? "border-red-500" : "border-gray-200"
                                    }`}
                            />
                            {errors.question && <span className="text-xs text-red-500">{errors.question}</span>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSending}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#5a80b9] py-4 text-base font-medium text-white transition-colors hover:bg-[#4a6d9e] disabled:bg-[#5a80b9]/70 disabled:cursor-not-allowed"
                        >
                            {isSending ? "Sending..." : "Send"}
                        </button>
                    </form>
                </div>

                {/* Right: Info & Map */}
                <div className="flex flex-1 flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-semibold text-[#323441] md:text-[28px]">
                            PT Apollo Global Interactive
                        </h3>
                        <a href="mailto:cs@bintangotoglobal.com" className="flex items-center gap-3 text-[#5A5A5A] transition-colors hover:text-[#5a80b9]">
                            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#5a80b9]/10">
                                <Mail className="h-4 w-4 text-[#5a80b9]" />
                            </div>
                            <span>cs@bintangotoglobal.com</span>
                        </a>
                        <div className="flex items-center gap-3 text-[#5A5A5A]">
                            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#5a80b9]/10">
                                <Phone className="h-4 w-4 text-[#5a80b9]" />
                            </div>
                            <span>(P) <a href="tel:+62341363499" className="text-[#5a80b9] hover:underline">+62 341 363499</a> or (f) <a href="tel:+623412995051" className="text-[#5a80b9] hover:underline">+62 341 2995051</a></span>
                        </div>
                    </div>

                    <div className="relative h-[640px] w-full overflow-hidden rounded-[32px] shadow-[0px_4px_24px_rgba(0,0,0,0.08)]">
                        <iframe
                            src={googleMapsUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 h-full w-full"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
