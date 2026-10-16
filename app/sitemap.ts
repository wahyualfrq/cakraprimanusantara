import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
import { layananList } from "@/content/kontraktor/layanan";
import { beritaPublishedList } from "@/lib/content/berita";

// Hanya rute yang sudah memiliki konten nyata dan siap diindeks mesin pencari.
// Rute stub/placeholder (alat-berat, trading, agribisnis) sengaja
// tidak dimasukkan sampai implementasi kontennya selesai (lihat GAP-REPORT.md §7.3 & §7.4).
const staticRoutes = ["/", "/tentang-kami", "/kontraktor", "/portofolio", "/berita", "/kontak"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1.0 : 0.8,
  }));

  const layananEntries: MetadataRoute.Sitemap = layananList.map((layanan) => ({
    url: `${SITE_URL}/kontraktor/${layanan.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const beritaEntries: MetadataRoute.Sitemap = beritaPublishedList.map((entry) => ({
    url: `${SITE_URL}/berita/${entry.meta.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...layananEntries, ...beritaEntries];
}
