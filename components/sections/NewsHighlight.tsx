import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { getBeritaBySlug } from "@/lib/content/berita";
import { formatTanggalIndonesia } from "@/lib/tanggal";
import styles from "./NewsHighlight.module.css";

type ActiveNewsItem = {
  isDraft: false;
  slug: string;
  judul: string;
  tanggal: string;
  kategori: string;
  excerpt: string;
  image: string;
  imageAlt: string;
};

type DraftNewsItem = {
  isDraft: true;
  slug: string;
  judul: string;
  kategori: string;
  statusLabel: string;
  notice: string;
  image: string;
  imageAlt: string;
};

type NewsHighlightItem = ActiveNewsItem | DraftNewsItem;

export function NewsHighlight() {
  const brinEntry = getBeritaBySlug("kerjasama-brin-teknologi-pestisida");
  const lipiEntry = getBeritaBySlug("kerjasama-dengan-lipi");
  const awardEntry = getBeritaBySlug("penghargaan-best-fertilizer-2016");

  // Komposisi 3 kartu warta korporat di homepage:
  // 1 & 2: Artikel aktif dengan link menuju slug detail masing-masing.
  // 3: Arsip penghargaan Best Fertilizer 2016 sebagai catatan arsip/persiapan (tanpa link 404).
  const items: NewsHighlightItem[] = [
    {
      isDraft: false,
      slug: "kerjasama-brin-teknologi-pestisida",
      judul: brinEntry?.meta.judul ?? "Kolaborasi BRIN & OSTINDO dalam Formulasi Biopestisida",
      tanggal: brinEntry?.meta.tanggal ? formatTanggalIndonesia(brinEntry.meta.tanggal) : "5 Juni 2023",
      kategori: "Agribisnis · Kemitraan",
      excerpt:
        brinEntry?.meta.excerpt ??
        "Kerja sama Pusat Riset Mikrobiologi Terapan BRIN dengan PT Anugerah Mustika Ostindo dalam pengembangan pestisida ramah lingkungan.",
      image: "/images/gambar-9.png",
      imageAlt: "Ilustrasi riset agronomi — pengujian tanaman di laboratorium",
    },
    {
      isDraft: false,
      slug: "kerjasama-dengan-lipi",
      judul: lipiEntry?.meta.judul ?? "Kerjasama dengan LIPI",
      tanggal: lipiEntry?.meta.tanggal ? formatTanggalIndonesia(lipiEntry.meta.tanggal) : "22 Agustus 2016",
      kategori: "Agribisnis · Litbang",
      excerpt:
        lipiEntry?.meta.excerpt ??
        "Penyubur tanah OSTINDO melalui serangkaian kerja sama pengujian berkelanjutan bersama lembaga penelitian nasional.",
      image: "/images/gambar-11.png",
      imageAlt: "Ilustrasi pengujian produk pertanian di lapangan",
    },
    {
      isDraft: true,
      slug: "penghargaan-best-fertilizer-2016",
      judul: awardEntry?.meta.judul ?? "OSTINDO kembali Mendapatkan Penghargaan Best Fertilizer 2016",
      kategori: "Pencapaian · Agribisnis",
      statusLabel: "Dokumentasi Arsip",
      notice:
        "Dokumentasi arsip penghargaan unit agribisnis OSTINDO. Naskah rilis pers lengkap sedang dipersiapkan.",
      image: "/images/gambar-12.png",
      imageAlt: "Ilustrasi piala penghargaan Best Fertilizer 2016 dan produk pupuk OSTINDO",
    },
  ];

  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <h2 className={styles.title}>Berita & Inovasi Terkini</h2>
          </div>
          <Link href="/berita" className={styles.viewAll}>
            Lihat Semua Berita (7) →
          </Link>
        </div>

        <div className={styles.grid}>
          {items.map((item) => {
            if (!item.isDraft) {
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
                    <div className={styles.metaRow}>
                      <span className={styles.categoryText}>{item.kategori}</span>
                      <time className={styles.date}>{item.tanggal}</time>
                    </div>

                    <h3 className={styles.cardTitle}>
                      <Link href={`/berita/${item.slug}`} className={styles.cardTitleLink}>
                        {item.judul}
                      </Link>
                    </h3>

                    <p className={styles.excerpt}>{item.excerpt}</p>

                    <div className={styles.footer}>
                      <Link href={`/berita/${item.slug}`} className={styles.ctaLink}>
                        Baca Artikel →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            }

            // Kartu Draft / Arsip: Tipografi murni, tanpa link 404, status informatif
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
                  <div className={styles.metaRow}>
                    <span className={styles.categoryText}>{item.kategori}</span>
                    <span className={styles.statusDraftText}>Dalam Persiapan</span>
                  </div>

                  <h3 className={styles.cardTitleDraft}>{item.judul}</h3>

                  <p className={styles.draftNotice}>{item.notice}</p>

                  <div className={styles.footer}>
                    <span className={styles.draftNoticeFooter}>
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
  );
}
