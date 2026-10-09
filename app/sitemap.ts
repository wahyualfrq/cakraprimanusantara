import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
import { layananList } from "@/content/kontraktor/layanan";
import { beritaPublishedList } from "@/lib/content/berita";

// Cuma rute yang sudah punya konten nyata (Fase 1, 2, 6, 7, 8). Rute stub
// (alat-berat, trading, agribisnis, tentang-kami) sengaja belum dimasukkan
// sampai fasenya dibangun — lihat GAP-REPORT.md §7.3 untuk noindex-nya.
const staticRoutes = ["/", "/kontraktor", "/portofolio", "/berita", "/kontak"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const layananEntries: MetadataRoute.Sitemap = layananList.map((layanan) => ({
    url: `${SITE_URL}/kontraktor/${layanan.slug}`,
    lastModified: new Date(),
  }));

  const beritaEntries: MetadataRoute.Sitemap = beritaPublishedList.map((entry) => ({
    url: `${SITE_URL}/berita/${entry.meta.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...layananEntries, ...beritaEntries];
}
