import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/Breadcrumb";
import styles from "./PageHeader.module.css";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  variant?: "solid" | "photo";
  fullScreen?: boolean;
  className?: string;
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
  photoPosition?: string;
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
 * Dua varian: `solid` (latar green-50) dan `photo` (banner hero gambar penuh dengan scrim).
 * Opsi `fullScreen` untuk tampilan hero penuh (min-height 100svh).
 */
export function PageHeader({
  variant = "solid",
  fullScreen = false,
  className,
  breadcrumb,
  title,
  accentWord,
  description,
  photoSrc,
  photoAlt,
  photoPosition = "center",
}: PageHeaderProps) {
  const isPhoto = variant === "photo" && Boolean(photoSrc);

  return (
    <header
      data-page-header=""
      className={cn(
        styles.header,
        isPhoto && styles.photo,
        fullScreen && styles.fullScreen,
        className
      )}
    >
      {isPhoto && (
        <div className={styles.photoLayer} aria-hidden="true">
          <Image
            src={photoSrc!}
            alt={photoAlt ?? ""}
            fill
            sizes="100vw"
            priority
            className={styles.photoImage}
            style={{ objectPosition: photoPosition }}
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
