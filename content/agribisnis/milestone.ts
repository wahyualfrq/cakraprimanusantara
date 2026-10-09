export type Milestone = {
  tahun: number;
  deskripsi: string;
};

// Sumber: CONTENT-SOURCE.md §7 (PDF Company Profile Ostindo). Khusus unit
// Agribisnis — milestone grup/Cakra ditangani terpisah di halaman Tentang Kami
// (Fase 9), bukan di sini.
export const milestoneList: Milestone[] = [
  { tahun: 1995, deskripsi: "Perusahaan didirikan di Jakarta." },
  { tahun: 2001, deskripsi: "OSTINDO mulai dipakai untuk reklamasi lahan purna tambang (nikel)." },
  {
    tahun: 2002,
    deskripsi: "80% pangsa pasar OSTINDO berasal dari sub sektor perkebunan kelapa sawit nasional.",
  },
  {
    tahun: 2006,
    deskripsi:
      "Kerja sama dengan LIPI untuk pengkayaan formulasi mikroba spesifik lahan kritis/berpasir.",
  },
  { tahun: 2009, deskripsi: "Peluncuran Pupuk Organik Cair BLESS." },
  {
    tahun: 2010,
    deskripsi: "NPK BLESS memperoleh sertifikat SNI; pemasaran menjangkau seluruh Indonesia termasuk Papua.",
  },
  { tahun: 2010, deskripsi: "Peluncuran biofungisida FUTRICHO." },
  { tahun: 2013, deskripsi: "Penerapan lisensi LIPI pada produk OSTINDO." },
  {
    tahun: 2015,
    deskripsi:
      "Penghargaan Alih Teknologi (lisensi) dari LIPI untuk invensi \"Komposisi Pembenah Tanah dan Penggunaannya untuk Lahan Kritis\".",
  },
];
