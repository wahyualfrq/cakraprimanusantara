import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { UnitSelector } from "@/components/sections/UnitSelector";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PortfolioHighlight } from "@/components/sections/PortfolioHighlight";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { NewsHighlight } from "@/components/sections/NewsHighlight";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { buildMetadata } from "@/lib/seo/metadata";

// Organization JSON-LD untuk PT Cakra Prima Nusantara sudah dipasang sekali
// di root layout (app/layout.tsx) sesuai STRUCTURE.md §6.2 — tidak diulang
// di sini supaya tidak duplikat di <head>.

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Beranda",
    description:
      "PT Cakra Prima Nusantara — holding korporat yang menaungi unit usaha Kontraktor, Alat Berat, Trading, dan Agribisnis.",
    path: "/",
  });
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <UnitSelector />
      <AboutSection />
      <WhyChooseUs />
      <PortfolioHighlight />
      <ClientLogos />
      <NewsHighlight />
      <ClosingCta />
    </>
  );
}
