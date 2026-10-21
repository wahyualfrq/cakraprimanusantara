import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { buildMetadata } from "@/lib/seo/metadata";
import { narasiRisetList } from "@/content/agribisnis/riset";
import { milestoneList } from "@/content/agribisnis/milestone";
import { sertifikasiList } from "@/content/agribisnis/sertifikasi";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Riset & Inovasi",
    // INTERIM — belum disetujui (D2). Kalimat pertama CONTENT-VERBATIM.md §E3 (typo "tana" diperbaiki — TYPO-LOG.md).
    description:
      "OSTINDO merupakan suatu produk penyubur tanah hayati dengan formula unggulan yang mengkombinasikan bahan organik berkualitas dengan mikroba terseleksi sehingga berperan dalam meningkatkan kehidupan tanah secara alami melalui proses biologi tanah.",
    path: "/agribisnis/riset-inovasi",
    noindex: true,
  });
}

// Narasi §E3, milestone §E4, sertifikat & penghargaan (judul section sumber:
// "Sertifikat & Penghargaan"). Daftar mitra riset (mitraRisetList) TIDAK
// ditampilkan sampai direkonsiliasi (label kategori tak bersumber, catatan
// provenans, 17 entri vs 23 baris sumber) — keputusan pemilik proyek. Karena
// itu `pengantarDaftarMitra` juga tidak dirender (lihat content/agribisnis/riset.ts).
// Hanya komponen yang sudah ada — tampilan V3.
export default function RisetInovasiPage() {
  return (
    <>
      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Riset & Inovasi", href: "/agribisnis/riset-inovasi" },
        ]}
        title="Riset & Inovasi"
      />

      {narasiRisetList.map((bagian) => (
        <Section key={bagian.judul}>
          <Container>
            <SectionHeading title={bagian.judul} />
            {bagian.paragraf.map((paragraf) => (
              <p key={paragraf}>{paragraf}</p>
            ))}
          </Container>
        </Section>
      ))}

      <Section>
        <Container>
          <SectionHeading title="Milestone" />
          <DefinitionList
            items={milestoneList.map((item) => ({
              label: String(item.tahun),
              description: item.deskripsi,
            }))}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title="Sertifikat & Penghargaan" />
          {/* Nomor & masa berlaku sertifikat tidak ada di sumber — tidak ditampilkan. */}
          <DefinitionList
            items={sertifikasiList.map((item) => ({
              label: item.nama,
              description: item.deskripsi ?? (item.tahun ? String(item.tahun) : undefined),
            }))}
          />
        </Container>
      </Section>
    </>
  );
}
