import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline, type TimelineItem } from "@/components/ui/Timeline";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { narasiRisetList } from "@/content/agribisnis/riset";
import { milestoneList } from "@/content/agribisnis/milestone";
import { sertifikasiList } from "@/content/agribisnis/sertifikasi";
import { cn } from "@/lib/utils";
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

type Dokumentasi = {
  src: string;
  alt: string;
  caption: string;
  /** Ukuran asli file — gambar tampil utuh tanpa crop (kolase berlabel). */
  width: number;
  height: number;
};

// Dokumentasi per bagian narasi (urutan narasiRisetList). File: public/riset/.
const DOKUMENTASI: (Dokumentasi | undefined)[] = [
  {
    src: "/riset/ostindo-riset.jpg",
    alt: "Dokumentasi kultur isolat mikroba formulasi pupuk Ostindo",
    caption: "Dokumentasi kultur isolat mikroba unggulan dalam formulasi Ostindo.",
    width: 625,
    height: 506,
  },
  {
    src: "/riset/riset-ostindo2-.jpg",
    alt: "Dokumentasi pengujian lapangan pupuk Ostindo bekerja sama dengan PPKS Kebun Adolina dan PTPN V Riau",
    caption: "Dokumentasi pengujian lapangan pupuk Ostindo bekerja sama dengan PPKS Kebun Adolina dan PTPN V Riau.",
    width: 800,
    height: 506,
  },
];

// Gambar sementara (dummy) untuk milestone yang menyebut produk tertentu: foto kemasan produk
// saat ini dari public/produk/ — bukan dokumentasi peristiwa pada tahun tersebut, jadi
// alt hanya menggambarkan kemasan. Milestone lain tanpa gambar (tidak ada aset relevan; kolase
// mikroba dan piagam LIPI sudah tampil di section lain halaman ini).
const GAMBAR_MILESTONE: Record<number, TimelineItem["gambar"]> = {
  2001: { src: "/produk/Ostindo.png", alt: "Kemasan produk Ostindo", width: 1080, height: 449 },
  2009: {
    src: "/produk/bless-cair-cut-bg.jpg",
    alt: "Kemasan Pupuk Organik Cair Bless",
    width: 270,
    height: 312,
  },
  2010: { src: "/produk/npk-new.png", alt: "Kemasan Pupuk NPK Bless", width: 1080, height: 449 },
};

// Ukuran asli scan dokumen (public/riset/) — dokumen tampil utuh, tidak di-crop.
const UKURAN_DOKUMEN: Record<string, { width: number; height: number }> = {
  "/riset/sertifikat-sni.jpg": { width: 1200, height: 1696 },
  "/riset/sertifikasi-sni-terbaru.jpg": { width: 1200, height: 1696 },
  "/riset/lipi.jpg": { width: 1500, height: 1061 },
};

// Struktur DESIGN.md v0.4 §13.5: narasi §E3 (split-rail per bagian: judul + dokumentasi |
// teks) → milestone §E4 (band) → Sertifikat & Penghargaan (D9): dokumen yang punya scan
// tampil sebagai galeri dokumen, sisanya daftar ringkas. Nomor & masa berlaku tidak ada di
// sumber → tidak ditampilkan.
export default function RisetInovasiPage() {
  const dokumen = sertifikasiList.filter((item) => item.gambar);
  const lainnya = sertifikasiList.filter((item) => !item.gambar);

  return (
    <>
      <PageHeader
        variant="photo"
        fullScreen
        photoSrc="/images/gambar-9.png"
        photoPosition="center 35%"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Riset & Inovasi", href: "/riset-dan-inovasi" },
        ]}
        title="Riset & Inovasi"
        description="Pengembangan formulasi bioteknologi ramah lingkungan dan kerja sama penelitian terpadu."
      />

      {/* 1. Narasi §E3 — judul + dokumentasi di kolom kiri, teks di kanan (mobile: judul → teks → gambar). */}
      <Section aria-label="Narasi riset">
        <Container className={styles.narrative}>
          {narasiRisetList.map((bagian, index) => {
            const id = `narasi-${index + 1}`;
            const media = DOKUMENTASI[index];
            return (
              <Reveal
                as="section"
                stagger
                key={bagian.judul}
                aria-labelledby={id}
                className={cn(styles.part, media && styles.partWithMedia)}
              >
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

                {media && (
                  <figure className={styles.figure}>
                    <div className={styles.imageBox}>
                      <Image
                        src={media.src}
                        alt={media.alt}
                        width={media.width}
                        height={media.height}
                        sizes="(min-width: 1200px) 360px, (min-width: 900px) 32vw, calc(100vw - 2rem)"
                        className={styles.image}
                      />
                    </div>
                    <figcaption className={styles.caption}>{media.caption}</figcaption>
                  </figure>
                )}
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
            {/* Garis kontur lahan — dekoratif, tergambar sekali saat masuk layar. */}
            <Reveal variant="fade" className={styles.contour}>
              <svg viewBox="0 0 240 200" fill="none" aria-hidden="true" focusable="false">
                <path d="M8 168c40-18 70-6 104-26s52-58 120-52" />
                <path d="M8 140c34-14 62-4 92-22s46-52 132-50" />
                <path d="M8 112c28-10 54-2 80-18s40-44 144-46" />
                <path d="M8 84c22-6 46 0 68-12s34-34 156-40" />
                <path d="M8 56c18-4 38 2 58-6s28-24 166-32" />
              </svg>
            </Reveal>
          </div>
          {/* Item muncul satu per satu saat masuk layar; garis tergambar sekali. */}
          <Timeline
            revealEach
            items={milestoneList.map((item) => ({ ...item, gambar: GAMBAR_MILESTONE[item.tahun] }))}
          />
        </Container>
      </Section>

      {/* 3. Sertifikat & Penghargaan — D9. Scan dokumen tampil utuh; buka ukuran penuh di tab baru. */}
      <Section aria-labelledby="sertifikat-judul">
        <Container>
          <SectionHeading title="Sertifikat & Penghargaan" id="sertifikat-judul" />

          {dokumen.length > 0 && (
            <Reveal as="ul" stagger className={styles.docGrid}>
              {dokumen.map((item) => {
                const ukuran = UKURAN_DOKUMEN[item.gambar!] ?? { width: 1200, height: 1696 };
                const lanskap = ukuran.width > ukuran.height;
                return (
                  <li key={item.slug} className={cn(styles.docItem, lanskap && styles.docWide)}>
                    <a
                      href={item.gambar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.docLink}
                      aria-label={`${item.nama} — buka dokumen ukuran penuh di tab baru`}
                    >
                      <span className={styles.docFrame}>
                        <Image
                          src={item.gambar!}
                          alt={`Dokumen ${item.nama}`}
                          width={ukuran.width}
                          height={ukuran.height}
                          sizes={lanskap ? "(min-width: 900px) 540px, 100vw" : "(min-width: 900px) 260px, 50vw"}
                          className={styles.docImage}
                        />
                      </span>
                      <span className={styles.docBody}>
                        {item.tahun && <span className={styles.docYear}>{item.tahun}</span>}
                        <span className={styles.docName}>{item.nama}</span>
                        {item.deskripsi && <span className={styles.docMeta}>{item.deskripsi}</span>}
                        <span className={styles.docOpen}>Lihat dokumen</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </Reveal>
          )}

          {lainnya.length > 0 && (
            <Reveal as="ul" stagger className={styles.certList}>
              {lainnya.map((item) => (
                <li key={item.slug} className={styles.certItem}>
                  {/* Baris tahun selalu ada (kosong bila sumber tak mencantumkan) → nama sejajar. */}
                  <span className={styles.certYear} aria-hidden={item.tahun ? undefined : true}>
                    {item.tahun ?? ""}
                  </span>
                  <span className={styles.certName}>{item.nama}</span>
                  {item.deskripsi && <span className={styles.certMeta}>{item.deskripsi}</span>}
                </li>
              ))}
            </Reveal>
          )}
        </Container>
      </Section>
    </>
  );
}
