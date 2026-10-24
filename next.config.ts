import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Redirect 301 (Tahap S, keputusan D5: URL = pola situs lama www.ostindo.co.id dengan
// trailing slash). URL halaman situs lama (/tentang-kami/, /produk/,
// /riset-dan-inovasi/, /berita/, /hubungi-kami/) disajikan langsung (200) — tidak
// perlu redirect. statusCode 301 eksplisit; `permanent: true` di Next.js = 308.
const redirect301 = (source: string, destination: string) => ({ source, destination, statusCode: 301 as const });

const redirectList = [
  // Artikel situs lama (WordPress, permalink di root) → /berita/<slug>/. Hanya artikel
  // yang terbit di situs baru. Lima artikel lain (/teknologi-baru-ostindo/,
  // /cara-penggunaan-pupuk/, /proses-pupuk/, /penghargaan-ostindo/, /pupuk-bless-baru/)
  // masih draft di sini — belum dialihkan, menunggu keputusan (laporan Tahap S).
  redirect301("/kerjasama-dengan-lipi", "/berita/kerjasama-dengan-lipi/"),
  redirect301(
    "/pt-anugerah-mustika-ostindo-berkolaborasi-dengan-badan-riset-dan-inovasi-riset-brin-dalam-penerapan-formulasi-teknologi-pestisida-ramah-lingkungan-berbasis-bakteri-dan-kapang",
    "/berita/kerjasama-brin-teknologi-pestisida/",
  ),
  // Paginasi arsip lama — arsip baru satu halaman.
  redirect301("/berita/page/:page", "/berita/"),

  // Path kode sebelum Tahap S (hanya pernah ada di preview) → URL final.
  redirect301("/kontak", "/hubungi-kami/"),
  redirect301("/agribisnis", "/produk/"),
  redirect301("/agribisnis/produk", "/produk/"),
  redirect301("/agribisnis/produk/:slug", "/produk/:slug/"),
  redirect301("/agribisnis/riset-inovasi", "/riset-dan-inovasi/"),
  // Sertifikat & penghargaan = section di Riset & Inovasi (keputusan D9).
  redirect301("/agribisnis/sertifikasi", "/riset-dan-inovasi/"),
];

const nextConfig: NextConfig = {
  // Sama dengan situs lama (/produk/) — URL yang sudah terindeks tetap persis sama.
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: { exclude: ["error", "warn"] },
  },
  async redirects() {
    return redirectList;
  },
  // Aset statis di public/ tidak di-hash namanya, jadi cache dibuat sedang (1 hari +
  // stale-while-revalidate) — aman kalau file diganti dengan nama yang sama.
  async headers() {
    const assetCache = [
      { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
    ];
    return ["/images", "/produk", "/riset", "/berita"].map((dir) => ({
      source: `${dir}/:file*.(png|jpg|jpeg|webp|avif|svg|pdf)`,
      headers: assetCache,
    }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Kurasi manual sesuai STRUCTURE.md §7.2 — jangan pakai default ladder
    // Next.js (bisa generate belasan variant/gambar dan membengkakkan biaya
    // image transformation di Vercel).
    deviceSizes: [400, 600, 900, 1200, 1920],
    imageSizes: [64, 128, 256],
    remotePatterns: [
      // Sumber foto konten final akan di Vercel Blob Storage (STRUCTURE.md §7.1).
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // Poster LiteYouTube (components/ui/LiteYouTube.tsx) — thumbnail resmi YouTube.
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
