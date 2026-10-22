import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/ui/Timeline";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { narasiRisetList } from "@/content/agribisnis/riset";
import { milestoneList } from "@/content/agribisnis/milestone";
import { sertifikasiList } from "@/content/agribisnis/sertifikasi";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Riset & Inovasi",
    // INTERIM — belum disetujui (D2). Kalimat pertama CONTENT-VERBATIM.md §E3 (typo "tana" diperbaiki — TYPO-LOG.md).
    description:
      "OSTINDO merupakan suatu produk penyubur tanah hayati dengan formula unggulan yang mengkombinasikan bahan organik berkualitas dengan mikroba terseleksi sehingga berperan dalam meningkatkan kehidupan tanah secara alami melalui proses biologi tanah.",
    path: "/riset-dan-inovasi",
  });
}

// Struktur DESIGN.md v0.4 §13.5: narasi §E3 (split-rail per bagian) → milestone §E4
// (band) → Sertifikat & Penghargaan (S0 dua kolom; keputusan D9). Daftar mitra riset
// (mitraRisetList) TIDAK ditampilkan sampai direkonsiliasi (label kategori tak
// bersumber, catatan provenans, 17 entri vs 23 baris sumber) — keputusan pemilik
// proyek. Karena itu `pengantarDaftarMitra` juga tidak dirender.
export default function RisetInovasiPage() {
  return (
    <>
      <PageHeader
        variant="photo"
        photoSrc="/images/gambar-9.png"
        photoPosition="center 35%"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Riset & Inovasi", href: "/riset-dan-inovasi" },
        ]}
        title="Riset & Inovasi"
        description="Pengembangan formulasi bioteknologi ramah lingkungan dan kerja sama penelitian terpadu."
      />

      {/* 1. Narasi §E3 — tiap bagian: rail judul | paragraf */}
      <Section aria-label="Narasi riset">
        <Container className={styles.narrative}>
          {narasiRisetList.map((bagian, index) => {
            const id = `narasi-${index + 1}`;
            return (
              <Reveal as="section" key={bagian.judul} aria-labelledby={id} className={styles.part}>
                <div className={styles.rail}>
                  <span className={styles.partNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 id={id} className={styles.partTitle}>
                    {bagian.judul}
                  </h2>
                </div>
                <div className={styles.prose}>
                  {bagian.paragraf.map((paragraf, i) => (
                    <p key={paragraf} className={i === 0 ? styles.lead : undefined}>
                      {paragraf}
                    </p>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </Container>
      </Section>

      {/* 2. Milestone §E4 — satu-satunya band halaman */}
      <Section tone="muted" aria-labelledby="milestone-judul">
        <Container className={styles.railGrid}>
          <div className={styles.stickyRail}>
            <SectionHeading title="Milestone" id="milestone-judul" />
          </div>
          <Timeline items={milestoneList} />
        </Container>
      </Section>

      {/* 3. Sertifikat & Penghargaan — D9. Nomor & masa berlaku tidak ada di sumber. */}
      <Section aria-labelledby="sertifikat-judul">
        <Container>
          <SectionHeading title="Sertifikat & Penghargaan" id="sertifikat-judul" />
          <Reveal as="ul" stagger className={styles.certList}>
            {sertifikasiList.map((item) => (
              <li key={item.slug} className={styles.certItem}>
                <span className={styles.certYear}>{item.tahun ?? ""}</span>
                <span className={styles.certBody}>
                  <span className={styles.certName}>{item.nama}</span>
                  {item.deskripsi && <span className={styles.certMeta}>{item.deskripsi}</span>}
                </span>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
