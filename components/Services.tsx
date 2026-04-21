/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Car, Key, Wrench, Tag } from "lucide-react";

export default function Services({ lang, data }: { lang: string; data: any }) {
	const isId = lang === "id";

	const labels = {
		pill: isId ? "Layanan Kami" : "Our Services",
		seeMore: isId ? "Lihat Layanan Lainnya" : "See More Services",
	};

	const services = data.serviceItems || [];
	/*
    const services = data.serviceItems?.length > 0 ? data.serviceItems : [
        {
            title: isId ? 'Dealer Mobil' : 'Dealership',
            desc: isId ? 'Solusi layanan penjualan dan purna jual yang komprehensif untuk kendaraan baru merek Honda.' : 'Comprehensive sales and after sales service solutions for Honda brand new vehicles.',
            icon: Car,
        },
        {
            title: isId ? 'Rental Kendaraan' : 'Auto Rental',
            desc: isId ? 'Solusi transportasi lengkap dalam bentuk penyewaan kendaraan.' : 'Complete transportation solutions in the form of vehicle rentals.',
            icon: Key,
        },
        {
            title: isId ? 'Layanan Servis' : 'Auto Service',
            desc: isId ? 'Solusi fasilitas perawatan dan perbaikan.' : 'Maintenance and repair facility solutions.',
            icon: Wrench,
        },

    ];
    */

	return (
		<section
			id="services"
			className="w-full bg-[#FAFAFA] py-10 md:py-20 px-4 md:px-10 overflow-hidden scroll-mt-24"
		>
			<div className="mx-auto max-w-[1440px]">
				{/* Header Section */}
				<div className="flex flex-col gap-6 md:gap-10 mb-16 relative">
					<div className="flex flex-col gap-4 items-start max-w-3xl">
						<div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-4 py-1.5 text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15">
							{data.badge || labels.pill}
						</div>

						<h2 className="text-4xl md:text-[54px] font-semibold text-[#323441] leading-tight">
							{data.title}
						</h2>

						<p className="text-lg text-[#323441]/80 leading-relaxed max-w-2xl">
							{data.desc}
						</p>
					</div>
				</div>

				{/* Cards Grid */}
				<div
					className={`grid grid-cols-1 sm:grid-cols-2 ${services.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-6`}
				>
					{services.map((service: any, index: number) => {
						const iconList = [Car, Key, Wrench, Tag];
						const Icon = iconList[index] || Car;

						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ delay: index * 0.1, duration: 0.5 }}
								whileHover={{
									y: -8,
									transition: { duration: 0.3, ease: "easeOut" },
								}}
								className="bg-white rounded-[32px] p-8 lg:min-h-[320px] flex flex-col justify-between group hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.05)] transition-shadow duration-300 overflow-hidden"
							>
								<div className="flex flex-col gap-6">
									{/* Icon Container */}
									<div className="w-14 h-14 bg-[#F2F7FF] rounded-2xl flex items-center justify-center group-hover:bg-[#5a80b9] transition-colors duration-300">
										<Icon
											className="w-7 h-7 text-[#5a80b9] group-hover:text-white transition-colors duration-300"
											strokeWidth={1.5}
										/>
									</div>

									<div className="flex flex-col gap-3">
										<h3 className="text-2xl font-bold text-[#323441] group-hover:text-[#5a80b9] transition-colors duration-300">
											{service.title}
										</h3>
										<p className="text-[#323441]/60 text-lg leading-relaxed">
											{service.desc || service.description}
										</p>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* See More Button */}
				<div className="flex justify-center mt-12">
					<Link
						href={`/${lang}/services`}
						className="rounded-full border border-gray-200 bg-white px-8 py-3 text-base font-medium text-[#323441] shadow-sm transition-colors hover:bg-[#e7e7e7] focus:outline-none focus:ring-2 focus:ring-[#5a80b9] focus:ring-offset-2"
					>
						{labels.seeMore}
					</Link>
				</div>
			</div>
		</section>
	);
}
