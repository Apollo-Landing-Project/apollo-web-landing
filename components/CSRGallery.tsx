"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const galleryImages = [
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
];

export default function CSRGallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Disable body scroll when modal is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [selectedImage]);

    return (
        <section className="w-full py-12 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
                <div className="max-w-xl">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-[#5a80b9] uppercase bg-[#f2f7ff] rounded-full">
                        Gallery
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#323441]">
                        Activity Documentation
                    </h2>
                </div>
                <p className="text-gray-500 text-base md:text-lg max-w-sm text-left md:text-right">
                    Capturing moments of sharing, caring, and community empowerment.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {galleryImages.map((src, index) => (
                    <motion.div
                        key={index}
                        layoutId={`gallery-item-${index}`}
                        onClick={() => setSelectedImage(src)}
                        className="group relative aspect-square w-full overflow-hidden rounded-2xl cursor-pointer bg-gray-100"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Image
                            src={src}
                            alt={`CSR Activity ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ZoomIn className="text-white w-8 h-8" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            layoutId={`selected-image`}
                            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center pointer-events-none"
                        >
                            <div className="relative w-full h-full pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                                <Image
                                    src={selectedImage}
                                    alt="Selected view"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
