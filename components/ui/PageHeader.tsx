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
   * PERHATIAN: font heading aktif saat ini Manrope (app/layout.tsx), bukan
   * Fraunces seperti ditulis DESIGN.md §6 — Manrope di-load tanpa style
   * italic asli, jadi prop ini untuk sekarang akan render fake/synthetic
   * italic yang dilarang §6.1. Lihat GAP-REPORT.md. Jangan dipakai sebelum
   * konflik font ini diselesaikan.
   */
  accentWord?: string;
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
 * Header halaman dalam — rata kiri, breadcrumb, H1, satu kalimat deskripsi.
 * Tinggi jauh lebih rendah dari hero homepage (DESIGN.md §8.11). Dua
 * varian: `solid` (background tema) dan `photo` (foto + scrim wajib §5.3).
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
      <Container className={styles.inner}>
        <Breadcrumb items={breadcrumb} />
        <h1 className={styles.title}>{renderTitle(title, accentWord)}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </Container>
    </header>
  );
}
