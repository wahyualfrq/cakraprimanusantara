import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { buildMetadata } from "@/lib/seo/metadata";
import { profil } from "@/content/profil";
import { milestoneList } from "@/content/agribisnis/milestone";
import { ilustrasi } from "@/content/ilustrasi";
import styles from "./page.module.css";

// Isi bersumber dari content/profil.ts (CONTENT-VERBATIM.md §E1, §G2, §G3,
// §G5, §G6) dan milestoneList (§E4). content/tentang-kami.ts (profil holding)
// dan StatsSection (angka tanpa sumber) dilepas dari render — file dipertahankan.
// Sekapur Sirih (§G7) opsional, belum ditampilkan sampai disetujui.

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Tentang Kami",
    // INTERIM — belum disetujui (D2). Kalimat pertama sejarah & profil, CONTENT-VERBATIM.md §E1 (PDF hal. 3).
    description:
      "PT. Anugerah Mustika Ostindo merupakan perusahaan swasta nasional yang didirikan pada Juli 1995 dengan tujuan awal untuk mengembangkan produk pupuk berbasis bioteknologi yang ramah lingkungan.",
    path: "/tentang-kami",
  });
}

export default function TentangKamiPage() {
  return (
    <>
      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Tentang Kami", href: "/tentang-kami" },
        ]}
        title="Tentang Kami"
      />

      {/* 1. Profil perusahaan — §E1 */}
      <Section className={styles.overviewSection}>
        <Container>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewMedia}>
              {/* Ilustrasi sementara (D4) — bukan dokumentasi kegiatan. */}
              <Image
                src={ilustrasi.rumahKaca.src}
                alt={ilustrasi.rumahKaca.alt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.overviewImage}
              />
            </div>

            <div className={styles.overviewCopy}>
              <SectionHeading title={profil.nama} />
              <DefinitionList
                items={[
                  { label: "Berdiri", description: profil.berdiri.teks },
                  { label: "Kantor", description: profil.kedudukan.kantor },
                  { label: "Pabrik", description: profil.kedudukan.pabrik },
                ]}
              />
              {profil.narasi.map((paragraf) => (
                <p key={paragraf} className={styles.overviewText}>
                  {paragraf}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Nilai — §G3 (label sesuai catatan sumber) */}
      <Section className={styles.pillarsSection}>
        <Container>
          <SectionHeading title={`Nilai ${profil.nama}`} />

          <div className={styles.pillarsGrid}>
            {profil.nilai.map((nilai) => (
              <div key={nilai.label} className={styles.pillarCard}>
                <div className={styles.pillarHeader}>
                  <h3 className={styles.pillarTitle}>{nilai.label}</h3>
                </div>
                <p className={styles.pillarDesc}>{nilai.deskripsi}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Milestone — §E4 */}
      <Section className={styles.timelineSection}>
        <Container>
          <SectionHeading title="Milestone" />
          <div className={styles.timelineList}>
            {milestoneList.map((item) => (
              <div key={item.tahun} className={styles.timelineItem}>
                <div className={styles.timelineHeader}>
                  <span className={styles.timelineYear}>{item.tahun}</span>
                </div>
                <p className={styles.timelineDesc}>{item.deskripsi}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Misi dan visi — §G5 */}
      <Section className={styles.holdingAdvantageSection}>
        <Container>
          <SectionHeading title="Misi dan Visi" />

          <div className={styles.holdingPillarsGrid}>
            <div className={styles.holdingPillarCard}>
              <h3 className={styles.holdingPillarTitle}>Misi Kami</h3>
              <ul className={styles.pillarFeatures}>
                {profil.misi.map((butir) => (
                  <li key={butir} className={styles.pillarFeatureItem}>
                    <span className={styles.pillarFeatureBullet} aria-hidden="true">
                      •
                    </span>
                    <span>{butir}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.holdingPillarCard}>
              <h3 className={styles.holdingPillarTitle}>Visi Kami</h3>
              <ul className={styles.pillarFeatures}>
                {profil.visi.map((butir) => (
                  <li key={butir} className={styles.pillarFeatureItem}>
                    <span className={styles.pillarFeatureBullet} aria-hidden="true">
                      •
                    </span>
                    <span>{butir}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.holdingPillarCard}>
              <h3 className={styles.holdingPillarTitle}>Visi Perusahaan</h3>
              <p className={styles.holdingPillarDesc}>{profil.visiPerusahaan}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Inovasi perusahaan — §G6; Legalitas — §G2 (jenis dokumen saja) */}
      <Section>
        <Container>
          <SectionHeading title="Inovasi Perusahaan" />
          <p className={styles.overviewText}>{profil.inovasi}</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title="Legalitas" description={profil.legalitas.pengantar} />
          <ul className={styles.pillarFeatures}>
            {profil.legalitas.daftar.map((dokumen) => (
              <li key={dokumen} className={styles.pillarFeatureItem}>
                <span className={styles.pillarFeatureBullet} aria-hidden="true">
                  •
                </span>
                <span>{dokumen}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
