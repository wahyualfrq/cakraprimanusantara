import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { ContentImage } from "@/components/ui/ContentImage";
import styles from "./PageHeader.module.css";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  variant: "solid" | "photo";
  breadcrumb: BreadcrumbItem[];
  title: string;
  /**
   * Satu kata di `title` yang dapat treatment italic aksen (DESIGN.md §6.1,
   * maks. satu kata, hanya kalau maknanya organik/tumbuh — bukan struktural).
   * Font heading Fraunces di-load dengan style italic asli (app/layout.tsx,
   * keputusan D1), jadi italic di sini bukan fake italic. Aturan §6.1 tetap
   * berlaku: hanya headline utama halaman, bukan judul section (H2).
   */
  accentWord?: string;
  description?: string;
  photoSrc?: string;
  photoAlt?: string;
  align?: "left" | "center";
};

function renderTitle(title: string, accentWord?: string): ReactNode {
  if (!accentWord) return title;
  const index = title.indexOf(accentWord);
  if (index === -1) return title;
  const before = title.slice(0, index);
  const after = title.slice(index + accentWord.length);
  return (
    <>
      {before}
      <em>{accentWord}</em>
      {after}
    </>
  );
}

/**
 * Header halaman dalam — rata kiri (default) atau tengah (align="center"), breadcrumb,
 * H1, satu kalimat deskripsi. Tinggi jauh lebih rendah dari hero homepage (DESIGN.md §8.11).
 * Dua varian: `solid` (background tema) dan `photo` (foto + scrim wajib §5.3).
 */
export function PageHeader({
  variant,
  breadcrumb,
  title,
  accentWord,
  description,
  photoSrc,
  photoAlt,
  align = "left",
}: PageHeaderProps) {
  return (
    <header className={cn(styles.header, variant === "photo" ? styles.photo : styles.solid)}>
      {variant === "photo" && (
        <div className={styles.photoLayer} aria-hidden={!photoSrc}>
          <ContentImage
            src={photoSrc}
            alt={photoAlt ?? title}
            variant="unit"
            fill
            sizes="100vw"
            className={styles.photoImage}
          />
          <div className={styles.scrim} aria-hidden="true" />
        </div>
      )}
      <Container className={cn(styles.inner, align === "center" && styles.innerCenter)}>
        <Breadcrumb items={breadcrumb} />
        <h1 className={styles.title}>{renderTitle(title, accentWord)}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </Container>
    </header>
  );
}
