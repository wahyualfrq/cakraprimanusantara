import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getBeritaBySlug } from "@/lib/content/berita";
import { formatTanggalIndonesia } from "@/lib/tanggal";
import { ilustrasi, type Ilustrasi } from "@/content/ilustrasi";
import styles from "./NewsHighlight.module.css";

// News List Item (DESIGN.md §7): daftar baris horizontal — thumbnail kecil di
// kiri, tanggal + judul + excerpt di kanan; bukan grid kartu. Hanya artikel
// terbit (isi genuine); judul, tanggal, excerpt dari MDX (lib/content/berita.ts),
// tanpa teks cadangan karangan dan tanpa label kategori (sumber tidak memberi
// kategori per artikel).
const slots: { slug: string; gambar: Ilustrasi }[] = [
  { slug: "kerjasama-brin-teknologi-pestisida", gambar: ilustrasi.laboratorium },
  { slug: "kerjasama-dengan-lipi", gambar: ilustrasi.rumahKaca },
];

export function NewsHighlight() {
  const items = slots.flatMap((slot) => {
    const entry = getBeritaBySlug(slot.slug);
    return entry && !entry.meta.draft ? [{ ...slot, meta: entry.meta }] : [];
  });

  return (
    <Section>
      <Container>
        <div className={styles.header}>
          <SectionHeading title="Berita" />
          <Link href="/berita" className={styles.viewAll}>
            Lihat Semua Berita →
          </Link>
        </div>

        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.slug}>
              <article className={styles.row}>
                <div className={styles.thumb}>
                  {/* Ilustrasi sementara (D4) — bukan dokumentasi kegiatan. */}
                  <Image
                    src={item.gambar.src}
                    alt={item.gambar.alt}
                    fill
                    sizes="(min-width: 640px) 220px, 100vw"
                    className={styles.thumbImage}
                  />
                </div>

                <div className={styles.body}>
                  {item.meta.tanggal && (
                    <time dateTime={item.meta.tanggal} className={styles.date}>
                      {formatTanggalIndonesia(item.meta.tanggal)}
                    </time>
                  )}
                  <h3 className={styles.title}>
                    <Link href={`/berita/${item.slug}`} className={styles.titleLink}>
                      {item.meta.judul}
                    </Link>
                  </h3>
                  {item.meta.excerpt && <p className={styles.excerpt}>{item.meta.excerpt}</p>}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
