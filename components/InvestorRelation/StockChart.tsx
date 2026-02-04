'use client';

import React, { useEffect, useRef, memo } from 'react';
import { ArrowRight } from 'lucide-react';

const StockChart = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            if (typeof (window as any).TradingView !== 'undefined' && containerRef.current) {
                new (window as any).TradingView.widget({
                    autosize: true,
                    symbol: "IDX:BOGA",
                    interval: "D",
                    timezone: "Asia/Jakarta",
                    theme: "dark",
                    style: "1",
                    locale: "en",
                    toolbar_bg: "#f1f3f6",
                    enable_publishing: false,
                    allow_symbol_change: true,
                    container_id: containerRef.current.id,
                    hide_side_toolbar: false,
                });
            }
        };
        document.head.appendChild(script);

        return () => {
            // Cleanup provided by TradingView might be limited, but we remove the script tag if needed
            // usually unnecessary for single page apps unless specific cleanup required
        };
    }, []);

    return (
        <section className="w-full bg-[#1e2329] py-16 text-white">
            <div className="mx-auto max-w-[1440px] px-4 md:px-10 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-semibold">Stock Information</h2>
                        <p className="text-gray-400 mt-2">Real-time stock performance for PT Bintang Otoe Global Tbk (BOGA)</p>
                    </div>
                </div>

                <div className="w-full h-[500px] md:h-[600px] border border-gray-700 rounded-2xl overflow-hidden bg-black relative">
                    <div className="tradingview-widget-container h-full w-full">
                        <div id="tradingview_boga" ref={containerRef} className="h-full w-full" />
                    </div>
                </div>

                <div className="flex justify-center md:justify-end">
                    <a
                        href="https://www.tradingview.com/symbols/IDX-BOGA/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#5a80b9] hover:bg-[#4a6d9e] rounded-full text-white transition-colors font-medium"
                    >
                        See More Details
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default memo(StockChart);
