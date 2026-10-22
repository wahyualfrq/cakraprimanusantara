import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { localBusinessSchema } from "@/lib/seo/structured-data";
import { kontakHref, kontakLabel, mapsUrl } from "@/lib/kontak";
import { lokasiList, type Lokasi } from "@/content/kontak";
import { profil } from "@/content/profil";
import { ContactForm } from "./ContactForm";
import styles from "./page.module.css";

// Hanya lokasi Ostindo (Office & Factory, CONTENT-VERBATIM.md §H1). Lokasi lain
// di content/kontak.ts di luar scope — tidak dirender dan tidak masuk JSON-LD.
const lokasiOstindo = lokasiList.filter((lokasi) => lokasi.unitUsaha.includes("agribisnis"));
const pesanWhatsApp = `Halo, saya ingin menghubungi ${profil.nama}.`;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Hubungi Kami",
    // INTERIM — belum disetujui (D2). Kalimat CONTENT-VERBATIM.md §H1 (titik ganda sumber diperbaiki — TYPO-LOG.md).
    description:
      "Anda dapat mengirimkan pertanyaan mengenai produk maupun layanan dan kami akan berusaha menjawab dengan sebaik mungkin.",
    path: "/hubungi-kami",
  });
}

/** Satu lokasi sebagai baris direktori S0: nama, alamat, Maps, pasangan label | nilai. */
function LokasiRow({ lokasi }: { lokasi: Lokasi }) {
  const kontak = (lokasi.kontak ?? []).filter((item) => !item.perluVerifikasi);

  return (
    <li className={styles.location}>
      <h3 className={styles.locationName}>{lokasi.nama}</h3>
      <address className={styles.address}>{lokasi.alamat}</address>
      <a href={mapsUrl(lokasi.alamat)} target="_blank" rel="noopener noreferrer" className={styles.mapsLink}>
        Buka di Google Maps <span aria-hidden="true">↗</span>
      </a>

      {(kontak.length > 0 || lokasi.email) && (
        <dl className={styles.contacts}>
          {kontak.map((item) => {
            const href = kontakHref(item, pesanWhatsApp);
            const external = item.tipe === "whatsapp" || item.tipe === "instagram";
            return (
              <div key={`${item.tipe}-${item.nilai}`} className={styles.contact}>
                <dt>{kontakLabel[item.tipe]}</dt>
                <dd>
                  {href ? (
                    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {item.nilai}
                    </a>
                  ) : (
                    item.nilai
                  )}
                  {item.label && <span className={styles.pic}> ({item.label})</span>}
                </dd>
              </div>
            );
          })}
          {lokasi.email && (
            <div className={styles.contact}>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${lokasi.email}`}>{lokasi.email}</a>
              </dd>
            </div>
          )}
        </dl>
      )}
    </li>
  );
}

export default function KontakPage() {
  // LocalBusiness hanya untuk lokasi Ostindo; jam operasional tidak ada di sumber Ostindo.
  const schemas = lokasiOstindo.map((lokasi) => {
    const teleponUtama = lokasi.kontak?.find((item) => !item.perluVerifikasi && item.tipe === "telepon");
    return localBusinessSchema({
      name: `${profil.nama} — ${lokasi.nama}`,
      address: lokasi.alamat,
      telephone: teleponUtama?.nilai,
    });
  });

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={lokasiOstindo[index].slug} data={schema} />
      ))}

      {/* Header — banner foto fasilitas operasional & pengantar kontak */}
      <PageHeader
        variant="photo"
        photoSrc="/images/gambar-1.png"
        photoPosition="center 40%"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Hubungi Kami", href: "/hubungi-kami" },
        ]}
        title="Hubungi Kami"
        description={profil.pembukaKontak}
      />

      {/* Direktori lokasi (S0) + form (S1) — DESIGN.md v0.4 §13.8. */}
      <Section>
        <Container className={styles.layout}>
          <section className={styles.directory} aria-labelledby="lokasi-ostindo">
            <h2 id="lokasi-ostindo" className={styles.sectionTitle}>
              Lokasi
            </h2>
            <Reveal as="ul" stagger className={styles.locations}>
              {lokasiOstindo.map((lokasi) => (
                <LokasiRow key={lokasi.slug} lokasi={lokasi} />
              ))}
            </Reveal>
          </section>

          <Card as="section" className={styles.formPanel} aria-labelledby="form-kontak">
            <h2 id="form-kontak" className={styles.sectionTitle}>
              Kirim Pesan kepada Kami
            </h2>
            <ContactForm />
          </Card>
        </Container>
      </Section>
    </>
  );
}
