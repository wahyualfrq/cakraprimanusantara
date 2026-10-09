# STRUCTURE.md
## Aturan Struktur & Konvensi Proyek — Website PT Cakra Prima Nusantara

Dokumen ini adalah rujukan teknis untuk bagaimana proyek disusun: folder, penamaan, pengelolaan konten, kerangka theming, dan pola implementasi SEO. Dokumen ini **tidak berisi nilai desain final** (warna, font, spacing scale) — itu menyusul setelah client menyediakan referensi visual. Yang disiapkan di sini adalah *kerangka* yang siap diisi.

---

## 1. Prinsip Umum

1. **Static-first.** Tidak ada database, tidak ada API route untuk CRUD. Semua data konten adalah file lokal di dalam repo.
2. **Satu sumber kebenaran per jenis konten.** Data proyek, produk, klien, dsb masing-masing punya satu lokasi penyimpanan — tidak ada duplikasi data yang sama di lebih dari satu tempat.
3. **Komponen generik, tema dinamis.** Komponen UI tidak boleh hardcode warna/identitas unit usaha tertentu. Styling unit usaha diatur lewat CSS variable yang di-scope oleh `data-theme`.
4. **Semua halaman punya metadata sendiri.** Tidak ada halaman yang mewarisi title/description dari parent tanpa override eksplisit.

---

## 2. Struktur Folder (App Router)

```
├── app/
│   ├── layout.tsx                 # Root layout: <html>, font, ThemeProvider skeleton, Navbar, Footer
│   ├── page.tsx                   # Homepage (hub selector)
│   ├── globals.css                # CSS variable base + reset
│   ├── sitemap.ts                 # Sitemap generator
│   ├── robots.ts                  # Robots.txt generator
│   ├── manifest.ts                # Web app manifest (opsional)
│   │
│   ├── tentang-kami/
│   │   └── page.tsx
│   ├── portofolio/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── berita/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── kontak/
│   │   └── page.tsx
│   │
│   ├── kontraktor/
│   │   ├── layout.tsx             # inject data-theme="konstruksi"
│   │   ├── page.tsx
│   │   └── [layanan]/
│   │       └── page.tsx           # dinamis + generateStaticParams, bukan 5
│   │                               # folder terpisah — lihat §2.1. Dieksekusi
│   │                               # di Fase 2 (PROMPT-LANJUTAN.md), bukan Fase 1.
│   │
│   ├── alat-berat/
│   │   ├── layout.tsx             # inject data-theme="konstruksi"
│   │   ├── page.tsx
│   │   ├── sewa/
│   │   │   ├── page.tsx
│   │   │   └── [kategori]/page.tsx
│   │   └── penjualan/page.tsx
│   │
│   ├── trading/
│   │   ├── layout.tsx             # inject data-theme="konstruksi"
│   │   └── page.tsx
│   │
│   └── agribisnis/
│       ├── layout.tsx             # inject data-theme="agri"
│       ├── page.tsx
│       ├── produk/
│       │   ├── page.tsx
│       │   └── [slug]/page.tsx
│       ├── riset-inovasi/page.tsx
│       └── sertifikasi/page.tsx
│
├── components/
│   ├── ui/                        # Komponen generik: Button, Card, Badge, Container, Section
│   ├── layout/                    # Navbar, Footer, MegaMenu, MobileNav
│   ├── sections/                  # Section besar reusable: HeroSection, UnitSelector, ClientLogos, dst
│   └── unit/                      # Komponen spesifik unit usaha (mis. ProductCard, ProjectCard, EquipmentCard)
│
├── content/
│   ├── kontraktor/
│   │   ├── layanan.ts             # data 5 layanan
│   │   └── proyek.ts              # data 18 portofolio proyek
│   ├── alat-berat/
│   │   ├── kategori.ts
│   │   └── unit.ts                # daftar unit alat per kategori
│   ├── trading/
│   │   └── brand.ts
│   ├── agribisnis/
│   │   ├── produk.ts
│   │   ├── sertifikasi.ts
│   │   └── riset.ts
│   ├── berita/
│   │   └── *.mdx                  # satu file per artikel
│   ├── klien.ts                   # daftar klien & mitra gabungan
│   └── kontak.ts                  # 5 lokasi kantor/pabrik
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

Route groups (`(folder)`) dipakai untuk mengelompokkan route tanpa menambah segmen URL. Di proyek ini, tiap unit usaha memang **sudah punya segmen URL sendiri** (`/kontraktor`, `/alat-berat`, dst), jadi cukup pakai `layout.tsx` biasa di tiap folder unit untuk inject tema — tidak perlu route group tambahan. Ini menghindari kompleksitas yang tidak perlu.

### 2.1 Kenapa `/kontraktor/[layanan]` dinamis, bukan 5 folder terpisah?

Versi awal dokumen ini (dan scaffolding awal repo) memakai 5 folder statis
(`civil-project/`, `building-project/`, dst). Setelah migrasi konten (Fase 1,
PROMPT-LANJUTAN.md), keputusannya diubah ke satu route dinamis
`[layanan]/page.tsx` + `generateStaticParams()` dari
`content/kontraktor/layanan.ts` — 5 halaman tetap di-pre-render statis saat
build (D.1), cuma sumber route-nya satu file, bukan 5 file duplikat dengan
struktur JSX yang sama persis. URL publik tidak berubah (slug tetap
`civil-project` dst). Restrukturisasi foldernya sendiri dieksekusi di Fase 2,
bukan Fase 1 — Fase 1 cuma mengisi `content/kontraktor/layanan.ts`.

---

## 3. Konvensi Penamaan

| Item | Aturan | Contoh |
|---|---|---|
| Folder route | lowercase-kebab-case, Bahasa Indonesia (sesuai URL final) | `concrete-repair`, `chipping-kelapa-sawit` |
| Komponen React | PascalCase | `ProductCard.tsx`, `MegaMenu.tsx` |
| File data/content | camelCase | `produk.ts`, `kontak.ts` |
| CSS variable | kebab-case dengan prefix `--cpn-` (Cakra Prima Nusantara) | `--cpn-color-primary`, `--cpn-space-md` |
| Slug produk/proyek | lowercase-kebab-case, stabil (tidak berubah setelah publish) | `ostindo-penyubur-tanah` |

---

## 4. Pengelolaan Konten (Content Layer)

Karena tidak ada database, semua konten terstruktur disimpan sebagai **TypeScript data module** (bertype eksplisit) untuk data pendek/list, dan **MDX** untuk konten panjang (berita, deskripsi produk yang butuh rich text).

Contoh shape data (kerangka tipe, isi disesuaikan saat migrasi konten dari web lama):

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
// content/kontraktor/proyek.ts
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

## 5. Kerangka Theming (Skeleton — Nilai Belum Final)

**Prinsip:** siapkan *nama variable* dan *struktur switching*-nya sekarang. Nilai warna/font diisi belakangan begitu client kasih referensi desain — tanpa perlu ubah struktur komponen.

```css
/* globals.css — nilai lengkap & rasional ada di DESIGN.md, ini contoh pemakaiannya di kode */
:root {
  --cpn-color-primary: var(--cpn-green-700);        /* #016625 — dari logo */
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

/* Tema per unit usaha — di-scope lewat data-theme di layout.tsx masing-masing.
   Hub & Agribisnis satu keluarga hijau; Kontraktor/Alat Berat/Trading pakai
   navy+orange sebagai pembeda (masih proposal, lihat DESIGN.md §4 & §8). */
[data-theme="konstruksi"] {
  --cpn-color-primary: var(--cpn-navy-700);   /* #16324F — proposal, tunggu approval */
  --cpn-color-accent: var(--cpn-orange-500);  /* #F2994A — proposal */
}

[data-theme="agri"] {
  --cpn-color-primary: var(--cpn-green-600);  /* #039637 */
  --cpn-color-accent: var(--cpn-green-400);   /* #2BEE70 */
}
```

Token warna lengkap (full scale 50-950 untuk green & gray, plus token liquid glass: blur, border, shadow, scrim) ada di `DESIGN.md` — file ini cuma nunjukkin *cara pakai*-nya di kode, bukan sumber nilai. Kalau ada revisi warna di masa depan, yang diubah cukup `DESIGN.md`.

```tsx
// app/agribisnis/layout.tsx
export default function AgribisnisLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="agri">{children}</div>;
}
```

**Aturan wajib untuk komponen UI:**
- Dilarang menulis warna hex/rgb langsung di komponen (`components/ui/*`, `components/sections/*`).
- Semua warna, spacing, radius harus lewat `var(--cpn-*)`.
- Komponen harus terlihat benar (secara struktur/layout) walau semua token masih placeholder hitam-putih — ini jadi acceptance test sementara sebelum desain final masuk.

---

## 6. Implementasi SEO (Pola Wajib)

### 6.1 Metadata per halaman

```tsx
// contoh pola, dipakai di setiap page.tsx
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Judul Halaman | PT Cakra Prima Nusantara",
    description: "...",
    alternates: { canonical: "https://domain.com/path" },
    openGraph: { title: "...", description: "...", images: ["..."] },
  };
}
```

Helper terpusat di `lib/seo/metadata.ts` supaya format title/OG konsisten di semua halaman (hindari copy-paste struktur berulang).

### 6.2 Structured Data (JSON-LD)

- `Organization` schema di root layout (sekali, mewakili PT Cakra Prima Nusantara).
- `LocalBusiness` schema per lokasi kantor (dipasang di halaman `/kontak`).
- `Product` schema di tiap halaman detail produk Agribisnis.
- `BreadcrumbList` di semua halaman non-homepage.

Helper generator ada di `lib/seo/structured-data.ts`, dipanggil dari tiap page yang relevan, di-render lewat `<script type="application/ld+json">`.

### 6.3 Sitemap & Robots

`app/sitemap.ts` men-generate seluruh URL statis + dinamis (loop dari `content/` — proyek, produk, berita). `app/robots.ts` mengizinkan crawl semua halaman publik, disallow halaman non-publik jika ada di fase mendatang.

### 6.4 Gambar

- Semua gambar lewat `next/image`, wajib `width` & `height` (atau `fill` dengan container beraspect-ratio tetap).
- Alt text deskriptif, bukan nama file (`"Excavator Kobelco SK200 di proyek chipping sawit"`, bukan `"IMG_001.jpg"`).

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