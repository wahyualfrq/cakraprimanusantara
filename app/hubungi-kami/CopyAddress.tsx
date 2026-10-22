"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Status = "idle" | "copied" | "failed";

/** Tombol salin alamat ke clipboard, dengan umpan balik yang dibacakan pembaca layar. */
export function CopyAddress({ alamat, label }: { alamat: string; label: string }) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2500);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function salin() {
    try {
      await navigator.clipboard.writeText(alamat);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <>
      <button type="button" className={styles.actionLink} onClick={salin} aria-label={`Salin alamat ${label}`}>
        {status === "copied" ? "Alamat tersalin" : "Salin alamat"}
      </button>
      <span role="status" aria-live="polite" className={styles.srOnly}>
        {status === "copied" ? `Alamat ${label} tersalin.` : status === "failed" ? "Alamat gagal disalin." : ""}
      </span>
    </>
  );
}
