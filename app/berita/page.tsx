import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentImage } from "@/components/ui/ContentImage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { kontakLink } from "@/components/layout/navLinks";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBeritaInSourceOrder } from "@/lib/content/berita";
import { ilustrasiBerita } from "@/lib/content/berita-ilustrasi";
import { formatTanggalIndonesia } from "@/lib/tanggal";
import { lokasiList } from "@/content/kontak";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Berita",
    // INTERIM — belum disetujui (D2). Sumber tidak punya kalimat deskripsi halaman Berita:
    // deskripsi PageHeader di bawah + topik artikel terbit (judul LIPI & BRIN).
    description:
      "Publikasi resmi, riset inovasi, dan kabar terkini PT Anugerah Mustika Ostindo, termasuk kerja sama riset dengan LIPI dan BRIN.",
    path: "/berita",
  });
}

// Instagram resmi = satu-satunya sosmed terverifikasi (content/kontak.ts, Office).
const instagram = lokasiList
  .flatMap((lokasi) => lokasi.kontak ?? [])
  .find((item) => item.tipe === "instagram" && !item.perluVerifikasi)?.nilai;

// Berita (DESIGN.md v0.4 §13.6, diperkaya): komposisi majalah — artikel unggulan besar
// dengan teks di atas gambar | artikel lain sebagai card vertikal. Hanya artikel terbit,
// urutan sumber; tiap artikel tampil sekali. Tanpa kategori/penulis (tidak ada di sumber).
// Empty state bila belum ada artikel terbit.
export default function BeritaPage() {
  const terbit = getBeritaInSourceOrder().filter((entry) => !entry.meta.draft);
  const [unggulan, ...lainnya] = terbit;
  const gambarUnggulan = unggulan ? ilustrasiBerita[unggulan.meta.slug] : undefined;

  return (
    <>
      <PageHeader
        variant="photo"
        fullScreen
        photoSrc="/images/gambar-11.webp"
        photoPosition="center 30%"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
        ]}
        title="Berita"
        description="Publikasi resmi, riset inovasi, dan kabar terkini PT Anugerah Mustika Ostindo."
      />

      <Section aria-label="Daftar berita">
        <Container>
          {unggulan ? (
            <div className={styles.magazine}>
              <Reveal as="article" className={styles.featured}>
                <Link href={`/berita/${unggulan.meta.slug}`} className={styles.featuredLink}>
                  <span className={styles.featuredMedia}>
                    {gambarUnggulan ? (
                      <Image
                        src={gambarUnggulan.src}
                        alt={gambarUnggulan.alt}
                        fill
                        sizes="(min-width: 1200px) 740px, (min-width: 900px) 62vw, calc(100vw - 2rem)"
                        className={styles.cover}
                        // Lazy (default): di bawah PageHeader fullScreen (100svh) — bukan lagi elemen LCP.
                      />
                    ) : (
                      <ContentImage alt="" variant="berita" fill sizes="62vw" />
                    )}
                    <span className={styles.featuredScrim} aria-hidden="true" />
                  </span>
                  <span className={styles.featuredBody}>
                    <span className={styles.badge}>Artikel unggulan</span>
                    {unggulan.meta.tanggal && (
                      <time dateTime={unggulan.meta.tanggal} className={styles.featuredDate}>
                        {formatTanggalIndonesia(unggulan.meta.tanggal)}
                      </time>
                    )}
                    <h2 className={styles.featuredTitle}>{unggulan.meta.judul}</h2>
                    {unggulan.meta.excerpt && (
                      <span className={styles.featuredExcerpt}>{unggulan.meta.excerpt}</span>
                    )}
                    <span className={styles.featuredMore}>Baca artikel lengkap</span>
                  </span>
                </Link>
              </Reveal>

              {lainnya.length > 0 && (
                <Reveal as="ul" stagger className={styles.side} aria-label="Berita lainnya">
                  {lainnya.map(({ meta }) => {
                    const gambar = ilustrasiBerita[meta.slug];
                    return (
                      <li key={meta.slug}>
                        <article>
                          <Link href={`/berita/${meta.slug}`} className={styles.card}>
                            <span className={styles.cardMedia}>
                              {gambar ? (
                                <Image
                                  src={gambar.src}
                                  alt={gambar.alt}
                                  fill
                                  sizes="(min-width: 1200px) 380px, (min-width: 900px) 30vw, calc(100vw - 2rem)"
                                  className={styles.cover}
                                />
                              ) : (
                                <ContentImage alt="" variant="berita" fill sizes="30vw" />
                              )}
                            </span>
                            <span className={styles.cardBody}>
                              {meta.tanggal && (
                                <time dateTime={meta.tanggal} className={styles.date}>
                                  {formatTanggalIndonesia(meta.tanggal)}
                                </time>
                              )}
                              <h2 className={styles.cardTitle}>{meta.judul}</h2>
                              {meta.excerpt && <span className={styles.cardExcerpt}>{meta.excerpt}</span>}
                              <span className={styles.cardMore}>Baca artikel</span>
                            </span>
                          </Link>
                        </article>
                      </li>
                    );
                  })}
                </Reveal>
              )}
            </div>
          ) : (
            <Card className={styles.empty}>
              <h2 className={styles.emptyTitle}>Belum ada berita yang diterbitkan.</h2>
              <Button href={kontakLink.href}>{kontakLink.label}</Button>
            </Card>
          )}
        </Container>
      </Section>

      {instagram && (
        <Section tone="muted" aria-labelledby="instagram-judul">
          <Container>
            <Reveal className={styles.follow}>
              <div className={styles.followText}>
                <p className={styles.followLabel}>Instagram</p>
                <h2 id="instagram-judul" className={styles.followTitle}>
                  Ikuti {instagram} di Instagram
                </h2>
              </div>
              <Button
                href={`https://instagram.com/${instagram.replace(/^@/, "")}`}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buka Instagram
              </Button>
            </Reveal>
          </Container>
        </Section>
      )}
    </>
  );
}

