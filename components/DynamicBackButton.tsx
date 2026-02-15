"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface DynamicBackButtonProps {
    lang: string;
    fallbackUrl?: string; // Optional fallback if history is empty (though hard to detect)
    className?: string; // Allow custom styling
}

export default function DynamicBackButton({ lang, fallbackUrl = `/${lang}/news`, className }: DynamicBackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        // Simple back navigation
        router.back();
    };

    return (
        <button
            onClick={handleBack}
            className={className || "inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#d1d1d6] px-4 py-3 text-sm font-semibold text-[#323441] transition-colors hover:bg-gray-50 cursor-pointer"}
        >
            <ArrowLeft className="h-5 w-5" />
            {lang === 'id' ? "Kembali" : "Back"}
        </button>
    );
}
