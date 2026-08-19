import { Link } from "react-router-dom";
import { Film, Tv } from "lucide-react";
import type { Movie } from "../interfaces";
import StatusBadge from "./StatusBadge";
import StarRating from "./StarRating";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      to={`/film/${movie.id}`}
      className="group bg-cinema-card border border-cinema-border rounded-xl overflow-hidden hover:border-cinema-gold/60 hover:-translate-y-1 transition duration-200"
    >
      {/* Poster alanı */}
      <div className="relative aspect-[2/3] bg-zinc-800 overflow-hidden">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600">
            {movie.type === "dizi" ? <Tv size={40} /> : <Film size={40} />}
          </div>
        )}

        <div className="absolute top-2 left-2">
          <StatusBadge status={movie.status} />
        </div>
      </div>

      {/* Bilgi alanı */}
      <div className="p-3">
        <h3 className="font-semibold text-sm leading-tight line-clamp-1 group-hover:text-cinema-gold transition">
          {movie.title}
        </h3>
        <p className="text-xs text-zinc-500 mt-1">
          {movie.year} · {movie.genre}
        </p>
        <div className="mt-2">
          <StarRating value={movie.rating} size={14} />
        </div>
      </div>
    </Link>
  );
}