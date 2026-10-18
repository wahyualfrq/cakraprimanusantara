import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getBeritaBySlug } from "@/lib/content/berita";
import styles from "./NewsHighlight.module.css";

type NewsItem = {
  judul: string;
  image?: string;
  imageAlt?: string;
};

const items: NewsItem[] = [
  {
    judul: "PT Anugerah Mustika Ostindo Berkolaborasi dengan BRIN",
    image: "/images/gambar-9.png",
    imageAlt: "Kolaborasi riset bioteknologi agronomi PT Anugerah Mustika Ostindo dengan BRIN",
  },
  {
    judul: getBeritaBySlug("kerjasama-dengan-lipi")!.meta.judul,
    image: "/images/gambar-11.png",
    imageAlt: "Pengujian dan formulasi produk pembenah tanah hayati bersama peneliti LIPI",
  },
  {
    judul: "OSTINDO Kembali Mendapatkan Penghargaan Best Fertilizer 2016",
    image: "/images/gambar-12.png",
    imageAlt: "Piala penghargaan Best Fertilizer 2016 dan produk pupuk OSTINDO",
  },
];

export function NewsHighlight() {
  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <h2>Berita & Update</h2>
          <Link href="/berita" className={styles.viewAll}>
            Lihat Semua Berita →
          </Link>
        </div>

        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.judul} className={styles.item}>
              <Link href="/berita" className={styles.itemLink}>
                <div className={styles.thumb}>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.judul}
                      fill
                      sizes="80px"
                      className={styles.thumbImage}
                    />
                  ) : (
                    <div className={styles.thumbBlob} aria-hidden="true" />
                  )}
                </div>
                <span className={styles.itemTitle}>{item.judul}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
