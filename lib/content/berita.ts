import type { ComponentType } from "react";
import type { BeritaMeta } from "@/types/berita";

import * as kerjasamaBrin from "@/content/berita/kerjasama-brin-teknologi-pestisida.mdx";
import * as kerjasamaLipi from "@/content/berita/kerjasama-dengan-lipi.mdx";
import * as teknologiBaru from "@/content/berita/teknologi-baru-ostindo.mdx";
import * as caraPenggunaanPupuk from "@/content/berita/cara-penggunaan-pupuk-organik.mdx";
import * as prosesPupukNpkBless from "@/content/berita/proses-pupuk-npk-bless.mdx";
import * as penghargaanBestFertilizer from "@/content/berita/penghargaan-best-fertilizer-2016.mdx";
import * as produkBlessCair from "@/content/berita/produk-baru-pupuk-bless-cair.mdx";

export type BeritaEntry = {
  meta: BeritaMeta;
  Content: ComponentType;
};

const modules = [
  kerjasamaBrin,
  kerjasamaLipi,
  teknologiBaru,
  caraPenggunaanPupuk,
  prosesPupukNpkBless,
  penghargaanBestFertilizer,
  produkBlessCair,
];

/**
 * Semua artikel, termasuk draft (judul draft tetap boleh muncul di section
 * Berita homepage — lihat GAP-REPORT.md). Diurutkan terbaru dulu; artikel
 * tanpa tanggal terverifikasi ditaruh di akhir.
 */
export const beritaList: BeritaEntry[] = modules
  .map((mod) => ({ meta: mod.meta, Content: mod.default }))
  .sort((a, b) => (b.meta.tanggal ?? "").localeCompare(a.meta.tanggal ?? ""));

/** Hanya artikel non-draft — dipakai untuk sitemap (Fase 10). */
export const beritaPublishedList: BeritaEntry[] = beritaList.filter((entry) => !entry.meta.draft);

/** Draft tetap bisa diambil by slug supaya page.tsx bisa memanggil notFound() secara eksplisit. */
export function getBeritaBySlug(slug: string): BeritaEntry | undefined {
  return beritaList.find((entry) => entry.meta.slug === slug);
}

/**
 * Urutan persis www.ostindo.co.id/berita (halaman 1 lalu halaman 2) —
 * dipakai di /berita, BUKAN `beritaList` yang diurut tanggal (tanggal
 * terbaru BRIN 2023 akan mendahului artikel 2016 kalau pakai itu).
 */
export const beritaSourceOrder = [
  "kerjasama-brin-teknologi-pestisida",
  "kerjasama-dengan-lipi",
  "teknologi-baru-ostindo",
  "cara-penggunaan-pupuk-organik",
  "proses-pupuk-npk-bless",
  "penghargaan-best-fertilizer-2016",
  "produk-baru-pupuk-bless-cair",
] as const;

export function getBeritaInSourceOrder(): BeritaEntry[] {
  return beritaSourceOrder.map((slug) => {
    const entry = getBeritaBySlug(slug);
    if (!entry) throw new Error(`Artikel berita tidak ditemukan: ${slug}`);
    return entry;
  });
}
