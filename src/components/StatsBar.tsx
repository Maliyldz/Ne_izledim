import { Clapperboard, CheckCircle2, Eye, Star } from "lucide-react";
import type { Movie } from "../interfaces";

interface StatsBarProps {
  movies: Movie[];
}

export default function StatsBar({ movies }: StatsBarProps) {
  const total = movies.length;
  const finished = movies.filter((m) => m.status === "bitti").length;
  const watching = movies.filter((m) => m.status === "izleniyor").length;

  const rated = movies.filter((m) => m.rating > 0);
  const average =
    rated.length > 0
      ? (rated.reduce((sum, m) => sum + m.rating, 0) / rated.length).toFixed(1)
      : "-";
  const items = [
    { label: "Toplam kayıt", value: total, icon: Clapperboard },
    { label: "Bitirilen", value: finished, icon: CheckCircle2 },
    { label: "İzleniyor", value: watching, icon: Eye },
    { label: "Ortalama puan", value: average, icon: Star },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {items.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="bg-cinema-card border border-cinema-border rounded-xl p-4"
        >
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <Icon size={15} />
            <span className="text-xs">{label}</span>
          </div>
          <p className="text-2xl font-bold text-cinema-gold">{value}</p>
        </div>
      ))}
    </div>
  );
}
