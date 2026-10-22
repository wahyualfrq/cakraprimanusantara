import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/metadata";
import { beritaPublishedList } from "@/lib/content/berita";
import { produkList } from "@/content/agribisnis/produk";

// Hanya halaman berisi yang boleh diindeks (Tahap S). URL = canonical masing-masing
// halaman (absoluteUrl, dengan trailing slash) — pola URL situs lama (keputusan D5).
// Tidak masuk: artikel draft (404), stub /agribisnis/* (dialihkan 301), route di
// luar scope (404, GAP-REPORT.md §8), halaman 404.
const staticRoutes = ["/", "/tentang-kami", "/produk", "/riset-dan-inovasi", "/berita", "/hubungi-kami"];

export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified sengaja tidak diisi untuk halaman statis: tanggal build bukan tanggal
  // perubahan isi. Artikel memakai tanggal terbit dari sumber bila ada.
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: absoluteUrl(path),
  }));

  const produkEntries: MetadataRoute.Sitemap = produkList.map((produk) => ({
    url: absoluteUrl(`/produk/${produk.slug}`),
  }));

  const beritaEntries: MetadataRoute.Sitemap = beritaPublishedList.map((entry) => ({
    url: absoluteUrl(`/berita/${entry.meta.slug}`),
    ...(entry.meta.tanggal ? { lastModified: entry.meta.tanggal } : {}),
  }));

  return [...staticEntries, ...produkEntries, ...beritaEntries];
}
