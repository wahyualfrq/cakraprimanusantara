"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./LiteYouTube.module.css";
import { cn } from "@/lib/utils";

type LiteYouTubeProps = {
  /** Kosongkan kalau ID video belum ada — komponen tidak akan render apa pun. */
  videoId?: string;
  title: string;
  className?: string;
};

/**
 * Facade video: poster + tombol play, iframe YouTube baru dimuat saat
 * diklik (STRUCTURE.md §D.5) — bukan iframe langsung di render awal.
 */
export function LiteYouTube({ videoId, title, className }: LiteYouTubeProps) {
  const [playing, setPlaying] = useState(false);

  if (!videoId) return null;

  if (playing) {
    return (
      <div className={cn(styles.wrap, className)}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          className={styles.iframe}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={cn(styles.wrap, styles.trigger, className)}
      onClick={() => setPlaying(true)}
      aria-label={`Putar video: ${title}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className={styles.poster}
      />
      <span className={styles.playIcon} aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
