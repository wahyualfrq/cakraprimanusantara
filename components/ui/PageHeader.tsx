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
   * Satu kata di `title` dengan italic Fraunces asli. DESIGN.md v0.4 §5.2 [T5]: tidak
   * dipakai di H1 halaman dalam — prop dipertahankan untuk kompatibilitas.
   */
  accentWord?: string;
  /** Satu kalimat bersumber (verbatim), ≤ 56ch. */
  description?: string;
  photoSrc?: string;
  photoAlt?: string;
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
 * Header halaman dalam (DESIGN.md §10.2): rata kiri, breadcrumb → H1 → satu kalimat
 * deskripsi opsional. `data-page-header` dipakai Section untuk jarak ke konten pertama.
 * Dua varian: `solid` (latar green-50) dan `photo` (hanya bila foto asli tersedia, scrim wajib).
 */
export function PageHeader({
  variant,
  breadcrumb,
  title,
  accentWord,
  description,
  photoSrc,
  photoAlt,
}: PageHeaderProps) {
  return (
    <header data-page-header="" className={cn(styles.header, variant === "photo" && styles.photo)}>
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
      <Container className={styles.inner}>
        <Breadcrumb items={breadcrumb} />
        <h1 className={styles.title}>{renderTitle(title, accentWord)}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </Container>
    </header>
  );
}
