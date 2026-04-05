/**
 * Fallback Data Strategy for the Services Page.
 * 
 * Digunakan sebagai penangkal error (fallback) ketika API SERVICE gagal diambil.
 */

export interface ServiceHero {
  badge: string | null;
  title: string;
  desc: string;
  background: string;
}

export interface ServiceItem {
  badge: string;
  id: string;
  image: string;
  order: number;
  title: string;
  desc: string;
  location: string;
  contact: string[];
  email: string[];
  quote: string;
}

export interface UsedCarGalleryItem {
  id: string;
  image: string;
  title: string;
  desc: string;
}

export interface UsedCarGallery {
  badge: string;
  title: string;
  desc: string;
  items: UsedCarGalleryItem[];
}

export interface ServiceDataPayload {
  id: string;
  hero: ServiceHero;
  services: ServiceItem[];
  usedCarGallery: UsedCarGallery;
}

export interface ServiceMetadata {
  title: string;
  description: string;
  og_image: string;
}

export interface ServiceApiResponse {
  status: string;
  message: string;
  data: ServiceDataPayload;
  metadata: ServiceMetadata;
}

export const fallbackServiceData: ServiceApiResponse = {
  status: "success",
  message: "Service page retrieved successfully (fallback)",
  data: {
    id: "service-fallback-01",
    hero: {
      badge: "Layanan Kami",
      title: "Pelajari Lebih Lanjut Tentang Apollo Global Interactive",
      desc: "PT Apollo Global Interactive Tbk adalah perusahaan otomotif terintegrasi yang menyediakan layanan dealer, penyewaan mobil, layanan servis mobil, dan solusi penjualan mobil bekas melalui sistem layanan terintegrasi.",
      background: "https://storage.apolloglobalinteractive.com/images/image-20260220-141357-vmid.jpg"
    },
    services: [
      {
        badge: "Layanan#1",
        id: "df0aa3c0-f719-48a8-a34b-c4e332143e08",
        image: "https://storage.apolloglobalinteractive.com/images/image-20260220-141533-xiyi.jpg",
        order: 1,
        title: "Dealer resmi",
        desc: "Solusi layanan penjualan dan purna jual yang komprehensif untuk kendaraan baru merek Honda.",
        location: "Honda Sukun Malang, Jl. S. Supriadi No. 19-22 Sukun, Malang - Jawa Timur",
        contact: ["+6287838699568"],
        email: ["cs@apolloglobalinteractive.com"],
        quote: "Untuk informasi lebih lanjut atau pertanyaan, silakan hubungi kami melalui detail yang tercantum di atas."
      },
      {
        badge: "Layanan#2",
        id: "d2dfd9a9-a0e1-4837-bca9-fa481199f864",
        image: "https://storage.apolloglobalinteractive.com/images/image-20260220-141703-3wtx.jpg",
        order: 2,
        title: "Penyewaan Mobil",
        desc: "Solusi transportasi lengkap yang disediakan melalui layanan sewa kendaraan yang fleksibel dan andal untuk mendukung berbagai kebutuhan mobilitas dan bisnis.",
        location: "Honda Sukun Malang, Jalan S. Supriadi No. 19-22 Sukun, Malang - Jawa Timur",
        contact: ["+6287838699568"],
        email: ["cs@apolloglobalinteractive.com"],
        quote: "Untuk informasi lebih lanjut atau pertanyaan, silakan hubungi kami melalui detail yang tercantum di atas."
      },
      {
        badge: "Layanan#3",
        id: "6c7ec3f3-d6b2-400a-bc68-0b654a821181",
        image: "https://storage.apolloglobalinteractive.com/images/image-20260220-134224-iuej.jpg",
        order: 3,
        title: "Pusat Perbaikan",
        desc: "Solusi fasilitas perawatan dan perbaikan profesional yang dirancang untuk memastikan keandalan, keselamatan, dan kinerja optimal kendaraan.",
        location: "Honda Sukun Malang, Jalan S. Supriadi No. 19-22 Sukun, Malang - Jawa Timur",
        contact: ["+6287838699568"],
        email: ["cs@apolloglobalinteractive.com"],
        quote: "Untuk informasi lebih lanjut atau pertanyaan, silakan hubungi kami melalui rincian yang tercantum di atas."
      }
    ],
    usedCarGallery: {
      badge: "Galeri Mobil Bekas",
      title: "Koleksi Mobil Bekas Kami yang Tersedia",
      desc: "Temukan pilihan mobil bekas berkualitas dengan informasi transparan untuk mendukung keputusan pembelian yang percaya diri.",
      items: [
        {
          id: "1b333d75-59a9-4cce-ad7d-5bfcda859085",
          image: "https://storage.apolloglobalinteractive.com/images/image-20260220-161748-45vm.jpg",
          title: "Honda Civic",
          desc: "Honda Civic adalah mobil kompak yang terkenal karena efisiensi bahan bakar yang luar biasa dan keandalan jangka panjangnya."
        },
        {
          id: "d47cd3b2-d4a7-4162-883a-140b1fb995e7",
          image: "https://storage.apolloglobalinteractive.com/images/image-20260220-162147-iim1.jpg",
          title: "Honda HR-V",
          desc: "Honda HR-V adalah SUV crossover subkompak yang menggabungkan desain eksterior yang stylish dan modern."
        }
      ]
    }
  },
  metadata: {
    title: "Layanan Kami - Apollo Global Interactive",
    description: "Solusi otomotif komprehensif yang disesuaikan untuk Anda.",
    og_image: "https://storage.apolloglobalinteractive.com/images/image-20260220-141357-vmid.jpg"
  }
};
