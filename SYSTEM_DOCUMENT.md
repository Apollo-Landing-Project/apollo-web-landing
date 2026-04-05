# Apollo Global Interactive — Landing Page System
## Dokumen Ringkasan Sistem (README + PRD)

> **Versi Dokumen:** 1.0.0
> **Tanggal Diperbarui:** April 2026
> **Status:** Aktif

---

## 1. Overview Sistem

| Atribut | Detail |
|---|---|
| **Nama Sistem** | Apollo Global Interactive — Corporate Landing Page |
| **URL Produksi** | https://apolloglobalinteractive.com |
| **Stack** | Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 |
| **Bahasa** | Bilingual — Indonesia (`/id`) & English (`/en`) |

### Deskripsi Singkat
Website korporat resmi **PT Apollo Global Interactive Tbk** (IDX: BOGA), sebuah perusahaan otomotif terintegrasi Indonesia. Website ini berfungsi sebagai titik komunikasi utama antara perusahaan dengan pelanggan, investor, dan mitra bisnis.

### Tujuan Utama
- Memperkenalkan profil perusahaan, layanan, dan lini bisnis kepada publik
- Menyediakan informasi hubungan investor (saham, laporan, dokumen RUPS)
- Memfasilitasi komunikasi langsung melalui form kontak
- Mendukung SEO organik dengan konten bilingual dan metadata dinamis

### Permasalahan yang Diselesaikan
- Tidak adanya platform digital terpadu untuk mempresentasikan identitas korporat pasca-rebranding
- Keterbatasan aksesibilitas informasi investor bagi publik dan pemegang saham
- Kebutuhan konten multibahasa untuk menjangkau audiens yang lebih luas
- Minimnya kanal resmi yang menampilkan portofolio layanan otomotif secara profesional

---

## 2. Latar Belakang & Problem Statement

PT Apollo Global Interactive Tbk sebelumnya beroperasi dengan nama **PT Bintang Oto Global Tbk**. Setelah RUPSLB pada Januari 2026, perusahaan melakukan rebranding penuh — nama, logo, dan alamat email resmi.

Dalam konteks ini, dibutuhkan sebuah platform digital baru yang:
- Mencerminkan identitas merek baru secara konsisten
- Memberikan informasi akurat dan real-time dari API backend
- Memenuhi standar keterbukaan informasi perusahaan publik (OJK & BEI)
- Dapat diakses oleh seluruh pemangku kepentingan — nasional maupun internasional

---

## 3. Target Pengguna

| Segmen | Kebutuhan Utama |
|---|---|
| **Calon Pembeli Kendaraan** | Informasi layanan dealer, service center, sewa kendaraan |
| **Investor & Analis** | Data struktur saham, laporan keuangan, dokumen RUPS |
| **Mitra Bisnis** | Kontak perusahaan, informasi lini bisnis, peluang kerja sama |
| **Media & Publik Umum** | Berita terbaru, CSR, latar belakang perusahaan |
| **Internal / Admin** | Update konten via CMS backend menggunakan API revalidation |

---

## 4. Fitur Utama

### 4.1 Halaman Beranda (Home)
- **Hero Slider** — Carousel animatif 3 slide dengan tagline utama dan foto korporat; navigasi prev/next + dot indicator.
- **About Us Snapshot** — Ringkasan profil perusahaan + statistik kunci (pengalaman, produk, negara, merek).
- **Services Preview** — 4 kartu layanan utama (Dealership, Car Rental, Service Center, Used Car) dengan ikon lokal.
- **Investor Relations Snapshot** — Widget ringkasan saham (Majority vs. Public) + preview laporan terakhir.
- **Partners Carousel** — Carousel logo mitra keuangan dan mitra asuransi.
- **Contact Section** — Form kontak dengan validasi, embed Google Maps, email, telepon, alamat.

### 4.2 Halaman Tentang Kami (About Us)
- Visi & Misi, Sejarah Perusahaan, Struktur Perusahaan, Profil BOC & BOD, Team Slider.

### 4.3 Halaman Layanan (Services)
- Hero banner dinamis, Service List alternating layout, New Car Gallery Carousel.

### 4.4 Halaman Investor Relations
- Hero banner, Stakeholder Chart (Recharts donut), Stock Chart (TradingView embed), Report Section (pencarian + filter + pagination + unduh PDF).

### 4.5 Halaman Berita & CSR (News)
- Header banner, Company News Grid, CSR Section Grid, halaman detail artikel dan detail CSR.

### 4.6 Fitur Lintas Halaman
- **i18n** — Bilingual `/id` dan `/en` untuk seluruh halaman, metadata, dan sitemap.
- **Navbar Dinamis** — Floating, language switcher, hamburger mobile, Intersection Observer active section.
- **Footer Bilingual** — CTA kontak, link navigasi, lokasi, social links, copyright.
- **SEO Dinamis** — title, description, Open Graph, Twitter Card per halaman dari API.
- **Dynamic Sitemap XML** — Route statis + route laporan investor dinamis.
- **On-Demand Cache Revalidation** — `/api/revalidate` endpoint untuk update konten tanpa rebuild.

---

## 5. Alur Sistem (User Flow)

### Pengunjung Umum
```
User → / → Middleware redirect → /en atau /id
  → Beranda: SSR fetch API (Home + Investor paralel) → render sections
  → Pilih bahasa di Navbar → URL prefix berganti
  → Navigasi ke About / Services / Investor Relations / Berita
  → Isi + submit Form Contact → Sukses
```

### Investor
```
Investor → /en/investor-relation
  → Lihat chart saham, filter dokumen → Download PDF
```

### Update Konten (CMS Webhook)
```
Admin update CMS → Backend POST /api/revalidate?secret=X&tag=home
  → Next.js revalidateTag("home")
  → Cache halaman di-invalidate → Data fresh di-fetch dari API
```

---

## 6. Arsitektur Sistem

```
+---------------------------------------------------+
|              Browser / Client                     |
|  React Hydration, Framer Motion, User Events      |
+------------------------+--------------------------+
                         | HTTP Request
+------------------------v--------------------------+
|          Next.js App (Server-Side)                |
|                                                   |
|  App Router /[lang]/...   API /api/revalidate     |
|         lib/fetcher.ts  (auth via Cookie header)  |
+------------------------+--------------------------+
                         | HTTPS + API Token
+------------------------v--------------------------+
|  Backend API: api.apolloglobalinteractive.com     |
|                                                   |
|  GET client/home, about-us, service,              |
|      news, news/article/{id}, investor            |
+---------------------------------------------------+
```

**Interaksi Komponen:**
- Server Components (`page.tsx`) fetch data; token tidak keluar ke browser.
- Client Components menerima data via props dan mengelola interaktivitas UI.
- Cache dikelola Next.js tag-based; di-invalidate on-demand via webhook.
- Fallback data tersedia di setiap `page.tsx` sebagai pengaman.

---

## 7. Teknologi yang Digunakan

### Framework & Runtime
| Teknologi | Versi | Kegunaan |
|---|---|---|
| Next.js | 16.1.6 | Framework utama: App Router, SSR, ISR, API Routes |
| React | 19.2.3 | UI rendering |
| TypeScript | v5 | Type-safe development |
| Tailwind CSS | v4 | Utility-first styling |

### Library Utama
| Library | Kegunaan |
|---|---|
| Framer Motion v12 | Animasi: hero slider, micro-animations, AnimatePresence |
| Lucide React | Ikon SVG modular |
| Recharts v3 | Chart donut/pie kepemilikan saham |
| Embla Carousel React | Carousel kendaraan baru |
| React Day Picker | Date picker laporan investor |
| date-fns | Format dan manipulasi tanggal |

### External Services
| Service | Kegunaan |
|---|---|
| Apollo Global API | Sumber data utama seluruh halaman |
| Google Fonts | Tipografi: Reddit Sans, Geist |
| FlagCDN | Gambar bendera language switcher |
| TradingView *(asumsi)* | Widget chart harga saham IDX: BOGA |
| Google Maps Embed | Peta lokasi kantor |

---

## 8. Struktur Project

```
apollo-web-landing/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx        # Layout utama (Navbar, Footer, Metadata global)
│   │   ├── page.tsx          # Beranda (SSR fetch Home + Investor paralel)
│   │   ├── about/page.tsx    # Tentang Kami
│   │   ├── services/page.tsx # Layanan
│   │   ├── investor-relation/
│   │   │   ├── page.tsx      # Investor Relations
│   │   │   └── [slug]/       # Detail laporan
│   │   └── news/
│   │       ├── [slug]/page.tsx  # Detail artikel
│   │       └── csr/[slug]/      # Detail CSR
│   ├── api/revalidate/
│   │   └── route.ts          # POST: cache revalidation endpoint
│   ├── sitemap.ts            # Sitemap dinamis
│   └── robots.ts             # robots.txt
│
├── components/
│   ├── Hero.tsx              # Carousel hero (Client)
│   ├── AboutUs.tsx           # Snapshot about beranda
│   ├── Services.tsx          # Preview layanan beranda
│   ├── HomeInvestor.tsx      # Widget investor beranda
│   ├── Partners.tsx          # Carousel logo mitra
│   ├── Contact.tsx           # Form kontak + Maps
│   ├── Navbar.tsx            # Navigasi global (Client)
│   ├── Footer.tsx            # Footer bilingual
│   ├── BackToTop.tsx         # Floating scroll-to-top
│   ├── [halaman dalam...]    # AboutHeader, ServiceList, CSRCarousel, dll.
│   └── InvestorRelation/
│       ├── InvestorHero.tsx
│       ├── StakeholderCharts.tsx
│       ├── StockChart.tsx
│       └── ReportSection.tsx
│
├── lib/
│   ├── fetcher.ts            # Helper SSR fetch (auth, error handling)
│   └── constants.ts          # SITE_URL per environment
│
├── public/
│   ├── logo-new.png
│   ├── site.webmanifest
│   └── assets/
│
├── .env                      # Env variables (tidak di-commit)
├── next.config.ts            # Konfigurasi Next.js (image domains)
└── package.json
```

---

## 9. Cara Menjalankan Sistem

### Prasyarat
- Node.js >= 18.x, npm >= 9.x
- Akses API token dari tim backend

### Trigger Revalidation Manual
```bash
curl -X POST "https://apolloglobalinteractive.com/api/revalidate?secret=SECRET&tag=home"
curl -X POST "https://apolloglobalinteractive.com/api/revalidate?secret=SECRET&tag=investor_relation"
```

---

## 10. Kelebihan Sistem

- **Full Server-Side Rendering** — Data di-fetch di server; SEO sempurna, tidak ada loading state untuk pengguna.
- **Keamanan Token** — API token hanya ada di environment server, tidak pernah terekspos ke browser.
- **On-Demand Cache Invalidation** — Konten update instan dari CMS tanpa rebuild/redeploy.
- **Bilingual Built-in** — i18n native untuk UI, metadata, sitemap, dan fallback data.
- **Animasi Premium** — Framer Motion untuk transisi hero, micro-animations, menu mobile.
- **SEO-First Architecture** — Metadata dinamis per halaman dari API (OG, Twitter Card, hreflang).
- **Dynamic Sitemap** — Mencakup route statis dan route laporan investor runtime.
- **TypeScript Strict** — Interface eksplisit untuk semua data API, meminimalkan runtime error.
- **Responsive Design** — Layout mobile, tablet, dan desktop dengan Tailwind CSS.

---

## 11. Keterbatasan Sistem

- **Fallback Tidak Aktif di Semua Halaman** — akan crash jika API gagal
- **Tidak Ada Error Boundary per Route** — Tidak terdapat `error.tsx` per route segment.
- **Social Links Placeholder** — Link media sosial di footer masih mengarah ke `#`.
- **Tag `<marquee>` Deprecated** — Digunakan pada deskripsi kartu berita di beranda; usang dan tidak direkomendasikan untuk produksi.
- **Tidak Ada State Management Global** — Tidak ada Redux/Zustand; bisa menjadi limitasi untuk state yang perlu di-share antar banyak komponen.
---

## 12. Rencana Pengembangan (Future Work)
- [ ] Aktifkan fallback data di semua halaman (uncomment return fallback)
- [ ] Tambahkan `error.tsx` per route segment
- [ ] Ganti `<marquee>` dengan CSS animation modern
- [ ] Pencarian, filter, dan pagination di halaman News
- [ ] Auto-detection bahasa browser
- [ ] PWA optimization (service worker, offline support)
- [ ] Optimasi gambar konsisten (WebP + sizes prop)

---

## Appendix: Endpoint API

| Endpoint | Halaman | Keterangan |
|---|---|---|
| `GET /client/home?lang={lang}` | Beranda | Hero, about, services, partners, contact |
| `GET /client/about-us?lang={lang}` | About | Visi, misi, sejarah, BOC, BOD |
| `GET /client/service?lang={lang}` | Services | Detail layanan + galeri kendaraan |
| `GET /client/news?lang={lang}` | News | Daftar berita dan CSR |
| `GET /client/news/article/{id}?lang={lang}` | News Detail | Konten artikel lengkap |
| `GET /client/investor?lang={lang}` | IR + Widget | Saham + laporan |
| `POST /api/revalidate?secret=&tag=` | CMS Webhook | On-demand cache invalidation |

---

*Item bertanda *(asumsi)* merupakan inferensi logis dari bukti tidak langsung dalam kode sumber.*
