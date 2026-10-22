import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo/metadata";
import { profil } from "@/content/profil";
import { milestoneList } from "@/content/agribisnis/milestone";
import { ilustrasi } from "@/content/ilustrasi";
import styles from "./page.module.css";

// Isi bersumber dari content/profil.ts (CONTENT-VERBATIM.md §E1, §G2, §G3,
// §G5, §G6) dan milestoneList (§E4). content/tentang-kami.ts (profil holding)
// dan StatsSection (angka tanpa sumber) dilepas dari render — file dipertahankan.
// Sekapur Sirih (§G7) opsional, belum ditampilkan sampai disetujui.
// Struktur (DESIGN.md §8.11 "Tentang"): tiap section beda struktur dari
// tetangganya; satu section ber-tint (Milestone).

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Tentang Kami",
    // INTERIM — belum disetujui (D2). Kalimat pertama sejarah & profil, CONTENT-VERBATIM.md §E1 (PDF hal. 3).
    description:
      "PT. Anugerah Mustika Ostindo merupakan perusahaan swasta nasional yang didirikan pada Juli 1995 dengan tujuan awal untuk mengembangkan produk pupuk berbasis bioteknologi yang ramah lingkungan.",
    path: "/tentang-kami",
  });
}

function DaftarButir({ items }: { items: string[] }) {
  return (
    <ul className={styles.bullets}>
      {items.map((butir) => (
        <li key={butir}>{butir}</li>
      ))}
    </ul>
  );
}

export default function TentangKamiPage() {
  const fakta = [
    { label: "Berdiri", nilai: profil.berdiri.teks },
    { label: "Kantor", nilai: profil.kedudukan.kantor },
    { label: "Pabrik", nilai: profil.kedudukan.pabrik },
  ];

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
      <Section>
        <Container className={styles.profileGrid}>
          <div className={styles.profileMedia}>
            {/* Ilustrasi sementara (D4) — bukan dokumentasi kegiatan. */}
            <Image
              src={ilustrasi.rumahKaca.src}
              alt={ilustrasi.rumahKaca.alt}
              fill
              // Elemen LCP di 360 & 1440 → preload + prioritas tinggi (Tahap O: 2776 → ±1900 ms di mobile).
              preload
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 40vw"
              className={styles.cover}
            />
          </div>

          <div className={styles.profileCopy}>
            <SectionHeading title={profil.nama} />
            <dl className={styles.facts}>
              {fakta.map((item) => (
                <div key={item.label}>
                  <dt className={styles.factLabel}>{item.label}</dt>
                  <dd className={styles.factValue}>{item.nilai}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.prose}>
              {profil.narasi.map((paragraf) => (
                <p key={paragraf}>{paragraf}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Nilai — §G3 (label sesuai catatan sumber) */}
      <Section>
        <Container>
          <SectionHeading title={`Nilai ${profil.nama}`} />
          <ul className={styles.values}>
            {profil.nilai.map((nilai) => (
              <li key={nilai.label} className={styles.value}>
                <h3 className={styles.valueTitle}>{nilai.label}</h3>
                <p className={styles.valueText}>{nilai.deskripsi}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 3. Milestone — §E4 (satu-satunya section ber-tint) */}
      <Section className={styles.milestoneSection}>
        <Container>
          <SectionHeading title="Milestone" />
          <ol className={styles.timeline}>
            {milestoneList.map((item) => (
              <li key={item.tahun} className={styles.timelineItem}>
                <span className={styles.year}>{item.tahun}</span>
                <p className={styles.timelineText}>{item.deskripsi}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 4. Misi dan visi — §G5 */}
      <Section>
        <Container>
          <SectionHeading title="Misi dan Visi" />
          <div className={styles.missionGrid}>
            <div>
              <h3 className={styles.subTitle}>Misi Kami</h3>
              <DaftarButir items={profil.misi} />
            </div>
            <div>
              <h3 className={styles.subTitle}>Visi Kami</h3>
              <DaftarButir items={profil.visi} />
            </div>
          </div>
          <div className={styles.vision}>
            <h3 className={styles.subTitle}>Visi Perusahaan</h3>
            <p className={styles.visionText}>{profil.visiPerusahaan}</p>
          </div>
        </Container>
      </Section>

      {/* 5. Inovasi perusahaan — §G6 */}
      <Section>
        <Container className={styles.innovationGrid}>
          <div className={styles.innovationCopy}>
            <SectionHeading title="Inovasi Perusahaan" />
            <p className={styles.prose}>{profil.inovasi}</p>
          </div>
          <div className={styles.innovationMedia}>
            {/* Ilustrasi sementara (D4) — bukan dokumentasi fasilitas Ostindo. */}
            <Image
              src={ilustrasi.laboratorium.src}
              alt={ilustrasi.laboratorium.alt}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              className={styles.cover}
            />
          </div>
        </Container>
      </Section>

      {/* 6. Legalitas — §G2 (jenis dokumen saja) */}
      <Section>
        <Container>
          <SectionHeading title="Legalitas" description={profil.legalitas.pengantar} />
          <ul className={styles.legalList}>
            {profil.legalitas.daftar.map((dokumen) => (
              <li key={dokumen} className={styles.legalItem}>
                {dokumen}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
