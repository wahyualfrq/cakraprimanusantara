import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Timeline } from "@/components/ui/Timeline";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { NilaiList } from "@/components/sections/WhyChooseUs";
import { buildMetadata } from "@/lib/seo/metadata";
import { profil } from "@/content/profil";
import { milestoneList } from "@/content/agribisnis/milestone";
import { ilustrasi } from "@/content/ilustrasi";
import styles from "./page.module.css";

// Isi bersumber dari content/profil.ts (CONTENT-VERBATIM.md §E1, §G2, §G3,
// §G5, §G6) dan milestoneList (§E4).
// Sekapur Sirih (§G7) opsional, belum ditampilkan sampai disetujui.
// Struktur DESIGN.md v0.4 §13.2: profil split-media → nilai S0 → milestone (band) →
// misi & visi → inovasi split-media → legalitas S0. Tiap section beda pola.

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Tentang Kami",
    // INTERIM — belum disetujui (D2). Kalimat pertama sejarah & profil, CONTENT-VERBATIM.md §E1 (PDF hal. 3).
    description:
      "PT. Anugerah Mustika Ostindo merupakan perusahaan swasta nasional yang didirikan pada Juli 1995 dengan tujuan awal untuk mengembangkan produk pupuk berbasis bioteknologi yang ramah lingkungan.",
    path: "/tentang-kami",
  });
}

function DaftarBernomor({ items }: { items: string[] }) {
  return (
    <ol className={styles.numbered}>
      {items.map((butir, index) => (
        <li key={butir}>
          <span className={styles.number} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{butir}</span>
        </li>
      ))}
    </ol>
  );
}

export default function TentangKamiPage() {
  const fakta = [
    { label: "Berdiri", description: profil.berdiri.teks },
    { label: "Kantor", description: profil.kedudukan.kantor },
    { label: "Pabrik", description: profil.kedudukan.pabrik },
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

      {/* 1. Profil perusahaan — §E1, split-media 5:7 dengan gambar sticky */}
      <Section aria-labelledby="profil-judul">
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
              sizes="(min-width: 1200px) 450px, (min-width: 900px) 38vw, calc(100vw - 2rem)"
              className={styles.cover}
            />
          </div>

          <div className={styles.profileCopy}>
            <h2 id="profil-judul" className={styles.profileTitle}>
              {profil.nama}
            </h2>
            <p className={styles.lead}>{profil.narasi[0]}</p>
            <DefinitionList items={fakta} layout="grid" />
            <div className={styles.prose}>
              {profil.narasi.slice(1).map((paragraf) => (
                <p key={paragraf}>{paragraf}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Nilai — §G3 (label sesuai catatan sumber) */}
      <Section aria-labelledby="nilai-judul">
        <Container>
          <SectionHeading title={`Nilai ${profil.nama}`} id="nilai-judul" />
          <NilaiList />
        </Container>
      </Section>

      {/* 3. Milestone — §E4, timeline penuh di satu-satunya band halaman */}
      <Section tone="muted" aria-labelledby="milestone-judul">
        <Container className={styles.railGrid}>
          <div className={styles.rail}>
            <SectionHeading title="Milestone" id="milestone-judul" className={styles.railHeading} />
          </div>
          <Timeline items={milestoneList} />
        </Container>
      </Section>

      {/* 4. Misi dan visi — §G5: dua daftar bernomor + panel S1 Visi Perusahaan */}
      <Section aria-labelledby="misi-judul">
        <Container>
          <SectionHeading title="Misi dan Visi" id="misi-judul" />
          <Reveal className={styles.missionGrid} stagger>
            <div>
              <h3 className={styles.subTitle}>Misi Kami</h3>
              <DaftarBernomor items={profil.misi} />
            </div>
            <div>
              <h3 className={styles.subTitle}>Visi Kami</h3>
              <DaftarBernomor items={profil.visi} />
            </div>
          </Reveal>
          <Card className={styles.vision}>
            <h3 className={styles.visionLabel}>Visi Perusahaan</h3>
            <p className={styles.visionText}>{profil.visiPerusahaan}</p>
          </Card>
        </Container>
      </Section>

      {/* 5. Inovasi perusahaan — §G6, split-media 7:5 (teks | gambar) */}
      <Section aria-labelledby="inovasi-judul">
        <Container className={styles.innovationGrid}>
          <Reveal className={styles.innovationCopy}>
            <SectionHeading title="Inovasi Perusahaan" id="inovasi-judul" />
            <p className={styles.lead}>{profil.inovasi}</p>
          </Reveal>
          <div className={styles.innovationMedia}>
            {/* Ilustrasi sementara (D4) — bukan dokumentasi fasilitas Ostindo. */}
            <Image
              src={ilustrasi.laboratorium.src}
              alt={ilustrasi.laboratorium.alt}
              fill
              sizes="(min-width: 1200px) 450px, (min-width: 900px) 38vw, calc(100vw - 2rem)"
              className={styles.cover}
            />
          </div>
        </Container>
      </Section>

      {/* 6. Legalitas — §G2 (jenis dokumen saja), S0 dua kolom */}
      <Section aria-labelledby="legalitas-judul">
        <Container className={styles.railGrid}>
          <div className={styles.rail}>
            <SectionHeading
              title="Legalitas"
              description={profil.legalitas.pengantar}
              id="legalitas-judul"
              className={styles.railHeading}
            />
          </div>
          <Reveal as="ul" stagger className={styles.legalList}>
            {profil.legalitas.daftar.map((dokumen) => (
              <li key={dokumen} className={styles.legalItem}>
                {dokumen}
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
