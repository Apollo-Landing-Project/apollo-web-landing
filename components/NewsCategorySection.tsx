"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { DayPicker, DateRange } from "react-day-picker";
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import "react-day-picker/dist/style.css";

type NewsItem = {
    id: number;
    image: string;
    date: string;
    title: string;
    description: string;
    badge?: string; // e.g. "CSR"
};

type NewsCategorySectionProps = {
    id: string;
    badge: string;
    title: string;
    description: string;
    items: NewsItem[];
    basePath: string;
};

export default function NewsCategorySection({
    id,
    badge,
    title,
    description,
    items,
    basePath,
}: NewsCategorySectionProps) {
    // Mock pagination state
    const [currentPage, setCurrentPage] = useState(1);

    // Responsive state for Calendar
    const [windowWidth, setWindowWidth] = useState(1000); // Default to larger screen
    React.useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Date Picker state
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    return (
        <section id={id} className="w-full bg-white py-16 md:py-20">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-4 md:px-10">

                {/* Header */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-3 py-1 text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15">
                        {badge}
                    </div>
                    <h2 className="max-w-[900px] text-3xl font-semibold leading-tight text-[#323441] md:text-[54px]">
                        {title}
                    </h2>
                    <p className="max-w-[700px] text-lg text-[#323441]/80">
                        {description}
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-white md:flex-row md:items-center">
                    {/* Search */}
                    <div className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 md:w-[400px]">
                        <Search className="h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="w-full bg-transparent text-base outline-none placeholder:text-gray-400"
                        />
                    </div>

                    {/* Date Filter (Mock) */}
                    {/* DateRange Picker */}
                    {/* Notion-style Date Picker */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                            className={`flex w-full md:w-[300px] items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-all duration-200 hover:bg-gray-50 active:scale-[0.98] ${isDatePickerOpen ? 'border-[#5a80b9] ring-2 ring-[#5a80b9]/10' : 'border-gray-200 bg-white'
                                }`}
                        >
                            <span className={`text-base truncate ${dateRange?.from ? "text-[#323441] font-medium" : "text-gray-500"}`}>
                                {dateRange?.from ? (
                                    dateRange.to ? (
                                        `${format(dateRange.from, "MMM dd, y")} - ${format(dateRange.to, "MMM dd, y")}`
                                    ) : (
                                        format(dateRange.from, "MMM dd, y")
                                    )
                                ) : (
                                    "Select Date Range"
                                )}
                            </span>
                            <CalendarIcon className={`h-5 w-5 transition-colors ${isDatePickerOpen ? 'text-[#5a80b9]' : 'text-gray-400'}`} />
                        </button>

                        {isDatePickerOpen && (
                            <>
                                {/* Backdrop for mobile to close */}
                                <div
                                    className="fixed inset-0 z-[40]"
                                    onClick={() => setIsDatePickerOpen(false)}
                                />

                                {/* Dropdown Container */}
                                <div className="absolute right-0 top-[calc(100%+8px)] z-[50] flex flex-col md:flex-row overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 w-auto max-w-[calc(100vw-32px)] md:max-w-[800px] min-h-[350px]">

                                    {/* Presets Sidebar */}
                                    <div className="flex flex-row md:flex-col gap-1 md:gap-2 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50 p-3 overflow-x-auto md:w-[160px] md:shrink-0">
                                        <div className="hidden md:block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Presets</div>
                                        {[
                                            {
                                                label: "Today",
                                                range: { from: new Date(), to: new Date() }
                                            },
                                            {
                                                label: "Last 7 Days",
                                                range: { from: subDays(new Date(), 6), to: new Date() }
                                            },
                                            {
                                                label: "Last 30 Days",
                                                range: { from: subDays(new Date(), 29), to: new Date() }
                                            },
                                            {
                                                label: "This Month",
                                                range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) }
                                            },
                                            {
                                                label: "Last Month",
                                                range: { from: startOfMonth(subMonths(new Date(), 1)), to: endOfMonth(subMonths(new Date(), 1)) }
                                            },
                                        ].map((preset, i) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setDateRange(preset.range);
                                                    // Optional: close on preset select? Better keep open for refinement
                                                }}
                                                className="whitespace-nowrap rounded-lg px-3 py-2 text-sm text-left font-medium text-gray-600 hover:bg-white hover:text-[#5a80b9] hover:shadow-sm transition-all text-xs md:text-sm"
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Calendar Area */}
                                    <div className="p-3 md:p-6 bg-white overflow-x-auto overflow-y-auto">
                                        <style>{`
                                            .rdp {
                                                --rdp-cell-size: 40px;
                                                --rdp-accent-color: #5a80b9;
                                                --rdp-background-color: #f0f6ff;
                                                margin: 0;
                                            }
                                            .rdp-caption { 
                                                text-transform: capitalize; 
                                                font-family: inherit;
                                            }
                                            @media (max-width: 768px) {
                                                .rdp { 
                                                    --rdp-cell-size: 36px;  /* Slightly larger for touch targets if space permits, or back to 32px if constrained */
                                                    margin: 0 auto;        /* Center the calendar */
                                                }
                                                .rdp-month {
                                                    width: 100%;           /* Ensure usage of full width */
                                                }
                                            }
                                            .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
                                                color: white;
                                                background-color: var(--rdp-accent-color);
                                            }
                                            .rdp-day_range_middle {
                                                background-color: var(--rdp-background-color) !important;
                                                color: #1e293b !important;
                                                border-radius: 0 !important;
                                            }
                                            .rdp-day_range_start {
                                                border-top-right-radius: 0 !important;
                                                border-bottom-right-radius: 0 !important;
                                            }
                                            .rdp-day_range_end {
                                                border-top-left-radius: 0 !important;
                                                border-bottom-left-radius: 0 !important;
                                            }
                                            .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                                                background-color: #f7f9fc;
                                                color: #5a80b9;
                                                font-weight: 600;
                                            }
                                        `}</style>
                                        <DayPicker
                                            mode="range"
                                            defaultMonth={new Date()} // Changed default to now
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            numberOfMonths={windowWidth >= 768 ? 2 : 1}
                                            showOutsideDays={false}
                                            pagedNavigation
                                            modifiersStyles={{
                                                disabled: { fontSize: '75%' }
                                            }}
                                        />

                                        {/* Footer Actions */}
                                        <div className="mt-4 flex justify-end gap-2 pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() => {
                                                    setDateRange(undefined);
                                                }}
                                                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                                            >
                                                Clear
                                            </button>
                                            <button
                                                onClick={() => setIsDatePickerOpen(false)}
                                                className="rounded-lg bg-[#5a80b9] px-6 py-2 text-sm font-semibold text-white hover:bg-[#4a6d9e] hover:shadow-md transition-all active:scale-95"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item) => (
                        <Link href={`${basePath}/${item.id}`} key={item.id} className="group flex flex-col gap-6">
                            {/* Image */}
                            <div className="relative h-[260px] w-full overflow-hidden rounded-[16px] bg-gray-100">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {item.badge && (
                                    <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#323441] shadow-sm backdrop-blur-sm">
                                        {item.badge}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-3">
                                <span className="text-sm text-[#767676]">{item.date}</span>
                                <h3 className="line-clamp-2 text-xl font-bold leading-tight text-[#323441] transition-colors group-hover:text-[#5a80b9]">
                                    {item.title}
                                </h3>
                                <p className="line-clamp-2 text-base text-[#767676]">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mx-auto flex items-center gap-2 pt-8">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-400 transition-colors hover:bg-gray-50 hover:text-[#5a80b9]">
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5a80b9] text-base font-medium text-white">
                        1
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-base font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#5a80b9]">
                        2
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-base font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#5a80b9]">
                        3
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-base font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#5a80b9]">
                        4
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5a80b9] text-white shadow-lg shadow-[#5a80b9]/30 transition-transform hover:scale-105 hover:bg-[#4a6d9e]">
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

            </div>
        </section>
    );
}
