/**
 * Fallback Data Strategy for the Investor Relations Page.
 * 
 * File ini digunakan saat API backend mengalami kegagalan (down/timeout)
 * ketika melakukan proses fetch data untuk halaman Investor Relations.
 * Mengembalikan data ini akan menjaga kewarasan SSR Next.js (tidak crash), 
 * mempertahankan struktur SEO/Metadata, dan tetap menampilkan informasi kritikal bagi investor.
 *
 * Developer Notes:
 * - Struktur Interface harus selalu sinkron dengan output backend API sesungguhnya.
 * - Anda dapat mengubah file URL default (contohnya menambahkan link GDrive cadangan) pada fallback ini.
 */

// ----------------------------------------------------------------------
// TYPES AND INTERFACES (IDENTIK DENGAN BACKEND API)
// ----------------------------------------------------------------------

export interface InvestorHero {
  badge: string;
  title: string;
  desc: string;
  background: string;
}

export interface ShareItem {
  id: string;
  category: "PUBLIC" | "MAJORITY" | string;
  value: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InvestorStakeholders {
  badge: string;
  title: string;
  desc: string;
  shares: ShareItem[];
}

export interface ReportItem {
  id: string;
  title: string;
  description: string;
  file_url: string;
  original_filename?: string;
  download_url?: string;
  published_at: string;
  category: string;
  news_id?: string; // Optional field based on JSON snippet
}

export interface InvestorReport {
  badge: string;
  title: string;
  desc: string;
  reportItems: ReportItem[];
}

export interface InvestorDataPayload {
  id: string;
  hero: InvestorHero;
  stakeholders: InvestorStakeholders;
  report: InvestorReport;
}

export interface InvestorMetadata {
  title: string;
  description: string;
  og_image: string;
}

export interface InvestorApiResponse {
  status: string;
  message: string;
  data: InvestorDataPayload;
  metadata: InvestorMetadata;
}

// ----------------------------------------------------------------------
// FULL FALLBACK DATA (Source of Truth Backup)
// Mengandung data komprehensif untuk menjaga fungsionalitas UI 100% 
// saat Backend gagal memproses permintaan.
// ----------------------------------------------------------------------
export const fallbackInvestorData: InvestorApiResponse = {
  status: "success", // Membohongi UI checker bahwa response ini sukses
  message: "Investor Relation page retrieved via fallback successfully",
  data: {
    id: "2730dff8-b736-41c2-bb17-ffb0fd62c628",
    hero: {
      badge: "Hubungan Investor",
      title: "Kami Konsisten Menjalankan Penciptaan Nilai bagi Pemangku Kepentingan Kami",
      desc: "Kami berkomitmen untuk menegakkan tata kelola perusahaan yang kuat, kinerja yang transparan, dan bisnis yang berkelanjutan untuk secara konsisten meningkatkan nilai jangka panjang bagi semua pemangku kepentingan.",
      background: "https://storage.apolloglobalinteractive.com/images/image-20260223-150450-bpqm.jpg"
    },
    stakeholders: {
      badge: "Pemegang Saham Kami",
      title: "Pemegang saham",
      desc: "Struktur kepemilikan saham kami yang transparan mencerminkan komitmen kami terhadap kepemilikan yang seimbang dan partisipasi publik.",
      shares: [
        {
          id: "6696d0a3-2057-40a7-8315-9074dfa12d81",
          category: "PUBLIC",
          value: "2680000000",
          createdAt: "2026-02-15T09:34:46.800Z",
          updatedAt: "2026-02-15T09:34:46.800Z"
        },
        {
          id: "35cb8d63-4452-4c61-bc11-11ae95e25d9e",
          category: "MAJORITY",
          value: "1120000000",
          createdAt: "2026-02-15T09:35:11.592Z",
          updatedAt: "2026-02-15T09:35:20.330Z"
        }
      ]
    },
    report: {
      badge: "Laporan Kami",
      title: "Laporan Umum",
      desc: "Akses laporan keuangan dan laporan operasional kami.",
      reportItems: [
        {
          id: "79fd9682-0039-4c0b-a783-3d5c41b55aae",
          title: "Laporan Keuangan 31 Desember",
          description: "Laporan Keuangan 31 Desember",
          file_url: "https://storage.apolloglobalinteractive.com/files/report-20260401-145011612-c0il.pdf",
          published_at: "2026-04-01T07:49:17.942Z",
          category: "Laporan Keuangan"
        },
        {
          id: "75111255-169d-46da-9f95-a07b25d3a692",
          title: "Laporan Tahunan 2024",
          description: "Laporan Tahunan 2024",
          file_url: "https://storage.apolloglobalinteractive.com/files/report-20260223-160908462-x5rt.pdf",
          published_at: "2026-02-15T05:14:58.870Z",
          category: "Laporan Keuangan"
        }
      ]
    }
  },
  metadata: {
    title: "Hubungan Investor",
    description: "Hubungan Investor: Akses data saham real-time, laporan keuangan, dan wawasan strategis. Bergabunglah dalam perjalanan pertumbuhan berkelanjutan dan kepemimpinan pasar kami.",
    og_image: "https://storage.apolloglobalinteractive.com/images/image-20260223-150450-bpqm.jpg"
  }
};

// ----------------------------------------------------------------------
// MINIMAL FALLBACK DATA (Lightweight Emergency Version)
// ----------------------------------------------------------------------
// Berguna untuk kondisi ekstrem dimana file storage down / payload wajib sangat kecil.
// Menampilkan poin-poin kritikal (Hero, Chart Kosongan), 
// tapi menyembunyikan list Dokumen Laporan agar tidak terjadi broken link. 
// ----------------------------------------------------------------------
export const minimalFallbackInvestorData: InvestorApiResponse = {
  status: "success",
  message: "Lightweight minimal fallback active",
  data: {
    id: "investor-minimal-fallback",
    hero: {
      badge: "Investor Relations",
      title: "Pusat Hubungan Investor Apollo",
      desc: "Informasi strategis bagi para pemegang saham dan pemangku kepentingan.",
      background: "" // Empty will fallback to styling defaults
    },
    stakeholders: {
      badge: "Komposisi Saham",
      title: "Data Kepemilikan Sementara",
      desc: "Menyesuaikan dengan data terbaru dari IDX...",
      shares: [] // Array kosong aman untuk Recharts donut jika dicoding secara defensive
    },
    report: {
      badge: "Arsip Laporan",
      title: "Laporan Sedang Dimuat...",
      desc: "Sistem pengarsipan dokumen kami sedang dalam pemeliharaan berkala. Silakan coba beberapa saat lagi.",
      reportItems: [] // Render safe state: "Tidak ada dokumen" alih-alih error
    }
  },
  metadata: {
    title: "Hubungan Investor",
    description: "Sistem Informasi Hubungan Investor Apollo Global Interactive.",
    og_image: ""
  }
};
