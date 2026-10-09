export type BarisDosis = {
  fase: string;
  dosis: string;
  frekuensi?: string;
  metode?: string;
};

export type FaktaKunci = {
  label: string;
  nilai: string;
  /** true kalau angka/istilahnya [VERIFIKASI] ke client (CONTENT-SOURCE.md §7). */
  perluVerifikasi?: boolean;
};

export type Produk = {
  slug: string;
  nama: string;
  kategori: "penyubur-tanah" | "bio-pestisida" | "pupuk-npk" | "pupuk-cair" | "mikoriza" | "bio-activator";
  deskripsiSingkat: string;
  deskripsiLengkap: string;
  gambar?: string;
  faktaKunci?: FaktaKunci[];
  dosisAnjuran?: BarisDosis[];
  /** Dosis ada di sumber tapi satuannya belum terverifikasi — tampilkan catatan ini, jangan render tabel. */
  catatanDosis?: string;
  catatanPenyimpanan?: string;
  sertifikasi?: string[];
};

// Sumber: CONTENT-SOURCE.md §7 (ostindo.co.id + PDF Company Profile). Klaim
// "tanpa efek samping" (Bless Cair, PDF) sengaja tidak dipakai — dilarang
// B.7/DESIGN.md §8.11.
export const produkList: Produk[] = [
  {
    slug: "ostindo",
    nama: "Ostindo",
    kategori: "penyubur-tanah",
    deskripsiSingkat:
      "Bahan organik dan mikroba penyubur tanah selektif untuk mengembalikan dan menjaga kesuburan tanah.",
    deskripsiLengkap:
      "Formulasi bahan organik dengan mikroba penyubur tanah selektif (Azotobacter, Azospirillum, Aspergillus, Bacillus, Pseudomonas, Rhizobium, Mycorrhiza, Trichoderma, Streptomyces, dan lainnya) — 7 jenis mikroba esensial dan 2 jenis fungi, dapat dikustomisasi sesuai keadaan tanah, dengan indukan mikroba yang terus diperbaharui. Memberi bahan organik dan asam organik, mengembalikan dan menjaga kesuburan tanah, serta memperbaiki pH dan aerasi.",
    faktaKunci: [
      { label: "Kemasan", nilai: "Netto 40 kg" },
      { label: "C/N ratio", nilai: "15-25" },
      { label: "pH", nilai: "6,5-7,5" },
    ],
    dosisAnjuran: [
      {
        fase: "Pembibitan, pre-nursery",
        dosis: "3-5 gram",
        frekuensi: "1 kali",
        metode: "Campur dengan media atau tabur di media dalam polybag",
      },
      {
        fase: "Pembibitan, main nursery",
        dosis: "50-100 gram",
        frekuensi: "1 kali",
        metode: "Tugal atau tabur di media dalam polybag",
      },
      {
        fase: "TBM 1",
        dosis: "200-300 gram/pohon",
        frekuensi: "2 kali setahun",
        metode: "Tabur di bawah tajuk",
      },
      {
        fase: "TBM 2",
        dosis: "300-400 gram/pohon",
        frekuensi: "2 kali setahun",
        metode: "Tabur di bawah tajuk",
      },
      {
        fase: "TBM 3",
        dosis: "400-500 gram/pohon",
        frekuensi: "2 kali setahun",
        metode: "Tabur di bawah tajuk",
      },
      {
        fase: "TM (menghasilkan)",
        dosis: "500-1000 gram/pohon",
        frekuensi: "2 kali setahun",
        metode: "Tabur di bawah tajuk",
      },
    ],
  },
  {
    slug: "futricho",
    nama: "Futricho",
    kategori: "bio-pestisida",
    deskripsiSingkat:
      "Biofungisida kombinasi Trichoderma koningii dan Trichoderma harzianum untuk perlakuan preventif.",
    deskripsiLengkap:
      "Kombinasi Trichoderma koningii (terkait busuk pangkal batang sawit oleh Ganoderma boninense) dan Trichoderma harzianum (Botrytis, Sclerotium, Fusarium). Diproduksi di ruang isolasi dengan pendampingan tenaga ahli LIPI. Dipakai untuk perlakuan preventif.",
    faktaKunci: [
      { label: "Kemasan", nilai: "25 kg" },
      { label: "Kandungan spora", nilai: "10^6 per gram", perluVerifikasi: true },
    ],
    dosisAnjuran: [
      {
        fase: "Kelapa sawit — Pembibitan",
        dosis: "10 gr/polybag",
        metode: "Tabur di permukaan tanah",
      },
      {
        fase: "Kelapa sawit — TBM",
        dosis: "400 gr/lubang tanam",
        metode: "Tabur di lubang tanam",
      },
      {
        fase: "Kelapa sawit — TBM (lanjutan)",
        dosis: "200 gr/tanaman/tahun selama 3 tahun",
        metode: "Tabur di pinggiran",
      },
      {
        fase: "Karet — Pembibitan, TBM",
        dosis: "10 gr/polybag; 400 gr/lubang; 200 gr/tanaman/tahun selama 3 tahun",
        metode: "Sama dengan kelapa sawit",
      },
      {
        fase: "Hortikultura",
        dosis: "25-50 kg/Ha",
        metode: "Tabur di permukaan tanah atau lubang tanam",
      },
    ],
    catatanPenyimpanan:
      "Simpan di tempat kering, hindari sinar matahari langsung dan percikan air hujan; tahan hingga satu tahun setelah produksi.",
  },
  {
    slug: "bless-npk",
    nama: "Bless NPK",
    kategori: "pupuk-npk",
    deskripsiSingkat: "Pupuk NPK blending yang disesuaikan pesanan, bersertifikat SNI sejak 2010.",
    deskripsiLengkap:
      "Disesuaikan pesanan. Varian: NPK 12.6.22.3+TE, NPK 12.12.17.2+TE, NPK 15.15.6.4, NPK 16.16.16.",
    faktaKunci: [
      { label: "Kemasan", nilai: "50 kg" },
      { label: "Varian", nilai: "4 formula (12.6.22.3+TE, 12.12.17.2+TE, 15.15.6.4, 16.16.16)" },
    ],
    sertifikasi: ["Sertifikat SNI (diperoleh 2010)"],
  },
  {
    slug: "bless-cair",
    nama: "Bless Cair",
    kategori: "pupuk-cair",
    deskripsiSingkat:
      "Pupuk organik cair 100% organik hayati dengan hara makro, mikro, dan mikroba penambat hara.",
    deskripsiLengkap:
      "100% organik hayati; hara makro (C, N, P, K) dan mikro (Cu, Co, Fe, Mn, Mo, Zn), zat pengatur tumbuh, serta mikroba (Azospirillum, Azotobacter, Pseudomonas, Bacillus, bakteri penambat fosfat). Manfaat: meningkatkan produktivitas, memperbaiki sifat fisik, kimia, dan biologi tanah, serta meningkatkan penetrasi tanah.",
    catatanDosis:
      "Dosis tersedia pada brosur — satuan di sumber ('Dosis 9ml/lt/air') masih ambigu, perlu verifikasi client sebelum dipublikasikan sebagai tabel.",
  },
  {
    slug: "rizafert",
    nama: "Rizafert",
    kategori: "mikoriza",
    deskripsiSingkat:
      "Pupuk hayati mikoriza arbuskular terseleksi untuk meningkatkan serapan hara dan ketahanan akar.",
    deskripsiLengkap:
      "Mikoriza arbuskular terseleksi, bersimbiosis dengan akar. Meningkatkan serapan hara (P, Ca, N, Cu, Mn, K, Mg) dan ketahanan terhadap penyakit akar dan stres.",
    faktaKunci: [{ label: "Kandungan", nilai: "Hingga 60 spora per gram" }],
  },
  {
    slug: "actifert",
    nama: "Actifert",
    kategori: "bio-activator",
    deskripsiSingkat: "Bio activator dengan mikroba terseleksi untuk mempercepat dekomposisi bahan organik.",
    deskripsiLengkap:
      "Mengandung unsur hara makro/mikro seimbang dan mikroba terseleksi, mempercepat dekomposisi dengan meningkatkan perpindahan oksigen terlarut, campuran proporsional sesuai kebutuhan biologis tanaman.",
    faktaKunci: [{ label: "Kemasan", nilai: "25 kg", perluVerifikasi: true }],
  },
];
