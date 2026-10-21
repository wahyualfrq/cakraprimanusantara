import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  // Route dinonaktifkan (keputusan D7) — metadata lama tidak ikut diserialisasi.
  notFound();
  return buildMetadata({
    title: "Alat Berat",
    description: "Rental dan penjualan alat berat oleh PT Cakra Prima Nusantara.",
    path: "/alat-berat",
    noindex: true,
  });
}

export default function AlatBeratPage() {
  // Route dinonaktifkan (keputusan D7) — notFound() di page juga, supaya konten
  // tidak ikut diserialisasi ke payload RSC. Kode di bawah dipertahankan.
  notFound();
  return (
    <Section>
      <Container>
        <h1>Alat Berat</h1>
      </Container>
    </Section>
  );
}
