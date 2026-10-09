// File ini SENGAJA tidak punya top-level import/export sendiri (bukan module)
// supaya blok `declare module` di bawah jadi augmentasi ambient global yang
// benar-benar di-merge dengan deklarasi "*.mdx" bawaan @types/mdx — begitu
// file ini jadi module (ada top-level export), declare module-nya jadi lokal
// dan tidak ke-merge. Lihat juga types/berita.d.ts untuk shape BeritaMeta.

declare module "*.mdx" {
  import type { BeritaMeta } from "@/types/berita";

  export const meta: BeritaMeta;
}
