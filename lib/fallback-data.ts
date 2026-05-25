/**
 * Fallback Data Strategy for the Home Page.
 *
 * Digunakan sebagai penangkal error (fallback) ketika API HOME gagal diambil,
 * timeout, atau sedang ada gangguan pada server. Data ini memastikan halaman
 * dapat tetap di-render dengan baik (menjaga SEO & UX) tanpa menyebabkan crash 500.
 *
 * Developer Notes:
 * - Struktur ini IDENTIK dengan response API dari backend.
 * - Anda dapat mengubah value atau deskripsi (copywriting) di bawah jika diperlukan.
 * - Harap pastikan field tetap selaras dengan response asli.
 */

export interface HomeHero {
	id: string;
	title: string;
	desc: string;
	background: string;
}

export interface HomeAbout {
	badge: string;
	title: string;
	desc: string;
	yearsExp: number;
	products: number;
	countries: number;
	brands: number;
}

export interface HomeServiceItem {
	id: string;
	title: string;
	desc: string;
	image: string;
}

export interface HomeServices {
	badge: string;
	title: string;
	desc: string;
	serviceItems: HomeServiceItem[];
}

export interface HomeNewsItem {
	id: string;
	title: string;
	desc: string;
	publishedAt: string;
	image: string;
}

export interface HomeNews {
	badge: string;
	title: string;
	desc: string;
	newsItems: HomeNewsItem[];
}

export interface PartnerItem {
	id: string;
	name: string;
	image: string;
}

export interface HomePartners {
	badge: string;
	title: string;
	desc: string;
	partnersFunding: PartnerItem[];
	partnersInsurance: PartnerItem[];
	partnersDealers: PartnerItem[];
}

export interface HomeContact {
	title: string;
	desc: string;
	email: string[];
	phone: string[];
	address: string;
	mapLink: string;
}

export interface HomeDataPayload {
	id: string;
	hero: HomeHero[];
	about: HomeAbout;
	services: HomeServices;
	news: HomeNews;
	partners: HomePartners;
	contact: HomeContact;
}

export interface HomeMetadata {
	title: string;
	description: string;
	og_image: string;
}

export interface HomeApiResponse {
	status: string;
	message: string;
	data: HomeDataPayload;
	metadata: HomeMetadata;
}

export const fallbackHomeData: HomeApiResponse = {
	status: "success",
	message: "Home page retrieved successfully",
	data: {
		"id": "9ce60a2e-f72d-4a2f-86f2-4f3cd8e449fc",
		"hero": [
			{
				"id": "3bc6c347-7178-425f-ba4e-2b166305d974",
				"title": "Terpadu Otomotif, \nSolusi Layanan",
				"desc":
					"Kami menyediakan solusi otomotif terpadu yang mencakup penjualan kendaraan, layanan rental, pemeliharaan, dan operasional mobil bekas untuk mendukung pertumbuhan bisnis yang berkelanjutan.",
				"background":
					"https://storage.apolloglobalinteractive.com/images/image-20260220-134915-dgdy.jpg",
			},
			{
				"id": "66530cef-da43-4119-afac-f1ad59d5e8e1",
				"title": "Terpadu Otomotif, \nSolusi Layanan.",
				"desc":
					"Teknisi bersertifikat kami memastikan kendaraan Anda tetap dalam kondisi prima dengan layanan perawatan dan perbaikan menyeluruh yang dirancang untuk keandalan.",
				"background":
					"https://storage.apolloglobalinteractive.com/images/image-20260220-134916-zd9n.jpg",
			},
			{
				"id": "c22a90a7-eba9-4397-a464-91d1679b7ff5",
				"title": "Pilihan Premium, \nKualitas Tiada Tanding.",
				"desc":
					"Telusuri koleksi lengkap kendaraan bekas bersertifikat dan baru kami. Kami menjamin kualitas dan transparansi di setiap transaksi.",
				"background":
					"https://storage.apolloglobalinteractive.com/images/image-20260220-135036-hgj8.jpg",
			},
		],
		"about": {
			"badge": "Tentang Kami",
			"title": "Apa itu Apollo Global Interactive?",
			"desc":
				"PT Apollo Global Interactive adalah perusahaan otomotif terpadu yang memiliki lini bisnis dealer, penyewaan mobil, layanan otomotif, dan pengecer mobil bekas. Dengan sistem layanan terintegrasi yang didukung oleh tim manajemen berpengalaman di bidang otomotif.\r\n\r\nKami berkomitmen untuk memberikan solusi otomotif yang andal, efisien, dan berkelanjutan yang menciptakan nilai jangka panjang bagi pelanggan dan pemangku kepentingan.",
			"yearsExp": 35,
			"products": 500,
			"countries": 50,
			"brands": 8,
		},
		"services": {
			"badge": "Layanan Kami",
			"title": "Apa yang Bisa Kami Lakukan untuk Anda",
			"desc":
				"Kami menyediakan solusi otomotif di bidang penjualan, penyewaan, layanan, dan operasi mobil bekas, dengan fokus pada efisiensi, keandalan, dan nilai jangka panjang.",
			"serviceItems": [
				{
					"id": "df0aa3c0-f719-48a8-a34b-c4e332143e08",
					"title": "Dealer resmi",
					"desc":
						"Solusi layanan penjualan dan purna jual yang komprehensif untuk kendaraan baru merek Honda.",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-141533-xiyi.jpg",
				},
				{
					"id": "d2dfd9a9-a0e1-4837-bca9-fa481199f864",
					"title": "Penyewaan Mobil",
					"desc":
						"Solusi transportasi lengkap yang disediakan melalui layanan sewa kendaraan yang fleksibel dan andal untuk mendukung berbagai kebutuhan mobilitas dan bisnis.",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-141703-3wtx.jpg",
				},
				{
					"id": "6c7ec3f3-d6b2-400a-bc68-0b654a821181",
					"title": "Pusat Perbaikan",
					"desc":
						"Solusi fasilitas perawatan dan perbaikan profesional yang dirancang untuk memastikan keandalan, keselamatan, dan kinerja optimal kendaraan.",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-134224-iuej.jpg",
				},
			],
		},
		"news": {
			"badge": "Berita",
			"title": "Berita Terbaru",
			"desc":
				"Tetap mendapat informasi dengan pembaruan terbaru dari perusahaan kami, termasuk inovasi produk, proses manufaktur, wawasan industri, dan pencapaian penting.",
			"newsItems": [
				{
					"id": "06c8fb73-2482-4970-a786-7d882b57f6e7",
					"title": "Harga IHSG Meroket!!!",
					"desc":
						"IHSG Meroket semenjak purbaya sadewa menjadi menteri Keuangan",
					"publishedAt": "2026-02-15T13:40:16.907Z",
					"image":
						"https://api.apolloglobalinteractive.com/storage/images/image-20260215-204016824-2xrt.jpg",
				},
				{
					"id": "0b55ab49-cd91-4e83-b510-8215541f0db3",
					"title": "Laporan 2019",
					"desc": "laporan",
					"publishedAt": "2026-02-15T10:24:19.695Z",
					"image":
						"https://storage.apolloglobalinteractive.com/files/report-20260223-150644952-hiel.jpg",
				},
				{
					"id": "fb59aef6-f3aa-4c62-8bb3-1208acebf6eb",
					"title": "Rangkuman tiap detiknya dari EGMS 2026",
					"desc":
						"Kami telah menyempurnakan produksi untuk mendukung peningkatan kebutuhan produk.",
					"publishedAt": "2026-02-15T04:47:48.854Z",
					"image":
						"https://api.apolloglobalinteractive.com/storage/images/image-20260215-114748795-49co.jpg",
				},
			],
		},
		"partners": {
			"badge": "Rekan Kerja Kami",
			"title": "Kita Lebih Kuat Bersama Melalui Kolaborasi.",
			"desc":
				"Kami membangun kemitraan strategis yang memperkuat kapabilitas kami serta pertumbuhan berkelanjutan jangka panjang.",
			"partnersFunding": [
				{
					"id": "7d37fe75-bd1d-47bb-963a-da37a86b82d0",
					"name": "CIMB Niaga Auto Finance",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-150541-2jld.png",
				},
				{
					"id": "1d4e046c-2d9f-4337-8dde-aa4ff44e46d0",
					"name": "PT Astra Sedaya Finance",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-150742-5mjo.png",
				},
				{
					"id": "f9ddd32f-413a-4a34-a8e1-0553950c65a5",
					"name": "PT Mandiri Tunas Finance",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-150758-cpo3.png",
				},
				{
					"id": "51dc6a58-0ad1-4070-b3ba-5f9d6bacb7c8",
					"name": "PT Mega Auto Finance / MCF",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-150906-slg5.webp",
				},
				{
					"id": "3e9d673b-17d5-4cab-a05b-57b2c64e2d73",
					"name": "Toyota Astra Financial Services",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-150953-mwfn.png",
				},
				{
					"id": "6b5edc14-b977-41df-abcc-c0d74a3b14ea",
					"name": "PT CLIPAN FINANCE",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-151031-e9gj.png",
				},
				{
					"id": "01f64726-e197-4aee-a8eb-1b279d6bed0f",
					"name": "Daihatsu Astra Financial Service",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-151058-wfe8.png",
				},
				{
					"id": "dbda658b-2269-4fcb-beaa-2709014bb69e",
					"name": "Pacific Multi Finance",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-151129-wxr9.png",
				},
			],
			"partnersInsurance": [
				{
					"id": "2fba76b7-8195-4114-a9d1-e8250771c3a9",
					"name": "Asuransi Astra",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-151237-snyn.png",
				},
				{
					"id": "03eee51d-08e6-406c-8924-9848ea185b0d",
					"name": "Garda Oto",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-151259-nygf.png",
				},
				{
					"id": "8ca00f05-eecc-4447-bcbf-94dfdc36010e",
					"name": "Sompo",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-151327-k6rc.png",
				},
				{
					"id": "c236666a-361c-4746-86b3-eb7838827b9d",
					"name": "Jasindo",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-151349-iuoz.webp",
				},
				{
					"id": "9183f4b8-c0ed-4860-99d1-0979906c4215",
					"name": "Zurich",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-151424-wl6q.png",
				},
				{
					"id": "44610e76-bd09-4045-8b03-a843fa7a702d",
					"name": "Asuransi Raksa Pratikara",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-151539-34m4.png",
				},
				{
					"id": "81b894e0-880a-44b9-93b0-b8a5730d2951",
					"name": "Asuransi ACA",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-151637-pe0h.png",
				},
				{
					"id": "2f28de82-46ac-4e20-ac13-6d22a6d17095",
					"name": "RAMAYANA ASURANSI",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-151713-ilvx.png",
				},
				{
					"id": "686f3500-e24a-4deb-909e-cf6420fcf3ce",
					"name": "MEGA INSURANCE",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-151738-vdjp.png",
				},
				{
					"id": "4f710e1b-2c65-47c2-bfcf-75d488097a66",
					"name": "Asuransi Malacca",
					"image":
						"https://storage.apolloglobalinteractive.com/images/image-20260220-151804-rhaj.png",
				},
			],
			"partnersDealers": [
				{
					"id": "dealer-1",
					"name": "Dealer Malang",
					"image": "/assets/stakeholder/placeholder.png",
				},
				{
					"id": "dealer-2",
					"name": "Dealer Klaten",
					"image": "/assets/stakeholder/placeholder.png",
				},
				{
					"id": "dealer-3",
					"name": "Dealer Madiun",
					"image": "/assets/stakeholder/placeholder.png",
				},
				{
					"id": "dealer-4",
					"name": "Dealer Probolinggo",
					"image": "/assets/stakeholder/placeholder.png",
				},
				{
					"id": "dealer-5",
					"name": "Dealer Tabanan",
					"image": "/assets/dealer/dealer-tabanan.jpeg",
				},
			],
		},
		"contact": {
			"title": "Apakah Anda punya pertanyaan?",
			"desc":
				"Hubungi kami untuk pertanyaan produk, kemitraan bisnis, atau informasi umum.",
			"email": ["cs@apolloglobalinteractive.com"],
			"phone": ["+6287838699568"],
			"address":
				"Jl. S. Supriadi No.19-22, Sukun, Kec. Sukun, Kota Malang, Jawa Timur 65147",
			"mapLink":
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.011830276305!2d112.61658927503088!3d-7.997714392028056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e788350dbe153db%3A0xafa7ffa78cff0f77!2sHonda%20Sukun%20Malang%20(Official)!5e0!3m2!1sid!2sid!4v1771569994546!5m2!1sid!2sid",
		},
	},
	"metadata": {
		"title": "Beranda",
		"description":
			"Rasakan masa depan mobilitas bersama Apollo Global Interactive. Kami adalah perusahaan otomotif terintegrasi terkemuka yang menyediakan penjualan, layanan, penyewaan, dan suku cadang untuk memenuhi kebutuhan Anda.",
		"og_image":
			"https://storage.apolloglobalinteractive.com/images/image-20260220-134915-dgdy.jpg",
	},
};
