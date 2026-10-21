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
// PDF Company Profile) + CONTENT-VERBATIM.md §B (item "Pencapaian" Best
// Fertilizer 2016). Nomor dan masa berlaku sertifikat: [GAP], tidak
// ditampilkan. `deskripsi` hanya diisi kalimat sumber — dikosongkan kalau tidak ada.
export const sertifikasiList: Sertifikasi[] = [
  {
    slug: "sni",
    nama: "Sertifikat SNI",
  },
  {
    slug: "sni-terbaru",
    nama: "Sertifikat SNI Terbaru",
  },
  {
    slug: "iopc-2014",
    nama: "Sertifikat Peserta/Exhibitor International Oil Palm Conference 2014",
    // penerbit: "International Oil Palm Conference (IOPC)",
    tahun: 2014,
  },
  {
    slug: "alih-teknologi-lipi-2015",
    nama: "Penghargaan Alih Teknologi LIPI",
    // penerbit: "LIPI",
    tahun: 2015,
    // Milestone 2015, verbatim (CONTENT-VERBATIM.md §E4).
    deskripsi:
      "Penghargaan Alih Teknologi (LISENSI) dari LIPI sebagai perusahaan penerima dan pengguna invensi : Komposisi Pembenah Tanah dan Penggunaannya untuk Lahan Kritis (produk OSTINDO)",
  },
  {
    slug: "iso-9001-2008",
    nama: "Sertifikat SNI ISO 9001:2008",
  },
  {
    slug: "best-fertilizer-2016",
    nama: "OSTINDO Kembali Mendapatkan Penghargaan Best Fertilizer 2016",
    tahun: 2016,
  },
];
