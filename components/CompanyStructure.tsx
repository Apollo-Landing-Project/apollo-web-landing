import { Car } from "lucide-react";
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
	items = [],
}: CompanyStructureProps) {
	const primaryDepartment = items[0];
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
			</div>
		</section>
	);
}
