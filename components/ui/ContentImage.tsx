import Image from "next/image";
import styles from "./ContentImage.module.css";
import { cn } from "@/lib/utils";

export type ContentImageVariant = "unit" | "proyek" | "produk" | "berita" | "dokumen";

const placeholderClassByVariant: Record<ContentImageVariant, string> = {
  unit: styles.placeholderUnit,
  proyek: styles.placeholderProyek,
  produk: styles.placeholderProduk,
  berita: styles.placeholderBerita,
  dokumen: styles.placeholderDokumen,
};

type BaseProps = {
  /** URL foto asli (Vercel Blob). Kosongkan kalau belum tersedia — jangan karang URL. */
  src?: string;
  alt: string;
  variant: ContentImageVariant;
  className?: string;
};

type FillProps = BaseProps & {
  fill: true;
  width?: undefined;
  height?: undefined;
  /** Wajib eksplisit (STRUCTURE.md §7.2) — jangan andalkan default Next. */
  sizes: string;
};

type FixedProps = BaseProps & {
  fill?: false;
  width: number;
  height: number;
  sizes: string;
};

type ContentImageProps = FillProps | FixedProps;

/**
 * next/image dengan placeholder berpola (DESIGN.md §8.9) selama foto asli
 * belum di-upload ke Vercel Blob. `variant` menentukan treatment pattern
 * supaya tiap tipe konten terasa beda struktur, bukan "box yang sama".
 */
export function ContentImage(props: ContentImageProps) {
  const { src, alt, variant, className } = props;

  if (!src) {
    return (
      <div
        className={cn(styles.wrap, props.fill && styles.fill, className)}
        role="img"
        aria-label={alt}
      >
        <div className={cn(styles.placeholder, placeholderClassByVariant[variant])} />
      </div>
    );
  }

  if (props.fill) {
    return (
      <div className={cn(styles.wrap, styles.fill, className)}>
        <Image src={src} alt={alt} fill sizes={props.sizes} className={styles.image} />
      </div>
    );
  }

  return (
    <div className={cn(styles.wrap, className)}>
      <Image
        src={src}
        alt={alt}
        width={props.width}
        height={props.height}
        sizes={props.sizes}
        className={styles.image}
      />
    </div>
  );
}
