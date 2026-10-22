import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ResearchHighlight } from "@/components/sections/ResearchHighlight";
import { ClientLogos } from "@/components/sections/ClientLogos";
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

// Urutan & ritme beranda (V4, DESIGN.md §8.2/§8.10/§10.2): tiap section beda
// struktur dari tetangganya; satu section ber-tint (Tentang); CTA + footer hijau
// sebagai penutup. Semua isi bersumber — tanpa statistik, testimoni, atau rating.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductShowcase />
      <WhyChooseUs />
      <ResearchHighlight />
      <ClientLogos />
      <NewsHighlight />
      <ClosingCta />
    </>
  );
}
