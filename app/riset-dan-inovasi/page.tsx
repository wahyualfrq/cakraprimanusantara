import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

// Narasi §E3, milestone §E4, sertifikat & penghargaan (judul section sumber:
// "Sertifikat & Penghargaan"; keputusan D9: section di halaman ini, bukan halaman
// terpisah). Daftar mitra riset (mitraRisetList) TIDAK ditampilkan sampai
// direkonsiliasi (label kategori tak bersumber, catatan provenans, 17 entri vs
// 23 baris sumber) — keputusan pemilik proyek. Karena itu `pengantarDaftarMitra`
// juga tidak dirender (lihat content/agribisnis/riset.ts).
export default function RisetInovasiPage() {
  return (
    <>
      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Riset & Inovasi", href: "/riset-dan-inovasi" },
        ]}
        title="Riset & Inovasi"
      />

      {/* 1. Narasi §E3 */}
      <Section>
        <Container>
          <div className={styles.narrative}>
            {narasiRisetList.map((bagian) => (
              <section key={bagian.judul}>
                <SectionHeading title={bagian.judul} />
                <div className={styles.prose}>
                  {bagian.paragraf.map((paragraf) => (
                    <p key={paragraf}>{paragraf}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      {/* 2. Milestone §E4 */}
      <Section className={styles.timelineSection}>
        <Container>
          <SectionHeading title="Milestone" />
          <ol className={styles.timeline}>
            {milestoneList.map((item) => (
              <li key={item.tahun} className={styles.timelineItem}>
                <span className={styles.year}>{item.tahun}</span>
                <p className={styles.timelineDesc}>{item.deskripsi}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 3. Sertifikat & Penghargaan — D9. Nomor & masa berlaku tidak ada di sumber. */}
      <Section>
        <Container>
          <SectionHeading title="Sertifikat & Penghargaan" />
          <ul className={styles.certList}>
            {sertifikasiList.map((item) => {
              const meta = item.deskripsi ?? (item.tahun ? String(item.tahun) : undefined);
              return (
                <li key={item.slug} className={styles.certItem}>
                  <p className={styles.certName}>{item.nama}</p>
                  {meta && <p className={styles.certMeta}>{meta}</p>}
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </>
  );
}
