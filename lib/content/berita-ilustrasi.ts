import type { Ilustrasi } from "@/content/ilustrasi";

/**
 * Pemetaan foto otentik per artikel terbit dari folder public/berita/ —
 * satu sumber kebenaran untuk daftar Berita, Beranda, dan detail artikel.
 * Menggantikan ilustrasi placeholder sementara (D4) dengan foto kegiatan/dokumen riil.
 */
export const ilustrasiBerita: Record<string, Ilustrasi> = {
  "kerjasama-brin-teknologi-pestisida": {
    src: "/berita/Picture2.jpeg",
    alt: "Penandatanganan kerja sama Pusat Riset Mikrobiologi Terapan BRIN dengan PT Anugerah Mustika Ostindo di Cibinong, 27 April 2023",
  },
  "kerjasama-dengan-lipi": {
    src: "/berita/1kerjasama-lipi-2.webp",
    alt: "Poster penelitian \"Bakteri Streptomyces dan Bacillus Vulkanis untuk Aggregasi Tanah Berpasir di Lahan Kritis\", kerja sama Pusat Penelitian Biologi LIPI dan PT Anugerah Mustika Ostindo",
  },
  "teknologi-baru-ostindo": {
    src: "/berita/news3.webp",
    alt: "Mesin konveyor dan pengayak bahan dengan pekerja dan karung pupuk di dalam gudang",
  },
  "proses-pupuk-npk-bless": {
    src: "/berita/news5.webp",
    alt: "Pekerja mengolah tumpukan bahan dengan cangkul dan traktor tangan di bawah atap gudang",
  },
};
