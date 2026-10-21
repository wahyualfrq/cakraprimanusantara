# DESIGN.md
## Design System — Redesign Website PT Anugerah Mustika Ostindo

**Status:** v0.2 — scope dikoreksi ke Ostindo (21 Oktober 2026). Warna hijau brand, tipografi (Fraunces + Inter), konsep liquid glass, dan prinsip anti-AI-slop (§8) **tetap dipertahankan**. Tema navy-orange untuk Kontraktor/Alat Berat/Trading dikeluarkan dari scope (§4). Item yang masih `VERIFY` atau terbuka: lihat §9. Arah visual dari referensi LawnBuster: §10.

---

## 1. Konsep Desain

**Clean, Modern, Liquid Glass.**

- **Clean & Modern**: whitespace lega, tipografi besar-berani untuk headline, minim ornamen dekoratif yang gak perlu.
- **Liquid Glass**: elemen translucent/blur (kartu, bar navigasi, tile) yang "mengambang" di atas foto — kontras terang-gelap dijaga lewat blur + border tipis + shadow lembut, bukan lewat warna solid block.
- Pola ini menuntut **copy pendek** (headline 1-2 baris, label singkat) dan **foto berkualitas tinggi sebagai lapisan dasar** — bukan block teks panjang. Konten yang disusun di `PRD.md` perlu dipadatkan mengikuti pola ini di level komponen (lihat §7).

---

## 2. Color Palette — Brand Green

Base warna: **`#016625`**. Secara HSL, ini `hsl(141°, 98%, 20%)` — hijau forest yang sangat jenuh dan gelap. Karena kedalamannya, warna ini secara natural jatuh di posisi **700** dalam skala 50-950 (bukan 500, yang biasanya jadi titik tengah skala) — dicatat di sini supaya gak membingungkan siapa pun yang baca token ini nanti.

> **`VERIFY` — asal nilai warna.** v0.1 mencatat `#016625` "diambil langsung dari logo". Logo yang dimaksud memuat motif gear dan daun (§6) dan tampaknya logo PT Cakra Prima Nusantara, yang kini di luar scope. Belum ada aset logo Ostindo yang memverifikasi nilai ini. Nilai **dipertahankan** sesuai instruksi pemilik proyek (hijau tetap identitas utama; tidak diganti tanpa bukti dari aset brand atau keputusan klien). Pertanyaan terbuka: `PRD.md` §9 poin 4.

Seluruh scale dihitung dari hue & rasio saturasi yang sama supaya tetap satu keluarga warna yang koheren:

| Token | Hex | Kegunaan |
|---|---|---|
| `--cpn-green-50` | `#F3FCF6` | Background tint sangat halus (section alternatif) |
| `--cpn-green-100` | `#E2F9EA` | Background badge/chip, hover state di atas putih |
| `--cpn-green-200` | `#BEF4D1` | Border/divider di atas background terang |
| `--cpn-green-300` | `#82EDA8` | Aksen dekoratif, ilustrasi |
| `--cpn-green-400` | `#2BEE70` | Highlight di atas background gelap, indikator sukses |
| `--cpn-green-500` | `#08C44B` | CTA sekunder, link di atas foto/background gelap |
| `--cpn-green-600` | `#039637` | Hover state untuk tombol primary |
| **`--cpn-green-700`** | **`#016625`** | **PRIMARY BRAND** (nilai terkunci; asal dari logo: `VERIFY`, lihat catatan di atas). Tombol utama, header/nav solid |
| `--cpn-green-800` | `#014C1C` | Primary hover/active, teks di atas background terang (kontras tinggi) |
| `--cpn-green-900` | `#013213` | Background section gelap (footer) |
| `--cpn-green-950` | `#021D0B` | Shade terdalam, cadangan untuk dark mode kalau dibutuhkan nanti |

*Catatan: `green-900` disiapkan untuk footer/section gelap. v0.1 menyebut ini konsisten dengan footer web lama Ostindo dan Cakra; klaim itu belum terverifikasi untuk Ostindo (pengecekan 21 Oktober 2026 hanya mengonfirmasi footer situs Ostindo berisi blok kontak, tautan Instagram, dan hak cipta, tanpa informasi warna). Bagian Cakra `OUT OF SCOPE`.*

## 3. Neutral Palette (Gray)

Warna teks/background/border **tidak** memakai hijau brand langsung (hijau setinggi itu terlalu berat kalau dipakai buat body text panjang). Dipakai neutral gray dengan sedikit undertone hijau supaya tetap harmonis dengan brand, tanpa mengorbankan keterbacaan:

| Token | Hex | Kegunaan |
|---|---|---|
| `--cpn-gray-50` | `#FAFAFA` | Background halaman default |
| `--cpn-gray-100` | `#F4F5F4` | Background card netral |
| `--cpn-gray-200` | `#E7E9E7` | Border, divider |
| `--cpn-gray-300` | `#D1D5D2` | Border lebih tegas, disabled state |
| `--cpn-gray-400` | `#A8AFA9` | Placeholder text, icon inactive |
| `--cpn-gray-500` | `#7C847D` | Teks sekunder/caption |
| `--cpn-gray-600` | `#5A625B` | Teks body di atas background terang |
| `--cpn-gray-700` | `#414942` | Heading di atas background terang |
| `--cpn-gray-800` | `#2B322C` | Teks kontras tinggi |
| `--cpn-gray-900` | `#181D19` | Hampir hitam — heading utama |
| `--cpn-gray-950` | `#0D110E` | Background dark section (alternatif footer non-hijau) |

## 4. Tema

Website hanya untuk Ostindo, jadi memakai **satu tema berbasis hijau** untuk seluruh halaman. Tema per unit usaha dari v0.1 (hub, agribisnis, konstruksi) tidak lagi punya fungsi.

| Peran | Token | Nilai |
|---|---|---|
| Primary | `green-700` | `#016625` |
| Accent | `green-500` | `#08C44B` |

**Dikeluarkan dari scope aktif (arsip keputusan lama):**

- **Tema "konstruksi" — `OUT OF SCOPE`.** `navy-700` `#16324F` + `orange-500` `#F2994A` (hover: `navy-800` `#0F2338`, `orange-600` `#DB7F2B`; tint: `navy-100` `#E7ECF1`) diturunkan dari warna web Cakra Indo Pratama dan Cakra Rental Alat Berat untuk Kontraktor/Alat Berat/Trading. Kombinasi ini tidak pernah disetujui secara eksplisit (v0.1 menyebutnya proposal), sehingga tidak ada keputusan yang perlu dibatalkan.
- **Varian `data-theme="agri"` (`green-600` + `green-400`).** Dibuat untuk membedakan Agribisnis dari hub dan dari tema navy. Pembeda itu tidak berlaku lagi; `green-600` dan `green-400` tetap menjadi bagian skala warna (§2), mis. untuk hover.
- Token `--cpn-navy-*`, `--cpn-orange-*`, serta blok `[data-theme="konstruksi"]` dan `[data-theme="agri"]` **masih ada di `app/globals.css`** dan di `app/*/layout.tsx`. Pembersihannya pekerjaan terpisah (`GAP-REPORT.md` §8); dokumen ini tidak mengubah kode.

---

## 5. Liquid Glass — Token & Aturan Pakai

Efek glass **wajib** pakai token ini, gak boleh nulis `backdrop-filter`/`rgba` manual di komponen (biar konsisten dan gampang di-tweak global).

### 5.1 Varian "Light Glass" (dipakai di atas foto/background gelap)

```css
--cpn-glass-bg: rgba(255, 255, 255, 0.14);
--cpn-glass-border: rgba(255, 255, 255, 0.28);
--cpn-glass-blur: blur(24px) saturate(160%);
--cpn-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
```

Dipakai untuk: floating stat card di hero dan navbar saat scroll di atas foto. (Pemakaian v0.1 untuk mega menu dan grid tile unit usaha — `OUT OF SCOPE`.)

### 5.2 Varian "Tinted Glass" (dipakai di atas background terang/putih)

```css
--cpn-glass-tint-bg: rgba(1, 102, 37, 0.06);
--cpn-glass-tint-border: rgba(1, 102, 37, 0.16);
--cpn-glass-tint-blur: blur(16px);
```

Dipakai untuk: card portofolio/produk di section putih, badge sertifikasi.

### 5.3 Aturan wajib kontras teks

Glass transparan **tidak menjamin kontras teks cukup** secara otomatis (ini bisa gagal Lighthouse Accessibility check yang jadi target di `PRD.md` §12). Setiap teks di atas foto **wajib** ada scrim/overlay gradient tambahan di belakang glass card, bukan cuma andalin blur:

```css
--cpn-scrim: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
```

### 5.4 Radius & Shadow

Liquid glass butuh radius lebih besar dari default UI biasa:

```css
--cpn-radius-lg: 20px;    /* card/tile glass */
--cpn-radius-xl: 28px;    /* hero floating card */
--cpn-radius-full: 9999px; /* pill button */
```

---

## 6. Tipografi

**Status: FINAL** — menggantikan placeholder Plus Jakarta Sans sebelumnya, dikunci berdasarkan referensi visual dari klien.

- **Heading**: **Fraunces** (variable serif, tersedia di Google Fonts, punya italic asli). Dipilih karena karakter "soft serif"-nya: cukup terstruktur untuk terasa solid dan profesional sebagai website perusahaan, tapi bentuk hurufnya organik/hangat sehingga sejalan dengan bidang usaha Ostindo (pupuk hayati, pertanian). Referensi visual yang dilampirkan pemilik proyek (LawnBuster) juga memakai aksen serif italic pada headline-nya (§10). Alasan lama "echo dualitas gear+daun di logo" dan "cocok sisi konstruksi & industrial" `OUT OF SCOPE`.
- **Body**: **Inter** — tidak berubah, tetap dipakai untuk body text, UI label, caption.

> **Konflik dokumen vs kode — selesai (22 Oktober 2026, keputusan D1, tahap V1):** `app/layout.tsx` kini memuat **Fraunces** (variable, style normal + italic asli, axis `opsz`) untuk heading dan **Inter** untuk body; Manrope dan fallback Georgia di aksen hero dihapus. `accentWord` di `PageHeader` boleh dipakai sesuai aturan §6.1. Riwayat konflik: `GAP-REPORT.md` §4.

### 6.1 Headline Typographic Treatment (wajib dipakai di semua headline besar)

**Revisi dari versi awal**: bukan aturan grammatical (kata kerja vs kata benda), tapi aturan berdasarkan **makna**. Kata yang merepresentasikan konsep struktural/solid (mis. standar, mutu, struktur) tetap Fraunces style normal. Kata yang merepresentasikan konsep organik/tumbuh (pertumbuhan, alam) dapat treatment italic sebagai flourish accent. Hanya **satu kata per headline** yang dapat treatment ini — bukan semua kata benda — supaya aksennya tetap terasa spesial, bukan pola berulang yang menjemukan.

Contoh penerapan (memakai potongan filosofi perusahaan dari sumber, `CONTENT-VERBATIM.md` §E1; ini **hanya memperagakan aturan tipografi**, bukan copy hero final — copy hero Ostindo belum ditetapkan, `PRD.md` §11):

```
Membangun Tanpa Merusak,
<em>Tumbuh</em> Selaras Alam
```

"Tumbuh" dipilih sebagai accent word karena secara makna paling organik/poetic. "Membangun" dan "Merusak" tetap tegas/normal karena maknanya sendiri. Contoh lama v0.1 ("Membangun Infrastruktur. *Menumbuhkan* Agribisnis.") adalah copy holding dan `OUT OF SCOPE`; copy itu masih tampil di `components/sections/HeroSection.tsx` dan dicatat untuk pembersihan (`GAP-REPORT.md` §8).

Italic wajib pakai style italic asli dari Fraunces (`font-style: italic` pada font yang di-load dengan style `italic` tersedia) — **bukan** fake-italic yang di-skew dari font normal, karena hasilnya keliatan murahan/tidak presisi. Kalau butuh karakter yang lebih ekspresif/flourish (mendekati kaligrafi), manfaatkan *optical size axis* Fraunces di ukuran besar — italic Fraunces secara desain jadi lebih dekoratif di optical size besar, tanpa perlu nambah font ketiga ke sistem. Font script terpisah hanya dipertimbangkan kalau opsi ini masih kurang cukup, dan perlu hati-hati soal risiko kelewat dekoratif untuk audiens B2B (lihat DESIGN.md §8 — konsistensi tone).

**Scope penting**: treatment italic accent ini khusus untuk headline utama level hero/halaman (satu per halaman) — **bukan** diterapkan ke semua judul section (H2) di bawahnya. Judul section seperti "Produk", "Kenapa Memilih Kami", "Riset & Inovasi" tetap pakai Fraunces (bukan Inter/font default) supaya tipografi konsisten top-to-bottom, tapi dalam style normal/semibold — **tanpa** italic. Italic yang kepakai terus-menerus bakal kehilangan efek "aksen spesial"-nya.

*Catatan:* gambar referensi LawnBuster memakai aksen italic juga pada beberapa judul section, bukan hanya headline hero (§10). Aturan "hanya headline hero/halaman" di atas **dipertahankan** sampai ada keputusan eksplisit; pertanyaannya dicatat di §9.

### 6.2 Loading Font

Fraunces dan Inter di-load lewat `next/font/google`, self-hosted otomatis oleh Next.js — tidak perlu link CDN eksternal, konsisten dengan prinsip performa di `PRD.md` §8. Variable CSS yang dihasilkan (`--font-heading`, `--font-body`) sudah punya slot-nya di `STRUCTURE.md` §5 (`--cpn-font-heading`, `--cpn-font-body`) — tinggal diisi, tidak perlu ubah struktur token.

---

## 7. Pola Komponen Inti (mengikuti referensi liquid glass)

| Komponen | Pola |
|---|---|
| **Hero** | Foto full-bleed background + headline besar (max 2 baris) + 1 floating glass stat card (§5.1) + CTA pill |
| **Stat Card (floating)** | Glass token §5.1, isi 1 angka besar + label pendek, posisi overlap ke foto. Angka wajib bersumber dan diambil dari data `content/` (mis. tahun berdiri, jumlah produk), tidak di-hardcode di komponen (§10) |
| **Pill Button** | `--cpn-radius-full`, solid primary color / atau glass variant kalau di atas foto |
| **Product Showcase** | Menggantikan *Unit Selector Grid* v0.1 (4 tile unit usaha, `OUT OF SCOPE`). Bagian produk di homepage: baris horizontal yang bisa digeser, terinspirasi bagian layanan di referensi (§10), memakai foto produk asli. Selama foto asli belum ada, gunakan indeks editorial bernomor (komponen `EditorialIndex` yang sudah ada), bukan kartu placeholder berulang (§8.9). Halaman daftar produk: indeks editorial bernomor |
| **Value Prop Row** | Icon + label pendek sejajar horizontal, tanpa paragraf panjang — setiap icon WAJIB berbeda dan literal (§8.3), tidak boleh 1 icon generik diulang. Isi: nilai/keunggulan Ostindo dari sumber (`CONTENT-VERBATIM.md` §G3, §G4) |
| **Portfolio Card** | `VERIFY` — tergantung keputusan nasib `/portofolio` (`PRD.md` §9 poin 2). Pola: foto + judul + tinted glass badge kategori (§5.2). Grid **asimetris** (1 kartu featured lebih besar + beberapa kartu kecil) — sengaja beda struktur dari section produk supaya tidak terkesan kartu yang sama diulang (§8.2) |
| **News List Item** | Layout **horizontal**: thumbnail kecil di kiri (bukan full-width seperti Portfolio Card) + judul & meta di kanan, disusun sebagai list vertikal — bukan grid kartu. Bentuk ini yang membedakan section Berita dari section Proyek secara struktur |
| **Client Logo Strip** | Row **wordmark teks** grayscale dengan spacing lega dan pembatas garis tipis antar item — **tanpa** background chip/pill (kesan trust bar editorial, bukan UI filter/form). Isi: nama pelanggan Ostindo dari `content/agribisnis/pelanggan.ts` sebagai teks, bukan logo |

---

## 8. Prinsip Anti-AI-Slop (Visual)

Tujuan section ini: mencegah hasil desain yang secara visual terasa generik/template — ciri khas yang gampang dikenalin sebagai "asal jadi", meskipun secara teknis udah pakai design token yang benar. Ini berlaku untuk **semua** halaman, bukan cuma homepage.

### 8.1 Disiplin Efek Glass

- Liquid glass **bukan default untuk semua card**. Efek ini punya fungsi spesifik: menjaga keterbacaan teks di atas foto (§5). Card yang berdiri di atas background solid/putih **tidak butuh** blur — pakai card biasa (`--cpn-shadow-card`, lihat §8.8), bukan `backdrop-filter`.
- Maksimal **1 elemen floating glass per section**. Kalau semua card di satu section sama-sama pakai glass, efeknya jadi "template SaaS landing page generik", bukan liquid glass yang purposeful.

### 8.2 Ritme Layout, Bukan Simetri Berulang

- Tidak boleh semua section berurutan pakai pola center-align yang sama seperti hero. Section setelah hero wajib variasi struktur: foto-kiri/teks-kanan, grid tile, grid card (lihat pola komponen §7).
- Kalau 2 section berurutan punya struktur visual yang identik, itu tanda perlu direvisi.

### 8.3 Ikon: Fungsional, Bukan Dekoratif

- Dilarang pakai ikon cliché tanpa makna spesifik: roket (untuk "growth"), bohlam (untuk "ide/inovasi"), sparkle/bintang (untuk "baru/premium"), checkmark bulat generik untuk semua list item.
- Ikon wajib representasi literal dari konten di sebelahnya (ikon sertifikat untuk "Bersertifikasi SNI", bukan ikon generik "quality").
- Satu icon style konsisten di seluruh web (outline atau solid — pilih satu, jangan campur).

### 8.4 Fotografi: Spesifik, Bukan Stok Generik

- Foto harus terasa spesifik ke bisnis riil Ostindo (perkebunan dan lahan, pabrik/laboratorium, kemasan dan aplikasi produk), **bukan** foto generik "tim kantor tersenyum di depan laptop" atau "handshake close-up" yang bisa dipakai brand apapun.
- Uji cepat untuk foto (termasuk hasil AI-generated): kalau logo brand diganti brand lain dan foto itu masih masuk akal dipakai, berarti foto itu terlalu generik — ganti.

### 8.5 Badge & Pill: Dibatasi, Bukan Dekorasi

- Maksimal **1 badge pill per section** (bukan per halaman — per section).
- Isi badge wajib informasi faktual dan bersumber (contoh: "Berdiri Juli 1995"; contoh lama v0.1 "Satu Grup, Empat Unit Usaha" `OUT OF SCOPE`), **bukan** urgency/hype palsu ("New!", "Trending", "Limited"). Kita bukan produk SaaS dengan feature launch, jadi pola badge ala referensi umum ("New — AI Forecasting v2 is live") tidak relevan untuk konteks bisnis ini.

### 8.6 CTA: Spesifik per Konteks

- Dilarang label CTA generik yang diulang tanpa variasi makna ("Get Started", "Learn More", "Click Here" dipakai di banyak tempat tanpa spesifik). Setiap CTA menyebutkan aksi/tujuan yang jelas. CTA lama "Lihat Unit Usaha" dan "Lihat Semua Portofolio" berasal dari konsep holding (`OUT OF SCOPE`); "Hubungi Kami" tetap relevan (juga label tombol di situs resmi Ostindo). Label CTA lain ditetapkan bersama copy homepage Ostindo (`PRD.md` §11).

### 8.7 Klaim & Copy: Grounded, Bukan Template

- Semua angka/klaim di UI harus bisa ditelusuri ke sumber data di `PRD.md` §10 — dilarang menulis angka/klaim baru tanpa sumber, meski "kedengaran masuk akal".
- Dilarang pola kalimat template AI: pertanyaan retoris sebagai headline ("Siap [X] Bersama Kami?"), frasa "kami hadir sebagai mitra untuk kebutuhan [X] Anda", overuse em dash, adjective kosong tanpa fakta pendukung ("terpercaya", "profesional", "terintegrasi" dipakai tanpa bukti yang nempel).
- Uji cepat: baca kalimat itu keras-keras — kalau kedengarannya bisa dipakai brand apapun tanpa diubah, itu template, harus direvisi jadi spesifik ke bisnis ini.

### 8.8 Konsistensi Radius & Shadow

Semua radius **wajib** dari token yang sudah ada (`--cpn-radius-sm/md/lg/xl/full`) — dilarang radius custom ad-hoc yang gak ada di token manapun. Shadow dibatasi 2 varian saja:

```css
--cpn-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);  /* sudah ada, §5.1 — khusus elemen glass */
--cpn-shadow-card: 0 2px 8px rgba(24, 29, 25, 0.08);  /* baru — card biasa non-glass */
```

### 8.9 Placeholder Sebelum Foto Asli Tersedia

Selama foto asli belum di-upload ke Vercel Blob (`STRUCTURE.md` §7.3), komponen **tidak boleh** menampilkan flat solid/linear-gradient box begitu saja sebagai placeholder — itu keliatan "belum jadi", bukan "dalam proses", dan kalau dipakai berulang di banyak section jadi salah satu penanda AI-slop paling gampang dikenali.

- Placeholder sementara wajib pakai pattern/tekstur ringan (dot grid halus, diagonal stripe tipis, atau organic blob shape) dalam warna brand (`--cpn-green-100` / `--cpn-gray-200`) — **bukan** gradient linear polos.
- Treatment placeholder harus beda antar section berbeda tipe konten (produk ≠ riset ≠ berita), supaya begitu foto asli masuk pun strukturnya sudah berbeda — bukan cuma "ganti gambar di box yang sama".
- Alt text dan data yang menyertai placeholder **wajib** sesuai konten section itu sendiri — dilarang keras reuse array/objek data dari section lain (contoh kasus nyata yang harus dihindari: data alamat kantor dari footer muncul di tile Unit Usaha).

### 8.10 Ritme Vertikal Antar Section

- Semua section pakai padding vertikal konsisten lewat **satu token** (`--cpn-space-section`), bukan nilai spacing ad-hoc berbeda-beda per section.
- Transisi warna background antar section dibatasi dan disengaja — jangan gonta-ganti warna di setiap section berturutan (putih → tint → putih → abu → putih → hijau → hijau tua itu terlalu banyak "band" dan bikin halaman berasa terputus-putus, bukan mengalir). Pilih titik transisi yang punya alasan jelas (misal: section "Tentang" dikasih tint karena memang beda beat dari grid section di sekitarnya; CTA dan Footer sengaja solid hijau sebagai penutup yang kuat).
- **Dilarang** pakai SVG wave-shape/blob sebagai dekorasi pemisah antar section untuk menciptakan kesan "flow" — itu sendiri sudah jadi web-template cliché yang gampang dikenali. Kesan mengalir dicapai lewat konsistensi tipografi, spacing, dan penggunaan warna yang disiplin, bukan dekorasi grafis tambahan.

```css
--cpn-space-section: 6rem; /* padding vertikal standar tiap section, desktop */
```

### 8.11 Struktur Khas per Tipe Halaman

Setiap tipe halaman punya struktur sendiri, supaya website tidak terasa seperti satu template yang diulang. Tipe halaman yang sama boleh berbagi struktur (mis. 6 halaman detail produk), tipe berbeda tidak.

| Tipe halaman | Struktur khas | Yang dilarang |
|---|---|---|
| Hero homepage | Centered, foto full-bleed (terkunci, tidak diubah) | Dipakai ulang di halaman dalam |
| Header halaman dalam | Rata kiri, breadcrumb, H1, satu kalimat; background warna tema atau foto dengan scrim, tinggi jauh lebih rendah dari hero | Hero centered, badge pill, logo strip di header |
| Daftar produk (dan landing `/agribisnis` jika dipertahankan — `PRD.md` §6.1) | Indeks editorial bernomor atau baris berlink | Grid kartu foto yang sama dengan homepage |
| ~~Landing Alat Berat~~ — `OUT OF SCOPE` | (arsip v0.1) Dua jalur 50/50 + direktori kategori tipografis | Grid 4 tile |
| ~~Detail layanan (Kontraktor)~~ — `OUT OF SCOPE` | (arsip v0.1) Dua kolom: konten + aside kontak lengket, poin berlabel sebagai definition list bernomor | Bullet berikon centang, kartu glass di atas background putih |
| ~~Daftar unit alat~~ — `OUT OF SCOPE` | (arsip v0.1) Lembar spesifikasi (tabel responsif, tombol tanya harga lewat WhatsApp) | Kartu foto per unit, harga karangan |
| ~~Trading~~ — `OUT OF SCOPE` | (arsip v0.1) Direktori merek wordmark dua kolom | Chip/pill background, logo pihak ketiga tanpa izin, kategori tebakan |
| Detail produk | Lembar produk: fakta kunci, tabel dosis, catatan penyimpanan | Klaim absolut ("tanpa efek samping"), Product schema dengan harga atau rating |
| Riset & Inovasi (dan Sertifikasi jika terpisah) | Narasi riset + daftar kerja sama penelitian berbaris + lini waktu milestone + sertifikat/penghargaan | Tahun kerja sama yang belum terverifikasi tampil sebagai pasti, logo lembaga tanpa izin, klaim hasil riset tanpa sumber |
| Portofolio — `VERIFY` (`PRD.md` §9 poin 2) | Register: satu unggulan + daftar baris terfilter | Masonry foto, hover overlay dekoratif |
| Berita | Artikel utama + arsip berbaris | Grid kartu 3 kolom, excerpt boilerplate sama |
| Kontak | Direktori lokasi Ostindo (office dan factory) + form yang membangun link WhatsApp/email (tanpa backend) | Iframe peta di render awal, koordinat tebakan, form yang seolah mengirim data ke server |
| Tentang | Narasi perusahaan + lini waktu milestone + nilai, misi/visi, dan inovasi perusahaan (sumber `CONTENT-VERBATIM.md` §E1, §G) | Klaim umur perusahaan yang belum terkonfirmasi ("lebih dari 25 tahun" vs "20 tahun"), kartu unit usaha (konsep holding, `OUT OF SCOPE`) |

**Batas per halaman:** maksimal satu baris "3 kartu sama besar"; maksimal satu section ber-tint; maksimal satu eyebrow label kecil; tidak ada dua section berurutan dengan struktur visual identik.

---

## 9. Status & Yang Masih Perlu Dikonfirmasi

- [x] Warna brand utama — `#016625`, nilai dipertahankan (§2). Asal "dari logo": `VERIFY` (logo tampaknya milik Cakra Prima Nusantara)
- [x] Konsep visual — clean, modern, liquid glass
- [x] Tema tunggal hijau (§4), menggantikan strategi tema per unit usaha v0.1
- [x] Prinsip anti-AI-slop visual — §8, berlaku untuk semua halaman
- [x] **Tipografi** — Fraunces (heading, italic accent §6.1) + Inter (body). Konflik dengan kode (Manrope) **selesai** di tahap V1 (keputusan D1, §6)
- [ ] Aset logo Ostindo untuk memverifikasi warna brand (`PRD.md` §9 poin 4)
- [ ] Scope italic accent: hanya headline hero (aturan saat ini, §6.1) atau juga judul section seperti pada gambar referensi (§10)
- [ ] Nasib `/portofolio` dan pola *Portfolio Card* (`PRD.md` §9 poin 2)
- [ ] Copy dan label CTA homepage Ostindo (`PRD.md` §11)
- ~~Kombinasi navy+orange untuk Kontraktor/Alat Berat/Trading~~ — `OUT OF SCOPE`
- ~~Keputusan navbar "Trading"~~ — `OUT OF SCOPE`

---

## 10. Referensi Visual — LawnBuster (adaptasi, bukan salinan)

Referensi: gambar yang dilampirkan pemilik proyek (website `https://www.lawnbuster.ca/`, bisnis lawn care di Kanada). Bagian 10.1 hanya memuat yang **terlihat pada gambar**; website referensinya tidak ditelusuri lebih jauh. Tujuannya mengambil kualitas pendekatan visual, bukan menyalin website, konten, atau layanan LawnBuster.

### 10.1 Yang terlihat pada gambar

- Navbar mengambang berbentuk bar putih membulat di atas hero: logo di kiri, menu ringkas dengan item aktif berbentuk pill, nomor telepon, dan tombol CTA pill gelap.
- Hero fotografis full-bleed dengan overlay gelap, headline besar dengan satu frasa serif italic di ujungnya, subteks pendek, dua CTA (pill dan tautan teks).
- Indikator kepercayaan: badge rating, keterangan jaminan/izin/lama usaha, dan kartu mengambang berisi satu angka, avatar, serta thumbnail video.
- Strip logo klien monokrom.
- Seksi "tentang" editorial: foto kecil membulat di kiri, paragraf besar di kanan, CTA.
- Seksi layanan: judul dengan aksen italic, baris horizontal kartu foto dengan overlay, label kategori, dan tombol pill, plus kontrol panah.
- Seksi proses empat langkah dengan komposisi kartu yang sengaja bervariasi (bukan grid seragam), salah satunya memakai foto lebar dan kartu checklist mengambang.
- Palet hijau, whitespace luas, sudut membulat besar.

### 10.2 Adaptasi ke Ostindo

| Elemen referensi | Adaptasi untuk Ostindo | Batasan |
|---|---|---|
| Navbar mengambang membulat + CTA pill | Diambil bentuknya. Menu mengikuti struktur situs Ostindo (`PRD.md` §6.2) | Mega menu unit usaha `OUT OF SCOPE`. Nomor kontak hanya dari sumber (`CONTENT-VERBATIM.md` §H1) |
| Hero fotografis, headline besar, aksen italic | Sesuai §6.1 dan §8.4 | Copy hero Ostindo belum ada (`PRD.md` §11); jangan meniru copy referensi |
| Indikator kepercayaan | Hanya fakta bersumber: berdiri Juli 1995, jumlah produk, sertifikat dan penghargaan (mis. SNI, Penghargaan Alih Teknologi LIPI 2015), daftar pelanggan korporat, kerja sama riset. Angka diambil dari `content/`, tidak di-hardcode | **Dilarang:** badge rating/ulasan Google atau Facebook, persentase kepuasan, "Licensed & Insured", garansi kepuasan, jumlah "customers" — tidak ada sumber Ostindo. Video: tidak ada di sumber, jangan dibuat |
| Strip logo klien | *Client Logo Strip* wordmark teks (§7) | Logo pihak ketiga tanpa izin dilarang |
| Seksi tentang editorial | Foto kecil + paragraf besar yang memakai teks narasi perusahaan apa adanya (`CONTENT-VERBATIM.md` §E1) | Tidak menulis ulang narasi |
| Seksi layanan | *Product Showcase* (§7), diisi 6 produk Ostindo | Butuh foto produk asli; sampai ada, pakai indeks editorial (§8.9) |
| Seksi proses 4 langkah | Tidak ada padanan di sumber Ostindo, jadi **tidak dibuat** | Dilarang mengarang langkah kerja |
| Kartu checklist penyelesaian | Tidak diadaptasi | Konten khusus bisnis lawn care |

Konten lawn care, landscaping, snow removal, maupun informasi bisnis LawnBuster tidak boleh masuk website Ostindo. Komposisi antarseksi tetap harus bervariasi (§8.2) dan setiap efek glass tetap tunduk pada §8.1.
