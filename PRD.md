# Product Requirements Document (PRD)
## Redesign Website PT Anugerah Mustika Ostindo

**Versi:** 0.2 (Draft) — scope dikoreksi
**Tanggal:** 21 Oktober 2026 (revisi scope; v0.1 bertanggal 21 September 2026)
**Status:** Perencanaan — menunggu konfirmasi klien pada poin-poin di §9 sebelum development lanjut ke fase berikutnya.

> **Koreksi scope (21 Oktober 2026, instruksi pemilik proyek):** proyek ini **hanya** redesign website Ostindo. Rencana v0.1 (menggabungkan tiga website menjadi website holding PT Cakra Prima Nusantara) dibatalkan. Bagian lama yang terkait diberi label `OUT OF SCOPE` di seluruh dokumen, bukan dihapus, supaya jejak keputusan tetap terbaca.

---

## 1. Latar Belakang & Konteks

Proyek ini adalah **redesign website PT Anugerah Mustika Ostindo** (`https://www.ostindo.co.id/`). Website tersebut adalah satu-satunya sumber identitas, konten, dan informasi bisnis.

Fakta dasar perusahaan (sumber: ostindo.co.id/tentang-kami dan PDF Company Profile Ostindo; teks lengkap di `CONTENT-VERBATIM.md` §E1):

- Nama perusahaan: PT Anugerah Mustika Ostindo; merek produk utama: OSTINDO.
- Bidang: produksi dan pemasaran penyubur tanah (pupuk organik hayati), pupuk organik cair, pupuk hayati, biofungisida Futricho, dan pupuk NPK; bidang lain yang disebut sumber: pendampingan petani plasma kelapa sawit dan pembibitan kelapa sawit.
- Berdiri Juli 1995 (Akta Pendirian No. 361, 31 Juli 1995).
- Lokasi: kantor di Jakarta Barat, pabrik di Tangerang, Banten.
- Struktur situs resmi saat ini (diverifikasi 21 Oktober 2026): menu Tentang Kami, Produk, Riset & Inovasi, Berita, dan tombol Hubungi Kami.

**Catatan istilah:** kata "Agribisnis" pada nama route, folder `content/agribisnis/`, dan dokumen lama merujuk ke bidang usaha Ostindo itu sendiri, **bukan** salah satu unit dari sebuah holding.

### Riwayat scope — `OUT OF SCOPE` (dicatat untuk keterlacakan)

v0.1 merencanakan penggabungan tiga website (`cakraindopratamagroup.co.id`, `rentalalatberatpalembang.com`, `ostindo.co.id`) menjadi satu website korporat PT Cakra Prima Nusantara dengan empat unit usaha (Kontraktor, Alat Berat, Trading, Agribisnis). Dua website pertama, PT Cakra Indo Pratama, PT Cakra Prima Nusantara sebagai identitas website, serta unit Kontraktor, Alat Berat, dan Trading **tidak termasuk scope**. Implementasi yang masih memuatnya dicatat sebagai pekerjaan pembersihan terpisah di `GAP-REPORT.md` §8; tugas dokumentasi ini tidak mengubah source code.

## 2. Tujuan Proyek

1. Mendesain ulang website Ostindo menjadi website korporat yang modern dan profesional untuk menyampaikan informasi resmi PT Anugerah Mustika Ostindo kepada pelanggan, calon pelanggan, mitra, dan pihak lain. Arah visual: `DESIGN.md`.
2. Mempertahankan seluruh informasi Ostindo yang valid dari sumber (profil, produk, dosis, riset, sertifikasi, berita, kontak) tanpa menambah klaim yang tidak bersumber.
3. Website bersifat **full static** — tidak ada CRUD, tidak ada dashboard admin/backend pada fase ini.
4. Mengoptimalkan **SEO**, **performa (Core Web Vitals)**, dan **responsivitas** di seluruh halaman.
5. Struktur dibangun agar mudah di-maintain dan diperluas (halaman dan jenis konten baru Ostindo) tanpa merombak arsitektur.

## 3. Non-Goals (Di Luar Cakupan Fase Ini)

- Tidak ada sistem CMS/admin panel untuk update konten oleh client secara mandiri via UI.
- Tidak ada fitur e-commerce/transaksi (checkout, keranjang, pembayaran online).
- Tidak ada sistem autentikasi/login user.
- Tidak memuat identitas, konten, atau data bisnis dari `cakraindopratamagroup.co.id`, `rentalalatberatpalembang.com`, PT Cakra Indo Pratama, maupun PT Cakra Prima Nusantara.
- Tidak menyalin konten atau layanan website referensi visual (LawnBuster); hanya pendekatan visualnya yang diadaptasi ke konteks Ostindo (`DESIGN.md` §10).
- Design system **sebagian sudah dikunci** (warna hijau brand, tipografi, konsep liquid glass — `DESIGN.md`); item yang masih proposal atau belum terverifikasi dicatat di `DESIGN.md` §9, bukan dianggap final.

## 4. Target Pengguna

Segmentasi di bawah disimpulkan dari narasi sumber Ostindo (`CONTENT-VERBATIM.md` §E1, §E3). Belum ada dokumen persona dari klien → `VERIFY`.

| Audiens | Kebutuhan Utama | Dasar dari sumber |
|---|---|---|
| Perusahaan perkebunan besar (mis. kelapa sawit, karet, tebu), termasuk kebun di lingkungan PTPN | Info produk, dosis pemakaian, hasil riset, sertifikasi | Narasi §E1 (dipakai perkebunan besar) dan §E3 (penggunaan di lingkungan PTPN) |
| Proyek pembangunan pertanian/perkebunan nasional dan reklamasi areal purna tambang | Info produk penyubur tanah, rekam jejak reklamasi | Narasi §E1; milestone 2001 (reklamasi lahan purna tambang) |
| Petani/pekebun | Cara pakai produk, kontak untuk pendampingan | §E1 (pemasaran menjangkau petani/pekebun), §G6 (pendampingan ke konsumen) |
| Lembaga riset dan instansi pertanian | Kerja sama riset, inovasi, sertifikasi | §E3 (kerja sama penelitian dan pengembangan) |

Segmen Kontraktor, Alat Berat, dan Trading (audiens PT Cakra Indo Pratama) — `OUT OF SCOPE`.

## 5. Tech Stack

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js (App Router)** | SSG/ISR untuk static-first, Metadata API bawaan, image optimization otomatis |
| Bahasa | **TypeScript** | Type safety untuk data konten terstruktur (produk, riset, sertifikasi, berita, pelanggan, kontak) |
| Styling | **CSS Modules + CSS Variables** (token `--cpn-*`) | Sesuai implementasi: `package.json` tidak memuat Tailwind dan komponen memakai `*.module.css`. Usulan Tailwind di v0.1 tidak diadopsi. Token tema tetap terpusat di `app/globals.css`. |
| Konten | File-based (MDX/JSON/TS data modules) di folder `content/` | Static, versionable via git, tidak butuh database |
| Hosting | Vercel Pro (tercatat "confirmed" di `STRUCTURE.md` §7; asal konfirmasi tidak tercatat) | Next.js-native, CDN & image optimization otomatis. `next.config.ts` tidak memakai `output: 'export'`. |
| Font | `next/font` | Self-hosted font, tanpa layout shift, performa baik. Pilihan font heading: lihat konflik di `DESIGN.md` §6 dan `GAP-REPORT.md` §4. |

**Prinsip arsitektur:** Semua konten (teks, data produk, data riset, data pelanggan) disimpan sebagai file lokal (MD/MDX/JSON/TS) di dalam repo — bukan fetch dari API eksternal atau database — sesuai kebutuhan "full static, no CRUD". Update konten dilakukan lewat edit file + redeploy.

## 6. Information Architecture

### 6.1 Sitemap

Tabel berikut memetakan route yang ada di codebase (per 21 Oktober 2026) terhadap struktur situs resmi Ostindo dan scope final. **Tidak ada URL yang diubah oleh revisi dokumen ini**; keputusan URL ada di §9 poin 1.

| Route (codebase) | Padanan di ostindo.co.id | Status |
|---|---|---|
| `/` | Beranda | Ada. Copy masih copy holding → perlu ditulis ulang untuk Ostindo (§11). |
| `/tentang-kami` | `/tentang-kami/` | Ada. Konten kode masih bertema holding (`content/tentang-kami.ts`) → dibersihkan terpisah. |
| `/agribisnis` | tidak ada halaman setara | `VERIFY` — stub, `noindex`. Muncul dari konsep unit usaha; perlu tidaknya dinilai saat URL diputuskan. |
| `/agribisnis/produk` | `/produk/` (semua produk dalam satu halaman) | Stub, `noindex`. |
| `/agribisnis/produk/[slug]` | tidak ada (situs lama tidak punya URL per produk) | Stub. Produk: Ostindo, Futricho, Bless NPK, Bless Cair, Rizafert, Actifert. URL baru, tanpa ekuitas SEO lama. |
| `/agribisnis/riset-inovasi` | `/riset-dan-inovasi/` | Stub, `noindex`. |
| `/agribisnis/sertifikasi` | tidak ada halaman terpisah (bagian "Sertifikat & Penghargaan" ada di halaman Riset & Inovasi) | `VERIFY` — perlu tidaknya halaman terpisah. Stub, `noindex`. |
| `/berita`, `/berita/[slug]` | `/berita/` (+ halaman 2) | Ada. 2 artikel terbit, 5 draft (§11). |
| `/kontak` | `/hubungi-kami/` | Ada. Data dan FAQ masih memuat konten Cakra → dibersihkan terpisah. |
| `/portofolio` | tidak ada | `VERIFY` — isi saat ini: proyek Kontraktor (`OUT OF SCOPE`) + studi kasus reklamasi Belitung (asal data belum terverifikasi). Lihat §9 poin 2. |
| `/kontraktor` dan 5 sub-route layanan | tidak ada | `OUT OF SCOPE` |
| `/alat-berat`, `/alat-berat/sewa`, `/alat-berat/sewa/[kategori]`, `/alat-berat/penjualan` | tidak ada | `OUT OF SCOPE` |
| `/trading` | tidak ada | `OUT OF SCOPE` |

*Catatan historis (v0.1):* struktur URL flat tanpa prefix `/unit-usaha/` dipilih untuk keterbacaan dan SEO. Dengan scope Ostindo-saja, penilaian ulang prefix `/agribisnis/*` dicatat di §9 poin 1, tidak diputuskan di sini.

### 6.2 Navbar

Navigasi situs resmi Ostindo saat ini: **Tentang Kami, Produk, Riset & Inovasi, Berita**, ditambah tombol **Hubungi Kami**. Navbar hasil redesign mengikuti struktur ringkas ini (arah visual: `DESIGN.md` §7 dan §10). Daftar menu final bergantung pada keputusan §9 poin 1 dan 2.

Mega menu "Unit Usaha" (4 kolom: Kontraktor, Alat Berat, Trading, Agribisnis) dan logo "Cakra Prima Nusantara" dari v0.1 — `OUT OF SCOPE`. Implementasi saat ini (`components/layout/Navbar.tsx`, `MegaMenu.tsx`, `MobileNav.tsx`, `Footer.tsx`) masih memuatnya; pembersihan dicatat di `GAP-REPORT.md` §8.

## 7. Pendekatan Theming

Tema **tunggal berbasis hijau**; nilai token dan rasionalnya ada di `DESIGN.md` §2–§5, cara pakai di kode ada di `STRUCTURE.md` §5.

- Komponen UI (Button, Card, Section, dll) ditulis generik memakai CSS variable — **bukan hardcoded warna**.
- Tema "konstruksi" (navy-orange) untuk Kontraktor/Alat Berat/Trading — `OUT OF SCOPE`. Token dan `data-theme` terkait masih ada di `app/globals.css`; pembersihannya dicatat di `GAP-REPORT.md` §8.
- Varian `data-theme="agri"` awalnya dibuat sebagai pembeda dari hub dan tema konstruksi; fungsi pembeda itu tidak berlaku lagi (lihat `DESIGN.md` §4).

## 8. Requirement SEO

- Setiap route men-generate metadata sendiri (`title`, `description`, `openGraph`, `canonical`) via Next.js Metadata API — tidak ada metadata statis/duplikat antar halaman.
- Structured data (JSON-LD) mencerminkan **entitas Ostindo saja** dan fakta yang ada di sumber: `Organization` di level root (PT Anugerah Mustika Ostindo), `LocalBusiness` hanya untuk lokasi Ostindo di sumber (kantor Jakarta Barat, pabrik Tangerang), `Product` untuk tiap produk Ostindo (tanpa harga/rating — `DESIGN.md` §8.11), `BreadcrumbList` di semua halaman dalam. Dilarang memasang schema untuk PT Cakra Indo Pratama, PT Cakra Prima Nusantara, atau bisnis rental alat berat.
- `sitemap.xml` dan `robots.txt` digenerate otomatis (`app/sitemap.ts`, `app/robots.ts`). Sitemap hanya berisi halaman publik yang punya konten layak terbit; halaman kosong, stub, atau draft tidak masuk sitemap dan diberi `noindex`.
- Semantic HTML wajib: heading hierarchy benar (satu `<h1>` per halaman), `alt` text di semua gambar, landmark elements (`<nav>`, `<main>`, `<footer>`).
- Semua gambar lewat `next/image` dengan width/height eksplisit untuk menghindari CLS.
- Target performa: Core Web Vitals lolos kategori "Good" (LCP < 2.5s, INP < 200ms, CLS < 0.1) di mobile.
- URL slug konsisten lowercase-kebab-case dan tidak berubah setelah publish (hindari broken link/redirect chain). Route atau URL yang sudah relevan tidak dihapus/diubah tanpa menilai dampak SEO dan kebutuhan redirect (§9 poin 1).

## 9. Keputusan yang Masih Menunggu Konfirmasi Client

Dicatat di sini supaya tidak hilang dari radar. Daftar v0.1 (Trading, tahun berdiri grup, domain rental, berita Kontraktor/Alat Berat) sudah tidak berlaku — lihat "Terselesaikan atau tidak berlaku" di bawah.

**Terbuka:**

1. **Domain final dan paritas URL dengan situs lama.** Situs lama: `https://www.ostindo.co.id/` dengan path `/tentang-kami/`, `/produk/` (semua produk satu halaman), `/riset-dan-inovasi/`, `/berita/`, `/hubungi-kami/`. Kode memakai domain placeholder `cakraprimanusantara.co.id` (`lib/seo/metadata.ts`), prefix `/agribisnis/*`, dan `/kontak`. Pertanyaan: domain apa yang dipakai saat rilis, dan apakah URL situs lama dipertahankan atau diganti dengan peta redirect 301? Berdampak ke SEO yang sudah terbentuk.
2. **Nasib `/portofolio` dan studi kasus reklamasi Belitung.** Situs lama tidak punya halaman Portofolio. Isi saat ini: proyek Kontraktor (`OUT OF SCOPE`) dan studi kasus reklamasi lahan bekas tambang timah 114 ha, 2021–2023 (`content/agribisnis/studi-kasus.ts`) yang tidak ditemukan di sumber dokumen maupun situs resmi. Dari mana data studi kasus berasal, dan apakah halamannya dipertahankan?
3. **Klaim lama usaha.** "Berdiri Juli 1995" bersumber (Akta No. 361, 31 Juli 1995). Klaim "lebih dari 25 tahun" (PDF) bertentangan dengan "20 tahun" (kemasan produk) dan tidak dipakai sampai dikonfirmasi (`CONTENT-SOURCE.md` §7).
4. **Aset logo dan asal warna brand.** `DESIGN.md` mencatat `#016625` diambil dari logo (gear dan daun), yang tampaknya logo PT Cakra Prima Nusantara. Perlu aset logo Ostindo untuk memverifikasi. Nilai warna dipertahankan sampai ada bukti lain.
5. **Font heading:** Fraunces (`DESIGN.md` §6, "final") atau Manrope (`app/layout.tsx`) — lihat `GAP-REPORT.md` §4.
6. **Copy homepage.** Copy lama yang tercatat "disetujui" berisi copy holding dan tidak berlaku. Copy Ostindo belum ditulis atau disetujui (§11).
7. **Isi asli 5 artikel berita draft** (`GAP-REPORT.md` §3, §7.1).

**Terselesaikan atau tidak berlaku:**

- ~~Trading: mandiri atau sub-bagian Kontraktor~~ — `OUT OF SCOPE`.
- ~~Tahun berdiri grup (1995/1999/holding)~~ — konsep grup tidak berlaku; untuk Ostindo lihat poin 3.
- ~~Domain `rentalalatberatpalembang.com` sebagai redirect~~ — `OUT OF SCOPE`; diganti poin 1.
- ~~Berita unit Kontraktor dan Alat Berat~~ — `OUT OF SCOPE`.
- Styling approach: **CSS Modules + CSS variables** sesuai implementasi (§5). Tidak ada konfirmasi tertulis dari klien; dicatat sebagai fakta implementasi.
- Hosting: Vercel Pro menurut `STRUCTURE.md` §7 (§5). PRD v0.1 masih mencatatnya sebagai pending — inkonsistensi antardokumen yang kini diselaraskan.

## 10. Content Inventory (Sumber Data Existing)

Sumber konten Ostindo: situs `ostindo.co.id` dan PDF Company Profile Ostindo. Teks utama ada di `CONTENT-VERBATIM.md`; data terstruktur di `CONTENT-SOURCE.md` §7–§9.

- **Profil & Tentang Kami:** profil (berdiri, kedudukan), narasi perusahaan, nilai, "Kenapa Memilih Kami", misi dan visi, visi perusahaan, inovasi perusahaan, legalitas (hanya jenis dokumen, tanpa nomor), Sekapur Sirih (PDF). → `CONTENT-VERBATIM.md` §E1, §G.
- **Produk:** 6 produk (Ostindo, Futricho, Bless NPK, Bless Cair, Rizafert, Actifert). Dosis tersedia untuk Ostindo dan Futricho; satuan dosis Bless Cair ambigu; dosis Rizafert, Actifert, dan Bless NPK tidak ada di sumber. → §E2.
- **Riset & Inovasi:** kerja sama penelitian (`content/agribisnis/riset.ts` memuat 17 entri; `CONTENT-VERBATIM.md` §E3 mencantumkan 23 baris — selisih belum direkonsiliasi), mekanisme kerja (label diagram), milestone 1995–2015, sertifikat dan penghargaan (Sertifikat SNI, SNI terbaru, Penghargaan Alih Teknologi LIPI, SNI ISO 9001:2008, IOPC 2014, Best Fertilizer 2016), daftar 31 pelanggan korporat (`content/agribisnis/pelanggan.ts`).
- **Berita:** 7 artikel terdata (6 di halaman 1, 1 di halaman 2); 2 punya isi asli dan terbit (BRIN, LIPI); 5 draft.
- **Kontak:** 2 lokasi Ostindo (Office Jakarta Barat, Factory Tangerang) dengan WhatsApp, telepon, fax, email, dan Instagram `@pupukkebun`. → §H1.

Inventaris dari `cakraindopratamagroup.co.id` dan `rentalalatberatpalembang.com` (Kontraktor, Alat Berat, Trading, tiga lokasi Palembang) — `OUT OF SCOPE`: tetap tersimpan sebagai arsip di `CONTENT-SOURCE.md` dan `CONTENT-VERBATIM.md`, tidak dimigrasikan.

## 11. Gap / Konten Baru yang Perlu Ditulis

Hanya konten Ostindo; tidak boleh mengarang klaim, angka, atau fakta. Rincian di `GAP-REPORT.md`.

- Copy hero dan section homepage untuk Ostindo (copy holding lama tidak berlaku; belum ada copy baru yang disetujui). Isinya harus bisa ditelusuri ke sumber Ostindo.
- Isi asli 5 artikel berita yang masih draft.
- Dosis Rizafert, Actifert, Bless NPK; satuan dosis Bless Cair; nomor dan masa berlaku sertifikat; foto produk asli; koordinat lokasi.
- File brosur: situs lama tampak memuat brosur PDF Futricho dan Bless Cair serta gambar brosur NPK di `/wp-content/uploads/` (hasil pengecekan 21 Oktober 2026, belum diunduh/diverifikasi).
- Aset logo Ostindo (§9 poin 4).

## 12. Success Criteria

- Seluruh konten Ostindo yang valid dari sumber termigrasi tanpa broken link/404.
- Tidak ada identitas, data, atau schema dari PT Cakra Indo Pratama, PT Cakra Prima Nusantara, atau bisnis rental alat berat di halaman publik (implementasi saat ini belum memenuhi — `GAP-REPORT.md` §8).
- Tidak ada klaim, angka, atau fakta tanpa sumber di UI (`DESIGN.md` §8.7).
- Lighthouse score (mobile) ≥ 90 untuk Performance, SEO, Accessibility, Best Practices.
- Struktur folder & komponen modular sehingga penambahan halaman atau jenis konten Ostindo baru tidak butuh restrukturisasi besar.
- Website ter-index dengan baik oleh Google (sitemap submitted, tidak ada halaman ter-block robots.txt yang seharusnya terindex); halaman draft/kosong tidak terindeks.
