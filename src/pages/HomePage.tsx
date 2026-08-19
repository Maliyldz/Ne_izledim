import { useMovies } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

export default function HomePage() {
  const { movies } = useMovies();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Arşivim</h1>
        <p className="text-sm text-zinc-500 mt-1">
          {movies.length} kayıt listeleniyor
        </p>
      </div>

      {movies.length === 0 ? (
        <p className="text-zinc-500 py-20 text-center">
          Henüz kayıt yok. Sağ üstten ilk filmini ekle.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}