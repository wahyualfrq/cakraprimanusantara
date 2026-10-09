import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import styles from "./IconButton.module.css";
import { cn } from "@/lib/utils";

type Variant = "glass" | "solid";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  "aria-label": string;
};

type IconButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type IconButtonAsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
};

type IconButtonProps = IconButtonAsLink | IconButtonAsButton;

/**
 * Tombol bulat kecil — dipakai untuk scroll-down indicator di hero dan
 * tombol panah di pojok kartu portofolio (DESIGN.md §7).
 */
export function IconButton({ children, variant = "glass", className, href, ...rest }: IconButtonProps) {
  const classes = cn(styles.button, styles[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as { onClick?: () => void })}>
      {children}
    </button>
  );
}
