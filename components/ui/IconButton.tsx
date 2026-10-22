import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import styles from "./IconButton.module.css";
import { cn } from "@/lib/utils";

type Variant = "outline" | "glass";

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
  disabled?: boolean;
  /** Untuk tombol disclosure (mis. menu mobile). */
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

type IconButtonProps = IconButtonAsLink | IconButtonAsButton;

/**
 * Tombol ikon persegi 44 px (DESIGN.md §8.4) — toggle menu mobile, panah karusel.
 */
export function IconButton({ children, variant = "outline", className, href, ...rest }: IconButtonProps) {
  const classes = cn(styles.button, styles[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
