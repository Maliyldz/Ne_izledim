import { Link, useLocation } from "react-router-dom";
import { Clapperboard, Plus } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-20 bg-cinema-bg/80 backdrop-blur border-b border-cinema-border">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Clapperboard className="text-cinema-gold" size={24} />
          <span className="text-lg font-bold tracking-tight">
            İzle<span className="text-cinema-gold">dim</span>
          </span>
        </Link>

        {pathname !== "/ekle" && (
          <Link
            to="/ekle"
            className="flex items-center gap-1.5 bg-cinema-gold text-black text-sm font-semibold px-3.5 py-2 rounded-lg hover:brightness-110 transition"
          >
            <Plus size={16} />
            Yeni Ekle
          </Link>
        )}
      </nav>
    </header>
  );
}