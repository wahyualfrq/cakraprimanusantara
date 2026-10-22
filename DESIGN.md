# DESIGN.md
## Design System — Redesign Website PT Anugerah Mustika Ostindo

**Status:** v0.4 — **DRAFT menunggu persetujuan**. Menggantikan v0.3.1 (arah "Editorial Clean", diarsipkan di branch `redesign/editorial-clean`, Tahap 1–2). Disusun 23 Oktober 2026 setelah pemilik proyek menetapkan template visual baru (screenshot referensi) dan meminta desain lama dibuang.

**Dasar keputusan pemilik proyek (disetujui):**
1. Desain lama dibuang: Editorial Clean (DESIGN.md v0.3.x dan Tahap 1–2) ditinggalkan, dan sisa kode legacy Cakra dibersihkan (dikerjakan sebagai tahap terpisah L0, §22).
2. Template baru diikuti pada **komposisi saja**. Navbar tetap bar rata (tidak kapsul) dan tombol tetap persegi.

**Yang tetap dipertahankan (bukan bagian Editorial Clean):** hijau brand `#016625` (`VERIFY`), tipografi Fraunces (heading) + Inter (body), tema tunggal hijau, aturan anti-AI-slop untuk copy/ikon/badge/klaim, keputusan D1, D2 (copy interim), D3a (logo interim), D4 (ilustrasi sementara), D5 (URL), D9 (Sertifikat & Penghargaan di Riset & Inovasi), dan semua batasan konten (tidak ada fakta, statistik, pelanggan, sertifikasi, atau klaim baru).

**Referensi visual:** screenshot LawnBuster dipakai **hanya sebagai referensi komposisi dan kualitas**. Tidak ada konten, logo, warna merek, atau komponen yang disalin.

> **Dokumen ini bukan izin mengubah kode.** Implementasi dikerjakan bertahap setelah dokumen ini disetujui, tanpa mengubah scope, struktur navigasi, stack, atau fakta perusahaan.

### Cara membaca dokumen ini

- Format aturan utama: **Prinsip → Aturan → Anjuran → Hindari → Terdampak → Token/komponen**.
- `VERIFY` = belum terverifikasi. `OPEN` = menunggu keputusan pemilik proyek. `INTERIM` = sementara. **(baru)** = token/komponen yang belum ada di kode. **[T#]** = keputusan template (tabel di bawah).
- Angka pada keputusan adalah **nilai awal**; boleh dikalibrasi saat implementasi lewat screenshot 1440 / 768 / 375 px, tetapi aturannya tidak berubah tanpa persetujuan.
- Nama token memakai prefix `--cpn-`. Token yang sudah ada di `app/globals.css` (kondisi `fe-lanjutan`) diprioritaskan; nilai radius dan spacing section **tidak diubah** dari kondisi tersebut.

| Kode | Keputusan | Status |
|---|---|---|
| T1 | Konsep **Editorial Natural** (hero berbingkai, aksen serif italic, komposisi bervariasi) menggantikan Editorial Clean | Disetujui |
| T2 | Navbar bar putih sticky rata, tanpa kapsul; tombol persegi (radius `md`), tanpa efek angkat | Disetujui |
| T3 | Pembersihan kode legacy Cakra = tahap L0 terpisah dengan daftar file dan persetujuan sebelum menghapus | Disetujui |
| T4 | Hero: bingkai gambar dalam container (bukan full-bleed), teks kiri-bawah, tag kecil, kartu info glass opsional; tanpa rating atau jumlah pelanggan | Usulan |
| T5 | Aksen italic Fraunces: H1 hero + maks. 2 H2 di Beranda (frasa ≤ 3 kata dari copy yang ada) | Usulan |
| T6 | Eyebrow bertitik pada section Beranda | Usulan |
| T7 | Produk di Beranda: karusel kartu tinggi bergambar (scroll-snap, tanpa dependency) | Usulan |
| T8 | Milestone di Beranda: grid bento asimetris dari data milestone bersumber (subset, tanpa langkah karangan) | Usulan |
| T9 | Motion: reveal + stagger ringan saat scroll, zoom gambar kartu 1.04, tanpa parallax | Usulan |
| T10 | Radius dan jarak section memakai token yang sudah ada (lg 20, xl 28, section 6rem/4rem), jarak dihitung **sekali** antar section polos | Usulan |

---

## 1. Tujuan dan karakter visual

**Tujuan:** website korporat Ostindo yang elegan, profesional, dan natural, dengan komposisi yang lebih berkarakter daripada template landing page generik, tanpa mengorbankan keterbacaan dan kejujuran konten.

**Konsep: Editorial Natural [T1].** Hierarki dibangun oleh tipografi serif (Fraunces) dengan aksen italic, ruang kosong yang terencana, dan gambar yang menyatu dengan layout. Hijau agribisnis dipakai sebagai identitas dan penanda aksi. Komposisi antarsection sengaja **bervariasi**: bingkai hero, intro dua kolom, karusel kartu bergambar, bento asimetris, daftar editorial.

Karakter yang dituju, diterjemahkan menjadi hal yang bisa diuji:

| Karakter | Bisa diuji lewat |
|---|---|
| Elegan, editorial | Heading Fraunces dengan aksen italic sesuai §5.2; ruang kosong ≥ `--cpn-space-section` antar section (§4) |
| Profesional | Navbar rata, tombol persegi, tanpa kapsul di navbar/CTA (§8, §9) |
| Natural / agribisnis | `green-700` sebagai satu-satunya warna aksi; `green-300/400` hanya di atas latar gelap/foto (§6) |
| Layout berkarakter | Tidak ada dua section berurutan dengan struktur yang sama; pola berbeda per jenis konten (§11, §13) |
| Gambar menyatu | Gambar berbingkai dengan radius token, rasio baku, dan hubungan jelas dengan teks (§12) |
| Bersih tanpa kosong | Tidak ada kolom teks berdiri sendiri dengan sisi kosong ≥ 40% (§3.4) |
| Animasi halus | Hanya properti `opacity`/`transform`/warna, durasi ≤ 500 ms, `prefers-reduced-motion` dihormati (§16) |
| Responsif | Tanpa overflow pada 320 px; pola diganti per rentang, bukan hanya diperkecil (§17) |

## 2. Prinsip desain

| # | Prinsip | Uji cepat |
|---|---|---|
| P1 | **Struktur dulu, hiasan belakangan.** Elemen tanpa fungsi dibuang. | Hapus elemennya; bila halaman tetap jelas, elemennya tidak perlu |
| P2 | **Kartu punya karakter sesuai jenis konten.** Produk = kartu tinggi bergambar; berita = baris/unggulan bertanggal; riset = daftar editorial; milestone = bento. Tidak ada satu gaya kartu untuk semua. | Dua jenis konten berbeda tidak memakai varian kartu yang sama (§11) |
| P3 | **Satu aturan per jenis elemen.** Radius, shadow, tombol, jarak, dan durasi berasal dari token. | `grep` angka literal di `*.module.css` = 0 (§21) |
| P4 | **Komposisi sesuai konten.** Teks panjang berpasangan dengan rail, gambar, atau aside; daftar pendek memakai baris. | Setiap section punya alasan strukturnya |
| P5 | **Konten bersumber.** Tidak ada angka, klaim, atau fakta baru di UI (§20). Slot "bukti sosial" pada referensi diganti elemen faktual dari `content/`. | Setiap angka bisa ditelusuri ke `CONTENT-VERBATIM.md` / `CONTENT-SOURCE.md` |
| P6 | **Gerak sebagai penegas.** Gerak menandai perubahan state atau memperkenalkan konten secara halus; halaman tetap lengkap tanpa animasi (§16). | Matikan animasi: semua konten tetap terlihat dan terbaca |
| P7 | **Mobile bukan desktop yang diperkecil.** | Tampilan 375 px diperiksa sendiri |
| P8 | **Jujur soal gambar.** Ilustrasi sementara tidak pernah tampil sebagai dokumentasi kegiatan (§12). | Alt diawali "Ilustrasi", tanpa caption/lokasi/tanggal/lembaga |
| P9 | **Referensi adalah komposisi, bukan identitas.** | Tidak ada konten, logo, warna, atau komponen referensi yang tersalin |

---

## 3. Layout dan container

### 3.1 Container

**Prinsip:** lebar konten mengikuti jenis konten.

| Container | Lebar | Dipakai untuk | Token/komponen |
|---|---|---|---|
| **Wide** (utama) | `--cpn-container-max` 1200 px, termasuk padding | Navbar, hero, section, footer | `Container` |
| **Detail** | Container wide + `split-aside` 8:4 | Detail produk | `Container` + kelas split |
| **Article** | `--cpn-container-article` **(baru)** = 820 px | Detail berita | token menggantikan nilai literal |
| **Reading column** | `--cpn-measure` 68ch | Paragraf panjang di dalam split atau container article | token ada |
| **Bleed kanan** | Track mulai dari tepi kiri container, bocor ke tepi kanan viewport | **Hanya** karusel produk (§11.2) | utilitas pada section karusel |

**Padding inline container:** token `--cpn-container-padding` **(baru)** = 16 px (< 640), 24 px (≥ 640), 32 px (≥ 1200). Lebar isi di ≥ 1200 px = 1136 px.

**Hindari:** container ad hoc per halaman, `max-width` literal, kolom baca berdiri sendiri (§3.4).

### 3.2 Pola komposisi

Aktif mulai **≥ 900 px**; di bawahnya satu kolom.

| Pola | Rasio | Dipakai untuk | Catatan |
|---|---|---|---|
| `split-intro` **(baru)** | 3 : 9 (gambar kecil \| paragraf besar) | Tentang Ostindo di Beranda | Paragraf `text-lead` terbesar; gambar 4:3 di kiri; CTA primary + text-link di bawah paragraf |
| `split-rail` | 4 : 8 (rail judul \| isi) | Narasi Riset, Riset di Beranda, section teks | Isi memakai `--cpn-measure` |
| `split-media` | 5 : 7 atau 7 : 5 (gambar \| teks) | Profil, Inovasi, artikel unggulan Berita | Aturan tinggi gambar §12.4 |
| `split-aside` | 8 : 4 (isi \| aside) | Detail produk | Aside `sticky`, offset = tinggi navbar + `--cpn-space-md` |
| `section-head` **(baru)** | 7 : 5 (judul \| deskripsi + kontrol) | Kepala section Beranda | Kiri: eyebrow + H2; kanan: deskripsi pendek (≤ 2 baris, rata kanan di desktop) + kontrol bila ada (panah karusel) |
| `bento` **(baru)** | grid 12 kolom (§3.3) | Milestone di Beranda | Maks. satu per halaman |

Gap antarkolom: `--cpn-space-xl` (4rem). Semua anak grid memakai `minmax(0, …)`.

### 3.3 Grid bento (asimetris)

Aktif ≥ 900 px: 12 kolom, gap `--cpn-space-md`, baris `auto`.

| Sel | Kolom × baris | Isi |
|---|---|---|
| A | 1–4 × 2 baris | Kartu tinggi (label + judul + deskripsi + area gambar opsional di bawah) |
| B | 5–8 × 1 | Kartu standar |
| C | 9–12 × 1 | Kartu standar (area gambar opsional di bawah) |
| D | 5–12 × 1 | Kartu lebar gelap (`green-800`, teks putih), item paling akhir/penting |

< 900 px: satu kolom, urutan A, B, C, D. 640–899 px: dua kolom, D selebar baris. Jumlah kartu mengikuti **data milestone bersumber**: bila data kurang dari 4, pakai A, B, D (atau A, D); jangan mengarang item. Area gambar hanya dirender bila ada aset unik (§12.5), bukan placeholder.

Aturan umum grid: maksimal satu baris "tiga kartu sama besar" per halaman; grid foto-kartu hanya jika foto asli unik per item ada.

### 3.4 Aturan kolom baca

Paragraf panjang yang dibatasi `--cpn-measure` **wajib berpasangan** dengan rail, aside, atau gambar; tidak boleh berdiri sendiri dengan sisi kanan kosong pada ≥ 900 px. Pengecualian: container article. **Terdampak:** Riset & Inovasi (narasi), Tentang Kami (profil), detail produk.

### 3.5 Header halaman dalam dan breadcrumb — lihat §10.2. Footer — lihat §14.

---

## 4. Grid dan spacing

**Prinsip:** jarak vertikal antarsection dihitung **sekali** [T10], dengan ruang kosong yang lapang seperti referensi.

### 4.1 Skala spasi (token ada)

`--cpn-space-xs` 0.25rem · `sm` 0.5 · `md` 1 · `lg` 2 · `xl` 4 · `2xl` 6.

### 4.2 Token layout

| Token | Nilai | Pemakaian |
|---|---|---|
| `--cpn-space-section` (tidak diubah) | **6rem** (≥ 640) / **4rem** (< 640) | Jarak antara dua section berlatar sama (dihitung sekali) dan padding atas/bawah section ber-latar (band) |
| `--cpn-space-header` **(baru)** | 2.5rem | Padding atas/bawah header halaman dalam; padding atas section pertama setelah header |
| `--cpn-space-block` **(baru)** | 3rem | Jarak antarblok dalam satu section |
| `--cpn-space-row` **(baru)** | 1.5rem | Padding vertikal baris daftar padat |
| `--cpn-space-head` **(baru)** | 2.5rem | Jarak `section-head` → isi section |

### 4.3 Aturan ritme

1. **Dua section polos berurutan:** jarak total = **1 × `--cpn-space-section`** (96 px desktop, 64 px mobile). Implementasi di `Section`: padding atas/bawah penuh, lalu `.section:not(.band) + .section:not(.band) { padding-top: 0 }`.
2. **Section band** (latar `surface-muted`, `green-800`, atau CTA): padding atas dan bawah penuh; prop `spacing="band"`.
3. **Header halaman → konten pertama:** `--cpn-space-header` + `--cpn-space-header` = 5rem. Bila terasa rapat di screenshot, kalibrasi token `--cpn-space-header`, bukan padding halaman.
4. **Hero → section pertama:** `--cpn-space-section`.
5. **Satu section band per halaman** (`--cpn-color-surface-muted`), di luar CTA dan footer.
6. **Dilarang:** pemisah SVG wave/blob; nilai spasi literal; jarak antarsection lewat `margin` anak.

**Terdampak:** `Section`, `PageHeader`, semua `page.tsx`.

---

## 5. Tipografi dan skala heading

**Status: FINAL (D1)** — Heading **Fraunces** (variable, italic asli, axis `opsz`), body **Inter**, keduanya via `next/font/google` di `app/layout.tsx`. Keluarga font tidak diganti tanpa persetujuan.

**Prinsip:** Fraunces memberi karakter editorial pada judul; Inter menjaga keterbacaan isi dan UI. Setiap ukuran punya satu fungsi.

### 5.1 Skala (10 token)

22 nilai `font-size` literal di CSS sekarang diringkas menjadi 10 token. Token yang ada dipertahankan; yang baru **(baru)**.

| Token | Nilai | Font | Bobot | Line-height | Fungsi |
|---|---|---|---|---|---|
| `--cpn-text-display` **(baru)** | `clamp(2rem, 1.1rem + 3.2vw, 4rem)` | Fraunces | 600 | 1.12 | **Hanya** headline hero beranda (maks. 3 baris desktop) |
| `--cpn-text-h1` | `clamp(2rem, 1.6rem + 1.6vw, 2.75rem)` | Fraunces | 700 | 1.15 | Satu H1 per halaman dalam, termasuk judul artikel |
| `--cpn-text-h2` | `clamp(1.5rem, 1.25rem + 1vw, 2.125rem)` | Fraunces | 600 | 1.2 | Judul section; judul artikel unggulan |
| `--cpn-text-index` **(baru)** | `clamp(1.375rem, 1.1rem + 1vw, 2rem)` | Fraunces | 700 | 1.2 | Judul baris `EditorialIndex` |
| `--cpn-text-h3` **(baru)** | `1.25rem` | Fraunces | 600 | 1.3 | Judul item dalam section (nilai, subjudul, judul berita di daftar). Menggantikan literal `1.25rem` yang diulang 10× |
| `--cpn-text-lead` **(diubah)** | `clamp(1.0625rem, 0.95rem + 0.5vw, 1.375rem)` | Inter | 400 | 1.5 | Paragraf pembuka editorial, deskripsi header |
| `--cpn-text-body` | `1rem` | Inter | 400 | 1.6 | Isi |
| `--cpn-text-ui` **(baru)** | `0.9375rem` | Inter | 500 / 600 | 1.4 | Navigasi, tombol, tautan baris (dipakai 14× sebagai literal) |
| `--cpn-text-small` | `0.875rem` | Inter | 400 / 600 | 1.5 | Metadata artikel, breadcrumb, fakta, footer, caption tabel |
| `--cpn-text-caption` | `0.75rem` | Inter | 600 | 1.4 | Label huruf besar (eyebrow, header kolom tabel), hak cipta |

Catatan nilai: `display` menggantikan tiga nilai `clamp` terpisah di `HeroSection.module.css`; `lead` menggantikan 1.0625rem + 1.125rem + 1.375rem; teks 0.8125rem (footer, breadcrumb, header tabel) naik ke `small` atau `caption`. Nilai awal, dikalibrasi saat implementasi.

### 5.2 Aturan

1. **Hanya token ini yang boleh dipakai di `font-size`.** Literal `rem`/`px` di `*.module.css` = pelanggaran (kecuali definisi token).
2. **Satu `<h1>` per halaman.** Level heading berurutan; ukuran tidak dipakai untuk memilih level.
3. **Panjang baris:** paragraf panjang ≤ `--cpn-measure` (68ch). Deskripsi header ≤ 56ch.
4. **Judul panjang:** `text-wrap: balance` pada heading, `overflow-wrap: anywhere` sebagai pengaman. Judul artikel unggulan tidak lebih besar dari `h2` dan ditempatkan di kolom ≥ 7/12 lebar (§13.6).
5. **Italic aksen [T5]:** italic asli Fraunces pada **satu frasa penutup (≤ 3 kata) per heading**, diambil dari copy yang sudah ada (tidak menambah kata baru). Dipakai pada **H1 hero** dan **maks. dua H2 di Beranda** (mis. kepala section Produk dan Milestone). Tidak dipakai di H1/H2 halaman dalam, H3, atau teks isi. `PageHeader.accentWord` tetap tidak dipakai; `SectionHeading` mendapat prop aksen untuk Beranda.
6. **Heading font:** Fraunces untuk heading dan angka tahun/penomoran; semua UI (navigasi, tombol, label, tabel) memakai Inter.
7. **Angka berurutan** (nomor indeks, tahun): `font-variant-numeric: lining-nums tabular-nums` supaya kolom judul sejajar (sekarang "01"/"02" membuat judul bergeser).
8. **Metadata artikel:** `small`, `gray-600`, tanpa italic.
9. **Bobot:** 400 isi · 500 navigasi · 600 judul H2/H3/display & tombol · 700 H1 & judul indeks. Tidak ada bobot 800 (`StatBadge` lama).

### 5.3 Contoh perilaku (hanya memeragakan aturan tipografi, bukan copy final)

```
Membangun Tanpa Merusak,
<em>Tumbuh</em> Selaras Alam
```

Copy hero Ostindo masih **INTERIM** (D2, `PRD.md` §11). Contoh di atas hanya memeragakan perilaku aksen; pada implementasi frasa italic diambil dari copy yang ada.

**Terdampak:** `PageHeader`, `SectionHeading`, `HeroSection`, `EditorialIndex`, `Footer`, `Breadcrumb`, `StatBadge`, semua `page.module.css`.

---

## 6. Color system

**Prinsip:** hijau Ostindo identik dengan aksi dan identitas, bukan hiasan. Selebihnya netral.

### 6.1 Brand green (`#016625` = `green-700`, dipertahankan)

> **`VERIFY` — asal nilai warna.** v0.1 mencatat `#016625` "diambil dari logo". Logo yang dipakai (`public/images/LogosG.png`) memuat tulisan PT Cakra Prima Nusantara, yang di luar scope. Belum ada aset logo Ostindo yang memverifikasi nilai ini. Nilai **dipertahankan** sesuai instruksi pemilik proyek. Pertanyaan terbuka: `PRD.md` §9 poin 4.

| Token | Hex | Kegunaan |
|---|---|---|
| `--cpn-green-50` | `#F3FCF6` | Tint section/header halaman dalam (maks. satu section per halaman) |
| `--cpn-green-100` | `#E2F9EA` | Latar item aktif di menu mobile, hover lembut |
| `--cpn-green-200` | `#BEF4D1` | Garis timeline, border fakta di atas tint |
| `--cpn-green-300` | `#82EDA8` | Latar tombol `accent` di atas foto/gelap (teks `green-900` 9,97:1); dekoratif di atas gelap |
| `--cpn-green-400` | `#2BEE70` | Aksen di atas latar gelap (9,25:1 di atas `green-900`) |
| `--cpn-green-500` | `#08C44B` | **Bukan untuk teks di atas putih** (2,33:1). Penanda dekoratif saja |
| `--cpn-green-600` | `#039637` | **Bukan untuk teks atau latar tombol dengan teks putih** (3,87:1) |
| **`--cpn-green-700`** | **`#016625`** | **Primary.** Tombol, tautan, teks aksen, indikator aktif, cincin fokus |
| `--cpn-green-800` | `#014C1C` | Hover/active primary, teks di atas `green-100`/`green-50`, band CTA |
| `--cpn-green-900` | `#013213` | Footer |
| `--cpn-green-950` | `#021D0B` | Cadangan |

### 6.2 Neutral (gray berundertone hijau)

| Token | Hex | Kegunaan |
|---|---|---|
| `--cpn-gray-50` | `#FAFAFA` | Surface panel (L1) |
| `--cpn-gray-100` | `#F4F5F4` | Hover baris/tabel, latar disabled |
| `--cpn-gray-200` | `#E7E9E7` | Divider dan border dekoratif |
| `--cpn-gray-300` | `#D1D5D2` | Border tegas (hover card), disabled |
| `--cpn-gray-400` | `#A8AFA9` | Placeholder input, ikon nonaktif |
| `--cpn-gray-500` | `#7C847D` | Border field form. **Bukan teks < 24 px** |
| `--cpn-gray-600` | `#5A625B` | Teks sekunder/body panjang |
| `--cpn-gray-700` | `#414942` | Teks penekanan |
| `--cpn-gray-800` | `#2B322C` | Teks kontras tinggi |
| `--cpn-gray-900` | `#181D19` | Teks utama, heading |
| `--cpn-gray-950` | `#0D110E` | Cadangan |

### 6.3 Aturan penggunaan per peran

| Peran | Nilai | Catatan |
|---|---|---|
| Background halaman | `--cpn-color-bg` (putih) | Default |
| Surface section | putih; **satu** section `--cpn-color-surface-tint` (`green-50`) per halaman | Alasan tint: beat berbeda (mis. Tentang di Beranda, Milestone) |
| Panel | `--cpn-color-surface` (`gray-50`) | §11 L1 |
| Teks utama / sekunder | `gray-900` / `gray-600` | |
| Primary / CTA | `green-700` (hover `green-800`), teks `#ffffff` | §8 |
| Tautan teks | `green-700`, hover `green-800` + garis bawah | |
| Border & divider | `gray-200` (dekoratif), `gray-300` (hover tegas), `gray-500` (field form) | |
| Active (navigasi) | teks `green-800` + indikator 2 px `green-700` | Tidak mengandalkan warna saja (§9) |
| Focus | `--cpn-focus-ring` (putih lalu `green-700`) | Sudah ada |
| Hover | perubahan warna/underline | Tanpa opacity, tanpa angkat |
| Disabled | latar `gray-100`, teks `gray-500`, border `gray-300`, `cursor: not-allowed` | Tidak ada hover |
| Error | `--cpn-color-danger` `#B42318` (6,57:1) | Selalu disertai teks |
| Di atas gelap | `--cpn-color-text-on-dark` / `-muted` | |

### 6.4 Aturan kontras

Teks ≥ 4,5:1; teks besar (≥ 24 px, atau ≥ 18,66 px tebal) ≥ 3:1; border field dan ikon fungsional ≥ 3:1. Pasangan berikut sudah dihitung:

| Pasangan | Rasio | Status |
|---|---|---|
| `gray-900` / putih | 17,09:1 | OK |
| `gray-700` / putih | 9,31:1 | OK |
| `gray-600` / putih | 6,30:1 | OK (teks sekunder) |
| `gray-600` / `green-50` | 6,02:1 | OK |
| `gray-600` / `gray-100` | 5,76:1 | OK |
| `green-700` / putih | 7,17:1 | OK (tautan, aksen) |
| `green-700` / `green-50` | 6,85:1 | OK |
| `green-800` / `green-100` | 9,25:1 | OK |
| putih / `green-700` (tombol primary) | 7,17:1 | OK |
| putih / `green-800` (band CTA) | 10,23:1 | OK |
| `on-dark-muted` (72%) / `green-900` | 8,08:1 | OK (footer) |
| `on-dark-muted` (72%) / `green-800` | 6,10:1 | OK (band CTA) |
| `danger` / putih | 6,57:1 | OK |
| `gray-500` / putih | 3,85:1 | **Hanya border field** atau teks besar |
| putih / `green-600` | 3,87:1 | **Dilarang** untuk tombol/teks kecil (varian `secondary` lama) |
| `green-500` / putih | 2,33:1 | **Dilarang** untuk teks (nomor "01" lama) |

**Perbaikan yang diwajibkan:** nomor `EditorialIndex`/`DefinitionList` pindah dari `green-500` ke `green-700`; wordmark pelanggan dari `gray-500` ke `gray-600`; varian `secondary` `Button` dihapus.

**Hindari:** warna dekoratif baru, gradient sebagai latar elemen, hijau sebagai latar lebih dari: band CTA, footer, dan tombol.

**Terdampak:** `EditorialIndex`, `DefinitionList`, `ClientLogos`, `Button`, `Navbar`, `MobileNav`.

---

## 7. Radius, border, dan shadow

**Prinsip:** bentuk membedakan peran: siku-sedang untuk kontrol, melengkung besar untuk bingkai gambar dan permukaan.

### 7.1 Skala radius (token yang sudah ada)

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `--cpn-radius-sm` | 4 px | Target fokus tautan inline |
| `--cpn-radius-md` | 8 px | **Tombol, input, tombol ikon**, chip kecil persegi |
| `--cpn-radius-lg` | **20 px** | **Gambar konten, kartu (semua varian), aside, panel menu mobile** |
| `--cpn-radius-xl` | **28 px** | **Bingkai hero dan band CTA** (kontainer besar) |
| `--cpn-radius-full` | 9999 px | **Hanya penanda kecil**: titik eyebrow, titik timeline, tag kecil di hero/kartu, avatar bila ada. **Bukan** navbar, tombol, tautan, atau CTA |

### 7.2 Aturan

1. Semua radius lewat token; `0` dibolehkan.
2. Satu radius untuk semua gambar konten (`lg`), termasuk thumbnail.
3. Radius bersarang: elemen di dalam wadah `lg` tidak boleh lebih besar dari radius wadah dikurangi padding; gambar dalam kartu memakai `overflow: hidden` pada kartu, bukan radius ganda.
4. **Border:** divider 1 px `gray-200`; kartu putih di atas putih memakai border 1 px `gray-200`; kartu di atas `surface-muted` tanpa border.
5. Permukaan saat diam memakai paling banyak dua dari {latar, border, shadow}.

### 7.3 Shadow (dua varian)

| Token | Nilai | Pemakaian |
|---|---|---|
| `--cpn-shadow-card` | `0 2px 8px rgba(24,29,25,0.08)` | Hanya elemen melayang: panel menu mobile, dialog. **Tidak** untuk kartu saat diam |
| `--cpn-glass-shadow` | `0 8px 32px rgba(0,0,0,0.18)` | Hanya elemen glass di atas foto |

Dilarang: shadow ketiga (mis. `FaqSection` ad hoc), shadow glass pada elemen non-glass, shadow pada kartu saat diam.

---

## 8. Button dan CTA [T2]

**Prinsip:** satu sistem tombol persegi, dengan hierarki yang jelas.

### 8.1 Varian

| Varian | Tampilan | Pemakaian |
|---|---|---|
| **primary** | Latar `green-700`, teks putih, radius `md`, tinggi min 44 px (nav desktop 40 px), padding-inline 1.25rem, `text-ui` 600 | Satu aksi utama per area |
| **outline** | Transparan, border `green-700`, teks `green-700`, radius `md` | Aksi sekunder di atas terang |
| **light** | Latar putih, teks `green-800`, radius `md` | Di atas foto, band CTA, dan latar gelap |
| **accent** | Latar `green-300`, teks `green-900` (9,97:1), radius `md`, tanpa pill | **Hanya** di atas foto/latar gelap (CTA hero) |
| **text-link** | Teks `green-700` + panah "→", tanpa kotak | Aksi tersier, "Selengkapnya" |

Varian `secondary` (latar `green-600`, teks putih = 3,87:1) **dihapus**.

### 8.2 State

- Hover: ganti warna (primary → `green-800`, outline → latar `green-50`, light → `green-50`) dalam 150 ms. **Tanpa** `opacity`, **tanpa** `translateY`.
- Fokus: `--cpn-focus-ring`. Disabled: §6.3.

### 8.3 Aturan CTA

- Maksimal satu primary per area pandang. Hero: `accent` + text-link putih. Band CTA: `light` + text-link. Form: primary.
- Label spesifik per konteks (aturan lama §8.6 tetap): "Hubungi Kami" relevan (juga label situs resmi). Tidak ada "Get Started" / "Learn More". Label hero/penutup masih **INTERIM** (D2).
- Tombol dan CTA **tidak berbentuk kapsul**.

### 8.4 Komponen

`Button` (sudah ada, API `variant` + `href`) menjadi satu-satunya tombol: tambahkan varian `light` dan `text-link`, hapus `secondary`. `PillButton` **dihentikan** (dimigrasikan, dihapus hanya dengan persetujuan). `IconButton`: radius `md`, bukan lingkaran (dipakai untuk toggle menu).

**Terdampak:** `Navbar`, `MobileNav`, `HeroSection`, `ClosingCta`, `ContactForm`, `produk/[slug]`, `not-found`, `WhatsAppLink`.

---

## 9. Navbar dan navigasi mobile [T2]

**Prinsip:** navbar adalah alat navigasi, bukan elemen dekoratif. Ia tenang, sejajar dengan container, dan selalu terbaca di atas konten apa pun.

### 9.1 Model

**Bar putih menempel (sticky) di atas halaman.** `position: sticky; top: 0`, latar putih solid, border bawah 1 px `gray-200`, tanpa shadow, tanpa radius. Tidak menimpa hero. Hero dan header halaman dimulai **di bawah** navbar, sehingga clearance (`--cpn-page-top`, `--cpn-navbar-offset`) tidak diperlukan dan kontras tidak bergantung pada foto. Tidak ada state "scrolled" (lebih sedikit bagian bergerak).

### 9.2 Proporsi dan spacing

| Elemen | Desktop (≥ 900) | Mobile (< 900) |
|---|---|---|
| Tinggi bar (`--cpn-navbar-height`) | 4rem (64 px) | 3.5rem (56 px) |
| Lebar isi | Container wide, padding-inline sesuai §3.1 | sama |
| Logo (`--cpn-navbar-logo-height`) | 2.5rem (40 px) | 2rem (32 px) |
| Rasio logo terhadap bar | ≈ 62% | ≈ 57% |
| Area klik logo | ≥ 44 × 44 px | sama |
| Zona | logo \| navigasi \| CTA (`justify-content: space-between`) | logo \| tombol menu |
| Jarak logo → navigasi | ≥ 2rem | — |
| Jarak antar link | `--cpn-space-xs`, link `padding: 0.5rem 0.75rem` | — |

Logo: **INTERIM (D3a)**. Gambar logo yang ada memuat tulisan PT Cakra Prima Nusantara, jadi `alt=""` dan nama aksesibel lewat `aria-label="Beranda"` pada tautan. Rilis publik tetap diblokir sampai status logo dikonfirmasi.

### 9.3 Link dan state

| State | Tampilan |
|---|---|
| Default | `text-ui` 500, `gray-900`, tanpa latar |
| Hover | Teks `green-700` (150 ms), tanpa latar |
| Aktif (`aria-current`) | Teks `green-800`, bobot 600, **indikator 2 px `green-700`** di tepi bawah bar. **Bukan pill** |
| Fokus | `--cpn-focus-ring`, radius `md` |
| CTA "Hubungi Kami" | `Button` primary tinggi 40 px; aktif → latar `green-800` |

Struktur menu mengikuti situs resmi (`PRD.md` §6.2): Tentang Kami, Produk, Riset & Inovasi, Berita + CTA Hubungi Kami. Satu sumber: `components/layout/navLinks.ts`. Tidak mengubah struktur.

### 9.4 Mobile

- Titik ganti: di bawah 900 px (`(max-width: 899px)`).
- Tombol menu: `IconButton` 44 × 44 px, radius `md`, ikon garis ↔ X, `aria-expanded`, `aria-controls`.
- Panel: tepat di bawah bar, lebar penuh, latar putih, border bawah 1 px, radius bawah `lg`, `--cpn-shadow-card`. Tinggi maks `100dvh − tinggi bar`, scroll internal.
- Item menu: tinggi ≥ 48 px, `text-ui` 600; item aktif: bilah kiri 3 px `green-700` + latar `green-50`. CTA primary lebar penuh di bawah.
- Perilaku: Escape menutup dan mengembalikan fokus ke tombol (sudah ada); **tambahkan** penutupan saat klik di luar panel; tautan menutup panel saat dipilih (sudah ada).
- Animasi buka: opacity 0→1 + `translateY(-4px)→0`, 200 ms; tutup 150 ms; tanpa gerak saat `prefers-reduced-motion` (§16).

### 9.5 Hubungan dengan hero dan header

- Hero beranda: lihat §10.1. Header halaman dalam: §10.2.
- `html { scroll-padding-top }` = tinggi navbar + `--cpn-space-md` (dipertahankan).
- Skip link dipertahankan, tampil di atas bar saat fokus.

**Hindari:** kapsul/pill, bar mengambang dengan jarak dari tepi, shadow saat diam, glass di navbar, item aktif berbentuk pill, nomor telepon yang tidak bersumber.

**Terdampak:** `Navbar`, `MobileNav`, `IconButton`, `navLinks`, `globals.css` (token navbar). CSS sisa mega menu (`.accordion*`, `.unitGroup*`) di `MobileNav.module.css` tidak dipakai; pembersihannya pekerjaan terpisah.

---

## 10. Hero dan page header

### 10.1 Hero beranda [T4]

**Bingkai gambar berradius `xl`, di dalam container wide, di bawah navbar rata.** Bukan full-bleed. Hanya di beranda.

| Aspek | Aturan |
|---|---|
| Posisi | Di bawah navbar, margin atas `--cpn-space-md`, lebar container, radius `--cpn-radius-xl`, `overflow: hidden` |
| Tinggi | `clamp(32rem, 82svh − tinggi navbar, 46rem)` (nilai awal); mobile minimal 30rem |
| Gambar | `fill`, `object-fit: cover`, `object-position` per aset (§12.3); satu-satunya gambar yang di-`preload` |
| Scrim | `--cpn-scrim-hero` wajib (gelap di bawah, tipis di atas); teks ≥ 4,5:1 di area tergelap dan tercerah |
| Komposisi | Isi **rata kiri, menempel bawah-kiri** (padding `clamp(1.5rem, 4vw, 3rem)`): tag → H1 → subjudul → CTA |
| Tag | ≤ 3 tag kecil (`caption`, radius `full`, glass tipis atau garis putih) berisi **nama kategori produk bersumber** dari `content/`. Bukan klaim |
| Headline | `text-display`, maks. 3 baris di desktop, `text-wrap: balance`; frasa penutup (≤ 3 kata, dari copy yang ada) italic Fraunces asli [T5] |
| Subjudul | `text-lead`, maks. 34rem, `on-dark-muted` |
| CTA | `accent` (§8) + text-link putih; bukan pill |
| Kartu info glass (opsional) | Kanan-bawah, hanya ≥ 900 px; maks. satu; berisi **maks. dua fakta bersumber** (mis. tahun berdiri, lokasi kantor/pabrik dari `content/`); `--cpn-glass-*`, radius `lg`. **Dilarang** rating, ulasan, "customers", garansi, "licensed & insured", video palsu |
| Mobile | Kartu info disembunyikan; tag maks. 2; CTA susun vertikal bila sempit |

Copy hero: **INTERIM** (D2).

### 10.2 Header halaman dalam

| Aspek | Aturan |
|---|---|
| Struktur | Rata kiri: breadcrumb → H1 → (opsional) satu kalimat deskripsi. Tanpa badge |
| Latar | `--cpn-color-surface-tint` (`green-50`) |
| Padding | Atas dan bawah `--cpn-space-header` |
| Breadcrumb | `small`, tautan `gray-600`, halaman kini 600 `gray-900`, pemisah "/" dekoratif |
| Deskripsi | Opsional; kalimat bersumber (verbatim), `text-lead`, ≤ 56ch. Dipakai di detail produk dan Kontak |
| Aksen italic | **Tidak dipakai** di H1 halaman dalam (T5) |
| Varian foto | Hanya bila foto asli tersedia (§12) |
| Perataan tengah | Tidak dipakai |

**Terdampak:** `HeroSection`, `PageHeader`, `Breadcrumb`.

---

## 11. Kartu, surface, dan daftar editorial

**Prinsip [P2]:** setiap jenis konten punya karakter kartu sendiri; kartu dipakai bila membantu pengelompokan, interaksi, atau komposisi visual.

### 11.1 Varian permukaan

| Kode | Nama | Tampilan | Dipakai untuk |
|---|---|---|---|
| **S0** | Baris polos + divider | Tanpa latar; divider 1 px `gray-200`; padding baris `--cpn-space-lg` atau `--cpn-space-row` | Daftar berita arsip, sertifikat, legalitas, definisi, nilai |
| **S1** | Panel informasi | `surface` (`gray-50`), border 1 px `gray-200`, radius `lg`, padding `lg`, tanpa shadow | Aside fakta produk; callout tunggal (Visi Perusahaan) |
| **S2** | Kartu tinggi bergambar | Rasio 3:4 (min-tinggi 22rem), radius `lg`, `overflow: hidden`; gambar penuh + `--cpn-scrim` di bawah; label kecil kiri-atas, ikon fungsional kanan-atas, judul `h3` putih, deskripsi `small` ≤ 2 baris, penanda "Selengkapnya" | **Produk** (karusel Beranda) |
| **S3** | Kartu bento | Putih di atas `surface-muted`, radius `lg`, padding `lg`; label kecil di atas, judul `h3`, deskripsi `small` `gray-600`; area gambar opsional di bawah (radius `lg`) | **Milestone** (bento Beranda) |
| **S4** | Kartu lebar gelap | `green-800`, teks putih, radius `lg`, padding `lg`; gambar opsional dengan scrim | Item bento paling penting; band informasi tunggal |
| **S5** | Baris berita | Tanggal → judul → excerpt ≤ 2 baris, divider; thumbnail opsional (3:2, radius `lg`) | **Berita** |
| **S6** | Daftar editorial | `EditorialIndex`: nomor, judul `text-index`, deskripsi, panah | **Riset**, daftar Produk halaman dalam |

Satu halaman: maksimal satu baris tiga kartu sama besar. Dua section berurutan tidak boleh memakai varian yang sama.

### 11.2 Pola khusus

| Pola | Aturan |
|---|---|
| **Karusel produk (S2) [T7]** | Track horizontal dengan `scroll-snap-type: x mandatory`, `scroll-padding-inline` = padding container; lebar kartu ~ 280–320 px desktop, 72% viewport mobile; kartu berikutnya **mengintip** di tepi kanan (bleed kanan §3.1). Kontrol: dua `IconButton` persegi 44 px (sebelumnya/berikutnya) di `section-head`, `disabled` di ujung, `aria-controls` ke track, track berlabel `role="group"` + `aria-label`. Seluruh kartu satu tautan (stretched link); penanda "Selengkapnya" adalah teks dalam tautan yang sama, bukan tautan kedua. Tanpa autoplay, tanpa library; tanpa JS track tetap bisa digulir. |
| **Latar kartu produk** | Gambar unik per produk bila ada (§12.5); bila tidak, `ContentImage` varian produk (pola ringan di atas nada hijau) sebagai latar. Dilarang memakai ilustrasi yang sama pada beberapa kartu |
| **Bento (S3/S4) [T8]** | Grid §3.3; label kecil kartu = tahun milestone (Fraunces `lead`, `green-700`, atau putih di S4), bukan "Step n". Hanya data milestone yang ada |
| **Baris berita (S5)** | Satu tautan per baris (judul). "Baca selengkapnya" menjadi bagian tautan yang sama atau dihapus. Hover: judul `green-700`, panah geser 4 px |
| **Editorial list (S6)** | Kolom nomor lebar tetap 3rem, `lining-nums tabular-nums`, `green-700`; judul `text-index`; hover: judul `green-700` + panah `translateX(4px)`; thumbnail hover hanya `(hover:hover) and (pointer:fine)`, radius `lg` |
| **Definition list** | Label `small` 600 `green-800` di atas nilai `small` `gray-600`; 3 kolom ≥ 640; garis atas 1 px |
| **Tabel spesifikasi** | Header `caption` huruf besar `gray-600`; hover baris `gray-100`; ≤ 640 px jadi blok bergaris |
| **Timeline** | Garis 2 px `green-200`, titik 14 px `green-700` (`full`), tahun Fraunces 1.5rem 600; kolom tahun 7rem ≥ 900; satu komponen untuk Tentang dan Riset |
| **Nilai** | Garis atas 2 px `green-700`, ikon outline 24 px `green-700` tanpa lingkaran latar, judul `h3`, deskripsi `gray-600`; ikon literal dan berbeda per nilai |
| **Strip pelanggan** | Satu baris wordmark teks `gray-600` dalam garis tipis atas-bawah; satu baris ≥ 900, dua baris < 900; tanpa marquee |
| **Eyebrow [T6]** | Titik 6 px `green-700` (`full`) + label `caption` huruf besar `gray-600` berisi **nama section** (mis. nama bagian), bukan slogan; maks. satu per section, hanya di section Beranda |
| **Band CTA** | `green-800`, radius `xl`, padding `clamp(2rem, 5vw, 4rem)`, terpusat, maks. satu per halaman, terakhir sebelum footer; tombol `light` + text-link |

### 11.3 Batas efek

- **Hover kartu:** zoom gambar 1.00 → 1.04 (500 ms, di dalam wadah `overflow: hidden`), panah/penanda geser 4 px, perubahan warna judul atau border. Tanpa `translateY` kartu, tanpa shadow baru.
- **Border/shadow/tint:** §7.

### 11.4 Hindari

Kartu untuk teks biasa; tiga kartu sejajar sebagai pola bawaan; satu gaya kartu untuk semua jenis konten; ikon di lingkaran berlatar; kartu di atas background tint hijau; kartu bergambar tanpa gambar unik.

### 11.5 Liquid glass

Opsional di atas foto: token `--cpn-glass-*`, `--cpn-scrim`, `GlassCard`. Dipakai untuk tag hero dan kartu info hero. Scrim wajib di belakang teks, maks. satu kartu glass per section, tidak untuk kartu di atas latar solid. Varian `solid` `GlassCard` dihentikan.

**Terdampak:** `EditorialIndex`, `DefinitionList`, `SpecTable`, `WhyChooseUs`, `ClosingCta`, `Card`, `GlassCard`, `ProductShowcase` (karusel), `ResearchHighlight`, `NewsHighlight`, `tentang-kami`, `riset-dan-inovasi`, `berita`. Komponen baru: `ProductCarousel`, `BentoGrid`/`MilestoneBento`, `Eyebrow`, `Reveal` (lihat Lampiran B).

---

## 12. Image system

**Prinsip:** gambar menjelaskan konten dan identitas, bukan dekorasi. Gambar tidak pernah menyamar sebagai dokumentasi kegiatan nyata.

### 12.1 Rasio

| Konteks | Rasio | Orientasi | Catatan |
|---|---|---|---|
| Hero beranda | full-bleed (cover) | landscape | §10.1 |
| Konten umum, berita (unggulan dan thumbnail daftar) | **3 : 2** | landscape | Default |
| Kartu produk tinggi (S2) | **3 : 4** | portrait | Latar kartu karusel; gambar unik per produk atau `ContentImage` varian produk |
| Gambar kecil `split-intro` | **4 : 3** | landscape | Tentang di Beranda |
| Profil / Inovasi (`split-media`) | **4 : 3** | landscape | |
| Sampul artikel, video | **16 : 9**, tinggi maks. 440 px | landscape | |
| Portrait **4 : 5** | — | portrait | Hanya foto asli orang atau kemasan; **belum ada**, jangan dibuat |
| Square **1 : 1** | — | persegi | Hanya packshot produk asli; **belum ada** |

Daftar Produk dan Riset di halaman dalam saat ini **tanpa gambar** (indeks tipografis); kartu S2 di Beranda memakai latar `ContentImage` varian produk sampai foto asli per produk tersedia.

### 12.2 Radius

Semua gambar konten radius `lg` (20 px). Hero dan sampul header full-bleed: 0.

### 12.3 Crop dan `object-position`

- `object-fit: cover` untuk semua gambar berrasio tetap.
- Default `object-position: 50% 40%` (subjek di sepertiga atas). Setiap aset boleh punya `posisi` sendiri (field baru di `content/ilustrasi.ts`, pekerjaan kode terpisah).
- Crop tidak boleh memotong wajah atau tangan. Periksa pada rasio 3:2, 4:3, 16:9, dan layar 375 px.
- `sizes` eksplisit di setiap `<Image>` (`STRUCTURE.md` §7.2).

### 12.4 Hubungan ukuran gambar dengan teks

Di `split-media`: kolom gambar 5/12 atau 7/12. Bila kolom teks lebih tinggi dari ±1,6 × tinggi gambar, gambar dibuat **sticky** (offset = tinggi navbar + `--cpn-space-lg`) atau pola diganti `split-rail` tanpa gambar. Tidak boleh ada ruang kosong di bawah gambar yang lebih tinggi dari ±40% tinggi gambar.

### 12.5 Ilustrasi sementara (D4) dan batas pemakaian ulang [batas pemakaian ulang]

- Sumber tunggal `content/ilustrasi.ts`: `src` + `alt`. Alt **diawali "Ilustrasi"** dan menggambarkan isi gambar yang terlihat.
- Tanpa caption, lokasi, tanggal, atau nama lembaga/perusahaan di samping gambar maupun di alt.
- **Satu ilustrasi maksimal sekali per halaman.** Artikel unggulan Berita tidak diulang di daftar "Berita lainnya" (daftar tanpa artikel unggulan; bila kosong, section disembunyikan).
- Tidak menyarankan atau membuat aset baru; hanya aset yang sudah ada di `public/images/` dan sudah terdaftar yang dipakai.
- Ilustrasi bukan latar `PageHeader` dan bukan dokumentasi fasilitas atau kegiatan Ostindo.

### 12.6 `OPEN` — ilustrasi di samping berita bertanggal

Apakah ilustrasi layak tampil di samping judul berita bertanggal (mis. 5 Juni 2023)? Aturan sementara yang konservatif (**INTERIM**, menunggu konfirmasi pemilik): ilustrasi hanya muncul sekali pada artikel unggulan; baris arsip memakai placeholder `ContentImage` (variant `berita`) atau tanpa thumbnail.

### 12.7 Placeholder

- `ContentImage` dengan pola ringan per tipe (unit, proyek, produk, berita, dokumen) tetap dipakai; bukan gradient polos. Tiap tipe konten berpola berbeda.
- Placeholder bermakna: alt sesuai isi section; dekoratif → `alt=""`. Dilarang memakai ulang data dari section lain.

### 12.8 Foto dokumentasi asli (bila tersedia)

Disimpan di Vercel Blob (`STRUCTURE.md` §7), disusutkan ≤ 2000 px, URL di `content/`. Mengganti slot ilustrasi tanpa mengubah rasio. Alt menggambarkan isi nyata; caption faktual hanya bila bersumber dan terverifikasi.

### 12.9 Mobile

Gambar lebar penuh container, rasio dipertahankan (tidak di-crop menjadi persegi). Urutan DOM = urutan baca: gambar di atas teks hanya bila gambar adalah pembuka (profil, artikel unggulan); selain itu setelah teks. Thumbnail daftar ditumpuk di atas teks pada < 640 px.

### 12.10 Alt text

Jujur dan spesifik; tidak ada "gambar/foto dari…"; dekoratif → `alt=""`; tidak ada nama lembaga atau lokasi pada ilustrasi.

**Terdampak:** `HeroSection`, `tentang-kami`, `berita` (daftar + artikel), `NewsHighlight`, `ContentImage`, `PageHeader` (varian foto), `content/ilustrasi.ts`.

---

## 13. Section patterns (per tipe halaman)

Aturan umum: dua section berurutan tidak berstruktur identik; maks. satu section band per halaman; eyebrow hanya di Beranda; aksen italic H2 maks. 2 di Beranda.

| Halaman | Urutan dan pola |
|---|---|
| **13.1 Beranda** | **Hero berbingkai** (§10.1) → **Strip pelanggan** → **Tentang Ostindo** (`split-intro`: gambar kecil 4:3 + paragraf `lead` besar + CTA primary/text-link; eyebrow; opsional fakta Berdiri/Kantor/Pabrik sebagai baris kecil) → **Produk** (`section-head` + karusel S2, eyebrow, H2 dengan aksen italic) → **Milestone** (`surface-muted` band, `section-head` + bento S3/S4, eyebrow, H2 dengan aksen italic) → **Nilai** (S0, 3 kolom) → **Riset** (`split-rail` + timeline subset) → **Berita** (satu unggulan besar + dua baris S5; eyebrow) → **Band CTA** |
| **13.2 Tentang Kami** | Header → Profil (`split-media` 5:7, gambar sticky, fakta, narasi) → Nilai (S0) → Milestone (timeline penuh, band `surface-muted`) → Misi & Visi (dua daftar + panel S1 Visi) → Inovasi (`split-media` 7:5) → Legalitas (S0 dua kolom) |
| **13.3 Produk (daftar)** | Header → grid kartu S2 (3 kolom ≥ 900, 2 kolom ≥ 640) **bila** gambar unik tersedia; selama belum, `EditorialIndex` S6 enam baris |
| **13.4 Detail produk** | Header → `split-aside` 8:4: kiri isi verbatim + tabel dosis; kanan aside S1 sticky → tautan kembali |
| **13.5 Riset & Inovasi** | Header → Narasi (`split-rail`; jarak antarbagian `--cpn-space-block`) → Milestone (band) → Sertifikat & Penghargaan (S0 dua kolom; D9) |
| **13.6 Berita (daftar)** | Header → Artikel unggulan (`split-media` 5:7; judul ≤ `h2`) → "Berita lainnya" (S5, tanpa artikel unggulan; sembunyikan bila kosong) |
| **13.7 Artikel** | Container article 820 px: breadcrumb → sampul 16:9 → metadata → H1 → isi 68ch |
| **13.8 Kontak** | Header → direktori lokasi (S0 dua kolom) + form (S1); tautan WhatsApp/email tanpa backend. `VERIFY`: belum diaudit visual |
| **13.9 404** | Header gaya halaman dalam + satu tombol primary |

**Catatan IA di luar cakupan:** Milestone tampil di Beranda (subset bento), Tentang (timeline penuh), dan Riset. Penempatan konten adalah keputusan IA terpisah; di Beranda bento hanya memakai item bersumber yang sudah ada.

---

## 14. Footer

**Prinsip:** footer seimbang dengan isi di atasnya, terbaca, dan tidak padat.

| Aspek | Aturan |
|---|---|
| Latar | `--cpn-green-900`, teks putih / `on-dark-muted` |
| Padding | Atas 4rem, bawah 2rem (sekarang 6rem atas) |
| Grid ≥ 900 | 12 kolom: **Visi Perusahaan 5 \| Office 4 \| Factory 3**, rata atas |
| 640–899 | Dua kolom, Visi Perusahaan selebar baris |
| < 640 | Satu kolom |
| Judul kolom | `text-ui` 600 putih (tetap `<h2>` secara semantik) |
| Isi | `small` (0.875rem), line-height 1.6. Alamat satu paragraf; kontak sebagai pasangan **label \| nilai** (label lebar min 5.5rem) |
| Baris bawah | Tautan cepat (kiri) dan hak cipta (kanan) dalam satu baris ≥ 900, dipisah border `--cpn-color-border-on-dark`; ditumpuk di mobile. Tautan ≥ 44 px tinggi sentuh di mobile |
| Konten | Hanya data Ostindo (lokasi dan kontak bersumber); teks Visi Perusahaan verbatim (`CONTENT-VERBATIM.md` §G5). Item kontak `perluVerifikasi` tidak ditampilkan |

**Terdampak:** `Footer`, `Footer.module.css`.

---

## 15. Form, tabel, dialog, dan UI terkait

- **Input:** tinggi ≥ 44 px, radius `md`, border `--cpn-color-border-field` (3,85:1), label di atas (`small` 600), placeholder `gray-400` bukan pengganti label, error `--cpn-color-danger` + teks (tidak hanya warna), fokus `--cpn-focus-ring`.
- **Form kontak:** membangun tautan WhatsApp/email, tanpa backend dan tanpa kesan mengirim data ke server (aturan lama tetap). Opsi dan email lama yang bertema Cakra adalah pekerjaan pembersihan terpisah.
- **FAQ/disclosure:** divider L0, tombol dengan `aria-expanded`, panah memutar 150 ms; tanpa shadow.
- **Tabel:** §11.2.
- **Dialog:** belum ada. Bila dibutuhkan: radius `lg`, `--cpn-shadow-card`, scrim hitam 50%, perangkap fokus, Escape menutup, fokus kembali ke pemicu.

---

## 16. Motion dan interaction [T9]

**Prinsip:** gerak halus yang memperkenalkan konten dan memberi umpan balik; tidak menghias tanpa fungsi.

### 16.1 Token

`--cpn-duration-fast` **(baru)** 150 ms · `--cpn-duration-base` **(baru)** 250 ms · `--cpn-duration-slow` **(baru)** 500 ms · `--cpn-ease` **(baru)** `cubic-bezier(0.2, 0, 0, 1)`. Tidak ada durasi di atas 600 ms.

### 16.2 Yang diperbolehkan

| Elemen | Gerak | Durasi |
|---|---|---|
| Tautan, tombol | Warna teks/latar/border | fast |
| Indikator link navbar | `scaleX(0→1)` pada garis bawah saat hover (aktif: instan) | fast |
| Panah pada baris/kartu | `translateX(4px)` | fast |
| Gambar kartu (S2, S5, thumbnail) | `scale(1→1.04)` di dalam wadah `overflow: hidden`, hanya `(hover:hover)` | slow |
| Thumbnail hover indeks | `opacity` + `scale(0.96→1)`, pointer halus | base |
| Menu mobile | `opacity` + `translateY(-4px→0)` buka; tutup lebih cepat | base / fast |
| Karusel | Gulir `smooth` saat tombol panah ditekan | native |
| **Reveal saat scroll** | `opacity 0→1` + `translateY(12px→0)`, sekali per elemen | slow |
| **Stagger** | Anak berturut-turut tertunda 80 ms, maks. 4 anak (sisanya muncul bersamaan) | slow |
| Cincin fokus | Instan | — |

### 16.3 Aturan reveal

- Komponen `Reveal` **(baru)** memakai `IntersectionObserver` (tanpa dependency), `threshold` ~0.15, `unobserve` setelah tampil.
- **Tanpa JS atau sebelum hidrasi, konten terlihat** (state tersembunyi hanya berlaku bila `html` punya kelas `js` yang dipasang skrip awal kecil).
- **Tidak** di hero, tidak di elemen kandidat LCP, tidak di navbar/footer, tidak di dalam karusel.
- Dipakai pada kepala section, kartu bento, baris berita; **bukan** pada setiap elemen.
- `prefers-reduced-motion: reduce`: reveal, stagger, zoom, dan gulir halus dimatikan; konten langsung tampil.

### 16.4 Yang tidak diperbolehkan

Parallax, carousel otomatis/marquee, animasi hitung angka, scroll-jacking, animasi tanpa akhir, animasi properti layout (`width`, `height`, `margin`, `top`), animasi `backdrop-filter`, efek angkat (`translateY`) pada tombol/kartu saat hover, gerak yang menjadi satu-satunya penanda state.

### 16.5 Performa

Hanya `transform`, `opacity`, warna; tanpa `will-change` permanen; tanpa library animasi.

**Terdampak:** `Button`, `IconButton`, `Navbar`, `MobileNav`, `EditorialIndex`, `ProductCarousel`, `MilestoneBento`, `NewsHighlight`, `Reveal`.

---

## 17. Responsive behavior

### 17.1 Breakpoint

Konvensi proyek (`STRUCTURE.md` §5.1) dipertahankan: **640 / 900 / 1200 px**, mobile-first (`min-width`). Untuk menghindari tumpang tindih di tepat 900 px: kondisi kompak navbar = `(max-width: 899px)`, kondisi desktop hero dan split = `(min-width: 900px)` (sebelumnya navbar `max-width: 900px` dan hero `min-width: 901px`). Untuk rentang di bawah 640 px, satu-satunya bentuk `max-width` yang diizinkan adalah `(max-width: 639px)`; menulis ulang semuanya menjadi mobile-first tidak diwajibkan.

### 17.2 Perilaku per rentang

| Aspek | < 640 (mobile) | 640–899 (tablet) | ≥ 900 (desktop) |
|---|---|---|---|
| Container padding | 16 px | 24 px | 24 px (32 px ≥ 1200) |
| Navbar | Bar 56 px + panel menu | Sama dengan mobile | Bar 64 px penuh |
| Split | 1 kolom | 1 kolom | 2 kolom (§3.2) |
| Grid fakta/legalitas | 1 kolom | 3 / 2 kolom | sesuai §3.3 |
| Jarak section | 4rem | 6rem | 6rem |
| Heading | `clamp()` token (§5) | sama | sama |
| Footer | 1 kolom | 2 kolom | 5 \| 4 \| 3 |
| Timeline | tahun di atas teks | tahun di atas teks | tahun 7rem \| teks |
| Tabel spesifikasi | blok bertumpuk | tabel | tabel |
| Thumbnail indeks | tidak ada (hover) | tidak ada (sentuh) | hover saja |

### 17.3 Aturan

1. **Bukan skala desktop.** Pola diganti per rentang (menu → panel, split → tumpuk, tabel → blok), bukan sekadar diperkecil.
2. Urutan DOM = urutan baca; gambar di atas teks hanya bila pembuka (§12.9).
3. **Target sentuh** kontrol mandiri ≥ 44 × 44 px (tombol, ikon, item menu 48 px, tautan footer). Tautan di dalam kalimat dikecualikan.
4. **Teks panjang:** `overflow-wrap: anywhere` pada judul dengan kata sangat panjang, `text-wrap: balance` pada heading, `pretty` pada paragraf; excerpt dipotong 2 baris.
5. **Tidak ada horizontal overflow.** `overflow-x: hidden` pada `body` hanya pengaman, bukan perbaikan. Uji pada 320 px dan zoom teks 200%.
6. Semua anak grid memakai `minmax(0, …)`; gambar `max-width: 100%`.

---

## 18. Accessibility dan contrast

- **Kontras:** §6.4. Teks ≥ 4,5:1, teks besar ≥ 3:1, border field/ikon fungsional ≥ 3:1.
- **Fokus:** `:focus-visible { outline: 2px solid transparent; box-shadow: var(--cpn-focus-ring); }` pada semua elemen interaktif. Elemen terfokus tidak tertutup navbar (`scroll-padding-top`).
- **State bukan warna saja:** navigasi aktif memakai bobot + indikator + `aria-current`.
- **Struktur:** satu `<h1>`, heading berurutan, landmark `<header>`/`<nav>`/`<main>`/`<footer>`, skip link ke `#konten-utama`, `lang="id"`.
- **Tautan:** satu tautan per item (§11.2); teks tautan bermakna di luar konteks atau dilengkapi `aria-label`.
- **Gambar:** §12.10. **Form:** label terhubung, error terbaca pembaca layar.
- **Gerak:** §16.4. **Target sentuh:** §17.3.
- Uji: axe/Lighthouse Accessibility ≥ 90 mobile (`PRD.md` §12), navigasi keyboard penuh, zoom 200%.

---

## 19. Performance considerations

- Gambar via `next/image` dengan `sizes` eksplisit dan `aspect-ratio` pada wadah (tanpa CLS). `preload` hanya untuk gambar LCP per halaman (hero beranda, profil Tentang, unggulan Berita).
- `deviceSizes`/`imageSizes` dikurasi manual (`next.config.ts`, `STRUCTURE.md` §7.2).
- Font self-hosted lewat `next/font` (subset latin); tidak ada font ketiga.
- Tanpa library animasi dan tanpa JS untuk efek visual; navbar, hero, dan indeks murni CSS.
- Hindari `backdrop-filter` di banyak elemen (§11.5).
- Target Core Web Vitals "Good": LCP < 2,5 s, INP < 200 ms, CLS < 0,1 di mobile; Lighthouse ≥ 90.

---

## 20. Anti-patterns dan aturan yang tidak boleh dilanggar

| # | Dilarang |
|---|---|
| 1 | Navbar atau tombol berbentuk kapsul; navbar mengambang dengan jarak dari tepi; item aktif berbentuk pill |
| 2 | Tiga kartu sama besar sebagai pola bawaan; satu gaya kartu untuk semua jenis konten; kartu untuk teks biasa |
| 3 | Radius di luar skala token; `full` selain penanda kecil |
| 4 | Shadow saat diam pada kartu; shadow selain dua token |
| 5 | Efek angkat tombol/kartu saat hover; zoom gambar lebih dari 1.04 |
| 6 | Glass di atas latar solid; lebih dari satu kartu glass per section |
| 7 | Warna dekoratif baru; teks `green-500`/`green-600`/`gray-500` kecil |
| 8 | `font-size`, spasi, radius, warna, atau durasi literal di CSS komponen |
| 9 | Jarak antarsection ganda; pemisah wave/blob SVG |
| 10 | Kolom teks berdiri sendiri dengan sisi kosong ≥ 40% |
| 11 | Ilustrasi yang sama dua kali di satu halaman; artikel yang sama dua kali di satu halaman; beberapa kartu produk dengan gambar yang sama |
| 12 | Gambar AI/ilustrasi sebagai dokumentasi nyata; caption, lokasi, tanggal, atau lembaga pada ilustrasi; aset baru seolah sudah dimiliki |
| 13 | Parallax, marquee/carousel otomatis, count-up, scroll-jacking; reveal pada hero atau elemen LCP |
| 14 | **Klaim tanpa sumber**, termasuk yang ada di referensi: rating Google/Facebook, persentase kepuasan, jumlah "happy customers", "Licensed & Insured", garansi kepuasan, tahun pengalaman yang tidak bersumber, video palsu, langkah proses karangan, "Free quote" |
| 15 | Pertanyaan retoris sebagai headline; "kami hadir sebagai mitra…"; adjective kosong; overuse em dash |
| 16 | Ikon cliché (roket, bohlam, sparkle) dan ikon tanpa makna literal; campuran gaya ikon |
| 17 | Lebih dari satu badge per section; badge berisi urgensi/hype |
| 18 | Aksen italic di luar aturan §5.2 (maks. satu frasa per heading, hero + maks. 2 H2 Beranda) |
| 19 | Label CTA generik ("Get Started", "Learn More") |
| 20 | Menyalin konten, layanan, logo, warna, atau komponen LawnBuster |
| 21 | Menautkan atau menampilkan route Cakra, kontraktor, alat berat, trading, portofolio |

---

## 21. Checklist evaluasi hasil implementasi

**Otomatis (`grep` atau skrip):**

| # | Cek | Lulus bila |
|---|---|---|
| 1 | `border-radius` selain `var(--cpn-radius-*)` atau `0` | 0 temuan |
| 2 | `radius-full` pada navbar, tombol, tautan, CTA | 0 temuan |
| 3 | `font-size:` literal di `*.module.css` | 0 temuan (selain definisi token) |
| 4 | Warna `#…` / `rgb(a)` di `*.module.css` | 0 temuan |
| 5 | `box-shadow` selain `--cpn-focus-ring`, `--cpn-shadow-card`, `--cpn-glass-shadow` | 0 temuan |
| 6 | `transition`/`animation` di luar token durasi | 0 temuan |
| 7 | `translateY`/`scale` pada `:hover` tombol atau kartu (selain zoom gambar ≤ 1.04 dan panah) | 0 temuan |
| 8 | `@media` selain `min-width` 640 / 900 / 1200, `max-width` 639 / 899, `prefers-reduced-motion`, `hover/pointer` | 0 temuan |
| 9 | `<Image>` tanpa `sizes` | 0 temuan |
| 10 | `alt` ilustrasi tidak diawali "Ilustrasi" | 0 temuan |
| 11 | Lighthouse mobile (Performance, Accessibility, SEO, Best Practices) | ≥ 90 |
| 12 | Pasangan teks/latar di §6.4 | semua ≥ 4,5:1 |
| 13 | Referensi ke route/komponen Cakra, kontraktor, alat berat, trading, portofolio | 0 temuan pada kode aktif |

**Visual (screenshot 1440 / 768 / 375 px, 5 halaman):**

| # | Cek | Lulus bila |
|---|---|---|
| 14 | Navbar | Rata, sticky, tinggi 64/56 px, tidak menimpa hero, indikator aktif 2 px |
| 15 | Hero | Bingkai berradius `xl` di dalam container, teks kiri-bawah, scrim terbaca, tanpa rating/jumlah pelanggan |
| 16 | Jarak antar section polos | 1 × token (96 px desktop, 64 px mobile) |
| 17 | Variasi komposisi | Tidak ada dua section berurutan dengan pola sama; Beranda memuat intro dua kolom, karusel, bento |
| 18 | Karusel produk | Kartu berikutnya mengintip; panah berfungsi; scroll-snap; fokus keyboard terlihat; tanpa autoplay |
| 19 | Bento | Asimetris ≥ 900 px; satu kolom di mobile; tanpa overflow; isi hanya data bersumber |
| 20 | Gambar | Rasio baku, radius `lg`, tanpa ruang kosong > 40% tinggi gambar di bawah gambar split |
| 21 | Berita | Artikel unggulan tidak diulang di daftar; satu tautan per baris |
| 22 | Italic aksen | Hero + maks. 2 H2 Beranda; italic asli Fraunces |
| 23 | Footer | Tiga kolom rata atas; teks ≥ 14 px |
| 24 | Mobile | Tanpa scroll horizontal pada 320 px; target sentuh ≥ 44 px; menu menutup dengan Escape dan klik luar |
| 25 | Motion | Reveal sekali, stagger ≤ 4, tidak di hero; mati saat reduced motion; konten terlihat tanpa JS |
| 26 | Klaim | Semua angka/nama ditelusuri ke sumber |

---

## 22. Status, tahap implementasi, dan hal yang masih terbuka

### 22.1 Status

- [x] Desain lama dibuang; template baru: komposisi saja; navbar rata (T1–T3)
- [ ] **Usulan T4–T10 menunggu persetujuan** (Beranda: hero berbingkai, aksen italic, eyebrow, karusel, bento, motion, token)
- [x] Warna brand `#016625` (asal dari logo: `VERIFY`); Fraunces + Inter (D1); tema tunggal hijau
- [ ] Aset logo Ostindo untuk memverifikasi warna dan menggantikan logo interim (D3a)
- [ ] `OPEN` ilustrasi di samping berita bertanggal (§12.6); penempatan Milestone antar halaman (IA)
- [ ] Copy hero dan label CTA Ostindo (D2)
- [ ] Halaman Kontak belum diaudit visual
- [ ] Project Baseline dan Rencana Implementasi Final belum tersedia di repo untuk dibandingkan

### 22.2 Tahap implementasi (usulan, satu tahap per persetujuan)

| Tahap | Isi | Catatan |
|---|---|---|
| **L0** | Pembersihan kode legacy Cakra (T3) | Mulai dari **daftar file** (`GAP-REPORT.md` §8: UnitSelector, PortfolioHighlight, MegaMenu, StatsSection, route nonaktif, tema navy/orange, sisa CSS mega menu); **hapus hanya setelah daftar disetujui**; lint/tsc/build harus hijau; tanpa ubah visual |
| **T1** | Token dan primitif (`Container`, `Section`, `Button` + varian `accent`, `IconButton`, `Eyebrow`, `ContentImage`) | Nilai radius dan spacing section tidak diubah |
| **T2** | Navbar dan menu mobile | §9 |
| **T3** | Hero berbingkai + strip pelanggan + intro | §10.1, §13.1 |
| **T4** | Karusel produk + bento milestone + berita Beranda + CTA | §11.2 |
| **T5** | Tentang Kami | §13.2 |
| **T6** | Produk + detail | §13.3–13.4 |
| **T7** | Riset & Inovasi | §13.5 |
| **T8** | Berita + artikel | §13.6–13.7 |
| **T9** | Footer | §14 |
| **T10** | Motion (`Reveal`), konsolidasi, QA akhir (§21) | §16 |

(Penamaan tahap T1–T10 di baris ini adalah **tahap implementasi**, berbeda dari kode keputusan [T1]–[T10] di awal dokumen.)

---

## Lampiran A — Ringkasan token

Dibandingkan dengan `app/globals.css` pada `fe-lanjutan` (commit `d6b6b01`).

**Tidak diubah:** skala `--cpn-green-*`, `--cpn-gray-*`; `--cpn-color-*` (kecuali yang baru); `--cpn-space-xs…2xl`; `--cpn-space-section` (6rem / 4rem); semua `--cpn-radius-*` (lg 20, xl 28); `--cpn-container-max`; `--cpn-measure`; `--cpn-focus-ring`; `--cpn-shadow-card`; `--cpn-glass-*`; `--cpn-scrim*`; `--cpn-text-h1/h2/body/small/caption`; `--cpn-font-*`.

**Diubah:** `--cpn-text-lead` (clamp §5.1); `--cpn-navbar-height` 4rem / 3.5rem (bar rata, tanpa offset); `--cpn-navbar-logo-height` 2.5rem / 2rem.

**Baru:** `--cpn-container-padding`, `--cpn-container-article`; `--cpn-space-header`, `--cpn-space-block`, `--cpn-space-row`, `--cpn-space-head`; `--cpn-text-display`, `--cpn-text-index`, `--cpn-text-h3`, `--cpn-text-ui`; `--cpn-duration-fast/base/slow`, `--cpn-ease`; `--cpn-touch-target` (2.75rem); `--cpn-color-surface-muted` (= `gray-100`).

**Usang (dihapus setelah pemakainya dimigrasi):** `--cpn-navbar-offset`, `--cpn-page-top`, `--cpn-scrim-top`, `--cpn-navbar-bar-height`; token navy/orange dan blok `data-theme` (dihapus di tahap L0).

## Lampiran B — Peta komponen

| Komponen | Status | Perubahan |
|---|---|---|
| `Container`, `Section` | ubah | Padding 16/24/32; aturan jarak 1× + prop `spacing="band"`; utilitas bleed-kanan |
| `SectionHeading` | ubah | Varian `section-head` (judul kiri, deskripsi + kontrol kanan), prop eyebrow dan aksen italic |
| `Eyebrow` | **baru** | Titik + label |
| `PageHeader`, `Breadcrumb` | ubah | Padding `--cpn-space-header`; tanpa clearance navbar |
| `Button` | ubah | Varian primary, outline, light, **accent** (latar `green-300`, teks `green-900` = 9,97:1, hanya di atas foto/gelap), text-link; hapus `secondary` |
| `PillButton` | hentikan | Migrasi ke `Button` (hapus setelah persetujuan) |
| `IconButton` | ubah | Radius `md`, 44 px |
| `Card` | ubah | Dasar S1/S3 |
| `ProductCarousel` | **baru** | Karusel S2 (§11.2) |
| `MilestoneBento` | **baru** | Bento S3/S4 (§3.3) |
| `Reveal` | **baru** | Reveal + stagger (§16.3) |
| `ContentImage` | ubah | Radius `lg`, `object-position`, varian produk sebagai latar kartu |
| `EditorialIndex`, `DefinitionList`, `SpecTable` | ubah | Sesuai §11.2 |
| `WhyChooseUs` | ubah | Ikon tanpa lingkaran latar |
| `Navbar`, `MobileNav`, `Footer` | ubah | §9, §14 |
| `HeroSection` | ubah | Hero berbingkai (§10.1) |
| `ClosingCta` | ubah | Radius `xl`, `Button` |
| `GlassCard` | batasi | Hanya di atas foto |
| `StatBadge`, `StatsSection` | batasi/hapus | Hanya dengan data bersumber; `StatsSection` dihapus di L0 bila tidak dipakai |

## Lampiran C — Konflik dokumen dan arsip keputusan

### C.1 Konflik yang tercatat (tidak diubah oleh dokumen ini)

1. `STRUCTURE.md` dan `PRD.md` §6.1 masih menyebut `/agribisnis/*` dan `/kontak`; kode memakai `/produk`, `/riset-dan-inovasi`, `/hubungi-kami` (D5). Sinkronisasi dokumen butuh persetujuan terpisah.
2. `STRUCTURE.md` §5.1 mendokumentasikan navbar `max-width: 900px` dan hero `min-width: 901px`; dokumen ini menetapkan 899 / 900.
3. Penamaan tahap tidak seragam (K1–K4, V1–V6, D1–D10, Tahap H/O/S, serta tahap L0–T10 di §22). Rencana Implementasi Final yang menyatukan belum tersedia.
4. Screenshot audit lama memakai URL `/agribisnis/...` (sudah di-redirect 301).
5. Milestone tampil di tiga halaman (§13).
6. Referensi visual memuat elemen yang dilarang oleh aturan konten (rating, jumlah pelanggan, garansi, proses 4 langkah); di dokumen ini diganti elemen faktual (§10.1, §13.1, §20 butir 14).
7. Navbar mengambang kapsul pada referensi **tidak** diadaptasi (keputusan pemilik proyek T2); bila kelak ingin diubah, revisi §9 dan §20 butir 1 lebih dulu.
8. `fotoAlt` artikel BRIN/LIPI di `content/` memuat lokasi/tanggal/"Dokumentasi"; tidak dirender saat ini, perbaikan konten adalah keputusan terpisah.

### C.2 Keputusan lama yang digantikan

| Keputusan lama | Digantikan oleh |
|---|---|
| Konsep "Editorial Clean" (v0.3.x, R1–R10, Tahap 1–2) | T1 (Editorial Natural). Arsip di branch `redesign/editorial-clean` |
| v0.3 R2: radius lg 12 / xl 16; R4 jarak section 5rem/3.5rem | T10: token asli (lg 20, xl 28, section 6rem/4rem) |
| v0.3 R5: italic aksen hanya hero | T5: hero + maks. 2 H2 Beranda |
| v0.3 §16.3: tanpa reveal | T9: reveal + stagger ringan |
| v0.3 §11: kartu sebagai pengecualian (L0 default) | §11: varian per jenis konten (S0–S6) |
| v0.2 D10: navbar kapsul mengambang | T2 (bar rata) |
| Tema navy-orange dan `data-theme` | Dihapus di tahap L0 |

### C.3 Referensi visual LawnBuster

Dipakai untuk: hero berbingkai dengan teks kiri-bawah dan aksen italic serif, strip pelanggan, intro dua kolom dengan gambar kecil, karusel kartu tinggi bergambar, bento asimetris pada section proses/milestone, eyebrow bertitik, dan footer proporsional. **Tidak dipakai:** konten, logo, warna merek (lime), kapsul navbar/tombol, rating, jumlah pelanggan, garansi, video, proses 4 langkah.