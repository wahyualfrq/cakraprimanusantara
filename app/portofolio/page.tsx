import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContentImage } from "@/components/ui/ContentImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { itemListSchema } from "@/lib/seo/structured-data";
import { proyekList } from "@/content/kontraktor/proyek";
import { sertifikasiList } from "@/content/agribisnis/sertifikasi";
import { studiKasusBelitung } from "@/content/agribisnis/studi-kasus";
import { PortofolioFilter } from "./PortofolioFilter";
import styles from "./page.module.css";

// Pencapaian & sertifikasi yang relevan untuk halaman Portofolio
const PENCAPAIAN_PORTOFOLIO = sertifikasiList.filter((s) =>
  ["best-fertilizer-2016", "alih-teknologi-lipi-2015", "iopc-2014"].includes(s.slug),
);

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Portofolio",
    description: `${proyekList.length} proyek konstruksi dari unit usaha Kontraktor PT Cakra Indo Pratama, dan studi kasus reklamasi lahan agribisnis oleh ${studiKasusBelitung.entitasPelaksana}.`,
    path: "/portofolio",
  });
}

export default function PortofolioPage() {
  // JSON-LD: gabungkan proyek konstruksi + pencapaian agribisnis
  const schema = itemListSchema([
    ...proyekList.map((p) => ({ name: p.judul })),
    ...PENCAPAIAN_PORTOFOLIO.map((s) => ({ name: s.nama })),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Portofolio", href: "/portofolio" },
        ]}
        title="Portofolio"
      />

      {/* ── PILLAR A: Konstruksi & Alat Berat ─────────────────────────── */}
      <Section id="konstruksi" className={styles.pillarASection}>
        <Container>
          <div className={styles.pillarHeader}>
            <SectionHeading
              title="Konstruksi & Alat Berat"
              description={`${proyekList.length} proyek yang dikerjakan oleh PT Cakra Indo Pratama.`}
            />
          </div>

          <PortofolioFilter />
        </Container>
      </Section>

      {/* ── PILLAR B: Agribisnis ───────────────────────────────────────── */}
      <Section id="agribisnis" className={styles.pillarBSection}>
        <Container>
          <div className={styles.pillarHeader}>
            <SectionHeading
              title="Agribisnis"
            // description={`Dokumentasi lapangan pengelolaan dan reklamasi lahan oleh ${studiKasusBelitung.entitasPelaksana}.`}
            />
          </div>

          {/* Studi kasus kronologis — Belitung */}
          <div className={styles.studyKasusMeta}>
            <span className={styles.studyMetaItem}>
              <span className={styles.studyMetaLabel}>Lokasi</span>
              {studiKasusBelitung.lokasi}
            </span>
            <span className={styles.studyMetaItem}>
              <span className={styles.studyMetaLabel}>Luas Lahan</span>
              {studiKasusBelitung.luasLahan}
            </span>
            <span className={styles.studyMetaItem}>
              <span className={styles.studyMetaLabel}>Jenis Lahan</span>
              {studiKasusBelitung.jenisLahan}
            </span>
            <span className={styles.studyMetaItem}>
              <span className={styles.studyMetaLabel}>Periode</span>
              {studiKasusBelitung.periode}
            </span>
          </div>

          <div className={styles.studyList}>
            {studiKasusBelitung.faseList.map((kasus, idx) => (
              <article key={kasus.id} className={styles.studyItem}>
                {/* Garis kronologis */}
                <div className={styles.studyTimeline}>
                  <div className={styles.studyDot} />
                  {idx < studiKasusBelitung.faseList.length - 1 && (
                    <div className={styles.studyLine} />
                  )}
                </div>

                <div className={styles.studyContent}>
                  <div className={styles.studyPeriode}>{kasus.periode}</div>
                  <h3 className={styles.studyJudul}>{kasus.judul}</h3>
                  <p className={styles.studyDeskripsi}>{kasus.deskripsi}</p>

                  {/* Slot foto — 12 slot terstruktur dari content/agribisnis/studi-kasus.ts */}
                  <div
                    className={styles.studyFotoGrid}
                    style={
                      {
                        "--foto-count": kasus.fotos.length,
                      } as React.CSSProperties
                    }
                  >
                    {kasus.fotos.map((foto) => (
                      <div key={foto.id} className={styles.studyFotoSlot}>
                        <ContentImage
                          src={foto.src}
                          alt={foto.alt}
                          variant="proyek"
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
                        />
                        {foto.caption && (
                          <span className={styles.studyFotoCaption}>
                            {foto.caption}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── PENCAPAIAN & SERTIFIKASI ──────────────────────────────────── */}
      <Section id="pencapaian" className={styles.pencapaianSection}>
        <Container>
          <SectionHeading
            title="Pencapaian"
          // description="Rekam jejak penghargaan dan rekognisi yang diraih oleh unit usaha Agribisnis (PT Anugerah Mustika Ostindo)."
          />
          <ul className={styles.pencapaianList}>
            {PENCAPAIAN_PORTOFOLIO.map((item) => (
              <li key={item.slug} className={styles.pencapaianItem}>
                <div className={styles.pencapaianTahun}>
                  {item.tahun ?? "—"}
                </div>
                <div className={styles.pencapaianBody}>
                  <strong className={styles.pencapaianNama}>{item.nama}</strong>
                  <div className={styles.pencapaianMeta}>
                    <span className={styles.pencapaianEntitas}>
                      PT Anugerah Mustika Ostindo
                    </span>
                    {item.penerbit && (
                      <span className={styles.pencapaianPenerbit}>
                        {item.penerbit}
                      </span>
                    )}
                  </div>
                  {item.deskripsi && item.slug !== "best-fertilizer-2016" && (
                    <p className={styles.pencapaianDesk}>{item.deskripsi}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
