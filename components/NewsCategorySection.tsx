"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from "lucide-react";
import { DayPicker, DateRange } from "react-day-picker";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import "react-day-picker/dist/style.css";

type NewsItem = {
    id: string | number;
    image: string;
    date: string;
    title: string;
    description: string;
    badge?: string;
};

type NewsCategorySectionProps = {
    id: string;
    badge: string;
    title: string;
    description: string;
    items: NewsItem[];
    basePath: string;
    sectionKey: "news" | "csr"; // To namespace the URL params
    currentPage: number;
    totalPages: number;
};

export default function NewsCategorySection({
    id,
    badge,
    title,
    description,
    items,
    basePath,
    sectionKey,
    currentPage,
    totalPages,
}: NewsCategorySectionProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Helper to get namespaced param keys
    const pageKey = `${sectionKey}_page`;
    const searchKey = `${sectionKey}_search`;
    const startKey = `${sectionKey}_start`;
    const endKey = `${sectionKey}_end`;

    // Initialize local state from URL params to keep UI responsive
    const [searchValue, setSearchValue] = useState(searchParams.get(searchKey) || "");
    const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
        const start = searchParams.get(startKey);
        const end = searchParams.get(endKey);
        if (start) {
            return {
                from: new Date(start),
                to: end ? new Date(end) : undefined
            };
        }
        return undefined;
    });

    // Sync local state if URL changes externally
    useEffect(() => {
        const urlSearch = searchParams.get(searchKey) || "";
        if (urlSearch !== searchValue) {
            setSearchValue(urlSearch);
        }

        const start = searchParams.get(startKey);
        const end = searchParams.get(endKey);
        if (start) {
            setDateRange({
                from: new Date(start),
                to: end ? new Date(end) : undefined
            });
        } else {
            // Only clear if both are missing from URL, to avoid clearing on initial load if not present
            if (!start && !end && dateRange !== undefined) {
                setDateRange(undefined);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, searchKey, startKey, endKey]);


    const createQueryString = useCallback(
        (params: Record<string, string | null>) => {
            const newSearchParams = new URLSearchParams(searchParams.toString());

            Object.entries(params).forEach(([key, value]) => {
                if (value === null || value === "") {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, value);
                }
            });

            return newSearchParams.toString();
        },
        [searchParams]
    );

    const updateUrl = (params: Record<string, string | null>) => {
        // Reset page to 1 whenever filters change (except when changing page itself)
        if (!params[pageKey]) {
            // If we represent a filter change (search or date), we should reset page
            if (params[searchKey] !== undefined || params[startKey] !== undefined || params[endKey] !== undefined) {
                params[pageKey] = "1";
            }
        }

        const queryString = createQueryString(params);
        router.push(`${pathname}?${queryString}`, { scroll: false });
    };

    // Debounced Search
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentParam = searchParams.get(searchKey) || "";
            if (searchValue !== currentParam) {
                updateUrl({ [searchKey]: searchValue });
            }
        }, 500);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleDateApply = () => {
        updateUrl({
            [startKey]: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : null,
            [endKey]: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : null,
        });
        setIsDatePickerOpen(false);
    };

    const handleDateClear = () => {
        setDateRange(undefined);
        // Explicitly remove from URL
        updateUrl({
            [startKey]: null,
            [endKey]: null,
        });
        setIsDatePickerOpen(false);
    };

    // Responsive window width
    const [windowWidth, setWindowWidth] = useState(1000);
    React.useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    // Filter year from 2024 to current
    const currentYear = new Date().getFullYear();

    return (
        <section id={id} className="w-full bg-white py-16 md:py-20 scroll-mt-20">
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
                    <div className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 md:w-[400px] focus-within:border-[#5a80b9] transition-colors shadow-sm">
                        <Search className="h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by title or description..."
                            className="w-full bg-transparent text-base outline-none placeholder:text-gray-400 text-[#323441]"
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                        {searchValue && (
                            <button onClick={() => setSearchValue("")} className="text-gray-400 hover:text-gray-600">
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* DateRange Picker */}
                    <div className="relative z-[100] w-full md:w-auto">
                        <button
                            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                            className={`flex w-full md:w-[300px] items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-all duration-200 hover:bg-gray-50 active:scale-[0.98] ${isDatePickerOpen ? 'border-[#5a80b9] ring-2 ring-[#5a80b9]/10' : 'border-gray-200 bg-white shadow-sm'
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
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsDatePickerOpen(false)}
                                />
                                <div className="absolute right-0 top-[calc(100%+8px)] z-[101] flex flex-col md:flex-row overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 w-auto max-w-[calc(100vw-32px)] md:max-w-[800px] min-h-[350px]">
                                    {/* Presets Sidebar */}
                                    <div className="flex flex-row md:flex-col gap-1 md:gap-2 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50 p-3 overflow-x-auto md:w-[160px] md:shrink-0">
                                        <div className="hidden md:block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Presets</div>
                                        {[
                                            {
                                                label: "All Time",
                                                range: undefined
                                            },
                                            {
                                                label: "Today",
                                                range: { from: new Date(), to: new Date() }
                                            },
                                            {
                                                label: "Last 7 Days",
                                                range: { from: subDays(new Date(), 6), to: new Date() }
                                            },
                                            {
                                                label: "This Month",
                                                range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) }
                                            },
                                            {
                                                label: "All 2024",
                                                range: { from: new Date(2024, 0, 1), to: new Date(2024, 11, 31) }
                                            },
                                        ].map((preset, i) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    if (preset.range === undefined) {
                                                        setDateRange(undefined);
                                                    } else {
                                                        setDateRange(preset.range);
                                                    }
                                                }}
                                                className="whitespace-nowrap rounded-lg px-3 py-2 text-left font-medium text-gray-600 hover:bg-white hover:text-[#5a80b9] hover:shadow-sm transition-all text-xs md:text-sm"
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
                                            .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
                                                color: white;
                                                background-color: var(--rdp-accent-color);
                                            }
                                        `}</style>
                                        <DayPicker
                                            mode="range"
                                            defaultMonth={dateRange?.from || new Date()}
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            numberOfMonths={windowWidth >= 768 ? 2 : 1}
                                            showOutsideDays={false}
                                            pagedNavigation
                                            fromYear={2024}
                                            toYear={currentYear}
                                            captionLayout="dropdown-months"
                                        />

                                        <div className="mt-4 flex justify-end gap-2 pt-4 border-t border-gray-100">
                                            <button
                                                onClick={handleDateClear}
                                                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                                            >
                                                Clear
                                            </button>
                                            <button
                                                onClick={handleDateApply}
                                                className="rounded-lg bg-[#5a80b9] px-6 py-2 text-sm font-semibold text-white hover:bg-[#4a6d9e] hover:shadow-md transition-all active:scale-95"
                                            >
                                                Apply Filter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Grid */}
                {items.length > 0 ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                        {items.map((item) => (
                            <Link href={`${basePath}/${item.id}`} key={item.id} className="group flex flex-col gap-6">
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
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-lg text-gray-500">No items found matching your filters.</p>
                        <button
                            onClick={() => {
                                setSearchValue("");
                                setDateRange(undefined);
                                updateUrl({
                                    [searchKey]: null,
                                    [startKey]: null,
                                    [endKey]: null,
                                    [pageKey]: "1"
                                });
                            }}
                            className="mt-4 text-[#5a80b9] hover:underline cursor-pointer"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {items.length > 0 && (
                    <div className="mx-auto flex items-center gap-2 pt-8">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => updateUrl({ [pageKey]: (currentPage - 1).toString() })}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-400 transition-colors hover:bg-gray-50 hover:text-[#5a80b9] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        {/* Simple range pagination - could be better but sufficient for now */}
                        {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                            // Only show if close to current page (optional optimization for large pages)
                            // For now show all, since total pages unlikely to be huge for this demo
                            <button
                                key={page}
                                onClick={() => updateUrl({ [pageKey]: page.toString() })}
                                className={`flex h-10 w-10 items-center justify-center rounded-full text-base font-medium transition-colors
                                    ${currentPage === page
                                        ? "bg-[#5a80b9] text-white shadow-lg shadow-[#5a80b9]/30"
                                        : "border border-gray-100 bg-white text-gray-600 hover:bg-gray-50 hover:text-[#5a80b9]"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === (totalPages || 1)}
                            onClick={() => updateUrl({ [pageKey]: (currentPage + 1).toString() })}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5a80b9] text-white shadow-lg shadow-[#5a80b9]/30 transition-transform hover:scale-105 hover:bg-[#4a6d9e] disabled:opacity-50 disabled: cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
