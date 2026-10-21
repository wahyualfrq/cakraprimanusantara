import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { NewsHighlight } from "@/components/sections/NewsHighlight";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { buildMetadata } from "@/lib/seo/metadata";

// Organization JSON-LD sudah dipasang sekali di root layout (app/layout.tsx)
// sesuai STRUCTURE.md §6.2 — tidak diulang di sini supaya tidak duplikat di <head>.
//
// UnitSelector dan PortfolioHighlight (konsep unit usaha holding & proyek di luar
// scope Ostindo) dilepas dari render di K4 — file komponennya dipertahankan.

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Beranda",
    // INTERIM — belum disetujui (D2). Kalimat pertama narasi CONTENT-VERBATIM.md §E1.
    description:
      "Secara spesifik PT. Anugerah Mustika Ostindo bergerak dibidang Produksi dan Pemasaran Penyubur Tanah, yang menekankan pada seleksi mikroba-mikroba pembangkit kesuburan tanah untuk selanjutnya diformulasikan kedalam bahan organik alami berkualitas.",
    path: "/",
  });
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WhyChooseUs />
      <ClientLogos />
      <NewsHighlight />
      <ClosingCta />
    </>
  );
}
