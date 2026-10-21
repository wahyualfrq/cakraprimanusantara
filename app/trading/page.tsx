import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  // Route dinonaktifkan (keputusan D7) — metadata lama tidak ikut diserialisasi.
  notFound();
  return buildMetadata({
    title: "Trading",
    description:
      "Distribusi material, cat, oli, dan baterai industrial oleh PT Cakra Prima Nusantara.",
    path: "/trading",
    noindex: true,
  });
}

export default function TradingPage() {
  // Route dinonaktifkan (keputusan D7) — notFound() di page juga, supaya konten
  // tidak ikut diserialisasi ke payload RSC. Kode di bawah dipertahankan.
  notFound();
  return (
    <Section>
      <Container>
        <h1>Trading</h1>
        {/* TODO: deskripsi unit Trading belum ada copy di sumber lama — PRD.md §11 */}
      </Container>
    </Section>
  );
}
