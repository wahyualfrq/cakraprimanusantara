import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
import { proyekList } from "@/content/kontraktor/proyek";
import { produkList } from "@/content/agribisnis/produk";
// TODO: import daftar berita saat content/berita/*.mdx sudah ada helper loader-nya

const staticRoutes = [
  "/",
  "/tentang-kami",
  "/portofolio",
  "/berita",
  "/kontak",
  "/kontraktor",
  "/kontraktor/civil-project",
  "/kontraktor/building-project",
  "/kontraktor/concrete-repair",
  "/kontraktor/mechanical-electrical",
  "/kontraktor/chipping-kelapa-sawit",
  "/alat-berat",
  "/alat-berat/sewa",
  "/alat-berat/penjualan",
  "/trading",
  "/agribisnis",
  "/agribisnis/produk",
  "/agribisnis/riset-inovasi",
  "/agribisnis/sertifikasi",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const proyekEntries: MetadataRoute.Sitemap = proyekList.map((proyek) => ({
    url: `${SITE_URL}/portofolio/${proyek.slug}`,
    lastModified: new Date(),
  }));

  const produkEntries: MetadataRoute.Sitemap = produkList.map((produk) => ({
    url: `${SITE_URL}/agribisnis/produk/${produk.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...proyekEntries, ...produkEntries];
}
