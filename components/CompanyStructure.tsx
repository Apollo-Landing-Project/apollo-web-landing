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
}: CompanyStructureProps) {
	const columns = [
		{
			items: [
				{ name: "PT Sumber Utama Niaga", percentage: "99.99%" },
				{ name: "PT Bintang Artha Guna", percentage: "99.80%" },
				{ name: "PT Tunas Agung Perdana", percentage: "99.80%" },
				{ name: "PT Bintang Perkasa Mobilindo", percentage: "99.80%" },
				{ name: "PT Surya Anugrah Gempita", percentage: "99.80%" },
				{ name: "PT Sejahtera Bersama Motor", percentage: "100.00%" },
				{ name: "PT Bintang Dewata Abadi", percentage: "99.99%" },
			],
		},
		{
			items: [
				{ name: "PT Sinar Usaha Nusantara", percentage: "99.99%" },
				{ name: "PT Bintang Artha Global", percentage: "99.97%" },
				{ name: "PT Semesta Arjana Gemilang", percentage: "99.97%" },
			],
		},
		{
			items: [
				{ name: "PT Bintang Digital Utama", percentage: "99.99%" },
				{ name: "PT Bintang Mitra Dana", percentage: "99.99%" },
			],
		},
	];

	return (
		<section className="w-full py-12 md:py-20 bg-white overflow-hidden space-y-24">
			{/* Part 1: Company Structure (Subsidiaries) */}
			<div>
				<div className="flex flex-col items-center text-center px-4 mb-16">
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
				</div>

				<div className="max-w-7xl mx-auto px-4">
					<div className="overflow-x-auto pb-12 scrollbar-hide">
						{/* Adjusted min-width for mobile to be more compact, desktop stays wide */}
						<div className="min-w-[800px] md:min-w-[1000px] flex flex-col items-center py-4">
							{/* Root Node */}
							<div className="relative mb-12 md:mb-20">
								<div className="bg-[#3169b3] text-white px-8 py-3 md:px-12 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg shadow-md border-2 border-white/10 text-center">
									PT Apollo Global Interactive Tbk
								</div>
								{/* Vertical line down from root */}
								<div className="absolute left-1/2 -bottom-12 md:-bottom-20 w-[1.5px] h-12 md:h-20 bg-gray-400 -translate-x-1/2" />
							</div>

							{/* Tree Branches */}
							<div className="relative w-full">
								{/* Horizontal connector line */}
								<div className="absolute top-0 left-[16.66%] right-[16.66%] h-[1.5px] bg-gray-400" />

								<div className="flex justify-between w-full">
									{columns.map((column, colIndex) => (
										<div
											key={colIndex}
											className="flex-1 flex flex-col items-center relative"
										>
											{/* Vertical line from horizontal line to first item in column */}
											<div className="absolute top-0 left-1/2 w-[1.5px] h-8 md:h-12 bg-gray-400 -translate-x-1/2" />

											<div className="pt-8 md:pt-12 w-full max-w-[220px] md:max-w-[280px]">
												{column.items.map((item, itemIndex) => (
													<div
														key={itemIndex}
														className="relative mb-6 md:mb-8 last:mb-0"
													>
														<div className="bg-[#eef1f6] text-gray-900 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm text-center border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1">
															<div className="font-extrabold text-[12px] md:text-[15px] leading-tight mb-1">
																{item.name}
															</div>
															<div className="font-bold text-[9px] md:text-xs text-gray-700">
																{item.percentage}
															</div>
														</div>

														{/* Vertical line between items in the same column */}
														{itemIndex < column.items.length - 1 && (
															<div className="absolute left-1/2 -bottom-6 md:-bottom-8 w-[1.5px] h-6 md:h-8 bg-gray-400 -translate-x-1/2" />
														)}
													</div>
												))}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Part 2: Corporate Governance Structure */}
			<div className="pt-16 border-t border-gray-100">
				<div className="flex flex-col items-center text-center px-4 mb-12">
					<span className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#5a80b9]">
						Corporate Governance
					</span>
					<h2 className="mb-4 text-3xl font-bold text-[#323441] md:text-4xl">
						Organizational Structure
					</h2>
				</div>

				<div className="max-w-7xl mx-auto px-4">
					<div className="flex justify-center w-full relative h-[600px] md:h-[800px] lg:h-[1000px]">
						<Image
							src="/assets/struktur-organisasi.jpg"
							alt="Corporate Governance Organizational Structure"
							fill
							className="object-contain"
							quality={100}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
