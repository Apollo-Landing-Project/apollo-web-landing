'use client';

import React, { useState } from 'react';
import { Search, FileText, Download, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const YEARS = ['2025', '2024', '2023', '2022'];
const CATEGORIES = [
    'Annual Report',
    'Quarterly Report',
    'Presentation',
    'Prospectus',
    'RUPS',
    'Good Corporate Governance (GCG)',
    'Laporan Keuangan'
];

const REPORT_DATA = [
    { id: 1, title: 'Quarter 2 - 2025', category: 'Quarterly Report', year: '2025', description: 'Consolidated financial statements for Q2 2025.' },
    { id: 2, title: 'Quarter 1 - 2025', category: 'Quarterly Report', year: '2025', description: 'Consolidated financial statements for Q1 2025.' },
    { id: 3, title: 'Annual Report 2024', category: 'Annual Report', year: '2024', description: 'Full year detailed financial and operational review.' },
    { id: 4, title: 'Sustainability 2024', category: 'Annual Report', year: '2024', description: 'Our commitment to environmental and social governance.' },
    { id: 5, title: 'Quarter 3 - 2024', category: 'Quarterly Report', year: '2024', description: 'Financial performance update for the third quarter.' },
    { id: 6, title: 'Public Expose 2024', category: 'Presentation', year: '2024', description: 'Presentation material from the annual public expose.' },
    { id: 7, title: 'Quarter 2 - 2024', category: 'Quarterly Report', year: '2024', description: 'Mid-year financial status and operational highlights.' },
    { id: 8, title: 'Quarter 1 - 2024', category: 'Quarterly Report', year: '2024', description: 'First quarter results and strategic outlook.' },
    { id: 9, title: 'Annual Report 2023', category: 'Annual Report', year: '2023', description: 'Comprehensive overview of 2023 performance.' },

    // New Items
    { id: 10, title: 'Risalah RUPS Tahunan 2025', category: 'RUPS', year: '2025', description: 'Ringkasan resmi hasil keputusan Rapat Umum Pemegang Saham Tahunan.' },
    { id: 11, title: 'Pedoman Tata Kelola (GCG)', category: 'Good Corporate Governance (GCG)', year: '2025', description: 'Panduan lengkap penerapan Good Corporate Governance perusahaan.' },
    { id: 12, title: 'Laporan Keuangan Q1 2025', category: 'Laporan Keuangan', year: '2025', description: 'Laporan posisi keuangan dan kinerja komprehensif kuartal pertama.' },
    { id: 13, title: 'Risalah RUPS Luar Biasa 2024', category: 'RUPS', year: '2024', description: 'Dokumentasi keputusan strategis RUPS Luar Biasa.' },
    { id: 14, title: 'Piagam Audit Internal', category: 'Good Corporate Governance (GCG)', year: '2024', description: 'Standar dan prosedur audit internal untuk transparansi perusahaan.' },
    { id: 15, title: 'Laporan Keuangan Tahunan 2024', category: 'Laporan Keuangan', year: '2024', description: 'Laporan keuangan auditan untuk tahun buku yang berakhir 31 Desember.' },
];

const ReportSection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('All Years');
    const [selectedCategory, setSelectedCategory] = useState('All Reports');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Filter Logic
    const filteredReports = REPORT_DATA.filter(report => {
        const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear === 'All Years' || report.year === selectedYear;
        const matchesCategory = selectedCategory === 'All Reports' || report.category === selectedCategory;
        return matchesSearch && matchesYear && matchesCategory;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
    const currentReports = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <section className="w-full py-20 bg-gray-50">
            <div className="mx-auto max-w-[1440px] px-4 md:px-10 flex flex-col gap-12">

                {/* Header & Controls */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 border-b border-gray-200 pb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#323441]">General Reports</h2>
                            <p className="text-gray-500 mt-2">Access our financial statements and operational reports.</p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-[320px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search reports..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#5A80B9] focus:ring-1 focus:ring-[#5A80B9] transition-all"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="appearance-none bg-white border border-gray-200 text-[#323441] py-2.5 pl-4 pr-10 rounded-lg cursor-pointer focus:outline-none focus:border-[#5A80B9] hover:bg-gray-50"
                            style={{ backgroundImage: 'none' }}
                        >
                            <option>All Reports</option>
                            {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                        </select>

                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="appearance-none bg-white border border-gray-200 text-[#323441] py-2.5 pl-4 pr-10 rounded-lg cursor-pointer focus:outline-none focus:border-[#5A80B9] hover:bg-gray-50"
                        >
                            <option>All Years</option>
                            {YEARS.map(year => <option key={year}>{year}</option>)}
                        </select>
                        {/* Note: In a real custom select, I'd add the chevron manually, but native select is accessible and robust. */}
                    </div>
                </div>

                {/* Grid */}
                {currentReports.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {currentReports.map((report) => (
                                <motion.div
                                    key={report.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between group h-full"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#F0F5FA] flex items-center justify-center text-[#5A80B9] group-hover:bg-[#5A80B9] group-hover:text-white transition-colors">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-2">
                                                {report.category}
                                            </span>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs font-semibold text-[#5A80B9] uppercase tracking-wider">{report.year}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-[#323441] mt-1 leading-snug">{report.title}</h3>
                                            <p className="text-sm text-gray-500 mt-2 line-clamp-3">{report.description}</p>
                                        </div>
                                    </div>

                                    <button className="mt-6 flex items-center justify-between w-full py-2.5 px-4 rounded-lg bg-[#F8FAFC] border border-gray-100 text-sm font-medium text-[#323441] group-hover:bg-[#5A80B9] group-hover:text-white group-hover:border-[#5A80B9] transition-all duration-300">
                                        <span>Download</span>
                                        <Download className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="py-20 text-center text-gray-400">
                        <p>No reports found matching your criteria.</p>
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
