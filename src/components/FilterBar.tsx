import { Search, X } from "lucide-react";
import type { WatchStatus } from "../interfaces";
import { GENRES, STATUS_OPTIONS } from "../utils/constants";

export type StatusFilter = WatchStatus | "tumu";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  genre: string;
  onGenreChange: (value: string) => void;
}

const tabs: { value: StatusFilter; label: string }[] = [
  { value: "tumu", label: "Tümü" },
  ...STATUS_OPTIONS.map((item) => ({ value: item.value, label: item.label })),
];

export default function FilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  genre,
  onGenreChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Arama */}
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Başlıkta ara..."
          className="w-full bg-cinema-card border border-cinema-border rounded-lg pl-9 pr-9 py-2 text-sm outline-none focus:border-cinema-gold transition"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            aria-label="Aramayı temizle"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Kategori */}
      <select
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="bg-cinema-card border border-cinema-border rounded-lg px-3 py-2 text-sm outline-none focus:border-cinema-gold transition"
      >
        <option value="tumu">Tüm kategoriler</option>
        {GENRES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {/* Durum sekmeleri */}
      <div className="flex gap-1 bg-cinema-card border border-cinema-border rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onStatusChange(tab.value)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
              status === tab.value
                ? "bg-cinema-gold text-black"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
