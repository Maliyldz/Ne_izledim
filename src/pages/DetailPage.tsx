import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, Film, Tv, Calendar } from "lucide-react";
import { useMovies } from "../context/MovieContext";
import StatusBadge from "../components/StatusBadge";
import StarRating from "../components/StarRating";
import ConfirmModal from "../components/ConfirmModal";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMovieById, deleteMovie } = useMovies();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const movie = id ? getMovieById(id) : undefined;

  if (!movie) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-400 mb-4">Bu kayıt bulunamadı.</p>
        <Link to="/" className="text-cinema-gold underline">
          Arşive dön
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteMovie(movie.id);
    navigate("/");
  };

  return (
    <div className="max-w-4xl">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-cinema-gold transition mb-6"
      >
        <ArrowLeft size={16} />
        Arşive dön
      </button>

      <div className="grid md:grid-cols-[260px_1fr] gap-8">
        {/* Poster */}
        <div className="aspect-[2/3] bg-cinema-card border border-cinema-border rounded-xl overflow-hidden flex items-center justify-center">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          ) : movie.type === "dizi" ? (
            <Tv size={48} className="text-zinc-600" />
          ) : (
            <Film size={48} className="text-zinc-600" />
          )}
        </div>

        {/* Bilgiler */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold leading-tight">{movie.title}</h1>
            <StatusBadge status={movie.status} />
          </div>

          <div className="flex items-center gap-3 text-sm text-zinc-400 mt-3">
            <span className="flex items-center gap-1.5">
              {movie.type === "dizi" ? <Tv size={15} /> : <Film size={15} />}
              {movie.type === "dizi" ? "Dizi" : "Film"}
            </span>
            <span className="text-zinc-700">|</span>
            <span>{movie.year}</span>
            <span className="text-zinc-700">|</span>
            <span>{movie.genre}</span>
          </div>

          <div className="mt-5">
            <p className="text-xs uppercase tracking-wide text-zinc-500 mb-1.5">
              Puanım
            </p>
            <div className="flex items-center gap-2">
              <StarRating value={movie.rating} size={22} />
              <span className="text-sm text-zinc-400">
                {movie.rating > 0 ? `${movie.rating}/5` : "Henüz puanlanmadı"}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs uppercase tracking-wide text-zinc-500 mb-1.5">
              Notum
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {movie.note || (
                <span className="text-zinc-600">Not eklenmemiş.</span>
              )}
            </p>
          </div>

          <p className="flex items-center gap-1.5 text-xs text-zinc-600 mt-5">
            <Calendar size={13} />
            {new Date(movie.createdAt).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            tarihinde eklendi
          </p>

          {/* Aksiyonlar */}
          <div className="flex gap-3 mt-8">
            <Link
              to={`/film/${movie.id}/duzenle`}
              className="flex items-center gap-1.5 bg-cinema-gold text-black font-semibold text-sm px-4 py-2.5 rounded-lg hover:brightness-110 transition"
            >
              <Pencil size={15} />
              Düzenle
            </Link>
            <button
              onClick={() => setConfirmOpen(true)}
              className="flex items-center gap-1.5 border border-red-500/40 text-red-400 text-sm px-4 py-2.5 rounded-lg hover:bg-red-500/10 transition"
            >
              <Trash2 size={15} />
              Sil
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Kaydı sil"
        message={`"${movie.title}" arşivinden kalıcı olarak silinecek. Emin misin?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
