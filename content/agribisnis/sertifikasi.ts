export type Sertifikasi = {
  slug: string;
  nama: string;
  /** Kosong kalau badan penerbit tidak disebut eksplisit di sumber — jangan ditebak. */
  penerbit?: string;
  tahun?: number;
  gambar?: string;
  deskripsi?: string;
};

// Sumber: CONTENT-SOURCE.md §7 "Sertifikasi & penghargaan" (ostindo.co.id +
// PDF Company Profile) + §4 (item "Pencapaian" dari halaman Pengalaman Kami,
// dipakai lagi di /portofolio kategori Pencapaian — Fase 6). Nomor dan masa
// berlaku sertifikat: [GAP], tidak ditampilkan.
export const sertifikasiList: Sertifikasi[] = [
  {
    slug: "sni",
    nama: "Sertifikat SNI",
    deskripsi: "Sertifikat Standar Nasional Indonesia untuk produk Agribisnis.",
  },
  {
    slug: "sni-terbaru",
    nama: "Sertifikat SNI Terbaru",
    deskripsi: "Pembaruan sertifikat SNI produk Agribisnis.",
  },
  {
    slug: "alih-teknologi-lipi-2015",
    nama: "Penghargaan Alih Teknologi LIPI",
    penerbit: "LIPI",
    tahun: 2015,
    deskripsi:
      "Penghargaan atas lisensi invensi \"Komposisi Pembenah Tanah dan Penggunaannya untuk Lahan Kritis\".",
  },
  {
    slug: "iso-9001-2008",
    nama: "Sertifikat SNI ISO 9001:2008",
    deskripsi: "Sertifikat sistem manajemen mutu, sumber: PDF Company Profile Ostindo.",
  },
  {
    slug: "iopc-2014",
    nama: "Sertifikat Peserta/Exhibitor International Oil Palm Conference 2014",
    penerbit: "International Oil Palm Conference (IOPC)",
    tahun: 2014,
  },
  {
    slug: "best-fertilizer-2016",
    nama: "OSTINDO Kembali Mendapatkan Penghargaan Best Fertilizer 2016",
    tahun: 2016,
    deskripsi: "Dicatat sebagai pencapaian, bukan proyek konstruksi — lihat /portofolio kategori Pencapaian.",
  },
];
