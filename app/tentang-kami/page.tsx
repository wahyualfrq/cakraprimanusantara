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
} from "@/content/tentang-kami";
import { lokasiList } from "@/content/kontak";
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
                src="/placeholder/tentang-kami.jpg"
                alt="Operasional dan tim terintegrasi PT Cakra Prima Nusantara"
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

              <div className={styles.holdingNote}>
                <strong>Sinergi Terpadu:</strong> Menyatukan rekayasa
                infrastruktur fisik dan perbaikan beton di wilayah Sumatera
                dengan riset bioteknologi pemupukan hayati berkelanjutan di
                tingkat nasional.
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Empat Pilar Unit Usaha */}
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

      {/* 4. Jaringan Fasilitas & Operasional */}
      <Section className={styles.locationsSection}>
        <Container>
          <SectionHeading
            title="Jaringan Operasional & Fasilitas"
          />

          <div className={styles.locationsGrid}>
            {lokasiList.map((lokasi) => (
              <div key={lokasi.slug} className={styles.locationCard}>
                <h3 className={styles.locationName}>{lokasi.nama}</h3>
                <address className={styles.locationAddress}>
                  {lokasi.alamat}
                </address>
                <div className={styles.locationBadgeList}>
                  {lokasi.unitUsaha.map((u) => (
                    <span key={u} className={styles.locationBadge}>
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Call To Action Penutup */}
      <Section className={styles.ctaSection}>
        <Container>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>
              Siap Bermitra untuk Solusi Proyek & Industri Anda
            </h2>
            <p className={styles.ctaText}>
              Jelajahi rekam jejak portofolio pekerjaan kami atau hubungi tim
              ahli kami untuk konsultasi teknis kebutuhan konstruksi, alat berat,
              distribusi, maupun agribisnis.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/portofolio" className={styles.ctaPrimary}>
                Lihat Portofolio Proyek
              </Link>
              <Link href="/kontak" className={styles.ctaSecondary}>
                Hubungi Kami
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
