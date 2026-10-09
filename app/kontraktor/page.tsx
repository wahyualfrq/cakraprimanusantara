import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialIndex } from "@/components/ui/EditorialIndex";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { buildMetadata } from "@/lib/seo/metadata";
import { layananList } from "@/content/kontraktor/layanan";
import { proyekList, type KategoriProyek } from "@/content/kontraktor/proyek";
import styles from "./page.module.css";

// Tagline entitas (footer sumber, CONTENT-VERBATIM.md §A1) — satu-satunya
// kalimat deskripsi yang sumber sediakan untuk halaman ini.
const taglineSumber = "General Contractor, Trading & Rental Heavy Equipment";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Kontraktor",
    description: taglineSumber,
    path: "/kontraktor",
  });
}

const kategoriProyekLabel: Record<KategoriProyek, string> = {
  chipping: "Chipping",
  "pekerjaan-tanah-jalan": "Pekerjaan Tanah & Jalan",
  bangunan: "Bangunan",
  "concrete-repair": "Concrete Repair",
  mekanikal: "Mekanikal",
  "alat-berat": "Alat Berat",
  sipil: "Sipil",
};

export default function KontraktorPage() {
  const editorialItems = layananList.map((layanan) => ({
    href: `/kontraktor/${layanan.slug}`,
    title: layanan.nama,
    deskripsi: layanan.kalimatIndeks,
  }));

  // Bukan chipping (sudah punya kategori sendiri di indeks layanan di atas).
  // Tidak ada filter "bukan pencapaian Ostindo" — item itu disimpan di
  // content/agribisnis/sertifikasi.ts sejak Fase 1, tidak pernah masuk
  // proyekList.
  const contohProyek = proyekList.filter((proyek) => proyek.kategori !== "chipping").slice(0, 4);

  return (
    <>
      <PageHeader
        variant="photo"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Kontraktor", href: "/kontraktor" },
        ]}
        title="Kontraktor"
        description={taglineSumber}
      />

      <Section>
        <Container>
          <EditorialIndex items={editorialItems} thumbnailVariant="unit" />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title="Contoh Proyek" />
          <ul className={styles.proyekList}>
            {contohProyek.map((proyek) => (
              <li key={proyek.slug} className={styles.proyekItem}>
                <span className={styles.proyekJudul}>{proyek.judul}</span>
                <span className={styles.proyekKategori}>{kategoriProyekLabel[proyek.kategori]}</span>
              </li>
            ))}
          </ul>
          <Link href="/portofolio" className={styles.lihatSemua}>
            Lihat semua portofolio →
          </Link>
        </Container>
      </Section>

      <Section className={styles.kontakSection}>
        <Container>
          <SectionHeading title="Konsultasi Layanan Kontraktor" />
          <WhatsAppLink
            nomor="0811-783-675"
            pesan="Halo, saya ingin konsultasi layanan kontraktor."
            className={styles.kontakCta}
          >
            Hubungi via WhatsApp
          </WhatsAppLink>
        </Container>
      </Section>
    </>
  );
}
