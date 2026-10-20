# STRUCTURE.md
## Aturan Struktur & Konvensi Proyek — Redesign Website PT Anugerah Mustika Ostindo

Dokumen ini adalah rujukan teknis untuk bagaimana proyek disusun: folder, penamaan, pengelolaan konten, kerangka theming, dan pola implementasi SEO. Nilai desain (warna, font, spacing) ada di `DESIGN.md`; dokumen ini hanya menunjukkan kerangka dan cara pakainya di kode.

> **Scope final (21 Oktober 2026):** proyek ini hanya redesign website Ostindo (`PRD.md` §1). Route, folder, komponen, dan content model khusus Kontraktor, Alat Berat, dan Trading diberi label `OUT OF SCOPE` di bawah. **Semuanya masih ada di codebase** dan tidak dihapus oleh revisi dokumen ini; pembersihannya pekerjaan terpisah (`GAP-REPORT.md` §8). Pohon di §2 adalah struktur target v0.1 dengan label status; selisihnya terhadap kode ada di §2.2.

---

## 1. Prinsip Umum

1. **Static-first.** Tidak ada database, tidak ada API route untuk CRUD. Semua data konten adalah file lokal di dalam repo.
2. **Satu sumber kebenaran per jenis konten.** Data produk, riset, pelanggan, berita, kontak, dsb masing-masing punya satu lokasi penyimpanan — tidak ada duplikasi data yang sama di lebih dari satu tempat.
3. **Komponen generik, tema terpusat.** Komponen UI tidak boleh hardcode warna/identitas. Styling diatur lewat CSS variable `--cpn-*` (tema tunggal hijau — `DESIGN.md` §4). Mekanisme `data-theme` per unit usaha dari v0.1 tidak lagi diperlukan.
4. **Semua halaman punya metadata sendiri.** Tidak ada halaman yang mewarisi title/description dari parent tanpa override eksplisit.

---

## 2. Struktur Folder (App Router)

```
├── app/
│   ├── layout.tsx                 # Root layout: <html>, font, Navbar, Footer (v0.1 juga menyebut "ThemeProvider skeleton"; tidak ada di kode)
│   ├── page.tsx                   # Homepage Ostindo (v0.1: "hub selector" — OUT OF SCOPE)
│   ├── globals.css                # CSS variable base + reset
│   ├── sitemap.ts                 # Sitemap generator
│   ├── robots.ts                  # Robots.txt generator
│   ├── manifest.ts                # Web app manifest (opsional)
│   │
│   ├── tentang-kami/
│   │   └── page.tsx
│   ├── portofolio/                # VERIFY — PRD.md §9 poin 2 (situs Ostindo tidak punya Portofolio)
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx        # tidak ada di codebase
│   ├── berita/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── kontak/
│   │   └── page.tsx
│   │
│   ├── kontraktor/                # OUT OF SCOPE (masih ada di codebase)
│   │   ├── layout.tsx             # inject data-theme="konstruksi"
│   │   ├── page.tsx
│   │   └── [layanan]/
│   │       └── page.tsx           # dinamis + generateStaticParams, bukan 5
│   │                               # folder terpisah — lihat §2.1 (catatan historis).
│   │
│   ├── alat-berat/                # OUT OF SCOPE (masih ada di codebase)
│   │   ├── layout.tsx             # inject data-theme="konstruksi"
│   │   ├── page.tsx
│   │   ├── sewa/
│   │   │   ├── page.tsx
│   │   │   └── [kategori]/page.tsx
│   │   └── penjualan/page.tsx
│   │
│   ├── trading/                   # OUT OF SCOPE (masih ada di codebase)
│   │   ├── layout.tsx             # inject data-theme="konstruksi"
│   │   └── page.tsx
│   │
│   └── agribisnis/                # bidang usaha Ostindo; prefix URL: PRD.md §9 poin 1
│       ├── layout.tsx             # inject data-theme="agri" (tidak lagi diperlukan — DESIGN.md §4)
│       ├── page.tsx
│       ├── produk/
│       │   ├── page.tsx
│       │   └── [slug]/page.tsx
│       ├── riset-inovasi/page.tsx
│       └── sertifikasi/page.tsx
│
├── components/
│   ├── ui/                        # Komponen generik: Button, Card, Badge, Container, Section
│   ├── layout/                    # Navbar, Footer, MobileNav, MegaMenu (MegaMenu "Unit Usaha" — OUT OF SCOPE)
│   ├── sections/                  # Section besar reusable: HeroSection, ClientLogos, dst (UnitSelector — OUT OF SCOPE)
│   └── unit/                      # Komponen spesifik unit usaha (mis. ProductCard) — folder ini tidak ada di codebase
│
├── content/
│   ├── kontraktor/                # OUT OF SCOPE
│   │   ├── layanan.ts             # data 5 layanan
│   │   └── proyek.ts              # data portofolio proyek (v0.1 menulis 18 item; sumber memuat 23)
│   ├── alat-berat/                # OUT OF SCOPE
│   │   ├── kategori.ts
│   │   └── unit.ts                # daftar unit alat per kategori
│   ├── trading/                   # OUT OF SCOPE
│   │   └── brand.ts
│   ├── agribisnis/
│   │   ├── produk.ts
│   │   ├── sertifikasi.ts
│   │   └── riset.ts
│   ├── berita/
│   │   └── *.mdx                  # satu file per artikel
│   ├── klien.ts                   # daftar klien & mitra gabungan (isi saat ini terkait Kontraktor/Alat Berat — OUT OF SCOPE; pelanggan Ostindo ada di agribisnis/pelanggan.ts)
│   └── kontak.ts                  # 5 lokasi di kode: 3 lokasi Palembang OUT OF SCOPE, 2 lokasi Ostindo (Jakarta Barat, Tangerang)
│
├── lib/
│   ├── seo/
│   │   ├── metadata.ts            # helper generate metadata konsisten
│   │   └── structured-data.ts     # helper generate JSON-LD
│   └── utils.ts
│
├── public/
│   ├── logo/                      # Logo brand, favicon, OG image default — aset kecil & tetap
│   └── icons/
│       # Catatan: foto konten (proyek, produk, alat berat, dll) TIDAK disimpan di sini.
│       # Sumber foto ada di Vercel Blob Storage — lihat §7 Strategi Gambar.
│
├── PRD.md
└── STRUCTURE.md
```

### Kenapa tidak pakai Route Groups `(nama)`?

Route groups (`(folder)`) dipakai untuk mengelompokkan route tanpa menambah segmen URL. Alasan v0.1: tiap unit usaha sudah punya segmen URL sendiri (`/kontraktor`, `/alat-berat`, dst), jadi `layout.tsx` biasa sudah cukup untuk inject tema. Dengan scope Ostindo-saja kesimpulannya tetap: tidak ada kebutuhan pengelompokan route, jadi route group tidak dipakai.

### 2.1 Kenapa `/kontraktor/[layanan]` dinamis, bukan 5 folder terpisah? — `OUT OF SCOPE` (catatan historis)

Route `/kontraktor` termasuk scope lama. Catatan di bawah dipertahankan sebagai jejak keputusan. `PROMPT-LANJUTAN.md` yang dirujuk di sini tidak ditemukan di repo maupun riwayat git (dicatat 21 Oktober 2026).

Versi awal dokumen ini (dan scaffolding awal repo) memakai 5 folder statis
(`civil-project/`, `building-project/`, dst). Setelah migrasi konten (Fase 1,
PROMPT-LANJUTAN.md), keputusannya diubah ke satu route dinamis
`[layanan]/page.tsx` + `generateStaticParams()` dari
`content/kontraktor/layanan.ts` — 5 halaman tetap di-pre-render statis saat
build (D.1), cuma sumber route-nya satu file, bukan 5 file duplikat dengan
struktur JSX yang sama persis. URL publik tidak berubah (slug tetap
`civil-project` dst). Restrukturisasi foldernya sendiri dieksekusi di Fase 2,
bukan Fase 1 — Fase 1 cuma mengisi `content/kontraktor/layanan.ts`.

### 2.2 Selisih dokumen vs codebase (per 21 Oktober 2026)

Dicatat apa adanya; tidak ada kode yang diubah.

| Pohon di §2 | Kondisi codebase |
|---|---|
| `components/unit/` | Tidak ada. Isi `components/`: `layout`, `sections`, `seo`, `ui`. |
| `app/manifest.ts` (opsional), `app/portofolio/[slug]/page.tsx`, `public/logo/`, `public/icons/` | Tidak ada. Aset berada di `public/images/*` dan `public/placeholder/*`. |
| Root layout "ThemeProvider skeleton" | Tidak ada di `app/layout.tsx`. |
| File yang ada di kode tetapi tidak tercantum di pohon | `content/tentang-kami.ts` (isi bertema holding — `OUT OF SCOPE`), `content/agribisnis/{milestone,pelanggan,studi-kasus}.ts`, `lib/content/berita.ts`, `lib/{tanggal,text,whatsapp}`, `components/seo/JsonLd.tsx`, `app/not-found.tsx`, `app/tentang-kami/StatsSection.tsx`, `app/kontak/{ContactForm,FaqSection}.tsx`, `app/portofolio/PortofolioFilter.tsx`, `types/*.d.ts`, `mdx-components.tsx`. |
| Styling | Halaman dan komponen memakai `*.module.css` berdampingan dengan `app/globals.css` (CSS Modules, tanpa Tailwind). |
| §7.1: foto konten tidak disimpan di `public/` | Repo memuat `public/images/portofolio/gambar-1…12.png` (dipakai `content/agribisnis/studi-kasus.ts` lewat path lokal) dan `public/placeholder/*.jpg`. Asal foto belum terverifikasi. |
| §2 dan §2.1 merujuk `PROMPT-LANJUTAN.md` | Dokumen itu tidak ditemukan. |

---

## 3. Konvensi Penamaan

| Item | Aturan | Contoh |
|---|---|---|
| Folder route | lowercase-kebab-case, Bahasa Indonesia (sesuai URL final) | `riset-inovasi`, `tentang-kami` |
| Komponen React | PascalCase | `EditorialIndex.tsx`, `PageHeader.tsx` |
| File data/content | camelCase | `produk.ts`, `kontak.ts` |
| CSS variable | kebab-case dengan prefix `--cpn-` | `--cpn-color-primary`, `--cpn-space-md` |
| Slug produk | lowercase-kebab-case, stabil (tidak berubah setelah publish) | `bless-cair` |

*Catatan prefix `--cpn-`:* awalnya singkatan "Cakra Prima Nusantara" (identitas yang kini `OUT OF SCOPE`). Prefix **dipertahankan** karena sudah dipakai luas di CSS; mengganti namanya adalah refactor besar yang tidak dilakukan tanpa alasan teknis yang konkret. Dicatat di `GAP-REPORT.md` §8 sebagai sisa penamaan lama.

---

## 4. Pengelolaan Konten (Content Layer)

Karena tidak ada database, semua konten terstruktur disimpan sebagai **TypeScript data module** (bertype eksplisit) untuk data pendek/list, dan **MDX** untuk konten panjang (berita, deskripsi produk yang butuh rich text).

Contoh shape data (kerangka awal v0.1; **tipe aktual ada di file `content/` masing-masing** — mis. `Produk` di `content/agribisnis/produk.ts` sudah memuat kategori `pupuk-npk`, `faktaKunci`, `catatanDosis`, dan `catatanPenyimpanan` yang tidak ada di contoh):

```ts
// content/agribisnis/produk.ts
export type Produk = {
  slug: string;
  nama: string;
  kategori: "penyubur-tanah" | "bio-pestisida" | "pupuk-cair" | "mikoriza" | "bio-activator";
  deskripsiSingkat: string;
  deskripsiLengkap: string;
  gambar: string;
  dosisAnjuran?: DosisTable[];
  sertifikasi?: string[];
};

export const produkList: Produk[] = [
  // diisi saat migrasi konten
];
```

```ts
// content/kontraktor/proyek.ts — OUT OF SCOPE (contoh v0.1 dipertahankan sebagai arsip)
export type Proyek = {
  slug: string;
  judul: string;
  kategori: "civil" | "building" | "concrete-repair" | "mechanical-electrical" | "chipping";
  klien?: string;
  lokasi?: string;
  gambar: string;
  ringkasan: string;
};

export const proyekList: Proyek[] = [
  // diisi saat migrasi konten — 18 item dari web lama
];
```

Setiap `page.tsx` yang menampilkan list/detail **mengimpor dari `content/`**, bukan hardcode array di dalam komponen — supaya update konten tidak perlu menyentuh logic komponen.

---

## 5. Kerangka Theming

**Prinsip:** komponen memakai *nama variable*, bukan nilai. Nilai warna/font ada di `DESIGN.md` (sebagian masih `VERIFY`, lihat `DESIGN.md` §9), sehingga perubahan nilai tidak perlu mengubah struktur komponen. Tema sekarang **tunggal (hijau)**; blok tema per unit usaha di bawah adalah arsip v0.1.

```css
/* globals.css — nilai lengkap & rasional ada di DESIGN.md, ini contoh pemakaiannya di kode */
:root {
  --cpn-color-primary: var(--cpn-green-700);        /* #016625 — asal "dari logo": VERIFY, DESIGN.md §2 */
  --cpn-color-primary-hover: var(--cpn-green-800);
  --cpn-color-on-primary: #ffffff;
  --cpn-color-bg: #ffffff;
  --cpn-color-text: var(--cpn-gray-900);

  --cpn-font-heading: var(--font-heading, system-ui);
  --cpn-font-body: var(--font-body, system-ui);

  --cpn-space-xs: 0.25rem;
  --cpn-space-sm: 0.5rem;
  --cpn-space-md: 1rem;
  --cpn-space-lg: 2rem;
  --cpn-space-xl: 4rem;
  --cpn-space-section: 6rem;  /* padding vertikal standar tiap section — DESIGN.md §8.10 */

  --cpn-radius-sm: 4px;
  --cpn-radius-md: 8px;
  --cpn-radius-lg: 20px;      /* card/tile liquid glass */
  --cpn-radius-xl: 28px;      /* hero floating card */
  --cpn-radius-full: 9999px;  /* pill button */
}

/* ARSIP v0.1 — tema per unit usaha, di-scope lewat data-theme di layout.tsx masing-masing.
   Tema "konstruksi" (navy+orange) OUT OF SCOPE dan tidak pernah disetujui; varian "agri"
   tidak lagi punya fungsi pembeda (DESIGN.md §4). Blok ini masih ada di app/globals.css;
   pembersihannya pekerjaan terpisah (GAP-REPORT.md §8). */
[data-theme="konstruksi"] {
  --cpn-color-primary: var(--cpn-navy-700);   /* #16324F — OUT OF SCOPE */
  --cpn-color-accent: var(--cpn-orange-500);  /* #F2994A — OUT OF SCOPE */
}

[data-theme="agri"] {
  --cpn-color-primary: var(--cpn-green-600);  /* #039637 */
  --cpn-color-accent: var(--cpn-green-400);   /* #2BEE70 */
}
```

Token warna lengkap (full scale 50-950 untuk green & gray, plus token liquid glass: blur, border, shadow, scrim) ada di `DESIGN.md` — file ini cuma nunjukkin *cara pakai*-nya di kode, bukan sumber nilai. Kalau ada revisi warna di masa depan, yang diubah cukup `DESIGN.md`.

```tsx
// app/agribisnis/layout.tsx — contoh historis v0.1 (kode saat ini masih seperti ini)
export default function AgribisnisLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="agri">{children}</div>;
}
```

**Aturan wajib untuk komponen UI:**
- Dilarang menulis warna hex/rgb langsung di komponen (`components/ui/*`, `components/sections/*`).
- Semua warna, spacing, radius harus lewat `var(--cpn-*)`.
- Komponen harus terlihat benar (secara struktur/layout) walau semua token diganti nilai lain — ini acceptance test struktur, supaya komponen tidak bergantung pada nilai warna tertentu.

---

## 6. Implementasi SEO (Pola Wajib)

### 6.1 Metadata per halaman

```tsx
// contoh pola, dipakai di setiap page.tsx
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Judul Halaman | PT Anugerah Mustika Ostindo",
    description: "...",
    alternates: { canonical: "https://domain.com/path" },
    openGraph: { title: "...", description: "...", images: ["..."] },
  };
}
```

Helper terpusat di `lib/seo/metadata.ts` supaya format title/OG konsisten di semua halaman (hindari copy-paste struktur berulang). Nama situs dan domain berasal dari `SITE_NAME` dan `SITE_URL` di file itu; nilai saat ini masih "PT Cakra Prima Nusantara" dan domain placeholder `cakraprimanusantara.co.id` — perlu diganti ke Ostindo setelah domain final diputuskan (`PRD.md` §9 poin 1; pekerjaan kode terpisah, `GAP-REPORT.md` §8).

### 6.2 Structured Data (JSON-LD)

Schema hanya untuk **entitas Ostindo** dan fakta yang ada di sumber. Dilarang memasang schema untuk PT Cakra Indo Pratama, PT Cakra Prima Nusantara, atau bisnis rental alat berat.

- `Organization` schema di root layout (sekali, mewakili PT Anugerah Mustika Ostindo).
- `LocalBusiness` schema per lokasi Ostindo di sumber (kantor Jakarta Barat, pabrik Tangerang), dipasang di halaman kontak. Tidak boleh diisi dari `content/kontak.ts` untuk lokasi Palembang.
- `Product` schema di tiap halaman detail produk Ostindo (tanpa harga/rating — `DESIGN.md` §8.11).
- `BreadcrumbList` di semua halaman non-homepage.

Helper generator ada di `lib/seo/structured-data.ts`, dipanggil dari tiap page yang relevan, di-render lewat `<script type="application/ld+json">`. Kondisi saat ini (bertentangan dengan aturan di atas, dicatat untuk pembersihan): `organizationSchema()` memakai `SITE_NAME` nilai lama (§6.1); `app/kontak/page.tsx` memasang `LocalBusiness` untuk seluruh 5 lokasi di `content/kontak.ts` termasuk 3 lokasi Palembang; `app/kontraktor/[layanan]/page.tsx` memasang schema `Service` dengan penyedia `SITE_NAME`; `Product schema` di `app/agribisnis/produk/[slug]/page.tsx` masih `TODO`.

### 6.3 Sitemap & Robots

`app/sitemap.ts` men-generate URL statis + dinamis dari `content/` (produk, berita, dst) **hanya untuk halaman publik yang punya konten layak terbit**. Halaman stub, kosong, atau draft diberi `noindex` dan tidak masuk sitemap. `app/robots.ts` mengizinkan crawl semua halaman publik, disallow halaman non-publik jika ada di fase mendatang. Kondisi saat ini: `app/sitemap.ts` masih memuat `/kontraktor` dan 5 sub-route layanannya (`OUT OF SCOPE`) serta tidak memuat halaman Agribisnis yang masih stub — pembersihan di `GAP-REPORT.md` §8.

### 6.4 Gambar

- Semua gambar lewat `next/image`, wajib `width` & `height` (atau `fill` dengan container beraspect-ratio tetap).
- Alt text deskriptif, bukan nama file (`"Kemasan pupuk organik cair Bless"`, bukan `"IMG_001.jpg"`).

---

## 7. Strategi Gambar (Image Strategy — Confirmed untuk Vercel Pro)

Hosting sudah confirmed ke **Vercel Pro plan** (Hobby tidak dipakai karena ToS Vercel melarang commercial use). Ini jadi dasar keputusan strategi gambar berikut.

### 7.1 Storage sumber gambar

- Gambar mentah **tidak** disimpan di `public/` / git repo. Volume gambar besar akan bikin repo bloat, build lambat, dan tiap ganti foto butuh redeploy penuh.
- Sumber gambar disimpan di **Vercel Blob Storage**. Daftarkan hostname Blob di `next.config.js` lewat `images.remotePatterns` supaya `next/image` tetap bisa mengoptimasi gambar meski sumbernya remote, bukan file lokal.
- File di `content/*.ts` menyimpan **URL Blob**, bukan path file lokal.

```ts
// next.config.js (kerangka)
module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
    deviceSizes: [400, 600, 900, 1200, 1920], // kurasi manual, bukan default Next.js
    imageSizes: [64, 128, 256],
  },
};
```

### 7.2 Kontrol biaya image transformation

Vercel membebankan biaya per *unique transformation* (kombinasi ukuran+format gambar) — bukan per pageview. Sekali sebuah variant ter-generate, dia di-cache di edge dan request berikutnya jadi *cache read* yang jauh lebih murah. Aturan wajib untuk menjaga jumlah variant tetap terkontrol:

- `images.deviceSizes` dan `images.imageSizes` **wajib dikurasi manual** (lihat contoh §7.1) mengikuti 3 kategori ukuran render nyata di desain — jangan pakai default ladder Next.js yang bisa generate belasan ukuran per gambar.
- Setiap `<Image>` **wajib** diisi prop `sizes` secara eksplisit, tidak boleh dibiarkan default — supaya browser cuma minta ukuran yang benar-benar ditampilkan.
- Source image di-resize & compress ke maksimal ±2000px sisi terpanjang **sebelum** diupload ke Blob (lihat pipeline §7.3) — mengecilkan beban transformasi & cache storage di Vercel.

### 7.3 Pipeline upload gambar

Untuk volume gambar besar, gambar tidak diupload mentah satu-satu. Pakai script batch sekali jalan (pakai `sharp`) sebelum upload ke Blob:

1. Terima foto asli dari client
2. Resize ke maksimal ±2000px sisi terpanjang, compress quality ~80%
3. Upload hasil ke Vercel Blob
4. Isi field gambar di `content/*.ts` dengan URL Blob yang didapat

### 7.4 Monitoring

Pantau tab **Image Optimization** di Vercel dashboard pada beberapa minggu pertama setelah launch. Lonjakan transformation di luar ekspektasi biasanya menandakan breakpoint kurang terkurasi atau ada `<Image>` yang belum diisi `sizes` eksplisit.

### 7.5 Escape hatch

Karena struktur data hanya menyimpan URL (bukan file), migrasi ke image CDN eksternal (Cloudinary/imgix) atau self-hosted optimization di masa depan — kalau volume/biaya jadi tidak proporsional — tidak memerlukan restrukturisasi `content/` atau komponen. Cukup ganti base URL dan `remotePatterns`.

---

## 8. Checklist Sebelum Halaman Dianggap "Selesai"

- [ ] `generateMetadata()` terisi (title, description, canonical, OG)
- [ ] Heading hierarchy benar (satu `<h1>`)
- [ ] Semua gambar pakai `next/image` dengan alt text deskriptif dan prop `sizes` eksplisit (lihat §7.2)
- [ ] Tidak ada warna/spacing hardcode — semua lewat CSS variable
- [ ] Data diambil dari `content/`, bukan hardcode di komponen
- [ ] Responsive di breakpoint mobile, tablet, desktop
- [ ] Structured data terpasang jika halaman termasuk kategori yang wajib (produk, kontak, breadcrumb)
- [ ] Tidak ada identitas, data, atau schema dari entitas di luar scope (PT Cakra Indo Pratama, PT Cakra Prima Nusantara, rental alat berat)
- [ ] Halaman stub, kosong, atau draft: `noindex` dan tidak masuk sitemap
- [ ] Semua angka/klaim di halaman bisa ditelusuri ke sumber Ostindo (`CONTENT-VERBATIM.md`, `CONTENT-SOURCE.md`)