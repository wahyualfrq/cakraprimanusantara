import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { MilestoneBento } from "@/components/sections/MilestoneBento";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ResearchHighlight } from "@/components/sections/ResearchHighlight";
import { NewsHighlight } from "@/components/sections/NewsHighlight";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { SITE_NAME, buildMetadata } from "@/lib/seo/metadata";

// Organization JSON-LD sudah dipasang sekali di root layout (app/layout.tsx)
// sesuai STRUCTURE.md §6.2 — tidak diulang di sini supaya tidak duplikat di <head>.

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    // Nama perusahaan + bidang usaha (frasa §E1: "Pupuk Organik Hayati", "Penyubur Tanah")
    // menggantikan "Beranda", yang tidak membawa kata kunci apa pun.
    title: `${SITE_NAME} | Pupuk Organik Hayati & Penyubur Tanah`,
    // INTERIM — belum disetujui (D2). Gabungan frasa narasi §E1 (bidang usaha + daftar jenis
    // produk) dan fakta berdiri Juli 1995; ≤ 160 karakter supaya tidak terpotong di hasil
    // pencarian (kalimat pertama §E1 = 247 karakter).
    description:
      "Produksi dan pemasaran penyubur tanah sejak 1995: pupuk organik hayati Ostindo, pupuk organik cair, pupuk hayati, biofungisida Futricho, dan pupuk NPK.",
    path: "/",
  });
}

// Urutan Beranda (DESIGN.md v0.4 §13.1): hero berbingkai → strip pelanggan → intro
// split → karusel produk → bento milestone (satu-satunya band) → nilai → riset
// split-rail → berita → band CTA. Tidak ada dua section berurutan dengan pola sama;
// semua isi bersumber — tanpa statistik, testimoni, atau rating.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientLogos />
      <AboutSection />
      <ProductShowcase />
      <MilestoneBento />
      <WhyChooseUs />
      <ResearchHighlight />
      <NewsHighlight />
      <ClosingCta />
    </>
  );
}
