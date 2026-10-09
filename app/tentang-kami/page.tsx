import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Tentang Kami",
    description: "Profil grup, sejarah, serta visi dan misi PT Cakra Prima Nusantara.",
    path: "/tentang-kami",
  });
}

export default function TentangKamiPage() {
  return (
    <Section>
      <Container>
        <h1>Tentang Kami</h1>
        {/* TODO: narasi grup menggabungkan histori Ostindo (1995) & Cakra (1999) — PRD.md §11 */}
      </Container>
    </Section>
  );
}
