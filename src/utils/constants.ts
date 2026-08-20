import type { WatchStatus, MediaType } from "../interfaces";

export const STORAGE_KEY = "izledim-movies";

export const GENRES = [
  "Aksiyon",
  "Animasyon",
  "Bilim Kurgu",
  "Dram",
  "Komedi",
  "Korku",
  "Gerilim",
  "Belgesel",
  "Fantastik",
  "Romantik",
] as const;

export const MEDIA_TYPES: { value: MediaType; label: string }[] = [
  { value: "film", label: "Film" },
  { value: "dizi", label: "Dizi" },
];

export const STATUS_OPTIONS: {
  value: WatchStatus;
  label: string;
  classes: string;
}[] = [
  {
    value: "izlenecek",
    label: "İzlenecek",
    classes: "bg-zinc-700 text-zinc-200",
  },
  {
    value: "izleniyor",
    label: "İzleniyor",
    classes: "bg-blue-500/20 text-blue-300",
  },
  {
    value: "bitti",
    label: "Bitti",
    classes: "bg-emerald-500/20 text-emerald-300",
  },
];
