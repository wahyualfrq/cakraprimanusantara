import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  images: {
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
