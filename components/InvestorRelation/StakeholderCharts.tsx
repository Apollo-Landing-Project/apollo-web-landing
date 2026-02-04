'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const dataStakes = [
    { name: 'PT Sinar Solusindo Sejahtera', value: 38, shares: '1.445.000.000', color: '#5A80B9' },
    { name: 'Public', value: 62, shares: '2.358.053.525', color: '#A0B4D4' } // Using a lighter shade for public or secondary color
];

// Single Donut Chart Implementation as it's the most standard for "Share Distribution"
// If "Two Circular Charts" meant 2 separate rings, this can be easily adjusted.
// Given strict "Share Distribution" terminology, a single composition chart is standard. 
// However, to be safe and "wow" the user, I will create a layout that emphasizes both.
// Let's stick to a nice Donut Chart that shows the split clearly.

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <p className="font-semibold text-[#323441]">{payload[0].name}</p>
                <p className="text-[#5A80B9] font-bold text-lg">{payload[0].value}%</p>
                <p className="text-gray-500 text-sm">{payload[0].payload.shares} shares</p>
            </div>
        );
    }
    return null;
};

const StakeholderCharts = () => {
    // We will render two separate rings as interpreted from "Create the two circular charts"
    // One for PT Sinar (38%) and one for Public (62%)

    return (
        <section className="w-full py-20 bg-white">
            <div className="mx-auto max-w-[1440px] px-4 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Text Content */}
                    <div className="flex flex-col gap-6">
                        <div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-4 py-1.5 w-fit text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15">
                            Shareholders
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#323441] leading-tight">
                            Share Structure & Distribution
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                            Our transparent shareholding structure reflects our commitment to balanced ownership and public participation.
                        </p>

                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 transition-all hover:shadow-md">
                                <div className="w-4 h-4 rounded-full bg-[#5A80B9] shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-[#323441]">PT Sinar Solusindo Sejahtera</h4>
                                    <p className="text-sm text-gray-500">1.445.000.000 Shares</p>
                                </div>
                                <div className="ml-auto text-2xl font-bold text-[#5A80B9]">38%</div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 transition-all hover:shadow-md">
                                <div className="w-4 h-4 rounded-full bg-[#cbd5e1] shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-[#323441]">Public</h4>
                                    <p className="text-sm text-gray-500">2.358.053.525 Shares</p>
                                </div>
                                <div className="ml-auto text-2xl font-bold text-[#94a3b8]">62%</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Charts */}
                    <div className="flex flex-row gap-6 justify-center items-center flex-wrap">

                        {/* Chart 1: Major Shareholder */}
                        <div className="relative w-[280px] h-[280px] flex flex-col items-center justify-center">
                            <div className="absolute inset-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[{ value: 38 }, { value: 62 }]}
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
                                            <Cell fill="#5A80B9" />
                                            <Cell fill="#f1f5f9" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="text-center z-10">
                                <span className="block text-4xl font-bold text-[#323441]">38%</span>
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Majority</span>
                            </div>
                        </div>

                        {/* Chart 2: Public */}
                        <div className="relative w-[280px] h-[280px] flex flex-col items-center justify-center">
                            <div className="absolute inset-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[{ value: 62 }, { value: 38 }]}
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
                                            <Cell fill="#94a3b8" />
                                            <Cell fill="#f1f5f9" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="text-center z-10">
                                <span className="block text-4xl font-bold text-[#323441]">62%</span>
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Public</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default StakeholderCharts;
