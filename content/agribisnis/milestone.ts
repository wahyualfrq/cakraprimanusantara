export type Milestone = {
  tahun: number;
  deskripsi: string;
};

// Sumber: CONTENT-VERBATIM.md §E4 (PDF Company Profile hal. 4-5, judul
// MILESTONE), verbatim, satu entri per baris sumber — baris 2010 di sumber
// memang memuat tiga hal sekaligus dan tidak dipecah. Koreksi typo: TYPO-LOG.md.
export const milestoneList: Milestone[] = [
  {
    tahun: 1995,
    deskripsi:
      "Perusahaan didirikan di Jakarta melalui Akte Pendirian No. 361 Tanggal 31 Juli 1995. Sekaligus dimulainya berbagai kajian dan riset produk pada berbagai jenis komoditas pertanian/perkebunan/kehutanan dan lahan tambang secara berkesinambungan.",
  },
  {
    tahun: 2001,
    deskripsi:
      "Produk OSTINDO, Pupuk Organik Hayati, mulai digunakan sebagai input untuk reklamasi lahan purna tambang (nikel).",
  },
  {
    tahun: 2002,
    deskripsi:
      '80% "share market" produk OSTINDO diperoleh dari sub sektor perkebunan kelapa sawit nasional',
  },
  {
    tahun: 2006,
    deskripsi: "Kerjasama dengan LIPI untuk pengkayaan formulasi mikroba spesifik lahan kritis/berpasir",
  },
  { tahun: 2009, deskripsi: "Peluncuran produk Pupuk Organik Cair BLESS" },
  {
    tahun: 2010,
    deskripsi:
      "Pupuk NPK BLESS memperoleh sertifikat SNI Pemasaran dan penggunaan produk OSTINDO telah menjangkau perkebunan kelapa sawit di wilayah Papua, sehingga secara nasional wilayah jangkauan pemasaran telah mencapai seluruh wilayah Indonesia, Peluncuran produk Biofungisida FUTRICHO",
  },
  { tahun: 2013, deskripsi: "Penerapan Lisensi LIPI terhadap produk OSTINDO" },
  {
    tahun: 2015,
    deskripsi:
      "Penghargaan Alih Teknologi (LISENSI) dari LIPI sebagai perusahaan penerima dan pengguna invensi : Komposisi Pembenah Tanah dan Penggunaannya untuk Lahan Kritis (produk OSTINDO)",
  },
];
