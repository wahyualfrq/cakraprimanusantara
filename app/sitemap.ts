import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
import { beritaPublishedList } from "@/lib/content/berita";

// Hanya rute Ostindo yang sudah memiliki konten nyata dan siap diindeks mesin pencari.
// Rute stub (agribisnis/*) menunggu konten dan keputusan URL final (PRD.md §9 poin 1).
// Rute di luar scope (kontraktor, alat-berat, trading, portofolio) dinonaktifkan —
// lihat GAP-REPORT.md §8.
const staticRoutes = ["/", "/tentang-kami", "/berita", "/kontak"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1.0 : 0.8,
  }));

  const beritaEntries: MetadataRoute.Sitemap = beritaPublishedList.map((entry) => ({
    url: `${SITE_URL}/berita/${entry.meta.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...beritaEntries];
}
