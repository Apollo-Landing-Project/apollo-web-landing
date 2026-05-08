'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, FileText, Download, ChevronLeft, ChevronRight, ArrowRight, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getReportCategoryLabel, getReportCategoryKey } from '@/lib/report-category';

const categoryThemes: Record<
    string,
    {
        card: string;
        icon: string;
        pill: string;
        year: string;
        download: string;
        detail: string;
    }
> = {
    berita: {
        card: 'bg-[#fffaf3] border-[#ffd7a3] hover:shadow-[0_18px_40px_rgba(245,158,11,0.14)]',
        icon: 'bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white',
        pill: 'bg-orange-100 text-orange-700 ring-orange-700/10',
        year: 'text-orange-600',
        download: 'bg-orange-500 border-orange-500 text-white hover:bg-orange-600 hover:border-orange-600',
        detail: 'bg-orange-500 border-orange-500 text-white hover:bg-orange-600 hover:border-orange-600',
    },
    default: {
        card: 'bg-white border-gray-100 hover:shadow-lg',
        icon: 'bg-[#F0F5FA] text-[#5A80B9] group-hover:bg-[#5A80B9] group-hover:text-white',
        pill: 'bg-blue-50 text-blue-700 ring-blue-700/10',
        year: 'text-[#5A80B9]',
        download: 'bg-[#5A80B9] border-[#5A80B9] text-white hover:bg-[#4a6d9e] hover:border-[#4a6d9e]',
        detail: 'bg-[#5A80B9] border-[#5A80B9] text-white hover:bg-[#4a6d9e] hover:border-[#4a6d9e]',
    },
};

const ReportSection = ({
    badge = "General Reports",
    title = "Reports",
    desc = "Access our financial statements and operational reports.",
    reportItems = [],
    lang = 'en'
}: {
    badge?: string;
    title?: string;
    desc?: string;
    reportItems?: any[];
    lang?: string;
}) => {
    // URL Search Params Hooks
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Get Filter Values from URL
    const selectedYear = searchParams.get('year') || 'all';
    const selectedCategory = searchParams.get('category') || 'all';

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Helper to update URL params
    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all') {
            params.delete(name);
        } else {
            params.set(name, value);
        }
        return params.toString();
    }, [searchParams]);

    const handleFilterChange = (name: string, value: string) => {
        const queryString = createQueryString(name, value);
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
        setCurrentPage(1); // Reset to first page on filter change
    };

    // Derived data for filters
    const processedReports = useMemo(() => {
        const items = reportItems || [];
        return items.map(item => ({
            ...item,
            year: item.published_at ? new Date(item.published_at).getFullYear().toString() : 'N/A',
            categoryKey: getReportCategoryKey(item.category),
            categoryLabel: getReportCategoryLabel(item.category, lang === 'id' ? 'id' : 'en'),
            isNewsCategory: getReportCategoryKey(item.category) === 'berita',
        }));
    }, [reportItems, lang]);

    // Unique Categories from Data
    const availableCategories = useMemo(() => {
        const seen = new Map<string, string>();
        for (const report of processedReports as any[]) {
            if (!seen.has(report.categoryKey)) {
                seen.set(report.categoryKey, report.categoryLabel);
            }
        }

        return Array.from(seen.entries())
            .map(([value, label]) => ({ value, label }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, [processedReports]);

    // Dynamic Years: 2024 to Current Year
    const dynamicYears = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startYear = 2024;
        const years = [];
        for (let y = currentYear; y >= startYear; y--) {
            years.push(y.toString());
        }
        return years;
    }, []);

    // Filter Logic
    const filteredReports = processedReports.filter((report: any) => {
        const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear === 'all' || report.year === selectedYear;
        const matchesCategory = selectedCategory === 'all' || report.categoryKey === selectedCategory;
        return matchesSearch && matchesYear && matchesCategory;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
    const currentReports = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const isId = lang === 'id';

    return (
        <section className="w-full py-20 bg-gray-50">
            <div className="mx-auto max-w-[1440px] px-4 md:px-10 flex flex-col gap-12">

                {/* Header & Controls */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 border-b border-gray-200 pb-8">
                        <div>
                            <div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-4 py-1.5 w-fit text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15 mb-4">
                                {badge}
                            </div>
                            <h2 className="text-3xl font-bold text-[#323441]">{title}</h2>
                            <p className="text-gray-500 mt-2">{desc}</p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-[320px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder={isId ? "Cari laporan..." : "Search reports..."}
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#5A80B9] focus:ring-1 focus:ring-[#5A80B9] transition-all"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4">
                        <select
                            value={selectedCategory}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="appearance-none bg-white border border-gray-200 text-[#323441] py-2.5 pl-4 pr-10 rounded-lg cursor-pointer focus:outline-none focus:border-[#5A80B9] hover:bg-gray-50"
                            style={{ backgroundImage: 'none' }}
                        >
                            <option value="all">{isId ? "Semua Laporan" : "All Reports"}</option>
                            {availableCategories.map((cat: any) => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>

                        <select
                            value={selectedYear}
                            onChange={(e) => handleFilterChange('year', e.target.value)}
                            className="appearance-none bg-white border border-gray-200 text-[#323441] py-2.5 pl-4 pr-10 rounded-lg cursor-pointer focus:outline-none focus:border-[#5A80B9] hover:bg-gray-50"
                        >
                            <option value="all">{isId ? "Semua Tahun" : "All Years"}</option>
                            {dynamicYears.map(year => <option key={year} value={year}>{year}</option>)}
                        </select>
                    </div>
                </div>

                {/* Grid */}
                {currentReports.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {currentReports.map((report: any) => {
                                const theme = categoryThemes[report.categoryKey] || categoryThemes.default;
                                return (
                                    <motion.div
                                        key={report.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className={`p-6 rounded-2xl border shadow-sm transition-shadow flex flex-col justify-between group h-full ${theme.card}`}
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${theme.icon}`}>
                                                {report.isNewsCategory ? (
                                                    <Newspaper className="w-6 h-6" />
                                                ) : (
                                                    <FileText className="w-6 h-6" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${theme.pill}`}>
                                                        {report.categoryLabel}
                                                    </span>
                                                    {report.news_id && !report.isNewsCategory && (
                                                        <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-700/10">
                                                            {isId ? "Detail" : "Details"}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`text-xs font-semibold uppercase tracking-wider ${theme.year}`}>{report.year}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-[#323441] mt-1 leading-snug">{report.title}</h3>
                                                <p className="text-sm text-gray-500 mt-2 line-clamp-3">{report.description}</p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-6 flex flex-col gap-2">
                                            {/* View Details Button (Only if news_id exists) */}
                                            {report.news_id && (
                                                <Link
                                                    href={`/${lang}/investor-relation/${report.news_id}`}
                                                    className={`flex items-center justify-between w-full py-2.5 px-4 rounded-lg border text-sm font-medium transition-all duration-300 ${theme.detail}`}
                                                >
                                                    <span>{isId ? "Lihat Detail" : "View Details"}</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            )}

                                            {/* Download Button (Always visible) */}
                                            <a
                                                href={report.download_url || report.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center justify-between w-full py-2.5 px-4 rounded-lg border text-sm font-medium transition-all duration-300 ${theme.download}`}
                                            >
                                                <span>{isId ? "Unduh Dokumen" : "Download Document"}</span>
                                                <Download className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="py-20 text-center text-gray-400">
                        <p>{isId ? "Tidak ada laporan yang ditemukan." : "No reports found matching your criteria."}</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                    ? 'bg-[#5A80B9] text-white shadow-md'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ReportSection;
