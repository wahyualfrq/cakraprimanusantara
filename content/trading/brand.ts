export type Brand = {
  slug: string;
  nama: string;
  /**
   * Sengaja kosong untuk semua entri — CONTENT-SOURCE.md §6: logo brand pihak
   * ketiga ditampilkan sebagai wordmark teks sampai client mengonfirmasi izin
   * pemakaian logo. Ini bukan data hilang, tapi keputusan desain.
   */
  logo?: string;
  deskripsi?: string;
  website?: string;
};

// Sumber: CONTENT-SOURCE.md §6 (halaman "Distributor & Agen"). Kategori produk
// per brand: [GAP], tidak dikelompokkan berdasarkan tebakan.
export const brandList: Brand[] = [
  { slug: "jotun", nama: "Jotun" },
  { slug: "eneos", nama: "Eneos" },
  { slug: "gforce-batteries", nama: "GForce Batteries" },
  { slug: "massiv-batteries", nama: "Massiv Batteries" },
  { slug: "liugong", nama: "LiuGong" },
  { slug: "heo", nama: "HEO" },
  { slug: "burgari", nama: "Burgari" },
  { slug: "conch", nama: "Conch" },
  { slug: "r-m", nama: "R-M" },
  { slug: "basf", nama: "BASF" },
];
