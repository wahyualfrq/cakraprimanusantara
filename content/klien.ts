export type Klien = {
  nama: string;
  /** Kosong — belum ada logo klien (foto) ter-upload ke Vercel Blob. */
  logo?: string;
  unitUsaha: "kontraktor" | "alat-berat" | "trading" | "agribisnis";
};

// Klien unit Kontraktor & Alat Berat, diekstrak dari judul proyek di
// content/kontraktor/proyek.ts (CONTENT-SOURCE.md §4) — satu-satunya sumber
// klien unit itu. Trading: belum ada daftar klien di sumber.
//
// Klien Agribisnis TIDAK diduplikasi di sini — daftar lengkapnya (31 entri,
// PDF "Daftar Konsumen/Pelanggan") sudah jadi satu sumber kebenaran di
// content/agribisnis/pelanggan.ts (STRUCTURE.md §1 poin 2).
export const klienList: Klien[] = [
  { nama: "KUD Permata Bunda", unitUsaha: "kontraktor" },
  { nama: "PT. Sampoerna", unitUsaha: "kontraktor" },
  { nama: "PT Tania Selatan", unitUsaha: "kontraktor" },
  { nama: "PT. BCP", unitUsaha: "kontraktor" },
  { nama: "PT. Sinar Alam Permai", unitUsaha: "kontraktor" },
  { nama: "PLN", unitUsaha: "kontraktor" },
  { nama: "PT. Sumatera Prima Fiberboard", unitUsaha: "alat-berat" },
  { nama: "PT. Bukit Asam", unitUsaha: "kontraktor" },
  { nama: "PT. PP Persero", unitUsaha: "kontraktor" },
];
