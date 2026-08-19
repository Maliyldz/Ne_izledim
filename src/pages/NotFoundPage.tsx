import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-cinema-gold mb-3">404</h1>
      <p className="text-zinc-400 mb-6">Aradığın sayfa bulunamadı.</p>
      <Link to="/" className="text-cinema-gold underline">
        Arşive dön
      </Link>
    </div>
  );
}