import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentImage } from "@/components/ui/ContentImage";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBeritaInSourceOrder, getBeritaBySlug } from "@/lib/content/berita";
import { formatTanggalIndonesia } from "@/lib/tanggal";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Berita",
    description:
      "Warta resmi seputar kemitraan riset agribisnis, inovasi produk, dan perkembangan unit usaha PT Cakra Prima Nusantara.",
    path: "/berita",
  });
}

// Pemetaan aset ilustrasi terverifikasi untuk artikel terkait.
// Sesuai integritas konten, seluruh aset diberi penanda jujur sebagai ilustrasi, bukan foto dokumentasi autentik kegiatan.
const ILUSTRASI_BERITA: Record<string, { src: string; alt: string; caption: string }> = {
  "kerjasama-brin-teknologi-pestisida": {
    src: "/images/gambar-9.png",
    alt: "Ilustrasi riset agronomi — pengujian tanaman di laboratorium",
    caption: "Ilustrasi riset formulasi biopestisida ramah lingkungan",
  },
  "kerjasama-dengan-lipi": {
    src: "/images/gambar-11.png",
    alt: "Ilustrasi pengujian produk pertanian di lapangan",
    caption: "Ilustrasi pengujian pupuk dan evaluasi agronomi di lapangan",
  },
  "penghargaan-best-fertilizer-2016": {
    src: "/images/gambar-12.png",
    alt: "Ilustrasi piala penghargaan Best Fertilizer 2016 dan produk pupuk OSTINDO",
    caption: "Dokumentasi arsip penghargaan Best Fertilizer 2016",
  },
};

export default function BeritaPage() {
  const featured = getBeritaBySlug("kerjasama-brin-teknologi-pestisida");
  const allArticles = getBeritaInSourceOrder();

  return (
    <>
      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
        ]}
        title="Berita"
      />

      {/* ── FEATURED STORY: KERJA SAMA BRIN ────────────────────────────── */}
      {featured && (
        <Section className={styles.featuredSection}>
          <Container>
            <div className={styles.sectionLead}>
              <h2 className={styles.sectionTitle}>Kemitraan Riset Strategis</h2>
            </div>

            <article className={styles.featuredCard}>
              <div className={styles.featuredContent}>
                <div className={styles.featuredMetaRow}>
                  <span className={styles.featuredCategory}>AGRIBISNIS · KEMITRAAN</span>
                  {featured.meta.tanggal && (
                    <>
                      <span className={styles.metaDivider} aria-hidden="true">·</span>
                      <time dateTime={featured.meta.tanggal} className={styles.featuredDate}>
                        {formatTanggalIndonesia(featured.meta.tanggal)}
                      </time>
                    </>
                  )}
                </div>

                <h3 className={styles.featuredTitle}>
                  <Link
                    href={`/berita/${featured.meta.slug}`}
                    className={styles.featuredTitleLink}
                  >
                    {featured.meta.judul}
                  </Link>
                </h3>

                <p className={styles.featuredEntity}>
                  Entitas Pelaksana: <strong>PT Anugerah Mustika Ostindo</strong> (Unit Agribisnis)
                </p>

                {featured.meta.excerpt && (
                  <p className={styles.featuredExcerpt}>{featured.meta.excerpt}</p>
                )}

                <div className={styles.featuredCtaRow}>
                  <Link
                    href={`/berita/${featured.meta.slug}`}
                    className={styles.featuredButton}
                  >
                    Baca Artikel Lengkap →
                  </Link>
                </div>
              </div>

              <div className={styles.featuredMedia}>
                <figure className={styles.featuredFigure}>
                  <div className={styles.featuredMediaFrame}>
                    <Image
                      src="/images/gambar-9.png"
                      alt="Ilustrasi riset agronomi — pengujian tanaman di laboratorium PT Anugerah Mustika Ostindo bersama BRIN"
                      fill
                      sizes="(min-width: 1024px) 540px, 100vw"
                      className={styles.featuredImage}
                      priority
                    />
                  </div>
                  {/* <figcaption className={styles.featuredCaption}>
                    Ilustrasi riset mikrobiologi terapan dan evaluasi formulasi agronomi
                  </figcaption> */}
                </figure>
              </div>
            </article>
          </Container>
        </Section>
      )}

      {/* ── ARSIP LENGKAP: 7 ARTIKEL ───────────────────────────────────── */}
      <Section className={styles.archiveSection}>
        <Container>
          <div className={styles.archiveHeader}>
            <div>
              {/* <span className={styles.eyebrow}>ARSIP PUBLIKASI</span> */}
              <h2 className={styles.sectionTitle}>Berita & Dokumentasi</h2>
            </div>
            {/* <p className={styles.archiveSubtitle}>
              Menampilkan {allArticles.length} catatan warta dan rilis kegiatan unit usaha. Artikel dengan status persiapan akan dipublikasikan setelah verifikasi dokumen sumber selesai.
            </p> */}
          </div>

          <div className={styles.archiveGrid}>
            {allArticles.map((entry, index) => {
              const { meta } = entry;
              const ilustrasi = ILUSTRASI_BERITA[meta.slug];
              const isActive = !meta.draft;

              if (isActive) {
                return (
                  <article key={meta.slug} className={styles.cardActive}>
                    <div className={styles.cardMedia}>
                      {ilustrasi ? (
                        <div className={styles.mediaWrapper}>
                          <Image
                            src={ilustrasi.src}
                            alt={ilustrasi.alt}
                            fill
                            sizes="(min-width: 900px) 400px, 100vw"
                            className={styles.cardImage}
                          />
                        </div>
                      ) : (
                        <ContentImage
                          alt={meta.fotoAlt ?? meta.judul}
                          variant="berita"
                          fill
                          sizes="(min-width: 900px) 400px, 100vw"
                        />
                      )}
                    </div>

                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span className={styles.metaActiveText}>AGRIBISNIS · WARTA RESMI</span>
                        {meta.tanggal && (
                          <time dateTime={meta.tanggal} className={styles.cardDate}>
                            {formatTanggalIndonesia(meta.tanggal)}
                          </time>
                        )}
                      </div>

                      <h3 className={styles.cardTitle}>
                        <Link href={`/berita/${meta.slug}`} className={styles.cardTitleLink}>
                          {meta.judul}
                        </Link>
                      </h3>

                      <p className={styles.cardUnit}>
                        Unit: <strong>Agribisnis (PT Anugerah Mustika Ostindo)</strong>
                      </p>

                      {meta.excerpt && (
                        <p className={styles.cardExcerpt}>{meta.excerpt}</p>
                      )}

                      <div className={styles.cardFooter}>
                        <Link href={`/berita/${meta.slug}`} className={styles.readMoreLink}>
                          Baca Selengkapnya →
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              }

              // Kartu Draft: Pertahankan data asli, tipografi informatif tanpa badge, tanpa link ke 404
              return (
                <article key={meta.slug} className={styles.cardDraft}>
                  <div className={styles.cardMedia}>
                    {ilustrasi ? (
                      <div className={styles.mediaWrapper}>
                        <Image
                          src={ilustrasi.src}
                          alt={ilustrasi.alt}
                          fill
                          sizes="(min-width: 900px) 400px, 100vw"
                          className={styles.cardImageMuted}
                        />
                      </div>
                    ) : (
                      <div className={styles.patternPlaceholder}>
                        <ContentImage
                          alt=""
                          variant="berita"
                          fill
                          sizes="(min-width: 900px) 400px, 100vw"
                        />
                        <div className={styles.patternOverlay}>
                          <span className={styles.indexLabel}>
                            ARSIP #{String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={styles.metaCategoryMuted}>AGRIBISNIS</span>
                      <span className={styles.metaDraftText}>DALAM PERSIAPAN</span>
                    </div>

                    <h3 className={styles.cardTitleDraft}>{meta.judul}</h3>

                    <p className={styles.cardUnit}>
                      Unit: <strong>Agribisnis (PT Anugerah Mustika Ostindo)</strong>
                    </p>

                    <p className={styles.draftNotice}>
                      Materi naskah artikel ini sedang dalam tahap kurasi dan verifikasi editorial internal. Informasi lengkap akan dipublikasikan secara resmi.
                    </p>

                    <div className={styles.cardFooter}>
                      <span className={styles.draftFooterNotice}>
                        Naskah Sedang Dipersiapkan
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
