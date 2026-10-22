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
import { buildMetadata } from "@/lib/seo/metadata";

// Organization JSON-LD sudah dipasang sekali di root layout (app/layout.tsx)
// sesuai STRUCTURE.md §6.2 — tidak diulang di sini supaya tidak duplikat di <head>.

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Beranda",
    // INTERIM — belum disetujui (D2). Kalimat pertama narasi CONTENT-VERBATIM.md §E1.
    description:
      "Secara spesifik PT. Anugerah Mustika Ostindo bergerak dibidang Produksi dan Pemasaran Penyubur Tanah, yang menekankan pada seleksi mikroba-mikroba pembangkit kesuburan tanah untuk selanjutnya diformulasikan kedalam bahan organik alami berkualitas.",
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
