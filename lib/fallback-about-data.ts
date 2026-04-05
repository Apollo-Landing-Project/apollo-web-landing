// lib/fallback-about-data.ts
export interface TeamMember {
	id: string;
	name: string;
	positionDesc: string;
	photo: string;
}

export interface StructureItem {
	id: string;
	name: string;
	icon: string;
}

export interface AboutPageData {
	hero: {
		badge: string;
		title: string;
		desc: string;
		background: string;
	};
	vision: {
		badge: string;
		title: string;
		desc: string;
		quote: string;
		list: string[];
		imageParent: string;
		imageChild: string;
	};
	mission: {
		badge: string;
		title: string;
		desc: string;
		quote: string;
		list: string[];
		imageParent: string;
		imageChild: string;
	};
	history: {
		badge: string;
		title: string;
		desc: string;
		imageParent: string;
		imageChild: string;
	};
	companyStructure: {
		badge: string;
		title: string;
		desc: string;
		items: StructureItem[];
	};
	boc: {
		badge: string;
		title: string;
		desc: string;
		members: TeamMember[];
	};
	bod: {
		badge: string;
		title: string;
		desc: string;
		members: TeamMember[];
	};
	metadata: {
		title: string;
		description: string;
		og_image: string;
	};
}

export const fallbackAboutData: { data: AboutPageData } = {
	data: {
		hero: {
			badge: "Tentang Kami",
			title: "Pelajari Lebih Lanjut Tentang Apollo Global Interactive",
			desc: "PT Apollo Global Interactive Tbk adalah perusahaan otomotif terintegrasi yang menyediakan solusi dealer, penyewaan mobil, layanan servis, dan ritel mobil bekas melalui sistem layanan terpadu.",
			background:
				"https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327525-7zpn.jpg",
		},
		vision: {
			badge: "Visi",
			title: "Visi Kami",
			desc: "Menjadi perusahaan otomotif terintegrasi terkemuka yang membentuk masa depan mobilitas melalui inovasi, keunggulan operasional, dan pertumbuhan berkelanjutan.",
			quote:
				"Melalui visi ini, Perseroan berkomitmen untuk memperkuat kehadiran pasarnya sambil menciptakan nilai berkelanjutan bagi semua pemangku kepentingan.",
			list: [
				"Memberikan solusi otomotif terintegrasi di seluruh siklus hidup kendaraan",
				"Membangun nilai jangka panjang bagi pelanggan, mitra, dan pemangku kepentingan",
				"Mendorong inovasi melalui teknologi dan keunggulan layanan",
				"Mempromosikan praktik bisnis yang berkelanjutan dan bertanggung jawab",
			],
			imageParent:
				"https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327532-cb8a.jpg",
			imageChild:
				"https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327532-ishp.jpg",
		},
		mission: {
			badge: "Misi",
			title: "Misi Kami",
			desc: "Memberikan layanan otomotif terintegrasi dengan fokus kuat pada kualitas, keandalan, dan kepuasan pelanggan, didukung oleh manajemen profesional dan perbaikan berkelanjutan.",
			quote:
				"Melalui misi ini, Perseroan bertujuan untuk secara konsisten memberikan nilai, membangun kepercayaan, dan mendukung pertumbuhan jangka panjang bagi pelanggan, mitra, dan pemangku kepentingan.",
			list: [
				"Menyediakan solusi otomotif komprehensif di seluruh dealer, penyewaan, layanan, dan suku cadang",
				"Mempertahankan standar tinggi keunggulan operasional dan kualitas layanan",
				"Memperkuat kemitraan untuk mendukung pertumbuhan bisnis yang berkelanjutan",
				"Memanfaatkan inovasi dan teknologi untuk meningkatkan efisiensi dan kinerja",
			],
			imageParent:
				"https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327532-k690.jpg",
			imageChild:
				"https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327533-r70d.jpg",
		},
		history: {
			badge: "Sejarah",
			title: "Sejarah Perusahaan",
			desc: "PT Apollo Global Interactive Tbk secara resmi mengadopsi identitas barunya setelah RUPSLB yang diadakan pada 21 Januari 2026.\r\n\r\nPerubahan tersebut diungkapkan kepada OJK dan BEI pada 27 Januari 2026 dengan perombakan manajemen.\r\n\r\nPerusahaan melanjutkan kegiatan intinya dalam perdagangan kendaraan, suku cadang, pemeliharaan, dan penyewaan kendaraan dengan identitas baru.",
			imageParent:
				"https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327533-7zi7.jpg",
			imageChild:
				"https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327534-px8d.jpg",
		},
		companyStructure: {
			badge: "Struktur Perusahaan",
			title: "Lihat Struktur Perusahaan Kami",
			desc: "Struktur organisasi PT Apollo Global Interactive mendukung tata kelola yang efektif, akuntabilitas yang jelas, dan pengambilan keputusan strategis.",
			items: [
				{
					id: "d093689b-7cbc-42a4-b8a4-ebb7a4c8e34d",
					name: "Dealer",
					icon: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327536-nin0.jpg",
				},
				{
					id: "ce6435a5-14cb-48d2-a809-118f88d1e3ef",
					name: "Penyewaan Mobil",
					icon: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327536-5xra.jpg",
				},
				{
					id: "662533aa-d7da-40a8-a38a-86d45199ec87",
					name: "Servis Mobil",
					icon: "https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327536-fboi.jpg",
				},
			],
		},
		boc: {
			badge: "Komisaris Kami",
			title: "Komisaris (BOC)",
			desc: "Dewan Komisaris mengawasi dan memberikan panduan strategis kepada Dewan Direksi untuk memastikan tata kelola perusahaan yang baik dan keberlanjutan jangka panjang.",
			members: [
				{
					id: "b0e3ebc8-7814-40a6-8fdb-86d4a4bbdc07",
					name: "Romeo Lledo",
					positionDesc: "Komisaris Utama",
					photo:
						"https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327536-qstl.jpg",
				},
				{
					id: "0acd028f-d9ce-47dd-bf0f-347a2d688370",
					name: "Marjorie E Wairizal, SE",
					positionDesc: "Komisaris Independen",
					photo:
						"https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327536-y4rq.jpg",
				},
			],
		},
		bod: {
			badge: "Direksi Kami",
			title: "Direksi ",
			desc: "Dewan Direksi bertanggung jawab atas pengelolaan operasional Perusahaan dan pelaksanaan strategi untuk mencapai tujuan kami.",
			members: [
				{
					id: "3b61714c-d6c4-4155-a6c0-276ead04525d",
					name: "Albert Witono S",
					positionDesc: "Direktur Utama",
					photo:
						"https://storage.apolloglobalinteractive.com/images/image-20260421-112936-5jpx.jpg",
				},
			],
		},
		metadata: {
			title: "Tentang Kami",
			description:
				"Temukan warisan keunggulan Apollo Global Interactive. Pelajari visi kami untuk mobilitas berkelanjutan, tim kepemimpinan yang berdedikasi, dan komitmen kami terhadap inovasi otomotif.",
			og_image:
				"https://api.apolloglobalinteractive.com/storage/images/image-20260214-012327525-7zpn.jpg",
		},
	},
};
