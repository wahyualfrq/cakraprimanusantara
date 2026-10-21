# GAP-REPORT.md

Dicatat selama Fase 1 (Fondasi, Content Layer, Koreksi Copy Homepage). Lihat
`CONTENT-SOURCE.md` untuk aturan tanda `[GAP]`/`[VERIFIKASI]`.

> **KOREKSI SCOPE (21 Oktober 2026).** Proyek ini hanya **redesign website
> PT Anugerah Mustika Ostindo** (https://www.ostindo.co.id). Konten
> Kontraktor, Alat Berat, Trading, PT Cakra Indo Pratama, PT Cakra Prima
> Nusantara (sebagai identitas/holding), rentalalatberatpalembang.com, dan
> cakraindopratamagroup.co.id **keluar dari scope aktif**. Catatan gap
> untuk bagian itu **tidak dihapus** (jejak historis) tetapi diberi label
> `OUT OF SCOPE` — jangan dikerjakan, jangan diisi, jangan dijadikan acuan
> backlog. Gap Agribisnis (Ostindo) dan "Umum" tetap aktif. Pekerjaan
> pembersihan kode akibat perubahan scope dicatat di §8 sebagai pekerjaan
> terpisah (bukan bagian tugas dokumentasi ini).
>
> Label yang dipakai di dokumen ini: `OUT OF SCOPE` (histori, tidak aktif),
> `VERIFY` (belum terverifikasi, jangan diasumsikan).

---

## 1. Konten yang sengaja dikosongkan — `[GAP]`

### Kontraktor — `OUT OF SCOPE (histori)`
- `content/kontraktor/layanan.ts`: 2 dari 5 layanan punya poin berlabel tanpa
  elaborasi teks (Building Project poin 1 & 3; Mechanical & Electrical poin 1)
  — sumber cuma kasih label, tidak ada kalimat penjelasan.
- Foto belum dimigrasikan: Concrete Repair (8 foto sumber, jetty & jembatan),
  Chipping Kelapa Sawit (3 foto + 1 video YouTube "Chipping Buah Sawit
  Palembang - Sumatera Selatan", ID video tidak tercatat di sumber).
  Building Project, Civil Project, M&E: sumber memang tidak punya foto.

### Portofolio — `OUT OF SCOPE (histori)` untuk 23 proyek Kontraktor/Cakra; `VERIFY` untuk studi kasus Agribisnis
- Catatan: ke-23 proyek di bawah berasal dari website Cakra Rental
  (Kontraktor/Alat Berat), bukan Ostindo. Nasib `/portofolio` pada redesain
  Ostindo belum diputuskan (PRD §9).
- Deskripsi, tahun, nilai proyek, jumlah foto — tidak ada di sumber untuk
  ke-23 proyek. Field `ringkasan` sengaja dihapus dari tipe `Proyek` (bukan
  cuma dikosongkan) karena tidak ada satupun data untuk field itu.
- `gambar` kosong di semua 23 proyek — belum ada URL Vercel Blob.

### Alat Berat — `OUT OF SCOPE (histori)`
- `content/alat-berat/unit.ts` cuma terisi kategori Excavator (23 unit).
  7 kategori lain (Bulldozer, Forklift, Motor Grader, Vibro, Wheel Loader,
  Dump Truck, Compressor) **tidak punya daftar unit sama sekali** — sumber
  cuma menyebut nama kategorinya, tidak ada daftar unit individual yang bisa
  diambil tanpa fetch ulang per kategori (di luar scope Fase 1 ini, yang
  fetch-nya dibatasi ke artikel berita saja — lihat §4).
- Pontoon: tidak ada entri di `unitAlatList` — sumber cuma menyebut "1 foto
  (excavator di atas pontoon) + 2 video YouTube", bukan unit bernama/bermerek.
  Halaman khusus Pontoon (Fase 3) perlu render foto+video di level kategori
  langsung, bukan dari daftar unit. ID 2 video YouTube: tidak tercatat di
  sumber — kalau tidak didapat sebelum Fase 3, slot video tidak dirender
  (LiteYouTube sudah menangani videoId kosong).
- Spesifikasi teknis: cuma SK 50F-6 Kobelco yang punya spesifikasi lengkap
  (flywheel 29,6 HP, operating weight 4.720 kg, bucket 0,13 m³). 22 unit
  Excavator lain: field `spesifikasi` kosong.
- `/alat-berat/penjualan`: isi halaman tidak ada di sumber sama sekali.
  Fase 3 perlu bikin halaman minimal (noindex, keluar sitemap) sesuai brief.

### Trading — `OUT OF SCOPE (histori)`
- Kategori produk per brand: tidak ada di sumber, tidak dikelompokkan
  berdasarkan tebakan.
- Logo brand: sengaja tidak dipakai (bukan field kosong karena hilang, tapi
  keputusan desain) — nama brand ditampilkan sebagai wordmark teks sampai
  client konfirmasi izin pemakaian logo pihak ketiga.

### Agribisnis (Ostindo) — tetap aktif
- Nomor & masa berlaku sertifikat (SNI, SNI terbaru, ISO 9001:2008, IOPC
  2014): tidak ada di sumber.
- Badan penerbit sertifikat SNI & ISO 9001:2008: tidak disebut eksplisit di
  sumber (cuma LIPI dan IOPC yang jelas penerbit/penyelenggaranya) — field
  `penerbit` dikosongkan untuk 2 entri itu, bukan ditebak jadi "Badan
  Standardisasi Nasional".
- Dosis Rizafert, Actifert, Bless NPK: tidak ada di sumber.
- Bless Cair: dosis ADA di sumber tapi satuannya ambigu ("Dosis 9ml/lt/air").
  Field `catatanDosis` dipakai, bukan `dosisAnjuran` — jangan diisi tabel
  sebelum client konfirmasi satuan.
- Penerbit penghargaan "Best Fertilizer 2016": tidak disebut di sumber.

### Umum — tetap aktif (untuk lokasi Ostindo saja)
- Koordinat lokasi (`latitude`/`longitude`) di `content/kontak.ts`: tidak
  ada di sumber mana pun, tidak ditebak. (Lokasi Palembang di file itu
  berasal dari Cakra — `OUT OF SCOPE`; yang relevan: Jakarta Barat &
  Pabrik Tangerang.) Tautan Google Maps nanti (Fase 8)
  harus dibangun dari teks alamat (`?api=1&query=<alamat>`), bukan koordinat.

---

## 2. Perlu verifikasi client — `[VERIFIKASI]`

- **Alat Berat / Excavator** — `OUT OF SCOPE (histori)`: semua ejaan nama unit & brand di
  `content/alat-berat/unit.ts` perlu dicek ke sumber. Khusus:
  - "PC 300-7" — brand "Komatsu" disimpulkan dari pola penamaan "PC" yang
    dipakai entri lain (semua eksplisit "Komatsu"), BUKAN tertulis eksplisit
    di baris itu sendiri (`brandPerluVerifikasi: true`).
  - Dua entri "Kobelco (seri tidak terbaca)" di sumber: ditulis sebagai
    "Kobelco (seri belum terverifikasi)" di data, tanpa nomor model dikarang,
    sesuai instruksi. Slug: `kobelco-seri-belum-terverifikasi-1` / `-2`.
- **Portofolio** — `OUT OF SCOPE (histori)`: kategori proyek "Pekerjaan Proyek PT. Bukit Asam" dan
  "Pekerjaan SMO Construction Service Work PT. PP Persero" ditandai
  `kategoriPerluVerifikasi: true` — pemetaan kategori usulan dari judul.
- **Agribisnis / Futricho**: kandungan spora "10^6 per gram" — PDF sumber
  tertulis "106" tanpa pangkat, kemungkinan hilang format superscript.
- **Agribisnis / Actifert**: kemasan 25 kg dibaca dari gambar kemasan,
  bukan teks — `perluVerifikasi: true`.
- **Agribisnis / mitra riset**: seluruh 13 tahun kerja sama di
  `content/agribisnis/riset.ts` dibaca dari screenshot web lama — ditandai
  `perluVerifikasi: true` di semua entri yang punya tahun.
- **Kontak** — `OUT OF SCOPE (histori)`: fax Kantor Operasional Palembang "0711-819821" — sumber
  menandainya lewat ikon fax di screenshot, bukan label teks eksplisit.
- Catatan konflik data Agribisnis (dari CONTENT-SOURCE.md §7, belum
  ditampilkan di mana pun sampai dikonfirmasi): PDF menyebut "lebih dari 25
  tahun" tapi kemasan bertuliskan "20 tahun"; nomor pendaftaran kemasan
  terbaca beda antar halaman (…058 / …050).

---

## 3. Perlu konten dari client — artikel berita draft

`https://www.ostindo.co.id/berita` berhasil di-fetch (6 artikel). Isi
LENGKAP cuma bisa diambil untuk **1 dari 6** artikel:

| Artikel | Status |
|---|---|
| PT Anugerah Mustika Ostindo Berkolaborasi dengan BRIN... | **Terisi** — isi lengkap genuine, bukan boilerplate. Tanggal 27 April 2023 dari teks artikel sendiri ("Kamis (27/4)"). |
| Kerjasama dengan LIPI | `draft: true` |
| Teknologi Baru Kami | `draft: true` |
| 8 Cara Penggunaan Pupuk Organic Dengan Benar | `draft: true` |
| Proses Pupuk NPK Bless Selama 6 Bulan | `draft: true` |
| OSTINDO kembali Mendapatkan Penghargaan Best Fertilizer 2016 | `draft: true` |

5 artikel draft isi bodinya **identik** satu sama lain di sumber — satu
paragraf boilerplate generik perusahaan ("PT. Anugerah Mustika Ostindo
bergerak dibidang Produksi dan Pemasaran Penyubur Tanah...", atau variannya),
tidak nyambung dengan judul masing-masing (mis. halaman "8 Cara Penggunaan
Pupuk" tidak berisi 8 cara apa pun). Ini mengonfirmasi catatan
CONTENT-SOURCE.md §8 soal excerpt yang di-reuse — ternyata isi body-nya juga
di-reuse, bukan cuma excerpt listing.

**Perlu dari client**: isi asli ke-5 artikel ini (draft/naskah lama, atau
tulis ulang). Sampai saat itu: tidak masuk sitemap, halaman detail
`notFound()`, excerpt kosong. Judul tetap boleh tampil di section Berita
homepage per instruksi.

Tanggal publikasi listing page (`June 5, 2023` / `August 22, 2016` /
`May 2016`, dsb. — hasil WebFetch halaman index) **tidak dipakai** karena
dua fetch berbeda untuk artikel BRIN yang sama memberi tanggal berbeda
(listing: 5 Juni 2023; halaman artikel: 22 Agustus 2016) — tidak konsisten,
kemungkinan tanggal "terakhir diubah" CMS, bukan tanggal terbit asli. Field
`tanggal` di `types/berita.d.ts` dibiarkan kosong untuk ke-5 artikel draft.

---

## 4. Catatan teknis untuk fase berikutnya

- **Konflik font** — **SELESAI (22 Oktober 2026, keputusan D1, tahap V1):**
  `app/layout.tsx` kini memuat Fraunces (variable, style normal + italic asli,
  axis `opsz`) + Inter; Manrope dan fallback Georgia dihapus; `accentWord`
  boleh dipakai sesuai DESIGN.md §6.1. Catatan asli dipertahankan di bawah
  sebagai riwayat.
  *(Riwayat)* (relevan untuk Ostindo — lihat juga PRD §9
  poin 5 dan DESIGN.md §6): `app/layout.tsx` (tidak boleh diedit di fase ini) memakai
  **Manrope** untuk `--font-heading`, dengan komentar "lebih sesuai untuk
  company profile konstruksi/alat berat dibanding serif italic". Ini
  bertentangan langsung dengan `DESIGN.md` §6 yang menyatakan **Fraunces**
  "FINAL — dikunci berdasarkan referensi visual dari klien", termasuk aturan
  italic accent di §6.1 yang secara eksplisit butuh italic ASLI dari Fraunces
  (bukan fake/synthetic italic). Manrope saat ini di-load tanpa style
  italic, jadi prop `accentWord` di `PageHeader` (dibuat Fase 1, dipakai
  Fase 2+) kalau dipakai sekarang akan render fake-italic yang dilarang
  §6.1. **Perlu keputusan client/tim**: pakai Fraunces (ganti `app/layout.tsx`,
  di luar wewenang fase ini) atau update `DESIGN.md` supaya sesuai kode
  aktual (Manrope, tanpa italic accent). Jangan pakai `accentWord` di H1
  manapun sebelum ini diputuskan.
- **Git**: direktori sudah berupa git repo dengan 7 commit history (semua
  bertanggal hari ini) dan remote `origin` ke
  `https://github.com/wahyualfrq/cakraprimanusantara.git` — ditemukan saat
  audit awal Fase 1, bukan dibuat oleh sesi ini. Working tree sudah bersih
  (sama persis dengan `origin/main`) sebelum Fase 1 mulai, jadi tidak ada
  commit "snapshot" baru — sebagai gantinya HEAD saat itu ditandai tag
  `baseline-fase-1` untuk jadi referensi `git diff` proteksi Hero/Navbar/
  layout di semua fase. Tidak ada push yang dilakukan sesi ini.
  **VERIFY (diperiksa 21 Okt 2026):** pada clone repo saat audit dokumentasi
  ini, `git log` menunjukkan **12 commit** (bukan 7) dan **tidak ada tag**
  (`baseline-fase-1` tidak ditemukan; mungkin hanya ada lokal di sesi lama
  dan tidak pernah di-push). Paragraf di atas dipertahankan sebagai catatan
  historis Fase 1.
- **Copy homepage di luar scope Fase 1 yang diizinkan**: tile Agribisnis di
  `components/sections/UnitSelector.tsx` masih berbunyi "Pupuk hayati &
  biopestisida **terpercaya** sejak 1995" — "terpercaya" adalah adjective
  kosong tanpa bukti yang dilarang eksplisit di DESIGN.md §8.7 sebagai
  contoh. Tidak diubah di Fase 1 karena di luar daftar edit yang disetujui;
  perlu persetujuan eksplisit sebelum disentuh. Catatan: tile ini ada di
  komponen pemilih unit (`UnitSelector`) yang berkaitan dengan struktur
  multi-unit lama (lihat §8).
- **MDX**: `@next/mdx` (16.3.5, pin exact ke versi `next`), `@mdx-js/loader`
  3.1.1, `@mdx-js/react` 3.1.1 (dependencies), `@types/mdx` 2.0.14 (devDep).
  Metadata artikel lewat named export `meta` per file MDX (bukan frontmatter
  YAML — tidak pakai `gray-matter`, sesuai batasan). Type augmentation untuk
  `meta` ada di `types/mdx.d.ts` — **file itu sengaja tidak boleh punya
  top-level import/export sendiri**, karena kalau jadi module, blok
  `declare module "*.mdx"` di dalamnya jadi lokal, bukan augmentasi global,
  dan `meta` tidak akan ke-detect TypeScript (sudah diuji, ini bukan teori).
  `next.config.ts` juga ditambah `remotePatterns` untuk `i.ytimg.com` (poster
  `LiteYouTube`), selain untuk MDX.
- **`--cpn-navbar-height` (token baru, 4rem)**: ditambahkan ke `globals.css`
  karena `Navbar` `position: fixed` tidak mendorong `<main>` lewat document
  flow — semua halaman dalam butuh clearance ini di elemen paling atas
  (`PageHeader` sudah menanganinya sendiri). `main { flex: 1 }` di
  `globals.css` TIDAK diubah (di luar scope append-token), jadi halaman yang
  belum pakai `PageHeader` (semua stub saat ini) masih mengandalkan padding
  `Section` secara kebetulan, bukan clearance yang disengaja — kalau mau
  dirapikan sebelum Fase 2+, perlu keputusan terpisah.
- **Kontraktor route** — `OUT OF SCOPE (histori)`: lihat `STRUCTURE.md` §2.1 — restrukturisasi folder
  `/kontraktor/[layanan]` dieksekusi di Fase 2, bukan Fase 1.
- **`content/kontraktor/proyek.ts` kategori** — `OUT OF SCOPE (histori)`: union tipe diganti total dari
  placeholder lama (5 kategori yang sama dengan layanan Kontraktor) ke
  taksonomi asli dari CONTENT-SOURCE.md §4 (7 kategori: chipping,
  pekerjaan-tanah-jalan, bangunan, concrete-repair, mekanikal, alat-berat,
  sipil). Kategori "Pencapaian" (Best Fertilizer 2016) **tidak** dimasukkan
  ke file ini — disimpan di `content/agribisnis/sertifikasi.ts` karena
  secara substansi itu penghargaan Agribisnis, bukan proyek Kontraktor.
  Halaman `/portofolio` (Fase 6) perlu menggabungkan dari 2 sumber ini saat
  render kategori "Pencapaian".
- **`content/klien.ts` vs `content/agribisnis/pelanggan.ts`** (`klien.ts` = `OUT OF SCOPE`; `pelanggan.ts` = Ostindo, aktif): sengaja TIDAK
  digabung jadi satu file untuk menghindari duplikasi data (STRUCTURE.md §1
  poin 2). `klien.ts` = klien Kontraktor/Alat Berat (dari judul proyek).
  `pelanggan.ts` = 31 klien Agribisnis dari PDF Ostindo. Komponen yang butuh
  tampilan gabungan merge keduanya saat render, bukan saat simpan data.

---

## 5. Fase 2 — konfirmasi implementasi — `OUT OF SCOPE (histori)`

Seluruh bagian ini mencatat implementasi Kontraktor (bukan Ostindo). Dipertahankan
sebagai jejak; `EditorialIndex` (komponen generik) tetap relevan dipakai ulang
untuk landing Agribisnis.

- Galeri Concrete Repair (8 placeholder) dan Chipping Kelapa Sawit (3
  placeholder) sudah dirender di `/kontraktor/[layanan]`. Slot video
  Chipping sengaja tidak render apa pun (`videoId` kosong) — dikonfirmasi
  lewat screenshot (hover dan non-hover), bukan cuma dari baca kode.
- `components/ui/EditorialIndex.tsx` (baru) dipakai landing `/kontraktor`,
  dirancang untuk dipakai ulang di landing Agribisnis (Fase 5) yang menurut
  DESIGN.md §8.11 punya pola struktur sama ("indeks editorial bernomor atau
  baris berlink") — supaya Fase 5 tidak perlu duplikat komponen.
- Route `/kontraktor/[layanan]` + `generateStaticParams` + `dynamicParams =
  false` terverifikasi lewat 2x `npm run build`: build pertama dengan 5
  folder statis lama MASIH ADA (semuanya tetap jadi halaman statis, dan
  route dinamis yang sama juga berhasil generate 5 path-nya sendiri secara
  terpisah tanpa error — Next.js App Router membolehkan file statis
  menaungi route dinamis di path yang sama), lalu folder lama dihapus via
  `git rm`, build kedua mengonfirmasi kelima URL sekarang benar-benar
  dilayani oleh `/kontraktor/[layanan]` (ditandai "●" SSG di output build).
- `content/kontraktor/layanan.ts` dapat 2 field baru: `jumlahFotoSumber?`
  dan `videoId?` — dipakai page component untuk menentukan galeri vs foto
  tunggal, bukan hardcode di komponen (STRUCTURE.md §8 checklist).

---

## 6. Fase 2.1 — revisi ke teks verbatim (CONTENT-VERBATIM.md) — `OUT OF SCOPE (histori)` untuk bagian Kontraktor

Prinsip "disalin persis" (verbatim) tetap berlaku untuk konten Ostindo; rincian
di bawah menyangkut §A Kontraktor yang keluar scope.

Setelah Fase 2 selesai, `CONTENT-VERBATIM.md` ditemukan di repo (file baru,
tidak dibuat sesi ini) dan dikonfirmasi oleh user sebagai sumber teks utama
yang mengalahkan `CONTENT-SOURCE.md` untuk semua paragraf/poin/judul,
dengan aturan "disalin persis" (bukan diringkas). `content/kontraktor/layanan.ts`
ditulis ulang total mengikuti §A:

- Tipe `Layanan` berubah: `deskripsiSingkat` + `intro` (yang tadinya isinya
  identik, kalimat ringkas hasil parafrase) diganti jadi `kalimatIndeks`
  (kalimat pertama `intro`, verbatim — sesuai aturan eksplisit
  CONTENT-VERBATIM.md §A1), `intro` (paragraf penuh, verbatim), `subjudul`
  (baru), `pengantarPoin` (paragraf transisi sebelum poin, baru, verbatim),
  `penutup` (paragraf penutup, baru, verbatim).
- Ketiga poin berlabel tiap layanan diperpanjang ke teks verbatim penuh
  (sebelumnya versi ringkas). Label poin M&E ke-2 berubah dari "Instalasi
  dan Implementasi" jadi "Instalasi dan Implementasi Profesional" (sesuai
  sumber).
- `lib/text.tsx` (baru): `renderInlineEmphasis()` — merender `*kata*` dari
  teks verbatim (mis. *concrete repair*, *chipping*, *finishing*,
  *replanting*, *chipper*) sebagai `<em>`. `components/ui/DefinitionList.tsx`
  diupdate: `description` dari `string` jadi `ReactNode` supaya bisa
  menampung hasil render ini (komponen ini dibuat Fase 1, bukan proteksi
  §A, bebas disesuaikan).
- Halaman `/kontraktor/[layanan]` dapat 2 elemen baru dalam urutan heading
  yang benar: H2 `subjudul` + paragraf `pengantarPoin` sebelum
  DefinitionList, paragraf `penutup` sesudahnya.
- PageHeader landing `/kontraktor`: deskripsi diganti ke tagline sumber
  verbatim `General Contractor, Trading & Rental Heavy Equipment` (bahasa
  Inggris, apa adanya dari footer sumber) — bukan kalimat ringkas buatan
  sendiri. Baris indeks layanan sekarang pakai `kalimatIndeks` (kalimat
  pertama tiap layanan, verbatim), bukan kalimat ringkas.
- Satu kalimat buatan sendiri dihapus: deskripsi section penutup "Konsultasi
  Layanan Kontraktor" ("Ceritakan kebutuhan proyek Anda...") — tidak ada
  padanannya di `CONTENT-VERBATIM.md`, dan aturan B.4 baru melarang kalimat
  deskriptif buatan sendiri di luar elemen UI. Section sekarang cuma judul +
  tombol WhatsApp.
- `TYPO-LOG.md` dibuat (baru, kosong untuk Kontraktor — §A tidak punya typo
  yang perlu diperbaiki).
- Diverifikasi ulang: `tsc --noEmit`, `eslint`, `npm run build` (bersih),
  screenshot `/kontraktor`, `/kontraktor/civil-project`,
  `/kontraktor/building-project` (termasuk cek italic *finishing* render
  dengan benar).

---

## 7. Fase 6+7+8 — Portofolio, Berita, Kontak (isi dari sumber)

> Berita (7.1) = Ostindo, tetap aktif. Portofolio = `OUT OF SCOPE`/`VERIFY`.
> Kontak (7.2) hanya relevan untuk kantor Jakarta Barat & pabrik Tangerang.

### 7.1 Koreksi atas simpulan §3 (artikel berita draft)

§3 di atas (ditulis Fase 1) menyimpulkan cuma 1 dari 6 artikel punya isi
asli, dan tanggal BRIN "tidak konsisten" sehingga dikosongkan. Pengecekan
ulang fase ini membaca HTML mentah tiap halaman (bukan cuma ringkasan
WebFetch) dan menemukan:

- **Tanggal BRIN bukan inkonsisten — dua tanggal berbeda makna.** Tanggal
  27 April 2023 ("Kamis 27/4") adalah tanggal **acara** penandatanganan,
  dikutip di dalam isi artikel. Tanggal terbit beritanya sendiri adalah
  **5 Juni 2023**, dari `date_label` milik post ini di listing
  `ostindo.co.id/berita` (dikonfirmasi juga oleh folder upload foto artikel
  ini: `/wp-content/uploads/2023/06/`). `meta.tanggal` BRIN diperbaiki ke
  `2023-06-05`; kutipan 27 April 2023 tetap ada di paragraf pertama isi
  artikel, apa adanya.
- **Isi MDX BRIN Fase 1 ternyata parafrase, bukan verbatim** — dibuat
  sebelum aturan B.4 (verbatim) ada. Dibandingkan paragraf-per-paragraf
  dengan HTML sumber: hilang 1 kalimat pembuka, 2 kutipan langsung
  terhapus seluruhnya, beberapa kalimat disusun ulang. Ditulis ulang total
  jadi 12 paragraf verbatim penuh (lihat TYPO-LOG.md untuk daftar typo
  sumber yang diperbaiki & dicatat).
- **"Kerjasama dengan LIPI" dan "Teknologi Baru Kami" ternyata PUNYA isi
  asli** (1 paragraf, bukan kalimat boilerplate perusahaan), tanggal
  22 Agustus 2016 untuk keduanya — isinya identik satu sama lain di sumber.
  Keputusan user: "Teknologi Baru Kami" tetap **draft** (dicurigai salah
  tempel/template, tidak nyambung dengan judulnya sendiri — minta isi asli
  dari client); "Kerjasama dengan LIPI" **diterbitkan** karena isinya genuine
  walau singkat.
- Artikel lain yang masih draft (8 Cara Penggunaan Pupuk Organic, Proses
  Pupuk NPK Bless, OSTINDO Penghargaan Best Fertilizer 2016) dikonfirmasi
  ulang: isi body di sumber cuma kalimat boilerplate perusahaan — sesuai
  simpulan §3 sebelumnya, tidak berubah.
- **Artikel ke-7 ditemukan di halaman 2** (`ostindo.co.id/berita/page/2/`):
  "Produk Baru dari OSTINDO Pupuk Bless Cair" (12 Maret 2016, typo sumber
  "Cari"→"Cair" — lihat TYPO-LOG.md). Isinya juga cuma boilerplate — draft,
  judul tampil tanpa tanggal/tautan di `/berita` (tanggal tersimpan di data
  tapi sengaja tidak dirender, karena item tanpa isi).

**Perlu dari client**: isi asli untuk "Teknologi Baru Kami", "8 Cara
Penggunaan Pupuk Organic", "Proses Pupuk NPK Bless", "OSTINDO Penghargaan
Best Fertilizer 2016", dan "Produk Baru Pupuk Bless Cair" — 5 artikel masih
draft/judul-saja.

### 7.2 Kontak (butir terkait Palembang/Cakra = `OUT OF SCOPE (histori)`)

- Nomor fax `0711-819821`: status `[VERIFIKASI]` tidak berubah (lihat §1
  sebelumnya) — tidak ditampilkan di `/kontak` sampai jenisnya terkonfirmasi.
- Jam kantor "Senin - Jumat, 09.00 - 17.00" cuma ditampilkan di kartu
  "Kantor Operasional Palembang" (yang punya kontak telepon/WA dari sumber
  Cakra Rental), bukan diulang di ketiga lokasi Palembang — keputusan
  render, bukan ada 3 jam kantor berbeda di sumber.
- Koordinat peta tetap `[GAP]` — tautan lokasi dibangun dari teks alamat ke
  Google Maps search, bukan iframe/koordinat.

### 7.3 Pengingat untuk Fase 10 (SEO & QA)

- ~~Sebelum deploy publik: halaman stub yang belum punya konten nyata
  (`/alat-berat`, `/trading`, `/agribisnis`, `/tentang-kami` dan sub-rutenya)
  harus diberi `robots: { index: false }`...~~ **Basi (diperbarui 21 Okt
  2026).** Verifikasi dengan grep pada kode: halaman stub yang diperiksa
  (mis. `app/agribisnis/page.tsx`, `app/agribisnis/produk/[slug]/page.tsx`)
  sudah memakai `noindex: true`. Hasil `grep "noindex: true" app` (21 Okt
  2026): 10 file — `app/agribisnis/{page,produk/page,produk/[slug]/page,riset-inovasi/page,sertifikasi/page}.tsx`,
  `app/alat-berat/{page,penjualan/page,sewa/page,sewa/[kategori]/page}.tsx`, `app/trading/page.tsx`.
  Yang tetap berlaku: jangan mengindeks halaman kosong/draft, dan jangan
  memasukkannya ke sitemap. Stub `/alat-berat` dan `/trading` bukan lagi
  target SEO (lihat §8). Yang BELUM diverifikasi: apakah `app/tentang-kami/page.tsx`
  dan sub-rutenya (jika ada) berisi konten final atau perlu `noindex`.

### 7.4 `app/sitemap.ts` ditulis ulang (kondisi saat ini; memuat `/kontraktor` — lihat §8)

Sebelumnya berisi rute statis hardcode yang sudah basi sejak Fase 2 (5 rute
`/kontraktor/<slug-lama>` yang sudah dihapus) dan `proyekEntries` ke
`/portofolio/[slug]` yang sekarang tidak ada (portofolio tanpa halaman
detail). Ditulis ulang supaya cuma memuat rute yang benar-benar punya
konten: `/`, `/kontraktor` + 5 `layananList`, `/portofolio`, `/berita` +
`beritaPublishedList` (2 slug non-draft), `/kontak`. Rute stub (alat-berat,
trading, agribisnis, tentang-kami) sengaja belum dimasukkan — lihat 7.3.

---

## 8. Pekerjaan lanjutan akibat koreksi scope (di luar tugas dokumentasi)

> Ditambahkan 21 Oktober 2026. Daftar ini **hanya mencatat** sisa kode/konten
> yang masih mengikuti scope lama (holding Cakra, 4 unit usaha). Tidak ada
> satu pun yang dikerjakan pada tugas dokumentasi; source code tidak diubah.
> Sebelum menghapus/mengubah route apa pun, nilai dampak SEO/redirect dan
> putuskan paritas URL dengan situs resmi (PRD §9 poin 1). Hasil grep di
> bawah adalah daftar awal, bukan inventori lengkap.

### 8.1 Route dan konten dari scope lama
- Route: `app/kontraktor/` (+ `[layanan]`), `app/alat-berat/` (+ `penjualan`,
  `sewa`, `sewa/[kategori]`), `app/trading/`, `app/portofolio/`.
- Content: `content/kontraktor/*`, `content/alat-berat/*`, `content/trading/brand.ts`,
  `content/klien.ts`, lokasi Palembang + `jamOperasionalCakra` di `content/kontak.ts`,
  pilar/linimasa/keunggulan Cakra di `content/tentang-kami.ts` (`profilHoldingData`,
  `pilarBisnisList`, `linimasaList` item 1999 & "Integrasi Holding", `keunggulanHoldingData`).
  Entri Ostindo (1995, 1996, 2014–2015, pilar Agribisnis) di file yang sama adalah KEEP.
- `app/sitemap.ts` masih memuat `/kontraktor` dan `layananList`; `/portofolio` juga terdaftar.

### 8.2 Identitas, copy, dan SEO yang masih memuat Cakra
- `lib/seo/metadata.ts`: `SITE_NAME = "PT Cakra Prima Nusantara"`, fallback `SITE_URL = https://cakraprimanusantara.co.id` — domain final belum ditetapkan (PRD §9 poin 1).
- `lib/seo/structured-data.ts`: `organizationSchema` dan `serviceSchema` memakai `SITE_NAME` → Organization JSON-LD di `app/layout.tsx` mengklaim Cakra.
- `app/kontak/page.tsx` (baris ~139–157): `localBusinessSchema` dirender untuk **seluruh** `lokasiList`, termasuk 3 lokasi Palembang (Cakra). Schema bisnis di luar scope tidak boleh dipasang.
- `app/kontraktor/[layanan]/page.tsx` memasang `serviceSchema` (provider = `SITE_NAME`); `app/portofolio/page.tsx` memasang `itemListSchema`.
- `components/layout/Footer.tsx`: 3 alamat Palembang, tautan Kontraktor/Alat Berat/Trading, copyright "PT Cakra Prima Nusantara".
- `components/layout/Navbar.tsx`: alt logo "PT Cakra Prima Nusantara" (asal logo Ostindo `VERIFY`, DESIGN.md §2).
- `components/sections/HeroSection.tsx`, `AboutSection.tsx` (stat "100+ Unit Armada Alat Berat" — tidak bersumber untuk Ostindo), `UnitSelector.tsx`, `PortfolioHighlight.tsx`, `app/page.tsx` (meta: "holding korporat… Kontraktor, Alat Berat, Trading, dan Agribisnis").
- `app/kontak/ContactForm.tsx` (opsi unit & email `info@cakraindopratama.com`), `app/kontak/FaqSection.tsx` (jawaban tentang empat bidang usaha & Palembang).
- `app/layout.tsx`: komentar font menyebut "konstruksi/alat berat" (konflik font, lihat §4).
- Tema navy/orange & `data-theme` agri di `app/globals.css` (token masih ada; DESIGN.md §4 menetapkan tema tunggal hijau).

### 8.3 Temuan baru audit dokumentasi (21 Okt 2026)
- `content/agribisnis/studi-kasus.ts`: tidak ditemukan sumber di CONTENT-SOURCE/VERBATIM — `VERIFY`, jangan ditampilkan sebagai fakta sebelum ada sumber.
- `content/agribisnis/produk.ts`: bagian ringkasan bukan verbatim (CONTENT-VERBATIM tetap menang). Komposisi NPK "+TE" `VERIFY`. Brosur produk di situs resmi belum dicek.
- Jumlah mitra riset: 17 vs 23 vs 12 muncul di dokumen/kode berbeda — `VERIFY` (PRD §10 bagian Riset & Inovasi).
- Klaim "lebih dari 25 tahun" vs kemasan "20 tahun" vs berdiri Juli 1995 — `VERIFY` (PRD §9 poin 3).
- Copy homepage "disetujui" (CONTENT-VERBATIM aturan #5) adalah copy holding → tidak berlaku untuk Ostindo; copy baru belum ada (PRD §9 poin 6).
- Typo sumber bagian Agribisnis wajib dicatat di TYPO-LOG.md; saat audit belum ada entri Agribisnis selain artikel berita — `VERIFY`.
- `PROMPT-LANJUTAN.md` dirujuk di STRUCTURE.md tetapi tidak ditemukan di repo.
- Foto lokal di `public/` vs aturan strategi gambar Vercel Blob (STRUCTURE.md §7) — selaraskan saat implementasi.
- Lampiran tugas berformat CRLF sedangkan repo LF (isi identik) — hanya perhatian line-ending saat menyalin file.
