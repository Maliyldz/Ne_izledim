import { useState, useMemo } from "react";
import { useMovies } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import FilterBar, { type StatusFilter } from "../components/FilterBar";
import StatsBar from "../components/StatsBar";
import EmptyState from "../components/EmptyState";

export default function HomePage() {
  const { movies } = useMovies();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("tumu");
  const [genre, setGenre] = useState("tumu");

  const visibleMovies = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase("tr-TR");

    return movies.filter((movie) => {
      const matchesSearch =
        keyword === "" ||
        movie.title.toLocaleLowerCase("tr-TR").includes(keyword);

      const matchesStatus = status === "tumu" || movie.status === status;
      const matchesGenre = genre === "tumu" || movie.genre === genre;

      return matchesSearch && matchesStatus && matchesGenre;
    });
  }, [movies, search, status, genre]);

  const isFiltered = search !== "" || status !== "tumu" || genre !== "tumu";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Arşivim</h1>
        <p className="text-sm text-zinc-500 mt-1">
          İzlediklerini ve izleyeceklerini tek yerde topla.
        </p>
      </div>

      <StatsBar movies={movies} />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        genre={genre}
        onGenreChange={setGenre}
      />

      {visibleMovies.length === 0 ? (
        <EmptyState filtered={isFiltered} />
      ) : (
        <>
          <p className="text-xs text-zinc-500 mb-3">
            {visibleMovies.length} sonuç
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {visibleMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
