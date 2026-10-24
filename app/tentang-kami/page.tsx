import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Timeline } from "@/components/ui/Timeline";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { NilaiList } from "@/components/sections/WhyChooseUs";
import { buildMetadata } from "@/lib/seo/metadata";
import { profil } from "@/content/profil";
import { milestoneList } from "@/content/agribisnis/milestone";
import { ilustrasi } from "@/content/ilustrasi";
import { cn } from "@/lib/utils";
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

function LicenseIcon({ type }: { type: "siup" | "tdp" | "industri" | "npwp" }) {
  if (type === "siup") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    );
  }
  if (type === "tdp") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="9" y1="6" x2="15" y2="6" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="15" y2="14" />
        <path d="M9 18h3" />
      </svg>
    );
  }
  if (type === "industri") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H2v18z" />
        <path d="M17 18h1" />
        <path d="M12 18h1" />
        <path d="M7 18h1" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MissionIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
        <path d="M5.52 16h12.96" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

const legalitasMeta: Record<string, { tipe: "siup" | "tdp" | "industri" | "npwp"; kategori: string; abbr: string; featured: boolean }> = {
  "Surat Ijin Usaha Perdagangan (SIUP)": {
    tipe: "siup",
    kategori: "Perizinan Usaha Dagang",
    abbr: "SIUP",
    featured: true,
  },
  "Tanda Daftar Perusahaan (TDP)": {
    tipe: "tdp",
    kategori: "Registrasi Korporasi",
    abbr: "TDP",
    featured: true,
  },
  "Ijin Industri": {
    tipe: "industri",
    kategori: "Operasional Pabrikasi",
    abbr: "INDUSTRI",
    featured: false,
  },
  "Nomor Pokok Wajib Pajak (NPWP)": {
    tipe: "npwp",
    kategori: "Kepatuhan Perpajakan",
    abbr: "NPWP",
    featured: false,
  },
};

export default function TentangKamiPage() {
  const fakta = [
    { label: "Berdiri", description: profil.berdiri.teks },
    { label: "Kantor", description: profil.kedudukan.kantor },
    { label: "Pabrik", description: profil.kedudukan.pabrik },
  ];

  return (
    <>
      <PageHeader
        variant="photo"
        fullScreen
        photoSrc="/images/gambar-6.webp"
        photoPosition="center 35%"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Tentang Kami", href: "/tentang-kami" },
        ]}
        title="Tentang Kami"
        description="Profil, sejarah, komitmen mutu, dan legalitas resmi PT Anugerah Mustika Ostindo."
      />

      {/* 1. Profil perusahaan — §E1, split-media 5:7 dengan gambar sticky */}
      <Section aria-labelledby="profil-judul">
        <Container className={styles.profileGrid}>
          {/* Split entrance: gambar fade-in, teks fade-up bertahap sedikit sesudahnya. */}
          {/* Wrapper luar = item grid yang sticky; bingkai dalam = parent `position: relative`
              untuk Image fill (fill tidak valid langsung di bawah parent sticky). */}
          <Reveal variant="fade" className={styles.profileMediaSticky}>
            <div className={styles.profileMedia}>
              {/* Ilustrasi sementara (D4) — bukan dokumentasi kegiatan. */}
              <Image
                src={ilustrasi.rumahKaca.src}
                alt={ilustrasi.rumahKaca.alt}
                fill
                // Lazy (default): di bawah PageHeader fullScreen (100svh) — bukan lagi elemen LCP,
                // preload di sini hanya berebut bandwidth dengan foto header.
                sizes="(min-width: 1200px) 450px, (min-width: 900px) 38vw, calc(100vw - 2rem)"
                className={styles.cover}
              />
            </div>
          </Reveal>

          <Reveal stagger delay={120} className={styles.profileCopy}>
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
          </Reveal>
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

      {/* 4. Visi dan misi — §G5, teks verbatim.
          Visi Perusahaan & Visi Kami = card unggulan editorial gelap dengan pilar terstruktur;
          Misi = 3 card berfokus topik dengan ikon, nomor besar, dan top accent line. */}
      <Section aria-labelledby="misi-judul">
        <Container>
          <SectionHeading title="Visi Perusahaan" id="misi-judul" />
          <div className={styles.vmContainer}>
            {/* Card Visi Unggulan — Reveal saat masuk viewport */}
            <Reveal>
              <Card as="article" className={styles.visionCard} aria-labelledby="visi-utama-heading">
                <div className={styles.visionHeader}>
                  <p id="visi-utama-heading" className={styles.visionQuote}>
                    &ldquo;{profil.visiPerusahaan}&rdquo;
                  </p>
                </div>

                <div className={styles.visionPillarsWrap}>
                  <div className={styles.visionPillars}>
                    {profil.visi.map((butir) => (
                      <div key={butir} className={styles.visionPillarCard}>
                        <p className={styles.visionPillarText}>{butir}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>

            {/* Card Misi Terpisah — Grid responsif dengan animasi stagger */}
            <div className={styles.missionSection}>
              <div className={styles.missionHeaderRow}>
                <h3 className={styles.missionSectionTitle}>Misi Perusahaan</h3>
              </div>
              <Reveal as="div" stagger className={styles.missionGrid}>
                {profil.misi.map((butir, index) => {
                  return (
                    <Card as="article" key={butir} className={styles.missionCard}>
                      <div className={styles.missionCardTop}>
                        <div className={styles.missionBadgeWrap}>
                          <span className={styles.missionIconBox} aria-hidden="true">
                            <MissionIcon index={index} />
                          </span>
                          <span className={styles.missionIndexBadge}>Misi 0{index + 1}</span>
                        </div>
                      </div>
                      <p className={styles.missionCardText}>{butir}</p>
                    </Card>
                  );
                })}
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Inovasi perusahaan — §G6, split-media 7:5 (teks | gambar) */}
      <Section aria-labelledby="inovasi-judul">
        <Container className={styles.innovationGrid}>
          <Reveal className={styles.innovationCopy}>
            <SectionHeading title="Inovasi Perusahaan" id="inovasi-judul" />
            <p className={styles.lead}>{profil.inovasi}</p>
          </Reveal>
          <Reveal variant="fade" delay={120} className={styles.innovationMedia}>
            {/* Ilustrasi sementara (D4) — bukan dokumentasi fasilitas Ostindo. */}
            <Image
              src={ilustrasi.laboratorium.src}
              alt={ilustrasi.laboratorium.alt}
              fill
              sizes="(min-width: 1200px) 450px, (min-width: 900px) 38vw, calc(100vw - 2rem)"
              className={styles.cover}
            />
          </Reveal>
        </Container>
      </Section>

      {/* 6. Legalitas — §G2: jenis dokumen terdaftar resmi, disajikan dengan grid kartu dokumen editorial,
          ikon kategori, status terverifikasi, dan hover transition halus. */}
      <Section aria-labelledby="legalitas-judul">
        <Container className={styles.railGrid}>
          <div className={styles.rail}>
            <SectionHeading
              title="Legalitas"
              description={profil.legalitas.pengantar}
              id="legalitas-judul"
              className={styles.railHeading}
            />
            <div className={styles.legalTrustBadge}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>Perusahaan Nasional Terdaftar Sejak 1995</span>
            </div>
          </div>
          <Reveal as="ul" stagger className={styles.legalGrid}>
            {profil.legalitas.daftar.map((dokumen) => {
              const meta = legalitasMeta[dokumen] || {
                tipe: "siup" as const,
                kategori: "Legalitas Resmi",
                abbr: "LEGAL",
                featured: false,
              };
              return (
                <li key={dokumen} className={cn(styles.legalCardModern, meta.featured && styles.legalCardFeatured)}>
                  <div className={styles.legalCardHeader}>
                    <span className={styles.legalCardIcon} aria-hidden="true">
                      <LicenseIcon type={meta.tipe} />
                    </span>
                  </div>
                  <div className={styles.legalCardContent}>
                    <span className={styles.legalCardCategory}>{meta.kategori}</span>
                    <h3 className={styles.legalCardAbbr}>{meta.abbr}</h3>
                    <p className={styles.legalCardFullName}>{dokumen}</p>
                  </div>
                </li>
              );
            })}
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
