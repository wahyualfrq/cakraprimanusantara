import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { kategoriLabel, produkList } from "@/content/agribisnis/produk";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    // Kategori = kategoriLabel (frasa sumber); kata kunci produk di depan, bukan "Agribisnis".
    title: "Produk Penyubur Tanah, Pupuk NPK & Biofungisida",
    description:
      "Daftar produk penyubur tanah, pupuk organik cair, pupuk NPK, pupuk hayati, dan biofungisida: Ostindo, Futricho, Bless NPK, Bless Cair, Rizafert, Actifert.",
    path: "/produk",
  });
}

export default function ProdukAgribisnisPage() {
  const [unggulan, ...lainnya] = produkList;

  return (
    <>
      <PageHeader
        variant="photo"
        fullScreen
        photoSrc="/images/gambar-10.webp"
        photoPosition="center 45%"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Produk", href: "/produk" },
        ]}
        title="Produk"
        description="Rangkaian produk penyubur tanah, pupuk hayati, dan biopestisida ramah lingkungan."
      />

      {/* 1. Produk Unggulan: Ostindo (Flagship Core Business) */}
      <Section aria-label="Produk Unggulan">
        <Container>
          <Reveal>
            <div className={styles.featured}>
              <span className={styles.featuredPattern} aria-hidden="true" />

              <div className={styles.featuredLeft}>
                <div className={styles.featuredBadgeRow}>
                  <span className={styles.featuredCategory}>{kategoriLabel[unggulan.kategori]}</span>
                  <span className={styles.featuredNumeral} aria-hidden="true">01</span>
                </div>

                <h2 className={styles.featuredName}>{unggulan.nama}</h2>
                <p className={styles.featuredDesc}>{unggulan.deskripsiSingkat}</p>

                {unggulan.faktaKunci && (
                  <div className={styles.featuredSpecs}>
                    {unggulan.faktaKunci.map((fakta) => (
                      <div key={fakta.label} className={styles.specItem}>
                        <span className={styles.specLabel}>{fakta.label}:</span>
                        <span className={styles.specValue}>{fakta.nilai}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.featuredActions}>
                  <Button href={`/produk/${unggulan.slug}`} variant="accent">
                    Lihat Spesifikasi & Dosis
                  </Button>
                  {unggulan.dokumen && unggulan.dokumen.length > 0 && (
                    <Button
                      href={unggulan.dokumen[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                    >
                      Brosur Produk
                    </Button>
                  )}
                </div>
              </div>

              <div className={styles.featuredRight}>
                <div className={styles.featuredMediaContainer}>
                  <div className={styles.featuredGlow} aria-hidden="true" />
                  <div className={styles.featuredMedia}>
                    <Image
                      src={unggulan.gambar!}
                      alt={`Kemasan ${unggulan.nama}`}
                      fill
                      sizes="(max-width: 900px) 280px, 420px"
                      className={styles.featuredImage}
                      // Lazy (default): di bawah PageHeader fullScreen (100svh).
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 2. Katalog Produk: Card Grid dengan Struktur dan Posisi Konsisten */}
      <Section aria-labelledby="katalog-heading">
        <Container>
          <div className={styles.sectionHeader}>
            <SectionHeading
              eyebrow="Katalog Agribisnis"
              title="Formulasi Spesifik & Perlindungan Tanaman"
              description="Rangkaian biofungisida alami, pupuk majemuk NPK, pupuk organik cair, dan mikoriza hayati untuk menunjang produktivitas lahan."
              id="katalog-heading"
            />
          </div>

          <Reveal as="div" stagger className={styles.productGrid}>
            {lainnya.map((produk) => {
              const primaryDoc = produk.dokumen && produk.dokumen.length > 0 ? produk.dokumen[0] : null;

              return (
                <article key={produk.slug} className={styles.productCard}>
                  {/* 1. Area Gambar Produk (Tinggi Konsisten, Tidak Terpotong) */}
                  <div className={styles.cardMediaSlot}>
                    <Link
                      href={`/produk/${produk.slug}`}
                      className={styles.cardImageLink}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Image
                        src={produk.gambar!}
                        alt={`Kemasan ${produk.nama}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                        className={styles.cardImage}
                      />
                    </Link>
                  </div>

                  {/* Body Content */}
                  <div className={styles.cardContent}>
                    {/* 2. Nama / Judul Produk (Mulai pada posisi vertikal yang sama) */}
                    <h3 className={styles.cardTitle}>
                      <Link href={`/produk/${produk.slug}`} className={styles.titleLink}>
                        {produk.nama}
                      </Link>
                    </h3>

                    {/* 3. Deskripsi Singkat (Dibatasi 3 baris agar tinggi rata) */}
                    <p className={styles.cardDesc}>{produk.deskripsiSingkat}</p>

                    {/* 4. Informasi Pendukung yang Relevan */}
                    <div className={styles.cardInfoRow}>
                      <span className={styles.cardCategory}>{kategoriLabel[produk.kategori]}</span>
                      {primaryDoc && (
                        <span className={styles.cardDocTag}>
                          {primaryDoc.tipe === "pdf" ? "Brosur PDF" : "Brosur"}
                        </span>
                      )}
                    </div>

                    {/* 5. Aksi Utama (Terapit di bawah dengan margin-top: auto) */}
                    <div className={styles.cardActions}>
                      <Link href={`/produk/${produk.slug}`} className={styles.btnDetail}>
                        Detail Produk
                      </Link>
                      {primaryDoc && (
                        <a
                          href={primaryDoc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.btnDoc}
                        >
                          {primaryDoc.tipe === "pdf" ? "Unduh PDF" : "Lihat Brosur"}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </Reveal>
        </Container>
      </Section>

      {/* 3. Jaminan Standar Mutu & Pengujian Ilmiah (Mengisi Ruang Bawah) */}
      <Section tone="muted" aria-labelledby="standar-mutu-heading">
        <Container>
          <div className={styles.qualitySplit}>
            <Reveal className={styles.qualityMediaSide}>
              <div className={styles.qualityCardsStack}>
                <a
                  href="/riset/sertifikat-sni.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.qualityCertCard}
                >
                  <div className={styles.certThumbWrap}>
                    <Image
                      src="/riset/sertifikat-sni.jpg"
                      alt="Sertifikat SNI Pupuk NPK Bless dan ISO 9001:2008"
                      fill
                      sizes="180px"
                      className={styles.certThumbImg}
                    />
                  </div>
                  <div className={styles.certInfo}>
                    <span className={styles.certCategory}>Sertifikasi Mutu</span>
                    <strong className={styles.certTitle}>SNI 2803:2012 & ISO 9001:2008</strong>
                    <span className={styles.certActionText}>Buka Dokumen</span>
                  </div>
                </a>

                <a
                  href="/riset/lipi.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.qualityCertCardSecondary}
                >
                  <div className={styles.certThumbWrapSmall}>
                    <Image
                      src="/riset/lipi.jpg"
                      alt="Piagam Alih Teknologi Lisensi LIPI 2015"
                      fill
                      sizes="140px"
                      className={styles.certThumbImg}
                    />
                  </div>
                  <div className={styles.certInfo}>
                    <span className={styles.certCategory}>Alih Teknologi</span>
                    <strong className={styles.certTitle}>Lisensi Invensi LIPI 2015</strong>
                    <span className={styles.certActionText}>Buka Dokumen</span>
                  </div>
                </a>
              </div>
            </Reveal>

            <Reveal className={styles.qualityTextSide}>
              <SectionHeading
                eyebrow="Standar Mutu"
                title="Kualitas Terstandarisasi, Efektivitas Terbukti di Lapangan"
                description="Setiap batch formula PT Anugerah Mustika Ostindo melewati kontrol mutu ketat berbasis laboratorium dan pengujian berkelanjutan bersama Pusat Penelitian Kelapa Sawit (PPKS) serta Perkebunan Nusantara."
                id="standar-mutu-heading"
              />

              <ul className={styles.qualityPillars}>
                <li className={styles.pillarItem}>
                  <div className={styles.pillarBody}>
                    <strong className={styles.pillarTitle}>Indukan Mikroba Terseleksi</strong>
                    <p className={styles.pillarText}>
                      Menggunakan galur isolat mikroba murni yang terus diperbaharui sehingga tidak menimbulkan mutasi dan bekerja efektif bersimbiosis dengan tanah.
                    </p>
                  </div>
                </li>
                <li className={styles.pillarItem}>
                  <div className={styles.pillarBody}>
                    <strong className={styles.pillarTitle}>Disesuaikan Karakter Lahan</strong>
                    <p className={styles.pillarText}>
                      Kemampuan kustomisasi formulasi pupuk sesuai profil kimia dan biologi tanah yang dimiliki perkebunan konsumen.
                    </p>
                  </div>
                </li>
              </ul>

              <div className={styles.qualityActions}>
                <Button href="/hubungi-kami">
                  Konsultasi Pemupukan Lahan
                </Button>
                <Button href="/riset-dan-inovasi" variant="text-link">
                  Dokumentasi Riset
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
