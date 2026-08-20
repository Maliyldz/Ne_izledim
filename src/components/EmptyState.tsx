import { SearchX, Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  filtered: boolean;
}

export default function EmptyState({ filtered }: EmptyStateProps) {
  const Icon = filtered ? SearchX : Clapperboard;

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Icon size={44} className="text-zinc-700 mb-4" />
      <h3 className="font-semibold text-zinc-300 mb-1">
        {filtered ? "Sonuç bulunamadı" : "Arşivin henüz boş"}
      </h3>
      <p className="text-sm text-zinc-500 max-w-xs">
        {filtered
          ? "Arama veya filtre koşullarını değiştirmeyi dene."
          : "İlk film ya da dizini ekleyerek arşivini oluşturmaya başla."}
      </p>
      {!filtered && (
        <Link
          to="/ekle"
          className="mt-5 bg-cinema-gold text-black font-semibold text-sm px-4 py-2.5 rounded-lg hover:brightness-110 transition"
        >
          İlk kaydı ekle
        </Link>
      )}
    </div>
  );
}
