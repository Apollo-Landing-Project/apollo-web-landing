'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ShareItem {
    id: string;
    category: "MAJORITY" | "PUBLIC" | string;
    value: string;
}

const StakeholderCharts = ({
    badge = "Shareholders",
    title = "Share Structure & Distribution",
    desc = "Our transparent shareholding structure reflects our commitment to balanced ownership and public participation.",
    shares = [],
    lang = 'en'
}: {
    badge?: string;
    title?: string;
    desc?: string;
    shares?: ShareItem[];
    lang?: string;
}) => {
    // Determine which labels to use
    const isId = lang === 'id';

    // Process the shares data to format for charts and lists
    // We expect two main categories: MAJORITY and PUBLIC

    const majorityShare = shares.find(s => s.category === 'MAJORITY');
    const publicShare = shares.find(s => s.category === 'PUBLIC');

    const majorityValue = majorityShare ? parseInt(majorityShare.value, 10) : 0;
    const publicValue = publicShare ? parseInt(publicShare.value, 10) : 0;
    const totalValue = majorityValue + publicValue;

    // Calculate percentages
    // If total is 0 (no data), avoid NaN
    const majorityPercent = totalValue > 0 ? Math.round((majorityValue / totalValue) * 100) : 0;
    const publicPercent = totalValue > 0 ? Math.round((publicValue / totalValue) * 100) : 0;
    // ensure they sum to 100 if there's rounding drift, usually fine for display unless critical financial report.
    // For visual charts, these integers are fine.

    // Format numbers with dots
    const formatNumber = (num: number) => num.toLocaleString('id-ID'); // 'id-ID' uses dots for thousands

    const dataDisplay = [
        {
            name: isId ? 'PT Apollo Global Interactive Tbk.' : 'PT Apollo Global Interactive Tbk.',
            value: majorityPercent,
            shares: formatNumber(majorityValue),
            color: '#5A80B9',
            category: 'MAJORITY'
        },
        {
            name: isId ? 'Publik' : 'Public',
            value: publicPercent,
            shares: formatNumber(publicValue),
            color: '#94a3b8', // Gray-ish blue for public
            category: 'PUBLIC'
        }
    ];

    return (
        <section className="w-full py-20 bg-white">
            <div className="mx-auto max-w-[1440px] px-4 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Text Content */}
                    <div className="flex flex-col gap-6">
                        <div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-4 py-1.5 w-fit text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15">
                            {badge}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#323441] leading-tight">
                            {title}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                            {desc}
                        </p>

                        <div className="flex flex-col gap-4 mt-4">
                            {dataDisplay.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 transition-all hover:shadow-md">
                                    <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                    <div>
                                        <h4 className="font-semibold text-[#323441]">{item.name}</h4>
                                        <p className="text-sm text-gray-500">{item.shares} Shares</p>
                                    </div>
                                    <div className="ml-auto text-2xl font-bold" style={{ color: item.color }}>{item.value}%</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Charts */}
                    <div className="flex flex-row gap-6 justify-center items-center flex-wrap">

                        {/* Chart 1: Majority */}
                        <div className="relative w-[280px] h-[280px] flex flex-col items-center justify-center">
                            <div className="absolute inset-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[{ value: majorityPercent }, { value: publicPercent }]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={100}
                                            startAngle={90}
                                            endAngle={-270}
                                            dataKey="value"
                                            stroke="none"
                                            cornerRadius={10}
                                            paddingAngle={-5}
                                        >
                                            <Cell fill={dataDisplay[0].color} /> {/* Majority Color */}
                                            <Cell fill="#f1f5f9" /> {/* Remaining is gray/empty color, or public color if full pie? Design shows two separate rings. */}
                                            {/* Design trend: Highlight the specific part, gray out the rest */}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="text-center z-10">
                                <span className="block text-4xl font-bold text-[#323441]">{majorityPercent}%</span>
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">{isId ? 'Mayoritas' : 'Majority'}</span>
                            </div>
                        </div>

                        {/* Chart 2: Public */}
                        <div className="relative w-[280px] h-[280px] flex flex-col items-center justify-center">
                            <div className="absolute inset-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[{ value: publicPercent }, { value: majorityPercent }]}
                                            // Order matters for where the "start" of the highlight is if using startAngle 90. 
                                            // Ideally we want the "Public" slice to look independent or complementary.
                                            // Let's just highlight Public % and gray out rest.
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={100}
                                            startAngle={90}
                                            endAngle={-270}
                                            dataKey="value"
                                            stroke="none"
                                            cornerRadius={10}
                                        >
                                            <Cell fill={dataDisplay[1].color} /> {/* Public Color */}
                                            <Cell fill="#f1f5f9" /> {/* Rest */}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="text-center z-10">
                                <span className="block text-4xl font-bold text-[#323441]">{publicPercent}%</span>
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">{isId ? 'Publik' : 'Public'}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default StakeholderCharts;
