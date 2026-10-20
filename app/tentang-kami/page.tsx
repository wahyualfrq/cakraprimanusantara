import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  profilHoldingData,
  pilarBisnisList,
  linimasaList,
  keunggulanHoldingData,
} from "@/content/tentang-kami";
import { StatsSection } from "./StatsSection";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Tentang Kami",
    description:
      "Profil korporat PT Cakra Prima Nusantara — holding terintegrasi yang menaungi pilar jasa konstruksi, armada alat berat, perdagangan industri, dan agribisnis hayati.",
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

      {/* 1. Pengenalan Holding & Profil Perusahaan */}
      <Section className={styles.overviewSection}>
        <Container>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewMedia}>
              <Image
                src="/images/gambar-5.png"
                alt="Tim operasional dan manajemen terintegrasi PT Cakra Prima Nusantara"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.overviewImage}
              />
            </div>

            <div className={styles.overviewCopy}>
              <SectionHeading
                title={profilHoldingData.nama}
              />
              <p className={styles.overviewLead}>
                {/* {profilHoldingData.ringkasan} */}
              </p>
              {profilHoldingData.paragraf.map((p, idx) => (
                <p key={idx} className={styles.overviewText}>
                  {p}
                </p>
              ))}

              {/* <div className={styles.holdingNote}>
                <strong>Sinergi Terpadu:</strong> Menyatukan rekayasa
                infrastruktur fisik dan perbaikan beton di wilayah Sumatera
                dengan riset bioteknologi pemupukan hayati berkelanjutan di
                tingkat nasional.
              </div> */}
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. CPN dalam Angka (Statistik Korporat) */}
      <StatsSection />

      {/* 3. Empat Pilar Unit Usaha */}
      <Section className={styles.pillarsSection}>
        <Container>
          <SectionHeading
            title="Ekosistem Bisnis"
          />

          <div className={styles.pillarsGrid}>
            {pilarBisnisList.map((pilar) => (
              <div key={pilar.id} className={styles.pillarCard}>
                <div className={styles.pillarHeader}>
                  {/* <span className={styles.pillarBadge}>Pilar Layanan</span> */}
                  <h3 className={styles.pillarTitle}>{pilar.judul}</h3>
                  {/* <span className={styles.pillarEntity}>{pilar.entitas}</span> */}
                </div>

                <p className={styles.pillarDesc}>{pilar.deskripsi}</p>

                <ul className={styles.pillarFeatures}>
                  {pilar.fiturUtama.map((fitur, fIdx) => (
                    <li key={fIdx} className={styles.pillarFeatureItem}>
                      <span className={styles.pillarFeatureBullet}>•</span>
                      <span>{fitur}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.pillarFooter}>
                  <span className={styles.pillarLocation}>{pilar.lokasi}</span>
                  <Link href={pilar.href} className={styles.pillarLink}>
                    Lihat Layanan →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Linimasa & Rekam Jejak Entitas */}
      <Section className={styles.timelineSection}>
        <Container>
          <SectionHeading
            title="Rekam Jejak & Milestone"
          />
          <div className={styles.timelineList}>
            {linimasaList.map((item, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineHeader}>
                  <span className={styles.timelineYear}>{item.tahun}</span>
                  <h3 className={styles.timelineTitle}>{item.judul}</h3>
                  <span className={styles.timelineEntity}>{item.entitas}</span>
                </div>
                <p className={styles.timelineDesc}>{item.deskripsi}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Keunggulan CPN sebagai Holding */}
      <Section className={styles.holdingAdvantageSection}>
        <Container>
          <SectionHeading title={keunggulanHoldingData.judul} />

          <div className={styles.holdingIntroWrapper}>
            {keunggulanHoldingData.paragraf.map((p, idx) => (
              <p key={idx} className={styles.holdingIntroText}>
                {p}
              </p>
            ))}
          </div>

          <div className={styles.holdingPillarsGrid}>
            {keunggulanHoldingData.pilarStrategis.map((pillar, idx) => (
              <div key={idx} className={styles.holdingPillarCard}>
                <span className={styles.holdingPillarIndex}>0{idx + 1}</span>
                <h3 className={styles.holdingPillarTitle}>{pillar.judul}</h3>
                <p className={styles.holdingPillarDesc}>{pillar.deskripsi}</p>
              </div>
            ))}
          </div>

          <div className={styles.holdingScopeWrapper}>
            <h3 className={styles.holdingScopeHeading}>
              Cakupan Bidang Usaha & Entitas Terintegrasi
            </h3>
            <div className={styles.holdingScopeGrid}>
              {keunggulanHoldingData.bidangUsaha.map((item) => (
                <div key={item.id} className={styles.holdingScopeCard}>
                  <div className={styles.holdingScopeHeader}>
                    <h4 className={styles.holdingScopeTitle}>{item.bidang}</h4>
                    <span className={styles.holdingScopeEntity}>{item.entitas}</span>
                  </div>
                  <p className={styles.holdingScopeDesc}>{item.deskripsi}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
