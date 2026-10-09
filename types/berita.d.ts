export type UnitUsaha = "kontraktor" | "alat-berat" | "trading" | "agribisnis";

export type BeritaMeta = {
  judul: string;
  slug: string;
  /** ISO date (YYYY-MM-DD). Kosong kalau tanggal publikasi tidak terverifikasi. */
  tanggal?: string;
  unit: UnitUsaha;
  /** Wajib ditulis dari isi artikel sendiri — lihat CONTENT-SOURCE.md §8. Kosong kalau draft. */
  excerpt: string;
  /**
   * Keterangan foto dari sumber (kalau ada) — dipakai sebagai alt pada
   * ContentImage placeholder di halaman detail. Bukan foto asli (masih
   * placeholder pattern); kosongkan kalau sumber tidak punya foto.
   */
  fotoAlt?: string;
  /** true = isi lengkap belum tersedia dari sumber. Tidak masuk sitemap, detail page notFound(). */
  draft: boolean;
};
