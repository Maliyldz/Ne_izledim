export type MediaType = "film" | "dizi";

export type WatchStatus = "izlenecek" | "izleniyor" | "bitti";

export interface Movie {
  id: string;
  title: string;
  year: number;
  type: MediaType;
  genre: string;
  status: WatchStatus;
  rating: number;
  posterUrl: string;
  note: string;
  createdAt: string;
}

export type MovieFormData = Omit<Movie, "id" | "createdAt">;
