import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { getBeritaBySlug } from "@/lib/content/berita";
import { formatTanggalIndonesia } from "@/lib/tanggal";
import styles from "./NewsHighlight.module.css";

// Tanpa label kategori: sumber tidak memberi kategori per artikel ("Pencapaian"
// di CONTENT-VERBATIM.md §B hanya label navigasi usulan; "Riset & Pengembangan"
// hanya judul section §E3).
type NewsHighlightSlot = {
  slug: string;
  /** Ilustrasi sementara (D4) — bukan dokumentasi kegiatan. */
  image: string;
  imageAlt: string;
};

// Judul, tanggal, dan excerpt diambil dari MDX (lib/content/berita.ts) — tidak
// ada teks cadangan karangan. Artikel draft tampil judulnya saja, tanpa tautan.
const slots: NewsHighlightSlot[] = [
  {
    slug: "kerjasama-brin-teknologi-pestisida",
    image: "/images/gambar-9.png",
    imageAlt: "Ilustrasi riset agronomi — pengujian tanaman di laboratorium",
  },
  {
    slug: "kerjasama-dengan-lipi",
    image: "/images/gambar-11.png",
    imageAlt: "Ilustrasi pengujian produk pertanian di lapangan",
  },
  {
    slug: "penghargaan-best-fertilizer-2016",
    image: "/images/gambar-12.png",
    imageAlt: "Ilustrasi piala penghargaan dan produk pupuk",
  },
];

export function NewsHighlight() {
  const items = slots.flatMap((slot) => {
    const entry = getBeritaBySlug(slot.slug);
    return entry ? [{ ...slot, meta: entry.meta }] : [];
  });

  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <h2 className={styles.title}>Berita</h2>
          </div>
          <Link href="/berita" className={styles.viewAll}>
            Lihat Semua Berita →
          </Link>
        </div>

        <div className={styles.grid}>
          {items.map((item) => {
            if (!item.meta.draft) {
              return (
                <article key={item.slug} className={styles.cardActive}>
                  <div className={styles.mediaFrame}>
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className={styles.cardImage}
                    />
                  </div>

                  <div className={styles.cardBody}>
                    {item.meta.tanggal && (
                      <div className={styles.metaRow}>
                        <time dateTime={item.meta.tanggal} className={styles.date}>
                          {formatTanggalIndonesia(item.meta.tanggal)}
                        </time>
                      </div>
                    )}

                    <h3 className={styles.cardTitle}>
                      <Link href={`/berita/${item.slug}`} className={styles.cardTitleLink}>
                        {item.meta.judul}
                      </Link>
                    </h3>

                    {item.meta.excerpt && <p className={styles.excerpt}>{item.meta.excerpt}</p>}

                    <div className={styles.footer}>
                      <Link href={`/berita/${item.slug}`} className={styles.ctaLink}>
                        Baca Artikel →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            }

            // Kartu draft: judul saja, tanpa tautan (halaman detail draft = 404).
            return (
              <article key={item.slug} className={styles.cardDraft}>
                <div className={styles.mediaFrame}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className={styles.cardImageMuted}
                  />
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitleDraft}>{item.meta.judul}</h3>

                  <p className={styles.draftNotice}>Naskah belum tersedia.</p>

                  <div className={styles.footer} />
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
