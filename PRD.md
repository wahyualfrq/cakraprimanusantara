# Product Requirements Document (PRD)
## Website Korporat PT Cakra Prima Nusantara

**Versi:** 0.1 (Draft)
**Tanggal:** 21 September 2026
**Status:** Perencanaan — menunggu konfirmasi klien pada poin-poin di §9 sebelum development lanjut ke fase berikutnya.

---

## 1. Latar Belakang & Konteks

PT Cakra Prima Nusantara adalah brand holding baru yang menaungi beberapa unit usaha yang sebelumnya berjalan sebagai entitas/website terpisah:

| Sumber Web Lama | Entitas Asli | Unit Usaha |
|---|---|---|
| `cakraindopratamagroup.co.id` | PT Cakra Indo Pratama | General Contractor & Trading |
| `rentalalatberatpalembang.com` | PT Cakra Indo Pratama (lini rental) | Rental & Penjualan Alat Berat |
| `ostindo.co.id` | PT Anugerah Mustika Ostindo | Agribisnis (Pupuk Hayati & Biopestisida) |

Ketiga website tersebut akan **di-merge menjadi satu website korporat** dengan identitas utama PT Cakra Prima Nusantara sebagai "hub", dan tiap unit usaha tampil sebagai sub-bagian dengan penyesuaian tema visual — bukan sebagai website/domain terpisah.

**Catatan penting:** PT Cakra Indo Pratama dan situs rental alat berat Palembang merupakan entitas & operasional yang sama (alamat kantor pusat, kantor cabang, dan nomor kontak identik). Di website baru, kontennya digabung menjadi satu unit usaha "Alat Berat", bukan dua unit terpisah.

## 2. Tujuan Proyek

1. Menyatukan 3 website lama menjadi satu website korporat yang merepresentasikan PT Cakra Prima Nusantara sebagai holding.
2. Mempertahankan kejelasan identitas tiap unit usaha (audiens & kebutuhan berbeda) melalui pendekatan tema visual yang menyesuaikan, tanpa memecah jadi domain/website terpisah.
3. Website bersifat **full static** — tidak ada CRUD, tidak ada dashboard admin/backend pada fase ini.
4. Mengoptimalkan **SEO**, **performa (Core Web Vitals)**, dan **responsivitas** di seluruh halaman.
5. Struktur dibangun agar mudah di-maintain dan diperluas (unit usaha baru, halaman baru) tanpa merombak arsitektur.

## 3. Non-Goals (Di Luar Cakupan Fase Ini)

- Tidak ada sistem CMS/admin panel untuk update konten oleh client secara mandiri via UI.
- Tidak ada fitur e-commerce/transaksi (checkout, keranjang, pembayaran online).
- Tidak ada sistem autentikasi/login user.
- **Design system final belum ditentukan.** Palet warna, tipografi final, dan referensi visual belum ada dari client. Fase ini hanya membangun *kerangka/skeleton* desain (struktur token), bukan nilai final — lihat §7.

## 4. Target Pengguna

| Unit Usaha | Target Audiens | Kebutuhan Utama |
|---|---|---|
| Kontraktor | Perusahaan tambang/perkebunan, kontraktor lain, procurement korporat | Portofolio proyek, detail layanan, kredibilitas teknis |
| Alat Berat | Perusahaan tambang/perkebunan/konstruksi yang butuh sewa/beli alat | Katalog alat per kategori, spesifikasi, kontak cepat |
| Trading | Perusahaan yang butuh material/cat/oli/baterai industrial | Daftar brand yang didistribusikan, cara jadi mitra |
| Agribisnis | Petani, perkebunan besar (sawit, karet), dinas pertanian | Info produk pupuk/pestisida hayati, riset & sertifikasi, dosis pemakaian |

## 5. Tech Stack

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js (App Router)** | SSG/ISR untuk static-first, Metadata API bawaan, image optimization otomatis |
| Bahasa | **TypeScript** | Type safety untuk data konten terstruktur (produk, proyek, klien, dll) |
| Styling | Tailwind CSS + CSS Variables *(usulan default — lihat §9 poin 5)* | Mendukung theming per unit usaha tanpa duplikasi komponen |
| Konten | File-based (MDX/JSON/TS data modules) di folder `content/` | Static, versionable via git, tidak butuh database |
| Hosting | Vercel *(direkomendasikan)* atau static export | Next.js-native, CDN & image optimization otomatis |
| Font | `next/font` | Self-hosted font, tanpa layout shift, performa baik |

**Prinsip arsitektur:** Semua konten (teks, data proyek, data produk, data klien) disimpan sebagai file lokal (MD/MDX/JSON/TS) di dalam repo — bukan fetch dari API eksternal atau database — sesuai kebutuhan "full static, no CRUD". Update konten dilakukan lewat edit file + redeploy.

## 6. Information Architecture

### 6.1 Sitemap

```
/                                  Homepage (Hub Selector)
/tentang-kami                      Profil grup, sejarah, visi-misi
/portofolio                        Showcase proyek gabungan
/portofolio/[slug]                 Detail proyek (opsional, fase lanjutan)
/berita                            List berita/update gabungan
/berita/[slug]                     Detail artikel
/kontak                            Kontak & lokasi semua unit

/kontraktor                        Landing unit Kontraktor      [tema: konstruksi]
/kontraktor/civil-project
/kontraktor/building-project
/kontraktor/concrete-repair
/kontraktor/mechanical-electrical
/kontraktor/chipping-kelapa-sawit

/alat-berat                        Landing unit Alat Berat      [tema: konstruksi]
/alat-berat/sewa
/alat-berat/sewa/[kategori]        Excavator, Bulldozer, Motor Grader, dll
/alat-berat/penjualan

/trading                           Landing unit Trading         [tema: konstruksi]

/agribisnis                        Landing unit Agribisnis      [tema: hijau/nature]
/agribisnis/produk
/agribisnis/produk/[slug]          Ostindo, Futricho, Bless, Rizafert, Actifert
/agribisnis/riset-inovasi
/agribisnis/sertifikasi
```

*Catatan:* Struktur URL flat (tanpa prefix `/unit-usaha/`) dipilih untuk keterbacaan & SEO — URL lebih pendek, keyword unit usaha langsung terlihat di path.

### 6.2 Navbar

```
[Logo Cakra Prima Nusantara]   Tentang Kami   Unit Usaha ▾   Portofolio   Berita   Kontak   [CTA: Hubungi Kami]
```

Dropdown **"Unit Usaha"** berupa mega menu 4 kolom: Kontraktor, Alat Berat, Trading, Agribisnis — tiap kolom berisi link ke sub-layanan/produk masing-masing (lihat sitemap §6.1). Di mobile, mega menu collapse menjadi accordion.

## 7. Pendekatan Theming (Kerangka, Belum Final)

Karena belum ada referensi desain dari client, fase ini hanya menyiapkan **struktur token**, bukan nilai warna/tipografi final.

- Setiap unit usaha memiliki `data-theme` attribute yang di-inject dari layout folder masing-masing (`/kontraktor`, `/alat-berat`, `/trading` → tema "konstruksi"; `/agribisnis` → tema "agri").
- Komponen UI (Button, Card, Section, dll) ditulis generik memakai CSS variable — **bukan hardcoded warna** — sehingga siap "diisi" begitu brand guideline final tersedia dari client.
- Detail token dan aturan implementasi ada di `STRUCTURE.md` §5.

## 8. Requirement SEO

- Setiap route men-generate metadata sendiri (`title`, `description`, `openGraph`, `canonical`) via Next.js Metadata API — tidak ada metadata statis/duplikat antar halaman.
- Structured data (JSON-LD): `Organization` di level root, `LocalBusiness` per lokasi kantor (Palembang, Jakarta, Tangerang), `Product` untuk tiap produk Agribisnis, `BreadcrumbList` di semua halaman dalam.
- `sitemap.xml` dan `robots.txt` digenerate otomatis (`app/sitemap.ts`, `app/robots.ts`).
- Semantic HTML wajib: heading hierarchy benar (satu `<h1>` per halaman), `alt` text di semua gambar, landmark elements (`<nav>`, `<main>`, `<footer>`).
- Semua gambar lewat `next/image` dengan width/height eksplisit untuk menghindari CLS.
- Target performa: Core Web Vitals lolos kategori "Good" (LCP < 2.5s, INP < 200ms, CLS < 0.1) di mobile.
- URL slug konsisten lowercase-kebab-case dan tidak berubah setelah publish (hindari broken link/redirect chain).

## 9. Keputusan yang Masih Menunggu Konfirmasi Client

Wajib diisi sebelum development lanjut ke detail — dicatat di sini supaya tidak hilang dari radar:

1. **Trading**: unit usaha mandiri atau sub-bagian dari Kontraktor? (pengaruh ke navbar & sitemap)
2. **Tahun berdiri resmi grup** — dipakai untuk klaim "berpengalaman sejak ..." di homepage (kandidat: 1995/Ostindo, 1999/Cakra, atau tahun holding baru terbentuk)
3. **Domain final** — domain baru penuh vs mempertahankan `rentalalatberatpalembang.com` sebagai redirect (berdampak ke SEO lokal yang sudah established)
4. **Konten berita untuk unit Kontraktor & Alat Berat** — saat ini kosong di web lama, apakah ada draft dari client atau mulai dari nol
5. **Styling approach**: Tailwind CSS vs CSS Modules — perlu dipilih sebelum project setup
6. **Hosting target** — konfirmasi Vercel atau ada requirement hosting lain (mempengaruhi apakah pakai `output: 'export'`)

## 10. Content Inventory (Sumber Data Existing)

Referensi konten yang sudah tersedia dari 3 website lama + company profile PDF Ostindo, untuk dipetakan ke folder `content/` saat development:

- **Kontraktor**: 5 layanan (Civil Project, Building Project, Concrete Repair, M&E Contractor, Chipping Kelapa Sawit) + 18 item portofolio proyek
- **Alat Berat**: kategori alat (Excavator, Bulldozer, Motor Grader, Vibro, Wheel Loader, Dump Truck, Forklift, Pontoon, Compressor) + partner brand (Komatsu, Caterpillar, Kobelco, Hyundai, Volvo, Hitachi)
- **Trading**: 10 brand distributor (Jotun, Eneos, GForce Batteries, Massiv Batteries, LiuGong, HEO, Borgari, Conch, R-M, BASF)
- **Agribisnis**: 6 produk (Ostindo, Futricho, Bless NPK, Bless Cair, Rizafert, Actifert) lengkap dosis pemakaian, mekanisme kerja, sertifikasi (SNI, SNI Terbaru, Penghargaan Alih Teknologi LIPI), 12 mitra riset, daftar klien korporat (Astra Agro Lestari, PTPN, Perhutani, Vale Indonesia, dll), 3 berita
- **Kontak**: 5 lokasi (HO Palembang, Kantor Operasional Palembang, Workshop/Pool Palembang, Office Jakarta, Pabrik Tangerang)

## 11. Gap / Konten Baru yang Perlu Ditulis

- Hero headline & tagline untuk brand "PT Cakra Prima Nusantara" (belum ada di sumber manapun, karena ini brand baru)
- Deskripsi singkat unit usaha Trading untuk landing page (web lama cuma punya logo wall, tanpa copy)
- Narasi "Tentang Kami" versi grup yang menggabungkan histori Ostindo (1995) dan Cakra (1999) jadi satu cerita korporat yang koheren

## 12. Success Criteria

- Semua konten dari 3 website lama termigrasi tanpa broken link/404.
- Lighthouse score (mobile) ≥ 90 untuk Performance, SEO, Accessibility, Best Practices.
- Struktur folder & komponen modular sehingga penambahan unit usaha ke-5 tidak butuh restrukturisasi besar.
- Website ter-index dengan baik oleh Google (sitemap submitted, tidak ada halaman ter-block robots.txt yang seharusnya terindex).
