import { Car, Key, Wrench } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CompanyStructureItem {
    id: string;
    name: string;
    icon: string;
}

interface CompanyStructureProps {
    badge?: string;
    title?: string;
    description?: string;
    items?: CompanyStructureItem[];
}

export default function CompanyStructure({
    badge = "Company Structural",
    title = "See Our Company Structure",
    description,
    items = []
}: CompanyStructureProps) {
    const departments = [
        {
            name: "Dealership",
            icon: Car,
        },
        {
            name: "Auto Rental",
            icon: Key,
        },
        {
            name: "Auto Service",
            icon: Wrench,
        },
    ];
    return (
        <section className="w-full py-12 md:py-20">
            <div className="flex flex-col items-center text-center px-4">
                <span className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#5a80b9]">
                    {badge}
                </span>
                <h2 className="mb-4 text-3xl font-bold text-[#323441] md:text-4xl">
                    {title}
                </h2>
                {description && (
                    <p className="mb-10 max-w-2xl text-base text-gray-600 md:text-lg">
                        {description}
                    </p>
                )}

                {/* Structure Container */}
                <div className="relative w-full max-w-6xl">
                    {/* Parent Node (Logo) */}
                    <div className="flex flex-col items-center">
                        <div className="relative h-12 w-32 md:h-16 md:w-40 mb-4 md:mb-0">
                            <Image
                                src="/logo-new.png"
                                alt="Apollo Global Interactive"
                                fill
                                className="object-contain"
                            />
                        </div>
                        {/* Main Vertical Line (Desktop only - lg+) */}
                        <div className="hidden lg:block h-12 w-px bg-gray-300"></div>
                    </div>

                    {/* Desktop Tree Connector Lines (Visible only on lg+) */}
                    <div className="hidden lg:block relative w-full h-8 mb-6">
                        {/* Horizontal Line connecting centers of first and last items */}
                        <div className="absolute top-0 left-[16.66%] right-[16.66%] h-px bg-gray-300"></div>

                        {/* Vertical Lines descending to children */}
                        <div className="absolute top-0 left-[16.66%] h-full w-px bg-gray-300"></div>
                        <div className="absolute top-0 left-[50%] h-full w-px bg-gray-300"></div>
                        <div className="absolute top-0 left-[83.33%] h-full w-px bg-gray-300"></div>
                    </div>

                    {/* Children Grid */}
                    {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 mt-8 lg:mt-0">
                        {items.map((dept, index) => {
                            const DepartmentIcon = departments[index % departments.length].icon;
                            return (
                                <div
                                    key={dept.id || index}
                                    className="flex items-center justify-start gap-[18px] bg-white border-[0.5px] border-[rgba(177,177,177,0.2)] p-[20px] lg:p-[28px] rounded-[24px] shadow-[8px_4px_24px_0px_rgba(177,177,177,0.12)] transition-transform hover:-translate-y-1"
                                >
                                    <div className="shrink-0 w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] bg-[#f2f7ff] border-[0.5px] border-[#f2f2f7] rounded-[8px] flex items-center justify-center relative overflow-hidden text-[#5a80b9]">
                                        <DepartmentIcon size={32} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[16px] md:text-[18px] lg:text-[20px] font-bold text-[#323441] leading-tight text-left">
                                        {dept.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
